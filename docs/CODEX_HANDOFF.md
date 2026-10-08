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

## Phase B/C/D 체크포인트

- 이어받은 수정 `13c6137`의 게임 코드/세이브/이미지/문구는 추가 변경하지 않았다. 출력 HTML 두 파일은 새 빌드와 바이트 일치: SHA256 `e1d0ddc6edc4df0f824730765eaf44e3861378c556525fd200aeed175f9e5d81`.
- npm test 전체 PASS: 348 원본 전투 비교, 684 전투 캠페인, 18 정상 성장 캠페인, 67 히든 조건 검사, 구버전 저장/장비/RNG 이전, 체크포인트 대화 9건, 보상 36건, 문구 수치 회귀 156건. 빌드/데이터 내보내기/사이트 내보내기/HTML 경계 PASS.
- 번들에 쓰이는 JavaScript 20파일을 vm.Script로 실제 파싱: PASS. Game 확장 모듈의 함수 덮어쓰기는 build.py의 명시적 순서이며 중복 버전으로 삭제하지 않았다.
- test-journey-ui.cjs 보강: 실제 공격 버튼 → 승리 상태 → 저장 → 새로고침, 야영지 메뉴 비활성/우회 dispatch 차단, 쉼터 휴식의 정확한 상태/저장/경로 보존. Chromium 클릭·터치 360/390/430px 모두 PASS.
- test-handoff-readiness.cjs 추가: 여섯 시작 직업을 실제 시작·탐험·선택·새로고침·계속 버튼으로 검증, 가방/제작/도감/기록/제작 정보/새 모험/능력치 패널 경계, 파일 불러오기, pageshow 이벤트 시뮬레이션, null 이미지와 의도적 HTTP 404 fallback. Chromium 22검사 PASS. CI touch job에도 등록한다.
- 초기 보강 테스트의 두 실패는 테스트 가정 오류였다: 여정 입력은 기존 250ms 중복 방지를 기다려야 하며, 다음 장면은 즉시 처리되는 사건이면 reward일 수도 있다. 지연 후 입력과 엔진 결과의 정확한 상태 비교로 교정해 통과했다. 게임 타이머/진행 규칙은 바꾸지 않았다.
- 이미지 전수 파일/경로/해시/누락 명칭은 CODEX_ASSET_AUDIT.json에 기록했다. 저장소 이미지 263개, 연결 파일 147개, 전용 그림 없는 직업 43개. 제안 경로는 현재 존재하지 않는 미래 경로임을 명시했다. 모든 기존 후보를 보존했다.
- WebKit은 Debian 서명 검증된 apt 인덱스/패키지를 작업 공간에 받아 필요한 라이브러리를 설치 없이 추출했다. 해당 브라우저의 sys/lib에 없는 라이브러리만 링크했다. ldd 누락이 없는 것을 확인하고 실제 WebKit 페이지 실행 PASS. 사용자 공간 libGLES가 시스템 ldconfig 목록에 없어서 Playwright의 호스트 사전 검사만 생략했다. 패키지 서명·체크섬·TLS 검증은 유지했다.
- Firefox는 다운로드 완료했으나 `/proc/self/uid_map` 읽기 전용 및 SWGL framebuffer 초기화 실패로 실행 시간초과. 실제 Firefox 플레이는 미검증이며 게임 결함으로 분류하지 않는다.
- 마지막 완료 Phase: B/C/D. 다음: WebKit E/F 결과 확인 → QA 커밋/원격 저장 → main 반영 전 검사 → Pages 실제 플레이 G.

## Phase E/F 체크포인트

- 테스트/자산 기록 커밋: `aeb1e1b071957e5027b06065189f2eac96c1e9b5`, QA 브랜치 원격 반영 확인.
- Chromium 및 WebKit, 클릭 및 터치, 360×800/390×844/430×932: 12조합 모두 PASS, 런타임/console 오류 0. 보강 테스트 양쪽 브라우저 22검사씩 PASS. 자세한 실행 결과는 CODEX_QA_RESULTS.json.
- 모든 화면 폭에서 보상/다음 조우/중복 입력, 패배/회피, NPC/이벤트, 쉼터 저장/휴식/복귀, 상점, 장비, 새로고침/손상 저장 보호, 숫자 스토리/엔딩 입력 및 기존 그림 연결을 검증했다. 장면 진입 일부는 정상 BF2/BF3 불러오기 UI로 fixture를 넣은 뒤 실제 버튼을 입력했다. 정상 성장 18캠페인은 엔진 테스트이며 전부 실제 손플레이했다고 주장하지 않는다.
- 의도적 단일 이미지 404 검사에서는 그 파일 실패만 허용하고 텍스트 fallback 및 게임 시작을 확인했다. 다른 테스트에서는 네트워크/이미지/console 오류를 허용하지 않는다.
- 모바일 screenshot도 확인했지만 브라우저 하단 OS UI/실기기 가독성은 별도 검증하지 않았다. 별도 설정 화면은 구현되어 있지 않으므로 존재한다고 보고하지 않는다.
- 공개 Pages 기준 main HTML과 바이트 동일 확인. Node는 NODE_USE_ENV_PROXY=1로 지원 프록시 경로를 사용한다. qa-browser.cjs는 BF_USE_ENV_PROXY=1일 때 기존 HTTPS_PROXY를 이용한다. 인증서 값/프록시 자격증명은 저장하지 않는다. CI/로컬 기본 경로는 유지한다.
- WebKit에서 기존 신뢰 설정으로 공개 Pages HTTP 200 및 실제 시작 버튼 동작 PASS. Chromium은 프록시 CA 신뢰 오류로 공개 Pages 플레이가 미검증이다. 플랫폼 CA를 영구 NSS 저장소에 추가하려던 작업은 자동 승인 검토가 향후 TLS 신뢰 범위 확대를 이유로 거부했고, 해당 저장소를 변경하거나 우회하지 않았다. 공개 사이트 검증은 이미 가능한 WebKit으로 진행한다.
- 마지막 완료 Phase: F. 다음 시작점: 검증된 QA 변경을 main에 fast-forward 반영 → Pages 새 HTML/147개 자산 동일 확인 → WebKit 공개 URL 3폭 실제 터치 회귀 → 최종 문서 커밋 및 원격 SHA 확인.

