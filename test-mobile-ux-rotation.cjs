/* A modal may span an orientation change. Its original save control must remain
 * reachable when the modal closes, without taking another game action. */
const assert=require('node:assert/strict'),fs=require('node:fs'),pw=require('playwright');
const fixtures=require('./fx-test-fixtures.cjs');
const engine=process.env.BF_BROWSER||'chromium',url=process.env.BF_QA_URL||'http://127.0.0.1:4199/',out=process.env.BF_UX_OUT||'docs/mobile-ux-refinement',key='black-forest-last-ember-v2';
(async()=>{const browser=await pw[engine].launch(require('./qa-browser.cjs')()),checks=[];
try{for(const modal of ['save','scene-reading','scene-menu'])for(const target of [{width:844,height:390},{width:667,height:375},{width:1024,height:768}]){
 const ctx=await browser.newContext({viewport:{width:390,height:664}}),page=await ctx.newPage(),errors=[],g=fixtures.battle(),code=g.export();
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 try{await page.goto(url);await page.evaluate(({key,code})=>localStorage.setItem(key,code),{key,code});await page.reload();
  await page.locator(`[data-ui="${modal}"]`).click();await page.locator('#bf-panel').waitFor({state:'visible'});
  await page.setViewportSize(target);
  // Let native resize/visualViewport events run while the modal is still open.
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  assert(await page.locator('#bf-panel').isVisible());await page.keyboard.press('Escape');
  await page.waitForFunction(()=>document.querySelector('#bf-panel').hidden);
  const save=page.locator('[data-ui=save]');assert.equal(await save.count(),1,'original save control is never duplicated');assert(await save.isVisible(),`${modal}: save remains visible after rotating with a modal open`);
  await save.scrollIntoViewIfNeeded();await save.click();assert(await page.locator('#bf-code').isVisible(),'save and load remain usable without a game command');assert.equal(await page.locator('#bf-code').inputValue(),code);await page.keyboard.press('Escape');assert(await save.evaluate(e=>document.activeElement===e),'closing save restores focus to reachable control');
  await page.setViewportSize({width:390,height:664});await page.waitForFunction(()=>{const e=document.querySelector('[data-ui=save]');return e&&e.getBoundingClientRect().top>=0&&e.getBoundingClientRect().bottom<=innerHeight&&document.querySelector('.main>.actions').getBoundingClientRect().bottom<=innerHeight+1;});
  const actions=await page.locator('.main>.actions button.game-action').evaluateAll(bs=>bs.map(b=>{const r=b.getBoundingClientRect();return {height:r.height,top:r.top,bottom:r.bottom};}));assert.equal(actions.length,5);assert(actions.every(b=>b.height===52&&b.top>=0&&b.bottom<=664+1),'portrait return restores five 52px battle actions');assert(await save.isVisible());
  assert.equal(await page.evaluate(k=>localStorage.getItem(k),key),code,'modal and orientation preserve save/RNG');assert.equal(await page.locator('#black-forest-game').evaluate(e=>e.bfGameSnapshot()),code);assert.deepEqual(errors,[]);
  checks.push({modal,portrait:[390,664],rotatedTo:[target.width,target.height],singleVisibleSave:true,usableSaveLoad:true,focusRestored:true,fiveActionsOnReturn:true,saveRngPreserved:true,errors:0});
 }finally{await ctx.close();}
}}finally{await browser.close();}
fs.mkdirSync(out,{recursive:true});fs.writeFileSync(`${out}/rotation-${engine}.json`,JSON.stringify({status:'PASS',engine,checks,method:'Real browser resize while a modal is open; then close, reopen save/load, and return to portrait. Responsive browser emulation, not a physical device.'},null,2)+'\n');console.log('PASS mobile UX modal rotation',engine,checks.length);
})().catch(e=>{console.error(e);process.exit(1);});
