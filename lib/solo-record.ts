export type SoloRecord={best:number;last:{id:string;score:number;previous:number|null}};
export function recordSolo(previous:SoloRecord|null,id:string,score:number):SoloRecord{
 if(previous?.last.id===id)return previous;
 return {best:Math.max(previous?.best??0,score),last:{id,score,previous:previous?.best??null}};
}
