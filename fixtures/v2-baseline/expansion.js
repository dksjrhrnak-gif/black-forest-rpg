/* Original modular content: authored job identities and literature-inspired equipment sets. */
(function(root){'use strict';const C=root.BFContent;
const families={
 magic:{label:'마법',hp:44,mp:17,atk:11,def:1,skill:'금서의 개방',names:['잉크 견습생','오즈의 허수아비 학자','네버랜드 별읽기','우물의 이름술사','해저 전류술사','장미 정원의 환술사','녹색 안경의 주술사','번개 실험실의 도전술사','프랑켄슈타인의 생체술사','그림 동화의 잠술사','거울 뒷면의 연금술사','빅토리아의 안개술사','노틸러스의 폭풍학자','오즈의 가짜 대마법사','별을 읽는 어린 왕자','시간 기계의 역행술사','파우스트의 계약해독자','금서의 마지막 독자'],descs:['지워진 문장에 불씨를 붙여 주문을 익힌다.','없는 지혜를 찾다가 적의 빈틈을 읽게 됐다.','섬 위의 별자리로 돌아갈 길을 그린다.','물속에서 잊힌 이름을 건져 올린다.','바다 없는 해저 전선을 손끝에 잇는다.','장미의 그림자로 적의 시선을 붙잡는다.','녹색 렌즈 너머 허위의 마법을 분해한다.','번개의 기억을 유리병에 담는다.','생명의 경계를 칼 대신 주문으로 잇는다.','잠든 숲에 남은 꿈을 빌려 싸운다.','반영과 실체 사이에서 재료를 교환한다.','도시의 안개에 짧은 금지 명령을 새긴다.','심해의 전류를 지상으로 끌어올린다.','권위의 허상을 벗고 진짜 책임을 배운다.','떠난 행성들의 좌표를 작은 빛으로 남긴다.','미래의 파편에서 지금의 공격을 읽는다.','서명의 대가를 읽고 계약의 허점을 찢는다.','먹히지 않은 마지막 문장으로 세계를 붙든다.']},
 ranged:{label:'원거리',hp:48,mp:12,atk:11,def:2,skill:'서사의 조준',names:['셜우드의 견습 궁수','피쿼드호 투창수','이상한 정원의 새총잡이','해적섬의 화승총수','황야의 우편 저격수','종탑의 까마귀 사수','오즈의 양철 포수','붉은 머리의 표적꾼','로빈후드의 망명 궁수','노틸러스의 수압포수','퀴퀘그의 문신 투창수','지옥 항로의 쇠뇌수','하멜른의 음표 사수','성벽의 불씨 투석수','포그의 일주 저격수','백경의 망루 사냥꾼','아르고호의 황금 사수','수평선 너머의 명사수'],descs:['숲의 길을 외운 뒤 첫 화살을 놓는다.','밧줄을 묶은 창으로 도망치는 적을 붙든다.','크기가 바뀌는 돌을 같은 표적에 쏜다.','보물보다 돌아갈 배를 지키려 총을 든다.','끊긴 길 너머에도 마지막 편지를 보낸다.','검은 깃털의 방향으로 바람을 읽는다.','심장을 잃은 포신에 동료의 이름을 새긴다.','표적의 거짓말을 작은 징후로 구분한다.','귀족의 문장을 버리고 숲의 사람을 지킨다.','심해의 압력을 한 발에 모아 발사한다.','피부의 기록을 읽으며 창의 궤적을 고른다.','길 잃은 배의 돛대에서 악령을 겨눈다.','따라오는 음표를 화살촉에 묶는다.','꺼지는 도시의 불씨를 투석기로 옮긴다.','정해진 시간보다 정확한 한 발을 택한다.','안개 속에서도 흰 상처를 놓치지 않는다.','황금 양털의 빛으로 적의 틈을 비춘다.','닿을 수 없는 거리에도 선택을 보낸다.']},
 support:{label:'지원',hp:54,mp:15,atk:9,def:3,skill:'불씨의 나눔',names:['구빈원 붕대지기','촛불 성당의 견습수도사','산초의 야전 취사병','작은 아씨들의 간호사','오즈의 마음 수선공','성냥의 온기지기','노틸러스의 선의','토끼굴 길안내자','피조물의 상처봉합사','노트르담의 종치유사','레미제라블의 은촛대지기','캔터베리의 순례의사','셜우드의 구호대장','백지 연맹의 기록보호자','스쿠루지의 새벽 구호가','천일야화의 생명 이야기꾼','돌아온 성냥불의 성녀','유리 심장의 재봉사'],descs:['남은 천을 찢어 다음 사람의 상처를 감싼다.','적의 이름까지 기도문에 적어 둔다.','몽상가가 굶지 않도록 현실을 끓인다.','전장의 편지와 붕대를 같은 가방에 넣는다.','고장 난 심장에 기억의 부품을 잇는다.','꺼진 성냥의 온기를 손바닥에 모은다.','해저의 압력에도 치료의 손을 멈추지 않는다.','돌아갈 문을 찾는 사람에게 방향을 준다.','이름보다 먼저 상처를 살피는 치료사다.','쫓겨난 사람에게 종의 울림을 나누어 준다.','빌린 은을 팔아 오늘의 생명을 구한다.','서로 다른 믿음의 사람을 함께 치료한다.','싸움 뒤에 남는 사람을 데리고 귀환한다.','지워질 사람의 기록을 몸으로 막는다.','늦은 후회를 살아 있는 이의 식량으로 바꾼다.','끝나지 않는 이야기를 생명의 시간으로 바꾼다.','재가 된 소원을 다시 사람에게 돌려준다.','깨지기 쉬운 마음을 베지 않고 꿰맨다.']},
 occult:{label:'기이',hp:50,mp:13,atk:10,def:2,skill:'틈새의 거래',names:['거울 장터의 골동품상','허클베리의 강길잡이','몽테크리스토의 장부지기','드라큘라의 주간 문지기','걸리버의 축척기사','도리언의 초상 관리인','보물섬의 암호해독자','시간 여행의 관측자','셜록의 흔적 수집가','오디세우스의 매듭꾼','카르밀라의 야간 감시자','체셔의 미소 밀수꾼','해저 이만리의 유물잠수사','동물 재판의 증언 도둑','세헤라자드의 결말 협상가','지옥문 앞의 길동무','찢어진 장의 경계인'],descs:['가치를 잃은 물건에서 새 쓸모를 찾는다.','강물보다 빠르게 바뀌는 길을 기억한다.','복수의 비용을 장부에 먼저 계산한다.','밤의 계약이 끝나는 문턱을 지킨다.','작은 것과 거대한 것의 거리를 바꾼다.','그림 대신 사람이 지불할 대가를 살핀다.','보물의 위치보다 함정의 문법을 먼저 읽는다.','아직 오지 않은 순간을 기록한다.','사소한 흔적을 하나의 공격 계획으로 잇는다.','귀환의 실을 매듭에 숨겨 둔다.','초대받지 않은 그림자가 들어오지 못하게 한다.','사라진 몸의 미소만 거래에 남겨 둔다.','깊이를 잃은 바다에서 유물의 숨을 건진다.','누가 말할 수 있는지를 정하는 규칙을 훔친다.','죽음과 이야기의 끝을 다른 날로 미룬다.','나아갈 사람의 발걸음을 대신 세어 준다.','어느 책에도 속하지 않아 모든 문턱을 지난다.']}
};
const traitDefs=[
 ['defendMana',1,'방어 MP +1'],['commonDmg',.15,'일반 적 피해 +15%'],['guardNext',.25,'방어 후 피해 +25%'],['healKill',.05,'승리 시 HP 5% 회복'],['dodgeBonus',.06,'회피 +6%'],['guardHeal',.025,'방어 시 HP 2.5% 회복'],['thornsBonus',2,'피격 피해 2 반사'],['opening',.2,'첫 공격 피해 +20%'],['boss',.12,'보스 피해 +12%'],['below',.2,'HP 40% 이하 피해 +20%'],['execution',.2,'적 HP 30% 이하 피해 +20%'],['leechBonus',.05,'흡혈 +5%'],['skillSaver',1,'스킬 MP 소모 −1'],['eliteDmg',.18,'정예 피해 +18%'],['normalPierce',3,'일반 공격 방어 3 무시'],['potionBoost',.1,'물약 회복 HP +10%'],['critBonus',.1,'치명타 +10%'],['goldBonus',.15,'전투 골드 +15%']
];
C.EXTRA_JOBS=[];
Object.entries(families).forEach(([family,f],fi)=>f.names.forEach((name,i)=>{
 const tier=i<7?1:i<13?2:3,a=traitDefs[i%18],b=traitDefs[(i+3+fi*3)%18];
 const second=b[1]<1?Number((b[1]*.8).toFixed(3)):b[1]+1;const traits={[a[0]]:a[1],[b[0]]:second},hidden=i>=f.names.length-2;
 const id='x_'+family+'_'+i,passive=['여백의 지혜','흔들리지 않는 조준','남겨 둔 온기','지워진 거래'][fi]+' · '+name;
 const secondaryText=b[2].replace(b[1]<1?String(b[1]*100)+'%':String(b[1]),b[1]<1?String(Math.round(second*1000)/10)+'%':String(second));const effect=a[2]+' · '+secondaryText;
 const d={id,name,tier,stat:['지력','민첩','의지','행운'][fi],family,passive,effect,traits,hp:f.hp,mp:f.mp,atk:f.atk,def:f.def,skill:f.skill,desc:effect+' / '+{magic:'스킬은 방어 무시',ranged:'스킬 피해 +적 방어(최대4)',support:'스킬은 HP 6% 회복',occult:'스킬 후 다음 피격 30% 감소'}[family],lore:f.descs[i],hidden};
 if(hidden){d.hint=f.descs[i];d.unlock={bosses:3,secrets:2,[['crafts','elites','mercy','caches'][fi]]:[3,3,3,4][fi]};d.requirement='보스 3 · 비밀 발견 2 · '+['제작 3','정예 3','자비 3','보급함 4'][fi];}
 C.JOBS[id]=d;C.EXTRA_JOBS.push(d);
}));
// Each thematic set carries its own primary effect and original lore. Forms provide a second effect.
const themes=[
 ['토끼굴','dodge','갑자기 달라진 크기에도 돌아갈 문을 기억한다.'],['하트 법정','critical','재판의 결론보다 먼저 사람의 목소리를 묻는다.'],['흰 토끼의 시계','mana','늦었다는 종소리가 울릴 때도 한 번 더 집중한다.'],['거울 나라','defense','반영 속 상처를 현실의 갑옷으로 바꾼다.'],['피쿼드의 항해','attack','항해를 멈춘 갑판에도 오래된 맹세가 남았다.'],['백경의 상흔','leech','먼 바다의 상처가 살아남는 자에게 온기를 돌려준다.'],['라만차의 꿈','health','비웃음을 견딘 꿈은 누군가의 방패가 된다.'],['산초의 귀환길','thorns','돌아갈 길의 돌멩이도 위험을 향하면 무기가 된다.'],['봉합 실험실','health','이음새의 흉터는 실패가 아니라 생존의 기록이다.'],['피조물의 이름','leech','남에게 받은 이름 대신 스스로 선택한 이름을 새겼다.'],['노틸러스의 심해','stun','압력에 갇힌 번개의 기억이 금속 안에서 흔들린다.'],['오즈의 녹색 도시','luck','녹색 유리 아래 숨은 진실을 한 조각씩 드러낸다.'],['셜우드의 숲','critical','숲의 사람에게 나눈 몫을 이 물건은 기억한다.'],['노트르담의 종','defense','쫓겨난 사람이 돌아오는 날 종이 다시 울린다.'],['몽테크리스토의 장부','attack','복수의 값과 자유의 값이 다른 칸에 적혀 있다.'],['시간 기계의 잔광','dodge','미래에서 흘러온 작은 빛이 지금의 빈틈을 보여 준다.'],['드라큘라의 새벽','poison','초대받지 않은 밤이 문턱에서 천천히 힘을 잃는다.'],['천일야화의 등불','mana','이야기가 이어지는 동안 아직 끝은 오지 않는다.'],['성냥팔이의 불씨','burn','사라진 소원의 온기를 살아 있는 사람에게 전한다.'],['파우스트의 서명','luck','계약의 끝에 남은 빈 줄은 아직 당신의 것이다.']
];
const forms={
 weapon:[['창','normalPierce'],['작살','critical'],['활','dodge'],['쇠뇌','attack'],['도끼','attack'],['해머','stun'],['지팡이','mana'],['마도서','mana'],['낫','leech'],['채찍','poison'],['투창','critical'],['권갑','thorns'],['화승총','critical'],['철퇴','defense'],['지휘봉','health'],['차크람','burn']],
 armor:[['흉갑','defense'],['로브','mana'],['외투','health'],['사슬옷','defense'],['망토','dodge'],['판금','thorns'],['전투복','critical'],['잠수복','health'],['수도복','mana'],['사냥복','dodge'],['방열복','burn'],['봉합옷','leech'],['비늘갑','defense'],['경갑','luck'],['법복','poison'],['군복','attack'],['항해복','stun']],
 charm:[['반지','critical'],['목걸이','health'],['부적','defense'],['회중시계','dodge'],['동전','luck'],['책갈피','mana'],['나침반','attack'],['인장','stun'],['유리구슬','leech'],['종','thorns'],['브로치','burn'],['열쇠','poison']]
};
const newCounts={weapon:326,armor:338,charm:238},effectIds=C.AFFIXES.map(a=>a.id);
C.EXTRA_ITEMS=[];
for(const [slot,count] of Object.entries(newCounts))for(let n=0;n<count;n++){
 const theme=themes[n%20],form=forms[slot][Math.floor(n/20)%forms[slot].length];
 const extra=n>=themes.length*forms[slot].length;
 const grade=(Math.floor(n/20)+n%20)%6,area=[0,0,1,2,4,6][grade];
 const name=extra?theme[0]+'의 항해유산 '+['해도','신호창','선상종','돛대활','비상닻','귀환검'][n-320]:theme[0]+'의 '+form[0];
 const primary=theme[1],secondary=effectIds.includes(form[1])?form[1]:'attack';
 const value=id=>id==='health'?5+grade*2:id==='mana'?1+Math.floor(grade/2):['critical','dodge','leech'].includes(id)?2+grade:id==='luck'?1+Math.floor(grade/2):1+grade;
 const fixedAffixes=grade===0?[]:[{id:primary,value:value(primary)},...(grade>=3&&secondary!==primary?[{id:secondary,value:value(secondary)}]:[])];
 const d={id:'set_'+slot+'_'+n,name,slot,category:slot==='weapon'?'무기-'+(extra?['마도서','창','지휘봉','활','해머','검'][n-320]:form[0]):slot==='armor'?'방어구-'+form[0]:'장신구-'+form[0],fixedGrade:grade,unique:grade>=4,minArea:area,basePower:slot==='weapon'?3+grade*3+(n%3):slot==='armor'?1+grade+(n%2):1+Math.floor(grade/2),areaScale:slot==='weapon'?1:slot==='armor'?.5:0,fixedAffixes,flavor:theme[2],set:theme[0]};
 C.ITEMS.push(d);C.EXTRA_ITEMS.push(d);
}
// Expose consistent metadata for existing content without changing its identifiers.
const oldWeaponTypes=['검','단검','지팡이','창','검','도끼','레이피어','채찍','지팡이','대검','낫','검','곡도','활','마도서','해머','검','단검','마도서','주사위','검','검','검','검'];for(const d of C.ITEMS){if(/^w[0-9]+$/.test(d.id))d.category='무기-'+oldWeaponTypes[Number(d.id.slice(1))];d.category=d.category||({weapon:'무기-검/도검류',armor:'방어구',charm:'장신구'}[d.slot]);d.minArea=d.minArea||0;}
C.FAMILY_LABELS={melee:'근접',magic:'마법',ranged:'원거리',support:'지원',occult:'기이',basic:'기본',hidden:'히든'};
if(Object.keys(C.JOBS).length!==100||C.ITEMS.length!==1000)throw Error('Expansion DB size mismatch');
})(globalThis);
