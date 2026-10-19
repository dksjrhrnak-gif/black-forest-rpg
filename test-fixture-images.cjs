/* Isolated regression checks for the fixture reload image guard, using original assets. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const pw = require('playwright');
const prepareFixtureImages = require('./qa-fixture-images.cjs');
const engine = process.env.BF_BROWSER || 'chromium';
const base = process.env.BF_QA_URL || 'http://127.0.0.1:4201/';
const out = process.env.BF_FIXTURE_IMAGES_OUT || '/tmp/fixture-image-readiness';
const deadlineMs = 5000;
const asset = name => new URL('assets/' + name, base).href;
const safeURL = value => {const url = new URL(value);return url.origin + url.pathname;};
const diagnosticText = value => String(value).replace(/https?:\/\/[^\s"'<>]+/g, value => {
  try {return safeURL(value);} catch {return '[invalid URL]';}
});
const htmlAttribute = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const report = {status:'FAIL',engine,base:safeURL(base),deadlineMs,cases:[]};

async function boundedGuard(page) {
  let timer;
  try {
    return await Promise.race([
      prepareFixtureImages(page),
      new Promise((_, reject) => {timer = setTimeout(() => reject(new Error(`fixture image guard exceeded ${deadlineMs}ms safety deadline`)), deadlineMs);})
    ]);
  } finally {clearTimeout(timer);}
}

async function imageState(page, id) {
  return page.locator('#' + id).evaluate(img => ({
    currentSrc:img.currentSrc ? new URL(img.currentSrc).origin + new URL(img.currentSrc).pathname : '',
    complete:img.complete,width:img.naturalWidth,height:img.naturalHeight,
    loading:img.loading,top:img.getBoundingClientRect().top
  }));
}

function observeErrors(page) {
  const errors = {pageErrors:[],consoleErrors:[],consoleDiagnostics:[]};
  page.on('pageerror', error => errors.pageErrors.push(diagnosticText(error.message)));
  page.on('console', message => {if (message.type() === 'error') {
    errors.consoleErrors.push(diagnosticText(message.text()));
    const location = message.location();
    errors.consoleDiagnostics.push({text:diagnosticText(message.text()),url:location.url ? safeURL(location.url) : ''});
  }});
  return errors;
}

async function validAndDormant(browser) {
  const context = await browser.newContext({viewport:{width:800,height:600}});
  try {
    const page = await context.newPage(), errors = observeErrors(page), requests = [];
    await assert.rejects(() => prepareFixtureImages(page), /prepareFixtureImages\.watch\(page\)/, 'a missing observer must fail instead of silently falling back');
    prepareFixtureImages.watch(page);
    const warrior = asset('class_warrior.webp'), rogue = asset('class_rogue.webp'), lazy = asset('class_stitch.webp');
    page.on('request', request => {if (request.resourceType() === 'image') requests.push(safeURL(request.url()));});
    await page.setContent(`<!doctype html><html><body style="margin:0">
      <img id="warrior" src="${htmlAttribute(warrior)}" loading="eager" width="128" height="128" alt="warrior">
      <img id="rogue" src="${htmlAttribute(rogue)}" loading="eager" width="128" height="128" style="position:absolute;top:90000px;left:0" alt="rogue">
      <img id="lazy" src="${htmlAttribute(lazy)}" loading="lazy" width="128" height="128" style="position:absolute;top:100000px;left:0" alt="dormant lazy image">
    </body></html>`, {waitUntil:'domcontentloaded'});
    await page.waitForFunction(() => ['warrior','rogue'].every(id => {
      const img = document.getElementById(id);return img.complete && img.naturalWidth > 0 && img.naturalHeight > 0;
    }), null, {timeout:15000});
    const before = await imageState(page, 'lazy');
    assert.equal(before.complete, false, 'lazy fixture must be dormant before the guard');
    assert.equal(before.width, 0);assert.equal(before.height, 0);
    assert.equal(before.top, 100000);
    assert.equal(requests.includes(safeURL(lazy)), false, 'offscreen lazy asset must not be requested before the guard');
    const started = Date.now(), images = await boundedGuard(page), elapsedMs = Date.now() - started;
    const after = await imageState(page, 'lazy');
    assert.equal(images.length, 2, 'only the two started eager raster images participate');
    assert.deepEqual(images.map(img => img.src).sort(), [safeURL(warrior),safeURL(rogue)].sort());
    for (const img of images) assert(img.complete && img.width > 0 && img.height > 0, 'started raster images must decode');
    assert.equal(after.complete, false, 'guard must leave dormant lazy image unstarted');
    assert.equal(after.width, 0);assert.equal(after.height, 0);
    assert.equal(requests.includes(safeURL(lazy)), false, 'guard must not fetch the offscreen lazy asset');
    assert(requests.includes(safeURL(warrior)) && requests.includes(safeURL(rogue)), 'both original eager assets must actually be fetched');
    assert.deepEqual(errors.pageErrors, []);assert.deepEqual(errors.consoleErrors, []);
    report.cases.push({name:'started eager raster images decode; dormant lazy raster stays unrequested',status:'PASS',requiresExplicitWatch:true,elapsedMs,images,lazyBefore:before,lazyAfter:after,imageRequests:requests,...errors});
  } finally {await context.close();}
}

async function pendingAfterPreviousIdle(browser) {
  const context = await browser.newContext({viewport:{width:800,height:600}});
  let release;
  try {
    const page = await context.newPage(), errors = observeErrors(page);
    prepareFixtureImages.watch(page);
    await page.setContent('<!doctype html><html><body style="margin:0"></body></html>', {waitUntil:'load'});
    await page.waitForLoadState('networkidle');
    const original = asset('class_windmill.webp');
    const gate = new Promise(resolve => {release = resolve;});
    let requested, fixtureRequests = 0, originalBytes = 0;
    const ready = new Promise(resolve => {requested = resolve;});
    await page.route(original, async route => {
      fixtureRequests++;
      const response = await route.fetch();
      assert.equal(response.status(), 200, 'the delayed request must fetch the original asset');
      const body = await response.body();
      assert(body.equals(fs.readFileSync(path.join(__dirname, 'assets/class_windmill.webp'))), 'the held response must contain exact original bytes');
      originalBytes = body.length;
      requested();
      await gate;
      await route.fulfill({response});
    });
    await page.evaluate(src => {
      const img = document.createElement('img');
      img.id = 'pending';img.loading = 'eager';img.width = 128;img.height = 128;
      img.style.cssText = 'position:absolute;top:90000px;left:0';
      document.body.append(img);img.src = src;
    }, original);
    await ready;
    const before = await imageState(page, 'pending');
    assert.equal(before.complete, false);assert.equal(before.width, 0);assert.equal(before.height, 0);
    assert.equal(before.top, 90000, 'the already-started eager request must be outside the viewport');
    let outcome;
    const started = Date.now();
    const pending = boundedGuard(page).then(images => {outcome = {images};}, error => {outcome = {error};});
    await new Promise(resolve => setTimeout(resolve, 700));
    const heldForMs = Date.now() - started, settledWhileHeld = outcome !== undefined;
    assert(heldForMs >= 650, 'the image response must remain held beyond the fresh quiet interval');
    release();
    await pending;
    assert.equal(settledWhileHeld, false, 'the guard must not finish while an actual image request is still held after a previous networkidle');
    if (outcome.error) throw outcome.error;
    const after = await imageState(page, 'pending');
    assert.equal(fixtureRequests, 1);
    assert.equal(outcome.images.length, 1);
    assert.equal(outcome.images[0].src, safeURL(original));
    assert(after.complete && after.width > 0 && after.height > 0, 'the original response must decode after release');
    assert.deepEqual(errors.pageErrors, []);assert.deepEqual(errors.consoleErrors, []);
    report.cases.push({name:'a new offscreen eager request after prior networkidle remains guarded until released and decoded',status:'PASS',heldForMs,elapsedMs:Date.now()-started,settledWhileHeld,fixtureRequests,exactOriginalBytes:true,originalBytes,images:outcome.images,before,after,...errors});
  } finally {release?.();await context.close();}
}

async function brokenDecode(browser) {
  const context = await browser.newContext();
  try {
    const page = await context.newPage(), errors = observeErrors(page);
    prepareFixtureImages.watch(page);
    const broken = new URL('__qa/broken.webp', base).href;
    let fixtureRequests = 0;
    await page.route(broken, route => {
      fixtureRequests++;
      return route.fulfill({status:200,contentType:'image/webp',body:'intentional invalid WebP fixture'});
    });
    await page.setContent(`<!doctype html><img id="broken" src="${htmlAttribute(broken)}" loading="eager" alt="intentional invalid WebP">`, {waitUntil:'domcontentloaded'});
    await page.waitForFunction(() => {const img = document.getElementById('broken');return img.complete && img.naturalWidth === 0;}, null, {timeout:15000});
    const before = await imageState(page, 'broken');
    assert.equal(fixtureRequests, 1, 'the invalid image must come only from this isolated route');
    assert(before.currentSrc);assert.equal(before.complete, true);assert.equal(before.width, 0);assert.equal(before.height, 0);
    const nativeFailure = await page.locator('#broken').evaluate(async img => {
      try {await img.decode();return null;} catch (error) {return {name:error.name,message:error.message};}
    });
    assert(nativeFailure, 'the browser itself must reject decoding the broken image');
    assert.equal(nativeFailure.name, 'EncodingError', 'the native rejection must be an image decoding error');
    assert(nativeFailure.message, 'record the actual browser decoding error text');
    let expectedDecodeFailure;
    const started = Date.now();
    await assert.rejects(() => boundedGuard(page), error => {
      expectedDecodeFailure = diagnosticText(error.message);
      assert(expectedDecodeFailure.includes(nativeFailure.message), 'the fixture guard must propagate the actual native image decoding error: ' + JSON.stringify({nativeFailure,expectedDecodeFailure}));
      assert.doesNotMatch(expectedDecodeFailure, /safety deadline/, 'a timeout is not the expected decode rejection');
      return true;
    });
    assert.deepEqual(errors.pageErrors, [], 'the isolated broken image must not cause an unhandled page error');
    assert(errors.consoleDiagnostics.every(message => (message.url === safeURL(broken) || message.text.includes(safeURL(broken))) && /Image corrupt or truncated\./.test(message.text)), 'only decoder messages from the isolated broken image are expected: ' + JSON.stringify(errors.consoleDiagnostics));
    report.cases.push({name:'complete broken raster rejects instead of being skipped',status:'PASS',elapsedMs:Date.now()-started,image:before,fixtureRequests,nativeFailure,expectedDecodeFailure,...errors});
  } finally {await context.close();}
}

(async () => {
  const browser = await pw[engine].launch(require('./qa-browser.cjs')());
  try {
    await validAndDormant(browser);
    await pendingAfterPreviousIdle(browser);
    await brokenDecode(browser);
    report.status = 'PASS';
  } finally {await browser.close();}
  fs.mkdirSync(out, {recursive:true});
  fs.writeFileSync(path.join(out, engine + '.json'), JSON.stringify(report,null,2) + '\n');
  console.log(`PASS fixture image readiness ${engine}: ${report.cases.length} isolated cases (two eager rasters decoded, dormant lazy unfetched, active image awaited after prior idle, broken raster rejected)`);
})().catch(error => {
  report.error = diagnosticText(error.stack || error);
  fs.mkdirSync(out, {recursive:true});
  fs.writeFileSync(path.join(out, engine + '.json'), JSON.stringify(report,null,2) + '\n');
  console.error(report.error);
  if (process.env.GITHUB_ACTIONS === 'true') console.error('::error::' + report.error.replace(/%/g,'%25').replace(/\r/g,'%0D').replace(/\n/g,'%0A'));
  process.exitCode = 1;
});
