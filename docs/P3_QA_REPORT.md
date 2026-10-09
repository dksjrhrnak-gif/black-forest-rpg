# P3 QA 보고

## 환경과 재현

Node24.19/npm11.9, Python3.12, Playwright1.62.1. cloud-environment-onboarding:setup 스킬에 따라 기존 checkout·인증·신뢰 설정을 재사용했다. TLS/브라우저 샌드박스 우회나 환경 설정 변경 없음. GitHub CI는 Node22/ubuntu-latest와 실제 Chromium/WebKit/Firefox를 사용한다.

```sh
npm ci --ignore-scripts
python3 build.py
node export-data.cjs
python3 export-site.py
python3 verify-html.py
npm test
node analyze-p3.cjs
node test-p3.cjs
node test-p3-combat.cjs
node simulate-p3-economy.cjs
BF_P2_OUT=docs/p3/p2-regression node test-p2.cjs
BF_P2_OUT=docs/p3/p2-regression node test-p2-natural.cjs
BF_P2_OUT=docs/p3/p2-regression node test-p2-equipment.cjs
BF_P1_OUT=docs/p3/p1-comparison.json node test-p1-identity.cjs
BF_AUDIT_OUT=docs/p3/regression node audit-gameplay-quality.cjs all
# preview server 실행 후 BF_BROWSER/BF_QA_URL/BF_P3_OUT 설정
node test-p3-ui.cjs
```

P3 기준 VM은 실제 b240 소스를 읽으므로 CI checkout은 fetch-depth:0이다. 기존 테스트를 삭제하거나 약화하지 않고 P1/P2 공용 로더에 P3을 연결했다. P1/P2의 기존 독립 oracle도 유지한다.

## 실행한 자동 검사

| 검사 | 실제 결과 |
|---|---|
| npm test | PASS: 기존 호환·전투·관계·여정·자산·문안. 114직업 직접 지정×6시드=684캠페인은 자연 해금 증명이 아니다 |
| P3 전체 | 9,465검사, 가격9,000, 제작 수령45, 구매→판매900, 강화96, 조율33, 기존 엔딩조건6, 후일담180, 복원1,024회 일치 |
| 이전 저장 | P1이전228+P2이전228+P2완료 후144=600코드 완전 복원. 장비·강화·직업·해금·엔딩·선택·RNG 보존 |
| P3 전투 | 17,664전투/8,832쌍. 세트 미활성4,992경로 상태/RNG 완전 일치, 모든 구성 승률차0 |
| P1 회귀 | 20,736전투, 6,912동일 경로, 이전 저장228, 효과 probe6개 PASS |
| P2 회귀 | 이벤트21/지역선택9, 지급가능864, 저장1,326, P1 일치 전투4,104, 지정드롭27,000 PASS |
| P2 대표장비 | 11,520전투, 6품목/9조합. 승률차−.0026..+.0078 PASS |
| P2 자연진행 | 108/108엔딩, 지역사건324회 각1회, 저장2,512회 일치, 부활0 |
| P3 경제 자연진행 | 동일시드72쌍/144진행, 전후72/72엔딩. 복원2,140/2,233, 부활0 |
| 기존 자연감사 | 54/54엔딩, 저장484회 일치. 공격정책 부활1, 스킬·전술0 |
| 기존 문안·분기 | 156수치/분기/RNG 유지, 270선택 문안 PASS |
| 이미지 | 기존149파일/151매핑, 생성·삭제 없음 |

통계와 조건은 p3/automatic-qa.json, combat-comparison.json, p1-comparison.json, p2-regression/*.json, economy-*.json, regression/*.json에 기록했다. 큰 기존 전투 감사의 원시 반복 기록은 CI gameplay-data artifact에 남기고 저장소에는 요약/직업별 수치/기록 수를 보관한다. 원장은 캠페인별로 그대로 보관한다.

## 악용·경계

재료/골드 부족, 잘못된 설계/ID, 음수/NaN/Infinity/보유한도 초과, 미리보기 취소, 제작/수령 중복 호출, 제작→판매/분해→재제작, 강화→판매, 조율→판매/같은옵션 중복, 세트 ID/슬롯 위조·중복, 교체/해제/저장 캐시 중복, P2 재진입 및 저장 후 보상 재수령을 검사했다. 한도에서 기존 골드와 판매할 장비를 보존하며 보급함/전투/grant의 초과 후 저장도 검사했다.

초기 검사에서 새 소스와 번들 미동기화, 브라우저 테스트의 숨겨진 사이드바 선택과 후속 반응 관찰 지점, 임의 새게임 시드에서 전투 전 장비가 먼저 나오는 조건을 확인했다. 빌드를 갱신하고 실제 표시를 검사하도록 테스트 경로를 고쳤다. 기존 검사를 삭제해 통과시키지 않았다.

## 브라우저 경로와 증거

P3 검사는360/390/430/768/1280px에서 터치 이벤트로 새게임→실제 탐험/전투/보상→상점→재활용→제작15미리보기/취소→제작3→세트3→강화→장비 교체로세트2→조율→저장/재접속→P2선택/후속 반응→기존3결말을 확인한다. 새게임 시드는17로 고정한다. 각 UI 명령을 동일 저장의 엔진 기대 결과와 코드까지 완전히 비교한다.

가져오는 저장은 실제 명령으로 도달한 P2 수집형 중간캠프, P3 상인/최종, P2 지역 진입 상태다. 골드·재료·장비·진행을 합성 지급하지 않는다. 구간별로 정상 저장 가져오기를 사용하므로 하나의 중단 없는 캠페인이라고 보고하지 않는다. 자연 진행은 별도 자동 명령 시뮬레이션으로 검증한다.

로컬 결과는 p3/ui-*.json, 공개 결과는 p3/public/ui-*.json, 원격 CI/배포 증거는 p3/remote-qa.json이다. 3브라우저의 실제 통과 여부는 완료 후 아래 기록한다. 클라우드 Firefox는 실행 제한으로180초 후 launch 실패(/proc/self/uid_map EROFS, SWGL 오류)했고 이를 통과로 보고하지 않는다. GitHub CI Firefox는 실제 실행하며 Playwright의 isMobile 미지원 때문에 일반 컨텍스트+화면폭+hasTouch로 검증한다. 공개 Chromium/Firefox는 CI에서, WebKit은 CI와 클라우드에서 검사한다.

## 실측과 사람 평가의 구분

승률/HP/거래·교체 횟수/잔액/엔딩·복원/표시·클릭·터치·콘솔은 자동 실측한다. 직업·지역·선택·결말의 체감 차이, 제작·조율을 선택할 의향, 반복 강요의 불쾌감과 장시간 재미는 사람 평가가 필요하며 검증 완료로 주장하지 않는다. 물리 기기·OS차이·접근성 전체·모든 빌드·극단적 다회차 경제도 미검증이다. 자동 엔딩 도달은 재미의 보증이 아니다.

## 로컬 브라우저 완료

Chromium과 WebKit 모두360/390/430/768/1280px의 위 경로 통과, 각5검사 결과와 스크린샷 저장. 콘솔/런타임 오류0. 360px 엔딩 스크린샷을 직접 검토했고 지역 미래·성장 기록·버튼이 읽히고 줄바꿈되는 것을 확인했다. 클라우드 Firefox는 위 실행 제한으로 미검증이며 CI 결과를 기다린다.
