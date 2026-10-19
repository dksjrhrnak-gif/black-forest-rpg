# 공개 Firefox 전직 QA의 이미지 준비 경계

기준 main은 `5b5af133314c358289e520e10c763cc118ae316f`, 후속 브랜치는 `qa/mobile-ux-firefox-images`다. 이번 후속 변경은 테스트와 진단·문서에 한정하며 게임 UI/엔진/자산/저장 형식은 수정하지 않는다.

## 관측과 원인 범위

기능 병합 후 main 검사는 두 실행 모두20/21이었다. 공개 Chromium/WebKit은 성공했지만, Firefox의 전직 경로에서 서로 다른 정상 이미지(`class_pequod.webp`, `class_warrior.webp`)에 `Image corrupt or truncated.` 콘솔 오류가 발생했다. 마지막 boss6라는 실패 표시는 누적 콘솔 오류를 검사한 시점이므로 마지막 보스 결함으로 단정할 수 없었다. [두 번째 main 실행 원본](mobile-ux-refinement/public-verification/pre-fixture-fix-main-handoff.json)과 [실패 주석](mobile-ux-refinement/public-verification/pre-fixture-fix-firefox-annotations.json)을 보존한다.

진단 전용 커밋 `0586500`은 기존 행동·검사·대기를 바꾸지 않고 실제 공개 Firefox 요청/응답, 탐색 단계, 오류 당시 DOM, 이미지 응답 byte/hash를 수집했다. [실행39185668901](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/39185668901)은 다음 사실을 확인했다.

- 실제 오류는 `360×800 / reduce / boss1`, `reload:boss-fixture` 단계였다.
- 당시 DOM은 이전 시작 화면이며, 대상은 화면 밖 lazy 이미지 `class_mage.webp`였다. `complete=true`, 자연 크기0으로 보고됐다.
- 해당 응답은 HTTP200,68,828바이트, SHA-256 `acc33209fb77c2ac9eb55d8b6ec9bdbc4990b6d6ded6b086bbc0ce846c31b036`로 저장소 원본과 완전히 일치했다.
- 전직·보상·저장/RNG 검사는 이후에도 진행됐고, boss6 후 누적 콘솔 오류 검사에서 실패했다.

[원본 주석](mobile-ux-refinement/public-verification/firefox-image-lifecycle-diagnostic-annotations.json)과 [관측 요약](mobile-ux-refinement/public-verification/firefox-fixture-diagnostic-summary.json)을 보존한다. GitHub 주석은 약4KB에서 잘려 마지막 요청 trace를 회수하지 못했고, artifact 다운로드는403이었다. 따라서 Firefox 내부 디코더·취소의 정확한 원인은 확정하지 않는다. 이번 응답의 전송 손상이나 마지막 보스 전직 결함을 뒷받침하는 증거는 없다.

## 최소 변경

첫 보완은 `test-forced-career-ui.cjs`의 인위적 새로고침3곳(보스 저장 주입, 전직 대기 상태 복원, 전직 완료 상태 복원) 직전에 이미지 준비 검증을 추가했다. 네트워크가 안정된 뒤 현재 문서에서 이미 시작된 래스터 이미지의 `decode()`와 `complete / naturalWidth / naturalHeight`를 검사한다. 이미지 src/loading 변경·에러 필터·재시도·자산 교체는 없다. 디코딩 실패는 그대로 테스트 실패다.

기존 assertion27개, 행동 호출10개, 저장 export7개, 원래 고정 대기3개는 내용과 순서를 유지한다. 실제 공격·전리품 수령·후보 선택·이중 확정·탐험 클릭에는 새 대기를 넣지 않는다. 보상/전직 FX의 즉시 검사는 준비 대기보다 앞에 있어 기존650ms 기준을 보존한다. 콘솔/pageerror0건 기준도 유지한다. 이 변경은 fixture 재접속 준비 안정화이며, 실제 사용자의 로딩 중 외부 새로고침이나 Firefox 내부 오류 전반을 해결했다고 주장하지 않는다.

진단은 오류 관련 요청 trace와 DOM/응답 해시를 짧은 주석으로 분리하고, 오류 뒤의 이벤트도 보관한다. URL query/hash/인증정보·쿠키·인증 헤더·응답 본문을 출력하지 않는다. 새 `Public Firefox image lifecycle` workflow는 실제 공개 HTML·149개 이미지·CSV3개의 byte 일치를 확인한 뒤 기존24개 경로를 실행한다. 전체 기존 CI는 별도로 유지한다.

