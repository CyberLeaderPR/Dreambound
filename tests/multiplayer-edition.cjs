const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),ts=require('typescript'),assert=require('node:assert/strict');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'dreambound-v06-'));
for(const file of fs.readdirSync('lib').filter(x=>x.endsWith('.ts')))fs.writeFileSync(path.join(tmp,file.replace('.ts','.js')),ts.transpileModule(fs.readFileSync('lib/'+file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText);
const api=require(tmp+'/game.js'),mp=require(tmp+'/multiplayer-depth.js'),cons=require(tmp+'/consequences.js');
const reports=[];
for(let run=0;run<10;run++){
 let g={id:'TESTGAME',players:[api.newPlayer('a','Host','hotel'),api.newPlayer('b','Guest','artist')],turn:0,solo:false,winner:null,seed:300+run,revision:0,mode:'quick'};
 g.players.forEach((p,i)=>p.choiceSeed=g.seed+i*91);let actions=0,shared=0,returns=0,expired=0;
 while(!g.winner&&actions<100){
  if(g.shared&&!g.shared.resolved){shared++;const e=g.shared;
   if(run%3===0){assert.equal(mp.expireShared(g,e.deadline+1),true);expired++;}
   else {const affordableVote=(p,v)=>p.cash>=(e.kind==='auction'?v*e.stake:e.kind==='project'&&v===1?e.stake:0)?v:0;g=mp.submitShared(g,'a',e.id,affordableVote(g.players[0],run%3),e.deadline-5000);const safe=api.safeGame(g,'b');assert.equal(safe.shared.votes.opponent,-1);assert.ok(!JSON.stringify(safe.shared).includes('"a"'));assert.throws(()=>mp.submitShared(g,'a',e.id,0,e.deadline-5000),/locked/);g=mp.submitShared(g,'b',e.id,affordableVote(g.players[1],(run+1)%3),e.deadline-4000);assert.ok(g.shared.resolved);}
   continue;
  }
  const p=g.players[g.turn],opts=api.relevantChoices(p);assert.equal(opts.length,5);if(cons.consequenceEvent(p))returns++;
  const afford=opts.map((c,i)=>({c,i})).filter(({c})=>p.cash+(c.cash||0)>=0&&p.skill>=(c.requiredSkill||0)&&p.health>=(c.requiredHealth||0));assert.ok(afford.length,'recovery action available');
  const chosen=afford[(actions+run)%afford.length];g=api.applyChoice(g,p.id,chosen.i,p.decided?'prepare':'choice');actions++;
  // Simulate save, disconnect, and resume; private state must not change choices.
  const restored=JSON.parse(JSON.stringify(g));assert.deepEqual(api.relevantChoices(restored.players[restored.turn]),api.relevantChoices(g.players[g.turn]));g=restored;
  assert.ok(g.players.every(p=>p.cash>=0&&Number.isFinite(mp.quickScore(p))));
 }
 assert.equal(g.finishedReason,'quick');assert.deepEqual(g.players.map(p=>p.turns),[15,15]);assert.equal(actions,30);assert.equal(shared,4);assert.throws(()=>api.useLeap(g,'a'));
 reports.push({run:run+1,decisions:actions,sharedEvents:shared,timeouts:expired,returningConsequences:returns,scores:g.players.map(mp.quickScore),winner:g.winner});
}
// Explicit sealed-bid fairness and no charge for tied bids.
let base={id:'TESTGAME',players:[api.newPlayer('a','A','hotel'),api.newPlayer('b','B','hotel')],turn:0,solo:false,winner:null,seed:1,revision:0,shared:{id:1,kind:'auction',title:'Bid',stake:10,deadline:10000,votes:{}}};
let g=mp.submitShared(base,'a',1,2,1000);assert.throws(()=>api.applyChoice(g,'a',0,'choice'),/shared/);g=mp.submitShared(g,'b',1,1,1000);assert.equal(g.players[0].cash,20);assert.equal(g.players[1].cash,40);assert.equal(g.players[0].business,28);
g=mp.submitShared(base,'a',1,2,1000);g=mp.submitShared(g,'b',1,2,1000);assert.deepEqual(g.players.map(p=>p.cash),[40,40]);
let p=api.newPlayer('a','A','hotel');cons.rememberConsequence(p,{kind:'connect'});p.turns=6;const strong=cons.consequenceEvent({...p,trust:80}),weak=cons.consequenceEvent({...p,trust:20});assert.ok(strong.choices[2].cash>weak.choices[2].cash);cons.rememberConsequence(p,{promiseIndex:0});assert.equal(cons.consequenceEvent(p),null);
g={...base,mode:'quick',shared:undefined,activeSeconds:899,clockAt:1000,quickDeadline:2000};api.tickClock(g,3000);assert.equal(g.activeSeconds,900);assert.equal(g.finishedReason,'time');
// A solo finish is a scored completion, never an automatic opponent victory.
let solo={...base,mode:'quick',shared:undefined,solo:true,players:[{...p,turns:14}],winner:null};mp.finishQuick(solo);assert.equal(solo.winner,null);solo.players[0].turns=15;mp.finishQuick(solo);assert.equal(solo.winner,'solo-complete');
// A fixed deadline does not extend while paused or after a long disconnect.
let timed={...base,mode:'quick',shared:undefined,quickDeadline:901000,activeSeconds:0,clockAt:1000,winner:null};api.tickClock(timed,401000,false);assert.equal(timed.activeSeconds,400);api.tickClock(timed,1001000,false);assert.equal(timed.activeSeconds,900);assert.equal(timed.finishedReason,'time');assert.equal(timed.quickDeadline,901000);
// All five visible score contributions add to the same winner score. Stars do not count.
assert.equal(mp.quickScore({...p,eventStars:999999}),mp.quickScore(p));assert.equal(Math.round(mp.quickScoreParts(p).reduce((n,x)=>n+x.value,0)*10)/10,mp.quickScore(p));assert.equal(mp.quickScore({...p,cash:250000,portfolio:0,business:0,debt:0,health:100,freedom:100,trust:100,skill:100}),100);
const {recordSolo}=require(tmp+'/solo-record.js');let rec=recordSolo(null,'first',55);assert.equal(rec.last.previous,null);rec=recordSolo(rec,'second',60);assert.equal(rec.best,60);assert.equal(rec.last.previous,55);assert.deepEqual(recordSolo(rec,'second',60),rec);rec=recordSolo(rec,'third',50);assert.equal(rec.best,60);assert.equal(rec.last.previous,60);
console.log(JSON.stringify(reports,null,2));console.log('PASS: ten two-player Quick Matches; sealed decisions, bidding, timeout defaults, save/resume, returning consequences, 15-minute clock and no leap exploit.');
fs.rmSync(tmp,{recursive:true,force:true});
