/* Additional handoff checks absent from the full journey suite. No state bypass through page globals. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const pw = require('playwright');
const {Game, JOBS, STARTERS, ASSETS} = require('./test-support.cjs');
const engine = process.env.BF_BROWSER || 'chromium';
const base = process.env.BF_QA_URL || 'http://127.0.0.1:4173/';
const key = 'black-forest-last-ember-v2';
const sizes = process.env.BF_VIEWPORTS ? JSON.parse(process.env.BF_VIEWPORTS) : [
  {width:360,height:800}, {width:390,height:844}, {width:430,height:932}
];

(async () => {
  const browser = await pw[engine].launch(require('./qa-browser.cjs')());
  const checks = [];
  try {
    for (const size of sizes) {
      const context = await browser.newContext({viewport:size,hasTouch:true,isMobile:engine!=='firefox'});
      const page = await context.newPage(), errors = [], consoleErrors = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('console', m => {if(m.type()==='error')consoleErrors.push(m.text());});
      const activate = async locator => {await page.waitForTimeout(270);return locator.tap();};
      const state = async () => Game.load(await page.evaluate(k => localStorage.getItem(k),key));
      async function restore(code) {
        await activate(page.locator('[data-ui="save"]').first());
        await page.locator('#bf-code').fill(code);
        await activate(page.locator('[data-ui="load"]'));
        assert(await page.locator('#bf-panel').isHidden());
      }
      for (const id of STARTERS) {
        await context.clearCookies();
        await page.goto(base);
        await page.evaluate(k => localStorage.removeItem(k),key);
        await page.reload();
        await activate(page.locator('[data-cmd="start"][data-arg="'+id+'"]'));
        assert.equal((await state()).s.job,id);
        await activate(page.locator('[data-cmd="enterArea"][data-arg="0"]'));
        assert.equal((await state()).s.scene,'chapter');
        await activate(page.locator('[data-cmd="chapterChoice"][data-arg="0"]'));
        assert.equal((await state()).s.scene,'reward');
        await page.reload();
        assert.equal((await state()).s.scene,'reward');
        const continued=await state();continued.nextEncounter();
        await activate(page.locator('[data-cmd="nextEncounter"]'));
        assert.equal((await state()).export(),continued.export(),'continue must match next scene even when it is an instant event result');
        checks.push(`${size.width}: ${id} actual start/travel/choice/refresh/continue`);
      }
      const g = new Game(71);g.start('warrior');
      await restore(g.export());
      for (const menu of ['bag','workshop','codex','journal','credits','restart','status']) {
        await activate(page.locator('[data-ui="'+menu+'"]').first());
        assert(await page.locator('#bf-panel').isVisible(),menu);
        assert(await page.locator('#bf-panel').innerText(),menu+' has content');
        const r=await page.locator('#bf-panel').boundingBox();
        assert(r.x>=0&&r.y>=0&&r.x+r.width<=size.width+1&&r.y+r.height<=size.height+1,menu+' bounds');
        await activate(page.locator('#bf-panel [data-ui="close"]'));
        assert(await page.locator('#bf-panel').isHidden());
        assert.equal((await state()).export(),g.export(),menu+' viewing must preserve state');
      }
      await activate(page.locator('[data-ui="save"]').first());
      await page.locator('#bf-save-file').setInputFiles({name:'handoff.bfsave',mimeType:'text/plain',buffer:Buffer.from(g.export())});
      await page.waitForFunction(()=>document.querySelector('#bf-panel').hidden);
      assert.equal((await state()).export(),g.export(),'save file import');
      await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true})));
      assert.equal((await state()).export(),g.export(),'simulated persisted pageshow');
      // A null mapping is a text fallback, never a fabricated URL or another class image.
      const missing=Object.keys(JOBS).find(id=>!ASSETS.classes[id]);
      g.s.job=missing;g.s.career.current=missing;g.s.career.history=[missing];g.s.hp=g.maxHp();g.s.mp=g.maxMp();
      await restore(g.export());
      await activate(page.locator('[data-ui="equipment"]').first());
      assert.equal(await page.locator('.armory-portrait img').count(),0);
      assert(await page.locator('.armory-portrait .art-fallback').isVisible());
      await activate(page.locator('#bf-panel [data-ui="close"]'));
      assert.deepEqual(errors,[]);assert.deepEqual(consoleErrors,[]);
      checks.push(`${size.width}: inventory/workshop/codex/journal/credits/restart/status, file import, simulated pageshow, null-image fallback`);
      await context.close();
    }
    // Deliberate network failure in a separate context: only this image is expected to fail.
    const context=await browser.newContext(), page=await context.newPage(),errors=[],failed=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('response',r=>{if(r.status()>=400)failed.push(new URL(r.url()).pathname);});
    await page.route('**/assets/class_warrior.webp',route=>route.fulfill({status:404,contentType:'text/plain',body:'intentional QA failure'}));
    await page.goto(base);
    const image=page.locator('img[src="assets/class_warrior.webp"]').first();
    await image.scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>{const img=document.querySelector('img[src="assets/class_warrior.webp"]');return img.hidden&& !img.parentElement.querySelector('.art-fallback').hidden;});
    await page.locator('[data-cmd="start"][data-arg="warrior"]').click();
    assert.equal(Game.load(await page.evaluate(k=>localStorage.getItem(k),key)).s.scene,'camp');
    assert.deepEqual(errors,[]);assert(failed.length>0);assert(failed.every(p=>p.endsWith('/assets/class_warrior.webp')));
    checks.push('intentional image 404: visible text fallback, game start remains usable, no runtime exception');
    await context.close();
    const report={status:'PASS',engine,base,checks,limitations:['mobile touch emulation, not physical devices','persisted pageshow is a dispatched event, not OS process restoration','no separate settings screen exists; supported panels inspected']};
    fs.writeFileSync(`handoff-readiness-${engine}.json`,JSON.stringify(report,null,2)+'\n');
    console.log(`PASS handoff readiness ${engine}: ${checks.length} checks`);
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
