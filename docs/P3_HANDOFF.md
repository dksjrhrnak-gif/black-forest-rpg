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

[PR #4](https://github.com/dksjrhrnak-gif/black-forest-rpg/pull/4)를 최종 HEAD `7a7cd095cd17695920a1745009c6e0c0cc3bc21f`의19검사 모두 통과 후 병합했다. 병합 main은 `caef7c8732159ea0ac2c9e1413ba9c5555a415bc`, 병합시각2026-10-09 03:26:45 UTC다. 실제 PR 검수는52파일, 충돌없음, 기준main 불변, core 파일 불필요 변경없음을 확인했다.

- PR CI: [Handoff 37878333439](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37878333439)8개, [통합 37878367060](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37878367060)11개 성공. main 전용 public job은 PR에서는 제외다.
- main CI: [Handoff 37879308436](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37879308436)10개, [통합 37879308456](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37879308456)11개, 총21개 성공. 기존16/18검사는 보존하고 P3의 실제3브라우저 job을 추가했다.
- [Pages 37879307797](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37879307797) 성공, deployment6952254996은 병합SHA와 일치한다. source는main `/`다.
- [공개 게임](https://dksjrhrnak-gif.github.io/black-forest-rpg/) HTML SHA256 `d6c03bd1d48c7999c0c1dbc8706f6021d76d4b61c1b0c8d1824ddb5e582a7eca`, 149이미지/CSV3개 HTTP200·바이트 일치. p3/public/http-assets.json.
- 공개 Chromium/WebKit/Firefox 각각P3 5화면폭 검사 성공. 모든 제작·강화·조율·세트변경·저장·P2반응·3결말 경로에서콘솔/런타임오류0을 assert했다. Chromium/WebKit 기존 P1/P2 공개회귀와 일반 모바일도 성공했다. 이 클라우드에서공개WebKit P3도독립실행PASS, p3/public/ui-webkit.json.
- 클라우드Firefox 실행실패는환경한계로 별도 기록했다. 실제Firefox PASS는정상GitHub CI runner의 로컬·공개실행이다. Firefox는일반컨텍스트+응답형폭+터치이며모바일전용에뮬레이션이라고주장하지않는다.
- p3/remote-qa.json에 실제run/job/step/deployment 상태를 기록했다. CI gameplay-data/p3-firefox/p3-chromium/p3-webkit/resumed-live-* artifact는원시결과·스크린샷을 보관한다. 클라우드에서 인증 artifact 다운로드는리다이렉트 저장소의Forbidden으로불가했다. raw Firefox파일을 내려받았다고 보고하지않으며 실제성공 step과검증한source에 근거한다.

완료 증거를 기록하는 최종커밋은 `[skip ci]` 문서/QA결과만 바꾼다. 위21검사를 검증한 런타임·HTML·CSV·이미지·테스트/빌드 파일은 동일하다. 최종문서커밋의 Pages 성공과공개HTML/자산일치는다시 확인하며 최종tipSHA/Pages run은완료보고에 따로 남긴다. 문서변경만으로 동일 런타임 검사를 반복하지 않는다.

## 남은 작업·이미지

전용 이미지 생성은 이번 시스템에 필요하지 않는다. 현재149파일과 기존 장비/직업/지역 배경을 재사용한다. P2전용사건18/19/20, 기존직업42/장비999/NPC6/이야기2/ID불명후보2는 [P2_IMAGE_REQUIREMENTS.md](P2_IMAGE_REQUIREMENTS.md)의 정확한목록을 그대로 이관한다. 없던전용이미지를 대체그림으로 등록하지 않는다.

후반골드는 여전히 남고 목적형 조율의 scripted 이용률이 낮다. 사람의장시간플레이/실제기기/다회차 회랑 경제는 미검증. 다음은 실제플레이에서 제작·조율의 의향/재료 경쟁, 후반 소비 가치, 지역별 연출·전용이미지, 접근성을 검토하는 작은 개선이다. 자동승률/도달률만으로 재미를 단정하지 않는다. 필수 검증 범위의 미해결기능문제가 있으면 최종 증거에 별도로 기록한다.

## 변경 파일

PR은52파일, 최종완료증거 포함57파일이다. 신규시스템은p3-systems.js와기존UI/빌드연결, 나머지는회귀테스트·독립기준·분석·결과·문서다.

- .github/workflows/handoff-audit.yml
- analyze-p3.cjs
- audit-copy.cjs
- black-forest.html
- build.py
- docs/P3_CRAFTING_SETS.md
- docs/P3_ECONOMY_ANALYSIS.md
- docs/P3_ENDING_ANALYSIS.md
- docs/P3_HANDOFF.md
- docs/P3_QA_REPORT.md
- docs/p3/automatic-qa.json
- docs/p3/combat-comparison.json
- docs/p3/economy-after.json
- docs/p3/economy-before.json
- docs/p3/economy-comparison.json
- docs/p3/local-firefox.json
- docs/p3/manual-review.json
- docs/p3/p1-comparison.json
- docs/p3/p2-regression/automatic-qa.json
- docs/p3/p2-regression/equipment-comparison.json
- docs/p3/p2-regression/natural-progression.json
- docs/p3/public/http-assets.json
- docs/p3/public/ui-webkit.json
- docs/p3/regression/combat-stress.json
- docs/p3/regression/combat.json
- docs/p3/regression/data-audit.json
- docs/p3/regression/exploration.json
- docs/p3/regression/long-play.json
- docs/p3/regression/rift.json
- docs/p3/regression/story.json
- docs/p3/remote-qa.json
- docs/p3/resale-before.json
- docs/p3/resale-paired.json
- docs/p3/set-effect-probes.json
- docs/p3/start-commits.json
- docs/p3/system-analysis.json
- docs/p3/ui-chromium.json
- docs/p3/ui-webkit.json
- docs/script-audit.json
- docs/system-copy-audit.json
- fixtures/p3-pre-saves.json
- index.html
- integration-results.json
- p2-test-support.cjs
- p3-browser-fixtures.cjs
- p3-systems.js
- p3-test-support.cjs
- simulate-p3-economy.cjs
- style.css
- test-compatibility.cjs
- test-p1-identity.cjs
- test-p3-combat.cjs
- test-p3-ui.cjs
- test-p3.cjs
- test-results.txt
- test-support.cjs
- ui.js
