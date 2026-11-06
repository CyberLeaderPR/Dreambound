const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),assert=require('node:assert/strict'),ts=require('typescript');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'dreambound-tests-'));
for(const name of ['finales','release','multiplayer-depth','consequences','catalog','rewards','game','stories','business-depth','work-goals','variety'])fs.writeFileSync(path.join(tmp,name+'.js'),ts.transpileModule(fs.readFileSync(path.join(__dirname,'../lib/'+name+'.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText);
const {newPlayer,applyChoice,relevantChoices,relevantPreparation,choicePool,levelGoal,dreamGoals,netWorth}=require(path.join(tmp,'game.js'));
const {careers,businesses}=require(path.join(tmp,'catalog.js'));
assert.equal(careers.length,120);assert.equal(new Set(careers.map(c=>c.name)).size,120);assert.equal(businesses.length,60);
for(let lv=1;lv<=100;lv++){const p=newPlayer('a','Tester','hotel');p.level=lv;assert.ok(choicePool(p).length>=78);assert.equal(relevantChoices(p).length,5);assert.ok(relevantChoices(p).some(c=>p.cash+(c.cash||0)>=0));}
let a=newPlayer('a','A','hotel','hospitality-0'),b=newPlayer('b','B','founder','technology-0');assert.notDeepEqual(relevantChoices(a).map(c=>c.title),relevantChoices(b).map(c=>c.title));
let multi={id:'TESTROOM',players:[a,b],turn:0,solo:false,winner:null,seed:1,revision:0};assert.throws(()=>applyChoice(multi,'b',0,'choice'),/not your turn/);const after=applyChoice(multi,'a',0,'choice');assert.equal(after.turn,1);assert.equal(multi.revision,0);assert.equal(after.revision,1);assert.throws(()=>applyChoice(after,'a',0,'choice'),/not your turn/);
function score(p,c){const g=levelGoal(p.level,p),s=(p.cash<Math.max(80,p.level*100)?(c.cash||0)*.02:0)+(c.skill||0)*.8+(c.freedom||0)*.6;let n=s;
 if(p.health<55)n+=(c.health||0)*12;
 if(g.label==='Grow your investments')n+=(c.portfolio||0)*20;
 if(g.label==='Build your skills')n+=(c.skill||0)*20;
 if(g.label==='Protect your wellbeing')n+=(c.health||0)*20;
 if(g.label==='Reclaim your time')n+=(c.freedom||0)*20;
 if(p.level===100){for(const g of dreamGoals(p))if(g.current<g.target){if(g.label==='Business assets')n+=(c.business||0)*2;if(g.label==='Passive income / turn')n+=(c.passive||0)*20;if(g.label==='Free time')n+=(c.freedom||0)*100;if(g.label==='Wellbeing')n+=(c.health||0)*100;if(g.label==='Own a hotel or B&B'&&/hotel|breakfast/i.test(c.businessType||''))n+=1e7;if(g.label==='Net worth')n+=(c.cash||0)*2+(c.business||0)*2+(c.portfolio||0)*2;}}

 if(c.risk)n-=100;if(p.health>90&&(c.health||0)>0)n-=20;if(p.freedom>=100&&(c.freedom||0)>0)n-=10;return n;}
for(const dream of ['hotel','founder','freedom'])for(const seed of [1,27,991]){let game={id:'SIMROOM1',players:[newPlayer('a','Sim',dream,dream==='founder'?'technology-0':'hospitality-0')],turn:0,solo:true,winner:null,seed,revision:0};let turns=0;while(!game.winner&&turns<700){const p=game.players[0],opts=p.decided?relevantPreparation(p):relevantChoices(p);const ranked=opts.map((c,i)=>({i,c,n:score(p,c)})).filter(x=>p.cash+(x.c.cash||0)>=0).sort((a,b)=>b.n-a.n);assert.ok(ranked.length,'No affordable action');game=applyChoice(game,'a',ranked[0].i,p.decided?'prepare':'choice');for(const k of ['cash','portfolio','business','passive','skill','health','debt','freedom'])assert.ok(Number.isFinite(game.players[0][k])&&game.players[0][k]>=0,k+' invalid');turns++;}assert.ok(game.winner,`${dream} seed ${seed} stuck level ${game.players[0].level} ${JSON.stringify(dreamGoals(game.players[0]))}`);console.log(`${dream}, seed ${seed}: 100 levels completed in ${turns} turns; net worth ${netWorth(game.players[0])}`);}
fs.rmSync(tmp,{recursive:true,force:true});console.log('PASS: catalogs, 100 choice pools, adaptive recommendations, turn authorization, and all dream paths.');
