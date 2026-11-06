import type {Player} from './game';
import {earnedRewards,rewardStars,wornOutfit,milestones,avatarStage,accessories,ownedOutfits,outfits,starBalance} from './rewards';
import {workMilestones} from './work-goals';
export function rewardNotice(before:Player,after:Player,won=false,wasWon=false){
 const old=earnedRewards(before,wasWon),fresh=earnedRewards(after,won).filter(x=>!old.includes(x));
 const stars=rewardStars(after,won)-rewardStars(before,wasWon),tickets=Math.max(0,(after.leaps||0)-(before.leaps||0));
 const looks=ownedOutfits(after,won).filter(x=>!ownedOutfits(before,wasWon).includes(x));
 const companions=(after.ownedAccessories||[]).filter(x=>!(before.ownedAccessories||[]).includes(x));
 const work=workMilestones(after).filter((_,i)=>(after.workRewards||[]).includes(i)&&!(before.workRewards||[]).includes(i));
 const names=[...((after.bonusCount||0)>(before.bonusCount||0)?['Cosmic bonus!']:[]),...looks.map(id=>`${outfits.find(o=>o.id===id)?.name} outfit unlocked`),...companions.map(id=>`${accessories.find(a=>a.id===id)?.name||id} earned`),...work.map(m=>m.name),...(tickets?[`${tickets} Leap Ticket${tickets===1?'':'s'} earned`]:[]),...fresh.filter(id=>!looks.some(look=>look===milestones.find(m=>m.id===id)?.outfit)).map(id=>milestones.find(m=>m.id===id)!.name),...((after.curveHistory||[]).length>(before.curveHistory||[]).length?['Curveball handled']:[]),...((after.storyHistory||[]).length>(before.storyHistory||[]).length?['Story chapter complete']:[])];
 if(stars>0&&!names.length)names.push('Shared opportunity resolved');
 if(after.level===before.level&&!names.length&&stars<=0&&!won)return null;
 return {appearance:after,level:after.level,stars,tickets,balance:starBalance(after,won),names,outfit:wornOutfit(after,won),grew:avatarStage(before.level)!==avatarStage(after.level),won};
}
