/* Paired real-command campaigns. Policies are scripted preferences, not human demand. */
const fs=require('node:fs'),assert=require('node:assert/strict'),{world,baseline,plain}=require('./p3-test-support.cjs');
const stages=['early','middle','late'],styles=['conservative','aggressive','collector'],seeds=[2,17,91,777];
function stage(a){return a<2?'early':a<5?'middle':'late';}
function score(g,d,style){const x=g.compareGear(d);return x.ATK*(style==='aggressive'?1.6:1)+x.DEF*(style==='conservative'?1.4:1)+x.HP*.12+x.MP*.5+x.CRIT*.3+x.DODGE*.45+x.LEECH*.4+x.LUCK*.05;}
function campaign(w,starter,seed,style,capture=false,observe=null){const G=w.BlackForest.Game;let g=new G(seed);g.start(starter);let actions=0,restores=0,revivals=0,battles=0,wins=0,hpTotal=0,potionsUsed=0,equips=0,upgrades=0,crafts=0,tunes=0,drops=0,sales=0,buys=0;const regional={},crafted=new Set(),tuned=new Set(),records=[],saves=[];const ledger=Object.fromEntries(stages.map(k=>[k,{income:0,spend:0,incomeBy:{},spendBy:{},balances:[]}]));
 const cmd=(name,arg)=>{const s=g.s,phase=stage(s.area),row=ledger[phase],oldGold=s.gold,r=plain(s.rewardState),oldLoot=plain(s.loot),price=oldLoot?g.price(oldLoot):0,oldScene=s.scene,oldHp=s.hp,oldJob=s.job,oldGear=JSON.stringify(g.equipment()),oldP=s.potions,oldPlus=g.equipment().reduce((n,d)=>n+d.plus,0);
  g[name](arg);actions++;if(observe)observe(g,name,arg,actions);let net=s.gold-oldGold,credit=0;const add=(kind,n,spend=false)=>{if(!n)return;const side=spend?'spendBy':'incomeBy';row[spend?'spend':'income']+=n;row[side][kind]=(row[side][kind]||0)+n;credit+=spend?-n:n;};
  if(r&&!r.claimed&&s.rewardState?.claimed)add('combat',r.rewards.gold);
  if(oldScene==='loot'&&['takeLoot','collectLoot'].includes(name)&&arg==='sell'&&s.scene!=='loot'){add('equipmentSale',price);sales++;}
  if(name==='sellBag'&&net>0){add('equipmentSale',net);sales++;}
  const remainder=net-credit;if(remainder>0)add(({claim:'quest',event:'event',dialogue:'relationship',npcChoice:'relationship',bondChoice:'relationship'}[name]||'exploration'),remainder);else if(remainder<0)add(({buy:'shop:'+arg,upgrade:'upgrade',craftGear:'equipmentCraft',tuneGear:'tuning',campUp:'camp',gift:'relationship',bondChoice:'relationship',event:'eventRisk',revive:'revival'}[name]||name),-remainder,true);
  assert.equal(row.income-row.spend,Object.values(row.incomeBy).reduce((a,b)=>a+b,0)-Object.values(row.spendBy).reduce((a,b)=>a+b,0));row.balances.push(s.gold);
  if(name==='act'&&oldScene==='battle'){if(arg==='potion'&&s.potions<oldP)potionsUsed++;if(s.scene!=='battle'){battles++;wins+=+(s.scene!=='dead');hpTotal+=s.hp/g.maxHp();}}
  if(name==='upgrade'&&g.equipment().reduce((n,d)=>n+d.plus,0)!==oldPlus||name==='upgrade'&&net<0)upgrades++;
  if(name==='craftGear'&&s.scene==='loot'&&oldScene==='camp')crafts++;if(name==='tuneGear'&&net<0)tunes++;if(name==='buy'&&net<0)buys++;
  if(oldScene==='loot'&&s.scene!=='loot')drops++;if(name==='equipBag'||oldScene==='loot'&&arg==='equip'){if(JSON.stringify(g.equipment())!==oldGear)equips++;}
  assert(Number.isSafeInteger(s.gold)&&s.gold>=0&&s.hp>=0&&s.mp>=0,'safe wallet/resources');
  if(actions%10===0){const code=g.export(),restored=G.load(code);assert.equal(restored.export(),code);Object.assign(g.s,restored.s);g.rng=restored.rng;assert.equal(g.export(),code);restores++;}
 };
 let managed=-1;
 while(g.s.scene!=='ending'&&actions<6000){let s=g.s;
  if(s.scene==='camp'){
   cmd('rest');for(const q of g.quests())if(!s.claims.includes(q.id)&&q.now>=q.max)cmd('claim',q.id);
   if(managed!==s.cleared.length){managed=s.cleared.length;cmd('campUp');
    if(g.craftingRecipes&&s.cleared.length>=1){const list=g.craftingRecipes().filter(r=>r.available&&!crafted.has(r.id));const desired=style==='conservative'?list.filter(r=>r.gear.slot==='armor').slice(0,1):style==='aggressive'?list.filter(r=>r.gear.slot==='weapon').slice(0,1):list.slice(0,3);
     for(const r of desired){if(g.canPay(r.cost)&&s.gold-r.cost.gold>=(style==='conservative'?80:32)){crafted.add(r.id);cmd('craftGear',r.id);const useful=score(g,s.loot,style)>0;cmd('takeLoot',useful?'equip':'bag');}}
    }
    if(g.tuningOptions&&s.cleared.length>=5&&style!=='conservative')for(const slot of ['weapon','armor','charm']){const options=g.tuningOptions(slot),desired=style==='aggressive'?'attack':slot==='weapon'?'leech':'mana',o=options.find(x=>x.id===desired);if(o&&!tuned.has(slot)&&g.canPay(o.cost)&&s.gold-o.cost.gold>=100){cmd('tuneGear',o.key);tuned.add(slot);}}
    while(s.potions<(style==='conservative'?6:4)&&s.herb>=3)cmd('craft');while(s.potions<(style==='conservative'?6:4)&&s.gold>=16)cmd('buy','potion');
    for(const slot of style==='conservative'?['armor','weapon']:style==='aggressive'?['weapon','armor','charm']:['weapon']){const quote=g.upgradeCost?g.upgradeCost(slot):{gold:20*(s[slot].plus+1),ore:3*(s[slot].plus+1)};if(s[slot].plus<8&&g.canPay(quote)&&s.gold-quote.gold>=(style==='conservative'?80:16))cmd('upgrade',slot);}
    if(style==='collector'&&s.gold>=180){cmd('buy','gear-charm');if(s.scene==='loot')cmd('takeLoot',score(g,s.loot,style)>0?'equip':'bag');}
   }
   if(s.cleared.length>=1)for(const id of ['alice','adam','ahab']){let n=0;while(s.threads[id]<2&&n++<3){cmd('thread',id);cmd('dialogue',style==='aggressive'?2:0);if(g.s.returnAfterResult)cmd('nextEncounter');}}
   const next=g.careerCandidates().find(x=>x.available);if(next)cmd('changeJob',next.id);
   if(capture&&s.cleared.length===4&&!saves.length)saves.push({starter,seed,style,scene:'middle-camp',code:g.export()});
   if(s.checkpoint)cmd('resumeJourney');else cmd('enterArea',Math.min(7,s.cleared.length));
  }else if(s.scene==='map')cmd('choose',0);
  else if(s.scene==='chapter')cmd('chapterChoice',style==='aggressive'?2:style==='collector'?1:0);
  else if(s.scene==='npc')cmd('npcChoice',g.getAffinity(s.thread)>=40?3:0);
  else if(s.scene==='midboss')cmd('faceMidboss');
  else if(s.scene==='battle')cmd('act',s.hp<g.maxHp()&&s.hp<Math.max(g.damagePreview()+8,g.maxHp()*(style==='conservative'?.4:.27))&&s.potions?'potion':s.enemy.intent==='heavy'&&g.damagePreview()>0?'defend':s.mp>=g.skillCost()?'skill':'attack');
  else if(s.scene==='loot')cmd('takeLoot',score(g,s.loot,style)>0?'equip':style==='collector'?'bag':'sell');
  else if(s.scene==='event'){regional[s.eventId]=(regional[s.eventId]||0)+1;const options=g.eventChoices();let i=s.eventId>=18?{conservative:0,aggressive:1,collector:2}[style]:0;if(!g.canPay(options[i].cost))i=options.findIndex(c=>g.canPay(c.cost));cmd('event',i);}
  else if(['reward','merchant'].includes(s.scene)){
   if(s.scene==='merchant'&&style==='conservative'&&s.potions<3&&s.gold>=16)cmd('buy','potion');else if(s.scene==='merchant'&&style==='aggressive'&&s.gold>=180){cmd('buy','gear-weapon');if(g.s.scene==='loot')cmd('takeLoot',score(g,g.s.loot,style)>0?'equip':'sell');cmd('nextEncounter');}else cmd('nextEncounter');
  }else if(s.scene==='dead'){assert(++revivals<=8,'revival cap');cmd('revive');}
  else if(s.scene==='final')cmd('finish',style==='aggressive'?1:style==='collector'&&s.mercy>=5?2:0);else throw Error('Unhandled '+s.scene);
 }
 assert.equal(g.s.scene,'ending',starter+' '+seed+' '+style);for(const id of [18,19,20])assert.equal(regional[id],1);if(capture)saves.push({starter,seed,style,scene:'ending',code:g.export()});
 const income=Object.values(ledger).reduce((n,r)=>n+r.income,0),spend=Object.values(ledger).reduce((n,r)=>n+r.spend,0);assert.equal(g.s.gold,30+income-spend,'complete gold ledger');
 return {row:{starter,seed,style,actions,restores,revivals,ending:g.s.ending,battles,wins,meanHp:battles?hpTotal/battles:0,potionsUsed,equips,upgrades,crafts,tunes,drops,sales,buys,finalGold:g.s.gold,ledger,regional,finalJob:g.s.job,decisions:plain(g.s.decisions)},saves,game:g};
}
function stats(a){const sorted=a.slice().sort((a,b)=>a-b);return {mean:a.reduce((s,n)=>s+n,0)/a.length,median:sorted[Math.floor(sorted.length/2)],p10:sorted[Math.floor(sorted.length*.1)],p90:sorted[Math.floor(sorted.length*.9)],min:sorted[0],max:sorted.at(-1)};}
function cohort(w,capture=false){const rows=[],saves=[];for(const starter of w.BlackForest.STARTERS)for(const seed of seeds)for(const style of styles){const r=campaign(w,starter,seed,style,capture);rows.push(r.row);saves.push(...r.saves);}const summary=styles.map(style=>{const rs=rows.filter(r=>r.style===style);return {style,n:rs.length,endings:rs.filter(r=>r.ending).length,metrics:Object.fromEntries(['finalGold','actions','potionsUsed','equips','upgrades','crafts','tunes','drops','sales','buys','meanHp','revivals'].map(k=>[k,stats(rs.map(r=>r[k]))])),stages:Object.fromEntries(stages.map(k=>[k,{income:stats(rs.map(r=>r.ledger[k].income)),spend:stats(rs.map(r=>r.ledger[k].spend)),balance:stats(rs.flatMap(r=>r.ledger[k].balances)),incomeBy:rs.reduce((o,r)=>{for(const [a,n]of Object.entries(r.ledger[k].incomeBy))o[a]=(o[a]||0)+n;return o;},{}),spendBy:rs.reduce((o,r)=>{for(const [a,n]of Object.entries(r.ledger[k].spendBy))o[a]=(o[a]||0)+n;return o;},{})}]))};});return {status:'PASS',baseline,campaigns:rows.length,endings:rows.length,restores:rows.reduce((n,r)=>n+r.restores,0),seeds,styles,stages:{early:[0,1],middle:[2,3,4],late:[5,6,7]},method:'6 actual starters ×4 identical seeds ×3 scripted preferences. Commands only; no progress/resource grants. Same policy code with optional P3 abilities when present. Reconnect every10 commands; revivals permitted within8.',limitations:['Scripted purchase/craft policy measures rule behavior, not human willingness or fun.','Before/after actions can diverge because gear and optional P3 choices change fights.'],summary,rows,saves};}
if(require.main===module){const out=process.env.BF_P3_OUT||'docs/p3';fs.mkdirSync(out,{recursive:true});const before=cohort(world(true),true);fs.writeFileSync(out+'/economy-before.json',JSON.stringify({...before,saves:undefined},null,2)+'\n');if(process.argv.includes('--baseline-only')){fs.writeFileSync('fixtures/p3-pre-saves.json',JSON.stringify({baseline,method:before.method,saves:before.saves},null,2)+'\n');console.log(`PASS P3 baseline: ${before.endings}/${before.campaigns} endings, ${before.restores} restores, ${before.saves.length} archived P2-complete/mid-campaign saves`);}else{const after=cohort(world());fs.writeFileSync(out+'/economy-after.json',JSON.stringify({...after,saves:undefined},null,2)+'\n');const paired=before.rows.map((b,i)=>{const a=after.rows[i];assert.equal(b.starter+a.seed+a.style,a.starter+b.seed+b.style);return {starter:b.starter,seed:b.seed,style:b.style,before:b,after:a};});fs.writeFileSync(out+'/economy-comparison.json',JSON.stringify({status:'PASS',baseline,pairs:paired.length,campaigns:paired.length*2,beforeSummary:before.summary,afterSummary:after.summary,beforeRestores:before.restores,afterRestores:after.restores,paired},null,2)+'\n');console.log(`PASS P3 economy: ${before.campaigns} pairs / ${before.campaigns+after.campaigns} campaigns; endings ${before.endings}/${after.endings}; restores ${before.restores}/${after.restores}`);}}
module.exports={campaign,cohort,score,stats,seeds,styles};
