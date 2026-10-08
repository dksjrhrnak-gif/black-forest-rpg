/* Load actual pre-P1 battle saves through the public UI, then use the new skill. */
const fs=require('node:fs'),assert=require('node:assert/strict'),pw=require('playwright');
const {Game,JOBS}=require('./test-support.cjs'),archive=require('./fixtures/p1-pre-saves.json');
const targets=['x_magic_0','x_magic_15','x_ranged_2','x_occult_13','x_support_16','x_support_17'],engine=process.env.BF_BROWSER||'chromium',key='black-forest-last-ember-v2';
(async()=>{const browser=await pw[engine].launch(require('./qa-browser.cjs')()),checks=[];
try{for(const width of [360,390,430]){const context=await browser.newContext({viewport:{width,height:844},hasTouch:true,isMobile:true}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});await page.goto(process.env.BF_QA_URL||'http://127.0.0.1:4180/');
 const tap=async l=>{await page.waitForTimeout(280);await l.tap();};
 for(const id of targets){const code=archive.saves.find(r=>r.id===id&&r.scene==='battle').code;
  await tap(page.locator('[data-ui="save"]').first());await page.locator('#bf-code').fill(code);await tap(page.locator('[data-ui="load"]'));assert(await page.locator('#bf-panel').isHidden());assert.equal(await page.evaluate(k=>localStorage.getItem(k),key),code,'old UI load preserves save');
  const skill=page.locator('[data-cmd="act"][data-arg="skill"]');assert((await skill.textContent()).includes(JOBS[id].skill),id+' current skill label');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'portrait/long descriptions overflow');const dock=page.locator('.main>.actions');assert((await dock.boundingBox()).height<844,'battle controls fit');
  const expected=Game.load(code);expected.act('skill');await tap(skill);const after=await page.evaluate(k=>localStorage.getItem(k),key);assert.equal(after,expected.export(),id+' actual UI skill matches engine');await page.reload();assert.equal(await page.evaluate(k=>localStorage.getItem(k),key),after,'new status reload');
  fs.mkdirSync('screenshots/p1',{recursive:true});await page.screenshot({path:`screenshots/p1/${engine}-${width}-${id}.png`,fullPage:true});checks.push({width,id,skill:JOBS[id].skill,oldSaveExact:true,skillExact:true,reloadExact:true});
 }
 assert.deepEqual(errors,[]);await context.close();}
}finally{await browser.close();}
fs.mkdirSync('docs/p1',{recursive:true});fs.writeFileSync(`docs/p1/ui-${engine}.json`,JSON.stringify({status:'PASS',engine,base:process.env.BF_QA_URL||'http://127.0.0.1:4180/',checks,limitations:['Mobile emulation, not physical devices.','Career selection is a controlled archived fixture; natural career gates are separately tested.']},null,2)+'\n');console.log(`PASS P1 ${engine}: ${checks.length} actual old-save/skill/status-reload mobile checks, zero console/runtime errors`);
})().catch(e=>{console.error(e);process.exit(1);});
