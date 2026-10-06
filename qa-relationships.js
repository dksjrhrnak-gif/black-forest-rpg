(function(root){'use strict';const C=root.BFContent;
C.NPCS={alice:{name:'앨리스',faction:'lantern',text:'지워지는 증언을 지키려는 앨리스가 당신의 판단을 기다린다.'},queen:{name:'하트 여왕',faction:'ink',text:'여왕은 세계를 붙들 법과 사람을 구할 예외 사이에서 망설인다.'},creature:{name:'피조물',faction:'lantern',text:'만들어진 자는 창조주의 이름 대신 스스로의 이름으로 불리기를 원한다.'},victor:{name:'빅터',faction:'ink',text:'빅터는 실험 기록 앞에서 묻는다. “책임을 질 수 있다면 다시 시작해도 되는가?”'},ahab:{name:'에이해브',faction:'hunt',text:'사냥의 끝에서 무엇이 남는지 에이해브는 아직 말하지 못한다.'},quixote:{name:'돈키호테',faction:'hunt',text:'꿈을 조롱하는 세상에서도 돈키호테는 누군가의 방패가 되려 한다.'}};
const G=root.BlackForest.Game,P=G.prototype,alias=id=>id==='adam'?'creature':id;
P.getAffinity=function(id){return this.s.affinity?.[alias(id)]??this.s.affection?.[id]??0;};
P.addAffinity=function(id,n){id=alias(id);if(!C.NPCS[id]||!Number.isFinite(n))return;this.s.affinity[id]=Math.max(0,Math.min(100,this.getAffinity(id)+Math.trunc(n)));const old=id==='creature'?'adam':id;if(old in this.s.affection)this.s.affection[old]=this.s.affinity[id];};
P.affinityTier=function(id){const n=this.getAffinity(id);return n<20?'경계':n<40?'중립':n<60?'호의':n<80?'신뢰':'친밀';};
P.affinity=P.addAffinity;P.affectionLabel=P.affinityTier;
P.meetNpc=function(id){const s=this.s;if(s.scene!=='camp'||!C.NPCS[id]||s.cleared.length<1||s.npcVisits[id]===s.cleared.length)return;s.thread=id;s.scene='npc';this.note(C.NPCS[id].text+'\n관계: '+this.affinityTier(id));};
P.npcChoice=function(i){const s=this.s,id=s.thread;if(s.scene!=='npc'||!C.NPCS[id]||![0,1,2,3].includes(i)||i===3&&this.getAffinity(id)<40)return;const change=[12,-10,4,15][i];this.addAffinity(id,change);s.npcVisits[id]=s.cleared.length;s.decisions['npc_'+id]=['함께 해결','강요','거리 유지','신뢰의 공조'][i];if(i===0||i===3)s.factions[C.NPCS[id].faction]=Math.min(100,s.factions[C.NPCS[id].faction]+1);if(i===3){s.sigils++;s.gold+=20;}s.scene='camp';this.note(`${C.NPCS[id].name}: ${s.decisions['npc_'+id]}. 호감도 ${change>=0?'+':''}${change} · ${this.affinityTier(id)}.${i===3?' 신뢰로 감춰진 기록을 되찾았다. 인장 +1 · 20G.':''}`);};
root.BlackForest.NPCS=C.NPCS;
})(globalThis);
/* Faction outcomes and the remaining personal relationships remain independent. */
(function(root){const P=root.BlackForest.Game.prototype,finish=P.finish;
P.finish=function(i){if(this.s.scene!=='final')return;finish.call(this,i);if(this.s.scene!=='ending')return;const s=this.s,lines=[];const outcomes={lantern:'봉합의 등불은 구한 사람들의 이름을 새벽의 기록에 남긴다.',ink:'붉은 잉크 법정은 당신의 판결을 새 법의 첫 조항으로 기록한다.',hunt:'백경 추적단은 끝난 사냥 너머에서 각자의 귀환길을 찾는다.'};for(const id of ['lantern','ink','hunt'])if(s.factions[id]>=3)lines.push(outcomes[id]);for(const id of ['queen','victor','quixote'])if(this.getAffinity(id)>=60)lines.push({queen:'여왕은 당신을 믿고 증언을 들을 빈자리를 법정에 남긴다.',victor:'빅터는 당신과 나눈 약속을 기억하며 창조 뒤의 책임을 피하지 않는다.',quixote:'돈키호테는 당신을 꿈을 지켜 준 동료라 부르며 새 길에 오른다.'}[id]);if(lines.length)this.note(s.message+'\n\n'+lines.join('\n'));};
})(globalThis);
