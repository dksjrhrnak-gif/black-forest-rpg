const assert=require('node:assert/strict'),{Game,JOBS}=require('./test-support.cjs');
const {connections}=require('./docs/handoff-image-connections.json');
async function verifyHandoffArt({page,activate,restore}){
 const g=new Game(77);g.start('warrior');g.s.unlocked=Object.keys(JOBS).filter(id=>JOBS[id].hidden);
 await restore(g.export());await activate(page.locator('[data-ui="jobs"]').first());
 await page.locator('[data-filter="jobs:family"]').selectOption('');
 for(const row of connections){
  await page.locator('[data-filter="jobs:query"]').fill(JOBS[row.id].name);
  const im=page.locator('#bf-job-list .class-art img');assert.equal(await im.count(),1,row.id+' dedicated portrait');
  await im.scrollIntoViewIfNeeded();await im.evaluate(el=>el.decode());
  assert.equal(await im.getAttribute('src'),row.asset);
  const size=await im.evaluate(el=>({width:el.naturalWidth,height:el.naturalHeight,fit:getComputedStyle(el).objectFit}));
  assert.equal(size.width,640);assert.equal(size.height,960);assert.equal(size.fit,'contain');
 }
 await activate(page.locator('#bf-panel [data-ui="close"]'));
 console.log('PASS all '+connections.length+' handoff portraits decode through actual job browser');
}
module.exports={verifyHandoffArt};
