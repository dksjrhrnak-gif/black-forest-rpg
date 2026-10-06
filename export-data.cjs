const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const C=require('./test-support.cjs'),dir=path.join(__dirname,'data');fs.mkdirSync(dir,{recursive:true});
const csv=v=>'"'+String(v).replace(/"/g,'""')+'"';
assert.equal(C.MELEE.length,20);assert.equal(C.SWORDS.length,50);
const rows=[['직업명','티어','주력 스탯','고유 패시브 스킬','직업 설명'],...C.MELEE.map(d=>[d.name,d.tier,d.stat,d.passive+' — '+d.effect,d.desc])];
fs.writeFileSync(path.join(dir,'melee-jobs-20.csv'),'\ufeff'+rows.map(r=>r.map(csv).join(',')).join('\r\n')+'\r\n');
const escape=v=>String(v).replace(/\|/g,'\\|').replace(/\n/g,' ');
const swordRows=C.SWORDS.map(d=>[d.name,'무기-검/도검류',d.rarity,'공격력 '+d.basePower,d.fixed?C.AFFIXES.find(a=>a.id===d.fixed).label+' +'+d.fixedValue:'없음',d.flavor]);
const table=[['아이템명','분류','등급','공격력/방어력 수치','특수 효과','플레이버 텍스트'],['---','---','---','---','---','---'],...swordRows].map(r=>'| '+r.map(escape).join(' | ')+' |').join('\n');
fs.writeFileSync(path.join(dir,'swords-50.md'),'# 도검 50개\n\n일반 20 · 희귀 15 · 영웅 10 · 전설 5. 수치는 기본 공격력이며 강화·추가 옵션을 제외합니다. 특수 효과는 고정 옵션입니다. 드롭 시 등급에 따른 추가 무작위 옵션이 붙을 수 있습니다.\n\n'+table+'\n');
fs.writeFileSync(path.join(dir,'database.json'),JSON.stringify({version:4,jobs:C.JOBS,melee:C.MELEE,items:C.ITEMS,swords:C.SWORDS,factions:C.FACTIONS,threads:C.THREADS,areas:C.AREAS,rarities:C.RARITIES,baseDropWeights:C.WEIGHTS,affixes:C.AFFIXES,events:C.EVENTS,npcs:C.NPCS,companions:C.COMPANIONS,chapters:C.CHAPTERS,effectTypes:C.EFFECT_TYPES,hiddenAliases:C.HIDDEN_ALIASES},null,2)+'\n');
console.log('Export PASS: 근접 직업 20 CSV, 도검 50 Markdown, 게임 DB JSON');

const allJobs=Object.entries(C.JOBS).map(([id,j])=>[id,j.name,j.family|| (j.hidden?'hidden':'basic'),j.hidden?'Hidden':j.tier,j.stat||'균형',j.passive||j.skill,j.effect||j.desc,j.lore||j.desc,j.hidden?'히든':'일반',j.requirement||'',j.hp,j.mp,j.atk,j.def,j.skill]);
fs.writeFileSync(path.join(dir,'jobs-114.csv'),'\ufeff'+[['ID','직업명','계열','티어','주력 스탯','패시브','효과','설명','해금 유형','해금 조건','HP','MP','공격','방어','스킬'],...allJobs].map(r=>r.map(csv).join(',')).join('\r\n')+'\r\n');
const allItems=C.ITEMS.map(d=>[d.id,d.name,d.category,d.fixedGrade===undefined?'가변':C.RARITIES[d.fixedGrade],d.basePower??'지역·등급에 따라 결정',d.areaScale||0,d.minArea||0,(d.fixedAffixes||[]).map(a=>C.AFFIXES.find(x=>x.id===a.id).label+' +'+a.value).join(' / ')||(d.fixed?C.AFFIXES.find(a=>a.id===d.fixed).label+' '+(d.fixedValue||'무작위'):'없음'),d.flavor||'이전 방랑자의 흔적이 남은 장비.']);
fs.writeFileSync(path.join(dir,'items-1000.csv'),'\ufeff'+[['ID','아이템명','분류','등급','기본 수치','지역당 성장','최소 지역(0~7)','고정 효과','플레이버 텍스트'],...allItems].map(r=>r.map(csv).join(',')).join('\r\n')+'\r\n');
console.log('Export PASS: 일반 100 + 히든 14 CSV · 장비 1000 CSV');

// Compatibility download alias. It contains the same 114 records as the official file.
fs.copyFileSync(path.join(dir,'jobs-114.csv'),path.join(dir,'jobs-100.csv'));
