import type {Player} from './game';
export const outfits=[
 {id:'starter',name:'Fresh start',detail:'Teal jacket & matching sneakers',color:'#6ee7cd'},
 {id:'spark',name:'First spark',detail:'Sunshine hoodie',color:'#ffcf56'},
 {id:'rising',name:'Rising star',detail:'Violet varsity jacket & matching sneakers',color:'#b398ff'},
 {id:'builder',name:'The builder',detail:'Green workwear & tool belt',color:'#71e0bd'},
 {id:'icon',name:'Main character',detail:'Pink bomber',color:'#ff8ac6'},
 {id:'dreamer',name:'Dream royalty',detail:'Purple and gold victory cape',color:'#ffe790'},
] as const;
export type OutfitId=typeof outfits[number]['id'];
export const milestones=[
 {id:'first',name:'The first move',description:'Make your first choice.',stars:10,outfit:'spark',test:(p:Player)=>p.turns>=1},
 {id:'rising',name:'Finding your feet',description:'Reach level 5.',stars:25,outfit:'rising',test:(p:Player)=>p.level>=5},
 {id:'investor',name:'Money in motion',description:'Own your first investment.',stars:20,outfit:null,test:(p:Player)=>p.portfolio>0},
 {id:'builder',name:'Open for business',description:'Build your first business asset.',stars:30,outfit:'builder',test:(p:Player)=>p.business>0},
 {id:'wellbeing',name:'Living well',description:'Reach 90 wellbeing.',stars:15,outfit:null,test:(p:Player)=>p.health>=90},
 {id:'chapter',name:'A bigger world',description:'Reach level 11 and grow into a teen.',stars:50,outfit:null,test:(p:Player)=>p.level>=11},
 {id:'adult',name:'Your own way',description:'Reach level 21 and grow into an adult.',stars:75,outfit:null,test:(p:Player)=>p.level>=21},
 {id:'icon',name:'Main character energy',description:'Reach level 25.',stars:100,outfit:'icon',test:(p:Player)=>p.level>=25},
 {id:'freedom',name:'Time is yours',description:'Reach 50 free time.',stars:30,outfit:null,test:(p:Player)=>p.freedom>=50},
 ...[30,40].map(level=>({id:'chapter-'+level,name:level===30?'A firm foundation':'Your own blueprint',description:'Reach level '+level+'. New style stars for your collection.',stars:60,outfit:null,test:(p:Player)=>p.level>=level})),
 {id:'halfway',name:'Halfway to a dream',description:'Reach level 50.',stars:150,outfit:null,test:(p:Player)=>p.level>=50},
 ...[60,70,80,90,95,100].map((level,i)=>({id:'chapter-'+level,name:['Beyond the grind','The freedom era','Legacy builder','Life by design','Almost legendary','At the summit'][i],description:'Reach level '+level+'. New style stars for your collection.',stars:60,outfit:null,test:(p:Player)=>p.level>=level})),
 {id:'dreamer',name:'Dream achieved',description:'Complete your life dream and win.',stars:300,outfit:'dreamer',test:(_p:Player,won:boolean)=>won},
];
export function earnedRewards(p:Player,won=false):string[]{return [...new Set([...(p.earnedRewards||[]),...milestones.filter(m=>m.test(p,won)).map(m=>m.id)])];}
export function awardRewards(p:Player,won=false){p.earnedRewards=earnedRewards(p,won);}
export function ownedOutfits(p:Player,won=false):OutfitId[]{const earned=earnedRewards(p,won);return [...new Set(['starter',...(p.collectionOutfits||[]),...milestones.filter(m=>earned.includes(m.id)&&m.outfit).map(m=>m.outfit)])] as OutfitId[];}
export function wornOutfit(p:Player,won=false):OutfitId{const owned=ownedOutfits(p,won);if(p.outfit&&owned.includes(p.outfit as OutfitId))return p.outfit as OutfitId;return (earnedRewards(p,won).map(id=>milestones.find(m=>m.id===id)?.outfit).filter(Boolean).at(-1) as OutfitId)||'starter';}
export function rewardStars(p:Player,won=false){const earned=earnedRewards(p,won);return milestones.filter(m=>earned.includes(m.id)).reduce((n,m)=>n+m.stars,0)+(p.bonusCount||0)*100+(p.eventStars||0);}
export function avatarStage(level:number){return level<=10?'child':level<=20?'teen':'adult';}
export function equipOutfit(p:Player,id:unknown,won=false){if(id==='auto'){delete p.outfit;return;}if(typeof id!=='string'||!ownedOutfits(p,won).includes(id as OutfitId))throw new Error('Earn this outfit before wearing it.');p.outfit=id;}

