/* Entries are reached by real commands, then imported through the normal UI. */
const {Game,P2_EVENTS}=require('./test-support.cjs');
function entries(seed=17){const found={},trace=[];let g=new Game(seed);g.start('warrior');
for(let n=0;n<4000&&Object.keys(found).length<3;n++){const s=g.s;
 if(s.scene==='reward'&&s.step===9&&P2_EVENTS.some(e=>e.region===s.area)&&!found[s.area]){const h=Game.load(g.export());h.advance();if(h.s.scene==='map'&&h.s.routes[0]==='event'){found[s.area]={code:h.export(),commands:n,seed,method:'Actual warrior campaign; commands only; import before regional event, no grants.'};}}
 trace.push(s.scene);
 if(s.scene==='camp'){g.rest();for(const q of g.quests())g.claim(q.id);while(s.herb>=3)g.craft();while(s.potions<5&&s.gold>=16)g.buy('potion');g.upgrade('weapon');g.upgrade('armor');g.campUp();if(s.cleared.length>=1)for(const id of ['alice','adam','ahab']){let j=0;while(s.threads[id]<2&&j++<3){g.thread(id);g.dialogue(0);if(g.s.returnAfterResult)g.nextEncounter();}}const next=g.careerCandidates().find(x=>x.available);if(next)g.changeJob(next.id);if(s.checkpoint)g.resumeJourney();else g.enterArea(Math.min(7,s.cleared.length));}
 else if(s.scene==='chapter')g.chapterChoice(0);else if(s.scene==='npc')g.npcChoice(g.getAffinity(s.thread)>=40?3:0);else if(s.scene==='midboss')g.faceMidboss();else if(s.scene==='map')g.choose(0);
 else if(s.scene==='battle')g.act(s.hp<g.maxHp()&&s.hp<Math.max(g.damagePreview()+8,g.maxHp()*.27)&&s.potions?'potion':s.enemy.intent==='heavy'&&g.damagePreview()>0?'defend':s.mp>=g.skillCost()?'skill':'attack');
 else if(s.scene==='loot'){const d=g.compareGear(s.loot);g.takeLoot(d.ATK+d.DEF+d.HP*.1+d.CRIT*.2>0?'equip':'sell');}
 else if(s.scene==='event')g.event(g.eventChoices().findIndex(c=>g.canPay(c.cost)));else if(['reward','merchant'].includes(s.scene))g.nextEncounter();else if(s.scene==='dead')g.revive();else throw Error('Entry path halted '+s.scene);
}if(Object.keys(found).length!==3)throw Error('All three regional entries must be reached');return found;}
module.exports={entries};
