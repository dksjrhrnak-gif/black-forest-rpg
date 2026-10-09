# P3 인수인계

## 시작·보호 범위

시작 GitHub main은 `b24007be4030f484c6867fb50f040fd55edd2edb`, PR#1/#2/#3 모두 MERGED, 기존 Pages 성공을 확인했다. 최근10커밋은 p3/start-commits.json이다. P1_HANDOFF/P1_CLASS_IDENTITY/P2_HANDOFF/P2_EVENT_ANALYSIS/P2_EQUIPMENT_ANALYSIS/P2_IMAGE_REQUIREMENTS를 먼저 읽었다. 새 브랜치 `feature/p3-economy-crafting-endings`에서 작업했다. 사용자는 PR·main·배포를 중간 확인 없이 명시적으로 허가했다.

온보딩 setup 스킬에 따라 기존 환경·checkout·인증·TLS 신뢰를 재사용했다. 기존 engine.js/effects.js와 직업114개·아이템1000개·지역/이벤트21개/엔딩해금/히든조건은 보존했다. 세이브BF3 및 보유 재화/장비/plus/fails/선택 기록을 초기화하지 않는다. P1/P2를 재구현하지 않았다.

## 실제 변경

- 금화 수입·상점 구매가 유지, 능력치/옵션 기반 판매가와 강화회수 한도. 55G상자→60G품목 경로를 무강화최대50G로 막음. 보유골드 소급차감 없음.
- 기존 자원과ID를 쓰는15설계, 원본 성능/고정옵션 결과 미리보기, 재활용, 기존 수령/저장 경로, 재료부족/중복 안전장치.
- 기존4테마의 파생2·3부위 세트. MP/첫행동 회피/반사/저HP 흡혈·방어/치명타·기절로 역할 구분, 중복/캐시 없음.
- +1–3 비용 완화, 희귀 이상의 +6–8 비용 증가, 기존 확률/최대8/실패 보정 유지. 낮은 고정값의 목적형 마지막 옵션 조율 추가, 기존 무작위 재설정 보존.
- 실제3핵심결말에 P2선택·성공/실패에 따른 지역미래, 성장·선택 요약. 기존6조건 사례/3세력/NPC 후일담 유지. 기존‘6개엔딩’보고와 실제3개결말의 차이를 P3_ENDING_ANALYSIS.md에 정정.
- 생성HTML/테스트 로더/문안 검사/CI 연결. 실제Firefox와5화면폭P3 UI job을 추가하며 기존 테스트/job은 유지.

분석·비용·ID·원장·비교는 [P3_ECONOMY_ANALYSIS.md](P3_ECONOMY_ANALYSIS.md), [P3_CRAFTING_SETS.md](P3_CRAFTING_SETS.md), [P3_ENDING_ANALYSIS.md](P3_ENDING_ANALYSIS.md). 실행방법/숫자/한계는 [P3_QA_REPORT.md](P3_QA_REPORT.md), p3/*.json이다. 대규모 저장 이관·데이터 삭제·전설 남발·전체 재조정은 필요하지 않았다.

## GitHub·공개 검증

PR/병합/최신main CI/Pages/공개HTTP·브라우저 증거는 최종 검증 후 여기와p3/remote-qa.json에 추가한다. 필수CI실패 상태에서는 main을 병합하지 않는다. 공개 게임 URL: https://dksjrhrnak-gif.github.io/black-forest-rpg/ .

## 남은 작업·이미지

전용 이미지 생성은 이번 시스템에 필요하지 않는다. 현재149파일과 기존 장비/직업/지역 배경을 재사용한다. P2전용사건18/19/20, 기존직업42/장비999/NPC6/이야기2/ID불명후보2는 [P2_IMAGE_REQUIREMENTS.md](P2_IMAGE_REQUIREMENTS.md)의 정확한목록을 그대로 이관한다. 없던전용이미지를 대체그림으로 등록하지 않는다.

후반골드는 여전히 남고 목적형 조율의 scripted 이용률이 낮다. 사람의장시간플레이/실제기기/다회차 회랑 경제는 미검증. 다음은 실제플레이에서 제작·조율의 의향/재료 경쟁, 후반 소비 가치, 지역별 연출·전용이미지, 접근성을 검토하는 작은 개선이다. 자동승률/도달률만으로 재미를 단정하지 않는다. 필수 검증 범위의 미해결기능문제가 있으면 최종 증거에 별도로 기록한다.
