# 모바일 한 화면 UI 인수인계

기준 main: `d01469cd157dd76798673641e4128370a99e036d`. PR #7 및 FX가 병합된 실제 main에서 시작했다. 새 브랜치 `qa/single-screen-mobile-ui`; 사용자 화면 승인 전 main/Pages 반영 금지.

## V-1 현행 구조

`ui.js`가 scene hero 안에 stats를 옮기며, `.scene-visual` + HUD + 전체 서술 + `.actions`를 렌더한다. 전투의 enemy는 scene header에, HP/MP는 stats 첫 두 자식에 연결된다. `ui-fx.js`는 이 두 앵커와 기존 banner/loot DOM을 사용한다. shell은 top/play/panel/footer/downloads이며 build.py와 export-site.py가 두 HTML을 생성한다. 별도 canvas·상태 처리·자동 진행은 필요 없다.

Claude 링크는 이 환경에서 CONNECT 403으로 읽지 못했다. 확인하지 못한 시안을 구현했다고 주장하지 않으며 실제 main의 B안·원본 이미지·실제 게임 정보만 사용한다. 기존 모달은 focus trap/Escape/inert를 지원하고 장비 sheet는 독립 스크롤을 지원한다.

모바일에서 hero가 있는 화면만 가용 viewport 안에 배치한다. desktop/첫 화면/캠프/엔딩의 기존 페이지 읽기 구조를 보존한다. HUD·이미지·원문·행동을 유지하며 원문은 키보드로도 스크롤 가능한 region과 기존 모달을 활용한 전체 보기로 접근한다. 상단 save와 추가 메뉴로 숨겨진 보조 정보를 접근 가능하게 한다. iframe은 자신의 viewport를 사용하며 부모 페이지 크기를 임의 조작하지 않는다.
