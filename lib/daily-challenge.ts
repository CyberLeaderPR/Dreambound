import type {Dream} from './game';
import type {WorkGoal} from './work-goals';
const themes:{title:string;dream:Dream;careerId:string;workGoal:WorkGoal}[]=[
 {title:'A hotel with heart',dream:'hotel',careerId:'hospitality-0',workGoal:'autonomy'},
 {title:'Build your first venture',dream:'founder',careerId:'technology-0',workGoal:'enterprise'},
 {title:'Buy your time back',dream:'freedom',careerId:'finance-0',workGoal:'autonomy'},
 {title:'The championship path',dream:'athlete',careerId:'science-0',workGoal:'mastery'},
 {title:'Your headline moment',dream:'artist',careerId:'creative-0',workGoal:'creativity'},
 {title:'A world to discover',dream:'explorer',careerId:'science-0',workGoal:'location'},
 {title:'Leave your mark',dream:'changemaker',careerId:'education-0',workGoal:'purpose'}
];
export function dailyChallenge(now=Date.now()){
 const day=new Date(now).toISOString().slice(0,10),n=Math.floor(Date.parse(day+'T00:00:00Z')/86400000);
 let seed=2166136261;for(const c of 'dreambound-1.0-'+day)seed=Math.imul(seed^c.charCodeAt(0),16777619)>>>0;
 return {day,seed,...themes[n%themes.length]};
}
