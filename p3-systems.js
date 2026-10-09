/* P3 uses existing gold/materials/gear/decisions. All set effects are derived. */
(function(root){'use strict';
const C=root.BFContent,G=root.BlackForest.Game,P=G.prototype,copy=x=>JSON.parse(JSON.stringify(x)),items=new Map(C.ITEMS.map(d=>[d.id,d]));
const bounded=n=>Number.isSafeInteger(n)&&n>=0&&n<=1e9;
const afford=(g,cost)=>Object.entries(cost).every(([k,v])=>bounded(g.s[k])&&Number.isSafeInteger(v)&&v>=0&&g.s[k]>=v);
C.P3_SETS=[
 {name:'토끼굴',two:'최대 MP +2',three:'적의 첫 행동 동안 회피 +3%',effects:{mana:2}},
 {name:'산초의 귀환길',two:'반사 피해 +1',three:'HP가 절반 이하일 때 흡혈 +2%',effects:{thorns:1}},
 {name:'노트르담의 종',two:'HP가 절반 이하일 때 방어 +1',three:'회피 +2%',effects:{}},
 {name:'하트 법정',two:'치명타 +2%',three:'기절 확률 +2%',effects:{critical:2}}
];
P.activeSets=function(){const pieces=new Map();for(const slot of ['weapon','armor','charm']){const d=this.s[slot],base=items.get(d?.id);if(!base||base.slot!==slot||d.slot!==slot||!C.P3_SETS.some(x=>x.name===base.set))continue;const ids=pieces.get(base.set)||new Set();ids.add(d.id);pieces.set(base.set,ids);}return C.P3_SETS.filter(x=>pieces.has(x.name)).map(x=>({...x,count:pieces.get(x.name).size,pieces:[...pieces.get(x.name)]}));};
const bonus=P.bonus;P.bonus=function(id){let n=bonus.call(this,id);if(!['mana','thorns','defense','dodge','leech','critical','stun'].includes(id))return n;
 for(const set of this.activeSets()){if(set.count<2)continue;n+=set.effects[id]||0;
  if(set.name==='노트르담의 종'&&id==='defense'&&this.s.hp<=this.maxHp()/2)n++;
  if(set.count<3)continue;if(set.name==='토끼굴'&&id==='dodge'&&this.s.scene==='battle'&&this.s.enemy?.turn===0)n+=3;
  if(set.name==='산초의 귀환길'&&id==='leech'&&this.s.hp<=this.maxHp()/2)n+=2;
  if(set.name==='노트르담의 종'&&id==='dodge')n+=2;if(set.name==='하트 법정'&&id==='stun')n+=2;
 }return n;};
// Bounded appraisal: slot-independent option magnitudes, modest upgrade recovery.
P.price=function(d){if(!d||![d.power,d.grade,d.plus].every(Number.isSafeInteger)||d.power<0||d.grade<0||d.grade>5||d.plus<0||d.plus>8||!Array.isArray(d.affixes))return 0;
 const options=d.affixes.reduce((n,x)=>{const a=C.AFFIXES.find(a=>a.id===x.id);return n+(a&&bounded(x.value)?Math.min(3,Math.floor(x.value/a.min)):0);},0);
 return Math.min(50,8+d.grade*6+Math.min(8,Math.floor(d.power/3))+Math.min(8,options))+d.plus*2;};
const buy=P.buy;P.buy=function(kind){if(!bounded(this.s.gold))return;return buy.call(this,kind);};
// Prevent an appraisal receipt from exceeding the existing BF3 numeric limit.
const sellBag=P.sellBag;P.sellBag=function(i){if(this.s.scene!=='camp'||!Number.isInteger(i)||!this.s.bag[i]||!bounded(this.s.gold))return;if(this.s.gold+this.price(this.s.bag[i])>1e9){this.note('골드 보유 한도에 도달했습니다. 먼저 사용한 뒤 판매해 주세요.');return;}return sellBag.call(this,i);};
const takeLoot=P.takeLoot;P.takeLoot=function(mode){if(this.s.scene!=='loot'||!this.s.loot)return;const credited=this.s.rewardState&&!this.s.rewardState.claimed?this.s.rewardState.after.gold:this.s.gold;if(mode!=='equip'&&mode!=='bag'&&mode!==true&&(!bounded(credited)||credited+this.price(this.s.loot)>1e9)){this.note('골드 보유 한도에 도달했습니다. 장비를 보관하거나 골드를 사용한 뒤 판매해 주세요.');return;}return takeLoot.call(this,mode);};
const victory=P.victory;P.victory=function(...args){victory.apply(this,args);const r=this.s.rewardState;if(r&&!r.claimed&&r.after.gold>1e9){r.after.gold=1e9;r.rewards.gold=Math.max(0,1e9-this.s.gold);this.note(this.s.message+'\n골드 보유 한도로 실제 지급은 '+r.rewards.gold+'G입니다.');}};
const grant=P.grant;P.grant=function(reward){if(reward&&Number.isSafeInteger(reward.gold)&&reward.gold>=0&&bounded(this.s.gold)){const actual=Math.min(reward.gold,1e9-this.s.gold),text=grant.call(this,{...reward,gold:actual});return text+(actual<reward.gold?' · 골드 보유 한도로 초과분은 지급하지 않았습니다.':'');}return grant.call(this,reward);};
for(const name of ['claim','dialogue','npcChoice','bondChoice','choose']){const fn=P[name];P[name]=function(...args){const owned=this.s.gold,result=fn.apply(this,args);if(bounded(owned)&&this.s.gold>1e9){this.s.gold=1e9;this.note(this.s.message+'\n골드 보유 한도에 도달해 초과분은 지급하지 않았습니다.');}return result;};}
P.upgradeCost=function(slot){const d=this.s[slot];if(!['weapon','armor','charm'].includes(slot)||!d)return {gold:0,ore:0};const step=d.plus+1;
 return {gold:d.plus<3?15*step:20*step+(d.plus>=5?Math.max(0,d.grade-1)*5*(d.plus-4):0),ore:d.plus<3?2*step:3*step+(d.plus>=5?Math.max(0,d.grade-2):0)};};
P.upgrade=function(slot){const s=this.s;if(s.scene!=='camp'||!['weapon','armor','charm'].includes(slot))return;const d=s[slot];if(d.plus>=8){this.note('현재 장비는 더 이상 강화할 수 없습니다. 최대 강화는 +8입니다.');return;}
 const cost=this.upgradeCost(slot);if(!afford(this,cost)){this.note(s.gold<cost.gold?'골드가 부족합니다.':'재료가 부족합니다. 광석을 더 모아 주세요.');return;}
 s.gold-=cost.gold;s.ore-=cost.ore;if(this.chance(this.upgradeChance(slot))){d.plus++;d.fails=0;this.note(`${d.name} 강화에 성공했습니다. +${d.plus} · ${cost.gold}G와 광석 ${cost.ore}를 사용했습니다.`);}else{d.fails++;this.note(`${d.name} 강화에 실패했지만 장비는 유지되었습니다. +${d.plus} · 연속 실패 ${d.fails}/2 · 비용 ${cost.gold}G와 광석 ${cost.ore}.`);}};
C.P3_RECIPES=[];for(const [index,gate]of [[20,1],[7,2],[13,3],[1,4]])for(const slot of ['weapon','armor','charm']){const id='set_'+slot+'_'+index;C.P3_RECIPES.push({id,gate,cost:{gold:{weapon:90,armor:75,charm:65}[slot],ore:{weapon:10,armor:9,charm:8}[slot],wood:slot==='weapon'?4:2,herb:slot==='charm'?3:1}});}
for(const [id,cost]of [['lit_sword_22',{gold:180,ore:16,wood:8,herb:2}],['set_armor_8',{gold:160,ore:15,wood:6,herb:3}],['set_charm_2',{gold:150,ore:14,wood:4,herb:4}]])C.P3_RECIPES.push({id,gate:4,cost});
P.recipeGear=function(id){const base=items.get(id);if(!C.P3_RECIPES.some(r=>r.id===id)||!base||![1,2].includes(base.fixedGrade))return null;
 const affixes=base.fixedAffixes?copy(base.fixedAffixes):base.fixed?[{id:base.fixed,value:base.fixedValue||C.AFFIXES.find(a=>a.id===base.fixed).min}]:[];
 return {...copy(base),power:base.basePower+Math.floor((base.areaScale||0)*this.s.area),grade:base.fixedGrade,plus:0,fails:0,affixes};};
P.craftingRecipes=function(){return C.P3_RECIPES.map(r=>({...copy(r),gear:this.recipeGear(r.id),available:this.s.scene==='camp'&&this.s.cleared.length>=r.gate&&this.s.area>=(items.get(r.id).minArea||0),canAfford:afford(this,r.cost)}));};
P.craftGear=function(id){const s=this.s;if(s.scene!=='camp')return;const r=this.craftingRecipes().find(r=>r.id===id);if(!r){this.note('알 수 없는 제작 설계입니다. 자원은 사용하지 않았습니다.');return;}if(!r.available){this.note(`지역 인장 ${r.gate}개를 되찾은 뒤 이 장비를 제작할 수 있습니다.`);return;}if(!r.canAfford){this.note(s.gold<r.cost.gold?'골드가 부족합니다. 제작하지 않았습니다.':'제작 재료가 부족합니다. 자원은 사용하지 않았습니다.');return;}
 if(!bounded(s.crafts)||s.crafts>=1e9||!bounded(s.rareFinds)||r.gear.grade>=2&&s.rareFinds>=1e9){this.note('제작 기록의 보유 한도에 도달했습니다. 자원은 사용하지 않았습니다.');return;}
 const gear=copy(r.gear);for(const [k,v]of Object.entries(r.cost))s[k]-=v;s.crafts++;if(!s.collection.includes(gear.id))s.collection.push(gear.id);if(gear.grade>=2)s.rareFinds++;
 s.loot=gear;s.pending='camp';s.scene='loot';s.resultVisual=null;s.resultKind='craft';this.note(`${gear.name}을 제작했습니다. ${r.cost.gold}G · 광석 ${r.cost.ore} · 목재 ${r.cost.wood} · 약초 ${r.cost.herb}를 사용했습니다. 완성품을 장착하거나 보관할 수 있습니다.`);};
P.tuningOptions=function(slot){if(!['weapon','armor','charm'].includes(slot))return [];const d=this.s[slot];if(d.grade<2||!d.affixes.length)return [];const cost={gold:220+d.grade*35+d.plus*15,ore:10+d.grade*2+d.plus};
 return C.AFFIXES.filter(a=>!d.affixes.some(x=>x.id===a.id)).map(a=>({...a,key:slot+':'+a.id,value:a.min+Math.floor(d.grade/2),cost:copy(cost)}));};
P.tuneGear=function(key){if(this.s.scene!=='camp'||typeof key!=='string')return;const [slot,id,...rest]=key.split(':');if(rest.length)return;const option=this.tuningOptions(slot).find(a=>a.id===id);if(!option)return;if(!afford(this,option.cost)){this.note('옵션 조율에 필요한 골드 또는 광석이 부족합니다. 장비는 유지됩니다.');return;}
 const d=this.s[slot];this.s.gold-=option.cost.gold;this.s.ore-=option.cost.ore;d.affixes[d.affixes.length-1]={id,value:option.value};this.s.hp=Math.min(this.s.hp,this.maxHp());this.s.mp=Math.min(this.s.mp,this.maxMp());this.note(`${d.name}의 마지막 옵션을 ${option.label} +${option.value}로 조율했습니다. 강화 수치와 앞선 옵션은 유지됩니다. ${option.cost.gold}G · 광석 ${option.cost.ore}.`);};
const quests=P.quests;P.quests=function(){return quests.call(this).map(q=>q.id==='artisan'?{...q,name:'불씨의 손길',text:'물약·장비·대장간 제작 기록 5회'}:q);};
const endings=['불씨를 놓아준 자','검은 왕관의 계승자','새벽을 돌려준 자'];
const future={
 p2_bell:{area:1,choices:{read:'등불 아래의 이름을 읽었다',trail:'종 뒤의 위험을 추적했다',copy:'명부의 사본을 남겼다'},lines:{
  read:['종은 더 이상 기억을 먹지 않는다. 주민들은 당신이 읽어 낸 이름을 서로에게 전하며, 불씨 없는 아침을 견딘다.','당신이 읽어 낸 이름은 왕관의 명부에 남는다. 주민들은 종을 울리기 전에 그 이름들을 지워도 되는지 다시 묻는다.','등불을 빌려 읽었던 이름마다 작은 불씨가 돌아온다. 주민들은 누구도 혼자 이름을 지키게 두지 않는다.'],
  'read:failure':['끝내 읽지 못한 이름의 자리에도 주민들은 빈칸을 남긴다. 종이 멎은 뒤에는 서두르지 않고 한 사람씩 증언을 모은다.','왕관의 기록관은 읽지 못한 이름을 지워 버리려 한다. 주민들이 빈칸을 내어 주지 않아, 첫 명령에도 마침표가 찍히지 않는다.','읽지 못한 이름은 실패의 흔적으로 지워지지 않는다. 돌아온 사람들이 불씨를 나누어 빈칸을 함께 밝힌다.'],
  trail:['종 뒤에 남긴 발자국은 피난길의 표식이 된다. 종이 멎어도 주민들은 그 좁은 길을 막지 않는다.','왕관의 그늘 아래서도 종 뒤의 길은 남는다. 당신의 위험을 기억하는 주민들이 길목을 지키며 돌아올 자리를 비워 둔다.','종 뒤의 피난길에서 서로 다른 이름들이 만난다. 당신이 감수한 위험은 누군가를 혼자 보내지 않겠다는 약속으로 남는다.'],
  'trail:failure':['헛길에서 건진 나무는 종탑의 발판이 된다. 주민들은 실패한 길도 기록하며, 다음 방랑자가 같은 어둠에 빠지지 않게 한다.','왕관이 닿지 않는 낡은 발판에 주민들이 길의 잘못을 새긴다. 성공한 기록만 남기라는 명령은 그곳까지 오지 못한다.','실패한 길에서 건진 나무로 모두가 건널 발판을 놓는다. 새벽은 용감했던 사람뿐 아니라 돌아온 사람의 자리도 밝힌다.'],
  copy:['명부의 사본은 불씨가 사라진 뒤에도 남는다. 주민들은 종 대신 서로의 이름을 읽어 하루를 연다.','왕관의 명부 밖에도 당신의 사본이 남아 있다. 마을은 누구의 허락 없이도 이름을 기억할 작은 방을 지킨다.','사본은 한 사람의 책이 되지 않는다. 주민들이 나누어 가진 페이지마다 다른 집의 불씨가 비친다.']}},
 p2_water:{area:4,choices:{share:'일행과 물약을 나누었다',trail:'물통을 따라 전갈 굴로 향했다',record:'물통에 남은 이름을 적었다'},lines:{
  share:['물을 나눈 일행은 다음 여행자를 그늘로 부른다. 불씨가 사라진 사막에도 누군가를 기다리는 물통이 남는다.','물을 나눈 일행은 왕관의 순찰길에도 쉬어 갈 그늘을 남긴다. 통행의 허가보다 먼저 목마른 사람의 이름을 묻는다.','그늘마다 물통이 하나씩 놓인다. 당신에게 받은 것을 돌려주려는 일행이 서로 다른 길의 사람들을 기다린다.'],
  trail:['전갈 굴로 향했던 발자국은 정찰대의 길표가 된다. 사람들은 위험이 사라졌다고 믿지 않고, 뒤따를 이에게 굴의 위치부터 알린다.','왕관의 정찰대가 당신의 발자국을 길표로 삼는다. 일행은 그 길이 위험했던 까닭을 잊지 않도록 매번 물통에 경고를 덧쓴다.','당신이 위험을 감수한 길에는 둘씩 걷는 여행자가 늘어난다. 불씨를 나눈 이들은 다음 사람에게 전갈 굴의 위치를 먼저 전한다.'],
  record:['물통에 적었던 이름을 따라 여행자의 소식이 돌아온다. 사막은 잃어버린 자를 숫자로 세는 대신 이름으로 기다린다.','왕관의 통행 명부에는 없는 이름들이 물통에 남는다. 일행은 그 흔적을 숨기지 않고 다음 그늘로 옮긴다.','물통의 이름은 서로를 찾는 약속이 된다. 나누어진 불씨가 다른 길에서 돌아오는 발자국을 하나씩 밝힌다.']}},
 p2_margin:{area:5,choices:{read:'마력으로 빌린 이름을 읽었다',mend:'약초로 찢어진 문장을 봉합했다',copy:'앞선 증언의 사본을 만들었다'},lines:{
  read:['마력을 빌려 읽은 이름은 이제 불씨 없이 서가에 남는다. 사서는 어둠 속에서도 사람이 사람의 이름을 읽을 수 있게 문을 열어 둔다.','마력으로 읽은 이름은 왕실의 서가에도 들어간다. 사서는 책을 잠그기 전에 누가 그 이름을 돌려받아야 하는지 기록한다.','빌린 이름은 책 한 권의 소유가 되지 않는다. 도서관은 불씨를 가져온 독자에게 다른 사람의 이름부터 읽게 한다.'],
  'read:failure':['마력이 닿지 못한 이름은 여백에 남는다. 사서는 완성된 책보다 그 빈자리를 먼저 보여 주며, 다시 올 증인을 기다린다.','왕관이 완전한 기록을 요구해도 사서는 읽지 못한 여백을 덮지 않는다. 닫히지 않은 페이지가 다음 증언을 기다린다.','읽지 못한 여백을 서로 다른 불씨가 비춘다. 서둘러 하나의 답을 쓰지 않는 일이 도서관의 새 약속이 된다.'],
  mend:['약초로 봉합한 페이지는 책이 타고 난 뒤에도 이어진다. 사서는 사라진 불씨보다 끊어지지 않은 문장을 먼저 돌본다.','봉합한 문장 사이로 왕관이 허락하지 않은 목소리도 새어 나온다. 사서는 그 틈을 다시 막지 않는다.','봉합한 페이지의 실밥을 독자들이 함께 고친다. 새벽은 흠 없는 책보다 다시 읽을 수 있는 책을 남긴다.'],
  copy:['증언의 사본은 달빛을 따라 서가 밖으로 나간다. 불씨가 사라져도 누군가의 마지막 문장은 다른 집에서 이어진다.','왕관의 도서관 밖에도 증언의 사본이 돌아다닌다. 사람들은 읽은 내용을 제 말로 전하며 한 권의 결말에 갇히지 않는다.','증언의 사본을 가진 사람들이 서로의 여백을 채운다. 도서관은 정답을 나누는 곳보다 다른 기억이 만나는 곳이 된다.']}}
};
P.endingReport=function(){const s=this.s,choice=endings.indexOf(s.ending),mode=choice>=0?choice:0,regions=[];for(const [key,r]of Object.entries(future)){const v=s.decisions[key];if(!v)continue;const [token,result]=v.split(':'),line=r.lines[token+':'+result]||r.lines[token];if(!line)continue;regions.push({area:r.area,name:C.AREAS[r.area].name,choice:r.choices[token],text:line[mode]});}
 const choices=Object.entries(s.decisions).flatMap(([key,value])=>{const m=key.match(/^chapter_(\d)_([012])$/);return m?[{place:C.AREAS[Number(m[1])].name,text:value}]:[];});
 return {title:s.ending,regions,choices,job:C.JOBS[s.job]?.name||'',history:(s.career.history||[]).map(id=>C.JOBS[id]?.name).filter(Boolean),equipment:this.equipment().map(d=>({name:d.name,slot:d.slot,plus:d.plus,grade:d.grade})),records:{kills:s.kills,crafts:s.crafts,collection:s.collection.length,regions:s.cleared.length,turns:s.turns}};};
const finish=P.finish;P.finish=function(i){if(this.s.scene!=='final')return;finish.call(this,i);if(this.s.scene!=='ending')return;this.note(this.s.message+'\n\n'+['불씨는 사라졌지만, 당신이 남긴 약속은 아직 밤을 건넌다.','왕관은 모든 결말을 지배하지 못한다. 당신이 남긴 약속도 그 무게 아래서 살아남을 길을 묻는다.','나누어진 불씨마다 다른 기억이 남는다. 새벽은 하나의 목소리로 끝나지 않는다.'][i]);};
root.BlackForest.P3_RECIPES=C.P3_RECIPES;root.BlackForest.P3_SETS=C.P3_SETS;
})(globalThis);
