# 모바일 UI/UX 정밀 개선

시작 main: `4fe67d3310af9c3a22d2688305bafbef362d13eb`. 작업 브랜치: `qa/mobile-ux-refinement`.
시작 시 열린 PR은 없고 PR #8/#9는 병합 완료, main QA 21개와 Pages deployment `7084260316`은 성공이었다. 사용자 지시가 이번 UX의 필수 검증 후 main 병합·공개 배포를 승인한다. 기존 환경과 Node/Python/Playwright를 재사용했으며 의존성·lockfile·환경 설정 변경은 없다.

## 실제 코드와 개선

`ui.js`, `ui-fx.js`, `ui-promotion.js`, `style.css`, `promotion.css`, `forced-career.js`, `career.js`, `journey.js`, `shell.html`, `build.py` 및 기존 UI/FX 검사를 확인했다. 이전 Claude 링크는 이 환경에서 접근되지 않았던 자료이며, 최신 목업을 확인했다고 주장하지 않는다. 이번 지시서와 실제 배포된 B안/한 화면 DOM을 기준으로 개선했다.

| 지적 사항 | 확인 및 변경 |
|---|---|
| 짧은 전투 이미지 | 같은 저장에서 기존 62.453px 재현. 모바일 장면에서 중복 상단바44px와 여백을 제거하고 기존 단일 저장 버튼을 HUD로 이동. 캠프/시작/엔딩/데스크톱은 기존 구성 유지 |
| 전투 로그 | 짧은 원문은48px, 긴 원문은 최대112px와 키보드 스크롤/전체 보기. 텍스트 삭제/요약 없음 |
| 행동 설명 | 실제5행동 그대로, MP·회복 시 적 행동·도주 제한 등을13px로 상시 표시. 긴 직업 설명/패시브는 HUD의 ‘기록·설명’에서 원문과 함께 읽음. 행동은 원래 한 번 클릭 |
| 탐험 원문 | 긴 내용에서만 ‘아래로 스크롤’ 안내와 하단 명암. 끝에서 안내 제거, Home으로 돌아오면 다시 표시. ‘전체 이야기’ 모달과 Escape 포커스 복귀, 질문 고정 유지 |
| 전직 후보 | 중복 상단 HUD를 전직 화면에서만 제거. 현재 직업·저장 접근은 전직 헤더에 보존. 실제 스타일/스킬·패시브/변화 능력치/주의사항/유지 수치 상세 순서. 실제 장비를 포함한8종 수치를 복제 Game에서 계산 |
| 선택·확정 | 카드 터치/키보드 후보 선택과 별도52px 확정. 상세 펼침은 선택하지 않음. 선택 카드·후보명·aria-pressed 및 히든 비가역 경고. HP/MP의 기존 최대 회복을 명시 |
| 보상 | 짧은 결과가48px에서 잘리던 문제를48~112px 자연 높이로 변경. 긴 원문 전체 보기, 획득 카드/현재 장비 상세/비교/장착·보관·판매와 희귀도 유지 |
| FX | 기존 단일 컨트롤러가 HUD·메뉴·행동 영역을 실측해 배너와 ‘방랑자/적’ 숫자를 배치. 작은 초상화 overflow 밖의 읽기 쉬운 레일. 입력 차단 없음. 많은 동시 효과만 간격 조절 |

실제 제품 변경 파일은 `ui.js`, `style.css`, `ui-fx.js`, `ui-promotion.js`, `promotion.css`와 생성 HTML 두 개다. 신규 UI 검사5개·기존 통합 불변 검사1개·CI workflow·실측 증거/문서를 추가 또는 갱신했다.

추가로 모달을 연 채 가로/데스크톱으로 회전하고 닫으면 이동된 저장 버튼이 숨을 수 있는 문제를 발견했다. 닫기 후 실제 viewport 배치를 갱신하여 해결하고 전용 회귀 검사를 추가했다.

## 높이와 실제 전후 캡처

동일 시드·동일 저장을 실제 브라우저에 로드하고 같은 초기 UI 상태에서 촬영했다. [전체 전후 비교와20장](mobile-ux-refinement/COMPARISON.md), [최종 가로 배치 Chromium 실측](mobile-ux-refinement/after-chromium.json), [이전10/15 세로 배치 WebKit 실측](mobile-ux-refinement/after-webkit.json).

