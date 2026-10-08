# 2026-10-08 인계 후속 검수

기준 main: `52ab866eae72c89e54c49fefd87063014a6234ff`. 최근 10개 커밋, Pages 배포 성공 `37566333020`, 기존 QA 성공 `37562614478`, 공개 페이지 터치 검증 성공 `37654685556`을 직접 확인했다. 시작 시 공개 HTML은 main과 바이트 일치했다(SHA256 `29d09ccd374499ef325bfbf3ef06f54e4f289db624323dabd4a5abd86d831d24`). qa/v5-mobile-final은 main과 동일했고 qa/live-pages-mobile-20261008에는 검증 workflow 하나만 추가되어 있었다. 열린 PR은 없었다.

## 재현과 최소 수정

- **E-01 문서 불일치 재현:** README의 배포 경로, 연결 이미지 수, 브라우저 미실행 설명이 과거 상태였다. README를 현재 구조로 교정하고 과거 QA/정합성 보고에는 현재 보고 링크를 추가했다. 과거 기록은 보존했다.
- **E-05 터치 영역 재현:** 초기 인계 QA 실행 `37714749259`의 Chromium/WebKit 클릭·터치에서 저장/불러오기와 상세 스테이터스가 모두 높이 36px였다. 해당 두 CSS 선언만 44px로 수정했다. 첫 보정 시 상세 버튼의 더 높은 우선순위 선언을 놓친 것은 `37715067623`에서 발견했고 원래 선언 두 곳을 직접 수정했다.
- **E-08 미연결 제작 이미지 재현:** 현재 직업명과 정확히 일치하는 그림 10장의 원본과 그림 내용을 확인해 연결했다. `handoff-image-connections.json`에 원본 ID·SHA256·변환 파일 SHA256을 남겼다. 기존 137개 에셋을 삭제/수정하지 않았으며 이미지를 생성하지 않았다.
- **히든 직업 해금 오류 미재현:** 현재 14종 모두 숫자형 unlock을 가지고 있다. 정상 해금 14건, 각 조건 하나씩 미충족 51건, 별칭 2건 = 67건 통과. 해금 인장·캠프 제한·재해금 방지·새 여정 제한·저장 왕복도 확인했다. 별칭은 canonical ID로 저장된다. career.js/class-tree.js의 게임 규칙을 수정하지 않았다.
- **탐험 진행 오류 미재현:** journey.js가 engine.js의 진행 함수를 최종 확장한다. 일반 스토리 경로는 chapters.js가 노드마다 1개 후보로 결정하며, 버튼을 눌렀을 때 nextEncounter가 그 후보로 이동한다. 타이머 기반 진행을 추가하지 않았다. 전리품/지급 한 번/쉼터/상점/중간 수문장/지역 보스/장 이동은 기존 여정 회귀로 검증한다.
- **E-03 CSS 중복:** 이전 UI 단계와 모바일 보정의 cascade가 존재한다. 선언 중복 자체를 런타임 오류로 취급하거나 전체 CSS를 리팩터링하지 않았다. 재현된 36px 선언만 수정했다.
- **E-06 장비 이전:** 공식 슬롯은 weapon/armor/charm 3개이다. 6슬롯 저장의 추가 장비는 legacyEquipment에 보존하고 능력치에서는 제외하는 기존 설계를 유지했다. 실제 구 엔진 29직업 저장, BF1/BF2/BF3, HP/MP 상한 보정, RNG, 손상 입력 보호 검증을 재실행했다.

## 이미지 조사 범위

저장소의 전체 에셋과 레지스트리, 직업 114종, NPC/스토리/장비 매핑 및 현재 제작 파일 목록을 조사했다. 전체 후보 목록은 `handoff-library-inventory.json`이다. 신규 연결 후 에셋은 147개, 직업 전용 그림은 71종, fallback 직업은 43종이다. NPC 전용 Portrait 6개 null은 해당 인물의 story 그림/지역 배경으로 대체되고, Creature/Victor는 기존 피조물 장면을 공유한다. Queen/Quixote 전용 스토리 그림은 없다.

개별 장비 그림 24개 파일(중복 왕관 후보 포함)을 직접 시각 확인했다. 성배/반지/모래시계/나침반/거울/약병/토끼발/십자가/왕관/책/망치/열쇠/등불/갑옷/가방 등의 그림은 있지만 현재 ITEMS ID를 확정할 제작 정의가 없는 후보다. 현재 저장소에는 per-item 그림 파일이 없으며 1,000개 null은 3개 공용 슬롯 SVG로 fallback하는 정상 경로다. 특정 장비에 임의 배정하거나 새 장비 ID·슬롯을 추가하지 않았다. 기타 서술형 직업 그림도 ID 근거 확인 전 보류했다.

