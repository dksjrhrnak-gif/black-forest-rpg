/* Regional side stories reuse BF3 decisions, existing affixes and reward flow. */
(function(root){'use strict';
const C=root.BFContent,G=root.BlackForest.Game,P=G.prototype,copy=x=>JSON.parse(JSON.stringify(x));
const choice=(label,cost,reward,chance=1,failure={})=>({label,cost,reward,chance,failure});
C.P2_EVENTS=[
 {id:18,region:1,key:'p2_bell',title:'종 아래 남은 증언',text:'멈춘 종 아래에서 등불 수리에 쓰이던 명부가 발견된다. 지워진 이름을 읽으면 종이 다시 울리지만, 어둠 속의 무언가도 그 소리를 듣는다.',choices:[
  choice('등불을 빌려 이름을 읽는다',{gold:8},{herb:3,mana:4},.65,{ore:2}),
  {...choice('종 뒤의 흔적을 따라간다',{hp:6},{gear:'elite'},.6,{wood:3}),slot:'armor'},
  choice('명부의 사본을 남긴다',{}, {ore:2})]},
 {id:19,region:4,key:'p2_water',title:'모래에 묻힌 물통',text:'모래 속 물통에 앞서 지나간 여행자의 이름이 남아 있다. 그늘 아래의 일행은 물을 나눌지 묻는다. 물통을 끌고 간 발자국은 전갈의 굴로 이어진다.',choices:[
  choice('물약을 나누고 일행과 걷는다',{potions:1},{wood:3,herb:2}),
  {...choice('발자국을 좇아 물통을 되찾는다',{hp:6},{},1),battle:true},
  choice('그늘에서 물통의 이름을 적는다',{}, {mana:3,ore:2})]},
 {id:20,region:5,key:'p2_margin',title:'여백의 빌린 이름',text:'서가의 여백이 종 아래의 명부와 사막의 물통에 남은 이름을 되돌려 준다. 책은 무엇을 남길지 묻고, 장비를 감싼 문장에서는 희미한 열기가 새어 나온다.',choices:[
  {...choice('마력으로 빌린 이름을 읽는다',{mp:4},{gear:'elite'},.7,{herb:3}),slot:'charm'},
  choice('약초로 찢어진 문장을 봉합한다',{herb:2},{heal:20,mana:6}),
  choice('앞선 증언의 사본을 만든다',{}, {xp:12,wood:2})]}
];
for(const ev of C.P2_EVENTS){C.EVENTS.push(ev);C.ASSETS.events[ev.id]=null;}
// Same IDs, rarity and area gates. Lower defense/luck buys a different purpose.
C.P2_ITEMS={
 set_armor_20:{basePower:1,fixedAffixes:[{id:'mana',value:3}],flavor:'가벼운 천은 칼을 덜 막지만, 접힌 문장에 다음 주문을 담는다.'},
 set_armor_7:{basePower:2,fixedAffixes:[{id:'thorns',value:3}],flavor:'얇아진 흉갑의 돌멩이는 맞은 상처를 되돌린다.'},
 set_armor_13:{basePower:2,fixedAffixes:[{id:'dodge',value:4}],flavor:'종소리에 맞춰 비켜선다. 버티는 대신 피할 자리를 남겼다.'},
 set_charm_1:{basePower:0,fixedAffixes:[{id:'critical',value:4}],flavor:'행운을 묻지 않고 한 번의 정확한 증언에 힘을 싣는다.'},
 set_charm_7:{basePower:0,fixedAffixes:[{id:'leech',value:3}],flavor:'돌아갈 길의 온기를 빌린다. 맞받아치는 대신 상처를 조금 되찾는다.'},
 set_charm_13:{basePower:0,fixedAffixes:[{id:'mana',value:3}],flavor:'방패 대신 다음 주문을 위한 여백을 종 안에 남겼다.'}
};
for(const [id,changes] of Object.entries(C.P2_ITEMS))Object.assign(C.ITEMS.find(d=>d.id===id),copy(changes));
P.p2EventAvailable=function(ev){const s=this.s;return !!ev&&s.kind==='story'&&s.area===ev.region&&!!s.storyFlags['chapter_'+ev.region+'_seen']&&!s.decisions[ev.key];};
P.eventChoices=function(){const ev=C.EVENTS[this.s.eventId];if(!ev)return [];const rows=copy(ev.choices),s=this.s;
 if(ev.id===18){if(s.decisions.chapter_1_0===C.CHAPTER_DECISIONS[1][0].choices[0].short)rows[0].chance=.85;if(this.bonus('thorns')||this.bonus('dodge'))rows[1].chance=.8;}
 if(ev.id===19&&s.decisions.chapter_4_1===C.CHAPTER_DECISIONS[4][1].choices[0].short)rows[0].reward.herb=3;
 if(ev.id===20){if(s.decisions.p2_bell==='read:success'||s.decisions.p2_water==='share:success')rows[0].chance=.9;
  if(s.hp===this.maxHp()&&s.mp===this.maxMp())rows[1].reward={ore:this.bonus('mana')?5:4};else if(this.bonus('mana'))rows[1].reward.heal=28;
  if(s.decisions.p2_bell==='copy:success')rows[2].reward.mana=4;}
 return rows;};
P.p2Reaction=function(){const s=this.s,d=s.decisions;
 const lines={
  1:d.p2_bell?(d.p2_bell==='read:success'?'당신이 등불을 빌려 읽은 이름을 주민들도 다시 부른다.':d.p2_bell==='read:failure'?'등불 아래에서 읽지 못한 이름을 피조물이 명부에 옮긴다.':d.p2_bell==='trail:success'?'종 뒤를 살핀 발자국을 주민들이 피난길의 표식으로 삼는다.':d.p2_bell==='trail:failure'?'종 뒤의 헛길에서 건진 나무로 피조물이 무너진 발판을 고친다.':'당신이 남긴 명부 사본에 주민들이 새 이름을 덧쓴다.'):'',
  4:d.p2_water?(d.p2_water.startsWith('share:')?'당신이 물약을 나눈 일행이 뒤따라와 다음 그늘을 알려 준다.':d.p2_water.startsWith('trail:')?'일행은 당신이 전갈의 굴로 들어간 일을 기억하며 발자국을 피한다.':'물통에 적은 이름을 보고 뒤따르던 여행자가 주인을 찾아간다.'):'',
  5:d.p2_margin?(d.p2_margin==='read:success'?'당신이 마력을 빌려 읽은 이름이 서가의 여백에서 대답한다.':d.p2_margin==='read:failure'?'마력이 닿지 못한 이름을 앨리스가 다른 증언의 여백에 옮긴다.':d.p2_margin.startsWith('mend:')?'약초로 봉합한 문장 덕분에 사서가 찢어진 쪽을 다시 넘긴다.':'증언의 사본을 남긴 자리에는 다른 독자의 기록이 이어진다.'):
    d.p2_bell&&d.p2_water?'앨리스가 당신이 남긴 종 아래 명부와 물통의 기록을 여백에 나란히 펼친다.':d.p2_bell?'앨리스가 당신이 남긴 종 아래 명부를 여백에 펼친다.':d.p2_water?'앨리스가 당신이 남긴 물통의 기록을 여백에 펼친다.':''
 };return lines[s.area]||'';};
const routes=P.routes;P.routes=function(){routes.call(this);const ev=C.P2_EVENTS.find(e=>e.region===this.s.area);if(this.s.step===9&&this.p2EventAvailable(ev))this.s.routes=['event'];};
const choose=P.choose;P.choose=function(i){const s=this.s;if(s.scene!=='map'||!s.routes[i])return;
 if(s.routes[i]!=='event'){const type=s.routes[i];choose.call(this,i);if((s.scene==='chapter'||type==='checkpoint'&&s.scene==='reward')&&this.p2Reaction())this.note(s.message+'\n\n'+this.p2Reaction());return;}
 const ev=C.P2_EVENTS.find(e=>e.region===s.area),regional=s.step===9&&this.p2EventAvailable(ev);
 const ids=C.EVENTS.filter(e=>e.id<18&&!s.recentEvents.includes(e.id)).map(e=>e.id);
 s.turns++;s.step++;s.secretPity++;s.eventId=regional?ev.id:this.pick(ids);s.recentEvents.push(s.eventId);s.recentEvents=s.recentEvents.slice(-6);s.scene='event';s.resultKind='event';
 s.resultVisual={category:'events',id:String(s.eventId),label:C.EVENTS[s.eventId].title};
 this.note(C.EVENTS[s.eventId].text+(regional&&this.p2Reaction()?'\n\n'+this.p2Reaction():''));};
const event=P.event;P.event=function(i){const s=this.s,ev=C.P2_EVENTS.find(e=>e.id===s.eventId);if(!ev)return event.call(this,i);if(s.scene!=='event')return;
 if(!this.p2EventAvailable(ev)){s.scene='reward';this.note('이 사건은 이미 기록했거나 이 지역에서 이어 갈 수 없다. 같은 보상은 다시 받지 않는다.');return;}
 const c=this.eventChoices()[i];if(!c||!Number.isInteger(i)||!this.canPay(c.cost))return;
 for(const [k,v]of Object.entries(c.cost))s[k]-=v;
 const success=this.chance(c.chance),tokens={18:['read','trail','copy'],19:['share','trail','record'],20:['read','mend','copy']};
 s.decisions[ev.key]=tokens[ev.id][i]+':'+(success?'success':'failure');s.scene='reward';
 if(c.battle){this.fight(false,false,C.AREAS[4].enemies[0]);if(s.career.actions.defend>=3||this.bonus('dodge'))s.enemy.weak=1;
  s.resultVisual=null;this.note('물통을 끌고 간 전갈이 굴 입구를 막았다. '+(s.enemy.weak?'쌓아 온 방어 경험으로 첫 공격의 방향을 흩뜨렸다.':'물통을 되찾으려면 길을 열어야 한다.')+'\n'+s.message);return;}
 const reward=copy(success?c.reward:c.failure);let gear=null;if(reward.gear){gear=this.makeGear(reward.gear,c.slot);delete reward.gear;}
 const awarded=this.grant(reward);this.note(c.label+'. '+(success?'남긴 선택이 길을 바꾼다.':'읽지 못한 흔적도 기록으로 남는다.')+'\n'+awarded+this.xp(12));
 if(gear){s.loot=gear;s.pending='reward';s.scene='loot';this.note(s.message+'\n'+{weapon:'무기',armor:'방어구',charm:'장신구'}[c.slot]+'를 골라 가져간다.');}
 s.resultVisual={category:'events',id:String(ev.id),label:ev.title};};
const buy=P.buy;P.buy=function(kind){const slots={'gear-weapon':'weapon','gear-armor':'armor','gear-charm':'charm'},slot=slots[kind];if(!slot)return buy.call(this,kind);
 const s=this.s;if(!['camp','merchant'].includes(s.scene)||s.gold<55)return;s.gold-=55;s.pending=s.scene;s.loot=this.makeGear('elite',slot);s.scene='loot';this.note('55G로 '+{weapon:'무기',armor:'방어구',charm:'장신구'}[slot]+' 상자를 골랐다. 희귀도 확률은 기존 정예 상자와 같다.');};
const load=G.load;G.load=function(input){const g=load.call(this,input),allowed={p2_bell:['read','trail','copy'],p2_water:['share','trail','record'],p2_margin:['read','mend','copy']};
 for(const [key,tokens]of Object.entries(allowed)){const v=g.s.decisions[key];if(v!==undefined&&!tokens.flatMap(t=>[t+':success',t+':failure']).includes(v))throw Error('지역 선택 기록 검증 실패');}return g;};
root.BlackForest.P2_EVENTS=C.P2_EVENTS;root.BlackForest.P2_ITEMS=C.P2_ITEMS;
})(globalThis);
