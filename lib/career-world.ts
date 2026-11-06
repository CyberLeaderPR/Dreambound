import {findCareer,industries} from './catalog';
export const careerWorlds=[
 {id:'hospitality',name:'Hotel & travel hub'}, {id:'food',name:'Bakery & food workspace'},
 {id:'technology',name:'Technology studio'}, {id:'health',name:'Health & wellbeing clinic'},
 {id:'creative',name:'Creative production studio'}, {id:'finance',name:'Finance & consulting office'},
 {id:'trades',name:'Trades workshop'}, {id:'property',name:'Architecture & planning studio'},
 {id:'retail',name:'Retail boutique'}, {id:'education',name:'Learning & public service hub'},
 {id:'logistics',name:'Logistics & manufacturing depot'}, {id:'science',name:'Science & sports campus'}
];
export function careerWorld(careerId:string,level:number){if(level<=20)return null;const sector=findCareer(careerId).industry,index=careerWorlds.findIndex(w=>w.id===sector);return {...careerWorlds[index],index,sector:industries.find(i=>i.id===sector)?.name};}
