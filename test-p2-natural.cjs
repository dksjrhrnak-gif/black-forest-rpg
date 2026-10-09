/* All progression commands are real; no level, mastery, region or item grants. */
const fs=require('node:fs'),assert=require('node:assert/strict'),{Game,STARTERS,P2_EVENTS}=require('./test-support.cjs');
const out=process.env.BF_P2_OUT||'docs/p2';fs.mkdirSync(out,{recursive:true});const rows=[];
for(const starter of STARTERS)for(const seed of [2,17,91,123,777,2026])for(const policy of ['aid','risk','record']){
 let g=new Game(seed),steps=0,restores=0,revivals=0;g.start(starter);const events={},choices={},reactions=[],regions={},jobs=[starter];
 while(g.s.scene!=='ending'&&steps<6000){const s=g.s;regions[s.area]=(regions[s.area]||0)+1;const before=g.export();if(s.scene==='reward'&&g.p2Reaction()&&s.message.includes(g.p2Reaction()))reactions.push({area:s.area,step:s.step,text:g.p2Reaction()});
  if(s.scene==='camp'){g.rest();for(const q of g.quests())g.claim(q.id);while(s.herb>=3)g.craft();while(s.potions<5&&s.gold>=16)g.buy('potion');g.upgrade('weapon');g.upgrade('armor');g.campUp();
   if(s.cleared.length>=1)for(const id of ['alice','adam','ahab']){let n=0;while(s.threads[id]<2&&n++<3){g.thread(id);g.dialogue(0);if(g.s.returnAfterResult)g.nextEncounter();}}
   const next=g.careerCandidates().find(x=>x.available);if(next){g.changeJob(next.id);jobs.push(g.s.job);}if(s.checkpoint)g.resumeJourney();else g.enterArea(Math.min(7,s.cleared.length));
  }else if(s.scene==='map')g.choose(0);
  else if(s.scene==='chapter'){if(g.p2Reaction())reactions.push({area:s.area,step:s.step,text:g.p2Reaction()});g.chapterChoice(policy==='aid'?0:policy==='risk'?2:1);}
  else if(s.scene==='npc')g.npcChoice(g.getAffinity(s.thread)>=40?3:0);
  else if(s.scene==='midboss')g.faceMidboss();
  else if(s.scene==='battle'){let cmd=s.hp<g.maxHp()&&s.hp<Math.max(g.damagePreview()+8,g.maxHp()*.27)&&s.potions?'potion':s.enemy.intent==='heavy'&&g.damagePreview()>0?'defend':s.mp>=g.skillCost()?'skill':'attack';g.act(cmd);}
  else if(s.scene==='loot'){const d=g.compareGear(s.loot);g.takeLoot(d.ATK+d.DEF+d.HP*.1+d.CRIT*.2>0?'equip':'sell');}
  else if(s.scene==='event'){events[s.eventId]=(events[s.eventId]||0)+1;const cs=g.eventChoices();let i=s.eventId>=18?{aid:0,risk:1,record:2}[policy]:0;if(!g.canPay(cs[i].cost))i=cs.findIndex(c=>g.canPay(c.cost));assert(i>=0);choices[s.eventId+':'+i]=(choices[s.eventId+':'+i]||0)+1;g.event(i);}
  else if(['reward','merchant'].includes(s.scene))g.nextEncounter();
  else if(s.scene==='dead'){assert(++revivals<=6,'revival cap');g.revive();}
  else if(s.scene==='final')g.finish(0);else throw Error('Unhandled '+s.scene);
  assert.notEqual(g.export(),before,'no stalled command');assert(g.s.hp>=0&&g.s.mp>=0&&g.s.gold>=0);steps++;
  if(steps%10===0){const code=g.export();g=Game.load(code);assert.equal(g.export(),code);restores++;}
 }
 assert.equal(g.s.scene,'ending',starter+' '+seed+' '+policy);for(const ev of P2_EVENTS){assert.equal(events[ev.id],1,'exactly one regional event per natural campaign');assert(g.s.decisions[ev.key]);}assert(reactions.length>=3,'subsequent choice responses');
 rows.push({starter,seed,policy,steps,restores,revivals,ending:g.s.ending,events,choices,reactions,regions,jobs,decisions:g.s.decisions,finalGold:g.s.gold});
}
const report={status:'PASS',campaigns:rows.length,endings:rows.filter(x=>x.ending).length,restores:rows.reduce((n,x)=>n+x.restores,0),revivals:rows.reduce((n,x)=>n+x.revivals,0),regionalEncounters:rows.length*3,method:'6 true starters × 6 seeds × 3 event/story policies; one fixed tactical combat policy; actual progression and commands, reload every10 commands. Revivals allowed within6; no fixture grants.',rows};
fs.writeFileSync(out+'/natural-progression.json',JSON.stringify(report,null,2)+'\n');console.log(`PASS P2 natural: ${report.endings}/${report.campaigns} endings; ${report.regionalEncounters} one-time encounters; ${report.restores} exact restores; ${report.revivals} revivals`);
