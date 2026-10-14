/* A UI pass must not alter content, RNG, save or command execution. */
const assert=require('node:assert/strict'),fs=require('node:fs'),cp=require('node:child_process'),crypto=require('node:crypto');
const base='419c70316307a5c26108b39f740276ede8fd5b0e',git=(...args)=>cp.execFileSync('git',args,{maxBuffer:16*1024*1024});
const files=git('ls-tree','-r','--name-only',base).toString().trim().split('\n').filter(p=>p.startsWith('assets/')||p.endsWith('.csv')||(!p.includes('/')&&p.endsWith('.js')&&!['ui.js','ui-fx.js'].includes(p)));
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
for(const file of files)assert.equal(hash(fs.readFileSync(file)),hash(git('show',`${base}:${file}`)),file+' protected source/data/asset');
const current=fs.readFileSync('ui.js','utf8'),old=git('show',`${base}:ui.js`).toString();
assert.equal(current.slice(current.indexOf('const commands=')),old.slice(old.indexOf('const commands=')),'commands, duplicate input guard, method order, RNG and save handling unchanged');
const fx=fs.readFileSync('ui-fx.js','utf8'),oldFx=git('show',`${base}:ui-fx.js`).toString();
assert.equal(fx.slice(0,fx.indexOf('function create(')),oldFx.slice(0,oldFx.indexOf('function create(')),'FX snapshot and descriptors unchanged');
const {JOBS,ITEMS}=require('./test-support.cjs');assert.equal(Object.keys(JOBS).length,114);assert.equal(ITEMS.length,1000);
const result={status:'PASS',base,protectedFiles:files.length,classes:114,items:1000,commandsUnchanged:true,fxDescriptorsUnchanged:true};
fs.mkdirSync('docs/ui-b',{recursive:true});fs.writeFileSync('docs/ui-b/invariants.json',JSON.stringify(result,null,2)+'\n');console.log('PASS B UI protected invariants '+JSON.stringify(result));
