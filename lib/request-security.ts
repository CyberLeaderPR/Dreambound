import {db} from './db';
export class RequestError extends Error {constructor(message:string,public status=400){super(message);}}
// Bound bytes while streaming, before JSON allocation. Content-Length is only a hint.
export async function readJson(req:Request,maxBytes:number):Promise<Record<string,unknown>>{
 const origin=req.headers.get('origin'),site=req.headers.get('sec-fetch-site');
 if((origin&&origin!==new URL(req.url).origin)||site==='cross-site')throw new RequestError('Request not allowed.',403);
 if(req.headers.get('content-type')?.split(';')[0].trim().toLowerCase()!=='application/json')throw new RequestError('Send application/json.',415);
 if(Number(req.headers.get('content-length')||0)>maxBytes)throw new RequestError('Request too large.',413);
 if(!req.body)throw new RequestError('Send a JSON object.');
 const reader=req.body.getReader(),chunks:Uint8Array[]=[];let size=0;
 try{while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>maxBytes){await reader.cancel();throw new RequestError('Request too large.',413);}chunks.push(value);}}finally{reader.releaseLock();}
 const data=new Uint8Array(size);let offset=0;for(const chunk of chunks){data.set(chunk,offset);offset+=chunk.byteLength;}
 let b:unknown;try{b=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(data));}catch{throw new RequestError('Send valid JSON.');}
 if(!b||Array.isArray(b)||typeof b!=='object')throw new RequestError('Send a JSON object.');return b as Record<string,unknown>;
}
// Durable counters across Worker isolates. No raw IP addresses are retained.
// CF-Connecting-IP is the platform-provided client address. If it is absent,
// anonymous requests share a fallback bucket instead of bypassing the limit.
export async function limitSensitiveAction(req:Request,action:string,now=Date.now()){
 if(!['create','join','recover','recovery-code'].includes(action))return;
 const windowMs=600000,window=Math.floor(now/windowMs),ip=req.headers.get('cf-connecting-ip')||'anonymous-fallback';
 const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(`${window}:${action}:${ip}`));
 const key=Array.from(new Uint8Array(digest),n=>n.toString(16).padStart(2,'0')).join('');
 const max=action==='recover'?20:action==='recovery-code'?10:action==='join'?60:30;
 const row=await db().prepare('INSERT INTO request_limits (key, count, expires_at) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count').bind(key,(window+1)*windowMs).first<{count:number}>();
 // Bound cleanup work per request; expired identifiers are not used for tracking.
 await db().prepare('DELETE FROM request_limits WHERE key IN (SELECT key FROM request_limits WHERE expires_at < ? LIMIT 100)').bind(now-windowMs).run();
 if(!row||row.count>max)throw new RequestError('Too many attempts. Please wait up to 10 minutes and try again.',429);
}
export function requestError(e:unknown){return e instanceof RequestError?Response.json({error:e.message},{status:e.status,headers:{'Cache-Control':'no-store',...(e.status===429?{'Retry-After':'600'}:{})}}):null;}
