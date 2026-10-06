(function(root){'use strict';
const C=root.BFContent;
C.COMPANIONS={
 alice:{name:'앨리스',quest:'지워진 증인의 이름',costs:[{gold:20},{herb:4}],tasks:['기록상을 찾아 증언의 사본을 사 온다','약초 잉크로 지워진 증인들의 이름을 복원한다'],intro:null,resolve:null,aid:'앨리스의 지름길: 보스 방어 −2',epilogue:'앨리스는 당신과 함께 지워진 사람들의 이름을 새 책에 기록한다.',joint:'“함께라면 다른 결말도 찾을 수 있을 거야.”',special:[null,null],answers:['“내 이야기를 믿어 줘서 고마워.”','“쉽게 믿지는 못하겠지만, 네 방법을 지켜볼게.”','“내 증언을 사냥의 미끼로 쓰겠다는 거야?”']},
 adam:{name:'피조물',quest:'스스로 고른 이름',costs:[{ore:4},{herb:4}],tasks:['봉합에 쓸 금속을 모아 새 심장틀을 만든다','약초를 건네고 피조물이 자기 이름을 새기도록 돕는다'],intro:null,resolve:null,aid:'피조물의 방패: 보스 공격 −2',epilogue:'피조물은 스스로 고른 이름으로 사람들 사이에 정착한다. 자신을 처음 믿어 준 친구로 당신을 기억한다.',joint:'“함께라면 다른 결말을 찾을 수 있을지도 모른다.”',special:[null,null],answers:['“나를 사람으로 불러 준 말을 잊지 않겠다.”','“내 동의가 정말 중요하다면, 끝까지 물어라.”','“장치를 부수면 내 심장도 함께 멈춘다. 그래도 하겠다는 건가?”']},
 ahab:{name:'에이해브',quest:'돌아갈 항구',costs:[{wood:5},{gold:30}],tasks:['목재를 모아 남은 선원들의 구명정을 수리한다','항해 지도를 사서 선원들의 귀환 항로를 확보한다'],intro:null,resolve:null,aid:'에이해브의 작살: 보스 시작 HP −10%',epilogue:'에이해브는 작살을 항구에 걸고 선원들을 집으로 돌려보낸다. 다음 항해는 당신에게 먼저 알리겠다고 약속한다.',joint:'“함께라면 다른 항로를 찾을 수 있겠군.”',special:[null,null],answers:['“그 길에 동의하진 않지만, 내 앞에서 말할 용기는 있군.”','“법정의 허가로 내 항해를 묶을 셈인가?”','“좋다. 서로의 등을 맡기는 항해가 될 것이다.”']}
};
// Changes concern the named person, independently of faction affiliation.
C.AFFECTION_DELTAS={alice:[20,5,-15],adam:[20,5,-15],ahab:[5,-15,20]};
})(globalThis);
