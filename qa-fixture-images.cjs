/* Read-only image lifecycle tracking for artificial fixture reloads.
 * Attach watch(page) immediately after newPage(), before navigation/content.
 * Real controls and their immediate FX assertions never wait on this helper. */
const assert = require('node:assert/strict');
const observers = new WeakMap();
const timeoutMs = 30000, quietMs = 500;

function watch(page) {
 if (observers.has(page)) return;
 const state = {active:new Set(), lastActivity:Date.now()};
 const activity = request => {
  if (request.resourceType() !== 'image') return;
  state.active.delete(request);
  state.lastActivity = Date.now();
 };
 page.on('request', request => {
  if (request.resourceType() !== 'image') return;
  state.active.add(request);
  state.lastActivity = Date.now();
 });
 page.on('requestfinished', activity);
 page.on('requestfailed', activity);
 observers.set(page, state);
}

function remaining(deadline) {
 const ms = deadline - Date.now();
 if (ms <= 0) throw new Error('Fixture image readiness exceeded its 30000ms deadline');
 return ms;
}

async function withinDeadline(promise, deadline) {
 let timer;
 try {
  return await Promise.race([
   promise,
   new Promise((_, reject) => {timer = setTimeout(() => reject(new Error('Fixture image readiness exceeded its 30000ms deadline')), remaining(deadline));})
  ]);
 } finally {clearTimeout(timer);}
}

async function waitForImageQuiet(state, notBefore, deadline) {
 for (;;) {
  remaining(deadline);
  const quietFor = Date.now() - Math.max(notBefore, state.lastActivity);
  if (state.active.size === 0 && quietFor >= quietMs) return;
  await new Promise(resolve => setTimeout(resolve, Math.min(25, remaining(deadline))));
 }
}

async function prepareFixtureImages(page) {
 const state = observers.get(page);
 assert(state, 'Call prepareFixtureImages.watch(page) immediately after newPage(), before navigation or content');
 const deadline = Date.now() + timeoutMs;
 await page.waitForLoadState('networkidle', {timeout:remaining(deadline)});
 // Give newly rendered lazy images a layout opportunity before measuring a new
 // quiet interval; a previous document networkidle event alone is insufficient.
 await withinDeadline(page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))), deadline);
 const notBefore = Date.now();
 await waitForImageQuiet(state, notBefore, deadline);
 const images = await withinDeadline(page.evaluate(async () => Promise.all([...document.images].filter(img => {
  if (!img.currentSrc || /\.svg$/i.test(new URL(img.currentSrc).pathname)) return false;
  const rect = img.getBoundingClientRect();
  const visible = rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.right > 0 && rect.top < innerHeight && rect.left < innerWidth;
  return img.complete || img.naturalWidth > 0 || img.naturalHeight > 0 || visible;
 }).map(async img => {
  const src = new URL(img.currentSrc);
  await img.decode();
  return {src:src.origin + src.pathname, complete:img.complete, width:img.naturalWidth, height:img.naturalHeight};
 }))), deadline);
 // Decode/layout may itself start another eligible image request. Never discard
 // the document while such a tracked request remains active.
 await waitForImageQuiet(state, notBefore, deadline);
 assert(images.every(img => img.complete && img.width > 0 && img.height > 0), 'started raster images must decode before a fixture reload');
 return images;
}

prepareFixtureImages.watch = watch;
module.exports = prepareFixtureImages;
