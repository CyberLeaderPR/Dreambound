const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),ts=require('typescript'),assert=require('node:assert/strict');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'dreambound-security-'));
for(const f of ['request-security','response-security'])fs.writeFileSync(path.join(tmp,f+'.js'),ts.transpileModule(fs.readFileSync('lib/'+f+'.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText);
fs.writeFileSync(path.join(tmp,'db.js'),`const {DatabaseSync}=require('node:sqlite');const s=new DatabaseSync(':memory:');s.exec('CREATE TABLE request_limits (key TEXT PRIMARY KEY,count INTEGER NOT NULL,expires_at INTEGER NOT NULL)');exports.sqlite=s;exports.db=()=>({prepare:sql=>({bind:(...p)=>({first:async()=>s.prepare(sql).get(...p),run:async()=>s.prepare(sql).run(...p)})})});`);
const {readJson,limitSensitiveAction,requestError}=require(tmp+'/request-security.js'),{secureResponse}=require(tmp+'/response-security.js');
const request=(body,headers={})=>new Request('https://game.test/api/game',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://game.test',...headers},body});
(async()=>{
 assert.deepEqual(await readJson(request('{"action":"create"}'),100),{action:'create'});
 for(const bad of ['null','[]','true','"x"','{'])await assert.rejects(()=>readJson(request(bad),100),e=>e.status===400);
 await assert.rejects(()=>readJson(request('{}',{'Content-Type':'text/plain'}),100),e=>e.status===415);
 await assert.rejects(()=>readJson(request('{}',{Origin:'https://evil.test'}),100),e=>e.status===403);
 await assert.rejects(()=>readJson(request('{}',{'Sec-Fetch-Site':'cross-site',Origin:''}),100),e=>e.status===403);
 await assert.rejects(()=>readJson(request(' '.repeat(101),{'Content-Length':'2'}),100),e=>e.status===413);
 await assert.rejects(()=>readJson(request('{}',{'Content-Length':'1000000'}),100),e=>e.status===413);
 // A multibyte payload must be limited by bytes, not JS character count.
 await assert.rejects(()=>readJson(request(JSON.stringify({name:'😀'.repeat(30)})),100),e=>e.status===413);
 const req=request('{}',{'CF-Connecting-IP':'192.0.2.1'}),now=6000000;
 const results=await Promise.allSettled(Array.from({length:35},()=>limitSensitiveAction(req,'create',now)));
 assert.equal(results.filter(x=>x.status==='fulfilled').length,30);assert.ok(results.filter(x=>x.status==='rejected').every(x=>x.reason.status===429));
 await limitSensitiveAction(req,'create',now+600000);
 for(let i=0;i<20;i++)await limitSensitiveAction(req,'recover',now);
 try{await limitSensitiveAction(req,'recover',now);assert.fail('must throttle');}catch(e){const r=requestError(e);assert.equal(r.status,429);assert.equal(r.headers.get('retry-after'),'600');}
 await limitSensitiveAction(request('{}',{'CF-Connecting-IP':'192.0.2.2'}),'recover',now);
 const rows=require(tmp+'/db.js').sqlite.prepare('SELECT key FROM request_limits').all();assert.ok(rows.every(x=>/^[a-f0-9]{64}$/.test(x.key)));
 const r=secureResponse(new Response('hello',{headers:{'Set-Cookie':'test=1; HttpOnly'}}));assert.equal(await r.text(),'hello');assert.equal(r.headers.get('set-cookie'),'test=1; HttpOnly');assert.equal(r.headers.get('x-content-type-options'),'nosniff');assert.equal(r.headers.get('referrer-policy'),'no-referrer');assert.match(r.headers.get('content-security-policy'),/frame-ancestors/);
 console.log('PASS: JSON object/type validation, byte limits including misleading lengths and UTF-8, cross-origin/fetch metadata rejection, atomic concurrent rate limits, window reset, client isolation, hashed counters, 429 retry guidance and response/header preservation.');fs.rmSync(tmp,{recursive:true,force:true});
})().catch(e=>{console.error(e);process.exit(1)});
