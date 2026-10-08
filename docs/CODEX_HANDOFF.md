# Codex 최종 통합 QA 인수인계

## Phase A — 2026-10-08 현재 상태

- 작업 기준 main: `d670c57e4073912ba3bc57884262c92eaf1691cf` (원격 Git 조회 확인).
- 이어받은 브랜치: `qa/resume-checkpoint-20261008`, 기존 수정 `13c61375f0545cadc5c53a319a29ed04b8eca194`.
- 이 브랜치는 main보다 1커밋 앞서 있다. 변경은 야영지 전용 메뉴의 disabled 표시와 회귀 검사, 생성 HTML 및 감사 결과뿐이다.
- `qa/handoff-audit-20261008`은 3커밋 뒤, `qa/v5-mobile-final`은 7커밋 뒤다. `qa/live-pages-mobile-20261008`은 7커밋 뒤/배포 검사 workflow 1커밋 앞이다. 이미 반영된 변경은 다시 병합하지 않는다.
- GitHub API: 열린 PR 0개. QA 브랜치 Actions `37743014890`, main Actions `37741522467`/`37741522450`, Pages `37741522157` 모두 success. 이는 과거 실행 결과이며 이번 검증과 구분한다.
- Pages 설정: main 루트(`/`), legacy build, built. 최근 deployment `6929421725`의 SHA는 기준 main과 같다.
- 최근 10개 커밋 및 `docs/handoff-audit.md`, `docs/final-completion-report.md` 검토. 과거 기록은 보존한다.

## 구현 구조와 분류

- 진입점은 루트 `index.html`. `build.py`가 style.css와 shell.html, vendor 3개, legacy-v1/content/literature/expansion/supplemental/class-tree/effects/relationships/narrative/assets/equipment-migration/engine/qa-relationships/career/chapters/journey 모듈 및 ui.js를 번들한다. `export-site.py`가 루트와 dist로 내보낸다.
- DOM click/submit → ui.js의 현재 버튼 핸들러 → Game 메서드 → render → localStorage 저장. 클릭 중복 방지와 장면별 실행 제한이 존재한다. 저장 키 `black-forest-last-ember-v2`, BF1/BF2/BF3 호환 및 6슬롯 이전 장비 보존 구현을 유지한다.
- **완료 및 현재 기준 검증됨:** main의 npm test, 684 전투 캠페인/18 정상 성장 캠페인, 빌드·HTML 경계, 자산 147개 HTTP/바이트 일치, Chromium 390px 클릭·터치(앞선 환경 설정 실행). 숫자 스토리/엔딩 선택, 대화 후 체크포인트 유지 구현은 존재한다.
- **구현되었지만 이번 검증 필요:** QA 브랜치의 야영지 메뉴 disabled 표시, 360/390/430px 통합 회귀, 수정본 공개 Pages 플레이.
- **미완료/제한:** 직업 43종 전용 이미지, NPC 전용 portrait 6종과 Queen/Quixote story 그림, 개별 장비 그림의 ID 근거는 기존 기록처럼 부족하다. 정상 텍스트/지역/공용 슬롯 fallback이며 임의 이미지를 배정하지 않는다. 실제 휴대폰과 OS 탭 복원은 미검증이다.

## 실행 환경

- Node 24.19.0 / npm 11.9.0 / Python 3.12.14 / Chromium 151.
- npm ci --ignore-scripts 사용. 출력 파일을 덮어쓰는 기존 테스트는 `/workspace/.onboarding/black-forest-rpg` 복사본에서 실행해 원본의 과거 QA 결과를 보존한다.
- 초기 GitHub API/Pages/CDN 요청은 네트워크 403이었다. 기존 preset을 유지하고 필요한 도메인을 환경 초안에 추가한 후 API와 Pages의 HTTP 200을 확인했다. 자격증명 추가 없이 기존 프록시 인증이 동작한다.
- 저장소 source/UI 수정은 이번 개발 요청 범위에서만 수행한다. 새 worktree를 만들지 않는다.

## 체크포인트

- 마지막 완료 Phase: A.
- 이번 추가 파일: docs/CODEX_HANDOFF.md. 게임 코드 추가 수정 없음.
- 다음 시작점: 기존 QA 커밋에서 B/C/D/E/F 검증, 누락된 실제 DOM 회귀를 보강하고 실패만 수정. 검증 후 fast-forward로 main에 반영하고 Pages 배포/실제 플레이를 검사한다.
- 최종 main/QA SHA, 테스트 결과, 배포 상태는 이후 체크포인트에서 갱신한다.
