/* Explicit, authored ancestry; tiers describe specialisation, not stat inflation. */
(function(root){'use strict';const C=root.BFContent,J=C.JOBS;
for(const id of ['warrior','rogue','mage','adventurer','hunter','guardian']){J[id].tier=0;J[id].family=J[id].family||'basic';}
const ancestry={
 rabbit_guard:['warrior','guardian','adventurer'],pequod:['warrior','hunter','adventurer'],windmill:['warrior','adventurer'],stitch:['warrior','guardian'],card_spear:['rogue','warrior'],sancho:['guardian','adventurer'],coffin:['guardian','warrior'],mirror_fist:['rogue','warrior'],quixote_squire:['warrior','guardian','adventurer'],
 ahab_harpoon:['pequod'],fallen_dreamer:['windmill','quixote_squire'],queen_exec:['card_spear','rabbit_guard'],adam_sword:['stitch'],twin_duel:['mirror_fist'],white_knight:['sancho','quixote_squire'],grave_hunter:['coffin'],
 pagebreaker:['queen_exec','twin_duel'],abyss_anchor:['ahab_harpoon'],clock_reaver:['twin_duel','white_knight'],thorn_crown:['queen_exec'],last_margin:['grave_hunter','white_knight'],whale_slayer:['ahab_harpoon'],self_named:['adam_sword','x_magic_8'],dream_guard:['fallen_dreamer','white_knight'],court_witness:['queen_exec','alice_return'],alice_return:['rabbit_guard','x_support_0','x_occult_0'],victor_heir:['stitch','x_support_0','x_magic_0'],sherwood_warden:['x_ranged_8','x_ranged_7'],oz_restorer:['x_support_8','x_support_10'],faust_release:['x_magic_7','x_magic_10'],margin_keeper:['x_occult_7','x_occult_10']
};
// Tier 2 relationships follow motifs: lightning -> living matter, voyage -> harpoons,
// charity -> healing, evidence -> bargains. Two parents allow related crossovers only.
const familyParents={
 magic:{roots:['mage','adventurer'],second:[[4,0],[4,3],[5,2],[6,5],[0,3],[4,6]],third:[[10,11],[9,10],[12,7]]},
 ranged:{roots:['hunter','rogue','adventurer'],second:[[4,2],[0,4],[1,6],[1,3],[3,5],[2,5]],third:[[9,12],[7,8],[10,11]]},
 support:{roots:['guardian','adventurer'],second:[[0,3],[4,6],[1,3],[1,5],[2,3],[0,2]],third:[[7,12],[10,11],[9,11]]},
 occult:{roots:['rogue','mage','adventurer'],second:[[6,2],[0,5],[1,6],[3,5],[0,4],[1,4]],third:[[9,12],[8,11]]}
};
for(const [family,t] of Object.entries(familyParents))for(const j of C.EXTRA_JOBS.filter(j=>j.family===family&&!j.hidden)){const n=Number(j.id.split('_').at(-1));ancestry[j.id]=j.tier===1?t.roots:j.tier===2?t.second[n-7].map(i=>'x_'+family+'_'+i):t.third[n-13].map(i=>'x_'+family+'_'+i);}
const roles={basic:'균형',melee:'근접 전투',magic:'주문과 집중',ranged:'조준과 추적',support:'회복과 방어',occult:'기회와 계약'};
for(const [id,j] of Object.entries(J)){j.id=id;j.parents=j.hidden?[]:ancestry[id]||[];j.children=[];j.role=roles[j.family]||'특수 전투';j.literaryMotif=j.lore||j.desc;j.stats={hp:j.hp,mp:j.mp,atk:j.atk,def:j.def};j.passive=j.passive||({warrior:'방패의 집중',rogue:'급소의 눈',mage:'방어를 넘는 불씨'}[id]||j.desc);j.lore=j.lore||j.desc;if(j.hidden){j.tier=null;j.unlock=j.unlock||{};}else{j.unlock={level:[1,3,6,10][j.tier],mastery:[0,8,12,18][j.tier],bosses:[0,1,3,6][j.tier]};}j.masteryAction=({warrior:'defend',rogue:'critical',mage:'skill'}[id])||(j.traits?.guardNext||j.traits?.guardHeal||j.traits?.defendMana?'defend':['magic','occult'].includes(j.family)?'skill':j.family==='ranged'?'critical':'attack');j.image=null;}
const legacyHidden={paladin:{mercy:3,bosses:1},blood:{lowhpWins:2,kills:10},rune:{weaponPlus:3,crafts:3},shadow:{elites:3,kills:15},gambler:{caches:4,rareFinds:2},chrono:{bosses:4,secrets:2}};for(const [id,u] of Object.entries(legacyHidden))Object.assign(J[id].unlock,u);
const extraConditions={ahab_harpoon:{storyFlag:'ahab_seen'},adam_sword:{storyFlag:'creature_seen'},whale_slayer:{affinity:{id:'ahab',value:40},storyFlag:'chapter_5_seen'},self_named:{affinity:{id:'creature',value:40},storyFlag:'chapter_6_seen'},dream_guard:{affinity:{id:'quixote',value:20}},court_witness:{affinity:{id:'alice',value:40}},victor_heir:{storyFlag:'victor_seen'},oz_restorer:{actions:{defend:4}},faust_release:{faction:{id:'ink',value:3}},margin_keeper:{secrets:2}};
for(const [id,u] of Object.entries(extraConditions))Object.assign(J[id].unlock,u);
for(const [id,j] of Object.entries(J))for(const parent of j.parents){if(!J[parent]||J[parent].hidden||J[parent].tier!==j.tier-1)throw Error('Broken ancestry '+id+' <- '+parent);J[parent].children.push(id);}
const companions={x_magic_16:'victor',x_magic_17:'alice',x_ranged_16:'quixote',x_ranged_17:'ahab',x_support_16:'alice',x_support_17:'creature'};
for(const [id,npc] of Object.entries(companions)){J[id].unlock.affinity={id:npc,value:40};J[id].unlock.storyFlag=npc+'_seen';J[id].requirement+=' · '+npc+' 호감도 40 · 조우';}
C.HIDDEN_ALIASES={blank_page:'x_occult_15',last_author:'x_occult_16'};
J.x_occult_15.unlock.endings=1;J.x_occult_16.unlock.collection=150;J.x_occult_16.unlock.endings=1;
J.x_occult_15.requirement+=' · 엔딩 1';J.x_occult_16.requirement+=' · 장비 도감 150 · 엔딩 1';
C.STARTERS=Object.keys(J).filter(id=>J[id].tier===0&&!J[id].hidden);
})(globalThis);
