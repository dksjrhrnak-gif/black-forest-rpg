/* Read-only CI gate: validate the requested commit only after Pages publishes it. */
const repo=process.env.GITHUB_REPOSITORY,sha=process.env.GITHUB_SHA;
if(!repo||!/^[0-9a-f]{40}$/.test(sha||''))throw Error('GITHUB_REPOSITORY and exact GITHUB_SHA are required');
const headers={Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28',...(process.env.GH_TOKEN?{Authorization:'Bearer '+process.env.GH_TOKEN}:{})};
async function read(path){const r=await fetch('https://api.github.com/repos/'+repo+path,{headers,signal:AbortSignal.timeout(30000)});if(!r.ok)throw Error('Pages deployment API HTTP '+r.status);return r.json();}
(async()=>{for(let attempt=0;attempt<90;attempt++){
 const ds=await read('/deployments?environment=github-pages&sha='+sha+'&per_page=10'),d=ds.find(x=>x.sha===sha);
 const state=d?(await read('/deployments/'+d.id+'/statuses'))[0]?.state:'not-created';
 if(state==='success'){console.log('PASS Pages deployment for '+sha+' / '+d.id);return;}
 if(['failure','error'].includes(state))throw Error('Pages deployment '+state+' for '+sha);
 if(attempt%6===0)console.log('Waiting for Pages '+sha+': '+state);
 await new Promise(resolve=>setTimeout(resolve,10000));
}throw Error('Pages deployment did not succeed within 15 minutes');})().catch(e=>{console.error(e.message);process.exit(1);});
