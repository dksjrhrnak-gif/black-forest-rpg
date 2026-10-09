const fs=require('node:fs'),vm=require('node:vm');
const modules=['vendor/rot.js','vendor/loot-table.js','vendor/lz-string.js','legacy-v1.js','content.js','literature.js','expansion.js','supplemental.js','class-tree.js','effects.js','relationships.js','narrative.js','assets.js','equipment-migration.js','engine.js','qa-relationships.js','career.js','chapters.js','journey.js'];
function world(before=false){const c={console,Date,Math};c.globalThis=c;vm.createContext(c);for(const file of [...modules,...(before?[]:['p2-exploration.js'])])vm.runInContext(fs.readFileSync(__dirname+'/'+(before&&file==='engine.js'?'fixtures/p2-pre-engine.js':file),'utf8'),c,{filename:file});return c;}
module.exports={world,modules,plain:x=>JSON.parse(JSON.stringify(x))};
