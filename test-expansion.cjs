const assert=require('node:assert/strict'),fs=require('node:fs');
const {Game,JOBS,ITEMS,AFFIXES,EXTRA_JOBS}=require('./test-support.cjs');
const g=new Game(789);g.start(g.s.offers[0]);
// Every one of the 1,000 DB records must belong to a reachable loot pool.
for(const d of ITEMS){
 g.s.area=d.minArea||0;g.s.pity=0;
 const grade=d.fixedGrade??(d.unique?4:0);
 const original=[g.rollGrade,g.weighted,g.pick];
 g.rollGrade=()=>grade;g.weighted=()=>d.slot;
 let cursor=0;g.pick=pool=>pool.find(x=>x.id===d.id)||pool[(cursor++)%pool.length];
 const result=g.makeGear('boss');
 assert.equal(result.id,d.id,'unreachable '+d.id);
 assert.equal(result.grade,grade);
 assert(result.affixes.length<=3);assert.equal(new Set(result.affixes.map(a=>a.id)).size,result.affixes.length);
 for(const a of result.affixes)assert(AFFIXES.some(x=>x.id===a.id)&&Number.isInteger(a.value));
 [g.rollGrade,g.weighted,g.pick]=original;
}
assert.equal(g.s.collection.length,1000);Game.load(g.export());
// Gated equipment must not leak into early-area pools across any grade/slot.
for(let area=0;area<8;area++)for(let grade=0;grade<6;grade++)for(const slot of ['weapon','armor','charm']){
 g.s.area=area;g.rollGrade=()=>grade;g.weighted=()=>slot;
 for(let n=0;n<25;n++)assert((g.makeGear().minArea||0)<=area);
}
delete g.rollGrade;delete g.weighted;
// Every ancestry edge requires current-parent, mastery, level and all content conditions.
for(const [id,j] of Object.entries(JOBS).filter(([,j])=>j.tier>0&&!j.hidden)){
 g.s.job=j.parents[0];g.s.career=BFContent.newCareer(g.s.job);g.s.level=1;g.s.cleared=[];g.s.scene='camp';
 const before=g.s.job;g.changeJob(id);assert.equal(g.s.job,before);
 g.s.level=j.unlock.level;g.s.cleared=Array.from({length:j.unlock.bosses},(_,i)=>i);g.s.career.mastery[g.s.job]=j.unlock.mastery;
 if(j.unlock.storyFlag)g.s.storyFlags[j.unlock.storyFlag]=true;
 if(j.unlock.affinity)g.addAffinity(j.unlock.affinity.id,j.unlock.affinity.value-g.getAffinity(j.unlock.affinity.id));
 if(j.unlock.faction)g.s.factions[j.unlock.faction.id]=j.unlock.faction.value;
 if(j.unlock.actions)Object.assign(g.s.career.actions,j.unlock.actions);
 g.s.secrets=2;g.changeJob(id);assert.equal(g.s.job,id);g.changeJob('mage');assert.equal(g.s.job,id,'free cross-tree change');
}
assert.equal(new Set(EXTRA_JOBS.map(j=>JSON.stringify(Object.entries(j.traits).sort()))).size,71,'duplicate trait combinations');
// A high-area boss is lethal if a new character ignores preparation and defence.
let riskDeaths=0;
for(const id of Object.keys(JOBS)){
 const h=new Game(22,{unlocked:Object.keys(JOBS).filter(x=>JOBS[x].hidden)});h.start('warrior');h.s.job=id;h.s.career=BFContent.newCareer(id);h.s.career.hiddenPath=!!JOBS[id].hidden;h.s.hp=h.maxHp();h.s.mp=h.maxMp();h.s.area=7;h.fight(true);
 for(let i=0;i<100&&h.s.scene==='battle';i++)h.act('attack');
 if(h.s.scene==='dead')riskDeaths++;
}
assert(riskDeaths>=80,'unprepared bosses should pose a risk');
const lines=[`전 장비 1000개 드롭 도달·옵션 중복 방지·전체 도감 저장 통과`,`8지역 × 6등급 × 3슬롯 드롭 지역 제한 통과`,`71 신규 직업 패시브 조합 중복 없음·계보·숙련도·콘텐츠 조건 제한 통과`,`장비·레벨 준비 없는 최종 보스: ${riskDeaths}/114 직업 패배 (공격만 사용)`];
console.log(lines.join('\n'));fs.writeFileSync(__dirname+'/expansion-results.txt',lines.join('\n')+'\n');