export const palettes=[{id:'original',name:'Natural colors · no tint',hue:0,color:'#30c3bc',filter:'none'},{id:'sunset',name:'Violet tint',hue:70,color:'#b985e8',filter:'grayscale(1) sepia(1) saturate(4) hue-rotate(220deg)'},{id:'ocean',name:'Ocean blue tint',hue:160,color:'#75baff',filter:'grayscale(1) sepia(1) saturate(4) hue-rotate(170deg)'},{id:'neon',name:'Neon green tint',hue:270,color:'#9ee965',filter:'grayscale(1) sepia(1) saturate(4) hue-rotate(55deg)'}];
export const accessories=[
 {id:'none',name:'No accessory',icon:'',level:1,cost:0},
 {id:'sparkle',name:'Sparkle trail',icon:'✦',level:1,cost:10},
 {id:'heart',name:'Heart companion',icon:'♥',level:15,cost:25},
 {id:'butterfly',name:'Pixel butterfly',icon:'ʚɞ',level:25,cost:40},
 {id:'orbit',name:'Orbit ring',icon:'◌',level:35,cost:50},
 {id:'lightning',name:'Electric aura',icon:'ϟ',level:45,cost:60},
 {id:'wings',name:'Dream wings',icon:'❮❯',level:55,cost:75},
 {id:'diamond',name:'Diamond companion',icon:'◆',level:65,cost:80},
 {id:'halo',name:'Golden halo',icon:'◯',level:75,cost:90},
 {id:'galaxy',name:'Galaxy aura',icon:'✧',level:85,cost:100},
 {id:'royal',name:'Royal constellation',icon:'♛',level:95,cost:110},
 {id:'laurel',name:'Legacy Laurel',icon:'❧',level:1,cost:0},
 {id:'sunrise',name:'Dawn companion',icon:'☀',level:1,cost:0},
 {id:'comet',name:'Cosmic comet',icon:'☄',level:1,cost:0},
];
export function starBalance(p:Player,won=false){return rewardStars(p,won)-(p.starsSpent||0);}
export function customize(p:Player,accessory:unknown,palette:unknown,won=false){if(typeof palette==='string'){if(!palettes.some(x=>x.id===palette))throw new Error('Choose an available color palette.');p.palette=palette;}
 if(typeof accessory==='string'){const a=accessories.find(x=>x.id===accessory);if(!a)throw new Error('Choose an available accessory.');const owned=[...(p.ownedAccessories||[]),...(p.collectionAccessories||[])].includes(a.id)||a.id==='none';if(!owned){if(a.id==='sunrise')throw new Error('Finish all 15 decisions in a daily challenge.');if(a.id==='laurel')throw new Error('Complete your final work-goal milestone.');if(a.id==='comet')throw new Error('The Comet is a rare bonus.');if(p.level<a.level)throw new Error('Reach the required level first.');if(starBalance(p,won)<a.cost)throw new Error('Earn more style stars first.');p.starsSpent=(p.starsSpent||0)+a.cost;p.ownedAccessories=[...(p.ownedAccessories||[]),a.id];}p.accessory=a.id;}}