| 크기 | 전투 이미지 전→후 | HUD | 로그 | 행동 영역 후 | 화면 안 행동 |
|---|---:|---:|---:|---:|---:|
|390×844|242.453→364.859px|73.188px|112→48px|246.563px|5/5|
|390×664|62.453→272.250px|73.188px|112→48px|246.563px|5/5|

같은 전투 상태의 보스도 위 높이와 같다. 전직390×664 후보 목록은 약130px에서 **368.906px**로 늘어 첫 후보 카드292.594px 전체를 볼 수 있다. 탐험3/보상3행동도 네 요청 크기에서 화면 안이다. 주요 버튼은 실측52px·반경10px·글자15px/600, 같은 행 동일 폭/간격8px이다. 보조 조작은44px을 유지한다.

일반 전투뿐 아니라 짧은 화면의 긴 로그/여러 상태에서도150px 목표를 달성했다. 높이740px 이하 전투는 이미지와 적 정보를 나란히 배치한다.390×664 실측은 일반272.250px, 긴 로그184.250px, 여러 상태208.250px이다. 정보나52px 행동을 숨겨 목표를 맞추지 않는다. 긴 내용은 내부 스크롤/전체 보기로 보존한다.19px 텍스트 CSS 모사에서도226.313px 이미지와5행동/정보 접근을 확인했으나 이는 OS 글자 확대 검증을 의미하지 않는다.

## 보스 이미지 공백 조사

`assets/boss_00.webp`는 정상이다. 지연한 실제 이미지 응답 전에는 `complete=false`, natural 크기0인 어두운 영역이 나오며, HTTP200 후 `decode()`를 기다리면 원본600px 이미지가 두 높이에서 정상 표시된다. computed opacity1/visibility visible/object-fit contain 및 컨테이너 크기·경로를 기록했다. [전용 검사](../test-boss-image.cjs), [지연 전후 실제 캡처](mobile-ux-refinement/boss-image/), [결과](mobile-ux-refinement/boss-image-after-chromium.json).

이 실험은 로딩·촬영 타이밍으로 공백이 생길 수 있음을 입증한다. 당시 캡처의 요청/디코딩 로그가 없어 과거 사례의 유일한 원인을 단정할 수는 없다. 주요 장면 이미지만 eager/high priority로 요청하며 캐릭터 후보·장비 목록 등은 lazy를 유지한다. 실제 캡처는 loading 속성을 강제로 변경하지 않고 decode 완료를 확인한다. 원본 교체·대체 이미지 생성은 없다.

## 회귀 검증과 보호 범위

- 게임 JS/CSV/원본 이미지175파일을 PR #9 main과 byte 비교한다.114직업·1000장비·8지역·14히든 및 원래 전투/RNG/보상/저장/계보/스토리를 수정하지 않았다.
- 기존 `test-pr8-pr9-integration.cjs`의 ui-fx.js 전체 파일 고정은 이번에 허용된 표시 위치 변경과 충돌한다. FX capture/describe 원문 불변 검사로 분리하고, 게임175파일 및1,026쌍의 실제 상태/RNG/보상/전직 검사는 모두 유지했다. 위치는 신규3엔진 실측·단일 컨트롤러·중복입력·장식 종료 후 원문 검사로 검증한다. 테스트 삭제/실패 무시는 없다.
- [새 UX 검사](../test-mobile-ux.cjs): 네 viewport×5화면20상태, 원문 End/Home·스크롤 안내·전체 설명·긴 로그/긴 실제 스킬/다수 상태/큰 글자 모사4사례.
- [전직 비교](../test-promotion-refinement.cjs): 네 크기×일반/reduced8사례, 실제 비교8수치·숨김 경고·선택/상세/확정·중복확정·RNG.
- [FX 검사](../test-mobile-fx.cjs): 네 크기×일반/reduced, 실제 명령·최대12개 숫자 스트레스·대상 구분·배너/HP/적 정보/버튼 겹침·원래 단일 컨트롤러·RNG.
- [모달 중 회전](../test-mobile-ux-rotation.cjs): 세 모달×세 가로/데스크톱9사례, 저장 버튼/포커스/5행동 복귀, 상태/RNG 불변.
- 기존 npm/강제 전직/FX/P1/P2/P3/자연 진행/엔딩/히든/저장/모바일 검사를 CI에서 모두 유지한다. 기존 한 화면의 키보드·iframe·호스트offset·가로 fallback도 유지한다.

