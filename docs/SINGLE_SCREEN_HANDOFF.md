# 모바일 한 화면 UI 인수인계

기준 main: `d01469cd157dd76798673641e4128370a99e036d`. PR #7 및 FX가 병합된 실제 main에서 시작했다. 새 브랜치 `qa/single-screen-mobile-ui`; 사용자 화면 승인 전 main/Pages 반영 금지.

## V-1 현행 구조

`ui.js`가 scene hero 안에 stats를 옮기며, `.scene-visual` + HUD + 전체 서술 + `.actions`를 렌더한다. 전투의 enemy는 scene header에, HP/MP는 stats 첫 두 자식에 연결된다. `ui-fx.js`는 이 두 앵커와 기존 banner/loot DOM을 사용한다. shell은 top/play/panel/footer/downloads이며 build.py와 export-site.py가 두 HTML을 생성한다. 별도 canvas·상태 처리·자동 진행은 필요 없다.

Claude 링크는 이 환경에서 CONNECT 403으로 읽지 못했다. 확인하지 못한 시안을 구현했다고 주장하지 않으며 실제 main의 B안·원본 이미지·실제 게임 정보만 사용한다. 기존 모달은 focus trap/Escape/inert를 지원하고 장비 sheet는 독립 스크롤을 지원한다.

모바일에서 hero가 있는 화면만 가용 viewport 안에 배치한다. desktop/첫 화면/캠프/엔딩의 기존 페이지 읽기 구조를 보존한다. HUD·이미지·원문·행동을 유지하며 원문은 키보드로도 스크롤 가능한 region과 기존 모달을 활용한 전체 보기로 접근한다. 상단 save와 추가 메뉴로 숨겨진 보조 정보를 접근 가능하게 한다. iframe은 자신의 viewport를 사용하며 부모 페이지 크기를 임의 조작하지 않는다.

## V-2 探험

dynamic viewport에 맞춘 모바일 flex frame과 동일 HP/MP 앵커, 실제 직업/레벨/지역을 배치했다. 원본 그림은 contain, 이야기 전체 원문은 focus 가능한 내부 region과 전체 보기 모달로 유지했다. 중요한 선택 질문은 원문 영역 밖에서 계속 표시한다. menu/status/save 및 직접 입력은 기존 기능을 접근 가능한 메뉴로 보존한다. Chromium 4개 크기에서 탐험 3개 선택이 모두 화면 안에 있고 52px이며 원문 모달과 Escape 포커스 복원·저장 불변을 검증했다. 짧은 높이에서 발견한 flex stretch 문제를 수정 후 재검증했다.

## V-3 전투

전투 HP/MP 첫 두 앵커와 enemy/scene hero를 그대로 사용한다. 실제 적 HP/예고·실제 5행동과 MP 비용/효과 설명을 유지했다. 전체 읽기 버튼은 HUD에 통합해 이미지 공간을 확보했다. 중요 상태는 실제 combatStatus 결과를 표시하고 다수 상태만 제한된 내부 스크롤을 허용한다. 4개 크기의 Chromium에서 HUD·그림·5행동 모두 viewport 안이며 전체 페이지 높이가 viewport와 같음을 검증했다. HUD 목표 56px에 억지로 맞추지 않고 실제 직업/지역 및 접근 가능한 44px 보조 버튼을 보존했다.
