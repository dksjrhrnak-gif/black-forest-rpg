const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {ASSETS,JOBS}=require('./test-support.cjs');let links=0,fallback=0;const files=new Set();
for(const [kind,entries] of Object.entries(ASSETS))for(const [id,file] of Object.entries(entries)){
 if(file===null){fallback++;continue;}assert.equal(typeof file,'string');assert(file.startsWith('assets/')&&!file.includes('..'),kind+' '+id+' unsafe path');
 let at=__dirname;for(const segment of file.split('/')){assert(fs.readdirSync(at).includes(segment),'Missing/case mismatch: '+file);at=path.join(at,segment);}assert(fs.statSync(at).isFile(),file);files.add(file);links++;
}
for(const [id,j] of Object.entries(JOBS)){assert.equal(j.image,ASSETS.classes[id],id+' image field');const expected='assets/class_'+id+'.webp';if(fs.existsSync(path.join(__dirname,expected)))assert.equal(ASSETS.classes[id],expected,id+' unconnected exact asset');}
const report={connectedFiles:files.size,connectedMappings:links,fallbackMappings:fallback,missing:0,wrongMatch:'verified library selections and existing mapping manifest; not a pixel classifier',unmappedFiles:fs.readdirSync(__dirname+'/assets').filter(f=>!files.has('assets/'+f))};
if(require.main===module){console.log('PASS asset paths/case/IDs: '+JSON.stringify(report));fs.mkdirSync(__dirname+'/docs',{recursive:true});fs.writeFileSync(__dirname+'/docs/image-inventory-after.json',JSON.stringify(report,null,2)+'\n');}module.exports=report;