이전 main의 Firefox 후속 공개 UX 검사는 전직 단계 실패 뒤 생략됐으므로, 새 workflow에서도 기존 공개 UX·회전·보스 decode·전직 비교·FX5개 스크립트를 원문 그대로 실행한다. 아직 실행하지 않은 공개 단계를 미리 성공이라고 판단하지 않고 PR에서도 검증하기 위한 추가 검사다.

이 추가 검사의 [39186589669](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/39186589669)에서는 전직24경로와 새 UX·회전·보스 이미지가 성공한 뒤, `test-promotion-refinement.cjs`의 최종 콘솔 검사에서 `class_warrior.webp` 오류가 발생했다. 카드/키보드/저장/이중 확정/완료FX 검사는 통과했으나 마지막 모바일FX 스크립트는 실행되지 않았다. [실제 실패 주석](mobile-ux-refinement/public-verification/public-firefox-promotion-first-failure-annotations.json)을 보존한다. 이 두 번째 테스트의 오류 발생 시점을 초기 reload로 확정할 진단은 없으므로 그렇게 단정하지 않는다.

이에 같은 fixture 준비 검사를 `qa-fixture-images.cjs`로 공유한다. 적용은 전직·새 UX·회전·보스 이미지·전직 비교·모바일FX·기존FX7개 스크립트의 프로그램상 reload 직전뿐이다. 실제 게임 행동은 늦추지 않는다. P3/B안 스크립트는 실패 stack을 GitHub 주석으로 남기는 보고만 추가했다. 정적 검수에서 기존 assertion302개와 검사·실제 행동·저장·기존 고정 대기를 합친498개 호출의 원문/순서를 보존했다.

공통 연결 과정의 import가 주석에 포함된 실수는 로컬 검사에서 발견해 수정하고 실행 가능한 최상위 선언임을 다시 확인했다. 또한 `gear_weapon.svg`의 decode가10초 동안 끝나지 않는 현상을 확인했다. 새 준비 검사는 실패가 관측된 WebP 등 래스터 이미지에 한정하며, SVG의 기존 byte·표시·콘솔 검사는 유지한다. 래스터 decode에도30초 제한을 두고 초과하면 실패한다. SVG나 이미지의 콘솔 오류를 무시하지 않는다.

전용 workflow는 main의 공개 P3·기존FX·B안 검사도 같은 조건으로 먼저 실행한다. 추가한 실제 이미지 준비 대기의 실행 시간을 반영해 전용 작업 예산은15→25분, 로컬/공개 양쪽을 실행하는 P3 브라우저 작업은30→40분으로 조정했다. 개별 assertion·횟수·콘솔0건 조건이나 실패 판정은 완화하지 않는다.

## Dormant lazy 이미지의 별도 처리

공통 준비 검사 커밋 `08b7b2a`의 WebKit 작업 [117854007597](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/39187864056/job/117854007597)은 전직 대기 상태 reload 준비에서30초 제한에 걸렸다. 대상 `class_stitch.webp`는 화면 밖 lazy 이미지이고 `complete=false`, 자연 크기0이었다. 콘솔 오류는 관측되지 않았다. [원본 주석](mobile-ux-refinement/public-verification/webkit-dormant-lazy-first-failure-annotations.json)을 보관한다. WebKit은 lazy 요청을 시작하기 전에도 `currentSrc`를 선택할 수 있으므로 `currentSrc`만으로 시작된 이미지라고 판정한 새 테스트 helper의 오류였다.

준비 대상은 래스터 `currentSrc`와 함께 요소의 `complete` 또는 양수 자연 크기가 관측된 경우로 제한한다. 네트워크 안정화 대기와30초 decode 실패 기준은 유지한다. 아직 요청되지 않은 lazy 이미지는 시작시키지 않으며, `complete=true / 자연 크기0`인 손상 이미지는 포함되어 decode 실패를 그대로 보고한다. URL만 같은 이전 DOM의 resource timing으로 로드 시작을 추정하지 않는다.

`test-fixture-images.cjs`는 실제 브라우저의 격리된 두 문서로 이를 검증한다. 원본 eager 래스터2개는 화면 안/밖에서 실제 요청·디코딩되어야 하고, 아주 먼 화면 밖 lazy 원본은 준비 검사 전후 모두 요청되지 않아야 한다. 별도의 의도적으로 손상된 HTTP200 WebP는 timeout이 아닌 디코딩 오류로 반드시 거부되어야 한다. 이 음성 검사의 의도된 오류는 실제 게임의 콘솔0건 검사와 별개로 기록하며, 예상하지 않은 콘솔/미처리 페이지 오류는 실패한다. 로컬 Chromium의 두 사례는 통과했으며 [실제 결과](mobile-ux-refinement/public-verification/fixture-image-readiness-chromium.json)를 보존한다. 같은 검사를 전체3엔진 CI와 공개 Firefox 사전 검사에 추가했다. Chromium의 dormant `currentSrc`는 빈 값이었다. WebKit 원래 실패와 달리 모든 엔진에서 옛 오류가 재현됐다고 주장하지 않는다.

