import type {Player,Choice} from './game';
export type PromiseRecord={due:number;kind:'mentor'|'repair'|'client';resolved?:boolean;sourceChoice?:string;sourceTurn?:number;contact?:string;resolution?:string;resolvedTurn?:number};
const contacts={mentor:{id:'maya',name:'Maya, your mentor'},repair:{id:'alex',name:'Alex, your teammate'},client:{id:'sam',name:'Sam, your first customer'}};
export function rememberConsequence(p:Player,c:Choice){
 p.promises||=[];p.relationships||={};
 const kind=c.kind==='connect'?'mentor':c.kind==='break-promise'?'repair':c.businessType?'client':null;
 if(kind){const person=contacts[kind],bond=p.relationships[person.id]||{name:person.name,trust:50,lastChoice:'',turn:0};bond.trust=Math.max(0,Math.min(100,bond.trust+(kind==='repair'?-18:8)));bond.lastChoice=c.title;bond.turn=p.turns+1;p.relationships[person.id]=bond;
 if(!p.promises.some(x=>!x.resolved&&x.kind===kind))p.promises.push({due:p.turns+2+((p.choiceSeed||0)+p.turns)%3,kind,sourceChoice:c.title,sourceTurn:p.turns+1,contact:person.id});}
 if(c.promiseIndex!==undefined&&p.promises[c.promiseIndex]){const promise=p.promises[c.promiseIndex];promise.resolved=true;promise.resolution=c.title;promise.resolvedTurn=p.turns+1;const person=contacts[promise.kind],bond=p.relationships[person.id]||{name:person.name,trust:50,lastChoice:'',turn:0};const changes:Record<string,number>={'follow-through':15,renegotiate:7,referral:6,delegate:5,withdraw:-20};bond.trust=Math.max(0,Math.min(100,bond.trust+(changes[c.kind||'']||0)));bond.lastChoice=c.title;bond.turn=p.turns+1;p.relationships[person.id]=bond;}
 p.promises=p.promises.slice(-12);
}
export function consequenceEvent(p:Player){
 const i=(p.promises||[]).findIndex(x=>!x.resolved&&p.turns>=x.due);if(i<0)return null;
 const promise=p.promises![i],person=contacts[promise.kind],bond=p.relationships?.[person.id]?.trust??50,s=Math.max(1,Math.floor(p.level/10)),reliable=(p.trust??50)>=55&&bond>=50,close=bond>=70;
 const title=promise.kind==='repair'?`${person.name} asks whether your word still matters`:promise.kind==='client'?`${person.name} returns with a new request`:`${person.name} remembers your help`;
 const source=promise.sourceChoice?`Because you chose “${promise.sourceChoice}” on decision ${promise.sourceTurn}, ${person.name.split(',')[0]} is back.`:'An earlier commitment brought this person back. This older save did not record the original choice.';
 const offer=reliable?close?'Your strong relationship unlocks a larger, warm introduction.':'Your reputation and this relationship unlock a trusted referral.':`The larger referral is unavailable: it needs 55 public trust and 50 relationship trust. You have ${p.trust??50} and ${bond}. A smaller rebuilding task is available instead.`;
 const payout=(reliable?(close?60:40):10)*s;
 const options:Choice[]=[
 {title:promise.kind==='repair'?`Make it right with ${person.name.split(',')[0]}`:'Keep the commitment personally',health:-8,trust:10,obligation:-3,hint:'Wellbeing −8 · public trust +10 · obligations −3 · relationship +15',outcome:'You followed through. This person is more willing to trust you next time.',kind:'follow-through'},
 {title:'Renegotiate a realistic deadline',freedom:-5,trust:3,obligation:-2,hint:'Free time −5 · public trust +3 · obligations −2 · relationship +7',outcome:'Honesty preserved the relationship without overpromising.',kind:'renegotiate'},
 {title:reliable?close?'Accept the warm introduction':'Accept the trusted referral':'Earn back trust with a small task',cash:payout,health:-5,trust:reliable?2:5,hint:`Cash +$${payout} · wellbeing −5 · public trust +${reliable?2:5} · relationship +6`,outcome:offer,kind:'referral'},
 {title:'Bring in a capable partner',cash:-8*s,freedom:8,network:5,hint:`Costs $${8*s} · time +8 · network +5 · relationship +5`,outcome:'A paid partner helped you deliver and freed your schedule.',kind:'delegate'},
 {title:'Walk away from the commitment',trust:-10,obligation:2,health:6,hint:'Public trust −10 · obligations +2 · wellbeing +6 · relationship −20',outcome:'You protected today’s energy. This person will be less willing to offer their next opportunity.',kind:'withdraw'}];
 return {title,description:source+' '+offer,choices:options.map(c=>({...c,promiseIndex:i,slot:'relationship',advice:`${person.name}: relationship ${bond}/100. ${offer}`}))};
}
export function relationshipMemories(p:Player){return (p.promises||[]).slice(-4).reverse().map(x=>({name:contacts[x.kind].name,source:x.sourceChoice||'An earlier commitment',turn:x.sourceTurn,status:x.resolved?`You chose: ${x.resolution||'resolved in an earlier version'}`:p.turns>=x.due?'This person is waiting for your answer.':`This person may return from decision ${x.due+1}.`,trust:p.relationships?.[contacts[x.kind].id]?.trust??50}));}
