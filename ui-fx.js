/* Presentation only: snapshots never write game state or consume RNG. */
(function(root){'use strict';
function capture(game){const s=game.s;return {scene:s.scene,area:s.area,step:s.step,checkpoint:!!s.checkpoint,unlocked:[...s.unlocked],ending:s.ending,turns:s.turns,hp:s.hp,maxHp:game.maxHp(),mp:s.mp,loot:s.loot?{id:s.loot.id,grade:s.loot.grade,name:s.loot.name}:null,reward:s.rewardState?{id:s.rewardState.id,claimed:s.rewardState.claimed}:null,message:s.message,skillHeal:!!root.BFContent?.JOBS[s.job]?.effects.some(x=>x.type==='skillHeal'),skillWeak:!!root.BFContent?.JOBS[s.job]?.effects.some(x=>x.type==='skillWeak'),enemy:s.enemy?{...s.enemy,pattern:undefined}:null};}
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
 if(b.scene==='dead'&&arg==='skill'&&a.skillHeal&&a.hp<a.maxHp)add('player','heal','회복'); // A lethal response hides the numeric HP delta; do not invent an amount.
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
function describe(a,b,cmd,arg){if(['load','render'].includes(cmd))return [];const out=combatEffects(a,b,cmd,arg);
 const freshLoot=b.scene==='loot'&&(a.scene!=='loot'||a.loot?.id!==b.loot?.id);
 const freshReward=b.reward&&!b.reward.claimed&&a.reward?.id!==b.reward.id;
 if(freshLoot||freshReward)out.push({target:'reward',type:'reveal'});
 if(a.reward&&!a.reward.claimed&&b.reward?.id===a.reward.id&&b.reward.claimed)out.push({target:'player',type:'receipt',text:'전리품 확보'});
 else if(['collectLoot','takeLoot'].includes(cmd)&&a.scene==='loot'&&b.scene!=='loot')out.push({target:'player',type:'receipt',text:arg==='sell'?'장비 판매':arg==='equip'?'장비 착용':'장비 확보'});
 if(b.scene==='battle'&&a.scene!=='battle'&&b.enemy?.boss)out.push({target:'banner',type:'boss',text:(b.enemy.midboss?'중간 수문장':'인장의 수호자')+' · '+b.enemy.name});
 if(a.scene!==b.scene||a.area!==b.area||a.step!==b.step)out.push({target:'scene',type:'transition'});
 if(!a.checkpoint&&b.checkpoint&&b.scene==='camp')out.push({target:'player',type:'guard',text:'여정을 기록했습니다'});
 if(cmd==='rest'&&a.scene==='camp'){const hp=b.hp-a.hp,mp=b.mp-a.mp;if(hp>0)out.push({target:'player',type:'heal',text:'휴식 +'+hp});else if(mp>0)out.push({target:'player',type:'guard',text:'MP +'+mp});if(hp>0||mp>0)out.push({target:'scene',type:'transition'});}
 if(cmd==='awaken'){const id=b.unlocked.find(id=>!a.unlocked.includes(id));if(id)out.push({target:'banner',type:'hidden',text:'숨겨진 비전 · '+root.BFContent.JOBS[id].name});}
 if(b.scene==='final'&&a.scene!=='final')out.push({target:'banner',type:'ending',text:'첫 불씨의 운명을 결정할 때'});
 if(b.scene==='ending'&&a.scene!=='ending')out.push({target:'banner',type:'ending',text:b.ending});
 if(freshLoot&&b.loot?.grade>=4)out.push({target:'banner',type:b.loot.grade===5?'mythic':'legend',text:root.BFContent.RARITIES[b.loot.grade]+' 발견 · '+b.loot.name});
 if(a.scene==='battle'&&b.reward&&!b.reward.claimed&&a.reward?.id!==b.reward.id)out.push({target:'banner',type:'victory',text:'전투 승리 · 전리품을 확인하세요'});
 return out;
}
function create(host){let timer=null;const marked=[];
 const mark=(node,cls)=>{node.classList.add(cls);marked.push([node,cls]);};
 function clear(){clearTimeout(timer);timer=null;host.querySelectorAll('[data-fx-layer]').forEach(n=>n.remove());for(const [n,cls] of marked)n.classList.remove(cls);marked.length=0;}
 function show(events){clear();const grouped={player:[],enemy:[]};for(const e of events)if(grouped[e.target])grouped[e.target].push(e);
  const anchors={player:host.querySelector('#bf-stats .stats>div:first-child'),enemy:host.querySelector('#bf-play .scene-hero')},card=host.querySelector('#bf-play .enemy'),frames={};
  // Batch geometry reads before adding nodes. Offscreen feedback uses a small viewport rail.
  for(const target of Object.keys(grouped))if(grouped[target].length&&anchors[target])frames[target]=anchors[target].getBoundingClientRect();
  for(const [target,list] of Object.entries(grouped)){if(!list.length)continue;const anchor=anchors[target];if(!anchor)continue;const rect=frames[target],compact=target==='player'?rect.top<0||rect.bottom>root.innerHeight||rect.height<Math.min(6,list.length)*28+16:rect.top+76<0||rect.top+240>root.innerHeight;
   const layer=document.createElement('div');layer.className='fx-floats fx-'+target+(compact?' fx-compact':'');layer.dataset.fxLayer=target;layer.setAttribute('aria-hidden','true');if(compact){const label=document.createElement('small');label.className='fx-target';label.textContent=target==='player'?'방랑자':'적';layer.append(label);}
   for(const [i,e] of list.slice(0,6).entries()){const token=document.createElement('span');token.className='fx-token fx-'+e.type;token.dataset.fxEvent=e.type;token.style.setProperty('--fx-order',i);token.textContent=e.text;layer.append(token);}(compact?host:anchor).append(layer);
   if(list.some(e=>['damage','critical'].includes(e.type))){const node=target==='player'?(rect.top>=0&&rect.bottom<=root.innerHeight?anchor:layer):(compact&&card?card:anchor.querySelector('.scene-art')||anchor);const cls=target==='player'?'fx-player-hit':list.some(e=>e.type==='critical')?'fx-critical':'fx-hit';mark(node,cls);}
  }
  if(events.some(e=>e.target==='scene')){const n=host.querySelector('#bf-play .scene-hero,#bf-play .main>.story');if(n)mark(n,'fx-scene-enter');}
  if(events.some(e=>e.target==='reward'))host.querySelectorAll('#bf-play .reward-summary,#bf-play .fx-loot-card').forEach(n=>mark(n,'fx-reward-enter'));
  // One compact banner: a rare find takes priority over the ordinary victory notice.
  const banner=events.filter(e=>e.target==='banner').sort((a,b)=>({hidden:5,mythic:4,legend:3,boss:2,ending:2,victory:1}[b.type]||0)-({hidden:5,mythic:4,legend:3,boss:2,ending:2,victory:1}[a.type]||0))[0];
  if(banner){const panel=host.querySelector('#bf-panel'),anchor=panel&&!panel.hidden?panel:host.querySelector('#bf-play .main');if(anchor){const layer=document.createElement('div');layer.className='fx-banner fx-banner-'+banner.type;layer.dataset.fxLayer='banner';layer.dataset.fxEvent=banner.type;layer.setAttribute('aria-hidden','true');const text=document.createElement('strong');text.textContent=banner.text;layer.append(text);anchor.append(layer);}}
  if(events.length)timer=setTimeout(clear,650);
 }
 return {show,clear};
}
const api={capture,describe,create};root.BFUIFX=api;if(typeof module==='object'&&module.exports)module.exports=api;
})(globalThis);
