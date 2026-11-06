const fs=require('node:fs'),{spawnSync}=require('node:child_process');
let log=`Dreambound v0.4 verification — ${new Date().toISOString()}\n`;
for(const args of [['node_modules/typescript/bin/tsc','--noEmit'],...['game','rewards','depth','multiplayer','edition','work-campaigns'].map(t=>['tests/'+t+'.test.cjs'])]){const r=spawnSync(process.execPath,args,{encoding:'utf8'});const chunk=`\n$ node ${args.join(' ')}\n${r.stdout}${r.stderr}Exit: ${r.status}\n`;log+=chunk;process.stdout.write(chunk);fs.writeFileSync('docs/verification-v04.txt',log);if(r.status!==0)process.exit(r.status||1);}