## Phase G — 공개 배포 검증

- 검증된 QA를 main에 fast-forward 반영했다. 검증 main/QA: `6b9ede29e7c45f20be14acf24ae090fb8ece1fe1`. 게임 변경의 원래 커밋은 `13c61375f0545cadc5c53a319a29ed04b8eca194`이며 이미 적용된 스토리 입력/저장 수정을 중복 병합하지 않았다.
- Pages 배포 [37747000199](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37747000199) success, deployment `6930365406`, 해당 main SHA 확인. 공개 HTML SHA256 `e1d0ddc6edc4df0f824730765eaf44e3861378c556525fd200aeed175f9e5d81`, 147개 연결 자산 HTTP 200 및 바이트 동일 PASS.
- 클라우드에서 **공개 URL**의 WebKit 360×800/390×844/430×932 터치 여정 회귀 및 추가 22검사 PASS. 실제 첫 챕터 화면도 열어 그림·서술·세 선택지·비활성 장비 메뉴를 확인했다. localhost 결과를 실서비스 결과로 대체하지 않았다.
- main 인수인계 Actions [37747000995](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37747000995) 전체 success: logic, Chromium/WebKit 클릭/터치 4 job, 공개 Pages Chromium/WebKit 2 job. GitHub Actions의 Chromium 공개 사이트 검증은 클라우드 Chromium의 인증서 제한과 별개로 성공했다.
- 기존 통합 Actions [37747000930](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37747000930) 전체 success: verify와 Chromium/WebKit 스토리 320/360/375/390/430px 10 job. 기존 8폭 클릭/터치와 공개 자산 검사도 verify job에서 통과했다.
- 이전 main HTML을 그대로 브라우저에 로드해 탐험 chapter에서 장비 메뉴가 활성 상태로 보이지만 클릭이 무시되는 현상을 직접 재현했다. 저장 상태는 보존됐으며, 현재 번들에서는 같은 저장을 복원했을 때 장비 메뉴가 disabled로 표시된다. 기존 QA 수정의 실제 전/후 결과를 CODEX_QA_RESULTS.json에 남겼다.
- 공개 서비스 증거: CODEX_PAGES_RESULTS.json. 전체 저장소 이미지 263파일의 경로/해시, 연결 및 부족 항목의 명칭/용도/제안 경로: CODEX_ASSET_AUDIT.json. 제안 경로는 실제 존재하는 파일로 취급하지 않는다.
- 직업 그림 71장 실제 decode PASS. 원본 비율이 다른 토끼굴 문지기(600×720), 피쿼드호 갑판검사(600×500), 거울 복도의 권투사(600×400)는 모바일에서 CSS 2:3 + contain으로 표시되는 것을 따로 확인했다. 원본 이미지 변경·삭제·재생성 0건.

## 최종 상태와 다음 실행

- 마지막 완료 Phase: G (요청된 로직/저장/이미지/모바일/공개 Pages 검증).
- 이번 신규 게임 수정은 없다. 기존 미완료 야영지 메뉴 수정 1커밋을 검증·반영했고, 테스트/프록시 실행 지원/인수인계 기록만 추가했다. BF1/BF2/BF3 구조와 게임 수치/콘텐츠/디자인을 보존했다.
- 최종 문서 커밋은 위 검증 커밋 뒤에 이어지는 docs-only 커밋이다. 정확한 최신 SHA는 `git ls-remote origin refs/heads/main refs/heads/qa/resume-checkpoint-20261008`으로 확인한다. 문서 안에 자기 커밋 SHA를 만들기 위해 반복 amend하지 않는다.
- **P0:** 이번 검사에서 재현된 미해결 치명적 진행/저장/런타임 오류 없음.
- **P1:** 이번 요청의 필수 자동화 검증에서 미해결 실패 없음.
- **P2:** 실제 iOS/Android 터치·브라우저 하단 UI·OS 탭/프로세스 복원, 클라우드 Firefox 실행, 기존 미제작/ID 미확정 전용 이미지. 모두 미검증/기존 선택적 보완으로 구분한다. 플레이타임 2–4시간/세션 20–40분도 직접 측정하지 않았다.
- **다음 시작점:** 먼저 main 최신 SHA와 위 Actions/Pages 상태를 읽고 CODEX_PAGES_RESULTS.json의 검증 SHA/HTML 해시와 비교한다. 코드가 같으면 완료된 기능을 재구현하지 않는다. 새 작업은 실제 기기 검수 또는 원본 ID/제작 정의가 확보된 전용 이미지 연결부터 진행한다. 실기기 오류는 기기/브라우저/폭/입력 순서/저장 코드로 재현한 다음 최소 수정한다.
- 환경의 network/start_skill 초안도 현재 프록시/브라우저 실행 방식으로 저장했다. 환경 스냅샷 Publish는 사용자가 환경 설정에서 별도로 수행한다. GitHub 코드 반영/Pages 배포와 환경 Publish는 다른 작업이다.
