/* Independent pre-P1 effect implementation + archived saves, not a regenerated oracle. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const modules=['vendor/rot.js','vendor/loot-table.js','vendor/lz-string.js','legacy-v1.js','content.js','literature.js','expansion.js','supplemental.js','class-tree.js','effects.js','relationships.js','narrative.js','assets.js','equipment-migration.js','engine.js','qa-relationships.js','career.js','chapters.js','journey.js','p2-exploration.js','p3-systems.js'];
function world(before){const c={console,Date,Math};c.globalThis=c;vm.createContext(c);for(const f of modules)vm.runInContext(fs.readFileSync(__dirname+'/'+(before&&f==='effects.js'?'fixtures/p1-pre-effects.js':f),'utf8'),c,{filename:f});return c;}
const old=world(true),now=world(false),targets=['x_magic_0','x_magic_15','x_ranged_2','x_occult_13','x_support_16','x_support_17'];
const controls=['x_magic_3','x_magic_14','x_ranged_3','x_occult_14','x_support_15','paladin'];
const plain=x=>JSON.parse(JSON.stringify(x)),mean=a=>a.reduce((s,x)=>s+x,0)/a.length;
for(const [id,j]of Object.entries(now.BFContent.JOBS)){
 const before=old.BFContent.JOBS[id];if(!targets.includes(id))assert.deepEqual(plain(j),plain(before),id+' untouched definition');
 else for(const key of ['hp','mp','atk','def','traits','stats','unlock','parents','children','masteryAction','family','image'])assert.deepEqual(plain(j[key]),plain(before[key]),id+' preserved '+key);
}
const saves=require('./fixtures/p1-pre-saves.json');for(const row of saves.saves){const g=now.BlackForest.Game.load(row.code);assert.equal(g.export(),row.code,row.id+' '+row.scene+' prior save exact restore');}
function setup(w,id,seed,area,gear,resources,hp,kind){const g=new w.BlackForest.Game(seed);g.start('warrior');g.s.job=id;g.s.career=w.BFContent.newCareer(id);g.s.career.hiddenPath=!!w.BFContent.JOBS[id].hidden;if(g.s.career.hiddenPath)g.s.unlocked.push(id);g.s.area=area;g.s.level={0:3,3:8,7:15}[area];if(gear==='drops')for(let n=0;n<12;n++){const d=g.makeGear('boss');if(d.power>g.s[d.slot].power)g.s[d.slot]=d;}g.s.hp=Math.ceil(g.maxHp()*hp);g.s.mp=resources==='full'?g.maxMp():0;g.s.potions=resources==='full'?3:0;g.fight(kind==='boss');return g;}
function battle(g,policy){let turns=0,spentMp=0;const initial=g.s.potions,counts={attack:0,skill:0,defend:0,potion:0};while(g.s.scene==='battle'&&turns<120){let cmd='attack';if(policy!=='attack'){
 if(policy==='tactical'&&g.s.hp<g.maxHp()&&g.s.hp<Math.max(g.damagePreview()+8,g.maxHp()*.27)&&g.s.potions)cmd='potion';
 else if(policy==='tactical'&&g.s.enemy.intent==='heavy'&&g.damagePreview()>0)cmd='defend';else if(g.s.mp>=g.skillCost())cmd='skill';}
 const before=g.s.mp,t=g.s.turns;g.act(cmd);assert(g.s.turns>t,'valid policy must progress');if(cmd==='skill')spentMp+=Math.max(0,before-g.s.mp);counts[cmd]++;turns++;}
 assert(g.s.scene!=='battle','120-turn stall');assert(g.s.hp>=0&&g.s.mp>=0);return {win:['reward','loot'].includes(g.s.scene),turns,hp:g.s.hp/g.maxHp(),spentMp,potions:initial-g.s.potions,counts};}
const records=[];let identical=0;
for(const id of [...targets,...controls])for(const area of [0,3,7])for(const seed of [2,17,91,123,777,2026])for(const gear of ['starter','drops'])for(const resources of ['full','empty'])for(const policy of ['attack','skill','tactical'])for(const kind of ['normal','boss'])for(const hp of [1,.35]){
 const a=setup(old,id,seed,area,gear,resources,hp,kind),b=setup(now,id,seed,area,gear,resources,hp,kind);assert.equal(a.export(),b.export(),'identical initial state');const before=battle(a,policy),after=battle(b,policy);
 if(controls.includes(id)||policy==='attack'){assert.equal(a.export(),b.export(),id+' untouched trajectory');identical++;}
 records.push({id,area,seed,gear,resources,policy,kind,initialHp:hp,before,after});
}
const summary=[];for(const id of [...targets,...controls])for(const policy of ['attack','skill','tactical']){const rows=records.filter(x=>x.id===id&&x.policy===policy);const stats=version=>({winRate:mean(rows.map(x=>+x[version].win)),turns:mean(rows.map(x=>x[version].turns)),hp:mean(rows.map(x=>x[version].hp)),mp:mean(rows.map(x=>x[version].spentMp)),potions:mean(rows.map(x=>x[version].potions))});summary.push({id,policy,n:rows.length,before:stats('before'),after:stats('after')});}
// Broad aggregate guardrails supplement, rather than replace, per-condition review.
for(const r of summary.filter(x=>targets.includes(x.id)&&x.policy!=='attack')){
 assert(Math.abs(r.after.winRate-r.before.winRate)<=.1,r.id+' aggregate win-rate shift exceeds 10pp');
 assert(r.after.turns/r.before.turns>=.75&&r.after.turns/r.before.turns<=1.25,r.id+' aggregate tempo shift exceeds 25%');
}
// Actual status/heal/tempo differences in a durable, controlled enemy state.
const probes=[];for(const id of targets){const a=setup(old,id,77,3,'starter','full',.35,'boss'),b=setup(now,id,77,3,'starter','full',.35,'boss');for(const g of [a,b]){g.s.enemy.intent='charge';g.s.enemy.hp=g.s.enemy.maxHp=500;}a.act('skill');b.act('skill');const snap=g=>({hp:g.s.hp,mp:g.s.mp,enemyHp:g.s.enemy.hp,dot:g.s.enemy.dot,dotTurns:g.s.enemy.dotTurns,weak:g.s.enemy.weak,message:g.s.message});const before=snap(a),after=snap(b);assert.notDeepEqual(after,before,id+' observable skill change');assert.equal(after.mp,before.mp,'same MP cost');assert.equal(now.BlackForest.Game.load(b.export()).export(),b.export(),'new status save');probes.push({id,before,after});}
fs.mkdirSync('docs/p1',{recursive:true});fs.writeFileSync(process.env.BF_P1_OUT||'docs/p1/comparison.json',JSON.stringify({status:'PASS',baseline:saves.baseline,method:'12 representative careers; 3 stages,6 seeds,2 gear budgets,2 resource states,3 policies,2 enemy kinds,2 initial HP states. Paired independent worlds. No unlock claims from fixtures.',pairs:records.length,battles:records.length*2,identicalTrajectories:identical,oldSaveRestores:saves.saves.length,summary,probes,records},null,2)+'\n');
console.log(`PASS P1: ${records.length} pairs / ${records.length*2} battles; ${identical} unchanged trajectories; ${saves.saves.length} exact pre-P1 saves; 108 untouched definitions; 6 observable skill probes`);
