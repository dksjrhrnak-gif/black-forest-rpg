/* Finish and verify started raster image decodes before an artificial fixture reload.
 * A selected currentSrc alone does not mean a lazy request has started.
 * Broken complete images remain eligible and fail decode; dormant lazy images
 * stay unloaded. Real controls and immediate FX checks remain outside this wait. */
const assert=require('node:assert/strict');

module.exports=async function prepareFixtureImages(page){
 await page.waitForLoadState('networkidle');
 const images=await page.evaluate(async()=>Promise.all([...document.images].filter(img=>img.currentSrc&&!/\.svg$/i.test(new URL(img.currentSrc).pathname)&&(img.complete||img.naturalWidth>0||img.naturalHeight>0)).map(async img=>{
  const src=new URL(img.currentSrc);let timer;try{await Promise.race([img.decode(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Fixture image decode timeout '+JSON.stringify({src:src.origin+src.pathname,complete:img.complete,width:img.naturalWidth,height:img.naturalHeight,loading:img.loading,rect:img.getBoundingClientRect().toJSON()}))),30000);})]);}finally{clearTimeout(timer);}
  return {src:src.origin+src.pathname,complete:img.complete,width:img.naturalWidth,height:img.naturalHeight};
 })));
 assert(images.every(img=>img.complete&&img.width>0&&img.height>0),'started raster images must decode before a fixture reload');
 return images;
};
