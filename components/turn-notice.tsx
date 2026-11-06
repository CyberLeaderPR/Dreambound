'use client';
import {createContext,useContext} from 'react';
export const TurnNoticeContext=createContext<{label:string;turnKey:string;onReturn:()=>void}|null>(null);
export function TurnNotice({inDialog=false}:{inDialog?:boolean}){
 const notice=useContext(TurnNoticeContext);
 if(!notice)return null;
 return <div key={notice.turnKey} className={'turn-notice '+(inDialog?'turn-notice-dialog':'turn-notice-floating')} role="status" aria-live="polite" aria-atomic="true"><span aria-hidden="true">➜</span><div><strong>{notice.label}</strong><small>Your next decision is ready.</small></div><button type="button" className="btn" onClick={notice.onReturn}>Go to choices</button></div>;
}
