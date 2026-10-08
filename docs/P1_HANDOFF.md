# P1 인수인계

## 시작·PR #1·첫 공개 버전

- 시작 main: `5f879371660038d516f71aab8d718fa3cb20b57e`.
- 시작 QA: `7052fabdcca30039ddfefca9a710d4b2dbd9fdfa`, PR #1 open/충돌 없음/이전 코드 CI 16검사 성공. 실제 GitHub 상태가 이전 보고와 일치했다.
- PR #1 파일 전수 검토, 핵심 데이터 동일 확인, npm test/HTML 동기화 재검사 후 merge했다.
- PR #1 병합 main: `8a10eef63418b4d10fa75992ef1be4e554b31cc5`.
- Pages: run `37802421992`, deployment `6939921871`, 위 SHA 성공.
- 첫 공개 HTML SHA256: `9674b2fb540d4de5666adb539e26a0c3631cad1204c37717150f36df4afe3c87`. 149자산 HTTP200/바이트 일치.
- 공개 WebKit: 30화면에서 이미지2장/2:3/한국어 비교 확인, 360·390·430 여정/새 게임/기존 저장/전투/보상/장비/엔딩/새로고침 검사 통과, 콘솔/런타임 오류0.
- 원격 공개 Chromium도 통과. 첫 공개 WebKit CI는 Pages가 아직 이전 HTML을 제공할 때 실패했고, 배포 후 failed job 재실행 성공. 로컬 일시503 자산은 개별 바이트를 재검사하고 전체149자산을 다시 검증해 통과했다.
- 원격 main 회귀 run `37802425547` 및 `37802426128` 최종 SUCCESS.

## P1 분석·구현·검증

- 브랜치: `qa/p1-class-identity-20261008`.
- 114직업의 10개 축 분석/분류는 P1_CLASS_IDENTITY.md와 p1/classification.json. 공유 스킬 시그니처25→31, 동일 기본스탯/효과 전체 중복0. 휴리스틱이며 재미 점수는 아니다.
- 실제 변경6종: x_magic_0/x_magic_15/x_ranged_2/x_occult_13/x_support_16/x_support_17. 기존 도트/기절/약화/흡혈/회복을 재사용하고 직접 피해를 낮춰 교환한다. 증언 도둑 후보1.55배는 실제 손실을 보고1.6배로 조정했다.
- 기본 스탯/패시브/MP비용/해금/계보/아이템/공통 전투 공식/스토리/엔딩/저장 필드 변경 없음.108직업 전체 정의 동일, 기존29직업348전투 일치 회귀 유지.
- 전후10,368쌍/20,736전: 6,912개 미변경 전투 경로 저장/RNG까지 동일.6실제 효과 probe 차이 확인. 전체 집계 승률 변화 −2.1~+5.9%p, 평균 템포 안전창±25% 통과. 개별 약장비 조건은 더 큰 변화가 있어 전체 균형 완성을 주장하지 않는다.
- 이전114직업×캠프/사용 후 전투228저장 완전일치 복원. 새 도트/약화 저장도 검사. 기존BF1/BF2/BF3·옛6슬롯 호환성 통과. 스키마 추가/대량 이관 없음.
- 자연54/54엔딩, 저장474회 일치/실패0. 공격1부활, 스킬/전술0부활. 실제 독서 시간/재미 측정은 아니다.
- npm test/부정 해금/장비1000/희귀도·지역/보상/156분기·수치/RNG/261문안 검사, build/export/HTML 일치 통과.
- P1 실제 UI: Chromium/WebKit 각각3폭×6직업=18검사, 이전 저장 로드→새 스킬→상태 저장→reload가 엔진과 동일. 콘솔/런타임 오류0.
- 일반 모바일: 두 엔진360/390/430 여정/보상/장비/도감/대화/이미지/엔딩/중복 터치 회귀 통과.
- 로컬 HTTP: HTML `b9421b9a49be4a6386858f515bce5768878955f4dcdb020232c13592a3f1c991`,149자산+CSV3개 바이트 일치. root의 공개CSV도 data와 함께 갱신된다.

## 최소 배포 보완

wait-pages-deployment.cjs와 workflow는 해당SHA의Pages성공을 기다린 뒤 공개 검사를 실행한다. 최초 배포에서 확인한 검사/배포 경쟁 조건을 줄인다. export-site.py는 공개 root/preview dist의 CSV를 정식data와 동기화하고 test-http-assets.cjs가3개CSV의바이트를확인한다. 기존 감사 결과는 BF_AUDIT_OUT으로 P1 결과와 분리해 보존한다.

## 다음 상태 기록

검증한 P1 커밋을 PR로 main에 병합하고 Actions/Pages/공개 HTML·자산·CSV·이전 저장·6스킬·모바일을 확인한다. 실행 SHA와 최종 원격 결과는 후속 완료 기록에 추가한다. 사용자 중간 확인은 요구하지 않는다.

P2 잔여: 지역별 이벤트 조건과 제안3개/장비 선택성·보상 가치. P3 잔여: 경제/제작 확장·엔딩 차별화. 이번에 구현하지 않는다. 미해결 검증 한계: 실제 기기/Firefox/사람의 장시간 플레이/모든 히든의 자연 빈도/30턴 이상 자연 전투. 이미지 미제작 직업42·장비999·NPC6·story2, ID불명 후보2도 그대로다. 위험한 저장 이관/콘텐츠 삭제는 필요하지 않았다.

## 변경 파일 전수

- .github/workflows/handoff-audit.yml
- audit-gameplay-quality.cjs
- black-forest.html
- data/database.json
- data/jobs-100.csv
- data/jobs-114.csv
- docs/P1_CLASS_IDENTITY.md
- docs/P1_HANDOFF.md
- docs/p1/classification.json
- docs/p1/comparison.json
- docs/p1/local-http-assets.json
- docs/p1/mobile-regression-chromium.txt
- docs/p1/mobile-regression-webkit.txt
- docs/p1/pr1-public-assets.json
- docs/p1/pr1-public-mobile-webkit.txt
- docs/p1/pr1-public-quality-webkit.json
- docs/p1/regression/long-play.json
- docs/p1/ui-chromium.json
- docs/p1/ui-webkit.json
- docs/script-audit.json
- docs/system-copy-audit.json
- effects.js
- export-site.py
- fixtures/p1-pre-effects.js
- fixtures/p1-pre-saves.json
- index.html
- integration-results.json
- jobs-100.csv
- jobs-114.csv
- preview-http-results.json
- test-http-assets.cjs
- test-p1-identity.cjs
- test-p1-ui.cjs
- test-results.txt
- wait-pages-deployment.cjs
