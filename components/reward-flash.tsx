'use client';
import {Gift,Star,Ticket,X} from 'lucide-react';
import {toast} from 'sonner';
import {Toaster} from '@/components/ui/sonner';
import type {rewardNotice} from '@/lib/reward-notice';
type Notice=NonNullable<ReturnType<typeof rewardNotice>>;
export function RewardToaster(){return <Toaster position="top-center" duration={12000} visibleToasts={2} offset={18} mobileOffset={12}/>;}
export function flashReward(data:Notice,onView:()=>void){toast.custom(id=><div className={'reward-flash '+(data.won?'reward-victory':'')}>
 <div className="reward-flash-burst" aria-hidden="true"><Gift size={32}/></div><div className="reward-flash-copy"><span className="eyebrow">{data.won?'DREAM COMPLETE':data.names.length?'YOU EARNED IT':'CHECKPOINT CLEARED'}</span><h3>{data.names[0]||`Level ${data.level} reached!`}</h3>{data.names.length>1&&<p>{data.names.slice(1).join(' · ')}</p>}<div className="reward-receipt">{data.stars>0&&<strong><Star size={20} fill="currentColor"/>+{data.stars} style stars</strong>}{data.tickets>0&&<strong><Ticket size={20}/>+{data.tickets} ticket{data.tickets>1?'s':''}</strong>}</div>{data.stars>0&&<p>{data.balance} stars now available for accessories</p>}<button className="reward-view" onClick={()=>{toast.dismiss(id);onView();}}>View rewards</button></div><button className="reward-close" aria-label="Dismiss reward notification" onClick={()=>toast.dismiss(id)}><X size={19}/></button>
 </div>,{duration:12000});}
