# P2 인수인계

## 시작 상태와 범위

시작 main은 `fa059638b48a38e4f0c10dcb7f9699ab5234c2be`다. 실제 GitHub main과 일치했고 PR #1·#2는 MERGED, Pages run 37810998266은 SUCCESS였다. P1_HANDOFF.md와 P1_CLASS_IDENTITY.md를 먼저 읽었다. 별도 브랜치는 `feature/p2-exploration-equipment`다. 사용자는 이번 P2의 구현·PR·main 병합·Pages·공개 QA를 중간 확인 없이 진행하도록 명시했다.

P1의 직업 정의 114개, effects.js, 계보·해금·숙련·전투 공식은 바꾸지 않았다. P3 경제·제작·엔딩 편집도 포함하지 않는다.

## 분석과 선정

- 8지역의 공용 이벤트 18개는 ID·선택·비용·보상·확률이 같았다. 지역 이야기는 달랐지만 랜덤 사건의 지역성은 작았다. 원본/현재 전수와 선정 이유는 [P2_EVENT_ANALYSIS.md](P2_EVENT_ANALYSIS.md), p2/baseline-analysis.json, event-analysis.json.
- 장비 1000개를 기존 감사와 함께 조사했다. 고정등급 952개 중 같은 슬롯·등급·고정옵션 수의 벡터 비교에서 하위품 161개를 확인했다. 무작위 추가 옵션과 실제 빌드 효용을 이 수치로 단정하지 않는다. 대표 고급 방어구/장신구 6종만 목적을 교환했다. [P2_EQUIPMENT_ANALYSIS.md](P2_EQUIPMENT_ANALYSIS.md), equipment-analysis.json.

## 실제 구현

| 지역 | 신규 이벤트 | 선택과 연결 |
|---|---|---|
| 1 침묵의 마을 | 18 종 아래 남은 증언 | 골드로 낭독 / HP를 쓰는 추적·방어구 / 무료 사본. 이전 등불 선택과 반사·회피 장비가 확률에 영향 |
| 4 붉은 사막 | 19 모래에 묻힌 물통 | 물약 공유 / HP를 쓰고 전갈과 전투 / 무료 기록. 이전 물 나눔은 재료, 방어 행동·회피 장비는 첫 피격 약화 |
| 5 달의 도서관 | 20 여백의 빌린 이름 | MP를 쓰는 장신구 도전 / 약초 봉합 / 무료 사본. 앞선 지역 기록과 MP 장비가 확률·보상에 영향 |

각 사건은 이야기 모드·해당 지역·챕터 경험·미기록 조건에서 랜덤 슬롯9에 모험당 한 번 등장한다. 기존 고정 이야기/NPC/쉼터/중간 수문장/보스 순서는 유지한다. 초기 슬롯6 배치는 바로 뒤 쉼터 때문에 회복 대가가 약해 슬롯9로 옮겼다. 완전 HP/MP에서 도서관 봉합은 회복 대신 광석4(MP 장비5)를 준다. 모든 사건에 무료 선택이 있다.

기존 `decisions`에 `p2_bell`, `p2_water`, `p2_margin`의 선택·결과 문자열을 저장한다. 기록을 지급/전투보다 먼저 남겨 재시도·중복 지급을 막는다. 다음 쉼터 문장, 중심부 이야기/지역 재방문, NPC 문장에서 선택을 기억하며 도서관은 앞선 두 지역 기록을 조건과 보상에 연결한다. 경험하지 않은 사건을 대사에 만들어 넣지 않는다.

장비 변경: `set_armor_20` 토끼굴의 로브(MP), `set_armor_7` 산초의 귀환길의 흉갑(반사), `set_armor_13` 노트르담의 종의 흉갑(회피), `set_charm_1` 하트 법정의 반지(치명타), `set_charm_7` 산초의 귀환길의 반지(흡혈), `set_charm_13` 노트르담의 종의 반지(MP). 방어 또는 행운 기본수치를 낮추고 기존 옵션 범위에서 교환한다. 994개 정의와 모든 ID·등급·지역·강화·판매 공식은 유지한다.

보상 선택성: 종 추적은 방어구, 도서관 낭독은 장신구를 지정하되 기존 정예 희귀도·천장·지역 조건을 적용한다. 상인의 기존 무작위 55G 상자에 같은 가격·희귀도의 무기/방어구/장신구 상자를 추가했다. 전갈 전투는 기존 전투 보상을 쓴다. 전설 추가·전체 보상 인상·새 자원/효과 타입은 없다.

런타임 구현은 p2-exploration.js, engine.js의 공용 이벤트 풀 필터/선택 슬롯 인자/미믹 전용 문장 조건, ui.js의 선택·문장·상자 표시다. 빌드/테스트 로더에 모듈을 연결했고 기존 156개 수치·분기·RNG 기준은 그대로 보존했다. 새 9개 선택은 별도 전수 검사와 기존 브라우저 문안 검사에 추가했다.

## 로컬 검증

