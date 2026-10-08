/* Player-controlled journeys. Freeze the original victory calculation, then
 * commit its rewards once; never reroll loot or RNG while loading a result. */
(function(root){'use strict';
const C=root.BFContent,G=root.BlackForest.Game,P=G.prototype,copy=x=>JSON.parse(JSON.stringify(x));
const keys=['gold','xp','level','hp','mp','wood','ore','herb','sigils','cleared','relics','rift'];
const visual=g=>{const s=g.s;if(s.scene==='battle'){const e=s.enemy;return {category:e.midboss?'enemies':e.boss?'bosses':'enemies',id:e.name.replace(/^정예\s+/,''),label:e.name};}
 if(s.scene==='event')return {category:'events',id:String(s.eventId),label:C.EVENTS[s.eventId].title};
 if(['chapter','npc','dialogue','bond'].includes(s.scene)){const id=s.scene==='chapter'?C.CHAPTERS[s.area].npc:s.thread;return {category:s.scene==='npc'&&C.asset('npcs',id)?'npcs':'story',id,label:C.NPCS[id]?.name||C.COMPANIONS[id]?.name||C.AREAS[s.area].name};}
 return null;};
P.rememberScene=function(){this.s.resultVisual=visual(this);};
P.claimVictory=function(){const s=this.s,r=s.rewardState;if(!r||r.claimed)return false;
 // Claimed is written before any mutation. The UI exports only the final,
 // synchronous state including the next scene, in one localStorage write.
 r.claimed=true;for(const k of keys)s[k]=copy(r.after[k]);return true;};
const victory=P.victory;P.victory=function(msg){const s=this.s;if(s.scene!=='battle'||!s.enemy)return;
 const e=copy(s.enemy),before=Object.fromEntries(keys.map(k=>[k,copy(s[k])])),v=visual(this);
 victory.call(this,msg);const after=Object.fromEntries(keys.map(k=>[k,copy(s[k])]));
 const destination=s.scene==='loot'?s.pending:s.scene;
 s.journeySeq=(s.journeySeq||0)+1;s.rewardState={id:s.journeySeq,claimed:false,after,destination,
  rewards:{gold:after.gold-before.gold,xp:(e.boss&&!e.midboss?48:e.elite||e.midboss?28:20)+s.area*8,wood:3,herb:2,ore:e.boss&&!e.midboss?6:3,sigils:after.sigils-before.sigils}};
 for(const k of keys)s[k]=before[k];s.resultVisual=v;s.resultKind='victory';
 // Original engine computed the item and probability counters already.
 // Keep those results and its RNG state, but show the frozen rewards first.
 s.pending=destination;if(s.scene!=='loot')s.scene='reward';
};
const advance=P.advance;P.advance=function(){if(!['reward','merchant'].includes(this.s.scene))return;
 if(this.s.returnAfterResult){this.s.scene=this.s.returnAfterResult;this.s.returnAfterResult=null;return;}
 const r=this.s.rewardState;if(r&&!r.claimed){this.claimVictory();if(r.destination!=='reward'){this.s.scene=r.destination;return;}}
 this.s.resultVisual=null;this.s.resultKind='';advance.call(this);};
P.nextEncounter=function(){if(!['reward','merchant','map'].includes(this.s.scene))return;
 if(this.s.scene!=='map')this.advance();if(this.s.scene==='map'&&this.s.routes.length)this.choose(0);};
const takeLoot=P.takeLoot;P.takeLoot=function(mode){if(this.s.scene!=='loot'||!this.s.loot)return;this.claimVictory();takeLoot.call(this,mode);};
P.collectLoot=function(mode){this.takeLoot(mode);if(this.s.scene==='reward')this.nextEncounter();};
P.enterArea=function(a){this.travel(a);if(this.s.scene==='map')this.nextEncounter();};
const choose=P.choose;P.choose=function(i){if(this.s.scene!=='map'||!this.s.routes[i])return;
 const type=this.s.routes[i];this.s.resultVisual=null;this.s.resultKind=type;
 if(type==='midboss'&&!this.s.acceptMidboss){this.s.scene='midboss';this.note('기둥 뒤에서 무거운 발소리가 울린다. 좁은 샛길로 몸을 숨기면 이 수문장을 피해 갈 수 있을 듯하다.');return;}
 choose.call(this,i);this.s.acceptMidboss=false;const v=visual(this);if(v)this.s.resultVisual=v;};
P.faceMidboss=function(){if(this.s.scene!=='midboss')return;this.s.scene='map';this.s.acceptMidboss=true;this.choose(0);};
P.skipMidboss=function(){if(this.s.scene!=='midboss')return;this.s.step++;this.s.turns++;this.s.secretPity++;this.s.scene='reward';this.note('수문장이 눈치채기 전에 샛길을 빠져나왔다.');};
P.resumeJourney=function(){this.resumeChapter();if(this.s.scene==='map')this.nextEncounter();};
for(const name of ['event','chapterChoice','npcChoice','dialogue','bondChoice']){const fn=P[name];P[name]=function(...args){const previous=this.s.scene,before=visual(this)||this.s.resultVisual;fn.apply(this,args);
 if(['npc','dialogue','bond'].includes(previous)&&this.s.scene==='camp'&&!(name==='bondChoice'&&args[0]===2)){this.s.scene='reward';this.s.returnAfterResult='camp';this.s.resultKind='npc';}
 if(['reward','loot'].includes(this.s.scene))this.s.resultVisual=before;};}
const act=P.act;P.act=function(action){const before=visual(this);act.call(this,action);if(['dead','reward'].includes(this.s.scene)&&!this.s.resultVisual)this.s.resultVisual=before;};
const pause=P.pauseChapter;P.pauseChapter=function(){if(this.s.returnAfterResult||this.s.checkpoint||this.s.rewardState&&!this.s.rewardState.claimed)return;pause.call(this);};
const load=G.load;G.load=function(input){const g=load.call(this,input),s=g.s,bad=()=>{throw Error('여정 기록 검증 실패');};
 s.journeySeq=s.journeySeq??0;s.rewardState=s.rewardState??null;s.resultVisual=s.resultVisual??null;s.resultKind=s.resultKind??'';s.returnAfterResult=s.returnAfterResult??null;s.acceptMidboss=s.acceptMidboss??false;
 if(s.returnAfterResult!==null&&s.returnAfterResult!=='camp'||typeof s.acceptMidboss!=='boolean')bad();
 if(!Number.isSafeInteger(s.journeySeq)||s.journeySeq<0||s.journeySeq>1e9||typeof s.resultKind!=='string'||s.resultKind.length>30)bad();
 const v=s.resultVisual;if(v&&(!['areas','bosses','enemies','events','story','npcs'].includes(v.category)||typeof v.id!=='string'||v.id.length>100||typeof v.label!=='string'||v.label.length>100))bad();
 const r=s.rewardState;if(r){if(!Number.isSafeInteger(r.id)||r.id<1||r.id>s.journeySeq||typeof r.claimed!=='boolean'||!['reward','camp','final'].includes(r.destination)||!r.after||!r.rewards)bad();
  if(!r.claimed&&!['reward','loot'].includes(s.scene))bad();
  for(const k of keys){const n=r.after[k];if(k==='cleared'){if(!Array.isArray(n)||n.length>8||n.some((v,i)=>v!==i))bad();}else if(!Number.isSafeInteger(n)||n<0||n>1e9)bad();}
  for(const k of ['gold','xp','wood','herb','ore','sigils'])if(!Number.isSafeInteger(r.rewards[k])||r.rewards[k]<0||r.rewards[k]>1e9)bad();
  // Reuse the complete existing state validator for the future credited state.
  if(!r.claimed){const candidate=copy(s);for(const k of keys)candidate[k]=copy(r.after[k]);candidate.rewardState.claimed=true;
   load.call(this,JSON.stringify({format:'black-forest-v3',state:candidate,rng:g.rng.getState()}));}
 }
 return g;};
})(globalThis);
