/* Original adaptation of public-domain source motifs. No modern translation text used. */
(function(root){'use strict';const C=root.BFContent;
const melee=[
 ['rabbit_guard','토끼굴 문지기',1,'체력','문턱의 집중','방어 시 MP를 1 더 회복한다.','앨리스의 길목에서 안과 밖을 구분하는 파수꾼.',{defendMana:1}],
 ['pequod','피쿼드호 갑판검사',1,'힘','갑판의 보폭','일반 적에게 주는 피해 +20%.','흔들리는 갑판에서 균형을 배운 뱃사람.',{commonDmg:.2}],
 ['windmill','풍차의 결투자',1,'의지','거인을 향한 일격','방어 후 다음 공격 피해 +35%.','작은 위협에서도 거대한 적의 형상을 읽는다.',{guardNext:.35}],
 ['stitch','봉합된 검투사',1,'체력','다시 잇는 살','승리 시 최대 HP의 8% 회복.','버려진 실험실에서 제 이름을 꿰맨 전사.',{healKill:.08}],
 ['card_spear','찢긴 카드 창병',1,'민첩','접힌 틈','기본 회피 확률 +8%.','왕정의 문양을 찢고 달아난 종이 병사.',{dodgeBonus:.08}],
 ['sancho','산초의 방패지기',1,'체력','현실의 위안','방어 시 최대 HP의 4% 회복.','몽상가의 곁에서 살아남는 법을 익혔다.',{guardHeal:.04}],
 ['coffin','빈 관의 파수꾼',1,'힘','문상객의 가시','적의 공격을 받으면 피해 3 반사.','누구도 잠들지 않은 관을 지키는 경비병.',{thornsBonus:3}],
 ['mirror_fist','거울 복도의 권투사',1,'민첩','첫 균열','전투 첫 공격 피해 +30%.','자신의 반영보다 먼저 주먹을 내지른다.',{opening:.3}],
 ['ahab_harpoon','광기에 찬 포경선 작살잡이',2,'힘','백경의 표식','보스에게 주는 피해 +18%.','모비딕의 그림자를 모든 거대한 적에게서 본다.',{boss:.18}],
 ['fallen_dreamer','기사도를 잃은 몽상가',2,'의지','꺾이지 않는 허상','HP 40% 이하에서 공격 피해 +30%.','돈키호테의 이상을 잃었지만 돌진만은 기억한다.',{below:.3}],
 ['queen_exec','하트 법정의 참수인',2,'힘','끝나지 않은 판결','HP 30% 이하 적에게 피해 +30%.','유죄보다 먼저 내려오는 칼날을 거두려 한다.',{execution:.3}],
 ['adam_sword','피조물의 자유검사',2,'체력','빌린 피의 순환','가한 피해의 8% 흡혈.','창조주의 이름 대신 스스로의 이름으로 싸운다.',{leechBonus:.08}],
 ['twin_duel','지킬의 이중 결투자',2,'민첩','두 번째 인격','세 번째 공격마다 피해 +40%.','절제와 폭력이 같은 칼자루를 번갈아 쥔다.',{comboEvery:3,comboDamage:.4}],
 ['white_knight','백기사의 균형검',2,'의지','결함 있는 발명','스킬 MP 소모 1 감소.','실패한 발명을 전장의 요령으로 바꾸었다.',{skillSaver:1}],
 ['grave_hunter','성당 지하의 사냥꾼',2,'민첩','고위 괴물 추적','정예 적에게 주는 피해 +25%.','밤의 귀족이 남기는 흔적만을 좇는다.',{eliteDmg:.25}],
 ['pagebreaker','끝장을 찢는 검성',3,'힘','제본 파괴','일반 공격이 적 방어력 4를 무시.','이미 쓰인 결말에 칼을 대는 검사.',{normalPierce:4}],
 ['abyss_anchor','심연을 고정하는 닻기사',3,'체력','심해 호흡','물약 회복량이 최대 HP의 15%만큼 증가.','바다를 잃은 세계에서 닻으로 자신을 붙든다.',{potionBoost:.15}],
 ['clock_reaver','멈춘 시계의 결투왕',3,'민첩','한순간의 우위','기본 치명타 확률 +15%.','시계가 멈춘 틈에 단 한 번 더 검을 휘두른다.',{critBonus:.15}],
 ['thorn_crown','가시 왕관의 반역자',3,'의지','반역의 불씨','스킬 사용 시 3턴 동안 지속 피해 5 부여.','머리에 씌운 형벌을 왕좌에 되돌려 준다.',{skillDot:5}],
 ['last_margin','마지막 여백의 용병왕',3,'힘','기록되지 않은 전리품','전투 골드 보상 +25%.','책에 적히지 않은 사람들을 먹여 살리는 자.',{goldBonus:.25}]
];
C.MELEE=melee.map(a=>({id:a[0],name:a[1],tier:a[2],stat:a[3],passive:a[4],effect:a[5],desc:a[6],traits:a[7]}));
for(const d of C.MELEE){C.JOBS[d.id]={...d,hp:d.stat==='체력'?58:48,mp:d.stat==='의지'?14:11,atk:d.stat==='힘'?12:10,def:d.stat==='체력'?3:2,skill:'서사의 절단',desc:d.effect,hidden:false,family:'melee'};}
const groups=[
 ['일반',0, ['물먹은 갑판검','토끼굴의 녹슨 칼','종이 병사의 철편검','봉합사의 절개도','풍차 마을의 연습검','선실의 손잡이 짧은 칼','법정 경비의 직검','안개 여관의 낡은 도','유리공의 무딘 절단검','묘지기의 뼈자루 칼','모자 가게의 재단검','검댕 묻은 작업도','염분에 닳은 사브르','마차 호위의 장도','구빈원의 지급검','무너진 성벽의 군도','강변 나룻배의 곡검','헌책방의 종이칼','길 잃은 종자의 검','폐실험실의 톱날도']],
 ['희귀',2,['피쿼드의 파도갈이','앨리스의 문틈검','산초의 귀환도','피조물의 이름칼','하트 병사의 반역검','증기 봉합의 절단검','거울의 배면도','회중시계의 초침검','백경 뼈의 양날검','야간 우편의 암검','잊힌 법전의 집행도','황동 정맥의 장검','재판을 거부한 검','붉은 약병의 세검','등대의 그림자검']],
 ['영웅',3,['에이해브의 맹세도','돈키호테의 없는 거인','창조주의 후회','피조물의 첫 이름','하트 여왕의 공소검','흰 토끼의 지각검','지킬의 절제와 하이드','성채를 떠난 백기사','백지 연맹의 제본검','대홍수의 책갈피']],
 ['전설',4,['백경의 마지막 수평선','라만차의 부서지지 않는 꿈','프로메테우스의 봉합선','하트 없는 왕관','첫 문장을 베는 자']]
];
const effects=['attack','critical','defense','health','leech','dodge','poison','burn','mana','luck'];
const legendaryFlavor=[
 '에이해브가 끝내 붙잡지 못한 수평선이 칼날 안에 갇혔다. 휘두를 때마다 먼 바다의 종소리가 난다.',
 '풍차를 베지 못한 검은 비웃음에도 부러지지 않았다. 누군가를 지키겠다는 거짓말이 끝내 진실이 되었다.',
 '창조주가 끊어 버린 생명의 실을 다시 잇는다. 이 검의 주인은 만들어진 자의 이름을 먼저 묻는다.',
 '모든 재판이 끝난 뒤 왕관만 남았다. 목을 베라는 명령 대신 명령 그 자체를 벤다.',
 '도서계가 찢어지던 밤 이름 없는 독자가 휘두른 검. 종이가 아닌 결말의 가능성을 가른다.'
];let index=0;
C.SWORDS=[];for(const [rarity,grade,names] of groups)names.forEach((name,i)=>{const effect=grade===0&&i<10?null:effects[(index+grade)%effects.length];const value=effect? (['health'].includes(effect)?8+grade*3:['critical','dodge','leech'].includes(effect)?3+grade:2+grade):0;const d={id:'lit_sword_'+index,name,slot:'weapon',unique:grade===4,fixedGrade:grade,basePower:grade===0?5+Math.floor(i/2):grade===2?16+Math.floor(i/2):grade===3?28+i:42+i*2,fixed:effect,fixedValue:value,flavor:grade===4?legendaryFlavor[i]:`${name}에는 도서계 붕괴 이전 주인의 선택이 작은 흠집으로 남아 있다.`,rarity};index++;C.SWORDS.push(d);C.ITEMS.push(d)});
C.FACTIONS=[{id:'lantern',name:'봉합의 등불',goal:'피조물과 책 밖의 사람에게 살아갈 권리를 준다.',leaders:'프랑켄슈타인의 피조물 · 앨리스',benefit:'신뢰 3 이상: 최대 HP +12'},{id:'ink',name:'붉은 잉크 법정',goal:'붕괴를 막기 위해 모든 결말을 하나의 법으로 고정한다.',leaders:'하트 여왕 · 빅터 프랑켄슈타인',benefit:'신뢰 3 이상: 방어 +2'},{id:'hunt',name:'백경 추적단',goal:'세계를 꿰맨 존재를 사냥해 각자의 원래 세계로 돌아간다.',leaders:'에이해브 · 돈키호테',benefit:'신뢰 3 이상: 보스 피해 +10%'}];
C.THREADS={
 alice:{name:'증언을 잃은 앨리스',npc:'앨리스 / 하트 여왕',stages:[
 {text:null,choices:[[null,'lantern','증언 보호'],[null,'ink','공개 재판'],[null,'hunt','탈출로 추적']]},
 {text:null,choices:[[null,'lantern','기록 공개'],[null,'ink','기록 봉인'],[null,'hunt','표적 전달']]}]},
 adam:{name:'창조주와 이름 없는 자',npc:'피조물 / 빅터 프랑켄슈타인',stages:[
 {text:null,choices:[[null,'lantern','이름 허락'],[null,'ink','실험 검증'],[null,'hunt','근원 추적']]},
 {text:null,choices:[[null,'lantern','심장 구원'],[null,'ink','합의된 봉합'],[null,'hunt','장치 파괴']]}]},
 ahab:{name:'육지로 올라온 백경',npc:'에이해브 / 돈키호테',stages:[
 {text:null,choices:[[null,'lantern','상처 조사'],[null,'ink','포획 허가'],[null,'hunt','항해 맹세']]},
 {text:null,choices:[[null,'lantern','백경 해방'],[null,'ink','백경 봉인'],[null,'hunt','사슬 절단']]}]}
};
C.AREAS[0].subtitle='토끼굴에서 쏟아진 길들이 검은 숲에서 서로 엉켰다.';C.AREAS[1].subtitle='실험실의 번개가 죽은 마을에 다시 이름을 불어넣었다.';C.AREAS[2].subtitle='백경의 그림자가 바다를 잃고 유리 늪을 떠돈다.';C.AREAS[3].boss='하트 여왕의 집행관';C.AREAS[4].subtitle='에이해브의 배는 바다 대신 모래 위로 항해한다.';C.AREAS[5].subtitle='앨리스가 남긴 증언과 빅터의 기록이 같은 서가에서 다툰다.';C.AREAS[6].boss='빅터의 봉합 거인';C.AREAS[7].boss='결말을 먹는 편집자';
})(globalThis);
