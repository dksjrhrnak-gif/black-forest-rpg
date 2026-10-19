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

`test-forced-career-ui.cjs`의 인위적 새로고침3곳(보스 저장 주입, 전직 대기 상태 복원, 전직 완료 상태 복원) 직전에만 이미지 준비 검증을 추가했다. 네트워크가 안정된 뒤 현재 문서에서 이미 시작된 이미지의 `decode()`와 `complete / naturalWidth / naturalHeight`를 검사한다. 이미지 src/loading 변경·에러 필터·재시도·자산 교체는 없다. 디코딩 실패는 그대로 테스트 실패다.

기존 assertion27개, 행동 호출10개, 저장 export7개, 원래 고정 대기3개는 내용과 순서를 유지한다. 실제 공격·전리품 수령·후보 선택·이중 확정·탐험 클릭에는 새 대기를 넣지 않는다. 보상/전직 FX의 즉시 검사는 준비 대기보다 앞에 있어 기존650ms 기준을 보존한다. 콘솔/pageerror0건 기준도 유지한다. 이 변경은 fixture 재접속 준비 안정화이며, 실제 사용자의 로딩 중 외부 새로고침이나 Firefox 내부 오류 전반을 해결했다고 주장하지 않는다.

진단은 오류 관련 요청 trace와 DOM/응답 해시를 짧은 주석으로 분리하고, 오류 뒤의 이벤트도 보관한다. URL query/hash/인증정보·쿠키·인증 헤더·응답 본문을 출력하지 않는다. 새 `Public Firefox image lifecycle` workflow는 실제 공개 HTML·149개 이미지·CSV3개의 byte 일치를 확인한 뒤 기존24개 경로를 실행한다. 전체 기존 CI는 별도로 유지한다.

이전 main의 Firefox 후속 공개 UX 검사는 전직 단계 실패 뒤 생략됐으므로, 새 workflow에서도 기존 공개 UX·회전·보스 decode·전직 비교·FX5개 스크립트를 원문 그대로 실행한다. 아직 실행하지 않은 공개 단계를 미리 성공이라고 판단하지 않고 PR에서도 검증하기 위한 추가 검사다.

## 검증

로컬 Chromium은 네 크기×두 motion×세 보스24개 경로를 통과했다. 인위적 새로고침72개에서 이미지218개의 실제 디코딩을 확인했으며, 기존 보상·저장/RNG·버튼52px·FX·콘솔0건 검사도 통과했다. [원본 결과](mobile-ux-refinement/public-verification/fixture-ready-chromium.json).

보완 커밋 `969a41b`의 [실제 공개 Firefox 실행39185950625](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/39185950625)은 전체 SUCCESS였다. 공개 HTML/원본 자산 byte 검사 후 같은24개 전직 경로와72개 fixture 재접속 경계의 이미지 준비 검증, 기존 상태/RNG·보상·FX·콘솔0건 검사를 완료했다. [실제 단계 기록](mobile-ux-refinement/public-verification/fixture-ready-public-firefox-run.json)을 보관한다. 이는 테스트의 인위적 reload 준비 보완을 검증한 결과이며 Firefox 내부 디코더 원인을 확정한 결과는 아니다.

공개 Firefox 전용 실행과 전체 PR/main CI·Pages·공개3엔진의 최종 결과는 [PR #10의 후속 배포 기록](https://github.com/dksjrhrnak-gif/black-forest-rpg/pull/10)에 고정 실행 링크와 함께 기록한다. 성공·실패·생략을 구분하며 첫 실패 기록을 삭제하지 않는다. 실제 휴대폰·OS 확대·실기기 FPS·장시간 사람 플레이는 미검증이다.
