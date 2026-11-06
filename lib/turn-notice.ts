import type {Game} from './game';
export function turnNotice(g:Game|null,me:string,paused:boolean,connection:string){
 if(!g||g.solo||g.winner||paused||connection!=='Connected'||g.players.length!==2)return null;
 const player=g.players.find(p=>p.id===me);if(!player)return null;
 if(g.shared&&!g.shared.resolved)return g.shared.votes[me]===undefined?{key:`${g.id}:shared-${g.shared.id}`,shared:true,label:'Shared decision: you’re up!'}:null;
 return g.players[g.turn]?.id===me?{key:`${g.id}:turn-${player.turns}`,shared:false,label:'Your turn!'}:null;
}