- npm test 통과: 기존 저장·직업·장비·전투·관계·히든67조건·엔딩·여정·156개 이야기 수치/RNG·270개 문안 검사. 114직업 직접 지정×6시드의 684 캠페인 회귀도 통과했다. 직접 지정은 자연 해금을 증명하지 않는다.
- P2 자동 검사: 21이벤트/지역9선택, 자원·장비·이전 선택·24시드의 864개 지급 가능 경로. 부족 비용/무료 대안/틀린 선택/틀린 기록/틀린 지역/회랑/안개 누출/중복 보상/저장 후 재지급을 검사했다. 초기 자연 검사에서 안개 경로의 공용 풀 누출을 발견해 필터를 보완했고, 최종 문안 검수에서 전갈 전투의 미믹 설명을 실제 미믹에만 제한했다. 800개 안개 음성 경로를 추가했다.
- 이전 저장 228개(P1) + 228개(pre-P1)는 코드까지 완전 일치 복원. 변경 대상 기존 장비 6개의 저장 수치와 가방도 보존. 신규 결과를 포함해 자동 검사 복원 1,326회 일치. 신규 버전·최상위 필드·대량 마이그레이션 없음. 기존 엔딩/히든/직업 해금 조건 유지.
- 기존 P1 입력 장비로 114직업 전투 4,104회 비교: 상태·HP/MP·숙련·보상/RNG 일치. 별도 기존 P1 효과 비교 20,736회/미변경 경로6,912개도 통과했고 결과는 p2/p1-effect-comparison.json에 보존했다.
- 변경 6장비 + 방어구/장신구9조합 전후 전투 11,520회: 집계 승률 변화 −0.26~+0.78%p, 과도한 강화/약화 안전창 통과. p2/equipment-comparison.json. 약한 고급 장비의 후반 fixture를 최적 빌드로 주장하지 않는다.
- 슬롯 지정 드롭 27,000개: 슬롯·아이템 참조·지역 조건·동일 RNG에서 기존 정예 희귀도 롤 일치. 55G 비용/부족 자원/연속 클릭/저장·복원 검사 통과.
- P2 자연 진행: 실제 시작 직업6×시드6×이벤트 정책3 = 108/108 엔딩, 324개 일회성 지역 사건, 저장2,521회 일치, 부활0. 새 레벨·장비·숙련·지역을 주입하지 않는다. p2/natural-progression.json.
- 기존 자연 정책54/54 엔딩, 저장483회 일치. 공격 정책1회 부활, 스킬·전술0회 부활. p2/regression/long-play.json. 두 자연 코호트는 서로 겹치는 시드가 있어 독립 사용자 수로 더하지 않는다.
- Chromium/WebKit P2 모바일은 각각36검사(360/390/430×지역9선택 + 슬롯3상자). 실제 자연 진행의 48/136/161번째 명령에서 만든 지역 진입 저장을 일반 UI로 가져와 선택→전투→보상→장비 비교/획득→저장→재접속→선택 반응을 검증한다. 상인 화면만 UI fixture이고 골드·장비는 실제 모험 값이다. p2/browser-entry-provenance.json, ui-*.json. 최종 슬롯9 구현도 두 엔진36검사가 통과했고 이미지/후속 문장을 직접 확인했다.
- 일반 모바일3폭의 기존 여정·장비·저장·보상·중복터치 회귀도 두 엔진에서 통과했다. p2/mobile-regression-*.txt. 콘솔/런타임 오류0. 실제 물리 기기 검증은 아니다.

## 원격 반영과 공개 검증

