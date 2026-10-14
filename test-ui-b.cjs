/* Same imported saves and camera positions for before/after B-design review. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),pw=require('playwright');
const {Game,JOBS,EVENTS}=require('./test-support.cjs'),fxFixtures=require('./fx-test-fixtures.cjs');
const key='black-forest-last-ember-v2',engine=process.env.BF_BROWSER||'chromium',baseline=process.env.BF_UI_BASELINE==='1';
const base=process.env.BF_QA_URL||'http://127.0.0.1:4188/',out=process.env.BF_UI_OUT||'docs/ui-b';
const widths=process.env.BF_UI_WIDTHS?JSON.parse(process.env.BF_UI_WIDTHS):[360,390,430];
const modes=process.env.BF_UI_MODES?JSON.parse(process.env.BF_UI_MODES):['dark','light'];
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
 if(!screen.startsWith('skill-')&&!screen.startsWith('event-'))await page.waitForTimeout(720);const target=await page.locator('#bf-panel').isVisible()?'#bf-panel':'#bf-play';
 for(const img of await page.locator(target+' img:visible').all())await img.evaluate(el=>{el.loading='eager';return el.decode();});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,screen+' page overflow');
 const buttons=await page.locator(target+' button:visible').evaluateAll(bs=>{const groups=[];return bs.filter(b=>!b.closest('[inert]')).map(b=>{const r=b.getBoundingClientRect(),s=getComputedStyle(b),label=b.querySelector('.action-label'),ls=getComputedStyle(label||b),range=document.createRange();range.selectNodeContents(b);const lr=label?label.getBoundingClientRect():range.getBoundingClientRect(),parent=b.closest('.action-option')||b,group=b.closest('.actions,.campnav,.row')||parent.parentElement;if(!groups.includes(group))groups.push(group);return {cmd:b.dataset.cmd,ui:b.dataset.ui,text:b.innerText,main:b.classList.contains('game-action'),group:groups.indexOf(group),x:r.x,y:r.y,w:r.width,h:r.height,fs:s.fontSize,labelFs:ls.fontSize,labelH:lr.height,fw:s.fontWeight,labelFw:ls.fontWeight,radius:s.borderRadius,align:s.textAlign,ellipsis:ls.textOverflow,sw:b.scrollWidth,cw:b.clientWidth,sh:b.scrollHeight,ch:b.clientHeight,parentW:parent.getBoundingClientRect().width};});});
 if(!baseline){for(const b of buttons){if(b.cmd)assert(b.main,screen+' unclassified game command: '+b.cmd);if(!b.main)continue;assert.equal(b.h,52,screen+' button height: '+JSON.stringify(b));assert.equal(b.fs,'15px');assert.equal(b.labelFs,'15px');assert.equal(b.fw,'600');assert.equal(b.labelFw,'600');assert.equal(b.radius,'10px');assert.equal(b.align,'center');assert.notEqual(b.ellipsis,'ellipsis');assert(b.w>=44);assert(Math.abs(b.w-b.parentW)<=1,screen+' full-width action');assert(b.sw<=b.cw+1&&b.sh<=b.ch+1&&b.labelH<=38,screen+' clipped button: '+JSON.stringify(b));}
 const rows=new Map();for(const b of buttons.filter(b=>b.main)){const row=b.group+':'+Math.round(b.y*10)/10;rows.set(row,[...(rows.get(row)||[]),b]);}for(const row of rows.values()){row.sort((a,b)=>a.x-b.x);for(let i=1;i<row.length;i++){assert(Math.abs(row[i].w-row[0].w)<1,screen+' equal row widths');assert(Math.abs(row[i].x-row[i-1].x-row[i-1].w-8)<1,screen+' 8px horizontal gap');}}
 const gaps=await page.locator(target+' .actions:visible,'+target+' .campnav:visible').evaluateAll(xs=>xs.map(x=>({gap:getComputedStyle(x).gap})));for(const g of gaps)assert.equal(g.gap,'8px',screen+' grid gap');}
 assert.deepEqual(errors,[],screen+' console/runtime errors');
 if(shots&&screenshot&&theme==='dark'&&engine==='chromium'){const dir=path.join(out,'screenshots');fs.mkdirSync(dir,{recursive:true});if(target==='#bf-play')await page.evaluate(()=>{const e=document.querySelector('#bf-play');scrollTo(0,e.getBoundingClientRect().top+scrollY-8);});else await page.locator('#bf-panel').evaluate(e=>e.scrollTop=0);await page.screenshot({path:path.join(dir,`${baseline?'before':'after'}-${width}-${screen}.jpg`),type:'jpeg',quality:78,fullPage:false});}
 checks.push({width,theme,screen,...(screen.startsWith('skill-')||screen.startsWith('event-')?{mainButtons:buttons.filter(x=>x.main).length,height:52,labelFont:15,unclipped:true}:{buttons}),errors:errors.length});
}
await page.goto(base);await inspect('start');await tap(page.locator('[data-cmd="start"][data-arg="warrior"]'));await inspect('camp',false);
const chapter=fresh();chapter.enterArea(0);await restore(chapter);await inspect('exploration');
const battle=fxFixtures.battle();await restore(battle);await inspect('battle');
const loot=Game.load(fxFixtures.rarePurchase(4).code);loot.buy('gear-weapon');await restore(loot);await inspect('reward');
await restore(camp);for(const screen of ['equipment','jobs','workshop','bag','quests','story']){await tap(page.locator(`[data-ui="${screen}"]`).first());await inspect(screen,['equipment','jobs','workshop'].includes(screen));await close();}
const shop=fresh();shop.s.scene='merchant';await restore(shop);await inspect('shop',false);
const final=fresh();final.s.scene='final';final.s.mercy=5;await restore(final);await inspect('final',false);final.finish(2);await restore(final);await inspect('ending',false);
if(!baseline&&phase>=6){
 const restoreGeometry=async g=>{await page.evaluate(({key,code})=>localStorage.setItem(key,code),{key,code:g.export()});await page.reload();assert.equal((await current()).export(),g.export());};
 if(theme==='dark'){
 for(const id of Object.keys(JOBS)){const g=fxFixtures.battle(17,id);await restoreGeometry(g);await inspect('skill-'+id,false);}
 for(const ev of EVENTS){const g=fresh();g.s.scene='event';g.s.eventId=ev.id;await restoreGeometry(g);await inspect('event-'+ev.id,false);}
 }
 await restore(battle);battle.act('skill');await tap(page.locator('[data-cmd="act"][data-arg="skill"]'));assert.equal((await current()).export(),battle.export(),'skill click preserves RNG/save');
 const code=battle.export();await page.reload();assert.equal((await current()).export(),code,'reload preserves save');
 await inspect('restored-battle',false);
 const potion=fxFixtures.entries().potion;const healed=Game.load(potion.code);await restore(healed);healed.act(potion.action);await tap(page.locator('[data-cmd="act"][data-arg="potion"]'));assert.equal((await current()).export(),healed.export());await page.waitForTimeout(120);
 const rail=page.locator('[data-fx-layer="player"]');assert(await rail.count(),'compact HP feedback exists');assert(await rail.evaluate(e=>e.classList.contains('fx-compact')),'short HP anchor uses existing viewport rail');
 for(const token of await rail.locator('.fx-token').all()){const rect=await token.boundingBox();assert(rect.x>=0&&rect.x+rect.width<=width+1&&rect.y>=0&&rect.y+rect.height<=page.viewportSize().height+1,'HP effect remains inside viewport');}
 await page.waitForTimeout(720);assert.equal(await page.locator('[data-fx-layer]').count(),0,'FX layer cleaned');assert.deepEqual(errors,[]);
}
console.log(`PASS B UI ${engine} ${width} ${theme} phase ${phase}${baseline?' baseline':''}`);await context.close();}
}finally{await browser.close();}
fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,`${baseline?'baseline':'ui'}-${engine}.json`),JSON.stringify({status:'PASS',engine,base,baseline,phase,checks,method:'Identical focused saves imported through the real save dialog. Archive camp is a real P2 campaign save; combat/ending fixtures are focused synthetic states. Not an uninterrupted campaign or physical-device test.'},null,2)+'\n');
})().catch(e=>{console.error(e);process.exit(1);});
