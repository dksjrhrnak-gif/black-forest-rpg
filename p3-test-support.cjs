const fs=require('node:fs'),vm=require('node:vm'),cp=require('node:child_process');
const baseline='b24007be4030f484c6867fb50f040fd55edd2edb';
const modules=['vendor/rot.js','vendor/loot-table.js','vendor/lz-string.js','legacy-v1.js','content.js','literature.js','expansion.js','supplemental.js','class-tree.js','effects.js','relationships.js','narrative.js','assets.js','equipment-migration.js','engine.js','qa-relationships.js','career.js','chapters.js','journey.js','p2-exploration.js'];
const archive=new Map();function source(file,before){if(!before)return fs.readFileSync(__dirname+'/'+file,'utf8');if(!archive.has(file))archive.set(file,cp.execFileSync('git',['show',baseline+':'+file],{cwd:__dirname,encoding:'utf8',maxBuffer:6000000}));return archive.get(file);}
function world(before=false){const c={console,Date,Math};c.globalThis=c;vm.createContext(c);for(const f of [...modules,...(!before&&fs.existsSync(__dirname+'/p3-systems.js')?['p3-systems.js']:[])])vm.runInContext(source(f,before),c,{filename:f});return c;}
module.exports={world,baseline,modules,plain:x=>JSON.parse(JSON.stringify(x))};
