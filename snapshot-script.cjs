const fs=require('node:fs'),vm=require('node:vm'),{C}=require('./script-cases.cjs');
function snapshot(){let novel=C.NOVEL_COPY,choices=C.DIALOGUE_CHOICES;if(!novel){const ui=fs.readFileSync('ui.js','utf8');const out=vm.runInNewContext(ui.slice(ui.indexOf('const NOVEL_COPY='),ui.indexOf('const conversationSpeaker='))+';({NOVEL_COPY,DIALOGUE_CHOICES})');novel=out.NOVEL_COPY;choices=out.DIALOGUE_CHOICES;}
 return {chapters:C.CHAPTERS,decisions:C.CHAPTER_DECISIONS,threads:C.THREADS,companions:C.COMPANIONS,npcs:C.NPCS,events:C.EVENTS,novel,dialogueChoices:choices,relationLines:C.RELATION_LINES||{}};}
function flatten(value,path='',rows={}){if(typeof value==='string')rows[path]=value;else if(value&&typeof value==='object')for(const [key,v] of Object.entries(value))flatten(v,path?path+'.'+key:key,rows);return rows;}
module.exports={snapshot,flatten};if(require.main===module)console.log(JSON.stringify(flatten(snapshot()),null,2));