[PR #3](https://github.com/dksjrhrnak-gif/black-forest-rpg/pull/3)은 검증 HEAD `372ef335b189db07e4f83b402d23e17d4b4990bd`에서 16검사 통과 후 2026-10-09 01:29 UTC에 병합했다. main 런타임 병합 SHA는 `5eba231f6038a4aa525ac8e0c0b279f0bbfdc186`이다. PR/main 사이의 런타임 트리도 일치한다.

- PR CI: [Handoff 37868928316](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37868928316) 5개, [통합 37868932067](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37868932067) 11개 성공. 이전 HEAD의 두 CI는 최신 커밋으로 대체하며 취소했으며 실패한 결과로 병합하지 않았다.
- main CI: [Handoff 37869987766](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37869987766) 7개, [통합 37869987645](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37869987645) 11개 성공. 18검사는 자동/자연/장비/P1 회귀·지역 UI·공개 두 브라우저를 포함한다.
- [Pages 37869987424](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37869987424) 성공, deployment 6950709530은 병합 SHA와 일치하며 01:29:28 UTC success다. source는 main `/`다.
- [공개 게임](https://dksjrhrnak-gif.github.io/black-forest-rpg/)에서 HTML SHA256 `16f9f7d15ccc98b58dfaf96672d64de0468a5951420bd876687e9b2f8f7f510d`, 149이미지/CSV3개 모두 HTTP200·바이트 일치. p2/public-http-assets.json.
- 공개 Chromium/WebKit main CI의 각각 P1 18검사·P2 36검사·일반 모바일360/390/430 검사 통과. P2 경로는 새 게임→실제 자연 진행에서 만든 저장 가져오기→지역 사건/9선택→전투→보상→장비 비교/획득→저장/재접속→후속 반응이다. 저장 및 이벤트 기록 일치, 터치·스크롤·이미지·텍스트 잘림·중복 지급·콘솔/런타임 오류0을 검사한다.
- 이 클라우드에서도 공개 WebKit P2 36검사를 독립 실행해 통과했다. p2/public-ui-webkit.json. 공개 Chromium은 CI runner에서 검증했다. 클라우드의 Chromium TLS 신뢰 설정을 우회하지 않았다.
- p2/remote-qa.json에 실제 GitHub run/job/step 상태와 배포 증거를 남겼다. Actions의 gameplay-data, resumed-live-chromium/webkit 등 artifact는 raw QA와 스크린샷을 보관한다. 이 클라우드의 artifact 다운로드403 때문에 raw 공개 Chromium 파일을 내려받았다고 보고하지 않는다.

마지막 main 커밋은 이 결과/공개 증거만 기록하는 `[skip ci]` 문서 커밋이다. 위18검사가 검증한 런타임과 파일 내용이 동일함을 확인하고, 문서 커밋의 Pages 성공 및 공개 HTML/자산 일치도 다시 확인한다. 최종 GitHub tip SHA와 최종 Pages run/deployment는 완료 보고에 별도로 남긴다. 이미 통과한 런타임 검사를 문서만 바뀐 이유로 중복 실행하지 않는다.

## 이미지와 잔여 위험

[P2_IMAGE_REQUIREMENTS.md](P2_IMAGE_REQUIREMENTS.md)에 미제작 이미지의 정확한 ID·용도를 남겼다. 기존149자산을 점검했고 경로 누락/미등록 기존 파일은 없었다. 신규 사건18/19/20의 전용 이미지는 없다. 일반 지역 배경을 사용하며 전용 사건 그림으로 등록/보고하지 않는다. 기존 잔여는 직업42·장비999·NPC6·이야기2, ID불명 후보2다. 실제 파일이 없는 이미지를 생성하거나 임의 다른 전용 이미지로 대체하지 않았다.

기능 오류는 통과한 자동 QA 범위에서 발견되지 않았다. 실제 기기/Firefox/사람의 장시간 플레이·재미, 모든 빌드 조합과 자연 히든 빈도는 검증 완료로 주장하지 않는다. 다른5지역은 기존 공용 이벤트를 유지한다. 기존 엔진은 회복/MP 재생이 넉넉하고 후반 재료가 쌓일 수 있어 경제 전체 해결로 보고하지 않는다.

P3 이관: 가치 기반 판매가·경제, 장비 제작·세트/강화 시스템 확장, 엔딩별 장기 결과 편집. 이번 범위에서 구현하지 않았다. 위험한 저장 이관이나 콘텐츠 삭제는 필요하지 않았다.

## 변경 파일

최종 P2 변경은 58파일(런타임·테스트·빌드/데이터·문서/QA 증거 포함)이다.

- .github/workflows/handoff-audit.yml
- analyze-p2.cjs
- asset-results.json
- audit-copy.cjs
- black-forest.html
- build.py
- data/asset-registry.json
- data/database.json
- data/items-1000.csv
- docs/P2_EQUIPMENT_ANALYSIS.md
- docs/P2_EVENT_ANALYSIS.md
- docs/P2_HANDOFF.md
- docs/P2_IMAGE_REQUIREMENTS.md
- docs/image-inventory-after.json
- docs/p2/automatic-qa.json
- docs/p2/baseline-analysis.json
- docs/p2/browser-entry-provenance.json
- docs/p2/equipment-analysis.json
- docs/p2/equipment-comparison.json
- docs/p2/event-analysis.json
- docs/p2/image-requirements.json
- docs/p2/mobile-regression-chromium.txt
- docs/p2/mobile-regression-webkit.txt
- docs/p2/natural-progression.json
- docs/p2/p1-effect-comparison.json
- docs/p2/public-http-assets.json
- docs/p2/public-ui-webkit.json
- docs/p2/regression/long-play.json
- docs/p2/remote-qa.json
- docs/p2/ui-chromium.json
- docs/p2/ui-webkit.json
- docs/script-audit.json
- docs/system-copy-audit.json
- engine.js
- fixtures/p2-pre-engine.js
- fixtures/p2-pre-saves.json
- index.html
- integration-results.json
- items-1000.csv
- p2-browser-fixtures.cjs
- p2-exploration.js
- p2-test-support.cjs
- preview-http-results.json
- script-cases.cjs
- test-assets.cjs
- test-compatibility.cjs
- test-engine.cjs
- test-integration.cjs
- test-journey-ui.cjs
- test-p1-identity.cjs
- test-p2-equipment.cjs
- test-p2-natural.cjs
- test-p2-ui.cjs
- test-p2.cjs
- test-results.txt
- test-script-ui.cjs
- test-support.cjs
- ui.js
