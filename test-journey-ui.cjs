const assert=require('node:assert/strict'),{Game,ASSETS,AREAS,EVENTS,JOBS}=require('./test-support.cjs');
const key='black-forest-last-ember-v2',fresh=(seed=1)=>{const g=new Game(seed);g.start('warrior');return g;};
async function verifyJourney({page,activate,restore,fit,size,touch}){
 const failures=[];const bad=resp=>{if(resp.status()>=400&&resp.url().includes('/assets/'))failures.push(resp.url()+' '+resp.status());};page.on('response',bad);
 const state=async()=>Game.load(await page.evaluate(k=>localStorage.getItem(k),key));
 async function verifyCampMenus(){
  const current=await state(),camp=current.s.scene==='camp';
  for(const type of ['workshop','bag','equipment','quests','jobs','story']){
   const menu=page.locator('[data-ui="'+type+'"]').first();
   if(await menu.count())assert.equal(await menu.isDisabled(),!camp,type+' availability in '+current.s.scene);
  }
  if(!camp){
   const code=await page.evaluate(k=>localStorage.getItem(k),key);
   await page.locator('[data-ui="equipment"]').first().evaluate(el=>el.dispatchEvent(new MouseEvent('click',{bubbles:true})));
   assert(await page.locator('#bf-panel').isHidden(),'exploration must reject camp-only menu dispatch');
   assert.equal(await page.evaluate(k=>localStorage.getItem(k),key),code,'blocked menu must preserve saved state');
  }
 }
 // Exercise the combat DOM handler, persistence and rendering before importing result fixtures.
 let combat=fresh();combat.travel(0);combat.fight();combat.s.enemy.hp=1;
 const won=Game.load(combat.export());won.act('attack');
 await restore(combat.export());await verifyCampMenus();
 await activate(page.locator('[data-cmd="act"][data-arg="attack"]'));
 assert.equal((await state()).export(),won.export(),'attack click must persist exactly the engine victory');
 assert(['reward','loot'].includes((await state()).s.scene));
 await page.reload();assert.equal((await state()).export(),won.export(),'victory must survive refresh');
 async function verify(name){console.log('Journey QA '+size.width+' '+name);if(await page.locator('.scene-hero').count())await page.locator('.scene-hero').scrollIntoViewIfNeeded();await page.waitForFunction(()=>[...document.querySelectorAll('#bf-play img')].filter(i=>{const r=i.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight}).every(i=>i.complete&&i.naturalWidth>0),null,{timeout:10000}).catch(async e=>{console.error(name,await page.locator('#bf-play img').evaluateAll(images=>images.map(i=>({src:i.src,complete:i.complete,natural:i.naturalWidth,rect:i.getBoundingClientRect().toJSON(),display:getComputedStyle(i).display}))));throw e;});await fit(name);const visible=await page.locator('#black-forest-game').innerText();assert(!/다음 조우|보상 수령|계속 진행|체크포인트|경로 선택|랜덤 인카운트|다음 지역|자동 이동 중|\b(?:encounter|reward|checkpoint)\b/i.test(visible),name+' forbidden visible copy');}
 let g=fresh();g.travel(0);g.fight();g.s.enemy.hp=1;const before=g.s.gold;g.act('attack');const result=g.export(),image=g.s.resultVisual.id,after=g.s.rewardState.after.gold;await restore(result);await verify('frozen victory');assert.equal((await state()).s.gold,before);assert.equal((await state()).s.rewardState.claimed,false);assert((await page.locator('.scene-hero img').getAttribute('src')).includes(ASSETS.enemies[image]));await page.waitForTimeout(700);assert.equal((await state()).export(),result);await page.reload();await verify('frozen victory reload');assert.equal((await state()).export(),result);
 const collect=page.locator(g.s.scene==='loot'?'[data-cmd="collectLoot"][data-arg="bag"]':'[data-cmd="nextEncounter"]');await page.waitForTimeout(270);if(touch){await collect.scrollIntoViewIfNeeded();const r=await collect.boundingBox();await page.touchscreen.tap(r.x+r.width/2,r.y+r.height/2);await page.touchscreen.tap(r.x+r.width/2,r.y+r.height/2);}else await collect.click({clickCount:2});let collected=await state();assert.equal(collected.s.gold,after);assert.equal(collected.s.rewardState.claimed,true);assert.equal(collected.s.step,1,'double click must create only one scene');assert.equal(collected.s.scene,'chapter');await verify('enemy art swapped for story');assert.equal(await page.locator('.scene-hero img').getAttribute('src'),ASSETS.story.alice);const once=collected.export();await page.reload();assert.equal((await state()).export(),once);
 // Numbered text commands must dispatch the chapter choice shown on screen.
 await page.locator('#bf-command').fill('1');await page.locator('#bf-command').press('Enter');
 assert.equal((await state()).s.scene,'reward');await verify('numbered chapter command');
 // Archived BF2 saves enter through the actual browser importer and survive refresh.
 const archived=require('./fixtures/github-29-saves.json'),oldCode=archived.saves.warrior,oldExpected=Game.load(oldCode);await restore(oldCode);assert.equal((await state()).s.gold,archived.gold);assert.equal((await state()).s.job,'warrior');assert.deepEqual((await state()).rng.getState(),oldExpected.rng.getState());const migrated=(await state()).export();await page.reload();assert.equal((await state()).export(),migrated);await verify('archived BF2 browser import');
 // Continuing through a rest point preserves progression without a map screen.
 g=fresh();g.travel(0);g.s.step=4;g.s.scene='reward';const continued=Game.load(g.export());continued.nextEncounter();await restore(g.export());await activate(page.locator('[data-cmd="nextEncounter"]'));assert.equal((await state()).export(),continued.export());await verify('rest point continue');
 // A revealed elite uses its own enemy artwork at every required width.
 g=fresh();g.travel(0);g.fight(false,true,'굶주린 늑대');await restore(g.export());await verify('elite battle');assert.equal(await page.locator('.scene-hero img').getAttribute('src'),ASSETS.enemies['굶주린 늑대']);
 // Return to a retained rest point, then resume with one explicit action.
 g=fresh();g.travel(0);g.s.step=4;g.s.scene='reward';await restore(g.export());await verify('rest point');await verifyCampMenus();await activate(page.locator('[data-cmd="pauseChapter"]'));assert.equal((await state()).s.scene,'camp');await verifyCampMenus();
 const tired=await state();tired.s.hp=Math.max(1,tired.maxHp()-10);tired.s.mp=0;await restore(tired.export());
 const rested=Game.load(tired.export());rested.rest();await activate(page.locator('[data-cmd="rest"]'));
 assert.equal((await state()).export(),rested.export(),'rest click must preserve checkpoint and restore stats');
 await page.reload();assert.equal((await state()).export(),rested.export(),'rested checkpoint must survive refresh');
 const checkpoint=await state(),expected=Game.load(checkpoint.export());expected.resumeJourney();await activate(page.locator('[data-cmd="resumeJourney"]'));assert.equal((await state()).export(),expected.export());await verifyCampMenus();await verify('retained journey resumed');
 // A camp conversation result with a retained route survives actual import and refresh.
 for(const kind of ['npc','dialogue','bond']){
  g=fresh();g.s.cleared=[0,1];g.travel(2);g.s.step=4;g.s.scene='reward';g.pauseChapter();
  if(kind==='bond'){g.s.threads.alice=2;g.addAffinity('alice',80);}
  const retained=JSON.parse(JSON.stringify(g.s.checkpoint));await restore(g.export());
  await activate(page.locator('[data-ui="story"]').first());
  const cmd=kind==='npc'?'meetNpc':kind==='dialogue'?'thread':'bondQuest';
  await activate(page.locator('[data-cmd="'+cmd+'"][data-arg="alice"]'));
  await activate(page.locator('[data-cmd="'+(kind==='npc'?'npcChoice':kind==='dialogue'?'dialogue':'bondChoice')+'"][data-arg="'+(kind==='bond'?1:0)+'"]'));
  assert.equal((await state()).s.returnAfterResult,'camp');assert.equal(await page.locator('[data-cmd="pauseChapter"]').count(),0);
  const resultCode=(await state()).export();await page.reload();assert.equal((await state()).export(),resultCode);await verify('retained route '+kind+' result reload');
  await activate(page.locator('[data-cmd="nextEncounter"]'));assert.equal((await state()).s.scene,'camp');assert.deepEqual((await state()).s.checkpoint,retained);
  await activate(page.locator('[data-cmd="resumeJourney"]'));assert.equal((await state()).s.checkpoint,null);assert.notEqual((await state()).s.scene,'camp');await verify('retained route '+kind+' resume');
 }
 // Shop purchase stays on the shop; the exit enters the next situation.
 g=fresh();g.travel(0);g.s.scene='merchant';g.s.gold=100;await restore(g.export());await verify('shop');await activate(page.locator('[data-cmd="buy"][data-arg="potion"]'));assert.equal((await state()).s.scene,'merchant');await activate(page.locator('[data-cmd="nextEncounter"]'));assert.notEqual((await state()).s.scene,'map');await verify('shop exit');
 // Boss awards the regional seal exactly once before opening the camp.
 g=fresh();g.travel(0);g.fight(true);g.s.enemy.hp=1;g.act('attack');await restore(g.export());await verify('boss result');assert.equal((await state()).s.cleared.length,0);assert.equal(await page.locator('.scene-hero img').getAttribute('src'),ASSETS.bosses[AREAS[0].boss]);await activate(page.locator('[data-cmd="collectLoot"][data-arg="bag"]'));assert.equal((await state()).s.scene,'camp');assert.equal((await state()).s.cleared.length,1);await verify('regional seal and camp');
 // Every visible scene category is checked at every viewport.
 g=fresh();g.travel(0);g.s.scene='event';g.s.eventId=0;await restore(g.export());await verify('event');assert.equal(await page.locator('.scene-hero img').getAttribute('src'),ASSETS.events[0]);await activate(page.locator('[data-cmd="event"]').first());await verify('event result');
 for(const type of ['shrine','secret','cache']){g=fresh();g.travel(0);g.s.routes=[type];g.choose(0);if(g.s.scene==='loot')g.takeLoot('bag');if(g.s.scene==='battle'){g.s.enemy.hp=1;g.act('attack');}await restore(g.export());await verify(type+' result');}
 g=fresh();g.s.cleared=[0];g.meetNpc('alice');await restore(g.export());await verify('NPC');await activate(page.locator('[data-cmd="npcChoice"][data-arg="0"]'));assert.equal((await state()).s.returnAfterResult,'camp');await verify('NPC result');await activate(page.locator('[data-cmd="nextEncounter"]'));assert.equal((await state()).s.scene,'camp');
 g=fresh();g.s.cleared=[0,1];g.travel(2);g.s.step=10;g.routes();g.nextEncounter();await restore(g.export());await verify('optional guardian');await activate(page.locator('[data-cmd="skipMidboss"]'));await verify('guardian avoided');assert.equal((await state()).s.midbosses.length,0);
 g=fresh();g.travel(0);g.fight();g.s.enemy.atk=1000;g.s.hp=1;g.act('defend');assert.equal(g.s.scene,'dead');await restore(g.export());await verify('death');await activate(page.locator('[data-cmd="revive"]'));assert.equal((await state()).s.scene,'camp');
 // Successful escape retains the opponent until the player leaves the result.
 let escape;for(let seed=1;seed<40&&!escape;seed++){const candidate=fresh(seed);candidate.travel(0);candidate.fight();const probe=Game.load(candidate.export());probe.act('flee');if(probe.s.scene==='reward')escape=candidate;}assert(escape);await restore(escape.export());await activate(page.locator('[data-cmd="act"][data-arg="flee"]'));assert.equal((await state()).s.scene,'reward');await verify('escape result');await activate(page.locator('[data-cmd="nextEncounter"]'));assert.notEqual((await state()).s.scene,'map');
 g=fresh();g.s.cleared=[0,1,2,3,4,5,6];g.travel(7);g.fight(true);g.s.enemy.hp=1;g.act('attack');await restore(g.export());await verify('last guardian result');await activate(page.locator('[data-cmd="collectLoot"][data-arg="bag"]'));assert.equal((await state()).s.scene,'final');await verify('final choice');await page.locator('#bf-command').fill('1');await page.locator('#bf-command').press('Enter');assert.equal((await state()).s.scene,'ending');await verify('ending');await activate(page.locator('#bf-play [data-ui="restart"]'));await activate(page.locator('[data-ui="confirm-restart"]'));assert.equal((await state()).s.scene,'start');assert.equal(await page.locator('[data-cmd="start"]').count(),6);await verify('new journey');
 // Locked hidden artwork stays absent; confirmed regular class art appears in equipment.
 g=fresh();await restore(g.export());await activate(page.locator('[data-ui="jobs"]').first());await page.locator('[data-filter="jobs:query"]').fill('');await page.locator('[data-filter="jobs:family"]').selectOption('hidden');assert.equal(await page.locator('#bf-job-list .item').count(),14);assert.equal(await page.locator('#bf-job-list img').count(),0,'undiscovered hidden artwork must stay absent');await activate(page.locator('#bf-panel [data-ui="close"]'));
 const reviewedPortraits=['adventurer','hunter','guardian','x_magic_0','x_magic_3','x_magic_4','x_ranged_2',...require('./docs/part-b-image-selections.json').map(r=>r.classId),...require('./docs/late-image-selections.json').map(r=>r.classId),...require('./docs/newest-image-selections.json').map(r=>r.classId)];for(const id of ([320,360,375,390,430].includes(size.width)?reviewedPortraits:['warrior'])){g=fresh();g.s.job=id;if(JOBS[id].hidden){g.s.unlocked.push(id);g.s.career.discovered.push(id);g.s.career.unlocked.push(id);}g.s.career.hiddenPath=!!JOBS[id].hidden;g.s.career.current=id;g.s.career.history=[id];g.s.hp=g.maxHp();g.s.mp=g.maxMp();await restore(g.export());await activate(page.locator('[data-ui="equipment"]').first());const img=page.locator('.armory-portrait img');await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());assert.equal(await img.getAttribute('src'),ASSETS.classes[id]);assert.equal(await img.evaluate(el=>getComputedStyle(el).objectFit),'contain');const visiblePortrait=await img.boundingBox(),portraitHub=await page.locator('.armory-hub').boundingBox();assert(visiblePortrait.y>=portraitHub.y-1&&visiblePortrait.y+visiblePortrait.height<=portraitHub.y+portraitHub.height+1,'whole class portrait must fit its visible hub '+id);await fit('new class portrait '+id);if(JOBS[id].hidden&&[320,390].includes(size.width)){require('node:fs').mkdirSync('screenshots',{recursive:true});await page.screenshot({path:'screenshots/portrait-'+(touch?'touch-':'click-')+size.width+'-'+id+'.png',fullPage:true});}await activate(page.locator('#bf-panel [data-ui="close"]'));await activate(page.locator('[data-ui="status"]').first());assert.equal(await page.locator('.class-details img').getAttribute('src'),ASSETS.classes[id]);await fit('current class details '+id);await activate(page.locator('#bf-panel [data-ui="close"]'));}
 // Exhaustive actual artwork scene coverage once per browser engine/touch suite.
 if(size.width===390){for(let area=0;area<8;area++){g=fresh();g.s.cleared=Array.from({length:area},(_,i)=>i);g.travel(area);await restore(g.export());await verify('area '+area);}for(const name of Object.keys(ASSETS.enemies)){g=fresh();g.fight(false,false,name);await restore(g.export());await verify('enemy '+name);assert.equal(await page.locator('.scene-hero img').getAttribute('src'),ASSETS.enemies[name]);}for(const name of Object.keys(ASSETS.bosses)){g=fresh();g.fight(true);g.s.enemy.name=name;await restore(g.export());await verify('boss '+name);assert.equal(await page.locator('.scene-hero img').getAttribute('src'),ASSETS.bosses[name]);}for(const ev of EVENTS){g=fresh();g.s.scene='event';g.s.eventId=ev.id;await restore(g.export());await verify('event '+ev.id);assert.equal(await page.locator('.scene-hero img').getAttribute('src'),ASSETS.events[ev.id]);}}
 assert.deepEqual(failures,[],'asset HTTP failures');page.off('response',bad);
}
module.exports={verifyJourney};
