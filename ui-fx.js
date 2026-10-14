/* Presentation only: snapshots never write game state or consume RNG. */
(function(root){'use strict';
function capture(game){const s=game.s;return {scene:s.scene,turns:s.turns,hp:s.hp,maxHp:game.maxHp(),mp:s.mp,loot:s.loot?{id:s.loot.id,grade:s.loot.grade,name:s.loot.name}:null,reward:s.rewardState?{id:s.rewardState.id,claimed:s.rewardState.claimed}:null,message:s.message,skillWeak:!!root.BFContent?.JOBS[s.job]?.effects.some(x=>x.type==='skillWeak'),enemy:s.enemy?{...s.enemy,pattern:undefined}:null};}
function combatEffects(a,b,cmd,arg){const out=[];const add=(target,type,text)=>out.push({target,type,text});
 if(cmd!=='act'||a.scene!=='battle'||a.turns===b.turns)return out;
 const msg=b.message||'',damage=msg.match(/! (\d+) 피해\./),hit=msg.match(/적의 (?:강공격|공격): (\d+) 피해\./);
 if(damage)add('enemy',arg==='attack'&&msg.startsWith('치명타!')?'critical':'damage',(arg==='attack'&&msg.startsWith('치명타!')?'치명타 ':'−')+damage[1]);
 if(hit)add('player','damage','−'+hit[1]);
 if(msg.includes('적의 공격을 회피했다!'))add('player','dodge','회피');
 // Net HP alone hides healing followed by a hit. A surviving turn preserves actual damage.
 const heal=msg.match(/(?:회복 물약: HP|, HP) \+(\d+)\./),leech=msg.match(/흡혈 \+(\d+)\./);
 const explicit=(heal?Math.min(Number(heal[1]),a.maxHp-a.hp):0)+(leech?Number(leech[1]):0);
 const restored=b.scene==='dead'?explicit:Math.max(0,b.hp-a.hp+(hit?Number(hit[1]):0));
 if(restored>0)add('player','heal','회복 +'+restored);
 if(arg==='defend')add('player','guard','방어 · 집중');
 const enemyHeal=msg.match(/적이 HP (\d+) 회복\./);if(enemyHeal&&Number(enemyHeal[1])>0)add('enemy','heal','회복 +'+enemyHeal[1]);
 const dot=msg.match(/지속 피해 (\d+)\./),reflect=msg.match(/반사 (\d+)\./);
 if(dot)add('enemy','dot','지속 피해 −'+dot[1]);if(reflect)add('enemy','reflect','반사 −'+reflect[1]);
 const statuses=new Set();if(msg.includes('중독 발동.'))statuses.add('poison');if(msg.includes('화상 발동.'))statuses.add('burn');if(msg.includes('기절해 행동하지 못했다.')||msg.includes('충격 발동.'))statuses.add('stun');
 if(b.enemy?.dotTurns&&(b.enemy.dotTurns>a.enemy.dotTurns||b.enemy.dotId!==a.enemy.dotId))statuses.add(b.enemy.dotId||'dot');
 if(b.enemy&&(b.enemy.weak&&!a.enemy.weak||arg==='skill'&&a.skillWeak))statuses.add('weak');
 for(const type of statuses)add('enemy',type,{poison:'중독',burn:'화상',bleed:'출혈',stun:'기절',weak:'약화',dot:'지속 피해'}[type]||'지속 피해');
 return out;
}
function describe(a,b,cmd,arg){const out=combatEffects(a,b,cmd,arg);
 const freshLoot=b.scene==='loot'&&(a.scene!=='loot'||a.loot?.id!==b.loot?.id);
 const freshReward=b.reward&&!b.reward.claimed&&a.reward?.id!==b.reward.id;
 if(freshLoot||freshReward)out.push({target:'reward',type:'reveal'});
 if(a.reward&&!a.reward.claimed&&b.reward?.id===a.reward.id&&b.reward.claimed)out.push({target:'player',type:'receipt',text:'전리품 확보'});
 else if(['collectLoot','takeLoot'].includes(cmd)&&a.scene==='loot'&&b.scene!=='loot')out.push({target:'player',type:'receipt',text:arg==='sell'?'장비 판매':arg==='equip'?'장비 착용':'장비 확보'});
 return out;
}
function create(host){let timer=null;const marked=[];
 const mark=(node,cls)=>{node.classList.add(cls);marked.push([node,cls]);};
 function clear(){clearTimeout(timer);timer=null;host.querySelectorAll('[data-fx-layer]').forEach(n=>n.remove());for(const [n,cls] of marked)n.classList.remove(cls);marked.length=0;}
 function show(events){clear();const grouped={player:[],enemy:[]};for(const e of events)if(grouped[e.target])grouped[e.target].push(e);
  for(const [target,list] of Object.entries(grouped)){if(!list.length)continue;const anchor=target==='player'?host.querySelector('#bf-stats .stats>div:first-child'):host.querySelector('#bf-play .scene-hero');if(!anchor)continue;
   const layer=document.createElement('div');layer.className='fx-floats fx-'+target;layer.dataset.fxLayer=target;layer.setAttribute('aria-hidden','true');
   for(const [i,e] of list.slice(0,6).entries()){const token=document.createElement('span');token.className='fx-token fx-'+e.type;token.dataset.fxEvent=e.type;token.style.setProperty('--fx-order',i);token.textContent=e.text;layer.append(token);}anchor.append(layer);
   if(list.some(e=>['damage','critical'].includes(e.type))){const node=target==='player'?anchor:anchor.querySelector('.scene-art')||anchor;const cls=target==='player'?'fx-player-hit':list.some(e=>e.type==='critical')?'fx-critical':'fx-hit';mark(node,cls);}
  }
  if(events.some(e=>e.target==='reward'))host.querySelectorAll('#bf-play .reward-summary,#bf-play .fx-loot-card').forEach(n=>mark(n,'fx-reward-enter'));
  if(events.length)timer=setTimeout(clear,650);
 }
 return {show,clear};
}
const api={capture,describe,create};root.BFUIFX=api;if(typeof module==='object'&&module.exports)module.exports=api;
})(globalThis);