새 격리 검사의 최초 전체 실행 `120849b`에서는 Chromium/WebKit 두 사례가 성공했으나 Firefox는 손상 이미지의 오류 문구 정규식에서 실패했다([공개](mobile-ux-refinement/public-verification/firefox-negative-fixture-wording-public-annotations.json), [preview](mobile-ux-refinement/public-verification/firefox-negative-fixture-wording-preview-annotations.json)). 실제 오류 유형은 브라우저 안에서 직접 읽어 `EncodingError`임을 확인하고, helper가 그 동일한 원본 오류 문장을 전달하는지 검사하도록 보완했다. 예상된 음성 사례의 콘솔 메시지도 해당 격리 URL의 이미지 디코더 오류로만 제한하며, 모든 실제 게임 스크립트의 콘솔0건 조건은 그대로다.

전체 검사 `570af56`의 Firefox는 현재 전직·P3·FX·B안을 통과한 뒤 이전 PR7의 정적 HTML 비교 단계에서 실패했다. [첫 주석](mobile-ux-refinement/public-verification/firefox-archived-baseline-first-failure-annotations.json)은 종료코드1만 남겨 원인을 확정할 수 없다. 기존 `test-ui-review.cjs`의 실제 동작/대기/assertion을 보존하고 실패 시 브라우저·폭·화면·stack을 주석으로 기록한다. 전용 Firefox workflow 앞에서도 동일한 archived baseline15화면을 먼저 실행해 후반 단계까지 기다리기 전에 원인을 확인한다. 이 기록 단계에서는 baseline에 이미지 helper나 새로운 행동 대기를 추가하지 않는다.

## 검증

로컬 Chromium은 네 크기×두 motion×세 보스24개 경로를 통과했다. 인위적 새로고침72개에서 이미지218개의 실제 디코딩을 확인했으며, 기존 보상·저장/RNG·버튼52px·FX·콘솔0건 검사도 통과했다. [원본 결과](mobile-ux-refinement/public-verification/fixture-ready-chromium.json).

보완 커밋 `969a41b`의 [실제 공개 Firefox 실행39185950625](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/39185950625)은 전체 SUCCESS였다. 공개 HTML/원본 자산 byte 검사 후 같은24개 전직 경로와72개 fixture 재접속 경계의 이미지 준비 검증, 기존 상태/RNG·보상·FX·콘솔0건 검사를 완료했다. [실제 단계 기록](mobile-ux-refinement/public-verification/fixture-ready-public-firefox-run.json)을 보관한다. 이는 테스트의 인위적 reload 준비 보완을 검증한 결과이며 Firefox 내부 디코더 원인을 확정한 결과는 아니다.

공통 래스터 준비 검사로 재실행한 로컬 Chromium은 새 UX20상태+4스트레스, 회전9개와 실제 importer, 보스 이미지2개, 전직 비교8개, FX128개를 통과했다. 긴 로그184.25px·다수 상태208.25px와5개52px 행동 등 원래 실측도 유지한다. [현재 helper 해시와 실제 결과 요약](mobile-ux-refinement/public-verification/shared-raster-fixture-local-summary.json), [전직 원본 결과](mobile-ux-refinement/public-verification/shared-fixture-promotion-chromium.json)를 보관한다.

기존 FX 스크립트도 로컬 Chromium360px에서 일반/reduced motion 두 경우를 통과했다. [실제 결과](mobile-ux-refinement/public-verification/shared-raster-original-fx-chromium.json). 나머지 화면 폭과 엔진은 최신 전체 CI 및 공개 검사 결과로 별도 확인한다.

공개 Firefox 전용 실행과 전체 PR/main CI·Pages·공개3엔진의 최종 결과는 [후속 PR #11](https://github.com/dksjrhrnak-gif/black-forest-rpg/pull/11)과 [PR #10의 배포 기록](https://github.com/dksjrhrnak-gif/black-forest-rpg/pull/10)에 고정 실행 링크와 함께 기록한다. 성공·실패·생략을 구분하며 첫 실패 기록을 삭제하지 않는다. 실제 휴대폰·OS 확대·실기기 FPS·장시간 사람 플레이는 미검증이다.
