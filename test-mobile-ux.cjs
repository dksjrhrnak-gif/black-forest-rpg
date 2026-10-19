const prepareFixtureImages=require('./qa-fixture-images.cjs');
/* Rendered comparison against the shipped UI. Fixtures keep the same save/RNG on
 * both versions; combat fixtures are focused QA saves, not a natural campaign. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),pw=require('playwright');
const {Game,JOBS}=require('./test-support.cjs'),fx=require('./fx-test-fixtures.cjs');
const engine=process.env.BF_BROWSER||'chromium',before=process.env.BF_UX_BEFORE==='1',url=process.env.BF_QA_URL||'http://127.0.0.1:4199/',out=process.env.BF_UX_OUT||'docs/mobile-ux-refinement',key='black-forest-last-ember-v2';
const sizes=[[360,800],[390,844],[430,932],[390,664]],scenes=['battle','boss','exploration','promotion','reward'];
function state(scene){
 if(scene==='battle')return fx.battle();
 const g=new Game(17);g.start('warrior');
 if(scene==='exploration'){g.enterArea(0);return g;}
 g.travel(0);g.fight(true);
 if(scene==='boss')return g;
 g.s.enemy.hp=1;g.act('attack');assert.equal(g.s.scene,'loot');
 if(scene==='promotion'){g.collectLoot('bag');assert(g.promotionStatus().ready);}
 return g;
}
async function decoded(page){await page.locator('#bf-play img:visible').evaluateAll(es=>Promise.all(es.filter(e=>{const r=e.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;}).map(async e=>{await e.decode();if(!e.complete||!e.naturalWidth)throw Error('image decode failed: '+e.getAttribute('src'));})));}
async function measurements(page){return page.evaluate(()=>{
 const box=e=>{if(!e)return null;const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom,right:r.right};},shown=e=>e&&e.getClientRects().length>0,inside=r=>r&&r.y>=-1&&r.x>=-1&&r.bottom<=innerHeight+1&&r.right<=innerWidth+1;
 const actionHost=document.querySelector('.promotion-confirm')||document.querySelector('#bf-play .main>.actions'),buttons=actionHost?[...actionHost.querySelectorAll('button.game-action')].filter(shown):[];
 const actions=buttons.map(b=>{const s=getComputedStyle(b),r=box(b);return {...r,text:b.innerText,visible:inside(r),disabled:b.disabled,font:s.fontSize,weight:s.fontWeight,radius:s.borderRadius,clipped:b.scrollWidth>b.clientWidth+1||b.scrollHeight>b.clientHeight+1};});
 const image=document.querySelector('#bf-play .scene-art img'),story=document.querySelector('.scene-hero-body'),enemy=document.querySelector('.enemy');
 const ib=box(image),eb=box(enemy),imageEnemyIntersectionArea=ib&&eb?Math.max(0,Math.min(ib.right,eb.right)-Math.max(ib.x,eb.x))*Math.max(0,Math.min(ib.bottom,eb.bottom)-Math.max(ib.y,eb.y)):0;
 return {imageEnemyIntersectionArea,viewport:{width:innerWidth,height:innerHeight},root:box(document.querySelector('#black-forest-game')),top:box(document.querySelector('.top')),hud:box(document.querySelector('#bf-stats')),image:box(document.querySelector('#bf-play .scene-art')),imageElement:image?{...box(image),complete:image.complete,naturalWidth:image.naturalWidth,naturalHeight:image.naturalHeight,loading:image.loading,src:image.getAttribute('src'),objectFit:getComputedStyle(image).objectFit}:null,story:story?{...box(story),scrollHeight:story.scrollHeight,clientHeight:story.clientHeight,text:story.innerText,tabindex:story.getAttribute('tabindex')}:null,enemy:enemy?{...box(enemy),text:enemy.innerText,visible:inside(box(enemy))}:null,actionPanel:box(actionHost),actions,visibleActions:actions.filter(b=>b.visible).length,playerMeters:[...document.querySelectorAll('#bf-stats progress')].map(e=>({label:e.getAttribute('aria-label'),...box(e),visible:inside(box(e))})),overflow:document.documentElement.scrollWidth>innerWidth+1,scrollHint:[...document.querySelectorAll('[data-story-hint],.story-scroll-hint,.scene-scroll-hint')].filter(shown).map(e=>e.innerText),promotionCards:document.querySelectorAll('.promotion-card').length};
 });}
async function inspect(page,g,scene,width,height){
 const code=g.export();await page.evaluate(({key,code})=>localStorage.setItem(key,code),{key,code});await prepareFixtureImages(page);await page.reload({waitUntil:'domcontentloaded'});await page.locator(scene==='promotion'?'.promotion-screen':'#bf-play .main').waitFor();await decoded(page);await page.waitForTimeout(150);
 const m=await measurements(page);assert(!m.overflow,'horizontal overflow');
 // Capture the same initial presentation state on both versions (before choosing a candidate).
 if(engine==='chromium'&&width===390){const dir=path.join(out,'screenshots');fs.mkdirSync(dir,{recursive:true});const file=`${before?'before':'after'}-${width}x${height}-${scene}.jpg`;await page.screenshot({path:path.join(dir,file),type:'jpeg',quality:86});m.screenshot='screenshots/'+file;}
 for(const b of m.actions){assert.equal(b.height,52,'52px action: '+b.text);assert(!b.clipped,'full action text: '+b.text);}
 if(!before){
  assert(m.actions.every(b=>b.visible),'all main actions visible');
  for(const b of m.actions){assert.equal(b.font,'15px');assert.equal(b.weight,'600');assert.equal(b.radius,'10px');}
  if(scene==='battle'||scene==='boss'){
   assert.equal(m.imageEnemyIntersectionArea,0,'enemy summary never covers the enemy image');assert.equal(m.actions.length,5);assert(m.enemy&&m.enemy.visible,'enemy HP / intent visible');assert(m.enemy.text.includes('다음 행동'),'next action preserved');
   assert(m.playerMeters.find(x=>x.label==='HP')?.visible,'player HP visible');assert(m.playerMeters.find(x=>x.label==='MP')?.visible,'player MP visible');
   assert(m.image.height>=(width===390&&height===664?150:100),'useful combat image height');assert.equal(m.imageElement.objectFit,'contain');
   assert(await page.locator('[data-cmd=act][data-arg=skill]').evaluate(b=>{const t=b.parentElement.innerText;return /MP\s*\d/.test(t);}), 'skill MP cost always available');
   for(const arg of ['skill','defend','potion','flee'])assert(Number(await page.locator(`[data-cmd=act][data-arg=${arg}]`).evaluate(b=>parseFloat(getComputedStyle(b.parentElement.querySelector('.action-help')).fontSize)))>=13,'critical action help readable');
   assert((await page.locator('[data-arg=potion]').locator('..').innerText()).includes('적 행동 진행'));
   const read=page.locator('[data-ui="scene-reading"]');await read.click();const details=await page.locator('.battle-action-details').innerText();assert(details.includes(JOBS[g.s.job].desc));assert(details.includes('MP '+g.skillCost()));await page.keyboard.press('Escape');assert(await read.evaluate(e=>document.activeElement===e));

  }
  if(scene==='exploration'){
   assert.equal(m.actions.length,3);assert(m.story.text.includes(g.s.message.split('\n')[0]));
   if(m.story.scrollHeight>m.story.clientHeight+2){
    await page.waitForFunction(()=>document.querySelector('.scene-hero-body').dataset.more==='true');assert(await page.locator('.story-scroll-cue').isVisible(),'long story has explicit scroll cue');
    await page.locator('.scene-hero-body').focus();await page.keyboard.press('End');await page.waitForFunction(()=>document.querySelector('.scene-hero-body').dataset.more==='false');assert(await page.locator('.story-scroll-cue').isHidden(),'cue clears at story end');
    await page.waitForFunction(()=>{const e=document.querySelector('.scene-hero-body');return e.scrollHeight-e.clientHeight-e.scrollTop<0.5;});await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));await page.keyboard.press('Home');await page.waitForFunction(()=>{const e=document.querySelector('.scene-hero-body');return e.scrollTop<0.5&&e.dataset.more==='true';});
   }else assert(await page.locator('.story-scroll-cue').isHidden(),'short story has no unneeded cue');

   const read=page.locator('[data-ui="scene-reading"]');assert(await read.isVisible());await read.click();assert((await page.locator('#bf-panel').innerText()).includes(g.s.message.split('\n')[0]));await page.keyboard.press('Escape');assert(await read.evaluate(e=>document.activeElement===e));
  }
  if(scene==='promotion'){
   assert.equal(m.actions.length,1);assert(m.actions[0].disabled,'explicit confirm disabled before selection');
   const candidate=g.promotionCandidates().find(x=>x.available),pick=page.locator(`[data-promotion-pick="${candidate.id}"]`);await pick.click();assert.equal(await pick.getAttribute('aria-pressed'),'true');assert(await page.locator('#promotion-choice').innerText());assert(await page.locator('.promotion-confirm button').isEnabled());
  }
  if(scene==='reward')assert.equal(m.actions.length,3);
 }
 assert.equal(await page.evaluate(k=>localStorage.getItem(k),key),code,'inspection preserves save/RNG');assert.equal(await page.locator('#black-forest-game').evaluate(e=>e.bfGameSnapshot()),code,'presentation has no game-state effect');
 return {...m,width,height,scene,saveSha256:crypto.createHash('sha256').update(code).digest('hex'),inspectionPreservesState:true};
}
async function stressChecks(page){
 const rows=[],longJob=Object.entries(JOBS).sort((a,b)=>b[1].desc.length-a[1].desc.length)[0][0];
 for(const name of ['long-log','long-skill','many-statuses','large-text-simulation']){
  const g=fx.battle(17,name==='long-skill'?longJob:'warrior');
  if(name==='long-log')g.s.message=Array(8).fill(g.s.message+' '+JOBS[g.s.job].desc).join('\n');
  if(name==='many-statuses')Object.assign(g.s.enemy,{dot:5,dotTurns:3,dotId:'burn',stun:1,weak:1,guarded:true});
  const code=g.export();Game.load(code);await page.evaluate(({key,code})=>localStorage.setItem(key,code),{key,code});await prepareFixtureImages(page);await page.reload({waitUntil:'domcontentloaded'});await decoded(page);
  // Explicit presentation simulation, not OS/browser accessibility text zoom.
  if(name==='large-text-simulation')await page.addStyleTag({content:'#black-forest-game .scene-hero-text,#black-forest-game .intent,#black-forest-game .action-help,#black-forest-game .viewport-identity strong{font-size:19px!important}'});
  await page.waitForTimeout(150);const m=await measurements(page);assert(!m.overflow);assert.equal(m.actions.length,5);assert(m.actions.every(b=>b.height===52&&!b.clipped),'stress actions retain full 52px targets');assert(m.enemy.visible,'enemy HP / next action remain visible');assert(m.playerMeters.find(x=>x.label==='HP')?.visible&&m.playerMeters.find(x=>x.label==='MP')?.visible,'stress vitals visible');assert(m.image.height>=32,'stress image has actual visible space');
  assert.equal(m.imageEnemyIntersectionArea,0,'stress enemy information does not overlap the image');
  if(name!=='large-text-simulation'){assert.equal(m.visibleActions,5,'all five actions visible in ordinary text stress');assert(m.image.height>=150,'short-screen long log / skill / status image is at least 150px');}
  for(const button of await page.locator('.main>.actions .game-action').all()){
   await button.scrollIntoViewIfNeeded();const b=await button.boundingBox();assert(b.y>=0&&b.y+b.height<=664+1,'every action reachable at enlarged text');
  }
  await page.locator('.main>.actions').evaluate(e=>e.scrollTop=0);
  if(name==='long-log'){
   assert(m.story.height<=112.5,'long log bounded at 112px');assert(m.story.scrollHeight>m.story.clientHeight,'long log keeps full internal content');await page.locator('.scene-hero-body').focus();await page.keyboard.press('End');await page.waitForFunction(()=>document.querySelector('.scene-hero-body').dataset.more==='false');assert(await page.locator('.story-scroll-cue').isHidden());
  }
  const read=page.locator('[data-ui="scene-reading"]');await read.click();assert((await page.locator('.battle-action-details').innerText()).includes(JOBS[g.s.job].desc),'actual complete skill description available');assert((await page.locator('#bf-panel').innerText()).includes(g.s.message.split('\n').at(-1)),'full log is accessible');await page.keyboard.press('Escape');
  assert.equal(await page.evaluate(k=>localStorage.getItem(k),key),code,'stress UI has no save/RNG effect');assert.equal(await page.locator('#black-forest-game').evaluate(e=>e.bfGameSnapshot()),code);
  rows.push({name,job:g.s.job,viewport:[390,664],imageHeight:m.image.height,storyHeight:m.story.height,visibleActions:m.visibleActions,allFiveReachable:true,imageEnemyIntersectionArea:m.imageEnemyIntersectionArea,saveRngPreserved:true,method:name==='large-text-simulation'?'Explicit 19px CSS presentation test; real OS text zoom NOT TESTED':'Focused valid saved state; no production content modification'});console.log('PASS mobile UX stress',engine,name,m.visibleActions,m.image.height);
 }
 return rows;
}
(async()=>{const browser=await pw[engine].launch(require('./qa-browser.cjs')()),checks=[],stress=[];try{for(const [width,height]of sizes){const ctx=await browser.newContext({viewport:{width,height},hasTouch:true,isMobile:engine!=='firefox'}),page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});await page.goto(url);for(const scene of scenes){checks.push(await inspect(page,state(scene),scene,width,height));console.log('PASS mobile UX',engine,before?'before':'after',width,height,scene);}if(!before&&width===390&&height===664)stress.push(...await stressChecks(page));assert.deepEqual(errors,[]);await ctx.close();}}finally{await browser.close();}fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,`${before?'before':'after'}-${engine}.json`),JSON.stringify({status:'PASS',engine,version:before?'before':'after',url,checks,stress,method:'Actual rendered browser, same seeded focused saves; no production command/RNG changes; naturally decoded images, no loading attribute injection; not a natural human campaign.'},null,2));})().catch(e=>{console.error(e);if(process.env.GITHUB_ACTIONS==='true')console.error('::error::'+String(e.stack||e).replace(/%/g,'%25').replace(/\r/g,'%0D').replace(/\n/g,'%0A'));process.exit(1);});
