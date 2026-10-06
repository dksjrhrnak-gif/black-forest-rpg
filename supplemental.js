/* Fourteen ordinary professions complete the 100 + 14 design. */
(function(root){'use strict';const C=root.BFContent;
const rows=[
 ['adventurer','모험가',0,'basic',{healKill:.025,defendMana:1},'갈림길의 지혜','회복과 집중으로 다음 선택을 준비한다.','책 밖에서 온 독자. 어떤 이야기의 문도 열 수 있다.'],
 ['hunter','사냥꾼',0,'ranged',{opening:.12},'바람 읽기','첫 공격 피해 +12%.','숲의 흔적을 읽으며 생존을 배운다.'],
 ['guardian','수호자',0,'support',{guardHeal:.02},'작은 방패','방어 시 HP 2% 회복.','이름 없는 여행자를 지키는 방패.'],
 ['whale_slayer','백경 살해자',3,'melee',{boss:.2,normalPierce:2},'맹세의 종결','보스 피해 +20% · 일반 공격 방어 2 무시.','에이해브의 사냥을 마침내 자신의 의지로 끝낸다.'],
 ['self_named','스스로 이름 붙인 검왕',3,'melee',{leechBonus:.09,healKill:.03},'자유의 혈맥','흡혈 +9% · 승리 시 HP 3% 회복.','창조주의 허락 없이 자신의 생명을 지킨다.'],
 ['dream_guard','라만차의 꿈 수호자',3,'melee',{guardNext:.4,guardHeal:.02},'지켜낸 환상','방어 후 피해 +40% · 방어 시 HP 2% 회복.','풍차 너머에서 지킬 가치가 있는 꿈을 찾았다.'],
 ['court_witness','하트 법정의 증언기사',3,'melee',{execution:.24,defendMana:1},'칼보다 먼저 목소리','적 HP 30% 이하 피해 +24% · 방어 MP +1.','여왕의 칼날을 증언의 자리로 되돌린다.'],
 ['alice_return','앨리스의 귀환 안내자',2,'occult',{dodgeBonus:.07,skillSaver:1},'돌아갈 문','회피 +7% · 스킬 MP 소모 −1.','출구가 닫혀도 함께 돌아갈 길을 찾는다.'],
 ['victor_heir','빅터의 속죄 봉합사',2,'support',{healKill:.06,thornsBonus:2},'책임의 봉합','승리 시 HP 6% 회복 · 피해 2 반사.','창조 뒤에 남겨진 생명의 책임을 짊어진다.'],
 ['quixote_squire','라만차의 맹세 종자',1,'melee',{guardNext:.2,defendMana:1},'현실 속 기사도','방어 후 피해 +20% · 방어 MP +1.','산초와 함께 꿈과 현실의 간격을 걷는다.'],
 ['sherwood_warden','셜우드의 숲 파수장',3,'ranged',{opening:.24,eliteDmg:.16},'숲의 약속','첫 공격 +24% · 정예 피해 +16%.','빼앗긴 몫을 되찾아 숲의 사람에게 돌려준다.'],
 ['oz_restorer','오즈의 심장 복원사',3,'support',{potionBoost:.12,skillSaver:1},'되찾은 심장','물약 회복 +12% · 스킬 MP 소모 −1.','마음을 구하는 것은 마법보다 오래 남는다.'],
 ['faust_release','파우스트의 계약 파기자',3,'magic',{skillDot:4,defendMana:1},'지워진 서명','스킬 지속 피해 4 · 방어 MP +1.','빚어진 운명을 자신의 문장으로 다시 쓴다.'],
 ['margin_keeper','경계의 여백 수호자',3,'occult',{normalPierce:2,dodgeBonus:.06},'책 밖의 선택','일반 공격 방어 2 무시 · 회피 +6%.','어느 결말에도 빼앗기지 않는 여백을 지킨다.']
];for(const [id,name,tier,family,traits,passive,desc,lore] of rows){C.JOBS[id]={id,name,tier,family,traits,passive,desc,effect:desc,lore,hidden:false,hp:family==='support'?54:50,mp:family==='magic'?16:12,atk:family==='magic'?9:10,def:family==='support'?3:2,skill:{basic:'불씨의 일격',melee:'서사의 절단',ranged:'서사의 조준',support:'불씨의 나눔',magic:'여백의 주문',occult:'틈새의 거래'}[family]};}if(Object.values(C.JOBS).filter(j=>!j.hidden).length!==100||Object.values(C.JOBS).filter(j=>j.hidden).length!==14)throw Error('Expected 100 ordinary + 14 hidden');
})(globalThis);