세부 로컬 결과와 로그는 [증거 폴더](mobile-ux-refinement/)에 보관한다. 초기 병렬 편집 중 생성 HTML과 최신 소스가 맞지 않아 bundle 검사가 한 번 실패했고, 소스 확정 후 재빌드하여 같은 검사를 다시 실행했다. 추가 스크롤 검사의 End→Home은 실제 스크롤 완료를 기다려 양 엔진에서 검사했다. 합격 기준을 낮추지 않았다.103db HEAD의 Chromium CI 새 UX 단계 실패는 동결 HTML/테스트 전체 및4배 CPU 검사로 로컬 재현을 시도했으며 기존 단계들은 통과했다. 당시 상세 로그는 다운로드403으로 회수하지 못해 원인을 단정하지 않는다. 새 테스트 catch에 GitHub 오류 주석을 추가했다. FX의12개 토큰 수는 스크린샷 I/O 뒤 재조회하던 시점 경합을 없애기 위해 위치와 동일한 DOM 평가 시점에 함께 수집한다.12개/동일 위치/단일 컨트롤러/기존650ms 종료 기준은 모두 유지한다.

첫 PR CI의 기존 importer 검사는 실제 회귀를 발견했다. 모달에서 저장을 불러올 때 root 직계였던 HUD가 main 안으로 이동해, 원래 root 직계만 복구하던 모달 코드가 그 HUD의 inert를 해제하지 못했다. 이제 잠글 때의 실제 노드 참조와 이전 inert 값을 저장하고 같은 노드에 복원한다. 전직 헤더도 별도 저장 프록시 대신 같은 원본 저장 버튼을 이동해 사용하므로 모든 장면에서 단일 저장/불러오기 경로를 보존한다. 실제 저장 UI에서 연속 두 번 불러오기→다시 저장→전체 기록 열기 경로를 새 회귀 검사에도 추가했다. 전직 헤더의 ‘보상 수령’ 표현도 기존 용어 검사에서 잡혀 ‘보스 전리품을 챙겼습니다’로 고쳤다. 실패한 HEAD는 병합하지 않고 전체 CI를 다시 실행한다.

이전 세로 배치 개선 단계의 로컬 FX는 Chromium/WebKit 각128개 실측, 총256개 PASS였다.10/17 복원한 최종 가로 배치는 Chromium128개 실측을 다시 통과했으며, 최신 WebKit/Firefox는 해당 HEAD의 GitHub CI를 최종 근거로 사용한다. 마법사의 상태이상으로 이미지가 줄어든 상황과 대상별6개 동시 숫자까지 검사해 적 이름·HP·예고와의 겹침을 해결했다. [최종 가로 배치 실측](mobile-ux-refinement/fx/chromium.json), [이전10/15 세로 배치 WebKit 실측](mobile-ux-refinement/fx/webkit.json), [실제 FX 캡처](mobile-ux-refinement/fx/screenshots/). 짧은 화면의 최종 가로 배치에서는 배너/양쪽 대상 숫자를 원본 이미지의 실제 사각형 안에 배치하여 오른쪽 적 정보를 가리지 않는다. 겹침 검사는 가로/세로 모두 실제2축 교차로 판정하며 HUD/행동의 강한 화면 내 경계 검사는 그대로 유지한다.

장식 FX는 기존650ms 정리 규칙을 유지한다. reduced motion에서는 흔들림 없이 결과를 표시하며, 장식 종료 뒤에도 실제 원문 aria-live와 기록·설명/실제 카드에 결과가 남는다. 진행 타이머는 추가하지 않았다.

병합 후 첫 공개 Firefox 검사에서는 `class_pequod.webp`에 대해 `Image corrupt or truncated.` 콘솔 오류1건을 수집했다. 같은 실행의 로컬 Firefox 전직·새 UX는 통과했지만, 공개 검사는 이 오류로 실패하여 후속 공개 단계가 실행되지 않았다. 이 실패를 성공으로 계산하지 않는다. 원본은83,088바이트·600×500 WebP로 정상 디코딩했고, 공개 응답을 세 번 새로 받아 모두 원본과 byte 일치함을 확인했다(SHA-256 `1acfc3db75c97b02a85df4132a9c8bc1d5782e635e09ccb28dc194c3a181876e`). 요청 중단/전송/디코더 중 어느 원인이었는지는 당시 네트워크 기록이 없어 확정하지 않는다. 원본 자산과 콘솔 오류0건 기준을 보존하여 같은 코드로 재검증한다. [실패 주석](mobile-ux-refinement/public-verification/feature-firefox-first-attempt-annotations.json), [공개 이미지 재확인](mobile-ux-refinement/public-verification/feature-image-recheck.json).

