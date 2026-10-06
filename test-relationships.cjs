const assert=require('node:assert/strict');
const {Game,COMPANIONS}=require('./test-support.cjs');
function fresh(){const g=new Game(42);g.start(g.s.offers[0]);g.s.cleared=[0];return g}
function raw(g){return {format:'black-forest-v2',state:JSON.parse(JSON.stringify(g.s)),rng:g.rng.getState()}}
// Real old saves acquire neutral relationships; already completed story is retained.
let g=fresh(),data=raw(g);data.state.threads.alice=2;data.state.factions.lantern=9;data.state.hp+=12;
for(const k of ['relationshipVersion','affection','bondQuests','bondOutcome','bondGifts'])delete data.state[k];
let loaded=Game.load(JSON.stringify(data));assert.equal(loaded.s.threads.alice,2);assert.equal(loaded.s.affection.alice,30);assert.equal(loaded.s.hp,loaded.maxHp());
for(const value of [-1,101,NaN,'80']){data=raw(g);data.state.affection.alice=value;assert.throws(()=>Game.load(JSON.stringify(data)))}
// Locked cooperative choice cannot spend turns or award rewards.
g.thread('alice');let before=g.export();g.dialogue(3);if(g.s.returnAfterResult)g.advance();assert.equal(g.export(),before);g.dialogue(0);if(g.s.returnAfterResult)g.advance();assert.equal(g.s.affection.alice,50);
g.thread('alice');g.dialogue(3);if(g.s.returnAfterResult)g.advance();assert.equal(g.s.affection.alice,70);assert.equal(g.s.threads.alice,2);
before=g.export();g.bondQuest('alice');assert.equal(g.export(),before);g.s.cleared=[0,1];g.bondQuest('alice');assert.equal(g.s.scene,'bond');assert.equal(Game.load(g.export()).export(),g.export());
before=g.export();g.s.gold=0;const noMoney=g.export();g.bondChoice(0);if(g.s.returnAfterResult)g.advance();assert.equal(g.export(),noMoney);g.bondChoice(2);assert.equal(g.s.scene,'camp');g.s.gold=100;
// Every companion has reachable positive and negative quest routes, no repeat farming.
for(const id of Object.keys(COMPANIONS)){
 g=fresh();g.s.gold=500;g.s.herb=20;g.s.ore=20;g.s.wood=20;g.s.cleared=[0,1,2,3];g.s.threads[id]=2;g.addAffinity(id,60-g.getAffinity(id));
 g.bondQuest(id);g.bondChoice(0);if(g.s.returnAfterResult)g.advance();assert.equal(g.s.bondQuests[id],1);g.bondQuest(id);g.bondChoice(0);if(g.s.returnAfterResult)g.advance();assert.equal(g.s.bondQuests[id],2);assert.equal(g.s.affection[id],80);assert(g.allies().includes(id));
 const baseline=fresh();baseline.s.area=g.s.area=3;baseline.fight(true);g.fight(true);
 if(id==='alice')assert.equal(g.s.enemy.def,baseline.s.enemy.def-2);
 if(id==='adam')assert.equal(g.s.enemy.atk,baseline.s.enemy.atk-2);
 if(id==='ahab')assert.equal(g.s.enemy.hp,baseline.s.enemy.hp-Math.ceil(baseline.s.enemy.hp*.1));
 Game.load(g.export());g.s.scene='camp';g.s.enemy=null;before=g.export();g.bondQuest(id);assert.equal(g.export(),before);
 g.s.scene='final';g.finish(0);assert(g.s.message.includes(COMPANIONS[id].epilogue));before=g.export();g.finish(0);assert.equal(g.export(),before);
 g=fresh();g.s.cleared=[0,1];g.s.threads[id]=2;g.addAffinity(id,60-g.getAffinity(id));g.bondQuest(id);g.bondChoice(1);if(g.s.returnAfterResult)g.advance();assert.equal(g.s.bondOutcome[id],'broken');assert.equal(g.s.affection[id],35);assert(!g.allies().length);Game.load(g.export());
}
g=fresh();g.gift('alice');before=g.export();g.gift('alice');assert.equal(g.export(),before);g.s.cleared=[0,1];g.s.gold=50;g.gift('alice');assert.equal(g.s.affection.alice,60);Game.load(g.export());
const next=g.newJourney();assert.equal(next.s.affection.alice,30);assert.equal(next.s.bondQuests.alice,0);
g=fresh();g.s.weapon.affixes=[{id:'critical',value:8},{id:'leech',value:5},{id:'thorns',value:2}];const st=g.combatStatus();assert.equal(st.crit,g.crit());assert.equal(st.leech,.05);assert.equal(st.reflect,2);
console.log('PASS: old-save migration, locked branches, 3 companion quests × positive/negative outcomes, one-time rewards, boss support, epilogues, bounded gifts, new journey reset, combat stats.');
