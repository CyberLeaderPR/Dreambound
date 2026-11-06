export const RULES_VERSION='1.0';
export const QUICK_DECISIONS=15;
export function quickLevel(turns:number){return Math.min(100,1+Math.floor(Math.max(0,turns)*99/QUICK_DECISIONS));}
