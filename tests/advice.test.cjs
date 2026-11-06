const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),ts=require('typescript'),assert=require('node:assert/strict');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'dreambound-advice-'));
for(const f of fs.readdirSync('lib').filter(x=>x.endsWith('.ts')))fs.writeFileSync(path.join(tmp,f.replace('.ts','.js')),ts.transpileModule(fs.readFileSync('lib/'+f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText);
const api=require(tmp+'/game.js'),{avatarLayout}=require(tmp+'/avatar-layout.js');
let menus=0,readings=0;const texts=new Set(),leads=new Set();
for(let seed=1;seed<=10;seed++){
 const p=api.newPlayer('a','Tester',['hotel','founder','freedom','athlete','artist','explorer','changemaker'][seed%7]);p.choiceSeed=seed;p.scoreWealthTarget=100000;
 let g={id:'TESTROOM',mode:'quick',rulesVersion:'1.0',players:[p],turn:0,solo:true,winner:null,seed,revision:0};
 while(!g.winner){const p=g.players[0],options=api.relevantChoices(p),before=JSON.stringify(p);menus++;
  const voices=[0,1,2].map(m=>api.adviceFor(p,options,m,'quick'));
  assert.equal(JSON.stringify(p),before,'advice must not mutate the save');
  assert.deepEqual(voices[0],api.adviceFor(structuredClone(p),options,0,'quick'),'refresh stable');
  options.forEach((c,i)=>{assert.equal(new Set(voices.map(v=>v[i].text)).size,3,'distinct mentor perspectives');voices.forEach(v=>{const a=v[i];assert.equal(a.title,c.title);assert.ok(!/undefined|NaN|looks impressive/.test(a.text));assert.ok(a.text.length<1100,'keep advice readable');assert.ok(a.effects.includes('Direct effects')||a.effects.includes('direct effects')||a.effects.includes('changes the situation'));texts.add(a.text);leads.add(a.text.split('.')[0]);readings++;});});
  const legal=options.map((c,i)=>({c,i})).filter(({c})=>p.cash+(c.cash||0)>=0&&p.skill>=(c.requiredSkill||0)&&p.health>=(c.requiredHealth||0));assert.ok(legal.length);const selected=legal[(seed+p.turns)%legal.length];g=api.applyChoice(g,'a',selected.i,'choice');
 }
 assert.equal(g.players[0].turns,15);
}
const p=api.newPlayer('a','Test','hotel');const advice=c=>api.adviceFor(p,[{title:'Test decision',hint:'',outcome:'',...c}],0,'quick')[0].text+' '+api.adviceFor(p,[{title:'Test decision',hint:'',outcome:'',...c}],0,'quick')[0].effects;
p.health=98;assert.match(advice({kind:'rest',health:23}),/only 2/);assert.match(advice({kind:'rest',health:23}),/wellbeing \+2/);
p.health=28;assert.match(advice({kind:'work',health:-10,cash:20}),/halving earned income/);
p.cash=5;assert.match(advice({cash:-20}),/\$15 more cash/);
p.cash=100;assert.match(advice({risk:true,cash:-20,portfolio:85}),/55% failure/);
p.level=15;p.skill=20;assert.match(advice({flag:'scholarship',skill:9}),/20 to 29/);
p.debt=50;assert.match(advice({kind:'debt',cash:-20,debt:-20}),/2% interest/);
p.promises=[{kind:'repair',due:1}];assert.match(advice({promiseIndex:0,kind:'withdraw',trust:-10}),/earlier broken promise/);
p.trust=30;assert.match(advice({promiseIndex:0,kind:'referral'}),/public reputation and personal relationship/);
assert.ok(texts.size>150,'varied contextual text over repeated lives');
let layouts=0;for(const skin of [0,1,2])for(const face of [0,1,2])for(const hair of [0,1,2,3,4,5,6])for(const level of [1,15,80]){const a=avatarLayout(skin,face,hair,level);if(hair===6)assert.equal(a.hair,null);else {assert.equal(a.hair.width,a.hair.height,'never stretch a hair sprite');for(const n of Object.values(a.hair))assert.ok(Number.isFinite(parseFloat(n)));}layouts++;}
console.log(JSON.stringify({completedQuickRuns:10,menus,mentorReadings:readings,uniqueReadings:texts.size,uniqueOpeningSentences:leads.size,avatarLayouts:layouts}));
console.log('PASS: advice accuracy, capped recovery, affordability, risk, scholarship, debt, remembered promises, distinct mentors, stable reloads, non-mutating reads and proportional avatar geometry.');fs.rmSync(tmp,{recursive:true,force:true});
