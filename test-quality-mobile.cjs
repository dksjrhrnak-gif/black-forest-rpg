/* Visual evidence and regressions for the two approved, independently generated portraits. */
const assert=require('node:assert/strict'),fs=require('node:fs'),pw=require('playwright');
const {Game,JOBS,ITEMS}=require('./test-support.cjs');
const engine=process.env.BF_BROWSER||'chromium',key='black-forest-last-ember-v2';
(async()=>{const browser=await pw[engine].launch(require('./qa-browser.cjs')()),checks=[];
try{for(const width of [360,390,430]){
 const context=await browser.newContext({viewport:{width,height:width===360?800:width===390?844:932},hasTouch:true,isMobile:true});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await page.goto(process.env.BF_QA_URL||'http://127.0.0.1:4180/');
 const tap=async locator=>{await page.waitForTimeout(280);await locator.tap();};
 const restore=async g=>{await tap(page.locator('[data-ui="save"]').first());await page.locator('#bf-code').fill(g.export());await tap(page.locator('[data-ui="load"]'));assert(await page.locator('#bf-panel').isHidden());};
 async function capture(name){
  await page.locator('#bf-play img:visible,#bf-panel img:visible').evaluateAll(async xs=>{await Promise.all(xs.map(x=>x.decode()));});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,name+' overflow');
  const bad=await page.locator('#bf-play button:visible,#bf-panel button:visible').evaluateAll(xs=>xs.filter(x=>!x.closest('[inert]')).filter(x=>{const r=x.getBoundingClientRect();return r.width<44||r.height<44;}).map(x=>x.textContent));assert.deepEqual(bad,[],name+' touch targets');
  fs.mkdirSync('screenshots/quality',{recursive:true});await page.screenshot({path:`screenshots/quality/${engine}-${width}-${name}.png`,fullPage:true});checks.push({width,screen:name});
 }
 await capture('start');await tap(page.locator('[data-cmd="start"][data-arg="warrior"]'));await capture('camp');
 const g=new Game(71);g.start('warrior');const item={...g.makeGear('normal'),...ITEMS.find(d=>d.id==='w0'),power:8,grade:1,plus:0,affixes:[],fails:0};g.s.bag=[item];
 await restore(g);await tap(page.locator('[data-ui="equipment"]').first());await tap(page.locator('[data-ui="gear-bag-0"]'));
 const art=page.locator('.armory-sheet .item-art').first();assert.equal(await art.getAttribute('alt'),'쇠 장검');await art.evaluate(el=>el.decode());
 const size=await art.evaluate(el=>({w:el.naturalWidth,h:el.naturalHeight,cw:el.getBoundingClientRect().width,ch:el.getBoundingClientRect().height,fit:getComputedStyle(el).objectFit}));assert.equal(size.w,640);assert.equal(size.h,960);assert.equal(size.ch/size.cw,1.5);assert.equal(size.fit,'contain');
 assert((await page.locator('.armory-sheet .comparison').textContent()).includes('공격 +'));assert(!(await page.locator('.armory-sheet .comparison').textContent()).includes('ATK'));
 const before=await page.evaluate(k=>localStorage.getItem(k),key);await capture('equipment-item');await tap(page.locator('#bf-panel [data-ui="close"]'));assert.equal(await page.evaluate(k=>localStorage.getItem(k),key),before);
 await tap(page.locator('[data-ui="bag"]').first());await capture('inventory');await tap(page.locator('#bf-panel [data-ui="close"]'));
 g.s.job='x_support_16';g.s.unlocked.push(g.s.job);g.s.career.current=g.s.job;g.s.career.history=[g.s.job];g.s.career.hiddenPath=true;g.s.hp=g.maxHp();g.s.mp=g.maxMp();await restore(g);
 await tap(page.locator('[data-ui="equipment"]').first());const portrait=page.locator('.armory-portrait img');assert.equal(await portrait.getAttribute('src'),'assets/class_x_support_16.webp');await portrait.evaluate(el=>el.decode());assert.equal(await portrait.evaluate(el=>el.naturalHeight/el.naturalWidth),1.5);await capture('hidden-class');await tap(page.locator('#bf-panel [data-ui="close"]'));
 const h=new Game(71);h.start('warrior');h.enterArea(0);await restore(h);await capture('exploration');h.chapterChoice(0);await restore(h);await capture('reward');
 h.s.scene='camp';h.s.rewardState=null;h.s.returnAfterResult=null;h.s.step=4;h.s.scene='reward';h.pauseChapter();assert(h.s.checkpoint);await restore(h);await capture('checkpoint');
 const b=new Game(71);b.start('warrior');b.fight();await restore(b);await capture('battle');
 const shop=new Game(71);shop.start('warrior');shop.s.scene='merchant';await restore(shop);await capture('shop');
 assert.deepEqual(errors,[]);await context.close();
 }}finally{await browser.close();}
fs.writeFileSync(`docs/gameplay/mobile-quality-${engine}.json`,JSON.stringify({status:'PASS',checks,limitations:['Touch emulation, not physical devices.','Fixtures inspect screens; natural campaign validation is separate.']},null,2)+'\n');console.log(`PASS ${engine}: ${checks.length} visual screens; portraits, Korean comparisons, save preservation, touch targets`);
})().catch(e=>{console.error(e);process.exit(1);});
