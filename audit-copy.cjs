/* Parse source literals, never comments, identifiers or regular expressions. */
const fs=require('node:fs'),acorn=require('acorn');
const sources=['content.js','literature.js','expansion.js','supplemental.js','class-tree.js','effects.js','relationships.js','narrative.js','engine.js','qa-relationships.js','career.js','chapters.js','journey.js','p2-exploration.js','ui.js'];
function literals(file,source=fs.readFileSync(file,'utf8'),all=false){
 const rows=[];function walk(n,path='root',parent=null){
  if(!n||typeof n!=='object')return;
  if(n.type==='Literal'&&typeof n.value==='string'||n.type==='TemplateElement'){
   const value=n.type==='Literal'?n.value:n.value.cooked;
   const callee=parent?.callee?.name||parent?.callee?.property?.name;
   const arg=parent?.type==='CallExpression'?parent.arguments.indexOf(n):-1;
   const displayArgument=(['b','menu','meter','esc','note'].includes(callee)&&arg===0)||(callee==='b'&&arg===3)||(callee==='setAttribute'&&arg===1&&['aria-label','title','alt','placeholder'].includes(parent.arguments[0]?.value));
   const displayProperty=parent?.type==='Property'&&parent.value===n&&['text','label','title','name','desc','question','lore','result','epilogue'].includes(parent.key.name||parent.key.value);
   if(value&&(all||/[가-힣]/.test(value)))rows.push({file,line:n.loc.start.line,key:path,start:n.start,end:n.end,value,displayArgument,displayProperty,visible:'user copy candidate; generated labels and error/help text included'});
  }
  for(const [k,v] of Object.entries(n))if(!['loc','start','end'].includes(k)){
   const prefix=n.type==='Property'?(n.key.name||n.key.value||path):n.type==='MethodDefinition'?(n.key.name||path):path;
   if(Array.isArray(v))v.forEach((x,i)=>walk(x,prefix+'.'+k+'['+i+']',n));else if(v&&typeof v==='object')walk(v,prefix+'.'+k,n);
  }
 }walk(acorn.parse(source,{ecmaVersion:'latest',locations:true}));return rows;
}
const forbidden=/다음 조우|보상 수령|보상 받고 다음 조우|계속 진행|체크포인트|경로 선택|랜덤 인카운트|다음 지역|자동 이동 중|\b(?:encounter|reward|checkpoint)\b/i;
function visibleMarkup(value){const attributes=[...value.matchAll(/\b(?:aria-label|title|alt|placeholder)\s*=\s*["']([^"']*)["']/gi)].map(m=>m[1]);return [value.replace(/<[^>]*>/g,''),...attributes].join('\n');}
function check(){const rows=sources.flatMap(f=>literals(f)),allRows=sources.flatMap(f=>literals(f,undefined,true)),bad=[];const visible=allRows.filter(r=>/[가-힣]/.test(r.value)||r.value.includes('<')||r.displayArgument||r.displayProperty);for(const r of visible){if(forbidden.test(visibleMarkup(r.value)))bad.push(r);}
 const shell=visibleMarkup(fs.readFileSync('shell.html','utf8'));if(forbidden.test(shell))bad.push({file:'shell.html',value:shell});
 const css=[...fs.readFileSync('style.css','utf8').replace(/\/\*[\s\S]*?\*\//g,'').matchAll(/\bcontent\s*:\s*["']([^"']*)["']/g)].map(m=>m[1]);for(const value of css)if(forbidden.test(value))bad.push({file:'style.css',value});
 fs.mkdirSync('docs',{recursive:true});fs.writeFileSync('docs/system-copy-audit.json',JSON.stringify({status:bad.length?'FAIL':'PASS',checkedFiles:[...sources,'shell.html','style.css'],candidateStrings:rows.length,visibleCandidates:visible.length,accessibilityAttributes:true,englishDisplayArguments:true,cssGeneratedLabels:css.length,failures:bad,exceptions:[{file:'legacy-v1.js',reason:'Inactive BF1 migration engine; historic saved text retained. UI visibleText normalizes historic forbidden terms without changing stored logs.'},{file:'ui.js visibleText',reason:'Regex patterns identify historic copy; they are not displayed strings.'},{reason:'Internal IDs, variable names, comments, Internal HTML attributes/classes are excluded; aria-label/title/alt/placeholder and CSS content labels are included.'}]},null,2)+'\n');if(bad.length)throw Error('Forbidden user copy: '+JSON.stringify(bad));console.log('PASS user-facing system copy: '+rows.length+' source string candidates');return rows;}
module.exports={sources,literals,check,visibleMarkup};if(require.main===module)check();
