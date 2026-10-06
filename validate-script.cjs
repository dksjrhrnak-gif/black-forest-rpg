/* Canonical-copy, voice, terminology and mobile-length build gate. */
const fs=require('node:fs'),assert=require('node:assert/strict'),acorn=require('acorn'),vm=require('node:vm');
const {C,fresh,thread,bond}=require('./script-cases.cjs'),{sources,literals}=require('./audit-copy.cjs');
function choiceRows(){const source=fs.readFileSync('ui.js','utf8'),uiRows=[];const npc=source.match(/actions=(\[[^\n]*?\])\.map\(\(label,i\)=>b\(label,'npcChoice'/);assert(npc);vm.runInNewContext(npc[1]).forEach((label,i)=>uiRows.push({key:'npc.'+i,label}));
 function walk(n){if(!n||typeof n!=='object')return;if(n.type==='CallExpression'&&n.callee.name==='b'&&n.arguments[0]?.type==='Literal'&&['bondChoice','finish'].includes(n.arguments[1]?.value))uiRows.push({key:'ui.'+n.arguments[1].value+'.'+n.arguments[2].value,label:n.arguments[0].value});for(const value of Object.values(n)){if(Array.isArray(value))value.forEach(walk);else if(value&&typeof value==='object')walk(value);}}walk(acorn.parse(source,{ecmaVersion:'latest'}));
 return [...C.CHAPTER_DECISIONS.flatMap((q,a)=>q.flatMap((v,s)=>v.choices.map((c,i)=>({key:`chapter.${a}.${s}.${i}`,label:c.label})))),...Object.entries(C.DIALOGUE_CHOICES).flatMap(([id,st])=>st.flatMap((v,s)=>v.map((label,i)=>({key:`thread.${id}.${s}.${i}`,label})))),...Object.entries(C.COMPANIONS).flatMap(([id,c])=>c.tasks.map((label,i)=>({key:`bond.${id}.${i}`,label}))),...C.EVENTS.flatMap(e=>e.choices.map((c,i)=>({key:`event.${e.id}.${i}`,label:c.label}))),...uiRows,...Object.entries(C.JOBS).map(([id,j])=>({key:'skill.'+id,label:j.skill}))];}
const failures=[],warnings=[],exceptions=[
 {term:'거울 복도의 권투사',reason:'Named class/location lore refers to a mirror corridor, not the 별 없는 회랑. ID and name remain.'},
 {term:'종탑',reason:'Chapter 2 exterior describes the building; 종탑의 까마귀 names the bird at that building. Device/function uses 종.'},
 {term:'사냥',reason:'White-whale/faction narration and named hunters remain. No story/event action choice contains 사냥.'},
 {term:'골드',reason:'Stats, prices and quantified effect/reward descriptions only; narrative choice 화폐 uses 동전.'},
 {term:'돌려주다',reason:'Lexical compound (return an object/name to its owner), Korean Language Institute Q&A 316147; retained.'},
 {term:'놓아주다',reason:'Lexical verb, Korean Basic Dictionary entry 45300; prescribed final action label is also explicitly frozen.'},
 {term:'물어보다',reason:'Lexical compound (ask), Korean Language Institute FAQ 8606; retained.'},
 {term:'Past-tense results/history',reason:'Resolved actions and saved historical logs retain past tense; active chapter entrance narration uses present tense.'},
 {term:'Legacy saved string logs',reason:'Historical text is preserved in saves. Current entry scenes use canonical copy; old ending title is normalized only for display.'}
];
function check(condition,message){if(!condition)failures.push(message);}
for(const [id,t] of Object.entries(C.THREADS))for(let stage=0;stage<2;stage++){
 check(t.stages[stage].text===C.NOVEL_COPY.dialogue[id][stage].join('\n'),`thread narration ${id}:${stage}`);
 const g=thread(id,stage),options=g.dialogueOptions();check(options.length===4,`four choices ${id}:${stage}`);
 options.forEach((o,i)=>check(o.label===C.DIALOGUE_CHOICES[id][stage][i],`UI/source choice ${id}:${stage}:${i}`));
 check(g.s.message===[g.relationGreeting(id),...C.NOVEL_COPY.dialogue[id][stage]].join('\n'),`stored dialogue ${id}:${stage}`);
 const q=bond(id,stage);check(q.s.message===[q.relationGreeting(id),...C.NOVEL_COPY.bond[id][stage]].join('\n'),`stored quest ${id}:${stage}`);
}
for(const [id,n] of Object.entries(C.NPCS)){check(n.text===C.NOVEL_COPY.npc[id].join('\n'),`NPC source ${id}`);const g=fresh();g.s.cleared=[0];g.meetNpc(id);check(g.s.message===[...C.NOVEL_COPY.npc[id],g.relationGreeting(id)].join('\n'),`NPC stored/display ${id}`);}
const ui=fs.readFileSync('ui.js','utf8');check(ui.includes('NOVEL_COPY,DIALOGUE_CHOICES}=BlackForest')&&!ui.includes('const NOVEL_COPY={'),'UI must reference canonical conversation data');
const rows=sources.flatMap(f=>literals(f)),terms=rows.filter(r=>/별 없는 복도|기록 보관소/.test(r.value));for(const r of terms)failures.push(`term ${r.file}:${r.line}: ${r.value}`);
const choices=choiceRows().map(r=>({...r,length:[...r.label].length})),over18=choices.filter(r=>r.length>18),over30=choices.filter(r=>r.length>30);over30.forEach(r=>failures.push('choice exceeds 30: '+r.key));choices.filter(r=>/사냥|골드/.test(r.label)).forEach(r=>failures.push('choice terminology: '+r.key));
const creature=[...C.COMPANIONS.adam.answers,C.COMPANIONS.adam.joint,C.NOVEL_COPY.dialogue.adam[0][2],C.NOVEL_COPY.dialogue.adam[1].at(-1),...C.NOVEL_COPY.npc.creature.filter(s=>s.startsWith('“')),...C.NOVEL_COPY.bond.adam.flat().filter(s=>s.startsWith('“')),...Object.values(C.RELATION_LINES.creature)];
creature.forEach(line=>check(!/(줘|어)[.!?]?”?$/.test(line),'Creature speech: '+line));
const quixote=[...C.NOVEL_COPY.npc.quixote.filter(s=>s.startsWith('“')),C.NOVEL_COPY.dialogue.ahab[0].at(-1),...Object.values(C.RELATION_LINES.quixote)];quixote.forEach(line=>check(/(?:오|소)[.!?]?”?$/.test(line),'Quixote speech: '+line));
const aux=rows.filter(r=>/(풀어주|보여주|보여준|나누어주|나눠주|믿어주|믿어줘|불러준|열어두|찾아줄|도와줄|만져본)/.test(r.value));aux.forEach(r=>failures.push(`aux spacing ${r.file}:${r.line}`));
function grams(s){s=s.replace(/[^가-힣]/g,'');return new Set(Array.from({length:Math.max(0,s.length-1)},(_,i)=>s.slice(i,i+2)));}
const similar=[];C.CHAPTERS.forEach((ch,a)=>ch.text.forEach((text,s)=>{const last=text.split(/[.!?]/).filter(Boolean).at(-1),question=C.CHAPTER_DECISIONS[a][s].question,A=grams(last),B=grams(question),n=[...A].filter(x=>B.has(x)).length,ratio=n/(new Set([...A,...B]).size||1);if(ratio>.45)similar.push({key:`chapter.${a}.${s}`,last,question,ratio});}));
const oldTitles=rows.filter(r=>/불씨의 수호자/.test(r.value));oldTitles.forEach(r=>failures.push('old ending title literal: '+r.file));
const report={status:failures.length?'FAIL':'PASS',canonicalSynchronization:'checked thread/quest/NPC generated messages and choices',sourceStringCount:rows.length,choiceCount:choices.length,over18,over30,voiceChecks:{creature:creature.length,quixote:quixote.length},auxSpacingFailures:aux,termFailures:terms,similarNarrationQuestions:similar,exceptions,failures};
fs.mkdirSync('docs',{recursive:true});fs.writeFileSync('docs/script-audit.json',JSON.stringify(report,null,2)+'\n');
assert.deepEqual(failures,[]);console.log(`PASS script copy: ${choices.length} choices; >18=${over18.length} advisory, >30=${over30.length}; synchronized; voice/terms/aux spacing PASS; similar=${similar.length} review candidates`);
module.exports={choiceRows,report};
