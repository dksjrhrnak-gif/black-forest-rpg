# 검은 숲의 방랑자 — 마지막 불씨 4.0

모바일 우선 한국어 텍스트 RPG. 공식 원본은 이 저장소의 모듈 소스이며 `python3 build.py`가 `style.css`, `shell.html`과 게임 JavaScript 모듈을 묶어 `black-forest.html`을 생성한다. `python3 export-site.py`가 동일한 HTML을 루트 `index.html`과 `dist/index.html`에 복사한다. GitHub Pages는 main 루트의 `index.html`을 배포한다. `black-forest-mobile.html`은 이 저장소에 없다. 현재 검수 결과와 배포 근거는 [후속 검수 보고](docs/handoff-audit.md)를 확인한다.

## 최종 데이터

- 일반/확장 100종 = Tier 0 6 + Tier 1 37 + Tier 2 33 + Tier 3 24. 히든 14종은 별도다. 총 114종.
- 원본 29종의 ID와 기존 확장 71종 ID를 유지하고 일반 직업 14종을 추가했다. 능력치 대신 계보·효과·조건으로 특화한다.
- 새 모험은 모험가·전사·도적·마도사·사냥꾼·수호자 중 시작한다. `career`에 현재 직업·숙련도·성장 기록을 저장하며, 부모 직업·레벨·숙련도·지역 보스와 관련 조건을 만족해야 전직한다. 일반 전직 시점은 지역 보스 1/3/6개 이후다.
- 캠프 자유 전직은 제거했다. 발견한 히든을 선택하면 이번 Run의 일반 경로가 닫힌다. 영구 발견 기록이 있어도 다음 Run은 Tier 0에서 시작한다.
- `blank_page`, `last_author`는 기존 기이 히든 두 종의 별칭이다. 저장 ID는 `x_occult_15`, `x_occult_16`으로 유지하여 14종을 넘기지 않는다.
- 장비 1,000개 DB 레코드: 무기400·갑옷350·부적250. 원본48 + 문학 도검50 + 테마·형태·등급 조합902. 추가 강화와 무작위 옵션은 별도 변형이다. 슬롯3·등급6·옵션12·가방40·최대강화8은 유지했다.
- 8지역은 각 외곽·심부·중심부로 나뉜다. 후보 콘텐츠16, 실제 경로12노드 후 보스. 유리 늪과 달의 도서관에 선택형 중간 수문장. 4/8/12노드 야영 지점에서 경로·선택지를 보존하고 캠프에서 정비할 수 있다. 별 없는 회랑은 기존4노드다.
- 기존 3개 메인 사건·동료 퀘스트·지원·엔딩을 유지했다. 세력 평판 `factions`와 개인 관계 `affinity`는 독립이다. 개인6명: Alice·Queen·Creature·Victor·Ahab·Quixote. 기존 `affection.adam`은 Creature로 이어진다.
- 호감도40의 공동 조사, 기존3인 호감도60의 개인 퀘스트 및80의 지원, 특정 전직·히든 조건, 개인·세력 후일담에 실제 반영된다.

## 화면과 이미지

`assets.js`에 경로를 모았다. 연결 이미지 147개(144 WebP + 공용 장비 SVG 3개): 직업 71종, 적 33종, 보스 9종, 지역 8종, 이벤트 18종, 스토리 CG 3종, 배너/캠프 2종이다. 전용 이미지가 없는 직업 43종은 텍스트 fallback을 사용한다. NPC 전용 Portrait 6종과 Queen/Quixote 스토리 그림은 fallback을 사용하며 Creature/Victor는 기존 피조물 장면을 공유한다. 1,000개 장비는 슬롯별 공용 아이콘 3개를 사용한다. 제작된 개별 장비 그림은 현재 장비 ID와 연결 근거가 없는 후보도 있어 임의로 배정하지 않는다. 확인된 새 연결은 [이미지 연결 근거](docs/handoff-image-connections.json)에 기록한다. 이미지 오류 시 숨기고 대체 텍스트를 표시한다.

장비창은 현재 직업·최고 장비 등급의 테두리·3슬롯·현재 능력치·선택 장비 상세·장착 전 비교를 표시한다. 강화 비용·확률·실패 보정과 기존 옵션 재설정을 호출한다. 변경된 능력치는 약0.9초 표시한다.

모달은 fixed·safe-area·내부 스크롤·overlay·배경 inert·스크롤 잠금·닫기·Esc·포커스 순환을 구현했다. 터치는 브라우저의 단일 native click과 `touch-action:manipulation`을 사용한다. 구형 GitHub 배포의 pointer 기반 합성 클릭을 가져오지 않았다.

## 저장 호환

자동 저장 키는 기존 `black-forest-last-ember-v2`를 유지한다. 신규 코드는 `BF3:` / format `black-forest-v3`, state.version3이다. BF1 JSON과 BF2 코드를 읽고 누락된 affinity·career·storyFlags·npcVisits·midbosses·checkpoint를 보완한다. 기존 직업·장비·재화·해금·수집·난수 상태를 보존한다. 개인 관계의 호환용 `affection`도 유지한다. 손상된 입력은 현재 진행을 덮어쓰지 않는다.

## 빌드와 검증

```sh
npm test
python3 build.py
node export-data.cjs
python3 export-site.py
```

`jobs-114.csv`가 공식 전체 직업 CSV다. `jobs-100.csv`는 이전 다운로드 주소 호환용으로 동일한114개 레코드를 담는다.

`npm test`는 Node에서 실제 게임 로직을 실행한다. 원본29직업의 전투348건 및 Alea 난수 비교, BF1/BF2 마이그레이션, 전직 조건, 1,000종 장비 드롭, 관계, 챕터, 모든 직업의684개 전투 회귀 캠페인과 시작6직업의18개 정상 성장 캠페인을 검증한다.

GitHub Actions에서 Chromium/WebKit의 클릭·터치·이미지·진행·저장 회귀를 실행한다. 기존 A/B/C 통합 QA의 완료 기록은 [최종 통합 보고](docs/final-completion-report.md), 2026-10-08 인계 검수와 요청한 화면 크기의 결과는 [후속 검수 보고](docs/handoff-audit.md)에 구분한다. 실제 iOS/Android 기기와 체감 플레이타임 2–4시간, 세션 20–40분은 미측정이다.

지원되는 브라우저 QA 환경에서 `npm run test:browser`, `npm run test:mobile`을 실행한다. `BF_QA_URL`로 검증 서버 URL, `BF_BROWSER=webkit`으로 WebKit, `BF_CHROMIUM`으로 제공된 실행 파일을 지정할 수 있다. Chrome의 모바일 에뮬레이션은 실제 iOS Safari 검증을 대체하지 않는다.


`BF_VIEWPORTS`에 `[{"width":375,"height":667},{"width":390,"height":844},{"width":393,"height":852},{"width":430,"height":932}]`를 지정해 요청한 크기만 검증할 수 있다. `BF_AUDIT_CONTROLS=1`은 활성 버튼의 44px 터치 영역, 전투 하단 버튼 접근, 추가 연결된 직업 그림을 검사한다. 별도 지정이 없으면 기존 8개 화면 크기를 유지한다.