## GitHub 및 배포 기록

공개 Firefox 이미지 오류의 후속 조사와 fixture 준비 검증은 [별도 인수인계](FIREFOX_IMAGE_QA.md)에 기록한다. 후속 진단은 첫 보스 fixture를 위한 인위적 reload 시점의 이전 시작 화면 이미지에서 오류를 확인했고, 해당 응답의 원본 byte 일치도 확인했다. 테스트 새로고침3곳 직전에 시작된 이미지의 실제 decode 검증을 추가하며, 게임 UI/엔진/자산과 기존 행동·콘솔0건·상태/RNG 검사는 보존한다. 아래는 최초 기능 병합의 실제 기록이며, 최종 후속 PR·main CI·Pages·공개3엔진 결과는 PR #10의 배포 기록을 참조한다.

[PR #10](https://github.com/dksjrhrnak-gif/black-forest-rpg/pull/10)은2026-10-17 06:04:49 UTC에 main에 병합했다. 병합 전 검토 HEAD는 `d588b73b45aa7f9b7cff8ab8e003b4883be9fa57`, 실제 병합 커밋은 **`88f1ccd4dded1437d959a795ee5108e2d4567d09`**다. 두 커밋의 제품 트리는 동일하다. [정확한 검토 HEAD·19개 성공 기록](mobile-ux-refinement/public-verification/reviewed-pr-checks.json), [병합 기록](mobile-ux-refinement/public-verification/feature-merge.json).

| 대상 | 실제 결과와 고정 실행 링크 |
|---|---|
| PR 필수 CI | 19개 SUCCESS. main 전용 공개 검사는 PR에서만 SKIPPED. [Handoff](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/39007750747), [Journey](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/39007753590) |
| 기능 main 첫 실행 | 21개 중20개 성공. [Journey 11/11 성공](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/39008581308), [Handoff 9/10 성공](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/39008581362). 위에 기록한 공개 Firefox 이미지 콘솔 오류1건으로 해당 작업은 실패. 성공으로 계산하지 않음 |
| Pages | [39008580986](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/39008580986) build/deploy/report 모두 SUCCESS. deployment `7135662228`은 병합 SHA `88f1ccd`와 일치하고06:08:16 UTC에 success |
| 실제 공개 Chromium·WebKit | 각 엔진의 공개 강제 전직24사례, 새 UX20상태+4스트레스, 보스 decode2크기, 전직 비교8사례, 모달 회전9사례·연속 불러오기, FX128사례, P3 5개 폭, 기존 FX/B안 검사가 모두 SUCCESS. main 전용 공개 P1/P2·한 화면 검사도 양 엔진 성공 |
| 실제 공개 Firefox 첫 실행 | 로컬 새 UX·전직·FX 등은 SUCCESS. 공개 강제 전직 검사에서 이미지 콘솔 오류로 실패하여 후속 공개 UX/P3/FX/B안은 SKIPPED. 실행하지 않은 단계를 성공이라고 보고하지 않음 |
| 공개 HTTP 별도 검사 | HTML SHA-256 `b1b4ffb4aac10761a3b8551bc2c72da9cfb0726aae75d86137702f2c09ce43e0`, 이미지149개, CSV3개 모두 HTTP200·저장소 byte 완전 일치. [원본 결과](mobile-ux-refinement/public-verification/feature-http-assets.json) |

당시 문서·증거만 갱신한 main `5b5af13`에서도 제품 HTML과 테스트 원문을 보존해 필수21개를 다시 실행했으나, 다른 정상 이미지의 공개 Firefox 오류로20/21이었다. 이에 [후속 PR #11](https://github.com/dksjrhrnak-gif/black-forest-rpg/pull/11)에서 fixture 준비 검증을 공통화한다. 게임 제품·원본 자산·원래 테스트 assertion과 실제 행동 순서는 보존하며, 테스트의 인위적 reload 직전에만 래스터 이미지 준비 확인을 추가한다. **후속 최종 main SHA, 전체 CI, Pages 및 공개3엔진의 고정 실행 링크와 완료 결과는 PR #11과 [PR #10 배포 기록](https://github.com/dksjrhrnak-gif/black-forest-rpg/pull/10)에서 확인한다.** 첫 실패와 최종 결과를 구분한다. [보관한 실제 GitHub 단계 기록](mobile-ux-refinement/public-verification/README.md)은 실행 여부와 결론을 확인할 수 있는 증거이며, 로컬 브라우저 결과를 공개 실행으로 대신하지 않는다.

로컬 상태 보호 검사도 재실행했다. `npm test` 성공, 보상/전직1,026쌍·보상 확정1,026회·전직540회·저장 복원3,678회에서 전체 상태/RNG 일치, FX3,648개 시드 전투에서도 전체 저장/RNG 일치다. 최종 가로 배치의 Chromium FX8조건×16사례128개는 위치·토큰 수를 같은 DOM 평가에서 측정했고,8개 스트레스 조건 모두12개 숫자를 보존했다. 기존650ms 종료·콘솔 오류0건·장식 종료 후 실제 결과 접근 검사도 유지한다.

## 미검증 및 남은 한계

실제 휴대폰·주소창 동작·물리 노치 safe area·OS 글자 확대·실기기 FPS·장시간 사람 플레이는 **NOT TESTED**. 이전 로컬 Firefox는 content sandbox/framebuffer 초기화 제한으로 미검증이었다.10/17 새 환경의 로컬 WebKit은 host 라이브러리 누락으로 미실행이며, 최신 WebKit/Firefox는 실제 GitHub CI 실행 결과를 별도로 확인한다. 화면 회전/iframe/viewport 크기와 reduced motion 검증은 브라우저 자동화다. 자동 PASS는 분위기·재미·가독성에 대한 사람의 평가를 대신하지 않는다. 최소 지원 크기보다 작은 화면과 장기 플레이 가독성은 후속 실제 기기 평가 대상이다.

## PR11 이후 기존 UI 검수 경계 보완

PR11은 검토 `6ca3b93`의20개 성공 뒤 main `ee075e4753093dd05a862350089509fca143c3fa`로 병합됐다. Pages는 [39191181360](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/39191181360) 성공, 공개 HTML·149이미지·CSV3 및 최신 진단 문서도 원본과 byte 일치했다. 다만 main21개 중Firefox의 기존 PR7 UI 검수 한 개가 `class_mage.webp` 콘솔 오류로 실패해20/21이었다. 공개 Chromium/WebKit은 성공했고Firefox의 후속 공개 단계는 생략돼, 이 상태를 완료로 보고하지 않는다.

후속 `qa/mobile-ux-review-images`는 해당 기존 검수의 인위적 reload2곳에만 동일한 이미지 준비 검증을 연결한다. 실제 행동/보상 직후 전체 저장·RNG 일치와 콘솔0건 검사는 보존하고 제품 파일은 수정하지 않는다. [실패 근거·최소 범위](FIREFOX_IMAGE_QA.md)를 보존하며, 후속 PR과 최종 main·CI21개·Pages·공개3엔진 실행 링크는 [PR10 배포 기록](https://github.com/dksjrhrnak-gif/black-forest-rpg/pull/10)에서 확정한다.

## 진행 중 이미지 요청의 최종 준비 검증

PR12는20개 성공 뒤 main `a75ffaa1d738ec04359ac28738161afd7dc96577`로 병합됐다. 기존 UIreview 실패는 main에서도 통과했고 새 Pages/자산/문서 byte 검증도 성공했다. 다만 공개 Firefox의 인위적 전직 재접속에서 자연 크기0인 진행 중 이미지 요청이 기존 준비 필터에서 빠져 취소된 기록을 확인했다. [정확한 trace와 보완 범위](FIREFOX_IMAGE_QA.md)를 보존한다. 후속 `qa/mobile-ux-image-lifecycle`은 page 생성 때부터 이미지 요청을 관측하고 fixture reload 전에 진행 중 요청0개와 새500ms 안정 구간을 검증한다. 게임 DOM/이미지 속성/원본 자산/실제 입력/즉시FX/콘솔0건/저장·RNG 기준은 보존한다. 최종 전체21개·Pages·공개3엔진 고정 링크는 PR10 배포 기록에서 확인한다.
