/* Parse source literals, never comments, identifiers or regular expressions. */
const fs=require('node:fs'),acorn=require('acorn');
const sources=['content.js','literature.js','expansion.js','supplemental.js','class-tree.js','effects.js','relationships.js','narrative.js','engine.js','qa-relationships.js','career.js','chapters.js','journey.js','ui.js'];
function literals(file,source=fs.readFileSync(file,'utf8')){
 const rows=[];function walk(n,path='root'){
  if(!n||typeof n!=='object')return;
  if(n.type==='Literal'&&typeof n.value==='string'||n.type==='TemplateElement'){
   const value=n.type==='Literal'?n.value:n.value.cooked;
   if(value&&/[가-힣]/.test(value))rows.push({file,line:n.loc.start.line,key:path,start:n.start,end:n.end,value,visible:'user copy candidate; generated labels and error/help text included'});
  }
  for(const [k,v] of Object.entries(n))if(!['loc','start','end'].includes(k)){
   const prefix=n.type==='Property'?(n.key.name||n.key.value||path):n.type==='MethodDefinition'?(n.key.name||path):path;
   if(Array.isArray(v))v.forEach((x,i)=>walk(x,prefix+'.'+k+'['+i+']'));else if(v&&typeof v==='object')walk(v,prefix+'.'+k);
  }
 }walk(acorn.parse(source,{ecmaVersion:'latest',locations:true}));return rows;
}
const forbidden=/다음 조우|보상 수령|보상 받고 다음 조우|계속 진행|체크포인트|경로 선택|랜덤 인카운트|다음 지역|자동 이동 중|\b(?:encounter|reward|checkpoint)\b/i;
function check(){const rows=sources.flatMap(f=>literals(f)),bad=[];for(const r of rows){let text=r.value.replace(/<[^>]*>/g,'');if(forbidden.test(text))bad.push(r);}
 const shell=fs.readFileSync('shell.html','utf8').replace(/<[^>]*>/g,'');if(forbidden.test(shell))bad.push({file:'shell.html',value:shell});
 fs.mkdirSync('docs',{recursive:true});fs.writeFileSync('docs/system-copy-audit.json',JSON.stringify({status:bad.length?'FAIL':'PASS',checkedFiles:[...sources,'shell.html'],candidateStrings:rows.length,failures:bad,exceptions:[{file:'legacy-v1.js',reason:'Inactive BF1 migration engine; historic saved text retained. UI visibleText normalizes historic forbidden terms without changing stored logs.'},{file:'ui.js visibleText',reason:'Regex patterns identify historic copy; they are not displayed strings.'},{reason:'Internal IDs, variable names, comments, HTML attributes/classes are excluded by AST parsing/text extraction.'}]},null,2)+'\n');if(bad.length)throw Error('Forbidden user copy: '+JSON.stringify(bad));console.log('PASS user-facing system copy: '+rows.length+' source string candidates');return rows;}
module.exports={sources,literals,check};if(require.main===module)check();
