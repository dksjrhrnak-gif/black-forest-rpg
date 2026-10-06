const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const modern=require('./test-support.cjs'),{Game,JOBS}=modern;
const old={console,Date,Math};old.globalThis=old;vm.createContext(old);vm.runInContext(fs.readFileSync(__dirname+'/fixtures/github-6b78-engine.js','utf8'),old);
const baseline={commit:'6b78d47327b54d17c2c1a104c4fa5a2a840cdf2a',classes:Object.keys(old.BlackForest.JOBS).length,regular:Object.values(old.BlackForest.JOBS).filter(j=>!j.hidden).length,hidden:Object.values(old.BlackForest.JOBS).filter(j=>j.hidden).length,slots:old.BlackForest.GEAR_SLOTS};
for(const seed of [1,77,20261006,0,-13,.25]){const a=old.ROT.RNG.clone().setSeed(seed),b=global.ROT.RNG.clone().setSeed(seed);for(let i=0;i<5000;i++){assert.equal(a.getUniform(),b.getUniform());assert.equal(a.getUniformInt(-7,9),b.getUniformInt(-7,9));assert.equal(a.getItem(['a','b','c']),b.getItem(['a','b','c']));}assert.equal(JSON.stringify(a.getState()),JSON.stringify(b.getState()));const restored=b.clone().setState(b.getState());assert.equal(a.getUniform(),restored.getUniform());}
let cases=0;
for(const id of Object.keys(old.BlackForest.JOBS)){
 const x=new old.BlackForest.Game(17);x.s.job=id;x.s.scene='camp';if(old.BlackForest.JOBS[id].hidden)x.s.unlocked=[id];x.s.gold=777;x.s.hp=x.maxHp();x.s.mp=x.maxMp();
 const code=x.export(),rng=JSON.stringify(x.rng.getState()),g=Game.load(code);
 assert.equal(g.s.job,id);assert.equal(g.s.gold,777);assert.equal(JSON.stringify(g.rng.getState()),rng);assert.deepEqual(g.equipment().map(d=>d.slot),['weapon','armor','charm']);
 assert.equal(g.s.weapon.id,x.s.weapon.id);assert.equal(g.s.armor.id,x.s.armor.id);assert.equal(g.s.charm.id,x.s.charm.id);assert.equal(Game.load(g.export()).export(),g.export());cases++;
}
const oldGame=new old.BlackForest.Game(34);oldGame.start('warrior');
for(const slot of ['head','subweapon','relic'])oldGame.s[slot]={id:'legacy-'+slot,name:'보존 '+slot,slot,power:20,grade:3,plus:2,affixes:[{id:'health',value:20}],fails:0};
oldGame.s.hp=oldGame.maxHp();oldGame.s.mp=oldGame.maxMp();const g=Game.load(oldGame.export());assert.equal(g.s.legacyEquipment.length,3);assert.equal(g.s.hp,g.maxHp());assert.equal(g.equipment().length,3);assert.equal(Game.load(g.export()).export(),g.export());
const plain=new Game(99);plain.start('warrior');const state=JSON.parse(global.LZString.decompressFromBase64(plain.export().slice(4)));delete state.state.affinity;delete state.state.career;const migrated=Game.load(JSON.stringify(state));assert.equal(Object.keys(migrated.s.affinity).length,6);assert.equal(migrated.s.career.current,'warrior');assert.equal(Game.load(migrated.export()).export(),migrated.export());
const report={githubMain:baseline,v4:{regular:Object.values(JOBS).filter(j=>!j.hidden).length,hidden:Object.values(JOBS).filter(j=>j.hidden).length,tiers:[0,1,2,3].map(t=>Object.values(JOBS).filter(j=>!j.hidden&&j.tier===t).length),slots:g.equipment().map(d=>d.slot)},mainSaveCases:cases,extraEquipmentPreserved:true,missingAffinityAndCareer:'PASS',rngRestore:'PASS'};
fs.writeFileSync(__dirname+'/source-reconciliation-results.json',JSON.stringify(report,null,2)+'\n');console.log('PASS Source reconciliation: '+JSON.stringify(report));

const bundleStyle=fs.readFileSync(__dirname+'/style.css','utf8'),bundleShell=fs.readFileSync(__dirname+'/shell.html','utf8'),bundleUi=fs.readFileSync(__dirname+'/ui.js','utf8');
for(const name of ['black-forest.html','index.html']){
 const html=fs.readFileSync(__dirname+'/'+name,'utf8'),end=html.lastIndexOf('</html>');
 assert(end>=0,name+' missing closing html');
 assert.equal(html.slice(end+7).trim(),'',
   name+' must not contain CSS/JS/text after </html>');
 assert.equal((html.match(/<script\b/g)||[]).length,(html.match(/<\/script>/g)||[]).length,name+' script tags');
 assert.equal((html.match(/<style\b/g)||[]).length,(html.match(/<\/style>/g)||[]).length,name+' style tags');
 assert(html.includes(bundleStyle),name+' must embed current style.css');
 assert(html.includes(bundleShell),name+' must embed current shell.html');
 assert(html.includes(bundleUi),name+' must embed current ui.js');
}
assert.equal(fs.readFileSync(__dirname+'/black-forest.html','utf8'),fs.readFileSync(__dirname+'/index.html','utf8'));
console.log('PASS bundle integrity: generated HTML is source-synchronized with no trailing visible code');
