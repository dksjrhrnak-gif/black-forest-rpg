# PR #8 + PR #9 통합 인수인계

## 기준 및 승인

- 시작 main: `8869de4f651dc97e9b8cf8faec356cce31a913cd` (PR #9 병합/공개 완료).
- 기존 PR #8 HEAD: `1dccf842777f9d7e25adfba7ca6d5fb8c78f928e`.
- 기존 브랜치 유지: `qa/single-screen-mobile-ui`. 로컬 백업: `backup/pr8-pre-pr9-integration-20261015`.
- main 통합 merge commit: `95e699a`; UI 통합 소스 HEAD: `8c9c3b6a35a90fccd38a04a31973779841f6efbf`. 이 문서/QA 자료의 후속 커밋까지 포함한 PR 최종 HEAD는 [PR #8](https://github.com/dksjrhrnak-gif/black-forest-rpg/pull/8)의 최신 커밋을 기준으로 한다.
- 사용자의 이번 통합 지시가 이전 UI 문서의 승인 대기 조건을 대체한다. 필수 검사 통과 후 PR #8 병합·Pages 배포·공개 QA까지 승인되었다.

## 충돌과 해결

실제 충돌 파일 3개: `.github/workflows/handoff-audit.yml`, `index.html`, `black-forest.html`.

workflow는 양쪽 실행 브랜치·강제 전직/한 화면 검사를 모두 보존했다. local preview를 실행하는 p3-browser job에서 두 기능을 검증하고, 서버가 없는 live-pages job의 중복 local 검사는 배포 완료 후 공개 한 화면 검사로 연결했다. 로컬 preview 서버 준비도 먼저 확인한다. 생성 HTML은 소스 해결 후 `python3 build.py && node export-data.cjs && python3 export-site.py && python3 verify-html.py`로 다시 생성했다.

`ui.js`와 `test-p2-ui.cjs`는 자동 병합됐으나 수동 검수했다. read-only snapshot hook, PR #8 viewport/원문/메뉴, PR #9 명시적 전직 선택 helper가 모두 남아 있다. build.py/모듈 순서/forced-career.js/원래 게임 처리/FX descriptor/클릭 처리/이미지는 되돌리지 않았다. shell과 현재 main의 게임 JS·CSV·이미지 176개가 byte-identical이다.

## 실제 통합 변경

탐험/전투는 압축 HUD→contain 원본 이미지→키보드 접근 가능한 원문 스크롤/전체 보기→52px 행동을 유지한다. 탐험3·전투5·보상3 행동은 네 요청 viewport에서 페이지를 내리지 않고 보인다. 장비는 기존3슬롯과 비교/목록 스크롤을 유지한다.

강제 전직은 PR #9 로직 그대로다. 최초1/3/6지역 보상 확정 후 Tier1/2/3, 후보 선택·확정, 진행 차단, 히든 예외, 인장 구제, 과거 저장 정책을 보존한다. 전직 화면에 현재 장비 기준 HP/MP/공격/방어의 실제 변화(기존 전직의 HP/MP 회복 포함)를 읽기 전용 복제 상태에서 표시한다. 실제 Game·저장·RNG는 변경하지 않는다. 미수령 보스의 전직 예고는 원문 스크롤 밖, 보상 행동 위에 고정해 중요한 안내가 가려지지 않게 했다. 네 크기 모두 예고와 보상3행동의 화면 내 위치도 검사한다. 확정 후 기존 단일 BFUIFX 컨트롤러로 완료 배너를 표시한다. 로드/미리보기에는 완료 FX를 재생하지 않는다.

## 완료한 로컬 검증

| 검사 | 실제 결과 |
|---|---|
| npm test | 전체 PASS, [로그](pr8-pr9-integration/npm-test.log) |
| PR #9 main 대조 | 114직업×3보스×장착/보관/판매=1,026 사례, 보상1,026, 실제 승급540, 저장3,678, 전체 상태/RNG exact; [결과](pr8-pr9-integration/logic.json) |
| 기존 강제 전직 감사 | 342 상태/보상, 우회1,500, 복원1,085 PASS |
| 기존 FX 엔진 | 3,648턴/복원/RNG exact PASS; [결과](pr8-pr9-integration/fx-logic.json) |
| Chromium/WebKit 강제 전직 | 각24 actual attack→claim→select→confirm→reload→next area, 네 크기×normal/reduced×3단계 PASS; [C](pr8-pr9-integration/forced/ui-chromium.json), [W](pr8-pr9-integration/forced/ui-webkit.json) |
| 강제 전직 UI | 52px·10px·15px/600, 후보의 실제 능력치 변화 일치, 미리보기 무과금/RNG 불변, 완료 배너1개 화면 내 표시, 빠른 이중 확정/중복 지급 차단 |
| 한 화면 | Chromium/WebKit 각20 화면 PASS; [C](pr8-pr9-integration/single-screen/ui-chromium.json), [W](pr8-pr9-integration/single-screen/ui-webkit.json) |
| 원문/키보드/회전/iframe/호스트offset/중첩 메뉴 | Chromium/WebKit PASS. WebKit 초기 회전100ms 검사 실패는 실제 viewport 갱신 대기 후 동일 위치 assert로 안정화, 기준 삭제/완화 없음 |
| 보존 검사 | 기존174 및 현재 main176 파일/직업114/장비1000/클릭 처리/FX descriptor PASS |
| Firefox/CI | 로컬 Firefox는 이 환경의 sandbox 제한으로 미실행. 실제 3엔진 PR/main CI를 최종 기준으로 기록한다 |

브라우저 전직 검사는 유효한 보스 직전 저장을 쓰는 실제 버튼 조작 자동화다. 사람의 연속 자연 플레이를 의미하지 않는다. 기존 자연 진행·P1/P2/P3·히든·엔딩·BF1/BF2/BF3 호환성 검사는 기존 전체 CI를 유지하여 실행한다. 실패 검사 삭제는 없다.

## 실제 높이 (Chromium)

| 크기 | 화면 | HUD | 그림 | 원문 | 행동 영역 | 보이는 행동 |
|---|---|---:|---:|---:|---:|---:|
|390×844|탐험|84.2|286.0|112.0|173.2|3|
|390×844|전투|73.2|242.5|112.0|253.6|5|
|390×844|보상|84.2|아이템 카드|카드 스크롤|137.4|3|
|390×664|탐험|84.2|106.0|112.0|173.2|3|
|390×664|전투|73.2|62.5|112.0|253.6|5|
|390×664|보상|84.2|아이템 카드|카드 스크롤|137.4|3|

전직은 후보 목록을 독립 스크롤하고 확정은 밖에 유지한다. 캠프/엔딩/매우 짧은 가로 화면은 기존 페이지 읽기 흐름을 유지한다. 56px HUD를 강제해 실제 정보/44px 보조 조작을 숨기지 않는다.

## 실제 스크린샷

동일 시드/유효 저장/실제 브라우저의 촬영이며 이미지 합성·가상 화면은 없다. 일반 화면의 이전 비교40장은 [기존 비교](single-screen/COMPARISON.md)에 보존했다.

| 화면 | 390×844 | 390×664 |
|---|---|---|
|일반 탐험|[보기](pr8-pr9-integration/single-screen/screenshots/after-390x844-exploration.jpg)|[보기](pr8-pr9-integration/single-screen/screenshots/after-390x664-exploration.jpg)|
|일반 전투|[보기](pr8-pr9-integration/single-screen/screenshots/after-390x844-battle.jpg)|[보기](pr8-pr9-integration/single-screen/screenshots/after-390x664-battle.jpg)|
|보스 전투|[보기](pr8-pr9-integration/forced/screenshots/390x844-boss-tier-1.jpg)|[보기](pr8-pr9-integration/forced/screenshots/390x664-boss-tier-1.jpg)|
|보스 승리|[보기](pr8-pr9-integration/forced/screenshots/390x844-victory-tier-1.jpg)|[보기](pr8-pr9-integration/forced/screenshots/390x664-victory-tier-1.jpg)|
|전리품 획득|[보기](pr8-pr9-integration/forced/screenshots/390x844-loot-tier-1.jpg)|[보기](pr8-pr9-integration/forced/screenshots/390x664-loot-tier-1.jpg)|
|Tier1 전직|[보기](pr8-pr9-integration/forced/screenshots/390x844-tier-1.jpg)|[보기](pr8-pr9-integration/forced/screenshots/390x664-tier-1.jpg)|
|Tier2 전직|[보기](pr8-pr9-integration/forced/screenshots/390x844-tier-2.jpg)|[보기](pr8-pr9-integration/forced/screenshots/390x664-tier-2.jpg)|
|Tier3 전직|[보기](pr8-pr9-integration/forced/screenshots/390x844-tier-3.jpg)|[보기](pr8-pr9-integration/forced/screenshots/390x664-tier-3.jpg)|
|전직 완료|[보기](pr8-pr9-integration/forced/screenshots/390x844-completed-tier-3.jpg)|[보기](pr8-pr9-integration/forced/screenshots/390x664-completed-tier-3.jpg)|
|전직 후 탐험|[보기](pr8-pr9-integration/forced/screenshots/390x844-exploration-after-tier-3.jpg)|[보기](pr8-pr9-integration/forced/screenshots/390x664-exploration-after-tier-3.jpg)|
|장비|[보기](pr8-pr9-integration/single-screen/screenshots/after-390x844-equipment.jpg)|[보기](pr8-pr9-integration/single-screen/screenshots/after-390x664-equipment.jpg)|

## 병합·배포 및 공개 검증

필수 PR CI 완료 후 실제 main 병합 커밋·main CI·Pages run·공개 검증 결과를 아래에 추기한다. 배포 SHA/API와 공개 HTML SHA-256·149개 이미지·3개 CSV의 바이트를 대조하며 단순 HTTP200으로 최신 버전을 판정하지 않는다. 최종 run 링크/HEAD는 PR #8 설명에도 남긴다.

## 남은 미검증

실제 휴대폰 주소창/노치/OS 글자 확대, 실기기 FPS, 장시간 사람 플레이는 미검증이다. 가독성/몰입의 사람 평가는 자동 PASS로 단정하지 않는다. 기존 이미지를 재생성하거나 새로운 콘텐츠/자원을 추가하지 않았다.
