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

## V-4 보상·직업·장비

hero가 없는 장비 보상도 viewport 대상으로 포함했다. 실제 아이템 카드/비교는 독립 스크롤, 현재 장비·발견 기록은 details, 획득/보관 2열과 판매 단독 행은 하단에서 52px을 유지한다. 새 이미지나 데이터는 없다. 전직 후보는 가능 여부/완료 개수를 먼저 표시하고 전체 조건을 details로 유지한다. 장비 선택은 기존 ‘비교 중/장착 중’ 및 착용 버튼으로 구분하고 3슬롯/원본 2:3 그림/기존 sheet를 유지한다. Chromium 4크기에서 장비 보상 행동 3개가 모두 보이고 직업·장비 모달 규격/원본 저장 불변을 검증했다.

## V-5 높이·포함 문서·회전

100dvh fallback과 실제 visualViewport 높이/게임 위 호스트 영역을 사용한다. safe area는 CSS env로만 처리하고 고정된 상태바/홈바 수치는 사용하지 않는다. viewport resize는 레이아웃만 갱신하며 진행 타이머가 없다. Chromium에서 80px 호스트 영역, 390×664 실제 iframe, 가로/세로 회전, 원문 키보드 End, 중첩 메뉴·직접 입력의 원본 거래/단일 form을 검증했다. 매우 낮은 높이는 이미지/서술 우선 축소 후 행동 영역 자체 스크롤을 허용한다. desktop/캠프/엔딩은 원래 전체 페이지 흐름을 유지한다.

## 테스트 기준 변경 이유

기존 UI 테스트의 첫 탐험 350px 최소 이미지 및 내부 스크롤 금지는 이번 요청과 직접 충돌한다. viewport 모드에는 그림 전체 contain/화면 내 배치와 keyboard region/원문 모달을 검사하고, 기존 페이지 모드에는 원래 기준을 유지했다. 기존 스토리/선택/모달/장비/저장/전투/불량 저장/이미지/해금/수동 진행 테스트는 삭제하지 않았다. 번호 직접 입력 테스트는 새 메뉴 경로를 실제 클릭한 뒤 같은 기존 명령 및 결과를 검증한다.

## V-6 검증 및 증거

[동일 상태 전후 40장 및 높이 실측](single-screen/COMPARISON.md). 시드17 탐험/전투, 기존 실제 P3 camp 저장, 실제 시드 전설 구매를 사용했다. 전체 캠페인을 사람이 끝까지 플레이한 결과라고 주장하지 않는다.

| 검사 | 결과 / 증거 |
|---|---|
| 네 요청 viewport × 탐험/전투/보상/직업/장비 | Chromium/WebKit PASS, 각20상태. 탐험3/전투5/보상3행동은 모두 페이지 스크롤 없이 보임. `single-screen/ui-*.json` |
| 52px/텍스트/가로 overflow 및 원문 모달/Escape | PASS, 동일 상태 저장/RNG 불변 포함 |
| 원문 키보드·중첩 메뉴·직접 명령·회전·inline host·iframe | Chromium/WebKit PASS, `single-screen/layout-*.json` |
| 기존 FX·일반/reduced·빠른 중복·보스·히든·엔딩·재접속 | Chromium/WebKit 각3폭×2모드 PASS, `single-screen/fx/ui-*.json` |
| 기존 전체 B안 버튼·114스킬·21이벤트·2테마 | Chromium PASS, 495상태·3576 주요 버튼. `single-screen/full-b/ui-chromium.json` |
| 기존 UI/여정·모달·장비·전직 잠금·번호 명령·불량 저장·엔딩·히든/이미지 | Chromium 360×800/390×664/430×932 PASS, `single-screen/existing-browser-results.txt` |
| npm test / FX 엔진 | PASS, 기존 모든 suite 실행. FX 3648 저장/RNG 대조. `single-screen/unit-results.txt`, `single-screen/fx/logic.json` |
| 114직업/1000장비/174 engine·CSV·asset/클릭 처리/FX descriptor 보존 | PASS, `test-ui-b-invariants.cjs` |
| 빌드/HTML 경계/이미지 경로/문장·수치 회귀 | PASS. 두 생성 HTML 일치, 149개 연결 파일·270선택·156 원문 수치 회귀 |
| Firefox | 로컬 sandbox 초기화 제한으로 NOT TESTED. 실제 실행은 PR CI의 Firefox job을 최종 기준으로 한다 |
| PR CI | 최신 PR Checks를 최종 기준으로 한다. 기존 전체 workflow를 유지하고 3엔진에 4크기·원문·iframe 검증 추가 |
| 실제 기기 주소창/노치/OS 글자 확대·장시간/FPS | NOT TESTED |
| 공개 후속 UI | NOT TESTED. 사용자 승인 전 공개 버전을 유지 |

상단 HUD는 실제 정보와 44px 보조 조작을 보존해 약73~84px이며 목표56px보다 높다. 상태가 추가되면 상태 줄이 늘어난다. 원문 기본 높이는112px, 낮은 높이는 더 줄고 내부 스크롤을 허용한다. 아주 낮은 화면/긴 스킬·이벤트는 행동 영역 자체 스크롤이 필요할 수 있고, 일부 지역 이미지의 모바일 존재감은 사용자 전후 화면 검토 대상이다. 색상/분위기/몰입은 자동 PASS만으로 평가하지 않는다.

앱 소스는 `ui.js`/`style.css` 및 생성 HTML 두 개만 변경했다. `shell.html`/`build.py`/`ui-fx.js`와 모든 게임 처리/이미지/데이터는 변경하지 않았다. standalone HTML과 iframe에서 동일한 실제 DOM을 사용한다. 게임 상태 포맷/수동 입력/RNG/보상 지급 시점은 유지한다.

기존 클라우드 환경의 Node/Python/Playwright/Chromium/WebKit 및 저장된 설치·시작 지침을 재사용했다. 추가 의존성·lockfile·네트워크/비밀 설정 변경은 없으며 테스트용 HTTP 프로세스는 다음 환경에서 다시 시작해야 한다. main 및 Pages 반영은 사용자 실제 화면 승인까지 보류한다.
