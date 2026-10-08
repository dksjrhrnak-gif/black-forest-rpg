/* Reproducible analysis harness. Fixtures are labelled separately from natural campaigns. */
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const C=require('./test-support.cjs'),{Game,JOBS,AREAS,ITEMS,EVENTS,STARTERS}=C;
const out=process.env.BF_AUDIT_OUT||'docs/gameplay';fs.mkdirSync(out,{recursive:true});
const seeds=[2,17,91,123,777,2026];
const mode=process.argv[2]||'all',run=name=>mode==='all'||mode===name;
const write=(name,data)=>{fs.writeFileSync(`${out}/${name}.json`,JSON.stringify(data,null,2)+'\n');console.log(`Saved ${name}`);};
const fresh=(seed,id='warrior')=>{const g=new Game(seed);g.start(id);return g;};
const mean=xs=>xs.length?xs.reduce((a,b)=>a+b,0)/xs.length:0;
function action(g,policy){
 if(policy==='attack')return 'attack';
 if(policy==='tactical'&&g.s.hp<g.maxHp()&&g.s.hp<Math.max(g.damagePreview()+8,g.maxHp()*.27)&&g.s.potions)return 'potion';
 if(policy==='tactical'&&g.s.enemy.intent==='heavy'&&g.damagePreview()>0)return 'defend';
 return g.s.mp>=g.skillCost()?'skill':'attack';
}
if(run('data')){
 const jobs=Object.entries(JOBS).map(([id,j])=>{const g=fresh(71);g.s.job=id;g.s.career.current=id;const levels=[1,3,6,10,15].map(level=>{g.s.level=level;g.s.hp=g.maxHp();return {level,maxHp:g.maxHp(),maxMp:g.maxMp(),attack:g.atk(),defense:g.def(),crit:g.crit(),dodge:g.dodge(),skillCost:g.skillCost()};});return {...j,levels,gearRestrictions:'All 3 slots usable; no class-specific weapon-type restriction in equipBag/takeLoot.'};});
 const enemies=[];for(let area=0;area<8;area++)for(const kind of ['normal','elite','boss']){const g=fresh(71);g.s.area=area;g.fight(kind==='boss',kind==='elite');enemies.push({area,region:AREAS[area].name,kind,names:kind==='boss'?[AREAS[area].boss]:AREAS[area].enemies,enemy:{...g.s.enemy},baseXp:(kind==='boss'?48:kind==='elite'?28:20)+area*8,baseGold:(kind==='boss'?65:kind==='elite'?32:16)+area*12,gearChance:kind==='normal'?.55:1,source:kind==='normal'?'normal':kind});}
 const rift=fresh(71);rift.s.area=7;rift.s.kind='rift';rift.fight(true);
 const mimic=fresh(71);mimic.fight(false,true,'보급함 미믹');
 const midbosses=[2,5].map(area=>{const g=fresh(71);g.s.area=area;g.s.step=10;g.s.scene='map';g.routes();g.choose(0);g.faceMidboss();return {area,enemy:{...g.s.enemy},rewardClass:'elite; no region seal'};});
 write('data-audit',{jobs,enemies,riftBossTemplate:{...rift.s.enemy},mimicTemplate:{...mimic.s.enemy},midbossTemplates:midbosses,items:ITEMS.map(d=>({...d,rarity:d.fixedGrade===undefined?'rolled':C.RARITIES[d.fixedGrade],saleByGrade:C.RARITIES.map((name,grade)=>({name,unupgradedPrice:10+grade*10})),purchase:'No item-specific shop listing; sealed random elite box costs 55G.'})),effectTypes:C.EFFECT_TYPES,affixes:C.AFFIXES,weights:C.WEIGHTS,slotWeights:{weapon:45,armor:35,charm:20},growth:{hpPerLevel:8,attackPerLevel:2,mp:'floor((level-1)/2)',defense:'floor((level-1)/2)',xpThreshold:'22+level*13',campHpPerLevel:5},notes:['Enemy names within one area share stats and pattern; current species-specific ability tables do not exist.','Item damage/defense depends on generated power, plus and affixes. Charm base power feeds luck, not defense.','1000 ITEM definitions are not 1000 distinct combat behaviors.']});
 assert.equal(jobs.length,114);assert.equal(jobs.filter(j=>j.hidden).length,14);assert.equal(ITEMS.length,1000);
}
if(run('combat')){
 const stages=[{id:'early',area:0,level:3},{id:'mid',area:3,level:8},{id:'late',area:7,level:15}];
 const records=[];for(const [id,j] of Object.entries(JOBS))for(const stage of stages)for(const seed of seeds){
  const g=fresh(seed);g.s.job=id;g.s.career.current=id;g.s.career.history=[id];g.s.career.hiddenPath=!!j.hidden;if(j.hidden)g.s.unlocked.push(id);g.s.level=stage.level;g.s.area=stage.area;
  // Same real drop budget per fixture; gear remains seed-specific, not optimal crafted loadouts.
  for(let i=0;i<12;i++){const d=g.makeGear('boss'),old=g.s[d.slot];if(d.power>old.power)g.s[d.slot]=d;}
  g.s.hp=g.maxHp();g.s.mp=g.maxMp();g.s.potions=3;g.fight(true);
  for(const policy of ['attack','skill','tactical','no-resources','synergy']){
   const h=Game.load(g.export());if(policy==='no-resources'){h.s.mp=0;h.s.potions=0;}
   if(policy==='synergy'){h.s.weapon.affixes=[{id:'leech',value:7}];h.s.armor.affixes=[{id:'defense',value:3}];h.s.charm.affixes=[{id:'critical',value:8}];h.s.hp=h.maxHp();}
   const hp=h.maxHp(),mp=h.s.mp,potions=h.s.potions,used={attack:0,skill:0,defend:0,potion:0};let turns=0,spentMp=0;
   while(h.s.scene==='battle'&&turns<120){const cmd=action(h,policy==='no-resources'||policy==='synergy'?'tactical':policy),before=h.s.mp;used[cmd]++;h.act(cmd);if(cmd==='skill')spentMp+=Math.max(0,before-h.s.mp);turns++;}
   const won=['reward','loot'].includes(h.s.scene);assert(h.s.hp>=0&&h.s.mp>=0);records.push({id,hidden:j.hidden,tier:j.tier,stage:stage.id,area:stage.area,level:stage.level,seed,policy,win:won,turns,remainingHp:h.s.hp,remainingHpRatio:h.s.hp/hp,spentMp,potionsUsed:potions-h.s.potions,initialMp:mp,used,failure:won?null:h.s.scene==='dead'?'HP depleted':'120-action cap'});
  }
 }
 const groups={};for(const r of records){const k=r.stage+'/'+r.policy;(groups[k]??=[]).push(r);}
 const summary=Object.fromEntries(Object.entries(groups).map(([k,rs])=>[k,{n:rs.length,winRate:mean(rs.map(r=>+r.win)),meanTurns:mean(rs.map(r=>r.turns)),meanHpRatio:mean(rs.map(r=>r.remainingHpRatio)),meanMpSpent:mean(rs.map(r=>r.spentMp)),meanPotionsUsed:mean(rs.map(r=>r.potionsUsed))}]));
 const byJob=Object.keys(JOBS).map(id=>{const rs=records.filter(r=>r.id===id&&r.policy==='tactical');return {id,name:JOBS[id].name,hidden:JOBS[id].hidden,tier:JOBS[id].tier,winRate:mean(rs.map(r=>+r.win)),meanTurns:mean(rs.map(r=>r.turns)),meanHpRatio:mean(rs.map(r=>r.remainingHpRatio))};}).sort((a,b)=>b.winRate-a.winRate||a.meanTurns-b.meanTurns);
 write('combat',{method:'114 jobs directly assigned in controlled fixtures × 3 stages × 6 seeds × 5 policies. Unlock conditions are bypassed in these fixtures; they are not natural campaigns. Same boss-drop budget; one battle only. Remaining HP measured before claiming pending rewards/level-up heal.',records,summary,byJob});
 assert.equal(records.length,114*3*6*5);
}
if(run('stress')){
 const records=[];for(const starter of STARTERS)for(const area of [0,3,7])for(const seed of seeds)for(const gear of ['starter','drops'])for(const policy of ['attack','skill','tactical'])for(const resources of ['full','empty']){
  const g=fresh(seed,starter);g.s.area=area;g.s.level=[3,8,15][[0,3,7].indexOf(area)];
  if(gear==='drops')for(let i=0;i<12;i++){const d=g.makeGear('boss');if(d.power>g.s[d.slot].power)g.s[d.slot]=d;}
  g.s.hp=g.maxHp();g.s.mp=resources==='full'?g.maxMp():0;g.s.potions=resources==='full'?3:0;g.fight(true);let turns=0,pots=g.s.potions,mp=0;
  while(g.s.scene==='battle'&&turns<120){const cmd=action(g,policy),before=g.s.mp;g.act(cmd);if(cmd==='skill')mp+=Math.max(0,before-g.s.mp);turns++;}
  records.push({starter,area,seed,gear,policy,resources,win:['reward','loot'].includes(g.s.scene),turns,hpRatio:g.s.hp/g.maxHp(),potionsUsed:pots-g.s.potions,mpSpent:mp,failure:g.s.scene==='dead'?'HP depleted':g.s.scene==='battle'?'120-action cap':null});
 }
 const groups={};for(const r of records)(groups[r.area+'/'+r.gear+'/'+r.policy+'/'+r.resources]??=[]).push(r);
 const summary=Object.fromEntries(Object.entries(groups).map(([k,rs])=>[k,{n:rs.length,winRate:mean(rs.map(r=>+r.win)),meanTurns:mean(rs.map(r=>r.turns)),meanHpRatio:mean(rs.map(r=>r.hpRatio)),potions:mean(rs.map(r=>r.potionsUsed)),mp:mean(rs.map(r=>r.mpSpent))}]));
 write('combat-stress',{method:'6 starting jobs × 3 stages × 6 seeds × 2 gear budgets × 3 policies × 2 initial resource states. Starter gear is intentionally weak for later bosses. No healing/level-up reward claimed. Initial MP zero can regenerate through attacks/defense.',records,summary});assert.equal(records.length,1296);
}
if(run('rift')){
 const records=[];for(const starter of STARTERS)for(const seed of seeds)for(const floor of [0,10,20])for(const policy of ['attack','skill','tactical']){
  const g=fresh(seed,starter);g.s.area=7;g.s.kind='rift';g.s.rift=floor;g.s.level=15;for(let i=0;i<12;i++){const d=g.makeGear('boss');if(d.power>g.s[d.slot].power)g.s[d.slot]=d;}
  g.s.hp=g.maxHp();g.s.mp=g.maxMp();g.s.potions=3;g.fight(true);let turns=0,mp=0,pots=g.s.potions;
  while(g.s.scene==='battle'&&turns<120){const cmd=action(g,policy),before=g.s.mp;g.act(cmd);if(cmd==='skill')mp+=Math.max(0,before-g.s.mp);turns++;}
  records.push({starter,seed,floor,policy,win:['reward','loot'].includes(g.s.scene),turns,hpRatio:g.s.hp/g.maxHp(),potionsUsed:pots-g.s.potions,mpSpent:mp,failure:g.s.scene==='dead'?'HP depleted':g.s.scene==='battle'?'120-action cap':null});
 }
 const groups={};for(const r of records)(groups[r.floor+'/'+r.policy]??=[]).push(r);
 const summary=Object.fromEntries(Object.entries(groups).map(([k,rs])=>[k,{n:rs.length,winRate:mean(rs.map(r=>+r.win)),meanTurns:mean(rs.map(r=>r.turns)),meanHpRatio:mean(rs.map(r=>r.hpRatio)),potions:mean(rs.map(r=>r.potionsUsed)),mp:mean(rs.map(r=>r.mpSpent))}]));
 write('rift',{method:'Actual rift scaling at floors 0/10/20 in fixed level15/12-drop fixtures, not naturally reached floor distribution. Floors stay zero-indexed as engine data. 120-action cap.',records,summary});assert.equal(records.length,324);
}
if(run('exploration')){
 const regions=[];for(let area=0;area<8;area++){const counts={},events={},adjacentRepeats={count:0,total:0};for(let seed=1;seed<=200;seed++){const g=fresh(seed);g.s.area=area;let prior=null;for(let step=0;step<12;step++){g.s.step=step;g.routes();const type=g.s.routes[0];counts[type]=(counts[type]||0)+1;if(type==='event'){g.s.scene='map';g.choose(0);events[g.s.eventId]=(events[g.s.eventId]||0)+1;adjacentRepeats.total++;if(g.s.eventId===prior)adjacentRepeats.count++;prior=g.s.eventId;}g.s.scene='map';}}regions.push({area,name:AREAS[area].name,counts,eventIds:events,adjacentEventRepeat:adjacentRepeats});}
 write('exploration',{method:'200 seeds/region × 12 route slots using real routes/choose. Not an entire campaign: route fixture does not simulate secretPity progression outside chosen events. Fixed slots are exact; random-slot distribution is conditional.',regions,events:EVENTS,chapterChoices:C.CHAPTER_DECISIONS,checkpointSlots:[4,8,12]});
}
if(run('campaign')){
 const campaigns=[];for(const starter of STARTERS)for(const seed of [2,17,91])for(const policy of ['attack','skill','tactical']){
  let g=fresh(seed,starter),actions=0,lastScene='',restores=0,restorationFailures=0,revivals=0;const scenes={},events={},jobs=[{id:starter,action:0,level:1}],gear=[],regions=[],combat={turns:0,mpSpent:0,potions:0},stalls=[];
  while(g.s.scene!=='ending'&&actions<6000){const s=g.s,scene=s.scene;scenes[scene]=(scenes[scene]||0)+1;const beforeTurns=s.turns,beforeScene=s.scene;let progressed=true;
   if(scene==='camp'){g.rest();for(const q of g.quests())g.claim(q.id);while(s.herb>=3)g.craft();while(s.potions<5&&s.gold>=16)g.buy('potion');g.upgrade('weapon');g.upgrade('armor');g.campUp();
    if(s.cleared.length>=1)for(const id of ['alice','adam','ahab']){let guard=0;while(s.threads[id]<2&&guard++<3){g.thread(id);g.dialogue(0);if(g.s.returnAfterResult)g.nextEncounter();}}
    const next=g.careerCandidates().find(c=>c.available);if(next){g.changeJob(next.id);jobs.push({id:g.s.job,action:actions,level:g.s.level});}
    if(s.checkpoint)g.resumeJourney();else g.enterArea(Math.min(7,s.cleared.length));
   }else if(scene==='map')g.choose(0);
   else if(scene==='battle'){const cmd=action(g,policy),mp=s.mp,pots=s.potions;g.act(cmd);combat.turns++;if(cmd==='skill')combat.mpSpent+=Math.max(0,mp-s.mp);combat.potions+=pots-s.potions;}
   else if(scene==='loot'){const d=s.loot,delta=g.compareGear(d),equip=delta.ATK+delta.DEF+delta.HP*.1+delta.CRIT*.2>0;gear.push({action:actions,area:s.area,level:s.level,id:d.id,slot:d.slot,grade:d.grade,power:d.power,equip,delta});g.collectLoot(equip?'equip':'sell');}
   else if(scene==='reward'){if([4,8,12].includes(s.step)&&!s.returnAfterResult&&(!s.rewardState||s.rewardState.claimed)&&!s.checkpoint)g.pauseChapter();else g.nextEncounter();}
   else if(scene==='merchant'){if(policy==='tactical'&&s.potions<3&&s.gold>=16)g.buy('potion');else g.nextEncounter();}
   else if(scene==='chapter')g.chapterChoice(0);
   else if(scene==='npc')g.npcChoice(g.getAffinity(s.thread)>=40?3:0);
   else if(scene==='event'){events[s.eventId]=(events[s.eventId]||0)+1;const idx=EVENTS[s.eventId].choices.findIndex(c=>g.canPay(c.cost));if(idx>=0)g.event(idx);else {stalls.push({scene,id:s.eventId,reason:'no affordable event choice'});break;}}
   else if(scene==='midboss')g.faceMidboss();
   else if(scene==='dead'){revivals++;if(revivals>12){stalls.push({scene,area:s.area,reason:'12 revival cap'});break;}g.revive();}
   else if(scene==='final')g.finish(s.mercy>=5?2:0);
   else {stalls.push({scene,reason:'unexpected scene'});break;}
   if(g.s.cleared.length>regions.length)regions.push({area:g.s.cleared.length-1,action:actions,level:g.s.level,job:g.s.job});
   actions++;
   if(actions%25===0){const code=g.export(),restored=Game.load(code);if(restored.export()!==code)restorationFailures++;assert.equal(restored.export(),code);g=restored;restores++;}
   if(g.s.scene===beforeScene&&g.s.turns===beforeTurns&&scene==='battle'){stalls.push({scene,reason:'battle command made no progress'});break;}
  }
  if(actions>=6000&&g.s.scene!=='ending')stalls.push({scene:g.s.scene,reason:'6000-action cap'});
  campaigns.push({starter,seed,policy,ending:g.s.scene==='ending',endingName:g.s.ending,actions,level:g.s.level,bosses:g.s.cleared.length,revivals,restores,restorationFailures,scenes,events,jobs,gear,regions,combat,collection:g.s.collection.length,stalls,finalScene:g.s.scene,finalGold:g.s.gold});
 }
 const summary=Object.fromEntries(['attack','skill','tactical'].map(policy=>{const rs=campaigns.filter(r=>r.policy===policy);return [policy,{n:rs.length,endings:rs.filter(r=>r.ending).length,meanActions:mean(rs.map(r=>r.actions)),meanRevivals:mean(rs.map(r=>r.revivals)),meanGearDrops:mean(rs.map(r=>r.gear.length)),meanEquips:mean(rs.map(r=>r.gear.filter(d=>d.equip).length)),restores:rs.reduce((n,r)=>n+r.restores,0)}];}));
 write('long-play',{method:'6 actual starting jobs × 3 seeds × 3 combat policies. Engine commands only; natural career gates, no grants of levels/mastery/boss kills. Shared heuristic camp management and checkpoint rests. Revival permitted with a 12-revival cap. Saves reloaded every 25 commands. Simulated engine commands are not human play time or fun measurements.',campaigns,summary});assert.equal(campaigns.length,54);
}
if(run('story')){
 const rows=[];for(let area=0;area<8;area++)for(let sector=0;sector<3;sector++)for(let choice=0;choice<3;choice++){const g=fresh(71);g.s.area=area;g.s.scene='chapter';g.s.chapterSector=sector;const before=g.export();g.chapterChoice(choice);assert.equal(g.s.scene,'reward');assert(g.s.decisions[`chapter_${area}_${sector}`]);const restored=Game.load(g.export());assert.equal(restored.export(),g.export());const factions={...g.s.factions},affinity={...g.s.affinity};g.s.scene='chapter';g.chapterChoice(choice);assert.deepEqual(g.s.factions,factions);assert.deepEqual(g.s.affinity,affinity);rows.push({area,sector,choice,label:C.CHAPTER_DECISIONS[area][sector].choices[choice].label,factions,affinity,executed:true,duplicateRewardBlocked:true});}
 const endings=[];for(let i=0;i<3;i++)for(const mercy of [0,5]){const g=fresh(71);g.s.scene='final';g.s.mercy=mercy;g.finish(i);assert.equal(g.s.scene,i===2&&mercy<5?'final':'ending');endings.push({choice:i,mercy,allowed:g.s.scene==='ending',name:g.s.ending});}
 const reachable=[];for(const [id,j] of Object.entries(JOBS).filter(([,j])=>j.hidden)){const g=fresh(71);g.s.cleared=[0,1,2,3,4,5,6,7];g.s.mercy=100;g.s.lowhpWins=100;g.s.kills=100;g.s.elites=100;g.s.crafts=100;g.s.caches=100;g.s.secrets=100;g.s.rareFinds=100;g.s.weapon.plus=8;g.s.sigils=100;g.s.endings=[0,1,2];g.s.collection=ITEMS.map(d=>d.id);for(const npc of Object.keys(C.NPCS)){g.addAffinity(npc,100-g.getAffinity(npc));g.s.storyFlags[npc+'_seen']=true;}for(let a=0;a<8;a++)g.s.storyFlags[`chapter_${a}_seen`]=true;assert(g.eligible(id),id+' hidden conditions fixture');g.awaken(id);assert(g.s.unlocked.includes(id));reachable.push({id,name:j.name,conditions:j.unlock,fixtureUnlockPassed:true});}
 write('story',{chapterBranches:rows,endings,hiddenReachabilityFixtures:reachable,chapters:C.CHAPTERS,npcs:C.NPCS,limitations:['Hidden fixtures prove condition consistency, not natural reachability frequency.','Literary consistency also requires editorial judgment; automated branching tests are not a full literary review.']});
}
