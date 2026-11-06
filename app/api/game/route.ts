import {readJson,limitSensitiveAction,requestError} from '@/lib/request-security';
import {dailyChallenge} from '@/lib/daily-challenge';
import {RULES_VERSION} from '@/lib/release';
import {submitShared,expireShared} from '@/lib/multiplayer-depth';
import {validWorkGoal} from '@/lib/work-goals';
import {inheritCollection,syncCollection} from '@/lib/profile';
import {awardRewards,equipOutfit,customize,palettes} from '@/lib/rewards';
import { careers } from '@/lib/catalog';
import { db } from '@/lib/db';
import { applyChoice,newPlayer,safeGame,tickClock,useLeap,manageBusiness,dreams,validAppearance,type Game,type Dream } from '@/lib/game';
export function bonusRoll(draw=()=>crypto.getRandomValues(new Uint32Array(1))[0]){let n=draw();while(n>=4294967000)n=draw();return n%1000;}
const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
function cookie(req:Request){return req.headers.get('cookie')?.split(';').map(s=>s.trim()).find(s=>s.startsWith('dreambound_player='))?.split('=')[1]||'';}
function upgrade(g:Game){g.players.forEach((p,i)=>{p.matchMode=g.mode||'campaign';if(p.choiceSeed===undefined){p.choiceSeed=(g.seed^(i?0x9e3779b9:0))>>>0;if(p.checkpoint)p.checkpoint.kind=(p.level-1)%5;}});return g;}
function validName(s:unknown){return typeof s==='string'&&s.trim().length>=1&&s.trim().length<=20;}
function validDream(s:unknown):s is Dream{return typeof s==='string'&&Object.prototype.hasOwnProperty.call(dreams,s);}
export async function GET(req:Request){try{const id=new URL(req.url).searchParams.get('room');if(!id||!/^[A-Z0-9]{8}$/.test(id))return json({error:'Enter a valid 8-character room code.'},400);const row=await db().prepare('SELECT state, revision FROM games WHERE id = ?').bind(id).first<{state:string;revision:number}>();if(!row)return json({error:'That room was not found. Check the code and try again.'},404);const g:Game=upgrade(JSON.parse(row.state));const me=cookie(req);if(!g.players.some(p=>p.id===me))return json({join:true,room:id,mode:g.mode||'campaign',full:g.players.length>=2||g.solo},200);const p=g.players.find(p=>p.id===me)!;const wasFinished=!!g.winner,oldDeadline=g.quickDeadline;if(g.mode==='quick')tickClock(g,Date.now());const expired=expireShared(g,Date.now());if(!wasFinished&&g.winner||oldDeadline!==g.quickDeadline){if(!expired)g.revision++;}if(expired||!wasFinished&&g.winner||oldDeadline!==g.quickDeadline){const saved=await db().prepare('UPDATE games SET state = ?, revision = ? WHERE id = ? AND revision = ?').bind(JSON.stringify(g),g.revision,g.id,row.revision).run();if(saved.meta.changes!==1)return json({error:'Match updated; reconnecting.'},409);}return json({game:safeGame(g,me),me});}catch(e){console.error('Game read failed',e);return json({error:'Could not load your match. Please try again.'},503);}}
export async function POST(req:Request){try{
 const b=await readJson(req,3000);await limitSensitiveAction(req,String(b.action));
 let me=cookie(req);if(!/^[a-f0-9-]{36}$/.test(me))me=crypto.randomUUID();let g:Game;
 if(b.action==='create'){
 if(!validName(b.name)||!validDream(b.dream))return json({error:'Enter a name (up to 20 characters) and choose your dream.'},400);
 const daily=b.daily===true?dailyChallenge():null;
 const bytes=crypto.getRandomValues(new Uint8Array(8)),alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',id=Array.from(bytes,v=>alphabet[v%alphabet.length]).join('');
 g={rulesVersion:RULES_VERSION,...(daily?{dailyDay:daily.day,dailyTitle:daily.title}:{}),mode:daily||b.mode==='quick'?'quick':'campaign',id,players:[newPlayer(me,(b.name as string).trim(),daily?.dream||b.dream,daily?.careerId|| (careers.some(c=>c.id===b.careerId)?b.careerId as string:undefined))],turn:0,solo:daily?true:b.solo===true,winner:null,seed:daily?.seed??crypto.getRandomValues(new Uint32Array(1))[0],revision:0,activeSeconds:0,clockAt:Date.now()};
 g.players[0].matchMode=g.mode;if(g.mode==='quick'&&g.solo)g.quickDeadline=Date.now()+900000;if(g.mode==='quick')g.players[0].scoreWealthTarget=100000;g.players[0].choiceSeed=g.seed;
 if(palettes.some(x=>x.id===b.palette))g.players[0].palette=b.palette as string;
 if(validAppearance(b.appearance))g.players[0].appearance=b.appearance;if(typeof b.sport==='string'&&['Basketball','Soccer','Tennis','Track'].includes(b.sport))g.players[0].sport=b.sport;if(validWorkGoal(b.workGoal))g.players[0].workGoal=b.workGoal;if(daily){g.players[0].workGoal=daily.workGoal;g.players[0].sport='Basketball';} await inheritCollection(g.players[0]);
 await db().prepare('INSERT INTO games (id, state, revision, created_at) VALUES (?, ?, 0, ?)').bind(id,JSON.stringify(g),Date.now()).run();
 }else{
 if(typeof b.room!=='string'||!/^[A-Z0-9]{8}$/.test(b.room))return json({error:'Check your room code.'},400);
 const row=await db().prepare('SELECT state, revision FROM games WHERE id = ?').bind(b.room).first<{state:string;revision:number}>();if(!row)return json({error:'This room does not exist.'},404);g=upgrade(JSON.parse(row.state));if(g.mode==='quick'&&g.quickDeadline&&Date.now()>=g.quickDeadline&&!g.winner&&g.players.some(p=>p.id===me)){tickClock(g,Date.now());g.revision++;const saved=await db().prepare('UPDATE games SET state = ?, revision = ? WHERE id = ? AND revision = ?').bind(JSON.stringify(g),g.revision,g.id,row.revision).run();if(saved.meta.changes!==1)return json({error:'Match updated. Refresh to see your result.'},409);return json({game:safeGame(g,me),me});}const existing=g.players.find(p=>p.id===me);if(existing)await inheritCollection(existing);
 if(b.action==='join'){
 if(!validName(b.name)||!validDream(b.dream))return json({error:'Enter your name and choose your dream.'},400);
 if(!g.players.some(p=>p.id===me)){if(g.solo||g.players.length>=2)return json({error:'This room is full. Ask your friend for a new room link.'},409);g.players.push(newPlayer(me,(b.name as string).trim(),b.dream,careers.some(c=>c.id===b.careerId)?b.careerId as string:undefined));g.players[g.players.length-1].matchMode=g.mode||'campaign';if(g.mode==='quick'&&g.rulesVersion==='1.0')g.players[g.players.length-1].scoreWealthTarget=100000;g.players[g.players.length-1].choiceSeed=(g.seed^0x9e3779b9)>>>0;if(palettes.some(x=>x.id===b.palette))g.players[g.players.length-1].palette=b.palette as string;if(validAppearance(b.appearance))g.players[g.players.length-1].appearance=b.appearance;if(validWorkGoal(b.workGoal))g.players[g.players.length-1].workGoal=b.workGoal;if(typeof b.sport==='string'&&['Basketball','Soccer','Tennis','Track'].includes(b.sport))g.players[g.players.length-1].sport=b.sport;await inheritCollection(g.players[g.players.length-1]);if(g.mode==='quick')g.quickDeadline=Date.now()+900000;g.revision++;}
 }else if(b.action==='shared'){
 try{g=submitShared(g,me,b.eventId,b.vote);}catch(e){return json({error:(e as Error).message},400);}
 }else if(b.action==='tick'||b.action==='pause'){
 if(!g.players.some(p=>p.id===me))return json({error:'Join this match first.'},403);
 if(g.players[g.turn]?.id===me&&(g.solo||g.players.length===2)&&!g.winner){tickClock(g,Date.now(),b.action==='tick');g.revision++;}
 }else if(b.action==='leap'){
 if(!g.players.some(p=>p.id===me)||g.players[g.turn]?.id!==me)return json({error:'Use a ticket on your active turn.'},403);
 if(b.revision!==row.revision)return json({error:'Your match changed. Refresh it and try again.'},409);
 try{tickClock(g,Date.now());if(!g.winner)g=useLeap(g,me);else g.revision++;}catch(e){return json({error:(e as Error).message},400);}
 }else if(b.action==='manage'){
 if(!g.players.some(p=>p.id===me))return json({error:'Join this match first.'},403);if(b.revision!==row.revision)return json({error:'Your match changed. Refresh and try again.'},409);
 try{if(g.players[g.turn]?.id!==me)throw new Error('It is not your turn.');tickClock(g,Date.now());if(!g.winner)g=manageBusiness(g,me,b.setting,bonusRoll());else g.revision++;}catch(e){return json({error:(e as Error).message},400);}
 }else if(b.action==='customize'){
 const p=g.players.find(p=>p.id===me);if(!p)return json({error:'Join this match first.'},403);
 if(b.revision!==row.revision)return json({error:'Your match changed. Refresh it and try again.'},409);
 try{awardRewards(p,g.winner===me&&!['time','quick'].includes(g.finishedReason||''));customize(p,b.accessory,b.palette,g.winner===me&&!['time','quick'].includes(g.finishedReason||''));if(b.appearance!==undefined){if(!validAppearance(b.appearance))throw new Error('Choose valid character features.');p.appearance=b.appearance;}}catch(e){return json({error:(e as Error).message},400);}g.revision++;
 }else if(b.action==='equip'){
 const p=g.players.find(p=>p.id===me);if(!p)return json({error:'Join this match before changing your outfit.'},403);
 if(b.revision!==row.revision)return json({error:'Your match changed. Refresh it and try again.'},409);
 try{awardRewards(p,g.winner===me&&!['time','quick'].includes(g.finishedReason||''));equipOutfit(p,b.outfit,g.winner===me&&!['time','quick'].includes(g.finishedReason||''));}catch(e){return json({error:(e as Error).message},400);}g.revision++;
 }else if(b.action==='move'){
 if(!g.players.some(p=>p.id===me))return json({error:'Join this match before playing.'},403);
 if(b.revision!==row.revision)return json({error:'Your match changed. Refresh it and try again.'},409);
 if(!Number.isInteger(b.index)||!['choice','prepare'].includes(b.kind as string))return json({error:'Choose a valid action.'},400);
 try{if(g.players[g.turn]?.id!==me)throw new Error('It is not your turn yet.');tickClock(g,Date.now());if(!g.winner)g=applyChoice(g,me,b.index as number,b.kind as 'choice'|'prepare',bonusRoll());else g.revision++;}catch(e){return json({error:(e as Error).message},400);}
 }else return json({error:'Unknown action.'},400);
 const result=await db().prepare('UPDATE games SET state = ?, revision = ? WHERE id = ? AND revision = ?').bind(JSON.stringify(g),g.revision,g.id,row.revision).run();if(result.meta.changes!==1)return json({error:'Your match changed. Refresh it and try again.'},409);
 }
 const savedPlayer=g.players.find(p=>p.id===me);if(savedPlayer)await syncCollection(me,savedPlayer,g.id,g.winner===me&&!['time','quick'].includes(g.finishedReason||''));
 return new Response(JSON.stringify({game:safeGame(g,me),me}),{headers:{'Content-Type':'application/json','Cache-Control':'no-store','Set-Cookie':`dreambound_player=${me}; HttpOnly; SameSite=Lax; Path=/; Max-Age=31536000${new URL(req.url).protocol==='https:'?'; Secure':''}`}});
 }catch(e){const rejected=requestError(e);if(rejected)return rejected;console.error('Game save failed',e);return json({error:'Your move could not be saved. Refresh your match before trying again.'},503);}}
