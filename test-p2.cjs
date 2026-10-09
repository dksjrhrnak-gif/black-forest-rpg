/* Independent P1 engine, archived saves and economic replay assertions. */
const fs=require('node:fs'),assert=require('node:assert/strict'),{world,plain}=require('./p2-test-support.cjs');
const old=world(true),now=world(),C=now.BFContent,Game=now.BlackForest.Game,out=process.env.BF_P2_OUT||'docs/p2';fs.mkdirSync(out,{recursive:true});
const fresh=(seed=71,id='warrior')=>{const g=new Game(seed);g.start(id);return g;};
assert.deepEqual(plain(C.JOBS),plain(old.BFContent.JOBS),'all 114 P1 job definitions unchanged');
assert.equal(C.ITEMS.length,1000);assert.equal(C.EVENTS.length,21);assert.deepEqual(plain(C.EVENTS.slice(0,18)),plain(old.BFContent.EVENTS),'original 18 events intact');
const changed=plain(C.ITEMS.filter((d,i)=>JSON.stringify(d)!==JSON.stringify(old.BFContent.ITEMS[i])).map(d=>d.id));assert.deepEqual(changed.slice().sort(),Object.keys(C.P2_ITEMS).sort());
const items=changed.map(id=>{const a=old.BFContent.ITEMS.find(d=>d.id===id),b=C.ITEMS.find(d=>d.id===id);for(const k of ['id','slot','fixedGrade','minArea','unique','areaScale','name'])assert.deepEqual(a[k],b[k]);assert(b.basePower<a.basePower,'defense/luck tradeoff');for(const affix of b.fixedAffixes){const spec=C.AFFIXES.find(x=>x.id===affix.id);assert(spec&&affix.value>=spec.min&&affix.value<=spec.max,'existing bounded affix');}return {id,before:plain(a),after:plain(b)};});
const archives=[require('./fixtures/p2-pre-saves.json'),require('./fixtures/p1-pre-saves.json')];let restores=0;for(const file of archives)for(const row of file.saves){assert.equal(Game.load(row.code).export(),row.code,row.id+' '+row.scene+' exact restore');restores++;}
// Existing items retain their serialized stats rather than adopting new definitions.
for(const row of items){const g=fresh(),d=plain(row.before);Object.assign(d,{power:d.basePower,grade:d.fixedGrade,plus:0,fails:0,affixes:plain(d.fixedAffixes)});g.s[d.slot]=d;g.s.bag.push(plain(d));g.s.hp=g.maxHp();g.s.mp=g.maxMp();assert.equal(Game.load(g.export()).export(),g.export());restores++;}
const ledger=g=>plain(Object.fromEntries(['gold','xp','level','hp','mp','potions','wood','ore','herb','collection','bag','loot','decisions'].map(k=>[k,g.s[k]])));
const entries=[];const keys=new Set();for(const ev of C.P2_EVENTS){assert(!keys.has(ev.key));keys.add(ev.key);assert.equal(C.EVENTS[ev.id],ev);assert([1,4,5].includes(ev.region));assert.equal(ev.choices.length,3);assert.equal(C.ASSETS.events[ev.id],null);assert(C.ASSETS.areas[ev.region]);
 for(const c of ev.choices){assert(c.chance>0&&c.chance<=1);for(const [k,n]of Object.entries(c.cost))assert(['hp','mp','gold','potions','herb'].includes(k)&&Number.isSafeInteger(n)&&n>0);for(const r of [c.reward,c.failure])for(const [k,n]of Object.entries(r)){assert(['gear','wood','ore','herb','mana','heal','xp'].includes(k));assert(k==='gear'?n==='elite':Number.isSafeInteger(n)&&n>=0);}if(c.slot)assert(['weapon','armor','charm'].includes(c.slot));}
 for(const seed of Array.from({length:24},(_,i)=>i+1))for(const context of ['neutral','helped','equipped'])for(const budget of ['full','empty'])for(let choice=0;choice<3;choice++){
  const g=fresh(seed);Object.assign(g.s,{area:ev.region,cleared:Array.from({length:ev.region},(_,i)=>i),level:8,gold:50,herb:5,mp:8,scene:'map',step:9});g.s.hp=g.maxHp();g.s.storyFlags['chapter_'+ev.region+'_seen']=true;
  if(context==='helped'){g.s.decisions.chapter_1_0=C.CHAPTER_DECISIONS[1][0].choices[0].short;g.s.decisions.chapter_4_1=C.CHAPTER_DECISIONS[4][1].choices[0].short;g.s.decisions.p2_bell='read:success';}
  if(context==='equipped'){g.s.armor.affixes=[{id:'dodge',value:4}];g.s.charm.affixes=[{id:'mana',value:3}];g.s.career.actions.defend=3;}
  if(budget==='empty'){g.s.hp=6;g.s.mp=0;g.s.gold=0;g.s.potions=0;g.s.herb=0;}
  // Helped bell must not reappear; test its effects independently before its own record.
  if(ev.id===18)delete g.s.decisions.p2_bell;
  g.routes();assert.deepEqual(plain(g.s.routes),['event']);g.choose(0);assert.equal(g.s.eventId,ev.id);const options=g.eventChoices(),can=g.canPay(options[choice].cost),before=g.export();assert(options.some(c=>g.canPay(c.cost)),'free fallback');
  for(const invalid of [-1,3,1.5,null,'1']){g.event(invalid);assert.equal(g.export(),before,'invalid choice is inert');}
  g.event(choice);if(!can){assert.equal(g.export(),before,'cannot silently pay unavailable resources');continue;}
  const recorded=g.s.decisions[ev.key];assert(recorded);assert.equal(Game.load(g.export()).export(),g.export());restores++;
  const done=g.export();g.event(choice);assert.equal(g.export(),done,'double click inert after transition');
  const account=ledger(g),rng=plain(g.rng.getState());g.s.scene='event';g.event(choice);assert.deepEqual(ledger(g),account,'replayed event gives zero currency/items/xp');assert.deepEqual(plain(g.rng.getState()),rng,'replay cannot reroll');
  g.s.scene='map';g.s.step=9;g.routes();if(g.s.routes[0]==='event'){g.choose(0);assert(g.s.eventId<18,'regional record prevents repeat');}
  entries.push({event:ev.id,seed,context,budget,choice,recorded,scene:Game.load(done).s.scene});
 }
 // Wrong region/kind/missing chapter may never spawn regional content.
 for(let area=0;area<8;area++)for(const kind of ['story','rift']){const g=fresh();g.s.area=area;g.s.kind=kind;g.s.step=9;g.s.storyFlags['chapter_'+ev.region+'_seen']=true;assert.equal(g.p2EventAvailable(ev),area===ev.region&&kind==='story');}
 const g=fresh();g.s.area=ev.region;assert.equal(g.p2EventAvailable(ev),false);for(const value of ['bogus','read:unknown',123]){g.s.decisions[ev.key]=value;assert.throws(()=>Game.load(g.export()),/검증/);}
}
let mysteryChecks=0;for(let area=0;area<8;area++)for(let seed=1;seed<=100;seed++){const g=fresh(seed);g.s.area=area;g.s.scene='map';g.s.routes=['mystery'];g.choose(0);if(g.s.scene==='event')assert(g.s.eventId<18,'mystery must not leak regional events');mysteryChecks++;}
assert(entries.some(x=>x.recorded.endsWith('failure'))&&entries.some(x=>x.recorded.endsWith('success')),'both random outcomes exercised');
const memory=fresh();memory.s.area=5;memory.s.decisions.p2_bell='copy:success';assert(memory.p2Reaction().includes('명부')&&!memory.p2Reaction().includes('물통'),'do not invent an unvisited side story');
const full=fresh();full.s.area=5;full.s.scene='event';full.s.eventId=20;full.s.storyFlags.chapter_5_seen=true;full.s.herb=2;assert.deepEqual(plain(full.eventChoices()[1].reward),{ore:4},'full vitals receive useful material, not zero healing');full.event(1);assert.equal(full.s.ore,4);assert.equal(full.s.herb,0);assert.equal(Game.load(full.export()).export(),full.export());
// Frozen P1 equipment inputs prove combat rules/career mastery/RNG are unchanged.
let combatPairs=0;const p1=['x_magic_0','x_magic_15','x_ranged_2','x_occult_13','x_support_16','x_support_17'];
const snapshot=g=>plain({hp:g.s.hp,mp:g.s.mp,enemy:g.s.enemy,scene:g.s.scene,career:g.s.career,gold:g.s.gold,xp:g.s.xp,rewardState:g.s.rewardState,rng:g.rng.getState()});
for(const id of Object.keys(C.JOBS))for(const area of [0,3,7])for(const seed of [2,17,91])for(const boss of [false,true]){
 const a=new old.BlackForest.Game(seed);a.start('warrior');a.s.job=id;a.s.career=old.BFContent.newCareer(id);if(C.JOBS[id].hidden){a.s.unlocked.push(id);a.s.career.hiddenPath=true;}a.s.area=area;a.s.level={0:3,3:8,7:15}[area];a.s.hp=a.maxHp();a.s.mp=a.maxMp();a.fight(boss);const b=Game.load(a.export());
 for(let n=0;n<120&&a.s.scene==='battle';n++){const cmd=a.s.hp<a.maxHp()*.3&&a.s.potions?'potion':a.s.enemy.intent==='heavy'?'defend':a.s.mp>=a.skillCost()?'skill':'attack';a.act(cmd);b.act(cmd);assert.deepEqual(snapshot(b),snapshot(a),id+' P1 combat state/RNG identical');}assert(a.s.scene!=='battle');combatPairs++;
}
// Targeting changes the slot, not elite rarity or the 55G price.
let targeted=0;const grades={};for(const slot of ['weapon','armor','charm'])for(const area of [0,4,7]){const g=fresh(117);g.s.area=area;g.s.charm.power=0;const counts=Array(6).fill(0);for(let n=0;n<3000;n++){g.s.pity=0;const a=new old.BlackForest.Game(1);a.s=plain(g.s);a.rng.setState(g.rng.getState());const expected=a.rollGrade('elite');const d=g.makeGear('elite',slot);assert.equal(d.grade,expected,'same grade roll at same RNG');assert.equal(d.slot,slot);assert((d.minArea||0)<=area);counts[d.grade]++;targeted++;}grades[slot+'/'+area]=counts;for(let grade=0;grade<6;grade++)assert(Math.abs(counts[grade]/3000-C.WEIGHTS.elite[grade]/100)<.025,'rarity sampling');}
for(const slot of ['weapon','armor','charm']){const g=fresh();g.s.gold=110;g.buy('gear-'+slot);assert.equal(g.s.gold,55);assert.equal(g.s.loot.slot,slot);const code=g.export();g.buy('gear-'+slot);assert.equal(g.export(),code);assert.equal(Game.load(code).export(),code);g.takeLoot('bag');g.buy('gear-'+slot);g.takeLoot('bag');assert.equal(g.s.gold,0);assert.equal(g.s.bag.length,2);const empty=g.export();g.buy('gear-'+slot);assert.equal(g.export(),empty);}
const g=fresh(),state=g.export();assert.throws(()=>g.makeGear('elite','invalid'));assert.equal(g.export(),state,'invalid slot does not consume RNG');
fs.writeFileSync(out+'/automatic-qa.json',JSON.stringify({status:'PASS',baseline:archives[0].baseline,originalEvents:18,regionalEvents:3,regionalChoices:9,successfulAffordableCases:entries.length,saveRestores:restores,p1JobsUnchanged:114,itemsUnchanged:994,changedItems:items,combatPairs,combatBattles:combatPairs*2,p1Careers:p1,targetedDrops:targeted,mysteryChecks,grades,entries,limitations:['Controlled fixtures complement natural progression.','Rarity sampling is bounded, not a proof of all build balance.']},null,2)+'\n');
console.log(`PASS P2: 21 events / 9 regional choices; ${entries.length} affordable context/seed cases; ${restores} exact restores; ${combatPairs*2} matched P1 battles; ${targeted} targeted drops; replay and negative guards`);
