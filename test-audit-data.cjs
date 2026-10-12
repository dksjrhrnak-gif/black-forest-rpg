/* Reproduce the stale audit-price bug through the real export command. */
const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path'),{execFileSync}=require('node:child_process'),{Game,ITEMS}=require('./test-support.cjs');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'bf-data-audit-'));
try{
 execFileSync(process.execPath,['audit-gameplay-quality.cjs','data'],{cwd:__dirname,env:{...process.env,BF_AUDIT_OUT:dir},stdio:'pipe'});
 const report=JSON.parse(fs.readFileSync(path.join(dir,'data-audit.json'))),g=new Game(71);g.start('warrior');
 assert.equal(report.items.length,ITEMS.length);assert.equal(new Set(report.items.map(d=>d.id)).size,1000);
 let samples=0;
 for(const d of report.items){const original=ITEMS.find(x=>x.id===d.id),grades=original.fixedGrade!==undefined?[original.fixedGrade]:original.unique?[4,5]:[0,1,2,3];
  for(const row of d.saleByGrade){assert(row.unupgradedPrice<=50,'P3 unupgraded appraisal cap must hold in audit: '+d.id);assert.equal(row.unupgradedPrice,g.price({...original,power:row.power,grade:row.grade,plus:0,affixes:row.affixes}),'audit price must match current engine');assert(Number.isSafeInteger(row.power));assert(Array.isArray(row.affixes));samples++;}
  assert.deepEqual(d.saleByGrade.map(x=>x.grade),grades,'audit must not imply impossible item grades');assert.equal(d.saleAssumptions.area,original.minArea||0);assert.equal(d.saleAssumptions.plus,0);
 }
 assert.equal(report.jobs.length,114);assert.equal(report.enemies.length,24);assert(samples>=1000);
 console.log(`PASS data audit: 1000 actual item IDs, ${samples} eligible-grade price samples match current engine; no stale 60G sale or impossible rarity claims`);
}finally{fs.rmSync(dir,{recursive:true,force:true});}
