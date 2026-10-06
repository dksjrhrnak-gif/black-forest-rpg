/* Three sectors per chapter. Paths omit content; a checkpoint preserves the route. */
(function(root){'use strict';const C=root.BFContent,G=root.BlackForest.Game,P=G.prototype;
C.TYPES.story=['서사의 흔적','지역의 기억과 세력의 선택'];C.TYPES.npc=['낯익은 목소리','개인 관계에 따른 대화'];C.TYPES.checkpoint=['중간 야영지','회복 · 경로를 보존하고 캠프로'];C.TYPES.midboss=['중간 수문장','정예 보상 · 지역 인장은 유지'];
C.CHAPTERS=[
 {npc:'alice',midboss:false,text:['검은 숲에서 흰 토끼와 주민들의 이름이 하나둘 사라지기 시작했다. 법정 기록에서 이름이 지워지면 사람들의 기억에서도 그 존재가 흐려졌다. 앨리스는 사라진 이들이 실제로 존재했다는 증언을 모아 하트 여왕의 법정으로 갔다. 공식 기록에 이름을 되돌리면 사람들을 되찾을 수 있다고 믿었기 때문이다. 하지만 법정은 서로 다른 세계의 기억이 섞인 증언을 ‘질서를 흔드는 모순’이라 판정하고 소각을 명령했다. 앨리스는 남은 증언서를 빼돌려 검은 숲으로 돌아왔다.','뿌리에 묶인 기억은 거짓 증언이 아니라 돌아갈 집을 잃은 사람의 이름이었다. 누가 이 이름을 지울 권리가 있는가?','파수꾼의 가시는 숲 밖의 명령으로 자랐다. 이름을 보존할지, 질서를 위해 봉인할지, 그 명령을 추적할지 정해야 한다.']},
 {npc:'creature',midboss:false,text:['멈춘 종탑 아래에서 피조물이 망가진 등불을 고친다. 주민은 그의 손을 두려워하지만 밤이 오면 그 불빛을 찾는다.','빅터의 기록에는 주민이 재료 목록으로 남아 있다. 피조물은 목록 한 줄을 자기 이름으로 바꾸겠다고 한다.','종지기의 종은 마을을 살리는 장치인 동시에 기억을 지우는 장치다. 심장을 살릴 다른 힘을 모아야 한다.']},
 {npc:'ahab',midboss:true,text:['바다를 잃은 백경의 그림자가 유리 수면을 지난다. 에이해브의 작살은 물 아래보다 당신의 결심을 겨눈다.','거울은 살아남은 사람에게 사냥의 결말을 보여 준다. 백경을 죽인 뒤에도 사냥꾼의 빈자리는 채워지지 않는다.','거울의 마녀가 백경의 상처를 증거로 내민다. 상처를 구할 것인가, 봉인할 것인가, 상처를 만든 사슬을 쫓을 것인가?']},
 {npc:'queen',midboss:false,text:['왕성의 문은 모든 손님에게 죄목을 붙인다. 여왕의 도장은 질서를 약속하며 지나간 선택까지 고쳐 쓴다.','여왕은 끝없는 예외가 세계를 찢는다고 믿는다. 앨리스의 목소리를 법 안에 남길 방법을 묻는다.','집행관은 내려진 판결만 읽을 뿐 증언을 듣지 않는다. 당신이 모은 목소리를 왕성의 중심에 돌려주어야 한다.']},
 {npc:'quixote',midboss:false,text:['모래를 건너는 배 옆에서 돈키호테가 풍차 그림자에 방패를 든다. 에이해브는 그것이 백경의 길이라고 말한다.','산초는 물통을 나누며 꿈이 사람을 먹여 살릴 수 있느냐고 묻는다. 꿈을 버리지 않고도 오늘을 버틸 길을 찾는다.','예언자는 이미 쓰인 마지막 항해를 내민다. 돌아올 사람의 이름을 먼저 적으면 다른 결말도 가능한가?']},
 {npc:'alice',midboss:true,text:['달빛이 비추는 서가에 앨리스의 증언과 빅터의 실험 기록이 나란히 놓여 있다. 두 책은 서로를 오류라 부른다.','사서는 이름을 한 문장으로 고정하면 죽음을 막을 수 있다고 말한다. 고정된 사람은 새로운 선택을 할 수 없다.','마지막 서가에는 아직 쓰지 않은 여백이 남았다. 법정의 질서와 사람의 자유를 함께 기록할 방법을 골라야 한다.']},
 {npc:'victor',midboss:false,text:['식지 않는 용광로 앞에서 빅터는 실패한 창조물의 이름을 센다. 거인은 이름보다 명령에 먼저 반응한다.','피조물의 심장과 사람들의 불씨를 잇는 회로가 드러난다. 생명을 재료로 쓰지 않으려면 책임을 나누어야 한다.','봉합 거인에게는 창조주의 명령과 스스로 살고 싶은 마음이 충돌한다. 심장을 멈추기 전에 그의 목소리를 들어야 한다.']},
 {npc:'creature',midboss:false,text:['새벽 없는 왕좌로 가는 길에 되찾은 이름들이 모인다. 당신의 동료는 어떤 선택이 자신들을 여기로 데려왔는지 기억한다.','편집자는 모든 이야기를 하나의 결말로 정리하겠다고 말한다. 지워질 이름을 지킬 힘은 장비보다 지난 선택에서 나온다.','첫 불씨 안에서 왕관과 여백이 함께 빛난다. 구한 사람들, 따랐던 법, 끝까지 쫓은 사냥이 마지막 문장을 기다린다.']}
];

C.CHAPTER_DECISIONS=[
 [
  {question:'앨리스의 증언을 법정의 소각 명령에서 어떻게 지킬 것인가?',choices:[
   {label:'증언을 숨겨 생존자의 이름을 지킨다',result:'앨리스와 주민은 보호되지만 법정의 추적을 감수해야 한다.',short:'증언을 숨겨 이름을 지켰다'},
   {label:'증언을 법정 기록고에 봉인한다',result:'당장의 추적은 멈추지만 증언은 법정의 통제 아래 남는다.',short:'증언을 법정에 봉인했다'},
   {label:'증언을 미끼로 명령의 출처를 추적한다',result:'배후의 단서를 얻지만 주민 보호는 늦어진다.',short:'소각 명령의 배후를 추적했다'}]},
  {question:'뿌리에 묶인 주민들의 이름과 기억을 어떻게 되돌릴 것인가?',choices:[
   {label:'뿌리를 풀어 이름을 가족에게 돌려준다',result:'사람들은 기억을 되찾지만 숲의 봉인이 약해진다.',short:'묶인 이름을 풀어 돌려주었다'},
   {label:'이름을 복사한 뒤 뿌리를 다시 봉인한다',result:'기록은 남지만 주민의 자유로운 기억은 제한된다.',short:'이름을 기록하고 뿌리를 봉인했다'},
   {label:'이름을 묶은 자의 흔적부터 추적한다',result:'배후 단서를 얻는 동안 피해자들은 조금 더 기다려야 한다.',short:'이름을 묶은 자를 추적했다'}]},
  {question:'파수꾼을 움직이는 외부 명령을 어떻게 끝낼 것인가?',choices:[
   {label:'명령 각인을 부숴 파수꾼을 해방한다',result:'파수꾼은 자유를 얻지만 숲의 방어선이 약해진다.',short:'파수꾼의 명령 각인을 부쉈다'},
   {label:'명령권을 법정의 관리 체계로 넘긴다',result:'질서는 유지되지만 파수꾼은 계속 통제받는다.',short:'파수꾼의 명령권을 법정에 넘겼다'},
   {label:'명령 신호를 따라 배후의 근원을 쫓는다',result:'근원에 가까워지지만 지금의 위협은 남는다.',short:'파수꾼의 명령 근원을 추적했다'}]}
 ],
 [
  {question:'피조물이 고친 등불을 마을이 어떻게 받아들이게 할 것인가?',choices:[
   {label:'피조물에게 등불 수리를 맡기고 주민과 함께 쓴다',result:'마을은 빛을 되찾지만 피조물을 두려워하는 주민과 충돌할 수 있다.',short:'피조물과 주민이 등불을 함께 쓰게 했다'},
   {label:'수리 과정을 등록하고 사용 규칙을 만든다',result:'마을은 안정되지만 피조물의 행동은 감시받는다.',short:'등불 사용을 규칙 아래 두었다'},
   {label:'등불의 힘이 어디서 오는지 추적한다',result:'근원 단서를 얻지만 마을의 어둠은 더 오래 이어진다.',short:'등불의 힘을 추적했다'}]},
  {question:'빅터의 기록에 재료로 적힌 주민들의 이름을 어떻게 처리할 것인가?',choices:[
   {label:'재료 목록을 지우고 사람의 이름으로 되돌린다',result:'주민의 존엄은 회복되지만 실험 기록 일부를 잃는다.',short:'재료 목록을 사람의 이름으로 되돌렸다'},
   {label:'기록을 증거로 보존하고 이름을 공식 등록한다',result:'증거는 남지만 주민들은 다시 제도의 기록 속에 묶인다.',short:'실험 기록을 증거로 보존했다'},
   {label:'목록을 따라 사라진 사람들의 행방을 추적한다',result:'실험의 경로를 찾지만 기록 정정은 뒤로 미뤄진다.',short:'사라진 주민들의 행방을 추적했다'}]},
  {question:'기억을 지우는 종탑을 계속 사용할 것인가?',choices:[
   {label:'기억 삭제 기능을 멈추고 다른 동력을 찾는다',result:'사람들의 기억은 지키지만 마을은 한동안 정전된다.',short:'종탑의 기억 삭제 기능을 멈췄다'},
   {label:'삭제 범위를 제한해 종탑을 계속 가동한다',result:'마을 기능은 유지되지만 일부 기억의 희생을 받아들여야 한다.',short:'종탑을 제한적으로 가동했다'},
   {label:'종탑의 동력선을 따라 원천을 추적한다',result:'근원에 다가가지만 위험한 장치는 계속 작동한다.',short:'종탑의 동력 근원을 추적했다'}]}
 ],
 [
  {question:'유리 늪에 나타난 백경의 그림자에 어떻게 대응할 것인가?',choices:[
   {label:'공격을 멈추고 백경의 상처부터 살핀다',result:'불필요한 사냥은 피하지만 백경을 놓칠 수 있다.',short:'백경의 상처를 먼저 살폈다'},
   {label:'포획 구역을 정하고 접근을 통제한다',result:'주민 피해는 줄지만 백경은 자유를 잃는다.',short:'백경 포획 구역을 설정했다'},
   {label:'에이해브와 즉시 흔적을 따라간다',result:'추적 기회를 얻지만 주변 사람의 안전 확인이 늦어진다.',short:'에이해브와 백경을 추적했다'}]},
  {question:'거울이 보여준 “사냥의 결말”을 어떻게 받아들일 것인가?',choices:[
   {label:'거울을 깨고 정해진 결말을 거부한다',result:'미래의 강박에서 벗어나지만 중요한 경고도 잃는다.',short:'거울의 예언을 깨뜨렸다'},
   {label:'예언을 기록하고 위험을 대비한다',result:'경고를 활용할 수 있지만 사람들은 예언에 얽매이기 쉽다.',short:'거울의 예언을 기록했다'},
   {label:'거울 속 흔적으로 백경의 다음 위치를 계산한다',result:'추적에는 유리하지만 사냥이 다시 중심이 된다.',short:'예언을 백경 추적에 이용했다'}]},
  {question:'백경의 상처를 본 뒤 무엇을 우선할 것인가?',choices:[
   {label:'상처를 치료하고 백경을 풀어준다',result:'백경의 생명은 지키지만 위협이 다시 돌아올 가능성이 있다.',short:'백경을 치료해 풀어주었다'},
   {label:'상처를 보존한 채 백경을 봉인한다',result:'위협은 통제되지만 백경은 갇힌다.',short:'백경을 봉인했다'},
   {label:'상처를 만든 사슬의 주인을 추적한다',result:'근원에 접근하지만 백경의 처치는 미뤄진다.',short:'백경의 사슬을 추적했다'}]}
 ],
 [
  {question:'왕성의 문이 붙인 죄목을 어떻게 넘어설 것인가?',choices:[
   {label:'억울한 사람을 보호하며 죄목 자체에 이의를 제기한다',result:'사람은 지키지만 왕성의 적대가 커진다.',short:'왕성의 죄목에 공개적으로 맞섰다'},
   {label:'임시 죄목을 받아들이고 절차대로 입성한다',result:'안전하게 들어가지만 부당한 규칙을 인정한 셈이 된다.',short:'법정 절차에 따라 왕성에 들어갔다'},
   {label:'도장을 훔쳐 누가 죄목을 고쳐 쓰는지 추적한다',result:'배후 단서를 얻지만 즉시 도움을 주지 못한다.',short:'죄목을 조작한 자를 추적했다'}]},
  {question:'앨리스의 목소리를 법 안에 남길 방법을 어떻게 정할 것인가?',choices:[
   {label:'법 밖에서도 증언을 공개해 누구나 듣게 한다',result:'목소리는 살아남지만 법정과의 충돌은 커진다.',short:'앨리스의 증언을 공개했다'},
   {label:'법을 고쳐 증언을 공식 기록으로 인정한다',result:'제도 안에 남지만 법정의 기준을 통과해야 한다.',short:'앨리스의 증언을 법 안에 등록했다'},
   {label:'지워진 예외 기록을 따라 조작의 흔적을 찾는다',result:'배후는 찾지만 현재 판결은 당장 바뀌지 않는다.',short:'법정의 기록 조작을 추적했다'}]},
  {question:'증언을 듣지 않는 집행관의 판결을 어떻게 멈출 것인가?',choices:[
   {label:'집행을 막고 증인들의 말을 먼저 듣는다',result:'사람은 구하지만 왕성의 질서를 정면으로 거스른다.',short:'집행을 멈추고 증언을 들었다'},
   {label:'재심 절차를 열어 판결을 다시 검토한다',result:'절차는 지키지만 시간이 걸린다.',short:'판결을 재심에 넘겼다'},
   {label:'거짓 판결을 내린 권한의 출처를 추적한다',result:'배후를 찾지만 현재 피해자는 더 기다려야 한다.',short:'거짓 판결의 배후를 추적했다'}]}
 ],
 [
  {question:'사막에서 보이는 거대한 그림자를 어떻게 확인할 것인가?',choices:[
   {label:'여행자부터 보호하고 그림자의 정체를 살핀다',result:'사람은 안전하지만 추적 기회를 놓칠 수 있다.',short:'여행자를 보호하며 그림자를 조사했다'},
   {label:'안전 구역을 정하고 추적을 금지한다',result:'질서는 생기지만 사람들의 자유로운 이동이 제한된다.',short:'사막에 안전 구역을 설정했다'},
   {label:'에이해브와 함께 그림자를 즉시 쫓는다',result:'단서를 얻지만 뒤에 남은 사람들의 위험이 커진다.',short:'사막의 그림자를 추적했다'}]},
  {question:'물과 꿈이 모두 부족한 상황에서 무엇을 우선할 것인가?',choices:[
   {label:'물을 나누고 원정대를 끝까지 함께 데려간다',result:'누구도 버리지 않지만 이동 속도가 크게 느려진다.',short:'물을 나누며 모두와 이동했다'},
   {label:'배급 규칙을 정해 생존 가능성을 높인다',result:'자원은 오래가지만 누군가는 충분히 받지 못한다.',short:'물 배급 규칙을 세웠다'},
   {label:'정찰대에 자원을 몰아 오아시스를 찾게 한다',result:'성공하면 큰 이득이지만 남은 사람들은 당장 부족해진다.',short:'정찰대에 자원을 집중했다'}]},
  {question:'이미 쓰인 마지막 항해를 그대로 따를 것인가?',choices:[
   {label:'귀환할 사람의 이름부터 적어 결말을 바꾼다',result:'살아 돌아올 가능성은 늘지만 예언의 질서가 무너진다.',short:'귀환자의 이름으로 예언을 바꿨다'},
   {label:'승선 명단을 확정해 예언을 관리한다',result:'혼란은 줄지만 정해진 결말을 받아들이게 된다.',short:'예언의 승선 명단을 확정했다'},
   {label:'예언서를 찢고 그것을 쓴 자를 추적한다',result:'근원을 쫓지만 항해의 즉각적인 안전책은 사라진다.',short:'예언의 작성자를 추적했다'}]}
 ],
 [
  {question:'서로 모순되는 두 기록 중 무엇을 진실로 남길 것인가?',choices:[
   {label:'두 기록을 모두 보존해 당사자들이 판단하게 한다',result:'다양한 목소리는 남지만 혼란도 함께 남는다.',short:'두 기록을 모두 보존했다'},
   {label:'증거를 비교해 하나의 공식 기록을 만든다',result:'기준은 분명해지지만 다른 목소리는 주변부로 밀린다.',short:'공식 기록을 하나로 정리했다'},
   {label:'두 기록을 충돌시킨 편집자의 흔적을 추적한다',result:'조작의 배후를 찾지만 현재의 혼란은 계속된다.',short:'기록을 조작한 편집자를 추적했다'}]},
  {question:'이름을 고정하면 죽음을 막을 수 있지만 선택도 멈춘다. 어떻게 할 것인가?',choices:[
   {label:'이름이 계속 바뀔 자유를 지킨다',result:'사람은 자유롭지만 죽음의 위험도 다시 받아들여야 한다.',short:'변할 수 있는 이름을 지켰다'},
   {label:'동의한 사람만 이름을 고정해 보호한다',result:'보호와 선택을 절충하지만 제도의 관리가 필요하다.',short:'동의한 이름만 고정했다'},
   {label:'이름 고정의 저주에 틈이 있는지 추적한다',result:'근본 해결 가능성은 생기지만 즉시 보호는 어렵다.',short:'이름 고정의 근원을 추적했다'}]},
  {question:'마지막 서가의 빈 여백에 어떤 원칙을 남길 것인가?',choices:[
   {label:'누구나 자신의 문장을 덧쓸 수 있게 남긴다',result:'자유로운 결말은 가능하지만 통일된 질서는 사라진다.',short:'여백을 모두에게 열어두었다'},
   {label:'자유와 질서를 함께 지킬 규칙을 적는다',result:'안정은 생기지만 규칙 밖의 선택은 제한될 수 있다.',short:'여백에 공통 규칙을 적었다'},
   {label:'아무것도 쓰지 않고 편집자를 찾아간다',result:'빈 가능성은 지키지만 당장의 기준은 남지 않는다.',short:'여백을 비우고 편집자를 추적했다'}]}
 ],
 [
  {question:'명령에만 반응하는 봉합 거인을 어떻게 대할 것인가?',choices:[
   {label:'거인에게 자신의 이름과 선택을 가르친다',result:'자아를 얻을 가능성은 생기지만 통제가 어려워진다.',short:'거인에게 스스로 선택하게 했다'},
   {label:'명령 체계를 점검하고 책임자를 지정한다',result:'사고는 줄지만 거인은 계속 명령에 묶인다.',short:'거인의 명령 체계를 관리했다'},
   {label:'명령이 내려오는 중심 장치를 추적한다',result:'근본 원인을 찾지만 거인은 당분간 그대로 남는다.',short:'거인의 명령 장치를 추적했다'}]},
  {question:'피조물의 심장과 사람들의 불씨를 잇는 회로를 어떻게 바꿀 것인가?',choices:[
   {label:'자발적으로 나눈 불씨만 사용하게 바꾼다',result:'생명 착취는 멈추지만 동력이 부족해질 수 있다.',short:'불씨를 자발적으로 나누게 했다'},
   {label:'공식 규칙 아래 불씨 사용량을 제한한다',result:'안정적이지만 사람들의 생명이 여전히 자원으로 취급될 위험이 있다.',short:'불씨 사용을 규제했다'},
   {label:'회로를 끊고 최초 동력원을 추적한다',result:'착취는 중단되지만 피조물의 심장도 불안정해진다.',short:'회로를 끊고 동력원을 추적했다'}]},
  {question:'봉합 거인의 의지와 창조주의 명령이 충돌한다. 누구의 결정을 따를 것인가?',choices:[
   {label:'명령을 해제하고 거인의 선택을 따른다',result:'거인은 자유를 얻지만 결과를 스스로 감당해야 한다.',short:'거인의 자유 의지를 선택했다'},
   {label:'거인의 동의를 받아 필요한 명령만 남긴다',result:'통제와 동의를 절충하지만 완전한 자유는 아니다.',short:'동의한 명령만 남겼다'},
   {label:'통제 장치를 파괴하고 창조주의 흔적을 추적한다',result:'근원을 좇지만 거인의 상태는 불안정해진다.',short:'통제 장치를 파괴하고 창조주를 추적했다'}]}
 ],
 [
  {question:'왕좌로 모인 사람들의 서로 다른 기억을 어떻게 남길 것인가?',choices:[
   {label:'각자의 증언을 그대로 말하게 한다',result:'모든 목소리는 남지만 서로 충돌하는 결말도 함께 남는다.',short:'각자의 증언을 그대로 남겼다'},
   {label:'증언을 정리해 하나의 공적 기록으로 만든다',result:'역사는 읽기 쉬워지지만 일부 차이는 사라진다.',short:'증언을 공적 기록으로 정리했다'},
   {label:'기억의 모순을 만든 조작자를 추적한다',result:'배후를 찾지만 사람들의 현재 갈등은 해결되지 않는다.',short:'기억을 조작한 자를 추적했다'}]},
  {question:'편집자가 모든 이야기를 하나의 결말로 만들려 한다. 어떻게 막을 것인가?',choices:[
   {label:'여러 결말이 동시에 존재하도록 지킨다',result:'사람들의 선택은 남지만 세계의 불안정도 감수해야 한다.',short:'여러 결말을 지켰다'},
   {label:'모두가 동의할 최소한의 결말을 협상한다',result:'안정은 얻지만 완전히 자유로운 결말은 아니다.',short:'공통 결말을 협상했다'},
   {label:'편집자를 쓰러뜨려 결말 강제를 끝낸다',result:'강제는 멈추지만 이후 질서를 누가 맡을지 불분명하다.',short:'편집자를 추적해 결말 강제를 끊었다'}]},
  {question:'첫 불씨를 누구의 손에 맡길 것인가?',choices:[
   {label:'불씨를 사람들에게 나눠 각자의 이야기를 지키게 한다',result:'힘은 분산되지만 누구도 결말을 독점하기 어려워진다.',short:'첫 불씨를 사람들에게 나누었다'},
   {label:'규칙과 책임 아래 불씨를 관리한다',result:'세계는 안정되지만 관리자가 큰 권한을 갖는다.',short:'첫 불씨를 규칙 아래 관리했다'},
   {label:'불씨를 묶은 사슬을 끊고 근원을 끝까지 추적한다',result:'지배 구조는 무너지지만 이후 세계는 예측하기 어려워진다.',short:'첫 불씨의 사슬을 끊었다'}]}
 ]
];
for(const ch of C.CHAPTERS)ch.candidates=['outer-story','outer-battle','outer-event','outer-cache','depth-battle','depth-elite','depth-npc','depth-secret','depth-merchant','depth-mystery','core-story','core-elite',ch.midboss?'core-midboss':'core-battle','core-shrine','core-checkpoint','core-boss'];
P.sector=function(){return this.s.step<4?'외곽':this.s.step<8?'심부':'중심부';};P.limit=function(){return this.s.kind==='rift'?4:12;};
const travel=P.travel;P.travel=function(a){if(this.s.scene!=='camp'||this.s.checkpoint)return;travel.call(this,a);if(this.s.scene==='map'&&this.s.kind==='story'){this.s.storyFlags['chapter_'+this.s.area+'_entered']=true;this.note(C.AREAS[this.s.area].subtitle+'\n앞에 무엇이 기다리는지는 알 수 없다.');}};
const oldroutes=P.routes;P.routes=function(){if(this.s.kind==='rift')return oldroutes.call(this);const s=this.s;if(s.step>=12){s.routes=['boss'];return;}const pools=[{battle:35,event:22,cache:20,shrine:8,merchant:7,mystery:8},{battle:24,elite:18,event:18,cache:10,npc:10,secret:9,mystery:11},{battle:20,elite:22,event:12,shrine:16,secret:9,merchant:7,mystery:14}];const pool=pools[Math.min(2,Math.floor(s.step/4))];let type=null;
 if([0,4,8].includes(s.step))type='story';else if(s.step===5)type='npc';else if(s.step===3||s.step===7||s.step===11)type='checkpoint';else if(s.step===10&&C.CHAPTERS[s.area].midboss&&!s.midbosses.includes(s.area))type='midboss';else if(s.secretPity>=11)type='secret';else type=this.weighted(Object.entries(pool));s.routes=[type];};
const choose=P.choose;P.choose=function(i){const s=this.s;if(s.scene!=='map'||!s.routes[i])return;const type=s.routes[i];if(!['story','npc','checkpoint','midboss'].includes(type))return choose.call(this,i);const sector=Math.min(2,Math.floor(s.step/4));s.turns++;s.step++;s.secretPity++;if(type==='story'){s.scene='chapter';s.chapterSector=sector;this.note(C.CHAPTERS[s.area].text[sector]);return;}if(type==='npc'){const id=C.CHAPTERS[s.area].npc;s.storyFlags[id+'_seen']=true;if(s.npcVisits[id]===s.cleared.length){s.scene='reward';this.note(C.NPCS[id].name+'는 지난 대화를 기억한다. “다음 인장을 되찾으면 다시 이야기하자.”');}else{s.thread=id;s.npcReturn='reward';s.scene='npc';this.note(C.NPCS[id].text+'\n관계: '+this.affinityTier(id));}return;}if(type==='checkpoint'){s.hp=this.maxHp();s.mp=this.maxMp();s.scene='reward';this.note('바람을 피할 수 있는 작은 공터를 발견했다. 잠시 불을 피우며 기운을 되찾는다. HP·MP가 회복되었다.');return;}if(type==='midboss'){this.fight(true);s.enemy.midboss=true;s.enemy.name=C.AREAS[s.area].name+'의 수문장';s.enemy.hp=s.enemy.maxHp=Math.round(s.enemy.maxHp*.7);this.note(s.enemy.name+'가 중심부로 가는 길을 막는다.');}};
P.chapterChoice=function(i){const s=this.s;if(s.scene!=='chapter'||![0,1,2].includes(i))return;const record='chapter_'+s.area+'_'+s.chapterSector;if(s.decisions[record]){s.scene='reward';this.note('이미 남긴 선택: '+s.decisions[record]+'. 같은 사건의 보상은 다시 받지 않는다.');return;}const id=C.CHAPTERS[s.area].npc,faction=['lantern','ink','hunt'][i],choice=C.CHAPTER_DECISIONS[s.area][s.chapterSector].choices[i];s.factions[faction]=Math.min(100,s.factions[faction]+1);this.addAffinity(id,i===0?5:i===1?-2:2);s.storyFlags['chapter_'+s.area+'_seen']=true;s.storyFlags[id+'_seen']=true;s.decisions[record]=choice.short;s.scene='reward';this.note(choice.short+'.\n'+choice.result+'\n'+C.NPCS[id].name+' 호감도 '+(i===0?'+5':i===1?'−2':'+2')+' · '+C.FACTIONS.find(x=>x.id===faction).name+' 평판 +1.');};
P.pauseChapter=function(){const s=this.s;if(s.kind!=='story'||!['reward','map'].includes(s.scene)||![4,8,12].includes(s.step))return;if(s.scene==='reward')this.routes();s.checkpoint={area:s.area,step:s.step,routes:[...s.routes]};s.scene='camp';this.note('야영 지점에서 탐험을 보존했다. 정비 후 같은 지점에서 이어갈 수 있다.');};
P.resumeChapter=function(){const s=this.s,c=s.checkpoint;if(s.scene!=='camp'||!c)return;s.area=c.area;s.step=c.step;s.kind='story';s.checkpoint=null;s.scene='map';s.routes=[...c.routes];this.note(C.AREAS[s.area].name+' · '+this.sector()+' 탐험을 이어 간다.');};
P.abandonChapter=function(){if(this.s.scene!=='camp'||!this.s.checkpoint)return;this.s.checkpoint=null;this.s.step=0;this.s.routes=[];this.note('보존한 진행을 포기했다. 다음 탐험은 입구에서 시작한다.');};
const npc=P.npcChoice;P.npcChoice=function(i){const back=this.s.npcReturn||'camp';npc.call(this,i);if(this.s.scene==='camp'){this.s.storyFlags[this.s.thread+'_seen']=true;this.s.scene=back;this.s.npcReturn='camp';}};
const meet=P.meetNpc;P.meetNpc=function(id){meet.call(this,id);if(this.s.scene==='npc'){this.s.storyFlags[id+'_seen']=true;this.s.npcReturn='camp';}};
const thread=P.thread;P.thread=function(id){thread.call(this,id);if(this.s.scene==='dialogue')this.s.storyFlags[(id==='adam'?'creature':id)+'_seen']=true;};
root.BlackForest.CHAPTERS=C.CHAPTERS;root.BlackForest.CHAPTER_DECISIONS=C.CHAPTER_DECISIONS;
})(globalThis);
