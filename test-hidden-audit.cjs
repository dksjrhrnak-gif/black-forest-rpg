/* Exhaustive authored hidden unlock gates; each negative removes one condition. */
const assert=require('node:assert/strict');
const {Game,JOBS,ITEMS}=require('./test-support.cjs'),C=global.BFContent;
function ready(id){
 const g=new Game(77);g.start('warrior');g.s.sigils=5;
 for(const [key,value] of Object.entries(JOBS[id].unlock)){
  if(typeof value==='number'){
   if(key==='bosses')g.s.cleared=Array.from({length:value},(_,i)=>i);
   else if(key==='endings')g.s.endings=Array.from({length:value},(_,i)=>i);
   else if(key==='collection')g.s.collection=ITEMS.slice(0,value).map(x=>x.id);
   else if(key==='weaponPlus')g.s.weapon.plus=value;
   else g.s[key]=value;
  }else if(key==='affinity')g.addAffinity(value.id,value.value-g.getAffinity(value.id));
  else if(key==='storyFlag')g.s.storyFlags[value]=true;
  else throw Error('Unaudited condition '+key);
 }
 g.s.hp=g.maxHp();g.s.mp=g.maxMp();return g;
}
let cases=0;
const hidden=Object.entries(JOBS).filter(([,job])=>job.hidden);assert.equal(hidden.length,14);
for(const [id,job] of hidden){
 const g=ready(id);assert(g.eligible(id),id+' must unlock');
 g.awaken(id);assert(g.s.unlocked.includes(id));assert.equal(g.s.sigils,4);
 const once=g.export();g.awaken(id);assert.equal(g.export(),once,'discovery must not consume twice');
 assert(g.jobAvailable(id));g.changeJob(id);assert.equal(g.s.job,id);
 assert.equal(Game.load(g.export()).export(),g.export());cases++;
 for(const [key,value] of Object.entries(job.unlock)){
  const blocked=ready(id);
  if(typeof value==='number'){
   if(key==='bosses')blocked.s.cleared.pop();
   else if(key==='endings')blocked.s.endings.pop();
   else if(key==='collection')blocked.s.collection.pop();
   else if(key==='weaponPlus')blocked.s.weapon.plus=value-1;
   else blocked.s[key]=value-1;
  }else if(key==='affinity')blocked.addAffinity(value.id,value.value-1-blocked.getAffinity(value.id));
  else if(key==='storyFlag')delete blocked.s.storyFlags[value];
  assert(!blocked.eligible(id),id+' must require '+key);
  const before=blocked.export();blocked.awaken(id);assert.equal(blocked.export(),before);
  blocked.s.unlocked.push(id);assert(!blocked.jobAvailable(id),'discovery must not bypass '+key);cases++;
 }
 const noSigil=ready(id);noSigil.s.sigils=0;noSigil.awaken(id);assert(!noSigil.s.unlocked.includes(id));
 const away=ready(id);away.s.scene='merchant';away.awaken(id);assert(!away.s.unlocked.includes(id));
 const next=g.newJourney();assert(next.s.unlocked.includes(id));next.start('warrior');assert(!next.jobAvailable(id));
 console.log('PASS hidden '+id+' '+job.name);
}
for(const [alias,id] of Object.entries(C.HIDDEN_ALIASES)){
 const g=ready(id);assert(g.eligible(alias));g.awaken(alias);g.changeJob(alias);
 assert.equal(g.s.job,id);assert(!g.s.unlocked.includes(alias));
 assert.equal(Game.load(g.export()).s.job,id);cases++;
}
console.log('PASS '+cases+' unlock/negative/alias cases; all 14 discovery, cost, camp and new-run gates');