## 검증

- 기존 main에서 npm test: PASS.
- 히든 14종 67개 조건/별칭과 부가 제한: PASS.
- 수정본 npm test·빌드 일치: PASS. 최종 게임 변경 커밋 `a07326de410baacffce9a0bcd60c465362b485e4`.
- 요청 크기 375×667, 390×844, 393×852, 430×932의 Chromium/WebKit 클릭·터치 16조합: PASS. QA 브랜치 실행 [37725197061](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37725197061), main 재검증 [37725528611](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37725528611). 신규 그림 10장 모두 실제 직업 검색 UI에서 decode·640×960·contain 확인. 버튼 44px 이상, 전투 하단 sticky, 가로 넘침, 모달 경계·열기·닫기, 저장 새로고침·손상 입력 보호, 보상 및 다음 조우 수동 진행 확인.
- 기존 npm run test:browser / npm run test:mobile 및 스토리 화면 검증: PASS. main 기존 통합 워크플로 [37725528569](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37725528569)의 11개 job 모두 성공(Chromium/WebKit 스토리 320/360/375/390/430 포함).
- 초기 추가 이미지 테스트는 앞선 테스트가 남긴 히든 계열 필터 때문에 실패했다. 테스트만 전체 계열로 초기화해 재검증했다. 게임 검색 기능은 수정하지 않았다.
- 로컬 Playwright 설치는 실패하여 로컬 브라우저 실행은 NOT TESTED. 위 브라우저 PASS는 GitHub Actions의 실제 Chromium/WebKit 실행 결과다.
- 실제 휴대폰 Safari/Chrome: NOT TESTED.
- main 반영 및 수정본 Pages 배포: PASS. 게임 커밋 `a07326de410baacffce9a0bcd60c465362b485e4`의 [Pages 실행 37725528054](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37725528054) 성공. 공개 HTML SHA256 `7246215b73f8939f9c90dbbc8b432540bd97c7b9a2dcb933ed31981ee0521681`이 해당 커밋과 일치하며 연결 파일 147개 전체 HTTP 200 및 바이트 일치 PASS(통합 verify job `113142699062`). 이 결과를 기록하는 후속 커밋은 문서만 변경한다.
- 공개 사이트를 추가로 여는 클라우드 브라우저 호출은 중단되어 수동 육안 확인은 완료하지 못했다. 위 자동 브라우저·실서비스 파일 검증과 구분한다.

실제 배포 파일은 루트 index.html이다. style.css + shell.html + build.py의 모듈 목록(마지막 engine.js/qa-relationships.js/career.js/chapters.js/journey.js 및 ui.js)이 HTML 안에 포함되며 별도 원격 JS를 불러오지 않는다. black-forest.html과 index.html은 생성 파일이므로 직접 고치지 않는다.

## 남은 작업

- 직업 43종 전용 이미지와 Queen/Quixote 스토리 이미지의 원본 ID 확인. 현재 fallback을 유지한다.
- 장비 후보 24개 파일의 ITEMS ID를 확정할 제작 정의 확보 후 개별 장비 매핑. 기존 그림과 공용 슬롯 이미지를 유지한다.
- 실제 휴대폰 Safari/Chrome에서 최종 육안·실터치 확인.

## 변경 파일

- style.css: 모바일 버튼 높이 선언 2곳 36→44px.
- assets.js, assets/class_*.webp 10개: 확인된 기존 그림 연결·배포 형식 변환.
- data/database.json, data/asset-registry.json, asset-results.json, docs/image-inventory-after.json: 기존 내보내기 절차로 이미지 레지스트리 동기화.
- black-forest.html, index.html: 정상 빌드로 CSS·이미지 연결 반영.
- test-hidden-audit.cjs, test-handoff-art-ui.cjs, test-ui.cjs, package.json, .github/workflows/handoff-audit.yml: 해금 조건·요청 해상도·터치 영역·직업 이미지 회귀 검사.
- README.md, QA-REPORT.md, RECONCILIATION-REPORT.md, docs/handoff-*.json 및 이 문서: 현재 상태와 원본 근거 기록.
