const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),ts=require('typescript'),assert=require('node:assert/strict');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'dreambound-endings-'));
for(const f of fs.readdirSync('lib').filter(x=>x.endsWith('.ts')))fs.writeFileSync(path.join(tmp,f.replace('.ts','.js')),ts.transpileModule(fs.readFileSync('lib/'+f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText);
const api=require(tmp+'/game.js'),f=require(tmp+'/finales.js'),co=require(tmp+'/consequences.js'),stories=require(tmp+'/stories.js');
const titles=new Set();let branches=0;
for(const dream of Object.keys(f.finales))for(let choice=0;choice<5;choice++)for(const mode of ['quick','campaign']){
 const p={...api.newPlayer('a','Alex',dream),matchMode:mode,level:mode==='quick'?93:100,turns:mode==='quick'?14:101,cash:choice===0?0:1000,business:500,portfolio:300,passive:20};
 p.promises=[{due:1,kind:'mentor',sourceChoice:'Helped my mentor',sourceTurn:2}];
 const before=JSON.stringify(p),opts=api.relevantChoices(p);assert.equal(JSON.stringify(p),before);assert.equal(opts.length,5);assert.ok(opts.every(c=>c.finaleChoice!==undefined&&p.cash+(c.cash||0)>=0));assert.equal(api.currentEvent(p).title,f.finales[dream].title);
 const g={id:'ENDTEST1',rulesVersion:'1.0',mode,players:[p],solo:true,turn:0,seed:40,revision:0,winner:null};
 const next=api.applyChoice(g,'a',choice,'choice'),after=next.players[0];assert.equal(after.finale.choice,choice);assert.equal(after.finale.dream,dream);assert.ok(after.cash>=0);assert.equal(f.finalDilemma(after),null);assert.equal(JSON.parse(JSON.stringify(after)).finale.choice,choice);
 if(mode==='quick'){assert.equal(after.turns,15);assert.equal(next.winner,'solo-complete');assert.equal(next.finishedReason,'quick');}
 const ending=f.personalEnding(after,next);assert.ok(ending.text.startsWith('Alex,'));assert.ok(ending.details.some(x=>x.includes('unresolved')));titles.add(ending.title);branches++;
 assert.throws(()=>api.applyChoice(g,'a',0,'choice',1,{title:'Bypass',hint:'',outcome:''}),/final dilemma/);
}
assert.equal(titles.size,35);assert.equal(branches,70);
const legacy=api.newPlayer('a','Old save','freedom');assert.equal(f.finalDilemma(legacy),null);assert.match(f.personalEnding(legacy,{winner:'solo-complete',mode:'quick',finishedReason:'time'}).text,/before you chose/);
const p={...api.newPlayer('a','Test','hotel'),trust:80,turns:1};co.rememberConsequence(p,{title:'Help at Maya’s workshop',kind:'connect',hint:'',outcome:''});assert.equal(p.promises[0].sourceTurn,2);p.turns=10;
let e=co.consequenceEvent(p);assert.match(e.description,/Help at Maya’s workshop/);assert.equal(e.choices[2].title,'Accept the trusted referral');const high=e.choices[2].cash;
co.rememberConsequence(p,e.choices[4]);assert.equal(p.relationships.maya.trust,38);co.rememberConsequence(p,{title:'Show up again',kind:'connect',hint:'',outcome:''});p.turns=20;e=co.consequenceEvent(p);assert.equal(e.choices[2].title,'Earn back trust with a small task');assert.ok(e.choices[2].cash<high,'personal relationship changes reward despite high public trust');co.rememberConsequence(p,e.choices[0]);assert.equal(p.promises.at(-1).resolution,'Keep the commitment personally');assert.ok(co.relationshipMemories(p).some(x=>x.source==='Help at Maya’s workshop'));
// Identical later scenes have materially different offers after different earlier answers.
const arc=stories.storyArcs.find(x=>x.id==='cofounder');function later(choice){const p={...api.newPlayer('x','Story','founder'),level:100,turns:50,stories:Object.fromEntries(stories.storyArcs.map(a=>[a.id,{step:2,choice:0,due:0}]))};p.stories.cofounder={step:1,choice,due:0};return stories.activeStory(p);}
const honest=later(0),broken=later(1);assert.match(honest.description,/Because you chose/);assert.match(broken.description,/reduces cash offers/);assert.ok(honest.choices[0].cash>broken.choices[0].cash);assert.ok(honest.choices[3].trust>broken.choices[3].trust);
console.log('PASS: 70 finale branches (7 dreams × 5 endings × 2 modes), zero-cash access, once-only saved choices, 15-decision timing, management bypass rejection, honest unfinished endings, remembered sources, relationship-dependent referrals and story-dependent rewards.');fs.rmSync(tmp,{recursive:true,force:true});
