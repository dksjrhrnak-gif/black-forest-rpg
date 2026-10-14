/* Same imported saves and camera positions for before/after B-design review. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),pw=require('playwright');
const {Game,JOBS,EVENTS}=require('./test-support.cjs'),fxFixtures=require('./fx-test-fixtures.cjs');
const key='black-forest-last-ember-v2',engine=process.env.BF_BROWSER||'chromium',baseline=process.env.BF_UI_BASELINE==='1';
const base=process.env.BF_QA_URL||'http://127.0.0.1:4188/',out=process.env.BF_UI_OUT||'docs/ui-b';
const widths=process.env.BF_UI_WIDTHS?JSON.parse(process.env.BF_UI_WIDTHS):[360,390,430];
const modes=process.env.BF_UI_MODES?JSON.parse(process.env.BF_UI_MODES):['dark'];
const phase=Number(process.env.BF_UI_PHASE||6),shots=process.env.BF_UI_SHOTS!=='0';
const camp=Game.load(require('./fixtures/p3-pre-saves.json').saves.find(r=>r.starter==='warrior'&&r.seed===17&&r.style==='collector'&&r.scene==='middle-camp').code);
function fresh(){const g=new Game(17);g.start('warrior');return g;}
(async()=>{const browser=await pw[engine].launch(require('./qa-browser.cjs')()),checks=[];
try{for(const width of widths)for(const theme of modes){const context=await browser.newContext({viewport:{width,height:width===360?800:width===390?844:932},hasTouch:true,isMobile:engine!=='firefox',colorScheme:theme}),page=await context.newPage(),errors=[];
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
const tap=async l=>{await page.waitForTimeout(270);await l.scrollIntoViewIfNeeded();await l.tap();};
const current=async()=>Game.load(await page.evaluate(k=>localStorage.getItem(k),key));
const close=async()=>{if(await page.locator('#bf-panel').isVisible())await tap(page.locator('#bf-panel [data-ui="close"]').first());};
const restore=async g=>{await close();await tap(page.locator('[data-ui="save"]').first());await page.locator('#bf-code').fill(g.export());await tap(page.locator('[data-ui="load"]'));assert.equal((await current()).export(),g.export(),'save import preserves state');};
async function inspect(screen,screenshot=true){
 await page.waitForTimeout(720);const target=await page.locator('#bf-panel').isVisible()?'#bf-panel':'#bf-play';
 for(const img of await page.locator(target+' img:visible').all())await img.evaluate(el=>{el.loading='eager';return el.decode();});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,screen+' page overflow');
 const buttons=await page.locator(target+' button:visible').evaluateAll(bs=>bs.filter(b=>!b.closest('[inert]')).map(b=>{const r=b.getBoundingClientRect(),s=getComputedStyle(b);return {cmd:b.dataset.cmd,ui:b.dataset.ui,text:b.innerText,main:b.classList.contains('game-action'),x:r.x,y:r.y,w:r.width,h:r.height,fs:s.fontSize,fw:s.fontWeight,radius:s.borderRadius,align:s.textAlign,sw:b.scrollWidth,cw:b.clientWidth,sh:b.scrollHeight,ch:b.clientHeight};}));
 if(!baseline){for(const b of buttons.filter(b=>b.main)){assert.equal(b.h,52,screen+' button height: '+JSON.stringify(b));assert.equal(b.fs,'15px');assert.equal(b.fw,'600');assert.equal(b.radius,'10px');assert.equal(b.align,'center');assert(b.w>=44);assert(b.sw<=b.cw+1&&b.sh<=b.ch+1,screen+' clipped button: '+JSON.stringify(b));}}
 assert.deepEqual(errors,[],screen+' console/runtime errors');
 if(shots&&screenshot&&theme==='dark'&&engine==='chromium'){const dir=path.join(out,'screenshots');fs.mkdirSync(dir,{recursive:true});if(target==='#bf-play')await page.evaluate(()=>{const e=document.querySelector('#bf-play');scrollTo(0,e.getBoundingClientRect().top+scrollY-8);});else await page.locator('#bf-panel').evaluate(e=>e.scrollTop=0);await page.screenshot({path:path.join(dir,`${baseline?'before':'after'}-${width}-${screen}.jpg`),type:'jpeg',quality:78,fullPage:false});}
 checks.push({width,theme,screen,buttons,errors:errors.length});
}
await page.goto(base);await inspect('start');await tap(page.locator('[data-cmd="start"][data-arg="warrior"]'));await inspect('camp',false);
const chapter=fresh();chapter.enterArea(0);await restore(chapter);await inspect('exploration');
const battle=fxFixtures.battle();await restore(battle);await inspect('battle');
const loot=Game.load(fxFixtures.rarePurchase(4).code);loot.buy('gear-weapon');await restore(loot);await inspect('reward');
await restore(camp);for(const screen of ['equipment','jobs','workshop','bag','quests','story']){await tap(page.locator(`[data-ui="${screen}"]`).first());await inspect(screen,['equipment','jobs','workshop'].includes(screen));await close();}
const shop=fresh();shop.s.scene='merchant';await restore(shop);await inspect('shop',false);
const final=fresh();final.s.scene='final';final.s.mercy=5;await restore(final);await inspect('final',false);final.finish(2);await restore(final);await inspect('ending',false);
if(!baseline&&phase>=6){
 for(const id of Object.keys(JOBS)){const g=fxFixtures.battle(17,id);await restore(g);await inspect('skill-'+id,false);}
 for(const ev of EVENTS){const g=fresh();g.s.scene='event';g.s.eventId=ev.id;await restore(g);await inspect('event-'+ev.id,false);}
 await restore(battle);battle.act('skill');await tap(page.locator('[data-cmd="act"][data-arg="skill"]'));assert.equal((await current()).export(),battle.export(),'skill click preserves RNG/save');
 const code=battle.export();await page.reload();assert.equal((await current()).export(),code,'reload preserves save');
 await inspect('restored-battle',false);
}
console.log(`PASS B UI ${engine} ${width} ${theme} phase ${phase}${baseline?' baseline':''}`);await context.close();}
}finally{await browser.close();}
fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,`${baseline?'baseline':'ui'}-${engine}.json`),JSON.stringify({status:'PASS',engine,base,baseline,phase,checks,method:'Identical focused saves imported through the real save dialog. Archive camp is a real P2 campaign save; combat/ending fixtures are focused synthetic states. Not an uninterrupted campaign or physical-device test.'},null,2)+'\n');
})().catch(e=>{console.error(e);process.exit(1);});
