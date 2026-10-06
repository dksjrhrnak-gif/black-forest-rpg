const fs=require('node:fs'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {numericalCases}=require('./script-cases.cjs'),baseline=require('./fixtures/part-c-numeric-baseline.json');
const cases=numericalCases();assert.equal(cases.length,baseline.caseCount);
for(let i=0;i<cases.length;i++){const r=cases[i],expected=baseline.cases[i];assert.equal(r.key,expected.key);const sha=crypto.createHash('sha256').update(JSON.stringify(r)).digest('hex');assert.equal(sha,expected.sha256,'Copy-only numeric/branch/RNG regression: '+r.key);}
const result={status:'PASS',baseline:baseline.baseline,caseCount:cases.length,scope:'72 chapter results, 24 thread results, 18 quest outcomes/defer, 36 event choices, 3 endings and 3 postgames. Entire state and RNG checked, excluding message/log/ending title and decision text (decision keys retained).'};
fs.writeFileSync('docs/part-c-numeric-results.json',JSON.stringify(result,null,2)+'\n');console.log('PASS copy-only numerical/branch/RNG regression: '+cases.length+' cases');
