// Atlas cells have unequal padding. Align visible chins and hair roots, not cell edges.
// Face bounds were measured in the unmodified 418px atlas cells.
export const faceBounds=[
 [113,118,366,342],[80,121,338,350],[64,115,294,348],
 [113,77,368,302],[80,78,338,306],[56,71,300,307],
 [114,23,360,238],[85,15,333,237],[64,16,295,239],
] as const;
// Shared face coordinate system: all visible faces are 35 units tall, chin anchored
// to the collar. Hair frames keep their aspect ratio; each fringe is registered to
// the forehead, with shorter styles above the eyes rather than across them.
export const hairAnchors=[
 {x:270,y:245,size:75,forehead:26},
 {x:250,y:225,size:75,forehead:27},
 {x:250,y:217,size:75,forehead:27},
 {x:255,y:145,size:75,forehead:31},
 {x:250,y:185,size:75,forehead:25},
 {x:220,y:170,size:75,forehead:30},
] as const;
export function avatarLayout(skin:number,face:number,hair:number,level:number){
 const bodyScale=level<=10?.89:level<=20?.95:1;
 const chin=100-55*bodyScale;
 const [left,top,right,bottom]=faceBounds[skin*3+face];
 const scale=35/(bottom-top),faceSize=418*scale;
 const root=hairAnchors[hair];
 // Fit the hair to the actual visible face width across all nine skin/shape cells.
 const hairSize=root?root.size*((right-left)*scale/39.5):0;
 return {bodyScale,face:{width:`${faceSize}%`,height:`${faceSize}%`,left:`${50-(left+right)/2*scale}%`,top:`${chin-bottom*scale}%`},hair:root?{width:`${hairSize}%`,height:`${hairSize}%`,left:`${50-root.x*hairSize/512}%`,top:`${chin-root.forehead-root.y*hairSize/512}%`}:null};
}
