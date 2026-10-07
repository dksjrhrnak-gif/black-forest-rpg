# 검은 숲의 방랑자 — 마지막 불씨

A·B·C 최종 완료 보고

검증한 게임 커밋: `7162cd647d9e05a84dfb2ca85a01139d45bd4301`.

[게임 Pages](https://dksjrhrnak-gif.github.io/black-forest-rpg/) 배포 및 HTTP 검증: **PASS**. HTML 303,830바이트, SHA256 `29d09ccd374499ef325bfbf3ef06f54e4f289db624323dabd4a5abd86d831d24`. 매핑된 이미지 137개 모두 HTTP 200 및 저장소 파일과 바이트 일치. 쿼리 없는 일반 URL도 동일한 최신 HTML입니다.

A → B → C 개별 게이트, 최종 통합, main의 재검증까지 모두 통과했습니다. 실기기는 NOT TESTED입니다. 아래 과거 FAIL은 발견과 보정 이력을 남긴 것이며 최종 상태는 PASS입니다.

## 1–6. 파트 A

버튼과 안내의 전/후 전체 변경은 [part-a-implementation.md](part-a-implementation.md)에 있습니다. 일반 계속·전리품·쉼터·상점·NPC·성소·비밀방·새 여정의 행동형 기본 문구를 유지했습니다. 내부 변수/주석을 제외하고 버튼·본문·토스트·로그·접근성 문자열에서 지정 금지어를 검사합니다. 새 대사 모듈을 포함한 16개 소스/셸/CSS, 1,901개 한글 후보·2,091개 노출 후보 및 CSS content 3개에서 위반 0건입니다.

다음 행동은 기존 advance/routes/choose 판정을 통과합니다. 지역 선택과 캠프는 유지하고, 탐험 중 map은 렌더링하지 않습니다. 스토리 플래그·지역 진행·보스 조건·지역 완료 판정과 RNG를 유지합니다. 장면 전환 타이머는 없습니다. 남은 타이머는 다운로드 URL 해제와 장비 안내 연출입니다.

승리 계산·전리품·RNG를 승리 시점에 확정합니다. rewardState.after/rewards 및 claimed를 사용하고, 클릭 즉시 입력을 잠근 다음 동일 객체에서 지급·다음 장면을 처리하고 한 번 저장합니다. 네이티브 click만 사용하며 연타에는 250ms 잠금이 있습니다. 구 세이브의 필드 없음은 기본값으로 처리하고, 이미 지급된 구 전리품을 다시 지급하지 않습니다. 40개 가방 초과 시 기존 가장 오래된 장비 자동 판매 규칙을 유지합니다. BF2 내보내기와 기존 데이터는 보존합니다.

기준선 원본/HTML은 처음부터 일치했습니다. build.py → black-forest.html, export-data.cjs → 데이터/CSV, export-site.py → index.html/dist/index.html·에셋·ZIP입니다. verify-html.py는 HTML 동일성과 마지막 </html> 뒤 바이트 0을 검사합니다. 생성 HTML 직접 수정은 없습니다.

A 최초 브라우저 게이트: PASS, [run 37533781963](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37533781963). 최종 회귀 결과는 아래 게이트 표에서 확인합니다.

## 7–18. 파트 B

| 항목 | 변경 전 → 후 / 결과 |
|---|---|
| assets 총수 | 112 → 137 |
| class_ | 36 → 61 |
| location_ | 8 → 8 |
| enemy_ | 33 → 33, 미믹 포함 |
| boss_ | 9 → 9, 회랑 포함 |
| event_ | 18 → 18 |
| story_ | 3 → 3 |
| gear_ 공용 SVG | 3 → 3 |
| 기타 camp/banner | 2 → 2 |
| 연결 파일 / 매핑 | 137 / 139 |
| 이미지 없는 직업 | 78 → 53 |
| assets 안 orphan / 누락 / 대소문자 오류 | 0 / 0 / 0 |

추가 25장: class_x_magic_1/2/5/6/7/8/9/10/11/12/13/14/15/16/17.webp 및 class_x_ranged_0/1/3/4/5/6/7/8/9/10.webp. ID·이름·제작 맥락과 직접 시각 확인에 근거해 연결했습니다. 원본 PNG는 보존하고 640×960 WebP(quality 84), 109–264KB로 변환했습니다. 두 Hidden 공식 개정본의 복잡한 봉인·실 표현을 보존하려고 가장 큰 파일은 263,564바이트입니다. 150KB 권장을 넘는 그림은 품질 84를 유지하고 현재 직업/목록 지연 로딩으로 부담을 줄였습니다. 사용자 요청에 따른 최신 Hidden 개정본을 선택했고, 이전 PNG 후보도 보존했습니다. 기존 assets 112개는 바이트 변경·삭제 0건입니다. 기존 공식본의 임의 교체는 없습니다.

[image-mapping.md](image-mapping.md)에 모든 직업·지역·적·보스·이벤트·인물의 ID↔이름↔파일 표가 있습니다. 현재 134 WebP 전수를 연락 시트로 직접 열어 대상 확인했고, 3개 SVG는 공용 장비 아이콘입니다. 루트의 과거 이미지 116개는 유지했습니다(113개 중복본, 미사용 guardian-card.webp/monster-4.webp, 과거 QA 사진). assets orphan은 없습니다.

기존 공식본 유지·중복·연결 근거 부족으로 미선택한 추가 후보 207개는 기존 공식본 유지 또는 연결 보류로 [library-current-disposition.json](library-current-disposition.json)에 파일별 기록했습니다. 239개 이미지 후보 중 32개의 확인된 원본(이전 7장+이번 25장)을 연결했습니다. 마지막 2개 후보인 은발 석궁수/푸른 선율 궁수는 제작 완료 ID 근거가 없어 보류했습니다. 이는 runtime 이미지 누락 파일을 숨긴 수가 아닙니다. 다른 직업/인물 이미지를 대신 연결하지 않았습니다.

아직 전용 이미지 없는 직업 ID 53개:

`x_ranged_11, x_ranged_12, x_ranged_13, x_ranged_14, x_ranged_15, x_ranged_16, x_ranged_17, x_support_0, x_support_1, x_support_2, x_support_3, x_support_4, x_support_5, x_support_6, x_support_7, x_support_8, x_support_9, x_support_10, x_support_11, x_support_12, x_support_13, x_support_14, x_support_15, x_support_16, x_support_17, x_occult_0, x_occult_1, x_occult_2, x_occult_3, x_occult_4, x_occult_5, x_occult_6, x_occult_7, x_occult_8, x_occult_9, x_occult_10, x_occult_11, x_occult_12, x_occult_13, x_occult_14, x_occult_15, x_occult_16, whale_slayer, self_named, dream_guard, court_witness, alice_return, victor_heir, quixote_squire, sherwood_warden, oz_restorer, faust_release, margin_keeper`

일반 적 33개·지역 8개·보스 9개·이벤트 18개는 전부 연결되어 해당 목록에 이미지 없는 항목은 없습니다. 전용 그림 없는 선택적 중간 수문장은 지역 배경을 유지합니다. NPC Queen/Quixote는 지역 fallback을 유지합니다. Alice/Creature/Ahab에는 인물이 일치하는 기존 story 그림을 사용하고, story_adam에는 Creature와 Victor가 모두 실제로 있어 Victor 대화에도 사용할 수 있습니다. 전용 NPC 레지스트리는 여전히 6개 null입니다. 빅터 관련 메인 스토리는 같은 승인된 그림을 사용합니다.

camp-card는 캠프, forest-banner는 시작 화면입니다. 상점·성소·비밀방·선택적 중간 수문장은 전용 이미지가 없어 기존 지역 배경입니다. 깨진 URL을 만들어 채우지 않습니다.

직업 그림은 시작 선택·직업 비전서·승급 후보·장비창·현재 직업 상세에서 연결됩니다. 2:3 contain, 목록 lazy/async로 대량 preload를 피하고 미해금 Hidden 그림은 숨깁니다. 장면은 큰 cover 이미지+확장되는 어두운 텍스트 오버레이+아래 버튼입니다. 결과 그림을 유지하고 새 장면에서 교체합니다. 실제 스크린샷에서 위치 조정만으로는 앨리스가 긴 오버레이에 가려지는 시각 FAIL을 발견했습니다. 기존 600×900 스토리 그림 3장은 전체 2:3 contain 영역(최대 높이 640px)으로 보존하고, 제목은 이미지 위에, 긴 서술·대사는 아래에 둡니다. 장비창 320px의 이미지 하단 가림도 추가 발견해 한 행의 높이를 minmax(0,1fr)로 계산하고 불필요한 stickiness를 제거했습니다. 전체 그림이 표시 영역 안에 들어오는 검사를 추가하고 두 브라우저에서 재검증했습니다. 원본 그림·게임 상태·C 문장은 변경하지 않았습니다.

Service worker나 별도 캐시 저장/버전 코드는 없습니다. 모든 경로는 상대경로입니다. 로컬 137개 이미지 HTTP 200 및 파일 바이트 동일: PASS. 최종 Pages HTML 해시 및 이미지 137개 HTTP/바이트 일치: PASS. 일반 URL의 캐시 확인도 PASS(max-age=600, 새 ETag).

B 최초 게이트: PASS, [37535467636](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37535467636), [37535893902](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37535893902). 두 실행 모두 성공한 후 C를 시작했습니다.

## 19–27. 파트 C

| 사용자 노출 문자열 파일 | 현재 후보 수 |
|---|---|
| content.js | 261 |
| literature.js | 209 |
| expansion.js | 322 |
| supplemental.js | 62 |
| class-tree.js | 13 |
| effects.js | 0 |
| relationships.js | 30 |
| narrative.js | 105 |
| engine.js | 170 |
| qa-relationships.js | 23 |
| career.js | 21 |
| chapters.js | 287 |
| journey.js | 3 |
| ui.js | 395 |

셸/접근성까지 포함한 총 후보는 1,901개입니다. 사전 위치표는 dialogue-locations-before.json, 문자열 소유·중복 요약은 dialogue-location-summary*.json에 기록했습니다. 실제 문장·키 전/후 140건은 [part-c-string-diff.md](part-c-string-diff.md), 원본 리터럴의 이동/제거를 포함한 전체 302행은 [part-c-source-diff.md](part-c-source-diff.md)에 있습니다.

narrative.js의 NOVEL_COPY/DIALOGUE_CHOICES를 공통 원본으로 두고 UI가 참조합니다. 기존 THREADS·COMPANIONS·NPCS의 사용자 노출 문장/라벨도 초기화 시 같은 원본에서 채웁니다. 기본 answers[0..2]는 그대로 두고 공동 해결만 인물별 joint 대사로 분리했습니다. 비용·점수·선택지 수/순서·ID·세이브·RNG는 변경하지 않았습니다. 수정 전 분기 상태를 기준으로 156개 결과의 수치/분기/RNG 동일: PASS.

필수 문장 수정은 피조물 각인/번호표 설정·심장 경고·에필로그 주어, 앨리스 증언/단서/빈 이름, 에이해브 사슬/귀환 항로, 돈키호테 하오체, 챕터1~8 현재형/사전 대상 소개/중복 제거, 이벤트 대상 소개·동전, 회랑/법정 기록고, 엔딩1 제목/엔딩 이후 문장에 반영했습니다. 자세한 근거는 [part-c-implementation.md](part-c-implementation.md)에 있습니다.

관계 낮음·친밀·반복 만남의 인물별 18개 전/후 대사는 [npc-copy-before-after.md](npc-copy-before-after.md)에 있습니다. 중간 3단계는 기존 서술 형식을 유지하고 직접 대사만 말투를 분리했습니다. 반복 만남의 인장은 cleared.length로 확인되는 지역 인장입니다. 각성 인장 수량과 구별됩니다. 산초는 챕터5의 간접 서술만 있어 임의 대사 교정은 하지 않았습니다.

저장 로그는 문자열(last 30)입니다. 새 로그는 교정 문장을 저장합니다. 구 대사 로그를 소급해서 고치면 이미 기록된 선택·역사를 바꾸므로 현행 유지합니다. 새 장면에서는 교정된 원문을 표시합니다. 구 로그의 지정 시스템 표현과 엔딩1 제목은 표시 시에만 정상화하고 원본 세이브는 보존합니다. 따라서 구 여정 기록에 옛 대사 문장이 남을 수 있습니다.

엔딩1 참조: engine.finish 저장 제목·UI 엔딩/여정 기록/세이브 문자열 표시에 반영했습니다. 제목 기반 업적은 없으며 기존 번호형 엔딩 ID와 업적/퀘스트 데이터는 그대로입니다. BF1 호환 fixture와 비활성 legacy-v1의 옛 제목은 역사 검증용으로 유지했습니다. 최종 EPILOGUE 세 행동 라벨과 엔딩2/3 제목은 그대로입니다.

검사: 동기화 PASS, 지정 금지어 PASS, 피조물/돈키호테 말투 PASS, 용어 PASS, 보조용언 혼용 PASS, 서술-질문 유사 후보 0. 선택지 261개(기술 라벨 114개 포함): 18자 초과 권장 감사 72개, 30자 초과 0개. 18자 초과 문구는 최대 30자 범위에서 의미를 유지하고 모바일 실측에서 두 줄을 검증합니다. 360px 이상 2열에서 세 줄이 된 문제는 A UI 보정 커밋으로 분리하여 한 열로 수정했습니다. A 행동 버튼은 C에서 다시 바꾸지 않았습니다.

예외: 돌려주다/놓아주다/물어보다는 사전 합성어; 거울 복도의 권투사는 별 없는 회랑과 다른 고유 직업명; 종탑은 건물/그 건물의 적 이름; 사냥은 백경·세력 서사; 골드는 수치 보상/가격/효과; 해결 결과·옛 로그의 과거형 유지. 요구39의 챕터8 마지막 질문/선택지 재설계를 우선하여 요구42의 옛 선택지 축약 예시는 그대로 적용하지 않았습니다. 기준 초과 72개와 예외 9개는 [script-audit.json](script-audit.json)에서 전수 확인할 수 있습니다.

도달하기 어려운 장면은 정상 BF2 가져오기 UI로 합성 테스트 상태를 불러오고 실제 선택 버튼을 터치했습니다. 각 브라우저·폭에서 챕터24 입장/72결과, 메인스레드24결과, 개인퀘스트18결과, 이벤트18/36선택결과, NPC6×관계5단계·반복·24선택결과, 엔딩3/세력·NPC 후일담·엔딩 이후, 추가 동료 후일담·구 세이브·새 로그 새로고침을 검사합니다. 상태 주입 방법은 test-script-ui.cjs/script-cases.cjs에 공개했습니다.

## 28–30. 게이트·통합·커밋·배포

브라우저 방식: GitHub Actions 실제 headless Chromium/WebKit + 모바일 터치 에뮬레이션. 폭 320/360/375/390/430 전수. A/B 추가 폭 370/768/1280도 확인합니다. 실기기는 NOT TESTED입니다. 실제 운영체제 탭/프로세스 복원은 NOT TESTED이고, persisted-pageshow 복원 핸들러는 브라우저에서 이벤트를 명시적으로 발생시킨 시뮬레이션입니다.

| 게이트 | 상태 | 근거 |
|---|---|
| A | PASS | 37533781963 |
| B | PASS | 37535467636, 37535893902 |
| C 초기 | FAIL | 37539302147: 기존 2열에서 세 줄; 유효하지 않은 합성 후일담 세이브 |
| C 보정 | PASS | 37539823734: 검증 1개 + Chromium/WebKit 10개 작업 성공, 스크립트 각 376건 |
| 최종 통합 A/B/C | PASS | [37561472529](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37561472529) — 11개 작업 SUCCESS |
| main 통합·재검증 | PASS | [37562614478](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37562614478) — 동일 게임 커밋의 11개 작업 SUCCESS |
| Pages HTML/137개 이미지 | PASS | [배포 37562614477](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37562614477); 최신 HTML/이미지 바이트 일치 |

실행하지 않은 검증은 PASS로 표기하지 않습니다. 브라우저 console/page error, 이미지 HTTP 오류와 클리핑/overflow는 실패 조건입니다. 최초 실패 원인과 보정은 [mobile-choice-layout-fix.md](mobile-choice-layout-fix.md)에 남겼습니다.


## 최종 QA 항목과 방식

각 항목의 PASS는 실제 자동 실행 결과입니다. Chromium 클릭·모바일 터치, WebKit 모바일 터치로 검증했습니다.

| 폭 | Chromium | WebKit | 방식 |
|---:|---|---|---|
| 320 | PASS | PASS | headless 모바일 에뮬레이션; C 각 376개 입장/결과/레이아웃 검사 |
| 360 | PASS | PASS | headless 모바일 에뮬레이션; C 각 376개 입장/결과/레이아웃 검사 |
| 375 | PASS | PASS | headless 모바일 에뮬레이션; C 각 376개 입장/결과/레이아웃 검사 |
| 390 | PASS | PASS | headless 모바일 에뮬레이션; C 각 376개 입장/결과/레이아웃 검사 |
| 430 | PASS | PASS | headless 모바일 에뮬레이션; C 각 376개 입장/결과/레이아웃 검사 |

A/B는 370·768·1280px도 확인했습니다. C는 10개 작업 총 3,760개 검사입니다. 실기기 및 실제 운영체제 탭/프로세스 복원: NOT TESTED. persisted-pageshow는 브라우저 이벤트를 명시적으로 발생시킨 시뮬레이션이고, 저장 후 새로고침·구 BF2 가져오기는 실제 브라우저 동작입니다.

| 요구 항목 | 상태 | 근거 |
|---|---|---|
| 전투 승리→전리품→1회 지급→중간 map 없이 다음 장면 | PASS | 저장 상태의 gold/claimed/step/RNG 비교 |
| 일반 사건·쉼터 계속·쉼터 휴식·상점 구매/종료 | PASS | 실제 버튼과 진행/귀환 상태 비교 |
| 보상 새로고침·연타·더블탭·구 세이브 | PASS | 보상/RNG 동일, 한 번 지급, BF2 가져오기 및 저장 보존 |
| 패배·도주·지역 완료·스토리/보스 조건 | PASS | 실제 버튼과 귀환·진행 조건 확인 |
| 자동 장면 타이머·금지 표현·HTML 뒤 코드 없음 | PASS | AST 검사·보상 화면 정지·HTML 끝 검사 |
| 직업 선택·비전서·승급 후보·현재 직업/장비창 | PASS | 이미지 경로·decode·contain·표시 범위 검사 |
| 미발견 Hidden 비공개·해금 후 이미지 | PASS | 새 세이브의 Hidden14 이미지 0개; 해금한 현재 직업 표시 |
| 지역8·적33·보스9·이벤트18·스토리/NPC·캠프/배너 | PASS | 390px에서 목록 전수, 핵심 화면 다섯 폭 |
| 결과 이미지 유지와 다음 장면 교체 | PASS | 전투/이벤트 결과와 다음 장면의 실제 src 비교 |
| 누락·대소문자·orphan·404·깨진 이미지 | PASS | 137파일·139매핑, 로컬/Pages HTTP와 바이트 비교 |
| 챕터1–8 외곽/심부/중심부·선택·결과 | PASS | 24개 진입 지점·72개 선택 결과 |
| 메인 스레드3×단계2×선택4 | PASS | 24개 선택/결과 및 answers[0..2]/별도 공동 해결 대응 |
| 개인 퀘스트3·두 번째 장면·에필로그 | PASS | 18개 선택 결과와 분기별 동료 후일담 |
| 이벤트18 전수 및 선택 대상 소개 | PASS | 18개 사건·36개 선택 결과 |
| NPC6×관계5단계·반복·중간 수문장 회피 | PASS | 관계 인사·24대화 결과·반복·진행 상태 |
| EPILOGUE3·엔딩3·세력/NPC 후일담·엔딩 이후 | PASS | 실제 최종 버튼, 제목/후일담/문장 비교 |
| 새 로그·구 로그·저장/새로고침 | PASS | 현재 교정 문장 유지, 구 문자열/플레이어 데이터 보존 |
| 잘림·가로 overflow·터치 영역·JS console error0 | PASS | 텍스트/버튼 경계·두 줄·44px·이미지 decode/HTTP assertions |
| 실기기 | NOT TESTED | 실기기 접근 수단 없음 |
| 실제 운영체제 탭/프로세스 복원 | NOT TESTED | persisted-pageshow 시뮬레이션까지만 실행 |

실제 시각 검토: runtime WebP 134개를 이름을 붙인 7개 연락 시트로 전수 확인했습니다. 장면/직업 스크린샷의 직접 검토 범위는 스토리 입장·피조물·엔딩·Hidden 현재 직업/장비창과 발견된 가림 문제의 전/후입니다. 전체 화면의 픽셀을 사람이 전수 검토한 것으로 보고하지 않습니다. 나머지 화면은 브라우저의 경계·이미지·문장·선택 대응 assertion으로 검증했습니다.

## 논리 단위 커밋

| SHA | 변경 |
|---|---|
| `9236cb559fe8913fd471eb813b93ec19eeebd02f` | Part A 문구·흐름·호환 |
| `8526efa32dc95df7accba8d8d3e2ea803a12b0fb` | Part A 빌드 |
| `4337dd6e9cb2624c0dca2106f0b86f1308371275` | Part B 이미지 9장 |
| `e0b5e8908e6f789e970a1937f224ec1c6a149faa` | Part B 연결 |
| `2cd6e935b791e2c2e74f620cff88fb8b5b2500b8` | Part B 빌드 |
| `43b35605d216a56b3e7b1c2c1cfb36e8428a9a22` | Part B 추가 QA |
| `02e3b4f3746078ed0299c08dae417f6ced7c64f2` | Part C 위치표·검사 기준 |
| `57ca49e5e346499a75f25eedab585b0a84fefb10` | Part C 문장 교정 |
| `62164f1d2703916346b966941225fc321c9ae216` | Part C 빌드 |
| `eaf88b44d13dab10aa4fd24e789502c7a5646fc5` | 모바일 선택지 한 열 보정 |
| `d48c7923cedf7866a41b71f33a7393281a535872` | 선택지 보정 빌드 |
| `d423f0dfd78a4481bc22705691e2f7fdee2166f1` | 유효한 개인 퀘스트 QA 상태 |
| `8a1a7be52574a02cfa38f48d65f9f207595dc4f3` | Part B QA follow-up: preserve left-hand story protagonists in hero crops |
| `dcc5e260e8d522135ec2e60f11562dc92ad518e3` | Build and export reviewed story protagonist crops |
| `17263f9dbd17812adf26db01a395e00b63f8ab04` | Part A audit: include accessibility attributes, English labels and CSS text |
| `6a40439a7e2b37b8e17c918854e596f497b8df71` | Part B assets: add ten confirmed late portraits including requested Hidden revisions |
| `13eaf90bdf6c279c107cccd6ff36a118eecc8401` | Part B assets: add six confirmed latest portraits and document two holds |
| `a00e3237353e656b550190720bf646f01c634b66` | Part B connections: map sixteen confirmed portraits and extend integrated browser QA |
| `9d9728859f3013755d2e3d4c52dfb118a38128c6` | QA reporting: distinguish Node asset checks from browser evidence |
| `cc5e09642224266d42ed85132c039c5441904ec0` | Build and export final integrated artwork and narrative sources |
| `54e6295414c090c8f201562f2ba772e5b6a97b90` | Docs: reconcile final new image count with preserved baseline |
| `4e646f9c76a1a9a3acbf89719aeaa2a21e4aed5b` | Part B visual QA: preserve full story portraits above growing narrative copy |
| `2948990c04bb1a258bc08b30efc4d659f2541c7c` | Build and export full story portrait presentation |
| `4985c04e235d2d8d992024b75ce2f607313b4c86` | QA: review all new portraits at the five required mobile widths |
| `6ed678de2562f0b111763c6bbe738b5096994076` | Part B visual QA: keep the whole armory portrait inside its visible row |
| `7162cd647d9e05a84dfb2ca85a01139d45bd4301` | Build and export armory portrait visibility correction |

최종 검증·배포 게임 커밋은 `7162cd647d9e05a84dfb2ca85a01139d45bd4301`입니다. 이 완료 보고서와 증거 JSON은 실행 소스를 바꾸지 않는 별도 문서 커밋으로 추가합니다.

## 근거 파일 및 스크린샷

[최종 QA 실행](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37561472529)에서 아래 아티팩트를 다운로드할 수 있습니다.

| 아티팩트 | 크기 | 링크 |
|---|---:|---|
| script-webkit-360 | 0.98MiB | [검사 결과·스크린샷](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37561472529/artifacts/11457416237) |
| script-webkit-375 | 1.03MiB | [검사 결과·스크린샷](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37561472529/artifacts/11457346727) |
| script-chromium-430 | 1.12MiB | [검사 결과·스크린샷](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37561472529/artifacts/11457341497) |
| story-preview-chromium-390 | 0.69MiB | [검사 결과·스크린샷](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37561472529/artifacts/11457331264) |
| script-chromium-390 | 1.21MiB | [검사 결과·스크린샷](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37561472529/artifacts/11457286649) |
| script-chromium-360 | 0.91MiB | [검사 결과·스크린샷](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37561472529/artifacts/11457286636) |
| script-webkit-320 | 1.04MiB | [검사 결과·스크린샷](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37561472529/artifacts/11457266877) |
| script-webkit-430 | 1.22MiB | [검사 결과·스크린샷](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37561472529/artifacts/11457217044) |
| story-preview-chromium-320 | 0.52MiB | [검사 결과·스크린샷](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37561472529/artifacts/11457196580) |
| script-chromium-375 | 0.95MiB | [검사 결과·스크린샷](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37561472529/artifacts/11457122123) |
| integrated-qa-evidence | 2.64MiB | [검사 결과·스크린샷](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37561472529/artifacts/11456979330) |
| story-preview-webkit-320 | 0.59MiB | [검사 결과·스크린샷](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37561472529/artifacts/11456642787) |
| story-preview-webkit-390 | 0.76MiB | [검사 결과·스크린샷](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37561472529/artifacts/11456567820) |
| script-webkit-390 | 1.32MiB | [검사 결과·스크린샷](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37561472529/artifacts/11456433426) |
| script-chromium-320 | 0.93MiB | [검사 결과·스크린샷](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/37561472529/artifacts/11456424918) |

[최종 검증 JSON](final-verification.json) · [Pages HTTP 증거](final-pages-http-results.json) · [사전 대사 위치표](dialogue-locations-before.json) · [중복/소유 위치 요약](dialogue-location-summary.json) · [교정 후 위치 요약](dialogue-location-summary-after.json) · [전체 후보 이미지 처리](library-current-disposition.json) · [시각 문제의 발견/보정](mobile-choice-layout-fix.md)

## 첨부 A — 버튼 문구 전/후

| Before | After |
|---|---|
| 휴식 · 무료 | 모닥불 곁에서 쉰다 |
| 캠프로 귀환 | 캠프로 돌아간다 |
| 일반 공격 | 무기를 휘두른다 |
| 방어 / 집중 | 방어하며 집중한다 |
| 도주 | 어둠 속으로 물러난다 |
| 보상 받기 / 수령 완료 | 품삯을 챙긴다 / 품삯을 챙겼다 |
| 장비를 챙기고 나아간다 (pending combat loot) | 전리품을 챙기고 나아간다 |
| 판매 · nG | 장비를 판다 · nG |
| 히든 경로 선택 전 | 숨겨진 길에 들어서기 전 |
| 다음 지역 인장 수복 후 다시 대화할 수 있다 | 새로운 인장을 되찾으면 다시 이야기할 수 있다 |
| 네 번의 조우 뒤에 | 네 갈래 길을 지나면 |
| 추격을 따돌렸다. 보상은 얻지 못했다 | 추격을 따돌렸다. 어둠 속에서 숨을 고른다 |
| 중간 야영지. …진행을 보존하고… | 바람을 피할 수 있는 작은 공터를 발견했다. … |
| Choice previews show affinity deltas | Requirements only; actual deltas remain in the result |

Previously implemented in a38d692 and retained: general result `계속 나아간다`; merchant exit `상점을 떠난다`; NPC result `작별하고 길을 나선다`; shrine `성소를 뒤로한다`; secret `비밀을 뒤로하고 나아간다`; rest `잠시 쉬어간다`; new run `다음 여정을 시작한다`. Region selection/camp remain. No transition timers exist; the remaining UI timeouts revoke a download URL or dismiss a gear-feedback toast; neither changes a scene.


## 첨부 B — 추가 이미지 25개

| ID | 직업명 | 파일 |
|---|---|---|
| x_magic_1 | 오즈의 허수아비 학자 | assets/class_x_magic_1.webp |
| x_magic_2 | 네버랜드 별읽기 | assets/class_x_magic_2.webp |
| x_magic_5 | 장미 정원의 환술사 | assets/class_x_magic_5.webp |
| x_magic_6 | 녹색 안경의 주술사 | assets/class_x_magic_6.webp |
| x_magic_7 | 번개 실험실의 도전술사 | assets/class_x_magic_7.webp |
| x_magic_8 | 프랑켄슈타인의 생체술사 | assets/class_x_magic_8.webp |
| x_magic_9 | 그림 동화의 잠술사 | assets/class_x_magic_9.webp |
| x_magic_10 | 거울 뒷면의 연금술사 | assets/class_x_magic_10.webp |
| x_magic_11 | 빅토리아의 안개술사 | assets/class_x_magic_11.webp |
| x_magic_12 | 노틸러스의 폭풍학자 | assets/class_x_magic_12.webp |
| x_magic_13 | 오즈의 가짜 대마법사 | assets/class_x_magic_13.webp |
| x_magic_14 | 별을 읽는 어린 왕자 | assets/class_x_magic_14.webp |
| x_magic_15 | 시간 기계의 역행술사 | assets/class_x_magic_15.webp |
| x_magic_16 | 파우스트의 계약해독자 | assets/class_x_magic_16.webp |
| x_magic_17 | 금서의 마지막 독자 | assets/class_x_magic_17.webp |
| x_ranged_0 | 셜우드의 견습 궁수 | assets/class_x_ranged_0.webp |
| x_ranged_1 | 피쿼드호 투창수 | assets/class_x_ranged_1.webp |
| x_ranged_3 | 해적섬의 화승총수 | assets/class_x_ranged_3.webp |
| x_ranged_4 | 황야의 우편 저격수 | assets/class_x_ranged_4.webp |
| x_ranged_5 | 종탑의 까마귀 사수 | assets/class_x_ranged_5.webp |
| x_ranged_6 | 오즈의 양철 포수 | assets/class_x_ranged_6.webp |
| x_ranged_7 | 붉은 머리의 표적꾼 | assets/class_x_ranged_7.webp |
| x_ranged_8 | 로빈후드의 망명 궁수 | assets/class_x_ranged_8.webp |
| x_ranged_9 | 노틸러스의 수압포수 | assets/class_x_ranged_9.webp |
| x_ranged_10 | 퀴퀘그의 문신 투창수 | assets/class_x_ranged_10.webp |

## 첨부 C — 인물별 대사 전/후

# Character-specific low / intimate / repeat lines

Middle three relationship tiers remain narration; direct quotes are separated by character. Regional 인장 refers to cleared-region count, not awakening inventory.

| NPC | Context | Before | After |
|---|---|---|---|
| alice | low | 아직 네 판단을 믿을 수 없어. | 아직 네 판단을 믿을 수 없어. |
| alice | high | 이번에도 함께 끝까지 가자. | 이번에도 끝까지 함께할게. |
| alice | repeat | 다음 인장을 되찾으면 다시 이야기하자. | 다음 인장을 되찾으면 다시 이야기하자. |
| queen | low | 아직 네 판단을 믿을 수 없어. | 아직 네 판단을 믿을 수는 없지. |
| queen | high | 이번에도 함께 끝까지 가자. | 이번에도 끝까지 짐과 함께하라. |
| queen | repeat | 다음 인장을 되찾으면 다시 이야기하자. | 다음 인장을 되찾거든 다시 말을 올려라. |
| creature | low | 아직 네 판단을 믿을 수 없어. | 아직 네 판단을 믿을 수 없다. |
| creature | high | 이번에도 함께 끝까지 가자. | 이번에도 함께 끝까지 가겠다. |
| creature | repeat | 다음 인장을 되찾으면 다시 이야기하자. | 다음 인장을 되찾으면 다시 이야기하겠다. |
| victor | low | 아직 네 판단을 믿을 수 없어. | 아직 네 판단을 믿을 수는 없겠지. |
| victor | high | 이번에도 함께 끝까지 가자. | 이번에도 함께 끝까지 가게 되겠군. |
| victor | repeat | 다음 인장을 되찾으면 다시 이야기하자. | 다음 인장을 되찾으면 다시 이야기하게 되겠지. |
| ahab | low | 아직 네 판단을 믿을 수 없어. | 아직 네 판단을 믿기는 어렵군. |
| ahab | high | 이번에도 함께 끝까지 가자. | 이번에도 함께 끝까지 나아가라. |
| ahab | repeat | 다음 인장을 되찾으면 다시 이야기하자. | 다음 인장을 되찾으면 다시 이야기하겠군. |
| quixote | low | 아직 네 판단을 믿을 수 없어. | 아직 그대의 판단을 믿기는 어렵소. |
| quixote | high | 이번에도 함께 끝까지 가자. | 이번에도 그대와 끝까지 함께 가겠소. |
| quixote | repeat | 다음 인장을 되찾으면 다시 이야기하자. | 다음 인장을 되찾으면 다시 이야기하겠소. |

## 첨부 D — C 문자열 전/후 전수(140건)

# Part C string-by-string before/after

Runtime field comparison against Part B gate 43b35605. Canonical movement appears as source-file transitions. Engine dynamic output and source-literal edits are listed separately in part-c-source-diff.md.

| File | Key | Before | After |
|---|---|---|---|
| chapters.js | chapters.0.text.0 | 검은 숲에서 흰 토끼와 주민들의 이름이 하나둘 사라지기 시작했다. 법정 기록에서 이름이 지워지면 사람들의 기억에서도 그 존재가 흐려졌다. 앨리스는 사라진 이들이 실제로 존재했다는 증언을 모아 하트 여왕의 법정으로 갔다. 공식 기록에 이름을 되돌리면 사람들을 되찾을 수 있다고 믿었기 때문이다. 하지만 법정은 서로 다른 세계의 기억이 섞인 증언을 ‘질서를 흔드는 모순’이라 판정하고 소각을 명령했다. 앨리스는 남은 증언서를 빼돌려 검은 숲으로 돌아왔다. | 검은 숲에서 흰 토끼와 주민들의 이름이 하나둘 사라진다. 법정 기록에서 이름이 지워지면 사람들의 기억에서도 그 존재가 흐려진다. 앨리스는 사라진 이들이 실제로 존재한다는 증언을 모아 하트 여왕의 법정으로 향한다. 공식 기록에 이름을 되돌리면 사람들을 되찾을 수 있다고 믿기 때문이다. 하지만 법정은 서로 다른 세계의 기억이 섞인 증언을 ‘질서를 흔드는 모순’이라 판정하고 소각을 명령한다. 앨리스는 남은 증언서를 빼돌려 검은 숲으로 돌아온다. |
| chapters.js | chapters.0.text.1 | 뿌리에 묶인 기억은 거짓 증언이 아니라 돌아갈 집을 잃은 사람의 이름이었다. 누가 이 이름을 지울 권리가 있는가? | 뿌리에 묶인 기억은 거짓 증언이 아니라 돌아갈 집을 잃은 사람의 이름이다. 나무껍질 틈으로 가족을 부르는 목소리가 희미하게 새어 나온다. |
| chapters.js | chapters.0.text.2 | 파수꾼의 가시는 숲 밖의 명령으로 자랐다. 이름을 보존할지, 질서를 위해 봉인할지, 그 명령을 추적할지 정해야 한다. | 파수꾼의 몸에 새겨진 명령 각인이 희미하게 빛난다. 숲 밖에서 내려온 명령이 파수꾼의 가시를 한 겹씩 더 키운다. |
| chapters.js | chapters.1.text.2 | 종지기의 종은 마을을 살리는 장치인 동시에 기억을 지우는 장치다. 심장을 살릴 다른 힘을 모아야 한다. | 종지기의 종은 마을을 살리는 장치인 동시에 기억을 지우는 장치다. 마을의 불빛을 이어 갈 다른 동력을 찾아야 한다. |
| chapters.js | chapters.2.text.2 | 거울의 마녀가 백경의 상처를 증거로 내민다. 상처를 구할 것인가, 봉인할 것인가, 상처를 만든 사슬을 쫓을 것인가? | 거울의 마녀가 백경의 상처를 증거로 내민다. 상처에는 사슬 자국이 선명하다. |
| chapters.js | chapters.3.text.1 | 여왕은 끝없는 예외가 세계를 찢는다고 믿는다. 앨리스의 목소리를 법 안에 남길 방법을 묻는다. | 여왕은 끝없는 예외가 세계를 찢는다고 믿는다. 앨리스의 증언서는 법정의 인장 없이 여왕의 책상에 놓여 있다. |
| chapters.js | chapters.3.text.2 | 집행관은 내려진 판결만 읽을 뿐 증언을 듣지 않는다. 당신이 모은 목소리를 왕성의 중심에 돌려주어야 한다. | 집행관은 내려진 판결만 읽을 뿐 증언을 듣지 않는다. 닫힌 법정 문밖으로 당신이 모은 목소리가 겹쳐 울린다. |
| chapters.js | chapters.4.text.0 | 모래를 건너는 배 옆에서 돈키호테가 풍차 그림자에 방패를 든다. 에이해브는 그것이 백경의 길이라고 말한다. | 모래를 건너는 배 옆에서 돈키호테가 풍차 그림자에 방패를 든다. 에이해브는 그것이 백경의 길이라고 말한다. 배 곁에 모인 여행자들이 그늘을 찾아 몸을 웅크린다. |
| chapters.js | chapters.4.text.1 | 산초는 물통을 나누며 꿈이 사람을 먹여 살릴 수 있느냐고 묻는다. 꿈을 버리지 않고도 오늘을 버틸 길을 찾는다. | 원정대의 물통이 바닥을 드러내고 정찰대는 마른 지도를 펼친다. 산초는 물통을 나누며 꿈이 사람을 먹여 살릴 수 있느냐고 묻는다. 일행은 꿈을 버리지 않고도 오늘을 버틸 길을 찾는다. |
| chapters.js | chapters.4.text.2 | 예언자는 이미 쓰인 마지막 항해를 내민다. 돌아올 사람의 이름을 먼저 적으면 다른 결말도 가능한가? | 예언자는 이미 쓰인 마지막 항해를 내민다. 승선 명단의 빈칸에는 아직 잉크가 마르지 않는다. |
| chapters.js | chapters.5.text.1 | 사서는 이름을 한 문장으로 고정하면 죽음을 막을 수 있다고 말한다. 고정된 사람은 새로운 선택을 할 수 없다. | 사서는 이름을 한 문장으로 고정하면 죽음을 막을 수 있다고 말한다. 고정된 사람은 새로운 선택을 할 수 없다. 이름을 고정하는 일은 사서가 말하는 저주와 맞닿아 있다. |
| chapters.js | chapters.5.text.2 | 마지막 서가에는 아직 쓰지 않은 여백이 남았다. 법정의 질서와 사람의 자유를 함께 기록할 방법을 골라야 한다. | 마지막 서가에는 아직 쓰지 않은 여백이 남았다. 지워진 법조문 사이로 새 문장을 적을 자리가 드러난다. |
| chapters.js | chapters.6.text.2 | 봉합 거인에게는 창조주의 명령과 스스로 살고 싶은 마음이 충돌한다. 심장을 멈추기 전에 그의 목소리를 들어야 한다. | 봉합 거인의 손이 창조주의 명령서를 쥔 채 떨린다. 가슴의 봉합선 아래로 스스로 살아가려는 심장이 요동친다. |
| chapters.js | chapters.7.text.0 | 새벽 없는 왕좌로 가는 길에 되찾은 이름들이 모인다. 당신의 동료는 어떤 선택이 자신들을 여기로 데려왔는지 기억한다. | 새벽 없는 왕좌로 가는 길에 되찾은 이름들이 모인다. 당신의 동료들은 어떤 선택이 자신들을 여기로 데려왔는지 기억한다. |
| chapters.js | chapters.7.text.1 | 편집자는 모든 이야기를 하나의 결말로 정리하겠다고 말한다. 지워질 이름을 지킬 힘은 장비보다 지난 선택에서 나온다. | 편집자의 펜이 서로 다른 이름 위에 하나의 마침표를 긋는다. 지난 선택이 지워질 이름을 지키는 가장 단단한 방패가 된다. |
| chapters.js | chapters.7.text.2 | 첫 불씨 안에서 왕관과 여백이 함께 빛난다. 구한 사람들, 따랐던 법, 끝까지 쫓은 사냥이 마지막 문장을 기다린다. | 첫 불씨 안에서 왕관과 여백이 함께 빛난다. 되찾은 이름들이 마지막 싸움의 불빛 속에서 저마다의 목소리를 낸다. |
| chapters.js | decisions.0.2.choices.2.label | 명령 신호를 따라 배후의 근원을 쫓는다 | 명령 신호를 따라 배후의 근원을 추적한다 |
| chapters.js | decisions.1.2.question | 기억을 지우는 종탑을 계속 사용할 것인가? | 기억을 지우는 종을 계속 사용할 것인가? |
| chapters.js | decisions.1.2.choices.0.short | 종탑의 기억 삭제 기능을 멈췄다 | 종의 기억 삭제 기능을 멈췄다 |
| chapters.js | decisions.1.2.choices.1.label | 삭제 범위를 제한해 종탑을 계속 가동한다 | 삭제 범위를 제한해 종을 계속 가동한다 |
| chapters.js | decisions.1.2.choices.1.short | 종탑을 제한적으로 가동했다 | 종을 제한적으로 가동했다 |
| chapters.js | decisions.1.2.choices.2.label | 종탑의 동력선을 따라 원천을 추적한다 | 종의 동력선을 따라 원천을 추적한다 |
| chapters.js | decisions.1.2.choices.2.short | 종탑의 동력 근원을 추적했다 | 종의 동력 근원을 추적했다 |
| chapters.js | decisions.2.0.choices.2.label | 에이해브와 즉시 흔적을 따라간다 | 에이해브와 즉시 흔적을 추적한다 |
| chapters.js | decisions.2.1.question | 거울이 보여준 “사냥의 결말”을 어떻게 받아들일 것인가? | 거울이 보여 준 “사냥의 결말”을 어떻게 받아들일 것인가? |
| chapters.js | decisions.2.1.choices.1.label | 예언을 기록하고 위험을 대비한다 | 예언을 기록하고 위험에 대비한다 |
| chapters.js | decisions.2.1.choices.2.label | 거울 속 흔적으로 백경의 다음 위치를 계산한다 | 거울 속 흔적으로 백경의 위치를 추적한다 |
| chapters.js | decisions.2.2.choices.0.label | 상처를 치료하고 백경을 풀어준다 | 상처를 치료하고 백경을 풀어 준다 |
| chapters.js | decisions.2.2.choices.0.short | 백경을 치료해 풀어주었다 | 백경을 치료해 풀어 주었다 |
| chapters.js | decisions.3.0.choices.0.label | 억울한 사람을 보호하며 죄목 자체에 이의를 제기한다 | 죄목에 이의를 제기하고 억울한 이를 보호한다 |
| chapters.js | decisions.3.1.question | 앨리스의 목소리를 법 안에 남길 방법을 어떻게 정할 것인가? | 앨리스의 증언을 어떤 방식으로 세상에 남길 것인가? |
| chapters.js | decisions.3.1.choices.2.label | 지워진 예외 기록을 따라 조작의 흔적을 찾는다 | 지워진 예외 기록에서 조작의 흔적을 추적한다 |
| chapters.js | decisions.4.0.choices.2.label | 에이해브와 함께 그림자를 즉시 쫓는다 | 에이해브와 함께 그림자를 즉시 추적한다 |
| chapters.js | decisions.4.1.question | 물과 꿈이 모두 부족한 상황에서 무엇을 우선할 것인가? | 물이 부족한 상황에서 꿈과 오늘의 생존 중 무엇을 우선할 것인가? |
| chapters.js | decisions.5.1.question | 이름을 고정하면 죽음을 막을 수 있지만 선택도 멈춘다. 어떻게 할 것인가? | 사서가 말하는 이름 고정의 저주에 어떻게 맞설 것인가? |
| chapters.js | decisions.5.2.choices.0.short | 여백을 모두에게 열어두었다 | 여백을 모두에게 열어 두었다 |
| chapters.js | decisions.5.2.choices.2.label | 아무것도 쓰지 않고 편집자를 찾아간다 | 여백을 비우고 편집자를 추적한다 |
| chapters.js | decisions.6.2.question | 봉합 거인의 의지와 창조주의 명령이 충돌한다. 누구의 결정을 따를 것인가? | 봉합 거인의 앞날을 누구의 뜻에 맡길 것인가? |
| chapters.js | decisions.7.1.question | 편집자가 모든 이야기를 하나의 결말로 만들려 한다. 어떻게 막을 것인가? | 편집자의 펜 앞에서 서로 다른 결말을 어떻게 지킬 것인가? |
| chapters.js | decisions.7.2.question | 첫 불씨를 누구의 손에 맡길 것인가? | 첫 불씨를 둘러싼 마지막 싸움에서 무엇을 지킬 것인가? |
| chapters.js | decisions.7.2.choices.0.label | 불씨를 사람들에게 나눠 각자의 이야기를 지키게 한다 | 각자의 이야기를 지키는 편에 선다 |
| chapters.js | decisions.7.2.choices.1.label | 규칙과 책임 아래 불씨를 관리한다 | 규칙과 책임을 지키는 편에 선다 |
| chapters.js | decisions.7.2.choices.2.label | 불씨를 묶은 사슬을 끊고 근원을 끝까지 추적한다 | 사슬을 끊고 근원을 끝까지 추적한다 |
| literature.js → narrative.js | threads.alice.stages.0.text | 앨리스는 법정이 매일 다른 사람의 기억을 증거로 태운다고 말한다. 여왕은 그것만이 세계의 붕괴를 막는 방법이라고 주장한다. | 앨리스가 가장자리가 탄 증언서를 내민다.<br>“법정은 매일 누군가의 기억을 증거와 함께 태워.”<br>멀리서 여왕의 전령이 외친다.<br>“기억을 남기면 세계가 다시 찢어진다.” |
| literature.js → narrative.js | threads.alice.stages.0.choices.0.0 | 앨리스의 증언을 숨긴다 | 증언서를 숨겨 앨리스를 보호한다 |
| literature.js → narrative.js | threads.alice.stages.1.text | 증언 속에는 세상이 책의 마지막 장을 먹으며 버틴다는 사실이 담겨 있다. 누구에게 이 사실을 맡길 것인가? | 증언의 마지막 장에는 세계가 책의 결말을 먹으며 버틴다는 기록이 남아 있다.<br>앨리스가 낮게 묻는다.<br>“이걸 누가 가져야 한다고 생각해?” |
| literature.js → narrative.js | threads.alice.stages.1.choices.0.0 | 사람들에게 기록을 나누어 준다 | 기록을 사람들에게 나눠 준다 |
| literature.js → narrative.js | threads.alice.stages.1.choices.1.0 | 법정의 기록 보관소에 봉인한다 | 법정 기록고에 봉인한다 |
| literature.js → narrative.js | threads.alice.stages.1.choices.2.0 | 추적단에 표적의 위치를 넘긴다 | 추적단에 증언 속 단서를 넘긴다 |
| literature.js → narrative.js | threads.adam.stages.0.text | 피조물은 자신을 괴물이라 부르지 말아 달라고 한다. 빅터는 그의 심장이 도서계의 균열을 봉합할 유일한 장치라고 말한다. | 피조물의 가슴에는 창조주가 새긴 번호가 남아 있고, 목에는 같은 번호가 찍힌 낡은 번호표가 걸려 있다.<br>피조물이 번호표를 뜯어 바닥에 버린다.<br>“괴물도 실험체도 아닌 이름을 갖고 싶다.”<br>빅터가 굳은 얼굴로 심장 장치를 가리킨다.<br>“저 심장이 멈추면 균열을 막을 방법도 사라지겠지.” |
| literature.js → narrative.js | threads.adam.stages.0.choices.0.0 | 피조물에게 이름을 고르게 한다 | 피조물에게 자기 이름을 고르게 한다 |
| literature.js → narrative.js | threads.adam.stages.0.choices.1.0 | 빅터의 실험 기록을 검증한다 | 빅터의 실험 기록부터 검증한다 |
| literature.js → narrative.js | threads.adam.stages.0.choices.2.0 | 심장의 근원을 함께 사냥한다 | 심장의 근원을 함께 추적한다 |
| literature.js → narrative.js | threads.adam.stages.1.text | 심장을 멈추면 균열 하나가 닫힌다. 그러나 다른 이의 삶을 재료로 삼은 세계가 오래 버틸 수 있을까? | 장치를 멈추면 균열 하나를 닫을 수 있다. 대신 피조물의 심장도 함께 멈춘다.<br>피조물이 당신을 똑바로 바라본다.<br>“내 삶을 재료로 쓸 거라면, 적어도 내게 먼저 물어라.” |
| literature.js → narrative.js | threads.adam.stages.1.choices.0.0 | 사람들의 불씨를 나누어 대체한다 | 사람들의 불씨로 심장을 대신한다 |
| literature.js → narrative.js | threads.adam.stages.1.choices.1.0 | 피조물의 동의를 얻어 실험한다 | 동의를 얻어 장치 정지를 시험한다 |
| literature.js → narrative.js | threads.adam.stages.1.choices.2.0 | 장치를 부수고 균열 너머로 향한다 | 장치를 부수고 균열로 들어간다 |
| literature.js → narrative.js | threads.ahab.stages.0.text | 백경의 그림자가 모래 아래를 헤엄친다. 에이해브는 작살을 들고 돈키호테는 그것을 포로가 된 거인이라 부른다. | 모래 아래로 거대한 흰 그림자가 헤엄친다.<br>에이해브가 작살을 겨눈다.<br>“이번엔 놓치지 않는다.”<br>돈키호테가 그 앞을 막아선다.<br>“저건 괴물이 아니라 상처 입은 거인일지도 모르오.” |
| literature.js → narrative.js | threads.ahab.stages.0.choices.1.0 | 법정의 허가로 포획을 준비한다 | 법정 허가를 받아 포획한다 |
| literature.js → narrative.js | threads.ahab.stages.1.text | 백경의 몸에는 사라진 세계들의 마지막 문장이 새겨져 있다. 죽이면 길이 열리고 살리면 기억이 남는다. | 백경의 피부에는 사라진 세계들의 마지막 문장이 흉터처럼 새겨져 있다.<br>흉터 사이로 오래된 사슬 자국이 이어져 있다.<br>에이해브가 작살 끝을 내린다.<br>“죽이면 길이 열린다. 살리면 기억이 남겠군. 둘 다 가질 수는 없다.” |
| literature.js → narrative.js | threads.ahab.stages.1.choices.0.0 | 백경을 풀어 주고 기억을 필사한다 | 백경을 풀어 주고 문장을 필사한다 |
| literature.js → narrative.js | threads.ahab.stages.1.choices.1.0 | 문장을 보존한 채 백경을 봉인한다 | 기억을 보존한 채 백경을 봉인한다 |
| relationships.js | companions.alice.intro | 앨리스가 불탄 명부를 펼친다. “내 기억만 지킨다고 끝나는 일이 아니었어. 다른 증인들의 이름도 찾아줄래?” | 앨리스가 불탄 명부를 무릎 위에 펼친다.<br>“내 증언만 남긴다고 끝나는 게 아니야. 사라진 사람들 이름도 되찾고 싶어.”<br>그녀가 빈칸을 손끝으로 짚는다.<br>“같이 찾아 줄래?” |
| relationships.js | companions.alice.resolve | 사본의 빈칸에서 목소리가 들린다. 앨리스는 당신에게 펜을 건넨다. “이 이름들을 세상에 돌려줄지, 당신이 결정해 줘.” | 사본의 빈칸에서 희미한 목소리가 새어 나온다.<br>앨리스가 펜을 당신에게 건넨다.<br>“여기 비어 있는 이름들을 세상에 돌려줄지, 이제 같이 결정하자.” |
| relationships.js | companions.alice.special.0 | 앨리스와 증인들을 먼저 대피시킨다 | 앨리스와 함께 증언의 원본을 확인한다 |
| relationships.js | companions.alice.special.1 | 앨리스와 사본을 만들어 원본과 함께 공개한다 | 앨리스와 사본을 만들어 함께 공개한다 |
| relationships.js | companions.alice.answers.0 | “내 이야기를 믿어줘서 고마워.” | “내 이야기를 믿어 줘서 고마워.” |
| relationships.js | companions.adam.intro | 피조물은 심장에 남은 창조주의 번호를 보여준다. “누군가의 부품이 아닌 이름으로 살고 싶다. 내 심장을 고쳐줄 수 있나?” | 피조물이 가슴에 남은 창조주의 번호 각인을 보여 준다.<br>“이 번호로 불리고 싶지 않다.”<br>그가 심장 쪽을 가리킨다.<br>“내가 고른 이름으로 살아갈 수 있도록 도와라.” |
| relationships.js | companions.adam.resolve | 새 심장틀이 완성됐다. 빅터는 소유권을 주장하지만, 피조물은 떨리는 손으로 자신의 이름을 쓰려고 한다. | 새 심장틀이 완성되자 빅터가 피조물에 대한 소유권을 주장한다.<br>피조물은 떨리는 손으로 펜을 집는다.<br>“이번에는 내 이름을 내가 쓰겠다.” |
| relationships.js | companions.adam.epilogue | 피조물은 스스로 고른 이름으로 사람들 사이에 정착한다. 당신을 처음 믿어준 친구로 기억한다. | 피조물은 스스로 고른 이름으로 사람들 사이에 정착한다. 자신을 처음 믿어 준 친구로 당신을 기억한다. |
| relationships.js | companions.adam.special.0 | 피조물과 함께 대체 심장의 설계도를 찾는다 | 피조물과 대체 심장 설계도를 확인한다 |
| relationships.js | companions.adam.special.1 | 대체 심장을 설치하고 피조물에게 선택권을 준다 | 마지막 선택을 피조물에게 맡긴다 |
| relationships.js | companions.adam.answers.0 | “나를 사람으로 불러준 말을 잊지 않겠다.” | “나를 사람으로 불러 준 말을 잊지 않겠다.” |
| relationships.js | companions.adam.answers.1 | “내 동의가 정말 중요하다면 끝까지 물어봐 줘.” | “내 동의가 정말 중요하다면, 끝까지 물어라.” |
| relationships.js | companions.adam.answers.2 | “장치를 부수면 내 안의 기억도 사라질 수 있어.” | “장치를 부수면 내 심장도 함께 멈춘다. 그래도 하겠다는 건가?” |
| relationships.js | companions.ahab.intro | 에이해브가 부러진 배의 명단을 쥐고 있다. “백경만 쫓느라 돌아갈 사람들을 보지 못했군. 아직 늦지 않았다면 배부터 고치자.” | 에이해브가 부러진 배의 승선 명단을 구겨 쥔다.<br>“백경만 보느라 돌아갈 사람들을 놓쳤군.”<br>그가 처음으로 작살 대신 구명정을 바라본다.<br>“아직 늦지 않았다면, 배부터 고쳐라.” |
| relationships.js | companions.ahab.resolve | 선원들은 귀환을 원하지만 백경의 흔적이 다시 나타났다. 에이해브는 작살을 내려놓고 당신의 판단을 기다린다. | 선원들은 귀환을 원하지만 멀리서 백경의 흔적이 다시 나타난다.<br>에이해브가 작살을 천천히 내려놓는다.<br>“돌아갈 항로는 네가 정해라.” |
| relationships.js | companions.ahab.special.0 | 에이해브와 선원들의 퇴로를 먼저 확보한다 | 선원들의 퇴로부터 확보한다 |
| relationships.js | companions.ahab.special.1 | 선원들을 귀환시키고 사슬만 끊는다 | 선원들을 먼저 귀환시킨다 |
| qa-relationships.js → narrative.js | npcs.alice.text | 지워지는 증언을 지키려는 앨리스가 당신의 판단을 기다린다. | 앨리스가 접힌 증언서를 내민다.<br>“이름이 지워지기 전에, 네가 먼저 읽어 줘.” |
| qa-relationships.js → narrative.js | npcs.queen.text | 여왕은 세계를 붙들 법과 사람을 구할 예외 사이에서 망설인다. | 하트 여왕은 판결문에서 시선을 떼지 않는다.<br>“질서가 사람을 삼키기 시작했다면, 무엇을 고쳐야 하지?” |
| qa-relationships.js → narrative.js | npcs.creature.text | 만들어진 자는 창조주의 이름 대신 스스로의 이름으로 불리기를 원한다. | 피조물이 가슴의 봉합선을 손끝으로 짚는다.<br>“만들어진 이름 말고, 내가 고른 이름으로 불리고 싶다.” |
| qa-relationships.js → narrative.js | npcs.victor.text | 빅터는 실험 기록 앞에서 묻는다. “책임을 질 수 있다면 다시 시작해도 되는가?” | 빅터가 실험 기록을 덮는다.<br>“다시 시작할 자격이 있다면… 책임부터 져야겠지.” |
| qa-relationships.js → narrative.js | npcs.ahab.text | 사냥의 끝에서 무엇이 남는지 에이해브는 아직 말하지 못한다. | 에이해브가 작살을 바닥에 세운다.<br>“사냥을 끝낸 뒤에도 내가 남을지는 모르겠군.” |
| qa-relationships.js → narrative.js | npcs.quixote.text | 꿈을 조롱하는 세상에서도 돈키호테는 누군가의 방패가 되려 한다. | 돈키호테가 낡은 방패를 고쳐 쥔다.<br>“세상이 비웃어도, 누군가의 방패가 되는 꿈까지 버릴 수는 없소.” |
| content.js | events.1.text | 제단은 생명의 온기를 탐낸다. | 제단은 생명의 온기를 탐낸다. 제단 위에는 시든 약초 다발이 놓여 있다. |
| content.js | events.2.text | 아이의 모습을 한 망령이 빈 집터를 가리킨다. | 아이의 모습을 한 망령이 빈 집터를 가리킨다. 망령은 손에 낡은 동전을 쥐고 있다. |
| content.js | events.5.choices.0.label | 골드를 던진다 | 동전을 던진다 |
| content.js | events.6.text | 아직 온기가 남은 모루가 보인다. | 아직 온기가 남은 모루와 화로가 보인다. |
| content.js | events.6.choices.0.label | 광석을 넣는다 | 화로에 광석을 넣는다 |
| content.js | events.7.text | 물속에서 자신의 목소리가 도움을 청한다. | 물속에서 당신의 목소리가 도움을 청한다. |
| content.js | events.8.text | 꽃 한 송이 놓이지 않은 묘들이 이어진다. | 꽃 한 송이 놓이지 않은 묘들이 이어진다. 그중 한 무덤에서는 봉인된 관이 드러나 있다. |
| content.js | events.11.text | 알 사이로 오래된 무기가 보인다. | 알 사이로 오래된 무기가 보인다. 알 사이로 비늘이 흩어져 있다. |
| content.js | events.11.choices.0.label | 손을 뻗는다 | 무기에 손을 뻗는다 |
| content.js | events.13.text | 같은 빗방울이 허공에서 멈춰 있다. | 같은 빗방울이 허공에서 멈춰 있다. 빗방울 사이로 얇은 틈이 벌어져 있다. |
| content.js | events.13.choices.0.label | 틈을 만져본다 | 틈을 만져 본다 |
| content.js | events.17.text | 별 없는 복도가 눈앞에서 사라지고 있다. | 별 없는 회랑가 눈앞에서 사라지고 있다. |
| narrative.js | novel.dialogue.adam.0.0 | 피조물이 낡은 번호표를 뜯어 손바닥에 올린다. | 피조물의 가슴에는 창조주가 새긴 번호가 남아 있고, 목에는 같은 번호가 찍힌 낡은 번호표가 걸려 있다. |
| narrative.js | novel.dialogue.adam.0.1 | “괴물도 실험체도 아닌 이름을 갖고 싶다.” | 피조물이 번호표를 뜯어 바닥에 버린다. |
| narrative.js | novel.dialogue.adam.0.2 | 빅터가 굳은 얼굴로 심장 장치를 가리킨다. | “괴물도 실험체도 아닌 이름을 갖고 싶다.” |
| narrative.js | novel.dialogue.adam.0.3 | “저 심장이 멈추면 균열을 막을 방법도 사라진다.” | 빅터가 굳은 얼굴로 심장 장치를 가리킨다. |
| narrative.js | novel.dialogue.ahab.1.1 | 에이해브가 작살 끝을 내린다. | 흉터 사이로 오래된 사슬 자국이 이어져 있다. |
| narrative.js | novel.dialogue.ahab.1.2 | “죽이면 길이 열린다. 살리면 기억이 남겠지. 둘 다 가질 순 없다.” | 에이해브가 작살 끝을 내린다. |
| narrative.js | novel.npc.alice.1 | “이름이 지워지기 전에, 네가 먼저 읽어줘.” | “이름이 지워지기 전에, 네가 먼저 읽어 줘.” |
| narrative.js | novel.npc.quixote.1 | “세상이 비웃어도, 누군가의 방패가 되는 꿈까지 버릴 순 없지.” | “세상이 비웃어도, 누군가의 방패가 되는 꿈까지 버릴 수는 없소.” |
| narrative.js | novel.bond.alice.0.1 | “내 이름만 남긴다고 끝나는 게 아니야. 사라진 사람들 이름도 되찾고 싶어.” | “내 증언만 남긴다고 끝나는 게 아니야. 사라진 사람들 이름도 되찾고 싶어.” |
| narrative.js | novel.bond.alice.0.3 | “같이 찾아줄래?” | “같이 찾아 줄래?” |
| narrative.js | novel.bond.alice.1.2 | “여기 적힌 이름들을 세상에 돌려줄지, 이제 같이 결정하자.” | “여기 비어 있는 이름들을 세상에 돌려줄지, 이제 같이 결정하자.” |
| narrative.js | novel.bond.adam.0.0 | 피조물이 가슴에 새겨진 창조주의 번호를 보여준다. | 피조물이 가슴에 남은 창조주의 번호 각인을 보여 준다. |
| narrative.js | novel.bond.adam.0.3 | “내가 고른 이름으로 살아갈 수 있게 도와줄 수 있나?” | “내가 고른 이름으로 살아갈 수 있도록 도와라.” |
| narrative.js | novel.bond.adam.1.0 | 새 심장틀이 완성되자 빅터가 소유권을 주장한다. | 새 심장틀이 완성되자 빅터가 피조물에 대한 소유권을 주장한다. |
| narrative.js | novel.bond.ahab.0.3 | “아직 늦지 않았다면, 배부터 고치자.” | “아직 늦지 않았다면, 배부터 고쳐라.” |
| narrative.js | novel.bond.ahab.1.2 | “이번엔 내가 아니라 네가 정해라. 쫓을지, 돌아갈지.” | “돌아갈 항로는 네가 정해라.” |
| narrative.js | dialogueChoices.alice.0.2 | 흰 토끼의 탈출로를 뒤쫓는다 | 흰 토끼의 탈출로를 추적한다 |
| narrative.js | dialogueChoices.alice.1.2 | 추적단에 표적의 위치를 넘긴다 | 추적단에 증언 속 단서를 넘긴다 |
| narrative.js | dialogueChoices.adam.1.1 | 피조물의 동의를 받고 실험한다 | 동의를 얻어 장치 정지를 시험한다 |
| narrative.js | dialogueChoices.ahab.1.0 | 백경을 풀어주고 문장을 필사한다 | 백경을 풀어 주고 문장을 필사한다 |
| relationships.js | companions.alice.joint | (new/removed) | “함께라면 다른 결말도 찾을 수 있을 거야.” |
| relationships.js | companions.adam.joint | (new/removed) | “함께라면 다른 결말을 찾을 수 있을지도 모른다.” |
| relationships.js | companions.ahab.joint | (new/removed) | “함께라면 다른 항로를 찾을 수 있겠군.” |
| narrative.js | novel.dialogue.adam.0.4 | (new/removed) | “저 심장이 멈추면 균열을 막을 방법도 사라지겠지.” |
| narrative.js | novel.dialogue.ahab.1.3 | (new/removed) | “죽이면 길이 열린다. 살리면 기억이 남겠군. 둘 다 가질 수는 없다.” |
| narrative.js | relationLines.alice.low | (new/removed) | 아직 네 판단을 믿을 수 없어. |
| narrative.js | relationLines.alice.high | (new/removed) | 이번에도 끝까지 함께할게. |
| narrative.js | relationLines.alice.repeat | (new/removed) | 다음 인장을 되찾으면 다시 이야기하자. |
| narrative.js | relationLines.queen.low | (new/removed) | 아직 네 판단을 믿을 수는 없지. |
| narrative.js | relationLines.queen.high | (new/removed) | 이번에도 끝까지 짐과 함께하라. |
| narrative.js | relationLines.queen.repeat | (new/removed) | 다음 인장을 되찾거든 다시 말을 올려라. |
| narrative.js | relationLines.creature.low | (new/removed) | 아직 네 판단을 믿을 수 없다. |
| narrative.js | relationLines.creature.high | (new/removed) | 이번에도 함께 끝까지 가겠다. |
| narrative.js | relationLines.creature.repeat | (new/removed) | 다음 인장을 되찾으면 다시 이야기하겠다. |
| narrative.js | relationLines.victor.low | (new/removed) | 아직 네 판단을 믿을 수는 없겠지. |
| narrative.js | relationLines.victor.high | (new/removed) | 이번에도 함께 끝까지 가게 되겠군. |
| narrative.js | relationLines.victor.repeat | (new/removed) | 다음 인장을 되찾으면 다시 이야기하게 되겠지. |
| narrative.js | relationLines.ahab.low | (new/removed) | 아직 네 판단을 믿기는 어렵군. |
| narrative.js | relationLines.ahab.high | (new/removed) | 이번에도 함께 끝까지 나아가라. |
| narrative.js | relationLines.ahab.repeat | (new/removed) | 다음 인장을 되찾으면 다시 이야기하겠군. |
| narrative.js | relationLines.quixote.low | (new/removed) | 아직 그대의 판단을 믿기는 어렵소. |
| narrative.js | relationLines.quixote.high | (new/removed) | 이번에도 그대와 끝까지 함께 가겠소. |
| narrative.js | relationLines.quixote.repeat | (new/removed) | 다음 인장을 되찾으면 다시 이야기하겠소. |

## 첨부 E — C 원본 리터럴 전/후 전수(이동/제거 포함 302행)

# Part C source literal edits

AST literals only; comments/IDs/regex are not displayed strings. Ordered diff per file, including removed duplicate literals and the new canonical module. Semantic runtime field before/after is in part-c-string-diff.md.

| File | Key before → after | Before | After |
|---|---|---|---|
| chapters.js | text.value.elements[0] → text.value.elements[0] | 검은 숲에서 흰 토끼와 주민들의 이름이 하나둘 사라지기 시작했다. 법정 기록에서 이름이 지워지면 사람들의 기억에서도 그 존재가 흐려졌다. 앨리스는 사라진 이들이 실제로 존재했다는 증언을 모아 하트 여왕의 법정으로 갔다. 공식 기록에 이름을 되돌리면 사람들을 되찾을 수 있다고 믿었기 때문이다. 하지만 법정은 서로 다른 세계의 기억이 섞인 증언을 ‘질서를 흔드는 모순’이라 판정하고 소각을 명령했다. 앨리스는 남은 증언서를 빼돌려 검은 숲으로 돌아왔다. | 검은 숲에서 흰 토끼와 주민들의 이름이 하나둘 사라진다. 법정 기록에서 이름이 지워지면 사람들의 기억에서도 그 존재가 흐려진다. 앨리스는 사라진 이들이 실제로 존재한다는 증언을 모아 하트 여왕의 법정으로 향한다. 공식 기록에 이름을 되돌리면 사람들을 되찾을 수 있다고 믿기 때문이다. 하지만 법정은 서로 다른 세계의 기억이 섞인 증언을 ‘질서를 흔드는 모순’이라 판정하고 소각을 명령한다. 앨리스는 남은 증언서를 빼돌려 검은 숲으로 돌아온다. |
| chapters.js | text.value.elements[1] → text.value.elements[1] | 뿌리에 묶인 기억은 거짓 증언이 아니라 돌아갈 집을 잃은 사람의 이름이었다. 누가 이 이름을 지울 권리가 있는가? | 뿌리에 묶인 기억은 거짓 증언이 아니라 돌아갈 집을 잃은 사람의 이름이다. 나무껍질 틈으로 가족을 부르는 목소리가 희미하게 새어 나온다. |
| chapters.js | text.value.elements[2] → text.value.elements[2] | 파수꾼의 가시는 숲 밖의 명령으로 자랐다. 이름을 보존할지, 질서를 위해 봉인할지, 그 명령을 추적할지 정해야 한다. | 파수꾼의 몸에 새겨진 명령 각인이 희미하게 빛난다. 숲 밖에서 내려온 명령이 파수꾼의 가시를 한 겹씩 더 키운다. |
| chapters.js | text.value.elements[2] → text.value.elements[2] | 종지기의 종은 마을을 살리는 장치인 동시에 기억을 지우는 장치다. 심장을 살릴 다른 힘을 모아야 한다. | 종지기의 종은 마을을 살리는 장치인 동시에 기억을 지우는 장치다. 마을의 불빛을 이어 갈 다른 동력을 찾아야 한다. |
| chapters.js | text.value.elements[2] → text.value.elements[2] | 거울의 마녀가 백경의 상처를 증거로 내민다. 상처를 구할 것인가, 봉인할 것인가, 상처를 만든 사슬을 쫓을 것인가? | 거울의 마녀가 백경의 상처를 증거로 내민다. 상처에는 사슬 자국이 선명하다. |
| chapters.js | text.value.elements[1] → text.value.elements[1] | 여왕은 끝없는 예외가 세계를 찢는다고 믿는다. 앨리스의 목소리를 법 안에 남길 방법을 묻는다. | 여왕은 끝없는 예외가 세계를 찢는다고 믿는다. 앨리스의 증언서는 법정의 인장 없이 여왕의 책상에 놓여 있다. |
| chapters.js | text.value.elements[2] → text.value.elements[2] | 집행관은 내려진 판결만 읽을 뿐 증언을 듣지 않는다. 당신이 모은 목소리를 왕성의 중심에 돌려주어야 한다. | 집행관은 내려진 판결만 읽을 뿐 증언을 듣지 않는다. 닫힌 법정 문밖으로 당신이 모은 목소리가 겹쳐 울린다. |
| chapters.js | text.value.elements[0] → text.value.elements[0] | 모래를 건너는 배 옆에서 돈키호테가 풍차 그림자에 방패를 든다. 에이해브는 그것이 백경의 길이라고 말한다. | 모래를 건너는 배 옆에서 돈키호테가 풍차 그림자에 방패를 든다. 에이해브는 그것이 백경의 길이라고 말한다. 배 곁에 모인 여행자들이 그늘을 찾아 몸을 웅크린다. |
| chapters.js | text.value.elements[1] → text.value.elements[1] | 산초는 물통을 나누며 꿈이 사람을 먹여 살릴 수 있느냐고 묻는다. 꿈을 버리지 않고도 오늘을 버틸 길을 찾는다. | 원정대의 물통이 바닥을 드러내고 정찰대는 마른 지도를 펼친다. 산초는 물통을 나누며 꿈이 사람을 먹여 살릴 수 있느냐고 묻는다. 일행은 꿈을 버리지 않고도 오늘을 버틸 길을 찾는다. |
| chapters.js | text.value.elements[2] → text.value.elements[2] | 예언자는 이미 쓰인 마지막 항해를 내민다. 돌아올 사람의 이름을 먼저 적으면 다른 결말도 가능한가? | 예언자는 이미 쓰인 마지막 항해를 내민다. 승선 명단의 빈칸에는 아직 잉크가 마르지 않는다. |
| chapters.js | text.value.elements[1] → text.value.elements[1] | 사서는 이름을 한 문장으로 고정하면 죽음을 막을 수 있다고 말한다. 고정된 사람은 새로운 선택을 할 수 없다. | 사서는 이름을 한 문장으로 고정하면 죽음을 막을 수 있다고 말한다. 고정된 사람은 새로운 선택을 할 수 없다. 이름을 고정하는 일은 사서가 말하는 저주와 맞닿아 있다. |
| chapters.js | text.value.elements[2] → text.value.elements[2] | 마지막 서가에는 아직 쓰지 않은 여백이 남았다. 법정의 질서와 사람의 자유를 함께 기록할 방법을 골라야 한다. | 마지막 서가에는 아직 쓰지 않은 여백이 남았다. 지워진 법조문 사이로 새 문장을 적을 자리가 드러난다. |
| chapters.js | text.value.elements[2] → text.value.elements[2] | 봉합 거인에게는 창조주의 명령과 스스로 살고 싶은 마음이 충돌한다. 심장을 멈추기 전에 그의 목소리를 들어야 한다. | 봉합 거인의 손이 창조주의 명령서를 쥔 채 떨린다. 가슴의 봉합선 아래로 스스로 살아가려는 심장이 요동친다. |
| chapters.js | text.value.elements[0] → text.value.elements[0] | 새벽 없는 왕좌로 가는 길에 되찾은 이름들이 모인다. 당신의 동료는 어떤 선택이 자신들을 여기로 데려왔는지 기억한다. | 새벽 없는 왕좌로 가는 길에 되찾은 이름들이 모인다. 당신의 동료들은 어떤 선택이 자신들을 여기로 데려왔는지 기억한다. |
| chapters.js | text.value.elements[1] → text.value.elements[1] | 편집자는 모든 이야기를 하나의 결말로 정리하겠다고 말한다. 지워질 이름을 지킬 힘은 장비보다 지난 선택에서 나온다. | 편집자의 펜이 서로 다른 이름 위에 하나의 마침표를 긋는다. 지난 선택이 지워질 이름을 지키는 가장 단단한 방패가 된다. |
| chapters.js | text.value.elements[2] → text.value.elements[2] | 첫 불씨 안에서 왕관과 여백이 함께 빛난다. 구한 사람들, 따랐던 법, 끝까지 쫓은 사냥이 마지막 문장을 기다린다. | 첫 불씨 안에서 왕관과 여백이 함께 빛난다. 되찾은 이름들이 마지막 싸움의 불빛 속에서 저마다의 목소리를 낸다. |
| chapters.js | label.value → label.value | 명령 신호를 따라 배후의 근원을 쫓는다 | 명령 신호를 따라 배후의 근원을 추적한다 |
| chapters.js | question.value → question.value | 기억을 지우는 종탑을 계속 사용할 것인가? | 기억을 지우는 종을 계속 사용할 것인가? |
| chapters.js | short.value → short.value | 종탑의 기억 삭제 기능을 멈췄다 | 종의 기억 삭제 기능을 멈췄다 |
| chapters.js | label.value → label.value | 삭제 범위를 제한해 종탑을 계속 가동한다 | 삭제 범위를 제한해 종을 계속 가동한다 |
| chapters.js | short.value → short.value | 종탑을 제한적으로 가동했다 | 종을 제한적으로 가동했다 |
| chapters.js | label.value → label.value | 종탑의 동력선을 따라 원천을 추적한다 | 종의 동력선을 따라 원천을 추적한다 |
| chapters.js | short.value → short.value | 종탑의 동력 근원을 추적했다 | 종의 동력 근원을 추적했다 |
| chapters.js | label.value → label.value | 에이해브와 즉시 흔적을 따라간다 | 에이해브와 즉시 흔적을 추적한다 |
| chapters.js | question.value → question.value | 거울이 보여준 “사냥의 결말”을 어떻게 받아들일 것인가? | 거울이 보여 준 “사냥의 결말”을 어떻게 받아들일 것인가? |
| chapters.js | label.value → label.value | 예언을 기록하고 위험을 대비한다 | 예언을 기록하고 위험에 대비한다 |
| chapters.js | label.value → label.value | 거울 속 흔적으로 백경의 다음 위치를 계산한다 | 거울 속 흔적으로 백경의 위치를 추적한다 |
| chapters.js | label.value → label.value | 상처를 치료하고 백경을 풀어준다 | 상처를 치료하고 백경을 풀어 준다 |
| chapters.js | short.value → short.value | 백경을 치료해 풀어주었다 | 백경을 치료해 풀어 주었다 |
| chapters.js | label.value → label.value | 억울한 사람을 보호하며 죄목 자체에 이의를 제기한다 | 죄목에 이의를 제기하고 억울한 이를 보호한다 |
| chapters.js | question.value → question.value | 앨리스의 목소리를 법 안에 남길 방법을 어떻게 정할 것인가? | 앨리스의 증언을 어떤 방식으로 세상에 남길 것인가? |
| chapters.js | label.value → label.value | 지워진 예외 기록을 따라 조작의 흔적을 찾는다 | 지워진 예외 기록에서 조작의 흔적을 추적한다 |
| chapters.js | label.value → label.value | 에이해브와 함께 그림자를 즉시 쫓는다 | 에이해브와 함께 그림자를 즉시 추적한다 |
| chapters.js | question.value → question.value | 물과 꿈이 모두 부족한 상황에서 무엇을 우선할 것인가? | 물이 부족한 상황에서 꿈과 오늘의 생존 중 무엇을 우선할 것인가? |
| chapters.js | question.value → question.value | 이름을 고정하면 죽음을 막을 수 있지만 선택도 멈춘다. 어떻게 할 것인가? | 사서가 말하는 이름 고정의 저주에 어떻게 맞설 것인가? |
| chapters.js | short.value → short.value | 여백을 모두에게 열어두었다 | 여백을 모두에게 열어 두었다 |
| chapters.js | label.value → label.value | 아무것도 쓰지 않고 편집자를 찾아간다 | 여백을 비우고 편집자를 추적한다 |
| chapters.js | question.value → question.value | 봉합 거인의 의지와 창조주의 명령이 충돌한다. 누구의 결정을 따를 것인가? | 봉합 거인의 앞날을 누구의 뜻에 맡길 것인가? |
| chapters.js | question.value → question.value | 편집자가 모든 이야기를 하나의 결말로 만들려 한다. 어떻게 막을 것인가? | 편집자의 펜 앞에서 서로 다른 결말을 어떻게 지킬 것인가? |
| chapters.js | question.value → question.value | 첫 불씨를 누구의 손에 맡길 것인가? | 첫 불씨를 둘러싼 마지막 싸움에서 무엇을 지킬 것인가? |
| chapters.js | label.value → label.value | 불씨를 사람들에게 나눠 각자의 이야기를 지키게 한다 | 각자의 이야기를 지키는 편에 선다 |
| chapters.js | label.value → label.value | 규칙과 책임 아래 불씨를 관리한다 | 규칙과 책임을 지키는 편에 선다 |
| chapters.js | label.value → label.value | 불씨를 묶은 사슬을 끊고 근원을 끝까지 추적한다 | 사슬을 끊고 근원을 끝까지 추적한다 |
| chapters.js | ion.right.body.body[9].consequent.body[2].consequent.body[1].expression.arguments[0].right → body.body[9].consequent.body[2].consequent.body[1].expression.arguments[0].left.left.right | 는 지난 대화를 기억한다. “다음 인장을 되찾으면 다시 이야기하자.” |  지난 대화를 기억한다. “ |
| chapters.js | right.body.body[9].consequent.body[2].alternate.body[3].expression.arguments[0].left.right →  | <br>관계:  | (new/removed) |
| content.js | expression.callee.body.body[11].declarations[0].init.callee.object.elements[1].elements[1] → expression.callee.body.body[11].declarations[0].init.callee.object.elements[1].elements[1] | 제단은 생명의 온기를 탐낸다. | 제단은 생명의 온기를 탐낸다. 제단 위에는 시든 약초 다발이 놓여 있다. |
| content.js | expression.callee.body.body[11].declarations[0].init.callee.object.elements[2].elements[1] → expression.callee.body.body[11].declarations[0].init.callee.object.elements[2].elements[1] | 아이의 모습을 한 망령이 빈 집터를 가리킨다. | 아이의 모습을 한 망령이 빈 집터를 가리킨다. 망령은 손에 낡은 동전을 쥐고 있다. |
| content.js | allee.body.body[11].declarations[0].init.callee.object.elements[5].elements[2].elements[0] → allee.body.body[11].declarations[0].init.callee.object.elements[5].elements[2].elements[0] | 골드를 던진다 | 동전을 던진다 |
| content.js | expression.callee.body.body[11].declarations[0].init.callee.object.elements[6].elements[1] → expression.callee.body.body[11].declarations[0].init.callee.object.elements[6].elements[1] | 아직 온기가 남은 모루가 보인다. | 아직 온기가 남은 모루와 화로가 보인다. |
| content.js | allee.body.body[11].declarations[0].init.callee.object.elements[6].elements[2].elements[0] → allee.body.body[11].declarations[0].init.callee.object.elements[6].elements[2].elements[0] | 광석을 넣는다 | 화로에 광석을 넣는다 |
| content.js | expression.callee.body.body[11].declarations[0].init.callee.object.elements[7].elements[1] → expression.callee.body.body[11].declarations[0].init.callee.object.elements[7].elements[1] | 물속에서 자신의 목소리가 도움을 청한다. | 물속에서 당신의 목소리가 도움을 청한다. |
| content.js | expression.callee.body.body[11].declarations[0].init.callee.object.elements[8].elements[1] → expression.callee.body.body[11].declarations[0].init.callee.object.elements[8].elements[1] | 꽃 한 송이 놓이지 않은 묘들이 이어진다. | 꽃 한 송이 놓이지 않은 묘들이 이어진다. 그중 한 무덤에서는 봉인된 관이 드러나 있다. |
| content.js | xpression.callee.body.body[11].declarations[0].init.callee.object.elements[11].elements[1] → xpression.callee.body.body[11].declarations[0].init.callee.object.elements[11].elements[1] | 알 사이로 오래된 무기가 보인다. | 알 사이로 오래된 무기가 보인다. 알 사이로 비늘이 흩어져 있다. |
| content.js | llee.body.body[11].declarations[0].init.callee.object.elements[11].elements[2].elements[0] → llee.body.body[11].declarations[0].init.callee.object.elements[11].elements[2].elements[0] | 손을 뻗는다 | 무기에 손을 뻗는다 |
| content.js | xpression.callee.body.body[11].declarations[0].init.callee.object.elements[13].elements[1] → xpression.callee.body.body[11].declarations[0].init.callee.object.elements[13].elements[1] | 같은 빗방울이 허공에서 멈춰 있다. | 같은 빗방울이 허공에서 멈춰 있다. 빗방울 사이로 얇은 틈이 벌어져 있다. |
| content.js | llee.body.body[11].declarations[0].init.callee.object.elements[13].elements[2].elements[0] → llee.body.body[11].declarations[0].init.callee.object.elements[13].elements[2].elements[0] | 틈을 만져본다 | 틈을 만져 본다 |
| content.js | xpression.callee.body.body[11].declarations[0].init.callee.object.elements[17].elements[1] → xpression.callee.body.body[11].declarations[0].init.callee.object.elements[17].elements[1] | 별 없는 복도가 눈앞에서 사라지고 있다. | 별 없는 회랑가 눈앞에서 사라지고 있다. |
| engine.js | relationGreeting.value.body.body[1].argument.consequent.quasis[1] → relationGreeting.value.body.body[1].argument.consequent.quasis[1] | 는 거리를 둔다. “아직 네 판단을 믿을 수 없어.” |  거리를 둔다. “ |
| engine.js | relationGreeting.value.body.body[1].argument.alternate.consequent.quasis[1] → relationGreeting.value.body.body[1].argument.alternate.consequent.quasis[1] | 는 조심스럽게 상황만 설명한다. |  조심스럽게 상황만 설명한다. |
| engine.js | relationGreeting.value.body.body[1].argument.alternate.alternate.consequent.quasis[1] → relationGreeting.value.body.body[1].argument.alternate.alternate.consequent.quasis[1] | 는 당신을 알아보고 숨겨진 단서를 건넨다. |  당신을 알아보고 숨겨진 단서를 건넨다. |
| engine.js | ionGreeting.value.body.body[1].argument.alternate.alternate.alternate.consequent.quasis[1] → ionGreeting.value.body.body[1].argument.alternate.alternate.alternate.consequent.quasis[1] | 는 속내를 털어놓으며 당신에게 판단을 맡긴다. |  속내를 털어놓으며 당신에게 판단을 맡긴다. |
| engine.js | tionGreeting.value.body.body[1].argument.alternate.alternate.alternate.alternate.quasis[1] → tionGreeting.value.body.body[1].argument.alternate.alternate.alternate.alternate.quasis[1] | 는 당신 곁에 선다. “이번에도 함께 끝까지 가자.” |  당신 곁에 선다. “ |
| engine.js | dialogue.value.body.body[14].expression.arguments[0].expressions[1].consequent →  | “함께라면 다른 결말을 찾을 수 있겠어.” | (new/removed) |
| engine.js | finish.value.body.body[2].expression.right.object.elements[0] → finish.value.body.body[2].expression.right.object.elements[0] | 불씨의 수호자 | 불씨를 놓아준 자 |
| engine.js | postgame.value.body.body[2].expression.arguments[0] → postgame.value.body.body[2].expression.arguments[0] | 숲에 아침이 왔다. 별 없는 회랑과 아직 찾지 못한 비전이 당신을 기다린다. | 숲에 아침이 왔다. 별 없는 회랑과 아직 모습을 드러내지 않은 비전이 당신을 기다린다. |
| engine.js | ].consequent.body[0].declarations[0].init.arguments[0].body.alternate.consequent.quasis[1] → ].consequent.body[0].declarations[0].init.arguments[0].body.alternate.consequent.quasis[1] | 는 함께했던 일을 기억하지만, 당신과 다른 길로 떠난다. |  함께했던 일을 기억하지만, 당신과 다른 길로 떠난다. |
| engine.js | nt.body[0].declarations[0].init.arguments[0].body.alternate.alternate.consequent.quasis[1] → nt.body[0].declarations[0].init.arguments[0].body.alternate.alternate.consequent.quasis[1] | 는 당신을 경계하며 말없이 떠난다. |  당신을 경계하며 말없이 떠난다. |
| engine.js | .declarations[0].init.arguments[0].body.alternate.alternate.alternate.consequent.quasis[1] → .declarations[0].init.arguments[0].body.alternate.alternate.alternate.consequent.quasis[1] | 는 다시 만날 날을 약속한다. 아직 끝내지 못한 부탁이 남았다. |  다시 만날 날을 약속한다. 아직 끝내지 못한 부탁이 남았다. |
| engine.js | ].declarations[0].init.arguments[0].body.alternate.alternate.alternate.alternate.quasis[1] → ].declarations[0].init.arguments[0].body.alternate.alternate.alternate.alternate.quasis[1] | 는 자신의 길을 찾아 새벽으로 떠난다. |  자신의 길을 찾아 새벽으로 떠난다. |
| literature.js | text.value →  | 앨리스는 법정이 매일 다른 사람의 기억을 증거로 태운다고 말한다. 여왕은 그것만이 세계의 붕괴를 막는 방법이라고 주장한다. | (new/removed) |
| literature.js | choices.value.elements[0].elements[0] →  | 앨리스의 증언을 숨긴다 | (new/removed) |
| literature.js | choices.value.elements[1].elements[0] →  | 여왕에게 공개 재판을 요구한다 | (new/removed) |
| literature.js | choices.value.elements[2].elements[0] →  | 흰 토끼의 탈출로를 추적한다 | (new/removed) |
| literature.js | text.value →  | 증언 속에는 세상이 책의 마지막 장을 먹으며 버틴다는 사실이 담겨 있다. 누구에게 이 사실을 맡길 것인가? | (new/removed) |
| literature.js | choices.value.elements[0].elements[0] →  | 사람들에게 기록을 나누어 준다 | (new/removed) |
| literature.js | choices.value.elements[1].elements[0] →  | 법정의 기록 보관소에 봉인한다 | (new/removed) |
| literature.js | choices.value.elements[2].elements[0] →  | 추적단에 표적의 위치를 넘긴다 | (new/removed) |
| literature.js | text.value →  | 피조물은 자신을 괴물이라 부르지 말아 달라고 한다. 빅터는 그의 심장이 도서계의 균열을 봉합할 유일한 장치라고 말한다. | (new/removed) |
| literature.js | choices.value.elements[0].elements[0] →  | 피조물에게 이름을 고르게 한다 | (new/removed) |
| literature.js | choices.value.elements[1].elements[0] →  | 빅터의 실험 기록을 검증한다 | (new/removed) |
| literature.js | choices.value.elements[2].elements[0] →  | 심장의 근원을 함께 사냥한다 | (new/removed) |
| literature.js | text.value →  | 심장을 멈추면 균열 하나가 닫힌다. 그러나 다른 이의 삶을 재료로 삼은 세계가 오래 버틸 수 있을까? | (new/removed) |
| literature.js | choices.value.elements[0].elements[0] →  | 사람들의 불씨를 나누어 대체한다 | (new/removed) |
| literature.js | choices.value.elements[1].elements[0] →  | 피조물의 동의를 얻어 실험한다 | (new/removed) |
| literature.js | choices.value.elements[2].elements[0] →  | 장치를 부수고 균열 너머로 향한다 | (new/removed) |
| literature.js | text.value →  | 백경의 그림자가 모래 아래를 헤엄친다. 에이해브는 작살을 들고 돈키호테는 그것을 포로가 된 거인이라 부른다. | (new/removed) |
| literature.js | choices.value.elements[0].elements[0] →  | 돈키호테와 백경의 상처를 살핀다 | (new/removed) |
| literature.js | choices.value.elements[1].elements[0] →  | 법정의 허가로 포획을 준비한다 | (new/removed) |
| literature.js | choices.value.elements[2].elements[0] →  | 에이해브와 마지막 항해를 맹세한다 | (new/removed) |
| literature.js | text.value →  | 백경의 몸에는 사라진 세계들의 마지막 문장이 새겨져 있다. 죽이면 길이 열리고 살리면 기억이 남는다. | (new/removed) |
| literature.js | choices.value.elements[0].elements[0] →  | 백경을 풀어 주고 기억을 필사한다 | (new/removed) |
| literature.js | choices.value.elements[1].elements[0] →  | 문장을 보존한 채 백경을 봉인한다 | (new/removed) |
| literature.js | choices.value.elements[2].elements[0] →  | 작살로 세계를 묶은 사슬을 끊는다 | (new/removed) |
| narrative.js |  → alice.value.elements[0].elements[0] | (new/removed) | 앨리스가 가장자리가 탄 증언서를 내민다. |
| narrative.js |  → alice.value.elements[0].elements[1] | (new/removed) | “법정은 매일 누군가의 기억을 증거와 함께 태워.” |
| narrative.js |  → alice.value.elements[0].elements[2] | (new/removed) | 멀리서 여왕의 전령이 외친다. |
| narrative.js |  → alice.value.elements[0].elements[3] | (new/removed) | “기억을 남기면 세계가 다시 찢어진다.” |
| narrative.js |  → alice.value.elements[1].elements[0] | (new/removed) | 증언의 마지막 장에는 세계가 책의 결말을 먹으며 버틴다는 기록이 남아 있다. |
| narrative.js |  → alice.value.elements[1].elements[1] | (new/removed) | 앨리스가 낮게 묻는다. |
| narrative.js |  → alice.value.elements[1].elements[2] | (new/removed) | “이걸 누가 가져야 한다고 생각해?” |
| narrative.js |  → adam.value.elements[0].elements[0] | (new/removed) | 피조물의 가슴에는 창조주가 새긴 번호가 남아 있고, 목에는 같은 번호가 찍힌 낡은 번호표가 걸려 있다. |
| narrative.js |  → adam.value.elements[0].elements[1] | (new/removed) | 피조물이 번호표를 뜯어 바닥에 버린다. |
| narrative.js |  → adam.value.elements[0].elements[2] | (new/removed) | “괴물도 실험체도 아닌 이름을 갖고 싶다.” |
| narrative.js |  → adam.value.elements[0].elements[3] | (new/removed) | 빅터가 굳은 얼굴로 심장 장치를 가리킨다. |
| narrative.js |  → adam.value.elements[0].elements[4] | (new/removed) | “저 심장이 멈추면 균열을 막을 방법도 사라지겠지.” |
| narrative.js |  → adam.value.elements[1].elements[0] | (new/removed) | 장치를 멈추면 균열 하나를 닫을 수 있다. 대신 피조물의 심장도 함께 멈춘다. |
| narrative.js |  → adam.value.elements[1].elements[1] | (new/removed) | 피조물이 당신을 똑바로 바라본다. |
| narrative.js |  → adam.value.elements[1].elements[2] | (new/removed) | “내 삶을 재료로 쓸 거라면, 적어도 내게 먼저 물어라.” |
| narrative.js |  → ahab.value.elements[0].elements[0] | (new/removed) | 모래 아래로 거대한 흰 그림자가 헤엄친다. |
| narrative.js |  → ahab.value.elements[0].elements[1] | (new/removed) | 에이해브가 작살을 겨눈다. |
| narrative.js |  → ahab.value.elements[0].elements[2] | (new/removed) | “이번엔 놓치지 않는다.” |
| narrative.js |  → ahab.value.elements[0].elements[3] | (new/removed) | 돈키호테가 그 앞을 막아선다. |
| narrative.js |  → ahab.value.elements[0].elements[4] | (new/removed) | “저건 괴물이 아니라 상처 입은 거인일지도 모르오.” |
| narrative.js |  → ahab.value.elements[1].elements[0] | (new/removed) | 백경의 피부에는 사라진 세계들의 마지막 문장이 흉터처럼 새겨져 있다. |
| narrative.js |  → ahab.value.elements[1].elements[1] | (new/removed) | 흉터 사이로 오래된 사슬 자국이 이어져 있다. |
| narrative.js |  → ahab.value.elements[1].elements[2] | (new/removed) | 에이해브가 작살 끝을 내린다. |
| narrative.js |  → ahab.value.elements[1].elements[3] | (new/removed) | “죽이면 길이 열린다. 살리면 기억이 남겠군. 둘 다 가질 수는 없다.” |
| narrative.js |  → alice.value.elements[0] | (new/removed) | 앨리스가 접힌 증언서를 내민다. |
| narrative.js |  → alice.value.elements[1] | (new/removed) | “이름이 지워지기 전에, 네가 먼저 읽어 줘.” |
| narrative.js |  → queen.value.elements[0] | (new/removed) | 하트 여왕은 판결문에서 시선을 떼지 않는다. |
| narrative.js |  → queen.value.elements[1] | (new/removed) | “질서가 사람을 삼키기 시작했다면, 무엇을 고쳐야 하지?” |
| narrative.js |  → creature.value.elements[0] | (new/removed) | 피조물이 가슴의 봉합선을 손끝으로 짚는다. |
| narrative.js |  → creature.value.elements[1] | (new/removed) | “만들어진 이름 말고, 내가 고른 이름으로 불리고 싶다.” |
| narrative.js |  → victor.value.elements[0] | (new/removed) | 빅터가 실험 기록을 덮는다. |
| narrative.js |  → victor.value.elements[1] | (new/removed) | “다시 시작할 자격이 있다면… 책임부터 져야겠지.” |
| narrative.js |  → ahab.value.elements[0] | (new/removed) | 에이해브가 작살을 바닥에 세운다. |
| narrative.js |  → ahab.value.elements[1] | (new/removed) | “사냥을 끝낸 뒤에도 내가 남을지는 모르겠군.” |
| narrative.js |  → quixote.value.elements[0] | (new/removed) | 돈키호테가 낡은 방패를 고쳐 쥔다. |
| narrative.js |  → quixote.value.elements[1] | (new/removed) | “세상이 비웃어도, 누군가의 방패가 되는 꿈까지 버릴 수는 없소.” |
| narrative.js |  → alice.value.elements[0].elements[0] | (new/removed) | 앨리스가 불탄 명부를 무릎 위에 펼친다. |
| narrative.js |  → alice.value.elements[0].elements[1] | (new/removed) | “내 증언만 남긴다고 끝나는 게 아니야. 사라진 사람들 이름도 되찾고 싶어.” |
| narrative.js |  → alice.value.elements[0].elements[2] | (new/removed) | 그녀가 빈칸을 손끝으로 짚는다. |
| narrative.js |  → alice.value.elements[0].elements[3] | (new/removed) | “같이 찾아 줄래?” |
| narrative.js |  → alice.value.elements[1].elements[0] | (new/removed) | 사본의 빈칸에서 희미한 목소리가 새어 나온다. |
| narrative.js |  → alice.value.elements[1].elements[1] | (new/removed) | 앨리스가 펜을 당신에게 건넨다. |
| narrative.js |  → alice.value.elements[1].elements[2] | (new/removed) | “여기 비어 있는 이름들을 세상에 돌려줄지, 이제 같이 결정하자.” |
| narrative.js |  → adam.value.elements[0].elements[0] | (new/removed) | 피조물이 가슴에 남은 창조주의 번호 각인을 보여 준다. |
| narrative.js |  → adam.value.elements[0].elements[1] | (new/removed) | “이 번호로 불리고 싶지 않다.” |
| narrative.js |  → adam.value.elements[0].elements[2] | (new/removed) | 그가 심장 쪽을 가리킨다. |
| narrative.js |  → adam.value.elements[0].elements[3] | (new/removed) | “내가 고른 이름으로 살아갈 수 있도록 도와라.” |
| narrative.js |  → adam.value.elements[1].elements[0] | (new/removed) | 새 심장틀이 완성되자 빅터가 피조물에 대한 소유권을 주장한다. |
| narrative.js |  → adam.value.elements[1].elements[1] | (new/removed) | 피조물은 떨리는 손으로 펜을 집는다. |
| narrative.js |  → adam.value.elements[1].elements[2] | (new/removed) | “이번에는 내 이름을 내가 쓰겠다.” |
| narrative.js |  → ahab.value.elements[0].elements[0] | (new/removed) | 에이해브가 부러진 배의 승선 명단을 구겨 쥔다. |
| narrative.js |  → ahab.value.elements[0].elements[1] | (new/removed) | “백경만 보느라 돌아갈 사람들을 놓쳤군.” |
| narrative.js |  → ahab.value.elements[0].elements[2] | (new/removed) | 그가 처음으로 작살 대신 구명정을 바라본다. |
| narrative.js |  → ahab.value.elements[0].elements[3] | (new/removed) | “아직 늦지 않았다면, 배부터 고쳐라.” |
| narrative.js |  → ahab.value.elements[1].elements[0] | (new/removed) | 선원들은 귀환을 원하지만 멀리서 백경의 흔적이 다시 나타난다. |
| narrative.js |  → ahab.value.elements[1].elements[1] | (new/removed) | 에이해브가 작살을 천천히 내려놓는다. |
| narrative.js |  → ahab.value.elements[1].elements[2] | (new/removed) | “돌아갈 항로는 네가 정해라.” |
| narrative.js |  → alice.value.elements[0].elements[0] | (new/removed) | 증언서를 숨겨 앨리스를 보호한다 |
| narrative.js |  → alice.value.elements[0].elements[1] | (new/removed) | 여왕에게 공개 재판을 요구한다 |
| narrative.js |  → alice.value.elements[0].elements[2] | (new/removed) | 흰 토끼의 탈출로를 추적한다 |
| narrative.js |  → alice.value.elements[0].elements[3] | (new/removed) | 앨리스와 함께 증언의 원본을 확인한다 |
| narrative.js |  → alice.value.elements[1].elements[0] | (new/removed) | 기록을 사람들에게 나눠 준다 |
| narrative.js |  → alice.value.elements[1].elements[1] | (new/removed) | 법정 기록고에 봉인한다 |
| narrative.js |  → alice.value.elements[1].elements[2] | (new/removed) | 추적단에 증언 속 단서를 넘긴다 |
| narrative.js |  → alice.value.elements[1].elements[3] | (new/removed) | 앨리스와 사본을 만들어 함께 공개한다 |
| narrative.js |  → adam.value.elements[0].elements[0] | (new/removed) | 피조물에게 자기 이름을 고르게 한다 |
| narrative.js |  → adam.value.elements[0].elements[1] | (new/removed) | 빅터의 실험 기록부터 검증한다 |
| narrative.js |  → adam.value.elements[0].elements[2] | (new/removed) | 심장의 근원을 함께 추적한다 |
| narrative.js |  → adam.value.elements[0].elements[3] | (new/removed) | 피조물과 대체 심장 설계도를 확인한다 |
| narrative.js |  → adam.value.elements[1].elements[0] | (new/removed) | 사람들의 불씨로 심장을 대신한다 |
| narrative.js |  → adam.value.elements[1].elements[1] | (new/removed) | 동의를 얻어 장치 정지를 시험한다 |
| narrative.js |  → adam.value.elements[1].elements[2] | (new/removed) | 장치를 부수고 균열로 들어간다 |
| narrative.js |  → adam.value.elements[1].elements[3] | (new/removed) | 마지막 선택을 피조물에게 맡긴다 |
| narrative.js |  → ahab.value.elements[0].elements[0] | (new/removed) | 돈키호테와 백경의 상처를 살핀다 |
| narrative.js |  → ahab.value.elements[0].elements[1] | (new/removed) | 법정 허가를 받아 포획한다 |
| narrative.js |  → ahab.value.elements[0].elements[2] | (new/removed) | 에이해브와 마지막 항해를 맹세한다 |
| narrative.js |  → ahab.value.elements[0].elements[3] | (new/removed) | 선원들의 퇴로부터 확보한다 |
| narrative.js |  → ahab.value.elements[1].elements[0] | (new/removed) | 백경을 풀어 주고 문장을 필사한다 |
| narrative.js |  → ahab.value.elements[1].elements[1] | (new/removed) | 기억을 보존한 채 백경을 봉인한다 |
| narrative.js |  → ahab.value.elements[1].elements[2] | (new/removed) | 작살로 세계를 묶은 사슬을 끊는다 |
| narrative.js |  → ahab.value.elements[1].elements[3] | (new/removed) | 선원들을 먼저 귀환시킨다 |
| narrative.js |  → low.value | (new/removed) | 아직 네 판단을 믿을 수 없어. |
| narrative.js |  → high.value | (new/removed) | 이번에도 끝까지 함께할게. |
| narrative.js |  → repeat.value | (new/removed) | 다음 인장을 되찾으면 다시 이야기하자. |
| narrative.js |  → low.value | (new/removed) | 아직 네 판단을 믿을 수는 없지. |
| narrative.js |  → high.value | (new/removed) | 이번에도 끝까지 짐과 함께하라. |
| narrative.js |  → repeat.value | (new/removed) | 다음 인장을 되찾거든 다시 말을 올려라. |
| narrative.js |  → low.value | (new/removed) | 아직 네 판단을 믿을 수 없다. |
| narrative.js |  → high.value | (new/removed) | 이번에도 함께 끝까지 가겠다. |
| narrative.js |  → repeat.value | (new/removed) | 다음 인장을 되찾으면 다시 이야기하겠다. |
| narrative.js |  → low.value | (new/removed) | 아직 네 판단을 믿을 수는 없겠지. |
| narrative.js |  → high.value | (new/removed) | 이번에도 함께 끝까지 가게 되겠군. |
| narrative.js |  → repeat.value | (new/removed) | 다음 인장을 되찾으면 다시 이야기하게 되겠지. |
| narrative.js |  → low.value | (new/removed) | 아직 네 판단을 믿기는 어렵군. |
| narrative.js |  → high.value | (new/removed) | 이번에도 함께 끝까지 나아가라. |
| narrative.js |  → repeat.value | (new/removed) | 다음 인장을 되찾으면 다시 이야기하겠군. |
| narrative.js |  → low.value | (new/removed) | 아직 그대의 판단을 믿기는 어렵소. |
| narrative.js |  → high.value | (new/removed) | 이번에도 그대와 끝까지 함께 가겠소. |
| narrative.js |  → repeat.value | (new/removed) | 다음 인장을 되찾으면 다시 이야기하겠소. |
| narrative.js |  → alice.value | (new/removed) | 앨리스는 |
| narrative.js |  → queen.value | (new/removed) | 하트 여왕은 |
| narrative.js |  → creature.value | (new/removed) | 피조물은 |
| narrative.js |  → victor.value | (new/removed) | 빅터는 |
| narrative.js |  → ahab.value | (new/removed) | 에이해브는 |
| narrative.js |  → quixote.value | (new/removed) | 돈키호테는 |
| qa-relationships.js | text.value →  | 지워지는 증언을 지키려는 앨리스가 당신의 판단을 기다린다. | (new/removed) |
| qa-relationships.js | text.value →  | 여왕은 세계를 붙들 법과 사람을 구할 예외 사이에서 망설인다. | (new/removed) |
| qa-relationships.js | text.value →  | 만들어진 자는 창조주의 이름 대신 스스로의 이름으로 불리기를 원한다. | (new/removed) |
| qa-relationships.js | text.value →  | 빅터는 실험 기록 앞에서 묻는다. “책임을 질 수 있다면 다시 시작해도 되는가?” | (new/removed) |
| qa-relationships.js | text.value →  | 사냥의 끝에서 무엇이 남는지 에이해브는 아직 말하지 못한다. | (new/removed) |
| qa-relationships.js | text.value →  | 꿈을 조롱하는 세상에서도 돈키호테는 누군가의 방패가 되려 한다. | (new/removed) |
| qa-relationships.js | ssion.callee.body.body[9].expression.right.body.body[4].expression.arguments[0].left.right →  | <br>관계:  | (new/removed) |
| relationships.js | intro.value →  | 앨리스가 불탄 명부를 펼친다. “내 기억만 지킨다고 끝나는 일이 아니었어. 다른 증인들의 이름도 찾아줄래?” | (new/removed) |
| relationships.js | resolve.value →  | 사본의 빈칸에서 목소리가 들린다. 앨리스는 당신에게 펜을 건넨다. “이 이름들을 세상에 돌려줄지, 당신이 결정해 줘.” | (new/removed) |
| relationships.js | special.value.elements[0] → joint.value | 앨리스와 증인들을 먼저 대피시킨다 | “함께라면 다른 결말도 찾을 수 있을 거야.” |
| relationships.js | special.value.elements[1] → answers.value.elements[0] | 앨리스와 사본을 만들어 원본과 함께 공개한다 | “내 이야기를 믿어 줘서 고마워.” |
| relationships.js | answers.value.elements[0] →  | “내 이야기를 믿어줘서 고마워.” | (new/removed) |
| relationships.js | intro.value →  | 피조물은 심장에 남은 창조주의 번호를 보여준다. “누군가의 부품이 아닌 이름으로 살고 싶다. 내 심장을 고쳐줄 수 있나?” | (new/removed) |
| relationships.js | resolve.value →  | 새 심장틀이 완성됐다. 빅터는 소유권을 주장하지만, 피조물은 떨리는 손으로 자신의 이름을 쓰려고 한다. | (new/removed) |
| relationships.js | epilogue.value → epilogue.value | 피조물은 스스로 고른 이름으로 사람들 사이에 정착한다. 당신을 처음 믿어준 친구로 기억한다. | 피조물은 스스로 고른 이름으로 사람들 사이에 정착한다. 자신을 처음 믿어 준 친구로 당신을 기억한다. |
| relationships.js | special.value.elements[0] → joint.value | 피조물과 함께 대체 심장의 설계도를 찾는다 | “함께라면 다른 결말을 찾을 수 있을지도 모른다.” |
| relationships.js | special.value.elements[1] → answers.value.elements[0] | 대체 심장을 설치하고 피조물에게 선택권을 준다 | “나를 사람으로 불러 준 말을 잊지 않겠다.” |
| relationships.js | answers.value.elements[0] → answers.value.elements[1] | “나를 사람으로 불러준 말을 잊지 않겠다.” | “내 동의가 정말 중요하다면, 끝까지 물어라.” |
| relationships.js | answers.value.elements[1] → answers.value.elements[2] | “내 동의가 정말 중요하다면 끝까지 물어봐 줘.” | “장치를 부수면 내 심장도 함께 멈춘다. 그래도 하겠다는 건가?” |
| relationships.js | answers.value.elements[2] →  | “장치를 부수면 내 안의 기억도 사라질 수 있어.” | (new/removed) |
| relationships.js | intro.value →  | 에이해브가 부러진 배의 명단을 쥐고 있다. “백경만 쫓느라 돌아갈 사람들을 보지 못했군. 아직 늦지 않았다면 배부터 고치자.” | (new/removed) |
| relationships.js | resolve.value →  | 선원들은 귀환을 원하지만 백경의 흔적이 다시 나타났다. 에이해브는 작살을 내려놓고 당신의 판단을 기다린다. | (new/removed) |
| relationships.js | special.value.elements[0] → joint.value | 에이해브와 선원들의 퇴로를 먼저 확보한다 | “함께라면 다른 항로를 찾을 수 있겠군.” |
| relationships.js | special.value.elements[1] →  | 선원들을 귀환시키고 사슬만 끊는다 | (new/removed) |
| ui.js |  → root.body[0].expression.callee.body.body[10].declarations[0].init.body.arguments[1] | (new/removed) | 불씨를 놓아준 자 |
| ui.js | alice.value.elements[0].elements[0] →  | 앨리스가 가장자리가 탄 증언서를 내민다. | (new/removed) |
| ui.js | alice.value.elements[0].elements[1] →  | “법정은 매일 누군가의 기억을 증거와 함께 태워.” | (new/removed) |
| ui.js | alice.value.elements[0].elements[2] →  | 멀리서 여왕의 전령이 외친다. | (new/removed) |
| ui.js | alice.value.elements[0].elements[3] →  | “기억을 남기면 세계가 다시 찢어진다.” | (new/removed) |
| ui.js | alice.value.elements[1].elements[0] →  | 증언의 마지막 장에는 세계가 책의 결말을 먹으며 버틴다는 기록이 남아 있다. | (new/removed) |
| ui.js | alice.value.elements[1].elements[1] →  | 앨리스가 낮게 묻는다. | (new/removed) |
| ui.js | alice.value.elements[1].elements[2] →  | “이걸 누가 가져야 한다고 생각해?” | (new/removed) |
| ui.js | adam.value.elements[0].elements[0] →  | 피조물이 낡은 번호표를 뜯어 손바닥에 올린다. | (new/removed) |
| ui.js | adam.value.elements[0].elements[1] →  | “괴물도 실험체도 아닌 이름을 갖고 싶다.” | (new/removed) |
| ui.js | adam.value.elements[0].elements[2] →  | 빅터가 굳은 얼굴로 심장 장치를 가리킨다. | (new/removed) |
| ui.js | adam.value.elements[0].elements[3] →  | “저 심장이 멈추면 균열을 막을 방법도 사라진다.” | (new/removed) |
| ui.js | adam.value.elements[1].elements[0] →  | 장치를 멈추면 균열 하나를 닫을 수 있다. 대신 피조물의 심장도 함께 멈춘다. | (new/removed) |
| ui.js | adam.value.elements[1].elements[1] →  | 피조물이 당신을 똑바로 바라본다. | (new/removed) |
| ui.js | adam.value.elements[1].elements[2] →  | “내 삶을 재료로 쓸 거라면, 적어도 내게 먼저 물어라.” | (new/removed) |
| ui.js | ahab.value.elements[0].elements[0] →  | 모래 아래로 거대한 흰 그림자가 헤엄친다. | (new/removed) |
| ui.js | ahab.value.elements[0].elements[1] →  | 에이해브가 작살을 겨눈다. | (new/removed) |
| ui.js | ahab.value.elements[0].elements[2] →  | “이번엔 놓치지 않는다.” | (new/removed) |
| ui.js | ahab.value.elements[0].elements[3] →  | 돈키호테가 그 앞을 막아선다. | (new/removed) |
| ui.js | ahab.value.elements[0].elements[4] →  | “저건 괴물이 아니라 상처 입은 거인일지도 모르오.” | (new/removed) |
| ui.js | ahab.value.elements[1].elements[0] →  | 백경의 피부에는 사라진 세계들의 마지막 문장이 흉터처럼 새겨져 있다. | (new/removed) |
| ui.js | ahab.value.elements[1].elements[1] →  | 에이해브가 작살 끝을 내린다. | (new/removed) |
| ui.js | ahab.value.elements[1].elements[2] →  | “죽이면 길이 열린다. 살리면 기억이 남겠지. 둘 다 가질 순 없다.” | (new/removed) |
| ui.js | alice.value.elements[0] →  | 앨리스가 접힌 증언서를 내민다. | (new/removed) |
| ui.js | alice.value.elements[1] →  | “이름이 지워지기 전에, 네가 먼저 읽어줘.” | (new/removed) |
| ui.js | queen.value.elements[0] →  | 하트 여왕은 판결문에서 시선을 떼지 않는다. | (new/removed) |
| ui.js | queen.value.elements[1] →  | “질서가 사람을 삼키기 시작했다면, 무엇을 고쳐야 하지?” | (new/removed) |
| ui.js | creature.value.elements[0] →  | 피조물이 가슴의 봉합선을 손끝으로 짚는다. | (new/removed) |
| ui.js | creature.value.elements[1] →  | “만들어진 이름 말고, 내가 고른 이름으로 불리고 싶다.” | (new/removed) |
| ui.js | victor.value.elements[0] →  | 빅터가 실험 기록을 덮는다. | (new/removed) |
| ui.js | victor.value.elements[1] →  | “다시 시작할 자격이 있다면… 책임부터 져야겠지.” | (new/removed) |
| ui.js | ahab.value.elements[0] →  | 에이해브가 작살을 바닥에 세운다. | (new/removed) |
| ui.js | ahab.value.elements[1] →  | “사냥을 끝낸 뒤에도 내가 남을지는 모르겠군.” | (new/removed) |
| ui.js | quixote.value.elements[0] →  | 돈키호테가 낡은 방패를 고쳐 쥔다. | (new/removed) |
| ui.js | quixote.value.elements[1] →  | “세상이 비웃어도, 누군가의 방패가 되는 꿈까지 버릴 순 없지.” | (new/removed) |
| ui.js | alice.value.elements[0].elements[0] →  | 앨리스가 불탄 명부를 무릎 위에 펼친다. | (new/removed) |
| ui.js | alice.value.elements[0].elements[1] →  | “내 이름만 남긴다고 끝나는 게 아니야. 사라진 사람들 이름도 되찾고 싶어.” | (new/removed) |
| ui.js | alice.value.elements[0].elements[2] →  | 그녀가 빈칸을 손끝으로 짚는다. | (new/removed) |
| ui.js | alice.value.elements[0].elements[3] →  | “같이 찾아줄래?” | (new/removed) |
| ui.js | alice.value.elements[1].elements[0] →  | 사본의 빈칸에서 희미한 목소리가 새어 나온다. | (new/removed) |
| ui.js | alice.value.elements[1].elements[1] →  | 앨리스가 펜을 당신에게 건넨다. | (new/removed) |
| ui.js | alice.value.elements[1].elements[2] →  | “여기 적힌 이름들을 세상에 돌려줄지, 이제 같이 결정하자.” | (new/removed) |
| ui.js | adam.value.elements[0].elements[0] →  | 피조물이 가슴에 새겨진 창조주의 번호를 보여준다. | (new/removed) |
| ui.js | adam.value.elements[0].elements[1] →  | “이 번호로 불리고 싶지 않다.” | (new/removed) |
| ui.js | adam.value.elements[0].elements[2] →  | 그가 심장 쪽을 가리킨다. | (new/removed) |
| ui.js | adam.value.elements[0].elements[3] →  | “내가 고른 이름으로 살아갈 수 있게 도와줄 수 있나?” | (new/removed) |
| ui.js | adam.value.elements[1].elements[0] →  | 새 심장틀이 완성되자 빅터가 소유권을 주장한다. | (new/removed) |
| ui.js | adam.value.elements[1].elements[1] →  | 피조물은 떨리는 손으로 펜을 집는다. | (new/removed) |
| ui.js | adam.value.elements[1].elements[2] →  | “이번에는 내 이름을 내가 쓰겠다.” | (new/removed) |
| ui.js | ahab.value.elements[0].elements[0] →  | 에이해브가 부러진 배의 승선 명단을 구겨 쥔다. | (new/removed) |
| ui.js | ahab.value.elements[0].elements[1] →  | “백경만 보느라 돌아갈 사람들을 놓쳤군.” | (new/removed) |
| ui.js | ahab.value.elements[0].elements[2] →  | 그가 처음으로 작살 대신 구명정을 바라본다. | (new/removed) |
| ui.js | ahab.value.elements[0].elements[3] →  | “아직 늦지 않았다면, 배부터 고치자.” | (new/removed) |
| ui.js | ahab.value.elements[1].elements[0] →  | 선원들은 귀환을 원하지만 멀리서 백경의 흔적이 다시 나타난다. | (new/removed) |
| ui.js | ahab.value.elements[1].elements[1] →  | 에이해브가 작살을 천천히 내려놓는다. | (new/removed) |
| ui.js | ahab.value.elements[1].elements[2] →  | “이번엔 내가 아니라 네가 정해라. 쫓을지, 돌아갈지.” | (new/removed) |
| ui.js | alice.value.elements[0].elements[0] →  | 증언서를 숨겨 앨리스를 보호한다 | (new/removed) |
| ui.js | alice.value.elements[0].elements[1] →  | 여왕에게 공개 재판을 요구한다 | (new/removed) |
| ui.js | alice.value.elements[0].elements[2] →  | 흰 토끼의 탈출로를 뒤쫓는다 | (new/removed) |
| ui.js | alice.value.elements[0].elements[3] →  | 앨리스와 함께 증언의 원본을 확인한다 | (new/removed) |
| ui.js | alice.value.elements[1].elements[0] →  | 기록을 사람들에게 나눠 준다 | (new/removed) |
| ui.js | alice.value.elements[1].elements[1] →  | 법정 기록고에 봉인한다 | (new/removed) |
| ui.js | alice.value.elements[1].elements[2] →  | 추적단에 표적의 위치를 넘긴다 | (new/removed) |
| ui.js | alice.value.elements[1].elements[3] →  | 앨리스와 사본을 만들어 함께 공개한다 | (new/removed) |
| ui.js | adam.value.elements[0].elements[0] →  | 피조물에게 자기 이름을 고르게 한다 | (new/removed) |
| ui.js | adam.value.elements[0].elements[1] →  | 빅터의 실험 기록부터 검증한다 | (new/removed) |
| ui.js | adam.value.elements[0].elements[2] →  | 심장의 근원을 함께 추적한다 | (new/removed) |
| ui.js | adam.value.elements[0].elements[3] →  | 피조물과 대체 심장 설계도를 확인한다 | (new/removed) |
| ui.js | adam.value.elements[1].elements[0] →  | 사람들의 불씨로 심장을 대신한다 | (new/removed) |
| ui.js | adam.value.elements[1].elements[1] →  | 피조물의 동의를 받고 실험한다 | (new/removed) |
| ui.js | adam.value.elements[1].elements[2] →  | 장치를 부수고 균열로 들어간다 | (new/removed) |
| ui.js | adam.value.elements[1].elements[3] →  | 마지막 선택을 피조물에게 맡긴다 | (new/removed) |
| ui.js | ahab.value.elements[0].elements[0] →  | 돈키호테와 백경의 상처를 살핀다 | (new/removed) |
| ui.js | ahab.value.elements[0].elements[1] →  | 법정 허가를 받아 포획한다 | (new/removed) |
| ui.js | ahab.value.elements[0].elements[2] →  | 에이해브와 마지막 항해를 맹세한다 | (new/removed) |
| ui.js | ahab.value.elements[0].elements[3] →  | 선원들의 퇴로부터 확보한다 | (new/removed) |
| ui.js | ahab.value.elements[1].elements[0] →  | 백경을 풀어주고 문장을 필사한다 | (new/removed) |
| ui.js | ahab.value.elements[1].elements[1] →  | 기억을 보존한 채 백경을 봉인한다 | (new/removed) |
| ui.js | ahab.value.elements[1].elements[2] →  | 작살로 세계를 묶은 사슬을 끊는다 | (new/removed) |
| ui.js | ahab.value.elements[1].elements[3] →  | 선원들을 먼저 귀환시킨다 | (new/removed) |

## 첨부 F — 전체 ID↔이름↔파일 매핑

# Image mapping

Current integrated task baseline: `a38d692203b73ea92d981ae1f8f85d81566f4016` (earlier mapping baseline `793a996a25a96fd15c59d99190495f7a3031b965`). Pre-change inventory: image-inventory-before.json. Existing assets are preserved. This document records selected sources and all runtime mappings before QA publication.

Library: /텍스트 rpg (recursive). Current inventory: 219 images, 7 documents, 1 folder; metadata in library-current-inventory.json. Earlier candidate review below is preserved as history. Nine additional dedicated portraits are confirmed in part-b-image-selections.json; originals are preserved. Unconfirmed candidates remain held.

Only a fixed creation queue plus matching subject is accepted; numeric order/autogenerated title alone is not. The seven selections have source SHA-256 and Library IDs in library-image-selections.json. Existing 102 WebPs use the original GEMINI_GEMS_IMAGE_MANIFEST, plus three shared gear SVGs. Story Adam is explicitly allowed for Creature/Victor story scenes, never as another person’s portrait.

## Confirmed additions

| Class ID | Queue | Library image | Runtime file |
|---|---|---|---|
| adventurer | 001 | /텍스트 rpg/캐릭터 및 아이템 이미지/폐허를 걷는 고독한 모험가.png | assets/class_adventurer.webp |
| hunter | 002 | /텍스트 rpg/캐릭터 및 아이템 이미지/안개 낀 폐허의 고독한 사냥꾼.png | assets/class_hunter.webp |
| guardian | 003 | /텍스트 rpg/캐릭터 및 아이템 이미지/폐허의 고딕 성을 향한 방랑 기사.png | assets/class_guardian.webp |
| x_magic_0 | 004 | /텍스트 rpg/캐릭터 및 아이템 이미지/폐허의 서고를 지배하는 잉크 마법사.png | assets/class_x_magic_0.webp |
| x_magic_3 | 007 | /텍스트 rpg/비 내리는 고딕 우물의 마법사.png | assets/class_x_magic_3.webp |
| x_magic_4 | 008 | /텍스트 rpg/침몰한 성당의 바다 마녀.png | assets/class_x_magic_4.webp |
| x_ranged_2 | 013 | /텍스트 rpg/안개 낀 폐허 정원의 슬링샷 사냥꾼.png | assets/class_x_ranged_2.webp |

## classes

| ID | Name | Path | Status |
|---|---|---|---|
| warrior | 전사 | assets/class_warrior.webp | CONNECTED |
| rogue | 도적 | assets/class_rogue.webp | CONNECTED |
| mage | 마도사 | assets/class_mage.webp | CONNECTED |
| paladin | 성기사 | assets/class_paladin.webp | CONNECTED |
| blood | 혈기사 | assets/class_blood.webp | CONNECTED |
| rune | 룬검사 | assets/class_rune.webp | CONNECTED |
| shadow | 그림자 군주 | assets/class_shadow.webp | CONNECTED |
| gambler | 운명의 도박사 | assets/class_gambler.webp | CONNECTED |
| chrono | 시간술사 | assets/class_chrono.webp | CONNECTED |
| rabbit_guard | 토끼굴 문지기 | assets/class_rabbit_guard.webp | CONNECTED |
| pequod | 피쿼드호 갑판검사 | assets/class_pequod.webp | CONNECTED |
| windmill | 풍차의 결투자 | assets/class_windmill.webp | CONNECTED |
| stitch | 봉합된 검투사 | assets/class_stitch.webp | CONNECTED |
| card_spear | 찢긴 카드 창병 | assets/class_card_spear.webp | CONNECTED |
| sancho | 산초의 방패지기 | assets/class_sancho.webp | CONNECTED |
| coffin | 빈 관의 파수꾼 | assets/class_coffin.webp | CONNECTED |
| mirror_fist | 거울 복도의 권투사 | assets/class_mirror_fist.webp | CONNECTED |
| ahab_harpoon | 광기에 찬 포경선 작살잡이 | assets/class_ahab_harpoon.webp | CONNECTED |
| fallen_dreamer | 기사도를 잃은 몽상가 | assets/class_fallen_dreamer.webp | CONNECTED |
| queen_exec | 하트 법정의 참수인 | assets/class_queen_exec.webp | CONNECTED |
| adam_sword | 피조물의 자유검사 | assets/class_adam_sword.webp | CONNECTED |
| twin_duel | 지킬의 이중 결투자 | assets/class_twin_duel.webp | CONNECTED |
| white_knight | 백기사의 균형검 | assets/class_white_knight.webp | CONNECTED |
| grave_hunter | 성당 지하의 사냥꾼 | assets/class_grave_hunter.webp | CONNECTED |
| pagebreaker | 끝장을 찢는 검성 | assets/class_pagebreaker.webp | CONNECTED |
| abyss_anchor | 심연을 고정하는 닻기사 | assets/class_abyss_anchor.webp | CONNECTED |
| clock_reaver | 멈춘 시계의 결투왕 | assets/class_clock_reaver.webp | CONNECTED |
| thorn_crown | 가시 왕관의 반역자 | assets/class_thorn_crown.webp | CONNECTED |
| last_margin | 마지막 여백의 용병왕 | assets/class_last_margin.webp | CONNECTED |
| adventurer | 모험가 | assets/class_adventurer.webp | CONNECTED |
| hunter | 사냥꾼 | assets/class_hunter.webp | CONNECTED |
| guardian | 수호자 | assets/class_guardian.webp | CONNECTED |
| x_magic_0 | 잉크 견습생 | assets/class_x_magic_0.webp | CONNECTED |
| x_magic_3 | 우물의 이름술사 | assets/class_x_magic_3.webp | CONNECTED |
| x_magic_4 | 해저 전류술사 | assets/class_x_magic_4.webp | CONNECTED |
| x_ranged_2 | 이상한 정원의 새총잡이 | assets/class_x_ranged_2.webp | CONNECTED |
| x_magic_1 | 오즈의 허수아비 학자 | assets/class_x_magic_1.webp | CONNECTED |
| x_magic_2 | 네버랜드 별읽기 | assets/class_x_magic_2.webp | CONNECTED |
| x_magic_5 | 장미 정원의 환술사 | assets/class_x_magic_5.webp | CONNECTED |
| x_magic_6 | 녹색 안경의 주술사 | assets/class_x_magic_6.webp | CONNECTED |
| x_magic_7 | 번개 실험실의 도전술사 | assets/class_x_magic_7.webp | CONNECTED |
| x_magic_8 | 프랑켄슈타인의 생체술사 | assets/class_x_magic_8.webp | CONNECTED |
| x_magic_9 | 그림 동화의 잠술사 | assets/class_x_magic_9.webp | CONNECTED |
| x_magic_10 | 거울 뒷면의 연금술사 | assets/class_x_magic_10.webp | CONNECTED |
| x_magic_11 | 빅토리아의 안개술사 | assets/class_x_magic_11.webp | CONNECTED |
| x_magic_12 | 노틸러스의 폭풍학자 | assets/class_x_magic_12.webp | CONNECTED |
| x_magic_13 | 오즈의 가짜 대마법사 | assets/class_x_magic_13.webp | CONNECTED |
| x_magic_14 | 별을 읽는 어린 왕자 | assets/class_x_magic_14.webp | CONNECTED |
| x_magic_15 | 시간 기계의 역행술사 | assets/class_x_magic_15.webp | CONNECTED |
| x_magic_16 | 파우스트의 계약해독자 | assets/class_x_magic_16.webp | CONNECTED |
| x_magic_17 | 금서의 마지막 독자 | assets/class_x_magic_17.webp | CONNECTED |
| x_ranged_0 | 셜우드의 견습 궁수 | assets/class_x_ranged_0.webp | CONNECTED |
| x_ranged_1 | 피쿼드호 투창수 | assets/class_x_ranged_1.webp | CONNECTED |
| x_ranged_3 | 해적섬의 화승총수 | assets/class_x_ranged_3.webp | CONNECTED |
| x_ranged_4 | 황야의 우편 저격수 | assets/class_x_ranged_4.webp | CONNECTED |
| x_ranged_5 | 종탑의 까마귀 사수 | assets/class_x_ranged_5.webp | CONNECTED |
| x_ranged_6 | 오즈의 양철 포수 | assets/class_x_ranged_6.webp | CONNECTED |
| x_ranged_7 | 붉은 머리의 표적꾼 | assets/class_x_ranged_7.webp | CONNECTED |
| x_ranged_8 | 로빈후드의 망명 궁수 | assets/class_x_ranged_8.webp | CONNECTED |
| x_ranged_9 | 노틸러스의 수압포수 | assets/class_x_ranged_9.webp | CONNECTED |
| x_ranged_10 | 퀴퀘그의 문신 투창수 | assets/class_x_ranged_10.webp | CONNECTED |
| x_ranged_11 | 지옥 항로의 쇠뇌수 | null | FALLBACK |
| x_ranged_12 | 하멜른의 음표 사수 | null | FALLBACK |
| x_ranged_13 | 성벽의 불씨 투석수 | null | FALLBACK |
| x_ranged_14 | 포그의 일주 저격수 | null | FALLBACK |
| x_ranged_15 | 백경의 망루 사냥꾼 | null | FALLBACK |
| x_ranged_16 | 아르고호의 황금 사수 | null | FALLBACK |
| x_ranged_17 | 수평선 너머의 명사수 | null | FALLBACK |
| x_support_0 | 구빈원 붕대지기 | null | FALLBACK |
| x_support_1 | 촛불 성당의 견습수도사 | null | FALLBACK |
| x_support_2 | 산초의 야전 취사병 | null | FALLBACK |
| x_support_3 | 작은 아씨들의 간호사 | null | FALLBACK |
| x_support_4 | 오즈의 마음 수선공 | null | FALLBACK |
| x_support_5 | 성냥의 온기지기 | null | FALLBACK |
| x_support_6 | 노틸러스의 선의 | null | FALLBACK |
| x_support_7 | 토끼굴 길안내자 | null | FALLBACK |
| x_support_8 | 피조물의 상처봉합사 | null | FALLBACK |
| x_support_9 | 노트르담의 종치유사 | null | FALLBACK |
| x_support_10 | 레미제라블의 은촛대지기 | null | FALLBACK |
| x_support_11 | 캔터베리의 순례의사 | null | FALLBACK |
| x_support_12 | 셜우드의 구호대장 | null | FALLBACK |
| x_support_13 | 백지 연맹의 기록보호자 | null | FALLBACK |
| x_support_14 | 스쿠루지의 새벽 구호가 | null | FALLBACK |
| x_support_15 | 천일야화의 생명 이야기꾼 | null | FALLBACK |
| x_support_16 | 돌아온 성냥불의 성녀 | null | FALLBACK |
| x_support_17 | 유리 심장의 재봉사 | null | FALLBACK |
| x_occult_0 | 거울 장터의 골동품상 | null | FALLBACK |
| x_occult_1 | 허클베리의 강길잡이 | null | FALLBACK |
| x_occult_2 | 몽테크리스토의 장부지기 | null | FALLBACK |
| x_occult_3 | 드라큘라의 주간 문지기 | null | FALLBACK |
| x_occult_4 | 걸리버의 축척기사 | null | FALLBACK |
| x_occult_5 | 도리언의 초상 관리인 | null | FALLBACK |
| x_occult_6 | 보물섬의 암호해독자 | null | FALLBACK |
| x_occult_7 | 시간 여행의 관측자 | null | FALLBACK |
| x_occult_8 | 셜록의 흔적 수집가 | null | FALLBACK |
| x_occult_9 | 오디세우스의 매듭꾼 | null | FALLBACK |
| x_occult_10 | 카르밀라의 야간 감시자 | null | FALLBACK |
| x_occult_11 | 체셔의 미소 밀수꾼 | null | FALLBACK |
| x_occult_12 | 해저 이만리의 유물잠수사 | null | FALLBACK |
| x_occult_13 | 동물 재판의 증언 도둑 | null | FALLBACK |
| x_occult_14 | 세헤라자드의 결말 협상가 | null | FALLBACK |
| x_occult_15 | 지옥문 앞의 길동무 | null | FALLBACK |
| x_occult_16 | 찢어진 장의 경계인 | null | FALLBACK |
| whale_slayer | 백경 살해자 | null | FALLBACK |
| self_named | 스스로 이름 붙인 검왕 | null | FALLBACK |
| dream_guard | 라만차의 꿈 수호자 | null | FALLBACK |
| court_witness | 하트 법정의 증언기사 | null | FALLBACK |
| alice_return | 앨리스의 귀환 안내자 | null | FALLBACK |
| victor_heir | 빅터의 속죄 봉합사 | null | FALLBACK |
| quixote_squire | 라만차의 맹세 종자 | null | FALLBACK |
| sherwood_warden | 셜우드의 숲 파수장 | null | FALLBACK |
| oz_restorer | 오즈의 심장 복원사 | null | FALLBACK |
| faust_release | 파우스트의 계약 파기자 | null | FALLBACK |
| margin_keeper | 경계의 여백 수호자 | null | FALLBACK |

## enemies

| ID | Name | Path | Status |
|---|---|---|---|
| 굶주린 늑대 | 굶주린 늑대 | assets/enemy_01.webp | CONNECTED |
| 가시 고블린 | 가시 고블린 | assets/enemy_02.webp | CONNECTED |
| 추방된 사냥꾼 | 추방된 사냥꾼 | assets/enemy_03.webp | CONNECTED |
| 흙의 정령 | 흙의 정령 | assets/enemy_04.webp | CONNECTED |
| 잿빛 약탈자 | 잿빛 약탈자 | assets/enemy_05.webp | CONNECTED |
| 저주받은 주민 | 저주받은 주민 | assets/enemy_06.webp | CONNECTED |
| 빈 갑옷 | 빈 갑옷 | assets/enemy_07.webp | CONNECTED |
| 종탑의 까마귀 | 종탑의 까마귀 | assets/enemy_08.webp | CONNECTED |
| 독안개 망령 | 독안개 망령 | assets/enemy_09.webp | CONNECTED |
| 늪의 포식자 | 늪의 포식자 | assets/enemy_10.webp | CONNECTED |
| 수정 거미 | 수정 거미 | assets/enemy_11.webp | CONNECTED |
| 이끼 골렘 | 이끼 골렘 | assets/enemy_12.webp | CONNECTED |
| 왕의 처형인 | 왕의 처형인 | assets/enemy_13.webp | CONNECTED |
| 타락한 수호자 | 타락한 수호자 | assets/enemy_14.webp | CONNECTED |
| 검은 기사 | 검은 기사 | assets/enemy_15.webp | CONNECTED |
| 기억을 먹는 자 | 기억을 먹는 자 | assets/enemy_16.webp | CONNECTED |
| 유리 전갈 | 유리 전갈 | assets/enemy_17.webp | CONNECTED |
| 모래 도적 | 모래 도적 | assets/enemy_18.webp | CONNECTED |
| 미라 사제 | 미라 사제 | assets/enemy_19.webp | CONNECTED |
| 붉은 독수리 | 붉은 독수리 | assets/enemy_20.webp | CONNECTED |
| 잉크 망령 | 잉크 망령 | assets/enemy_21.webp | CONNECTED |
| 종이 수호자 | 종이 수호자 | assets/enemy_22.webp | CONNECTED |
| 사라진 학자 | 사라진 학자 | assets/enemy_23.webp | CONNECTED |
| 달빛 인형 | 달빛 인형 | assets/enemy_24.webp | CONNECTED |
| 철의 거인 | 철의 거인 | assets/enemy_25.webp | CONNECTED |
| 불꽃 악령 | 불꽃 악령 | assets/enemy_26.webp | CONNECTED |
| 검댕 사냥개 | 검댕 사냥개 | assets/enemy_27.webp | CONNECTED |
| 쇳물 기사 | 쇳물 기사 | assets/enemy_28.webp | CONNECTED |
| 무명의 왕 | 무명의 왕 | assets/enemy_29.webp | CONNECTED |
| 시간의 파수병 | 시간의 파수병 | assets/enemy_30.webp | CONNECTED |
| 공허의 기사 | 공허의 기사 | assets/enemy_31.webp | CONNECTED |
| 검은 태양의 사도 | 검은 태양의 사도 | assets/enemy_32.webp | CONNECTED |
| 보급함 미믹 | 보급함 미믹 | assets/enemy_mimic.webp | CONNECTED |

## bosses

| ID | Name | Path | Status |
|---|---|---|---|
| 가시의 파수꾼 | 가시의 파수꾼 | assets/boss_00.webp | CONNECTED |
| 종지기 모르 | 종지기 모르 | assets/boss_01.webp | CONNECTED |
| 거울의 마녀 | 거울의 마녀 | assets/boss_02.webp | CONNECTED |
| 하트 여왕의 집행관 | 하트 여왕의 집행관 | assets/boss_03.webp | CONNECTED |
| 사막의 예언자 | 사막의 예언자 | assets/boss_04.webp | CONNECTED |
| 금서의 사서 | 금서의 사서 | assets/boss_05.webp | CONNECTED |
| 빅터의 봉합 거인 | 빅터의 봉합 거인 | assets/boss_06.webp | CONNECTED |
| 결말을 먹는 편집자 | 결말을 먹는 편집자 | assets/boss_07.webp | CONNECTED |
| 이름을 지운 자 | 이름을 지운 자 | assets/boss_rift.webp | CONNECTED |

## areas

| ID | Name | Path | Status |
|---|---|---|---|
| 0 | 검은 숲 | assets/location_00.webp | CONNECTED |
| 1 | 침묵의 마을 | assets/location_01.webp | CONNECTED |
| 2 | 유리 늪 | assets/location_02.webp | CONNECTED |
| 3 | 잊힌 왕성 | assets/location_03.webp | CONNECTED |
| 4 | 붉은 사막 | assets/location_04.webp | CONNECTED |
| 5 | 달의 도서관 | assets/location_05.webp | CONNECTED |
| 6 | 공허의 용광로 | assets/location_06.webp | CONNECTED |
| 7 | 새벽 없는 왕좌 | assets/location_07.webp | CONNECTED |

## events

| ID | Name | Path | Status |
|---|---|---|---|
| 0 | 부상당한 사냥꾼 | assets/event_00.webp | CONNECTED |
| 1 | 검은 제단 | assets/event_01.webp | CONNECTED |
| 2 | 돌아갈 곳 | assets/event_02.webp | CONNECTED |
| 3 | 무너진 광산 | assets/event_03.webp | CONNECTED |
| 4 | 수상한 지도 | assets/event_04.webp | CONNECTED |
| 5 | 까마귀의 거래 | assets/event_05.webp | CONNECTED |
| 6 | 부서진 대장간 | assets/event_06.webp | CONNECTED |
| 7 | 달빛 우물 | assets/event_07.webp | CONNECTED |
| 8 | 이름 없는 묘지 | assets/event_08.webp | CONNECTED |
| 9 | 운명의 탁자 | assets/event_09.webp | CONNECTED |
| 10 | 도망친 견습생 | assets/event_10.webp | CONNECTED |
| 11 | 잠든 용의 둥지 | assets/event_11.webp | CONNECTED |
| 12 | 유리 다리 | assets/event_12.webp | CONNECTED |
| 13 | 얼어붙은 시간 | assets/event_13.webp | CONNECTED |
| 14 | 별의 낙하 | assets/event_14.webp | CONNECTED |
| 15 | 마지막 장사 | assets/event_15.webp | CONNECTED |
| 16 | 숲의 연회 | assets/event_16.webp | CONNECTED |
| 17 | 닫히는 균열 | assets/event_17.webp | CONNECTED |

## npcs

| ID | Name | Path | Status |
|---|---|---|---|
| alice | alice | null | FALLBACK |
| queen | queen | null | FALLBACK |
| creature | creature | null | FALLBACK |
| victor | victor | null | FALLBACK |
| ahab | ahab | null | FALLBACK |
| quixote | quixote | null | FALLBACK |

## story

| ID | Name | Path | Status |
|---|---|---|---|
| alice | alice | assets/story_alice.webp | CONNECTED |
| adam | adam | assets/story_adam.webp | CONNECTED |
| ahab | ahab | assets/story_ahab.webp | CONNECTED |
| creature | creature | assets/story_adam.webp | CONNECTED |
| queen | queen | null | FALLBACK |
| quixote | quixote | null | FALLBACK |
| victor | victor | assets/story_adam.webp | CONNECTED |

## misc

| ID | Name | Path | Status |
|---|---|---|---|
| camp | camp | assets/camp-card.webp | CONNECTED |
| banner | banner | assets/forest-banner.webp | CONNECTED |

## gear

| ID | Name | Path | Status |
|---|---|---|---|
| weapon | weapon | assets/gear_weapon.svg | CONNECTED |
| armor | armor | assets/gear_armor.svg | CONNECTED |
| charm | charm | assets/gear_charm.svg | CONNECTED |

## gearTemplates

| ID | Name | Path | Status |
|---|---|---|---|
| w0 | 쇠 장검 | null | FALLBACK |
| w1 | 사냥꾼의 단검 | null | FALLBACK |
| w2 | 참나무 지팡이 | null | FALLBACK |
| w3 | 수호자의 창 | null | FALLBACK |
| w4 | 톱날 검 | null | FALLBACK |
| w5 | 쌍날 도끼 | null | FALLBACK |
| w6 | 은빛 레이피어 | null | FALLBACK |
| w7 | 가시 채찍 | null | FALLBACK |
| w8 | 번개 지팡이 | null | FALLBACK |
| w9 | 서리 대검 | null | FALLBACK |
| w10 | 흑요석 낫 | null | FALLBACK |
| w11 | 룬 장검 | null | FALLBACK |
| w12 | 사막의 곡도 | null | FALLBACK |
| w13 | 달빛 활 | null | FALLBACK |
| w14 | 금서의 마도서 | null | FALLBACK |
| w15 | 별철 해머 | null | FALLBACK |
| w16 | 황혼의 서약 | null | FALLBACK |
| w17 | 밤을 찢는 송곳니 | null | FALLBACK |
| w18 | 태양의 잿가루 | null | FALLBACK |
| w19 | 거짓말쟁이의 주사위 | null | FALLBACK |
| w20 | 시간을 베는 검 | null | FALLBACK |
| w21 | 왕의 마지막 명령 | null | FALLBACK |
| w22 | 공허의 심판 | null | FALLBACK |
| w23 | 첫 불씨 | null | FALLBACK |
| a0 | 가죽 외투 | null | FALLBACK |
| a1 | 쇠사슬 갑옷 | null | FALLBACK |
| a2 | 사냥꾼의 망토 | null | FALLBACK |
| a3 | 수도사의 로브 | null | FALLBACK |
| a4 | 은빛 흉갑 | null | FALLBACK |
| a5 | 늪지의 가죽옷 | null | FALLBACK |
| a6 | 그림자 외투 | null | FALLBACK |
| a7 | 룬 갑옷 | null | FALLBACK |
| a8 | 사막의 수의 | null | FALLBACK |
| a9 | 달의 예복 | null | FALLBACK |
| a10 | 별철 판금 | null | FALLBACK |
| a11 | 새벽의 날개 | null | FALLBACK |
| t0 | 낡은 부적 | null | FALLBACK |
| t1 | 사냥꾼의 이빨 | null | FALLBACK |
| t2 | 푸른 유리 | null | FALLBACK |
| t3 | 구리 회중시계 | null | FALLBACK |
| t4 | 은빛 묵주 | null | FALLBACK |
| t5 | 마녀의 반지 | null | FALLBACK |
| t6 | 피의 보석 | null | FALLBACK |
| t7 | 행운의 동전 | null | FALLBACK |
| t8 | 달의 조각 | null | FALLBACK |
| t9 | 별의 나침반 | null | FALLBACK |
| t10 | 멈춘 시계 | null | FALLBACK |
| t11 | 잃어버린 왕관 | null | FALLBACK |
| lit_sword_0 | 물먹은 갑판검 | null | FALLBACK |
| lit_sword_1 | 토끼굴의 녹슨 칼 | null | FALLBACK |
| lit_sword_2 | 종이 병사의 철편검 | null | FALLBACK |
| lit_sword_3 | 봉합사의 절개도 | null | FALLBACK |
| lit_sword_4 | 풍차 마을의 연습검 | null | FALLBACK |
| lit_sword_5 | 선실의 손잡이 짧은 칼 | null | FALLBACK |
| lit_sword_6 | 법정 경비의 직검 | null | FALLBACK |
| lit_sword_7 | 안개 여관의 낡은 도 | null | FALLBACK |
| lit_sword_8 | 유리공의 무딘 절단검 | null | FALLBACK |
| lit_sword_9 | 묘지기의 뼈자루 칼 | null | FALLBACK |
| lit_sword_10 | 모자 가게의 재단검 | null | FALLBACK |
| lit_sword_11 | 검댕 묻은 작업도 | null | FALLBACK |
| lit_sword_12 | 염분에 닳은 사브르 | null | FALLBACK |
| lit_sword_13 | 마차 호위의 장도 | null | FALLBACK |
| lit_sword_14 | 구빈원의 지급검 | null | FALLBACK |
| lit_sword_15 | 무너진 성벽의 군도 | null | FALLBACK |
| lit_sword_16 | 강변 나룻배의 곡검 | null | FALLBACK |
| lit_sword_17 | 헌책방의 종이칼 | null | FALLBACK |
| lit_sword_18 | 길 잃은 종자의 검 | null | FALLBACK |
| lit_sword_19 | 폐실험실의 톱날도 | null | FALLBACK |
| lit_sword_20 | 피쿼드의 파도갈이 | null | FALLBACK |
| lit_sword_21 | 앨리스의 문틈검 | null | FALLBACK |
| lit_sword_22 | 산초의 귀환도 | null | FALLBACK |
| lit_sword_23 | 피조물의 이름칼 | null | FALLBACK |
| lit_sword_24 | 하트 병사의 반역검 | null | FALLBACK |
| lit_sword_25 | 증기 봉합의 절단검 | null | FALLBACK |
| lit_sword_26 | 거울의 배면도 | null | FALLBACK |
| lit_sword_27 | 회중시계의 초침검 | null | FALLBACK |
| lit_sword_28 | 백경 뼈의 양날검 | null | FALLBACK |
| lit_sword_29 | 야간 우편의 암검 | null | FALLBACK |
| lit_sword_30 | 잊힌 법전의 집행도 | null | FALLBACK |
| lit_sword_31 | 황동 정맥의 장검 | null | FALLBACK |
| lit_sword_32 | 재판을 거부한 검 | null | FALLBACK |
| lit_sword_33 | 붉은 약병의 세검 | null | FALLBACK |
| lit_sword_34 | 등대의 그림자검 | null | FALLBACK |
| lit_sword_35 | 에이해브의 맹세도 | null | FALLBACK |
| lit_sword_36 | 돈키호테의 없는 거인 | null | FALLBACK |
| lit_sword_37 | 창조주의 후회 | null | FALLBACK |
| lit_sword_38 | 피조물의 첫 이름 | null | FALLBACK |
| lit_sword_39 | 하트 여왕의 공소검 | null | FALLBACK |
| lit_sword_40 | 흰 토끼의 지각검 | null | FALLBACK |
| lit_sword_41 | 지킬의 절제와 하이드 | null | FALLBACK |
| lit_sword_42 | 성채를 떠난 백기사 | null | FALLBACK |
| lit_sword_43 | 백지 연맹의 제본검 | null | FALLBACK |
| lit_sword_44 | 대홍수의 책갈피 | null | FALLBACK |
| lit_sword_45 | 백경의 마지막 수평선 | null | FALLBACK |
| lit_sword_46 | 라만차의 부서지지 않는 꿈 | null | FALLBACK |
| lit_sword_47 | 프로메테우스의 봉합선 | null | FALLBACK |
| lit_sword_48 | 하트 없는 왕관 | null | FALLBACK |
| lit_sword_49 | 첫 문장을 베는 자 | null | FALLBACK |
| set_weapon_0 | 토끼굴의 창 | null | FALLBACK |
| set_weapon_1 | 하트 법정의 창 | null | FALLBACK |
| set_weapon_2 | 흰 토끼의 시계의 창 | null | FALLBACK |
| set_weapon_3 | 거울 나라의 창 | null | FALLBACK |
| set_weapon_4 | 피쿼드의 항해의 창 | null | FALLBACK |
| set_weapon_5 | 백경의 상흔의 창 | null | FALLBACK |
| set_weapon_6 | 라만차의 꿈의 창 | null | FALLBACK |
| set_weapon_7 | 산초의 귀환길의 창 | null | FALLBACK |
| set_weapon_8 | 봉합 실험실의 창 | null | FALLBACK |
| set_weapon_9 | 피조물의 이름의 창 | null | FALLBACK |
| set_weapon_10 | 노틸러스의 심해의 창 | null | FALLBACK |
| set_weapon_11 | 오즈의 녹색 도시의 창 | null | FALLBACK |
| set_weapon_12 | 셜우드의 숲의 창 | null | FALLBACK |
| set_weapon_13 | 노트르담의 종의 창 | null | FALLBACK |
| set_weapon_14 | 몽테크리스토의 장부의 창 | null | FALLBACK |
| set_weapon_15 | 시간 기계의 잔광의 창 | null | FALLBACK |
| set_weapon_16 | 드라큘라의 새벽의 창 | null | FALLBACK |
| set_weapon_17 | 천일야화의 등불의 창 | null | FALLBACK |
| set_weapon_18 | 성냥팔이의 불씨의 창 | null | FALLBACK |
| set_weapon_19 | 파우스트의 서명의 창 | null | FALLBACK |
| set_weapon_20 | 토끼굴의 작살 | null | FALLBACK |
| set_weapon_21 | 하트 법정의 작살 | null | FALLBACK |
| set_weapon_22 | 흰 토끼의 시계의 작살 | null | FALLBACK |
| set_weapon_23 | 거울 나라의 작살 | null | FALLBACK |
| set_weapon_24 | 피쿼드의 항해의 작살 | null | FALLBACK |
| set_weapon_25 | 백경의 상흔의 작살 | null | FALLBACK |
| set_weapon_26 | 라만차의 꿈의 작살 | null | FALLBACK |
| set_weapon_27 | 산초의 귀환길의 작살 | null | FALLBACK |
| set_weapon_28 | 봉합 실험실의 작살 | null | FALLBACK |
| set_weapon_29 | 피조물의 이름의 작살 | null | FALLBACK |
| set_weapon_30 | 노틸러스의 심해의 작살 | null | FALLBACK |
| set_weapon_31 | 오즈의 녹색 도시의 작살 | null | FALLBACK |
| set_weapon_32 | 셜우드의 숲의 작살 | null | FALLBACK |
| set_weapon_33 | 노트르담의 종의 작살 | null | FALLBACK |
| set_weapon_34 | 몽테크리스토의 장부의 작살 | null | FALLBACK |
| set_weapon_35 | 시간 기계의 잔광의 작살 | null | FALLBACK |
| set_weapon_36 | 드라큘라의 새벽의 작살 | null | FALLBACK |
| set_weapon_37 | 천일야화의 등불의 작살 | null | FALLBACK |
| set_weapon_38 | 성냥팔이의 불씨의 작살 | null | FALLBACK |
| set_weapon_39 | 파우스트의 서명의 작살 | null | FALLBACK |
| set_weapon_40 | 토끼굴의 활 | null | FALLBACK |
| set_weapon_41 | 하트 법정의 활 | null | FALLBACK |
| set_weapon_42 | 흰 토끼의 시계의 활 | null | FALLBACK |
| set_weapon_43 | 거울 나라의 활 | null | FALLBACK |
| set_weapon_44 | 피쿼드의 항해의 활 | null | FALLBACK |
| set_weapon_45 | 백경의 상흔의 활 | null | FALLBACK |
| set_weapon_46 | 라만차의 꿈의 활 | null | FALLBACK |
| set_weapon_47 | 산초의 귀환길의 활 | null | FALLBACK |
| set_weapon_48 | 봉합 실험실의 활 | null | FALLBACK |
| set_weapon_49 | 피조물의 이름의 활 | null | FALLBACK |
| set_weapon_50 | 노틸러스의 심해의 활 | null | FALLBACK |
| set_weapon_51 | 오즈의 녹색 도시의 활 | null | FALLBACK |
| set_weapon_52 | 셜우드의 숲의 활 | null | FALLBACK |
| set_weapon_53 | 노트르담의 종의 활 | null | FALLBACK |
| set_weapon_54 | 몽테크리스토의 장부의 활 | null | FALLBACK |
| set_weapon_55 | 시간 기계의 잔광의 활 | null | FALLBACK |
| set_weapon_56 | 드라큘라의 새벽의 활 | null | FALLBACK |
| set_weapon_57 | 천일야화의 등불의 활 | null | FALLBACK |
| set_weapon_58 | 성냥팔이의 불씨의 활 | null | FALLBACK |
| set_weapon_59 | 파우스트의 서명의 활 | null | FALLBACK |
| set_weapon_60 | 토끼굴의 쇠뇌 | null | FALLBACK |
| set_weapon_61 | 하트 법정의 쇠뇌 | null | FALLBACK |
| set_weapon_62 | 흰 토끼의 시계의 쇠뇌 | null | FALLBACK |
| set_weapon_63 | 거울 나라의 쇠뇌 | null | FALLBACK |
| set_weapon_64 | 피쿼드의 항해의 쇠뇌 | null | FALLBACK |
| set_weapon_65 | 백경의 상흔의 쇠뇌 | null | FALLBACK |
| set_weapon_66 | 라만차의 꿈의 쇠뇌 | null | FALLBACK |
| set_weapon_67 | 산초의 귀환길의 쇠뇌 | null | FALLBACK |
| set_weapon_68 | 봉합 실험실의 쇠뇌 | null | FALLBACK |
| set_weapon_69 | 피조물의 이름의 쇠뇌 | null | FALLBACK |
| set_weapon_70 | 노틸러스의 심해의 쇠뇌 | null | FALLBACK |
| set_weapon_71 | 오즈의 녹색 도시의 쇠뇌 | null | FALLBACK |
| set_weapon_72 | 셜우드의 숲의 쇠뇌 | null | FALLBACK |
| set_weapon_73 | 노트르담의 종의 쇠뇌 | null | FALLBACK |
| set_weapon_74 | 몽테크리스토의 장부의 쇠뇌 | null | FALLBACK |
| set_weapon_75 | 시간 기계의 잔광의 쇠뇌 | null | FALLBACK |
| set_weapon_76 | 드라큘라의 새벽의 쇠뇌 | null | FALLBACK |
| set_weapon_77 | 천일야화의 등불의 쇠뇌 | null | FALLBACK |
| set_weapon_78 | 성냥팔이의 불씨의 쇠뇌 | null | FALLBACK |
| set_weapon_79 | 파우스트의 서명의 쇠뇌 | null | FALLBACK |
| set_weapon_80 | 토끼굴의 도끼 | null | FALLBACK |
| set_weapon_81 | 하트 법정의 도끼 | null | FALLBACK |
| set_weapon_82 | 흰 토끼의 시계의 도끼 | null | FALLBACK |
| set_weapon_83 | 거울 나라의 도끼 | null | FALLBACK |
| set_weapon_84 | 피쿼드의 항해의 도끼 | null | FALLBACK |
| set_weapon_85 | 백경의 상흔의 도끼 | null | FALLBACK |
| set_weapon_86 | 라만차의 꿈의 도끼 | null | FALLBACK |
| set_weapon_87 | 산초의 귀환길의 도끼 | null | FALLBACK |
| set_weapon_88 | 봉합 실험실의 도끼 | null | FALLBACK |
| set_weapon_89 | 피조물의 이름의 도끼 | null | FALLBACK |
| set_weapon_90 | 노틸러스의 심해의 도끼 | null | FALLBACK |
| set_weapon_91 | 오즈의 녹색 도시의 도끼 | null | FALLBACK |
| set_weapon_92 | 셜우드의 숲의 도끼 | null | FALLBACK |
| set_weapon_93 | 노트르담의 종의 도끼 | null | FALLBACK |
| set_weapon_94 | 몽테크리스토의 장부의 도끼 | null | FALLBACK |
| set_weapon_95 | 시간 기계의 잔광의 도끼 | null | FALLBACK |
| set_weapon_96 | 드라큘라의 새벽의 도끼 | null | FALLBACK |
| set_weapon_97 | 천일야화의 등불의 도끼 | null | FALLBACK |
| set_weapon_98 | 성냥팔이의 불씨의 도끼 | null | FALLBACK |
| set_weapon_99 | 파우스트의 서명의 도끼 | null | FALLBACK |
| set_weapon_100 | 토끼굴의 해머 | null | FALLBACK |
| set_weapon_101 | 하트 법정의 해머 | null | FALLBACK |
| set_weapon_102 | 흰 토끼의 시계의 해머 | null | FALLBACK |
| set_weapon_103 | 거울 나라의 해머 | null | FALLBACK |
| set_weapon_104 | 피쿼드의 항해의 해머 | null | FALLBACK |
| set_weapon_105 | 백경의 상흔의 해머 | null | FALLBACK |
| set_weapon_106 | 라만차의 꿈의 해머 | null | FALLBACK |
| set_weapon_107 | 산초의 귀환길의 해머 | null | FALLBACK |
| set_weapon_108 | 봉합 실험실의 해머 | null | FALLBACK |
| set_weapon_109 | 피조물의 이름의 해머 | null | FALLBACK |
| set_weapon_110 | 노틸러스의 심해의 해머 | null | FALLBACK |
| set_weapon_111 | 오즈의 녹색 도시의 해머 | null | FALLBACK |
| set_weapon_112 | 셜우드의 숲의 해머 | null | FALLBACK |
| set_weapon_113 | 노트르담의 종의 해머 | null | FALLBACK |
| set_weapon_114 | 몽테크리스토의 장부의 해머 | null | FALLBACK |
| set_weapon_115 | 시간 기계의 잔광의 해머 | null | FALLBACK |
| set_weapon_116 | 드라큘라의 새벽의 해머 | null | FALLBACK |
| set_weapon_117 | 천일야화의 등불의 해머 | null | FALLBACK |
| set_weapon_118 | 성냥팔이의 불씨의 해머 | null | FALLBACK |
| set_weapon_119 | 파우스트의 서명의 해머 | null | FALLBACK |
| set_weapon_120 | 토끼굴의 지팡이 | null | FALLBACK |
| set_weapon_121 | 하트 법정의 지팡이 | null | FALLBACK |
| set_weapon_122 | 흰 토끼의 시계의 지팡이 | null | FALLBACK |
| set_weapon_123 | 거울 나라의 지팡이 | null | FALLBACK |
| set_weapon_124 | 피쿼드의 항해의 지팡이 | null | FALLBACK |
| set_weapon_125 | 백경의 상흔의 지팡이 | null | FALLBACK |
| set_weapon_126 | 라만차의 꿈의 지팡이 | null | FALLBACK |
| set_weapon_127 | 산초의 귀환길의 지팡이 | null | FALLBACK |
| set_weapon_128 | 봉합 실험실의 지팡이 | null | FALLBACK |
| set_weapon_129 | 피조물의 이름의 지팡이 | null | FALLBACK |
| set_weapon_130 | 노틸러스의 심해의 지팡이 | null | FALLBACK |
| set_weapon_131 | 오즈의 녹색 도시의 지팡이 | null | FALLBACK |
| set_weapon_132 | 셜우드의 숲의 지팡이 | null | FALLBACK |
| set_weapon_133 | 노트르담의 종의 지팡이 | null | FALLBACK |
| set_weapon_134 | 몽테크리스토의 장부의 지팡이 | null | FALLBACK |
| set_weapon_135 | 시간 기계의 잔광의 지팡이 | null | FALLBACK |
| set_weapon_136 | 드라큘라의 새벽의 지팡이 | null | FALLBACK |
| set_weapon_137 | 천일야화의 등불의 지팡이 | null | FALLBACK |
| set_weapon_138 | 성냥팔이의 불씨의 지팡이 | null | FALLBACK |
| set_weapon_139 | 파우스트의 서명의 지팡이 | null | FALLBACK |
| set_weapon_140 | 토끼굴의 마도서 | null | FALLBACK |
| set_weapon_141 | 하트 법정의 마도서 | null | FALLBACK |
| set_weapon_142 | 흰 토끼의 시계의 마도서 | null | FALLBACK |
| set_weapon_143 | 거울 나라의 마도서 | null | FALLBACK |
| set_weapon_144 | 피쿼드의 항해의 마도서 | null | FALLBACK |
| set_weapon_145 | 백경의 상흔의 마도서 | null | FALLBACK |
| set_weapon_146 | 라만차의 꿈의 마도서 | null | FALLBACK |
| set_weapon_147 | 산초의 귀환길의 마도서 | null | FALLBACK |
| set_weapon_148 | 봉합 실험실의 마도서 | null | FALLBACK |
| set_weapon_149 | 피조물의 이름의 마도서 | null | FALLBACK |
| set_weapon_150 | 노틸러스의 심해의 마도서 | null | FALLBACK |
| set_weapon_151 | 오즈의 녹색 도시의 마도서 | null | FALLBACK |
| set_weapon_152 | 셜우드의 숲의 마도서 | null | FALLBACK |
| set_weapon_153 | 노트르담의 종의 마도서 | null | FALLBACK |
| set_weapon_154 | 몽테크리스토의 장부의 마도서 | null | FALLBACK |
| set_weapon_155 | 시간 기계의 잔광의 마도서 | null | FALLBACK |
| set_weapon_156 | 드라큘라의 새벽의 마도서 | null | FALLBACK |
| set_weapon_157 | 천일야화의 등불의 마도서 | null | FALLBACK |
| set_weapon_158 | 성냥팔이의 불씨의 마도서 | null | FALLBACK |
| set_weapon_159 | 파우스트의 서명의 마도서 | null | FALLBACK |
| set_weapon_160 | 토끼굴의 낫 | null | FALLBACK |
| set_weapon_161 | 하트 법정의 낫 | null | FALLBACK |
| set_weapon_162 | 흰 토끼의 시계의 낫 | null | FALLBACK |
| set_weapon_163 | 거울 나라의 낫 | null | FALLBACK |
| set_weapon_164 | 피쿼드의 항해의 낫 | null | FALLBACK |
| set_weapon_165 | 백경의 상흔의 낫 | null | FALLBACK |
| set_weapon_166 | 라만차의 꿈의 낫 | null | FALLBACK |
| set_weapon_167 | 산초의 귀환길의 낫 | null | FALLBACK |
| set_weapon_168 | 봉합 실험실의 낫 | null | FALLBACK |
| set_weapon_169 | 피조물의 이름의 낫 | null | FALLBACK |
| set_weapon_170 | 노틸러스의 심해의 낫 | null | FALLBACK |
| set_weapon_171 | 오즈의 녹색 도시의 낫 | null | FALLBACK |
| set_weapon_172 | 셜우드의 숲의 낫 | null | FALLBACK |
| set_weapon_173 | 노트르담의 종의 낫 | null | FALLBACK |
| set_weapon_174 | 몽테크리스토의 장부의 낫 | null | FALLBACK |
| set_weapon_175 | 시간 기계의 잔광의 낫 | null | FALLBACK |
| set_weapon_176 | 드라큘라의 새벽의 낫 | null | FALLBACK |
| set_weapon_177 | 천일야화의 등불의 낫 | null | FALLBACK |
| set_weapon_178 | 성냥팔이의 불씨의 낫 | null | FALLBACK |
| set_weapon_179 | 파우스트의 서명의 낫 | null | FALLBACK |
| set_weapon_180 | 토끼굴의 채찍 | null | FALLBACK |
| set_weapon_181 | 하트 법정의 채찍 | null | FALLBACK |
| set_weapon_182 | 흰 토끼의 시계의 채찍 | null | FALLBACK |
| set_weapon_183 | 거울 나라의 채찍 | null | FALLBACK |
| set_weapon_184 | 피쿼드의 항해의 채찍 | null | FALLBACK |
| set_weapon_185 | 백경의 상흔의 채찍 | null | FALLBACK |
| set_weapon_186 | 라만차의 꿈의 채찍 | null | FALLBACK |
| set_weapon_187 | 산초의 귀환길의 채찍 | null | FALLBACK |
| set_weapon_188 | 봉합 실험실의 채찍 | null | FALLBACK |
| set_weapon_189 | 피조물의 이름의 채찍 | null | FALLBACK |
| set_weapon_190 | 노틸러스의 심해의 채찍 | null | FALLBACK |
| set_weapon_191 | 오즈의 녹색 도시의 채찍 | null | FALLBACK |
| set_weapon_192 | 셜우드의 숲의 채찍 | null | FALLBACK |
| set_weapon_193 | 노트르담의 종의 채찍 | null | FALLBACK |
| set_weapon_194 | 몽테크리스토의 장부의 채찍 | null | FALLBACK |
| set_weapon_195 | 시간 기계의 잔광의 채찍 | null | FALLBACK |
| set_weapon_196 | 드라큘라의 새벽의 채찍 | null | FALLBACK |
| set_weapon_197 | 천일야화의 등불의 채찍 | null | FALLBACK |
| set_weapon_198 | 성냥팔이의 불씨의 채찍 | null | FALLBACK |
| set_weapon_199 | 파우스트의 서명의 채찍 | null | FALLBACK |
| set_weapon_200 | 토끼굴의 투창 | null | FALLBACK |
| set_weapon_201 | 하트 법정의 투창 | null | FALLBACK |
| set_weapon_202 | 흰 토끼의 시계의 투창 | null | FALLBACK |
| set_weapon_203 | 거울 나라의 투창 | null | FALLBACK |
| set_weapon_204 | 피쿼드의 항해의 투창 | null | FALLBACK |
| set_weapon_205 | 백경의 상흔의 투창 | null | FALLBACK |
| set_weapon_206 | 라만차의 꿈의 투창 | null | FALLBACK |
| set_weapon_207 | 산초의 귀환길의 투창 | null | FALLBACK |
| set_weapon_208 | 봉합 실험실의 투창 | null | FALLBACK |
| set_weapon_209 | 피조물의 이름의 투창 | null | FALLBACK |
| set_weapon_210 | 노틸러스의 심해의 투창 | null | FALLBACK |
| set_weapon_211 | 오즈의 녹색 도시의 투창 | null | FALLBACK |
| set_weapon_212 | 셜우드의 숲의 투창 | null | FALLBACK |
| set_weapon_213 | 노트르담의 종의 투창 | null | FALLBACK |
| set_weapon_214 | 몽테크리스토의 장부의 투창 | null | FALLBACK |
| set_weapon_215 | 시간 기계의 잔광의 투창 | null | FALLBACK |
| set_weapon_216 | 드라큘라의 새벽의 투창 | null | FALLBACK |
| set_weapon_217 | 천일야화의 등불의 투창 | null | FALLBACK |
| set_weapon_218 | 성냥팔이의 불씨의 투창 | null | FALLBACK |
| set_weapon_219 | 파우스트의 서명의 투창 | null | FALLBACK |
| set_weapon_220 | 토끼굴의 권갑 | null | FALLBACK |
| set_weapon_221 | 하트 법정의 권갑 | null | FALLBACK |
| set_weapon_222 | 흰 토끼의 시계의 권갑 | null | FALLBACK |
| set_weapon_223 | 거울 나라의 권갑 | null | FALLBACK |
| set_weapon_224 | 피쿼드의 항해의 권갑 | null | FALLBACK |
| set_weapon_225 | 백경의 상흔의 권갑 | null | FALLBACK |
| set_weapon_226 | 라만차의 꿈의 권갑 | null | FALLBACK |
| set_weapon_227 | 산초의 귀환길의 권갑 | null | FALLBACK |
| set_weapon_228 | 봉합 실험실의 권갑 | null | FALLBACK |
| set_weapon_229 | 피조물의 이름의 권갑 | null | FALLBACK |
| set_weapon_230 | 노틸러스의 심해의 권갑 | null | FALLBACK |
| set_weapon_231 | 오즈의 녹색 도시의 권갑 | null | FALLBACK |
| set_weapon_232 | 셜우드의 숲의 권갑 | null | FALLBACK |
| set_weapon_233 | 노트르담의 종의 권갑 | null | FALLBACK |
| set_weapon_234 | 몽테크리스토의 장부의 권갑 | null | FALLBACK |
| set_weapon_235 | 시간 기계의 잔광의 권갑 | null | FALLBACK |
| set_weapon_236 | 드라큘라의 새벽의 권갑 | null | FALLBACK |
| set_weapon_237 | 천일야화의 등불의 권갑 | null | FALLBACK |
| set_weapon_238 | 성냥팔이의 불씨의 권갑 | null | FALLBACK |
| set_weapon_239 | 파우스트의 서명의 권갑 | null | FALLBACK |
| set_weapon_240 | 토끼굴의 화승총 | null | FALLBACK |
| set_weapon_241 | 하트 법정의 화승총 | null | FALLBACK |
| set_weapon_242 | 흰 토끼의 시계의 화승총 | null | FALLBACK |
| set_weapon_243 | 거울 나라의 화승총 | null | FALLBACK |
| set_weapon_244 | 피쿼드의 항해의 화승총 | null | FALLBACK |
| set_weapon_245 | 백경의 상흔의 화승총 | null | FALLBACK |
| set_weapon_246 | 라만차의 꿈의 화승총 | null | FALLBACK |
| set_weapon_247 | 산초의 귀환길의 화승총 | null | FALLBACK |
| set_weapon_248 | 봉합 실험실의 화승총 | null | FALLBACK |
| set_weapon_249 | 피조물의 이름의 화승총 | null | FALLBACK |
| set_weapon_250 | 노틸러스의 심해의 화승총 | null | FALLBACK |
| set_weapon_251 | 오즈의 녹색 도시의 화승총 | null | FALLBACK |
| set_weapon_252 | 셜우드의 숲의 화승총 | null | FALLBACK |
| set_weapon_253 | 노트르담의 종의 화승총 | null | FALLBACK |
| set_weapon_254 | 몽테크리스토의 장부의 화승총 | null | FALLBACK |
| set_weapon_255 | 시간 기계의 잔광의 화승총 | null | FALLBACK |
| set_weapon_256 | 드라큘라의 새벽의 화승총 | null | FALLBACK |
| set_weapon_257 | 천일야화의 등불의 화승총 | null | FALLBACK |
| set_weapon_258 | 성냥팔이의 불씨의 화승총 | null | FALLBACK |
| set_weapon_259 | 파우스트의 서명의 화승총 | null | FALLBACK |
| set_weapon_260 | 토끼굴의 철퇴 | null | FALLBACK |
| set_weapon_261 | 하트 법정의 철퇴 | null | FALLBACK |
| set_weapon_262 | 흰 토끼의 시계의 철퇴 | null | FALLBACK |
| set_weapon_263 | 거울 나라의 철퇴 | null | FALLBACK |
| set_weapon_264 | 피쿼드의 항해의 철퇴 | null | FALLBACK |
| set_weapon_265 | 백경의 상흔의 철퇴 | null | FALLBACK |
| set_weapon_266 | 라만차의 꿈의 철퇴 | null | FALLBACK |
| set_weapon_267 | 산초의 귀환길의 철퇴 | null | FALLBACK |
| set_weapon_268 | 봉합 실험실의 철퇴 | null | FALLBACK |
| set_weapon_269 | 피조물의 이름의 철퇴 | null | FALLBACK |
| set_weapon_270 | 노틸러스의 심해의 철퇴 | null | FALLBACK |
| set_weapon_271 | 오즈의 녹색 도시의 철퇴 | null | FALLBACK |
| set_weapon_272 | 셜우드의 숲의 철퇴 | null | FALLBACK |
| set_weapon_273 | 노트르담의 종의 철퇴 | null | FALLBACK |
| set_weapon_274 | 몽테크리스토의 장부의 철퇴 | null | FALLBACK |
| set_weapon_275 | 시간 기계의 잔광의 철퇴 | null | FALLBACK |
| set_weapon_276 | 드라큘라의 새벽의 철퇴 | null | FALLBACK |
| set_weapon_277 | 천일야화의 등불의 철퇴 | null | FALLBACK |
| set_weapon_278 | 성냥팔이의 불씨의 철퇴 | null | FALLBACK |
| set_weapon_279 | 파우스트의 서명의 철퇴 | null | FALLBACK |
| set_weapon_280 | 토끼굴의 지휘봉 | null | FALLBACK |
| set_weapon_281 | 하트 법정의 지휘봉 | null | FALLBACK |
| set_weapon_282 | 흰 토끼의 시계의 지휘봉 | null | FALLBACK |
| set_weapon_283 | 거울 나라의 지휘봉 | null | FALLBACK |
| set_weapon_284 | 피쿼드의 항해의 지휘봉 | null | FALLBACK |
| set_weapon_285 | 백경의 상흔의 지휘봉 | null | FALLBACK |
| set_weapon_286 | 라만차의 꿈의 지휘봉 | null | FALLBACK |
| set_weapon_287 | 산초의 귀환길의 지휘봉 | null | FALLBACK |
| set_weapon_288 | 봉합 실험실의 지휘봉 | null | FALLBACK |
| set_weapon_289 | 피조물의 이름의 지휘봉 | null | FALLBACK |
| set_weapon_290 | 노틸러스의 심해의 지휘봉 | null | FALLBACK |
| set_weapon_291 | 오즈의 녹색 도시의 지휘봉 | null | FALLBACK |
| set_weapon_292 | 셜우드의 숲의 지휘봉 | null | FALLBACK |
| set_weapon_293 | 노트르담의 종의 지휘봉 | null | FALLBACK |
| set_weapon_294 | 몽테크리스토의 장부의 지휘봉 | null | FALLBACK |
| set_weapon_295 | 시간 기계의 잔광의 지휘봉 | null | FALLBACK |
| set_weapon_296 | 드라큘라의 새벽의 지휘봉 | null | FALLBACK |
| set_weapon_297 | 천일야화의 등불의 지휘봉 | null | FALLBACK |
| set_weapon_298 | 성냥팔이의 불씨의 지휘봉 | null | FALLBACK |
| set_weapon_299 | 파우스트의 서명의 지휘봉 | null | FALLBACK |
| set_weapon_300 | 토끼굴의 차크람 | null | FALLBACK |
| set_weapon_301 | 하트 법정의 차크람 | null | FALLBACK |
| set_weapon_302 | 흰 토끼의 시계의 차크람 | null | FALLBACK |
| set_weapon_303 | 거울 나라의 차크람 | null | FALLBACK |
| set_weapon_304 | 피쿼드의 항해의 차크람 | null | FALLBACK |
| set_weapon_305 | 백경의 상흔의 차크람 | null | FALLBACK |
| set_weapon_306 | 라만차의 꿈의 차크람 | null | FALLBACK |
| set_weapon_307 | 산초의 귀환길의 차크람 | null | FALLBACK |
| set_weapon_308 | 봉합 실험실의 차크람 | null | FALLBACK |
| set_weapon_309 | 피조물의 이름의 차크람 | null | FALLBACK |
| set_weapon_310 | 노틸러스의 심해의 차크람 | null | FALLBACK |
| set_weapon_311 | 오즈의 녹색 도시의 차크람 | null | FALLBACK |
| set_weapon_312 | 셜우드의 숲의 차크람 | null | FALLBACK |
| set_weapon_313 | 노트르담의 종의 차크람 | null | FALLBACK |
| set_weapon_314 | 몽테크리스토의 장부의 차크람 | null | FALLBACK |
| set_weapon_315 | 시간 기계의 잔광의 차크람 | null | FALLBACK |
| set_weapon_316 | 드라큘라의 새벽의 차크람 | null | FALLBACK |
| set_weapon_317 | 천일야화의 등불의 차크람 | null | FALLBACK |
| set_weapon_318 | 성냥팔이의 불씨의 차크람 | null | FALLBACK |
| set_weapon_319 | 파우스트의 서명의 차크람 | null | FALLBACK |
| set_weapon_320 | 토끼굴의 항해유산 해도 | null | FALLBACK |
| set_weapon_321 | 하트 법정의 항해유산 신호창 | null | FALLBACK |
| set_weapon_322 | 흰 토끼의 시계의 항해유산 선상종 | null | FALLBACK |
| set_weapon_323 | 거울 나라의 항해유산 돛대활 | null | FALLBACK |
| set_weapon_324 | 피쿼드의 항해의 항해유산 비상닻 | null | FALLBACK |
| set_weapon_325 | 백경의 상흔의 항해유산 귀환검 | null | FALLBACK |
| set_armor_0 | 토끼굴의 흉갑 | null | FALLBACK |
| set_armor_1 | 하트 법정의 흉갑 | null | FALLBACK |
| set_armor_2 | 흰 토끼의 시계의 흉갑 | null | FALLBACK |
| set_armor_3 | 거울 나라의 흉갑 | null | FALLBACK |
| set_armor_4 | 피쿼드의 항해의 흉갑 | null | FALLBACK |
| set_armor_5 | 백경의 상흔의 흉갑 | null | FALLBACK |
| set_armor_6 | 라만차의 꿈의 흉갑 | null | FALLBACK |
| set_armor_7 | 산초의 귀환길의 흉갑 | null | FALLBACK |
| set_armor_8 | 봉합 실험실의 흉갑 | null | FALLBACK |
| set_armor_9 | 피조물의 이름의 흉갑 | null | FALLBACK |
| set_armor_10 | 노틸러스의 심해의 흉갑 | null | FALLBACK |
| set_armor_11 | 오즈의 녹색 도시의 흉갑 | null | FALLBACK |
| set_armor_12 | 셜우드의 숲의 흉갑 | null | FALLBACK |
| set_armor_13 | 노트르담의 종의 흉갑 | null | FALLBACK |
| set_armor_14 | 몽테크리스토의 장부의 흉갑 | null | FALLBACK |
| set_armor_15 | 시간 기계의 잔광의 흉갑 | null | FALLBACK |
| set_armor_16 | 드라큘라의 새벽의 흉갑 | null | FALLBACK |
| set_armor_17 | 천일야화의 등불의 흉갑 | null | FALLBACK |
| set_armor_18 | 성냥팔이의 불씨의 흉갑 | null | FALLBACK |
| set_armor_19 | 파우스트의 서명의 흉갑 | null | FALLBACK |
| set_armor_20 | 토끼굴의 로브 | null | FALLBACK |
| set_armor_21 | 하트 법정의 로브 | null | FALLBACK |
| set_armor_22 | 흰 토끼의 시계의 로브 | null | FALLBACK |
| set_armor_23 | 거울 나라의 로브 | null | FALLBACK |
| set_armor_24 | 피쿼드의 항해의 로브 | null | FALLBACK |
| set_armor_25 | 백경의 상흔의 로브 | null | FALLBACK |
| set_armor_26 | 라만차의 꿈의 로브 | null | FALLBACK |
| set_armor_27 | 산초의 귀환길의 로브 | null | FALLBACK |
| set_armor_28 | 봉합 실험실의 로브 | null | FALLBACK |
| set_armor_29 | 피조물의 이름의 로브 | null | FALLBACK |
| set_armor_30 | 노틸러스의 심해의 로브 | null | FALLBACK |
| set_armor_31 | 오즈의 녹색 도시의 로브 | null | FALLBACK |
| set_armor_32 | 셜우드의 숲의 로브 | null | FALLBACK |
| set_armor_33 | 노트르담의 종의 로브 | null | FALLBACK |
| set_armor_34 | 몽테크리스토의 장부의 로브 | null | FALLBACK |
| set_armor_35 | 시간 기계의 잔광의 로브 | null | FALLBACK |
| set_armor_36 | 드라큘라의 새벽의 로브 | null | FALLBACK |
| set_armor_37 | 천일야화의 등불의 로브 | null | FALLBACK |
| set_armor_38 | 성냥팔이의 불씨의 로브 | null | FALLBACK |
| set_armor_39 | 파우스트의 서명의 로브 | null | FALLBACK |
| set_armor_40 | 토끼굴의 외투 | null | FALLBACK |
| set_armor_41 | 하트 법정의 외투 | null | FALLBACK |
| set_armor_42 | 흰 토끼의 시계의 외투 | null | FALLBACK |
| set_armor_43 | 거울 나라의 외투 | null | FALLBACK |
| set_armor_44 | 피쿼드의 항해의 외투 | null | FALLBACK |
| set_armor_45 | 백경의 상흔의 외투 | null | FALLBACK |
| set_armor_46 | 라만차의 꿈의 외투 | null | FALLBACK |
| set_armor_47 | 산초의 귀환길의 외투 | null | FALLBACK |
| set_armor_48 | 봉합 실험실의 외투 | null | FALLBACK |
| set_armor_49 | 피조물의 이름의 외투 | null | FALLBACK |
| set_armor_50 | 노틸러스의 심해의 외투 | null | FALLBACK |
| set_armor_51 | 오즈의 녹색 도시의 외투 | null | FALLBACK |
| set_armor_52 | 셜우드의 숲의 외투 | null | FALLBACK |
| set_armor_53 | 노트르담의 종의 외투 | null | FALLBACK |
| set_armor_54 | 몽테크리스토의 장부의 외투 | null | FALLBACK |
| set_armor_55 | 시간 기계의 잔광의 외투 | null | FALLBACK |
| set_armor_56 | 드라큘라의 새벽의 외투 | null | FALLBACK |
| set_armor_57 | 천일야화의 등불의 외투 | null | FALLBACK |
| set_armor_58 | 성냥팔이의 불씨의 외투 | null | FALLBACK |
| set_armor_59 | 파우스트의 서명의 외투 | null | FALLBACK |
| set_armor_60 | 토끼굴의 사슬옷 | null | FALLBACK |
| set_armor_61 | 하트 법정의 사슬옷 | null | FALLBACK |
| set_armor_62 | 흰 토끼의 시계의 사슬옷 | null | FALLBACK |
| set_armor_63 | 거울 나라의 사슬옷 | null | FALLBACK |
| set_armor_64 | 피쿼드의 항해의 사슬옷 | null | FALLBACK |
| set_armor_65 | 백경의 상흔의 사슬옷 | null | FALLBACK |
| set_armor_66 | 라만차의 꿈의 사슬옷 | null | FALLBACK |
| set_armor_67 | 산초의 귀환길의 사슬옷 | null | FALLBACK |
| set_armor_68 | 봉합 실험실의 사슬옷 | null | FALLBACK |
| set_armor_69 | 피조물의 이름의 사슬옷 | null | FALLBACK |
| set_armor_70 | 노틸러스의 심해의 사슬옷 | null | FALLBACK |
| set_armor_71 | 오즈의 녹색 도시의 사슬옷 | null | FALLBACK |
| set_armor_72 | 셜우드의 숲의 사슬옷 | null | FALLBACK |
| set_armor_73 | 노트르담의 종의 사슬옷 | null | FALLBACK |
| set_armor_74 | 몽테크리스토의 장부의 사슬옷 | null | FALLBACK |
| set_armor_75 | 시간 기계의 잔광의 사슬옷 | null | FALLBACK |
| set_armor_76 | 드라큘라의 새벽의 사슬옷 | null | FALLBACK |
| set_armor_77 | 천일야화의 등불의 사슬옷 | null | FALLBACK |
| set_armor_78 | 성냥팔이의 불씨의 사슬옷 | null | FALLBACK |
| set_armor_79 | 파우스트의 서명의 사슬옷 | null | FALLBACK |
| set_armor_80 | 토끼굴의 망토 | null | FALLBACK |
| set_armor_81 | 하트 법정의 망토 | null | FALLBACK |
| set_armor_82 | 흰 토끼의 시계의 망토 | null | FALLBACK |
| set_armor_83 | 거울 나라의 망토 | null | FALLBACK |
| set_armor_84 | 피쿼드의 항해의 망토 | null | FALLBACK |
| set_armor_85 | 백경의 상흔의 망토 | null | FALLBACK |
| set_armor_86 | 라만차의 꿈의 망토 | null | FALLBACK |
| set_armor_87 | 산초의 귀환길의 망토 | null | FALLBACK |
| set_armor_88 | 봉합 실험실의 망토 | null | FALLBACK |
| set_armor_89 | 피조물의 이름의 망토 | null | FALLBACK |
| set_armor_90 | 노틸러스의 심해의 망토 | null | FALLBACK |
| set_armor_91 | 오즈의 녹색 도시의 망토 | null | FALLBACK |
| set_armor_92 | 셜우드의 숲의 망토 | null | FALLBACK |
| set_armor_93 | 노트르담의 종의 망토 | null | FALLBACK |
| set_armor_94 | 몽테크리스토의 장부의 망토 | null | FALLBACK |
| set_armor_95 | 시간 기계의 잔광의 망토 | null | FALLBACK |
| set_armor_96 | 드라큘라의 새벽의 망토 | null | FALLBACK |
| set_armor_97 | 천일야화의 등불의 망토 | null | FALLBACK |
| set_armor_98 | 성냥팔이의 불씨의 망토 | null | FALLBACK |
| set_armor_99 | 파우스트의 서명의 망토 | null | FALLBACK |
| set_armor_100 | 토끼굴의 판금 | null | FALLBACK |
| set_armor_101 | 하트 법정의 판금 | null | FALLBACK |
| set_armor_102 | 흰 토끼의 시계의 판금 | null | FALLBACK |
| set_armor_103 | 거울 나라의 판금 | null | FALLBACK |
| set_armor_104 | 피쿼드의 항해의 판금 | null | FALLBACK |
| set_armor_105 | 백경의 상흔의 판금 | null | FALLBACK |
| set_armor_106 | 라만차의 꿈의 판금 | null | FALLBACK |
| set_armor_107 | 산초의 귀환길의 판금 | null | FALLBACK |
| set_armor_108 | 봉합 실험실의 판금 | null | FALLBACK |
| set_armor_109 | 피조물의 이름의 판금 | null | FALLBACK |
| set_armor_110 | 노틸러스의 심해의 판금 | null | FALLBACK |
| set_armor_111 | 오즈의 녹색 도시의 판금 | null | FALLBACK |
| set_armor_112 | 셜우드의 숲의 판금 | null | FALLBACK |
| set_armor_113 | 노트르담의 종의 판금 | null | FALLBACK |
| set_armor_114 | 몽테크리스토의 장부의 판금 | null | FALLBACK |
| set_armor_115 | 시간 기계의 잔광의 판금 | null | FALLBACK |
| set_armor_116 | 드라큘라의 새벽의 판금 | null | FALLBACK |
| set_armor_117 | 천일야화의 등불의 판금 | null | FALLBACK |
| set_armor_118 | 성냥팔이의 불씨의 판금 | null | FALLBACK |
| set_armor_119 | 파우스트의 서명의 판금 | null | FALLBACK |
| set_armor_120 | 토끼굴의 전투복 | null | FALLBACK |
| set_armor_121 | 하트 법정의 전투복 | null | FALLBACK |
| set_armor_122 | 흰 토끼의 시계의 전투복 | null | FALLBACK |
| set_armor_123 | 거울 나라의 전투복 | null | FALLBACK |
| set_armor_124 | 피쿼드의 항해의 전투복 | null | FALLBACK |
| set_armor_125 | 백경의 상흔의 전투복 | null | FALLBACK |
| set_armor_126 | 라만차의 꿈의 전투복 | null | FALLBACK |
| set_armor_127 | 산초의 귀환길의 전투복 | null | FALLBACK |
| set_armor_128 | 봉합 실험실의 전투복 | null | FALLBACK |
| set_armor_129 | 피조물의 이름의 전투복 | null | FALLBACK |
| set_armor_130 | 노틸러스의 심해의 전투복 | null | FALLBACK |
| set_armor_131 | 오즈의 녹색 도시의 전투복 | null | FALLBACK |
| set_armor_132 | 셜우드의 숲의 전투복 | null | FALLBACK |
| set_armor_133 | 노트르담의 종의 전투복 | null | FALLBACK |
| set_armor_134 | 몽테크리스토의 장부의 전투복 | null | FALLBACK |
| set_armor_135 | 시간 기계의 잔광의 전투복 | null | FALLBACK |
| set_armor_136 | 드라큘라의 새벽의 전투복 | null | FALLBACK |
| set_armor_137 | 천일야화의 등불의 전투복 | null | FALLBACK |
| set_armor_138 | 성냥팔이의 불씨의 전투복 | null | FALLBACK |
| set_armor_139 | 파우스트의 서명의 전투복 | null | FALLBACK |
| set_armor_140 | 토끼굴의 잠수복 | null | FALLBACK |
| set_armor_141 | 하트 법정의 잠수복 | null | FALLBACK |
| set_armor_142 | 흰 토끼의 시계의 잠수복 | null | FALLBACK |
| set_armor_143 | 거울 나라의 잠수복 | null | FALLBACK |
| set_armor_144 | 피쿼드의 항해의 잠수복 | null | FALLBACK |
| set_armor_145 | 백경의 상흔의 잠수복 | null | FALLBACK |
| set_armor_146 | 라만차의 꿈의 잠수복 | null | FALLBACK |
| set_armor_147 | 산초의 귀환길의 잠수복 | null | FALLBACK |
| set_armor_148 | 봉합 실험실의 잠수복 | null | FALLBACK |
| set_armor_149 | 피조물의 이름의 잠수복 | null | FALLBACK |
| set_armor_150 | 노틸러스의 심해의 잠수복 | null | FALLBACK |
| set_armor_151 | 오즈의 녹색 도시의 잠수복 | null | FALLBACK |
| set_armor_152 | 셜우드의 숲의 잠수복 | null | FALLBACK |
| set_armor_153 | 노트르담의 종의 잠수복 | null | FALLBACK |
| set_armor_154 | 몽테크리스토의 장부의 잠수복 | null | FALLBACK |
| set_armor_155 | 시간 기계의 잔광의 잠수복 | null | FALLBACK |
| set_armor_156 | 드라큘라의 새벽의 잠수복 | null | FALLBACK |
| set_armor_157 | 천일야화의 등불의 잠수복 | null | FALLBACK |
| set_armor_158 | 성냥팔이의 불씨의 잠수복 | null | FALLBACK |
| set_armor_159 | 파우스트의 서명의 잠수복 | null | FALLBACK |
| set_armor_160 | 토끼굴의 수도복 | null | FALLBACK |
| set_armor_161 | 하트 법정의 수도복 | null | FALLBACK |
| set_armor_162 | 흰 토끼의 시계의 수도복 | null | FALLBACK |
| set_armor_163 | 거울 나라의 수도복 | null | FALLBACK |
| set_armor_164 | 피쿼드의 항해의 수도복 | null | FALLBACK |
| set_armor_165 | 백경의 상흔의 수도복 | null | FALLBACK |
| set_armor_166 | 라만차의 꿈의 수도복 | null | FALLBACK |
| set_armor_167 | 산초의 귀환길의 수도복 | null | FALLBACK |
| set_armor_168 | 봉합 실험실의 수도복 | null | FALLBACK |
| set_armor_169 | 피조물의 이름의 수도복 | null | FALLBACK |
| set_armor_170 | 노틸러스의 심해의 수도복 | null | FALLBACK |
| set_armor_171 | 오즈의 녹색 도시의 수도복 | null | FALLBACK |
| set_armor_172 | 셜우드의 숲의 수도복 | null | FALLBACK |
| set_armor_173 | 노트르담의 종의 수도복 | null | FALLBACK |
| set_armor_174 | 몽테크리스토의 장부의 수도복 | null | FALLBACK |
| set_armor_175 | 시간 기계의 잔광의 수도복 | null | FALLBACK |
| set_armor_176 | 드라큘라의 새벽의 수도복 | null | FALLBACK |
| set_armor_177 | 천일야화의 등불의 수도복 | null | FALLBACK |
| set_armor_178 | 성냥팔이의 불씨의 수도복 | null | FALLBACK |
| set_armor_179 | 파우스트의 서명의 수도복 | null | FALLBACK |
| set_armor_180 | 토끼굴의 사냥복 | null | FALLBACK |
| set_armor_181 | 하트 법정의 사냥복 | null | FALLBACK |
| set_armor_182 | 흰 토끼의 시계의 사냥복 | null | FALLBACK |
| set_armor_183 | 거울 나라의 사냥복 | null | FALLBACK |
| set_armor_184 | 피쿼드의 항해의 사냥복 | null | FALLBACK |
| set_armor_185 | 백경의 상흔의 사냥복 | null | FALLBACK |
| set_armor_186 | 라만차의 꿈의 사냥복 | null | FALLBACK |
| set_armor_187 | 산초의 귀환길의 사냥복 | null | FALLBACK |
| set_armor_188 | 봉합 실험실의 사냥복 | null | FALLBACK |
| set_armor_189 | 피조물의 이름의 사냥복 | null | FALLBACK |
| set_armor_190 | 노틸러스의 심해의 사냥복 | null | FALLBACK |
| set_armor_191 | 오즈의 녹색 도시의 사냥복 | null | FALLBACK |
| set_armor_192 | 셜우드의 숲의 사냥복 | null | FALLBACK |
| set_armor_193 | 노트르담의 종의 사냥복 | null | FALLBACK |
| set_armor_194 | 몽테크리스토의 장부의 사냥복 | null | FALLBACK |
| set_armor_195 | 시간 기계의 잔광의 사냥복 | null | FALLBACK |
| set_armor_196 | 드라큘라의 새벽의 사냥복 | null | FALLBACK |
| set_armor_197 | 천일야화의 등불의 사냥복 | null | FALLBACK |
| set_armor_198 | 성냥팔이의 불씨의 사냥복 | null | FALLBACK |
| set_armor_199 | 파우스트의 서명의 사냥복 | null | FALLBACK |
| set_armor_200 | 토끼굴의 방열복 | null | FALLBACK |
| set_armor_201 | 하트 법정의 방열복 | null | FALLBACK |
| set_armor_202 | 흰 토끼의 시계의 방열복 | null | FALLBACK |
| set_armor_203 | 거울 나라의 방열복 | null | FALLBACK |
| set_armor_204 | 피쿼드의 항해의 방열복 | null | FALLBACK |
| set_armor_205 | 백경의 상흔의 방열복 | null | FALLBACK |
| set_armor_206 | 라만차의 꿈의 방열복 | null | FALLBACK |
| set_armor_207 | 산초의 귀환길의 방열복 | null | FALLBACK |
| set_armor_208 | 봉합 실험실의 방열복 | null | FALLBACK |
| set_armor_209 | 피조물의 이름의 방열복 | null | FALLBACK |
| set_armor_210 | 노틸러스의 심해의 방열복 | null | FALLBACK |
| set_armor_211 | 오즈의 녹색 도시의 방열복 | null | FALLBACK |
| set_armor_212 | 셜우드의 숲의 방열복 | null | FALLBACK |
| set_armor_213 | 노트르담의 종의 방열복 | null | FALLBACK |
| set_armor_214 | 몽테크리스토의 장부의 방열복 | null | FALLBACK |
| set_armor_215 | 시간 기계의 잔광의 방열복 | null | FALLBACK |
| set_armor_216 | 드라큘라의 새벽의 방열복 | null | FALLBACK |
| set_armor_217 | 천일야화의 등불의 방열복 | null | FALLBACK |
| set_armor_218 | 성냥팔이의 불씨의 방열복 | null | FALLBACK |
| set_armor_219 | 파우스트의 서명의 방열복 | null | FALLBACK |
| set_armor_220 | 토끼굴의 봉합옷 | null | FALLBACK |
| set_armor_221 | 하트 법정의 봉합옷 | null | FALLBACK |
| set_armor_222 | 흰 토끼의 시계의 봉합옷 | null | FALLBACK |
| set_armor_223 | 거울 나라의 봉합옷 | null | FALLBACK |
| set_armor_224 | 피쿼드의 항해의 봉합옷 | null | FALLBACK |
| set_armor_225 | 백경의 상흔의 봉합옷 | null | FALLBACK |
| set_armor_226 | 라만차의 꿈의 봉합옷 | null | FALLBACK |
| set_armor_227 | 산초의 귀환길의 봉합옷 | null | FALLBACK |
| set_armor_228 | 봉합 실험실의 봉합옷 | null | FALLBACK |
| set_armor_229 | 피조물의 이름의 봉합옷 | null | FALLBACK |
| set_armor_230 | 노틸러스의 심해의 봉합옷 | null | FALLBACK |
| set_armor_231 | 오즈의 녹색 도시의 봉합옷 | null | FALLBACK |
| set_armor_232 | 셜우드의 숲의 봉합옷 | null | FALLBACK |
| set_armor_233 | 노트르담의 종의 봉합옷 | null | FALLBACK |
| set_armor_234 | 몽테크리스토의 장부의 봉합옷 | null | FALLBACK |
| set_armor_235 | 시간 기계의 잔광의 봉합옷 | null | FALLBACK |
| set_armor_236 | 드라큘라의 새벽의 봉합옷 | null | FALLBACK |
| set_armor_237 | 천일야화의 등불의 봉합옷 | null | FALLBACK |
| set_armor_238 | 성냥팔이의 불씨의 봉합옷 | null | FALLBACK |
| set_armor_239 | 파우스트의 서명의 봉합옷 | null | FALLBACK |
| set_armor_240 | 토끼굴의 비늘갑 | null | FALLBACK |
| set_armor_241 | 하트 법정의 비늘갑 | null | FALLBACK |
| set_armor_242 | 흰 토끼의 시계의 비늘갑 | null | FALLBACK |
| set_armor_243 | 거울 나라의 비늘갑 | null | FALLBACK |
| set_armor_244 | 피쿼드의 항해의 비늘갑 | null | FALLBACK |
| set_armor_245 | 백경의 상흔의 비늘갑 | null | FALLBACK |
| set_armor_246 | 라만차의 꿈의 비늘갑 | null | FALLBACK |
| set_armor_247 | 산초의 귀환길의 비늘갑 | null | FALLBACK |
| set_armor_248 | 봉합 실험실의 비늘갑 | null | FALLBACK |
| set_armor_249 | 피조물의 이름의 비늘갑 | null | FALLBACK |
| set_armor_250 | 노틸러스의 심해의 비늘갑 | null | FALLBACK |
| set_armor_251 | 오즈의 녹색 도시의 비늘갑 | null | FALLBACK |
| set_armor_252 | 셜우드의 숲의 비늘갑 | null | FALLBACK |
| set_armor_253 | 노트르담의 종의 비늘갑 | null | FALLBACK |
| set_armor_254 | 몽테크리스토의 장부의 비늘갑 | null | FALLBACK |
| set_armor_255 | 시간 기계의 잔광의 비늘갑 | null | FALLBACK |
| set_armor_256 | 드라큘라의 새벽의 비늘갑 | null | FALLBACK |
| set_armor_257 | 천일야화의 등불의 비늘갑 | null | FALLBACK |
| set_armor_258 | 성냥팔이의 불씨의 비늘갑 | null | FALLBACK |
| set_armor_259 | 파우스트의 서명의 비늘갑 | null | FALLBACK |
| set_armor_260 | 토끼굴의 경갑 | null | FALLBACK |
| set_armor_261 | 하트 법정의 경갑 | null | FALLBACK |
| set_armor_262 | 흰 토끼의 시계의 경갑 | null | FALLBACK |
| set_armor_263 | 거울 나라의 경갑 | null | FALLBACK |
| set_armor_264 | 피쿼드의 항해의 경갑 | null | FALLBACK |
| set_armor_265 | 백경의 상흔의 경갑 | null | FALLBACK |
| set_armor_266 | 라만차의 꿈의 경갑 | null | FALLBACK |
| set_armor_267 | 산초의 귀환길의 경갑 | null | FALLBACK |
| set_armor_268 | 봉합 실험실의 경갑 | null | FALLBACK |
| set_armor_269 | 피조물의 이름의 경갑 | null | FALLBACK |
| set_armor_270 | 노틸러스의 심해의 경갑 | null | FALLBACK |
| set_armor_271 | 오즈의 녹색 도시의 경갑 | null | FALLBACK |
| set_armor_272 | 셜우드의 숲의 경갑 | null | FALLBACK |
| set_armor_273 | 노트르담의 종의 경갑 | null | FALLBACK |
| set_armor_274 | 몽테크리스토의 장부의 경갑 | null | FALLBACK |
| set_armor_275 | 시간 기계의 잔광의 경갑 | null | FALLBACK |
| set_armor_276 | 드라큘라의 새벽의 경갑 | null | FALLBACK |
| set_armor_277 | 천일야화의 등불의 경갑 | null | FALLBACK |
| set_armor_278 | 성냥팔이의 불씨의 경갑 | null | FALLBACK |
| set_armor_279 | 파우스트의 서명의 경갑 | null | FALLBACK |
| set_armor_280 | 토끼굴의 법복 | null | FALLBACK |
| set_armor_281 | 하트 법정의 법복 | null | FALLBACK |
| set_armor_282 | 흰 토끼의 시계의 법복 | null | FALLBACK |
| set_armor_283 | 거울 나라의 법복 | null | FALLBACK |
| set_armor_284 | 피쿼드의 항해의 법복 | null | FALLBACK |
| set_armor_285 | 백경의 상흔의 법복 | null | FALLBACK |
| set_armor_286 | 라만차의 꿈의 법복 | null | FALLBACK |
| set_armor_287 | 산초의 귀환길의 법복 | null | FALLBACK |
| set_armor_288 | 봉합 실험실의 법복 | null | FALLBACK |
| set_armor_289 | 피조물의 이름의 법복 | null | FALLBACK |
| set_armor_290 | 노틸러스의 심해의 법복 | null | FALLBACK |
| set_armor_291 | 오즈의 녹색 도시의 법복 | null | FALLBACK |
| set_armor_292 | 셜우드의 숲의 법복 | null | FALLBACK |
| set_armor_293 | 노트르담의 종의 법복 | null | FALLBACK |
| set_armor_294 | 몽테크리스토의 장부의 법복 | null | FALLBACK |
| set_armor_295 | 시간 기계의 잔광의 법복 | null | FALLBACK |
| set_armor_296 | 드라큘라의 새벽의 법복 | null | FALLBACK |
| set_armor_297 | 천일야화의 등불의 법복 | null | FALLBACK |
| set_armor_298 | 성냥팔이의 불씨의 법복 | null | FALLBACK |
| set_armor_299 | 파우스트의 서명의 법복 | null | FALLBACK |
| set_armor_300 | 토끼굴의 군복 | null | FALLBACK |
| set_armor_301 | 하트 법정의 군복 | null | FALLBACK |
| set_armor_302 | 흰 토끼의 시계의 군복 | null | FALLBACK |
| set_armor_303 | 거울 나라의 군복 | null | FALLBACK |
| set_armor_304 | 피쿼드의 항해의 군복 | null | FALLBACK |
| set_armor_305 | 백경의 상흔의 군복 | null | FALLBACK |
| set_armor_306 | 라만차의 꿈의 군복 | null | FALLBACK |
| set_armor_307 | 산초의 귀환길의 군복 | null | FALLBACK |
| set_armor_308 | 봉합 실험실의 군복 | null | FALLBACK |
| set_armor_309 | 피조물의 이름의 군복 | null | FALLBACK |
| set_armor_310 | 노틸러스의 심해의 군복 | null | FALLBACK |
| set_armor_311 | 오즈의 녹색 도시의 군복 | null | FALLBACK |
| set_armor_312 | 셜우드의 숲의 군복 | null | FALLBACK |
| set_armor_313 | 노트르담의 종의 군복 | null | FALLBACK |
| set_armor_314 | 몽테크리스토의 장부의 군복 | null | FALLBACK |
| set_armor_315 | 시간 기계의 잔광의 군복 | null | FALLBACK |
| set_armor_316 | 드라큘라의 새벽의 군복 | null | FALLBACK |
| set_armor_317 | 천일야화의 등불의 군복 | null | FALLBACK |
| set_armor_318 | 성냥팔이의 불씨의 군복 | null | FALLBACK |
| set_armor_319 | 파우스트의 서명의 군복 | null | FALLBACK |
| set_armor_320 | 토끼굴의 항해복 | null | FALLBACK |
| set_armor_321 | 하트 법정의 항해복 | null | FALLBACK |
| set_armor_322 | 흰 토끼의 시계의 항해복 | null | FALLBACK |
| set_armor_323 | 거울 나라의 항해복 | null | FALLBACK |
| set_armor_324 | 피쿼드의 항해의 항해복 | null | FALLBACK |
| set_armor_325 | 백경의 상흔의 항해복 | null | FALLBACK |
| set_armor_326 | 라만차의 꿈의 항해복 | null | FALLBACK |
| set_armor_327 | 산초의 귀환길의 항해복 | null | FALLBACK |
| set_armor_328 | 봉합 실험실의 항해복 | null | FALLBACK |
| set_armor_329 | 피조물의 이름의 항해복 | null | FALLBACK |
| set_armor_330 | 노틸러스의 심해의 항해복 | null | FALLBACK |
| set_armor_331 | 오즈의 녹색 도시의 항해복 | null | FALLBACK |
| set_armor_332 | 셜우드의 숲의 항해복 | null | FALLBACK |
| set_armor_333 | 노트르담의 종의 항해복 | null | FALLBACK |
| set_armor_334 | 몽테크리스토의 장부의 항해복 | null | FALLBACK |
| set_armor_335 | 시간 기계의 잔광의 항해복 | null | FALLBACK |
| set_armor_336 | 드라큘라의 새벽의 항해복 | null | FALLBACK |
| set_armor_337 | 천일야화의 등불의 항해복 | null | FALLBACK |
| set_charm_0 | 토끼굴의 반지 | null | FALLBACK |
| set_charm_1 | 하트 법정의 반지 | null | FALLBACK |
| set_charm_2 | 흰 토끼의 시계의 반지 | null | FALLBACK |
| set_charm_3 | 거울 나라의 반지 | null | FALLBACK |
| set_charm_4 | 피쿼드의 항해의 반지 | null | FALLBACK |
| set_charm_5 | 백경의 상흔의 반지 | null | FALLBACK |
| set_charm_6 | 라만차의 꿈의 반지 | null | FALLBACK |
| set_charm_7 | 산초의 귀환길의 반지 | null | FALLBACK |
| set_charm_8 | 봉합 실험실의 반지 | null | FALLBACK |
| set_charm_9 | 피조물의 이름의 반지 | null | FALLBACK |
| set_charm_10 | 노틸러스의 심해의 반지 | null | FALLBACK |
| set_charm_11 | 오즈의 녹색 도시의 반지 | null | FALLBACK |
| set_charm_12 | 셜우드의 숲의 반지 | null | FALLBACK |
| set_charm_13 | 노트르담의 종의 반지 | null | FALLBACK |
| set_charm_14 | 몽테크리스토의 장부의 반지 | null | FALLBACK |
| set_charm_15 | 시간 기계의 잔광의 반지 | null | FALLBACK |
| set_charm_16 | 드라큘라의 새벽의 반지 | null | FALLBACK |
| set_charm_17 | 천일야화의 등불의 반지 | null | FALLBACK |
| set_charm_18 | 성냥팔이의 불씨의 반지 | null | FALLBACK |
| set_charm_19 | 파우스트의 서명의 반지 | null | FALLBACK |
| set_charm_20 | 토끼굴의 목걸이 | null | FALLBACK |
| set_charm_21 | 하트 법정의 목걸이 | null | FALLBACK |
| set_charm_22 | 흰 토끼의 시계의 목걸이 | null | FALLBACK |
| set_charm_23 | 거울 나라의 목걸이 | null | FALLBACK |
| set_charm_24 | 피쿼드의 항해의 목걸이 | null | FALLBACK |
| set_charm_25 | 백경의 상흔의 목걸이 | null | FALLBACK |
| set_charm_26 | 라만차의 꿈의 목걸이 | null | FALLBACK |
| set_charm_27 | 산초의 귀환길의 목걸이 | null | FALLBACK |
| set_charm_28 | 봉합 실험실의 목걸이 | null | FALLBACK |
| set_charm_29 | 피조물의 이름의 목걸이 | null | FALLBACK |
| set_charm_30 | 노틸러스의 심해의 목걸이 | null | FALLBACK |
| set_charm_31 | 오즈의 녹색 도시의 목걸이 | null | FALLBACK |
| set_charm_32 | 셜우드의 숲의 목걸이 | null | FALLBACK |
| set_charm_33 | 노트르담의 종의 목걸이 | null | FALLBACK |
| set_charm_34 | 몽테크리스토의 장부의 목걸이 | null | FALLBACK |
| set_charm_35 | 시간 기계의 잔광의 목걸이 | null | FALLBACK |
| set_charm_36 | 드라큘라의 새벽의 목걸이 | null | FALLBACK |
| set_charm_37 | 천일야화의 등불의 목걸이 | null | FALLBACK |
| set_charm_38 | 성냥팔이의 불씨의 목걸이 | null | FALLBACK |
| set_charm_39 | 파우스트의 서명의 목걸이 | null | FALLBACK |
| set_charm_40 | 토끼굴의 부적 | null | FALLBACK |
| set_charm_41 | 하트 법정의 부적 | null | FALLBACK |
| set_charm_42 | 흰 토끼의 시계의 부적 | null | FALLBACK |
| set_charm_43 | 거울 나라의 부적 | null | FALLBACK |
| set_charm_44 | 피쿼드의 항해의 부적 | null | FALLBACK |
| set_charm_45 | 백경의 상흔의 부적 | null | FALLBACK |
| set_charm_46 | 라만차의 꿈의 부적 | null | FALLBACK |
| set_charm_47 | 산초의 귀환길의 부적 | null | FALLBACK |
| set_charm_48 | 봉합 실험실의 부적 | null | FALLBACK |
| set_charm_49 | 피조물의 이름의 부적 | null | FALLBACK |
| set_charm_50 | 노틸러스의 심해의 부적 | null | FALLBACK |
| set_charm_51 | 오즈의 녹색 도시의 부적 | null | FALLBACK |
| set_charm_52 | 셜우드의 숲의 부적 | null | FALLBACK |
| set_charm_53 | 노트르담의 종의 부적 | null | FALLBACK |
| set_charm_54 | 몽테크리스토의 장부의 부적 | null | FALLBACK |
| set_charm_55 | 시간 기계의 잔광의 부적 | null | FALLBACK |
| set_charm_56 | 드라큘라의 새벽의 부적 | null | FALLBACK |
| set_charm_57 | 천일야화의 등불의 부적 | null | FALLBACK |
| set_charm_58 | 성냥팔이의 불씨의 부적 | null | FALLBACK |
| set_charm_59 | 파우스트의 서명의 부적 | null | FALLBACK |
| set_charm_60 | 토끼굴의 회중시계 | null | FALLBACK |
| set_charm_61 | 하트 법정의 회중시계 | null | FALLBACK |
| set_charm_62 | 흰 토끼의 시계의 회중시계 | null | FALLBACK |
| set_charm_63 | 거울 나라의 회중시계 | null | FALLBACK |
| set_charm_64 | 피쿼드의 항해의 회중시계 | null | FALLBACK |
| set_charm_65 | 백경의 상흔의 회중시계 | null | FALLBACK |
| set_charm_66 | 라만차의 꿈의 회중시계 | null | FALLBACK |
| set_charm_67 | 산초의 귀환길의 회중시계 | null | FALLBACK |
| set_charm_68 | 봉합 실험실의 회중시계 | null | FALLBACK |
| set_charm_69 | 피조물의 이름의 회중시계 | null | FALLBACK |
| set_charm_70 | 노틸러스의 심해의 회중시계 | null | FALLBACK |
| set_charm_71 | 오즈의 녹색 도시의 회중시계 | null | FALLBACK |
| set_charm_72 | 셜우드의 숲의 회중시계 | null | FALLBACK |
| set_charm_73 | 노트르담의 종의 회중시계 | null | FALLBACK |
| set_charm_74 | 몽테크리스토의 장부의 회중시계 | null | FALLBACK |
| set_charm_75 | 시간 기계의 잔광의 회중시계 | null | FALLBACK |
| set_charm_76 | 드라큘라의 새벽의 회중시계 | null | FALLBACK |
| set_charm_77 | 천일야화의 등불의 회중시계 | null | FALLBACK |
| set_charm_78 | 성냥팔이의 불씨의 회중시계 | null | FALLBACK |
| set_charm_79 | 파우스트의 서명의 회중시계 | null | FALLBACK |
| set_charm_80 | 토끼굴의 동전 | null | FALLBACK |
| set_charm_81 | 하트 법정의 동전 | null | FALLBACK |
| set_charm_82 | 흰 토끼의 시계의 동전 | null | FALLBACK |
| set_charm_83 | 거울 나라의 동전 | null | FALLBACK |
| set_charm_84 | 피쿼드의 항해의 동전 | null | FALLBACK |
| set_charm_85 | 백경의 상흔의 동전 | null | FALLBACK |
| set_charm_86 | 라만차의 꿈의 동전 | null | FALLBACK |
| set_charm_87 | 산초의 귀환길의 동전 | null | FALLBACK |
| set_charm_88 | 봉합 실험실의 동전 | null | FALLBACK |
| set_charm_89 | 피조물의 이름의 동전 | null | FALLBACK |
| set_charm_90 | 노틸러스의 심해의 동전 | null | FALLBACK |
| set_charm_91 | 오즈의 녹색 도시의 동전 | null | FALLBACK |
| set_charm_92 | 셜우드의 숲의 동전 | null | FALLBACK |
| set_charm_93 | 노트르담의 종의 동전 | null | FALLBACK |
| set_charm_94 | 몽테크리스토의 장부의 동전 | null | FALLBACK |
| set_charm_95 | 시간 기계의 잔광의 동전 | null | FALLBACK |
| set_charm_96 | 드라큘라의 새벽의 동전 | null | FALLBACK |
| set_charm_97 | 천일야화의 등불의 동전 | null | FALLBACK |
| set_charm_98 | 성냥팔이의 불씨의 동전 | null | FALLBACK |
| set_charm_99 | 파우스트의 서명의 동전 | null | FALLBACK |
| set_charm_100 | 토끼굴의 책갈피 | null | FALLBACK |
| set_charm_101 | 하트 법정의 책갈피 | null | FALLBACK |
| set_charm_102 | 흰 토끼의 시계의 책갈피 | null | FALLBACK |
| set_charm_103 | 거울 나라의 책갈피 | null | FALLBACK |
| set_charm_104 | 피쿼드의 항해의 책갈피 | null | FALLBACK |
| set_charm_105 | 백경의 상흔의 책갈피 | null | FALLBACK |
| set_charm_106 | 라만차의 꿈의 책갈피 | null | FALLBACK |
| set_charm_107 | 산초의 귀환길의 책갈피 | null | FALLBACK |
| set_charm_108 | 봉합 실험실의 책갈피 | null | FALLBACK |
| set_charm_109 | 피조물의 이름의 책갈피 | null | FALLBACK |
| set_charm_110 | 노틸러스의 심해의 책갈피 | null | FALLBACK |
| set_charm_111 | 오즈의 녹색 도시의 책갈피 | null | FALLBACK |
| set_charm_112 | 셜우드의 숲의 책갈피 | null | FALLBACK |
| set_charm_113 | 노트르담의 종의 책갈피 | null | FALLBACK |
| set_charm_114 | 몽테크리스토의 장부의 책갈피 | null | FALLBACK |
| set_charm_115 | 시간 기계의 잔광의 책갈피 | null | FALLBACK |
| set_charm_116 | 드라큘라의 새벽의 책갈피 | null | FALLBACK |
| set_charm_117 | 천일야화의 등불의 책갈피 | null | FALLBACK |
| set_charm_118 | 성냥팔이의 불씨의 책갈피 | null | FALLBACK |
| set_charm_119 | 파우스트의 서명의 책갈피 | null | FALLBACK |
| set_charm_120 | 토끼굴의 나침반 | null | FALLBACK |
| set_charm_121 | 하트 법정의 나침반 | null | FALLBACK |
| set_charm_122 | 흰 토끼의 시계의 나침반 | null | FALLBACK |
| set_charm_123 | 거울 나라의 나침반 | null | FALLBACK |
| set_charm_124 | 피쿼드의 항해의 나침반 | null | FALLBACK |
| set_charm_125 | 백경의 상흔의 나침반 | null | FALLBACK |
| set_charm_126 | 라만차의 꿈의 나침반 | null | FALLBACK |
| set_charm_127 | 산초의 귀환길의 나침반 | null | FALLBACK |
| set_charm_128 | 봉합 실험실의 나침반 | null | FALLBACK |
| set_charm_129 | 피조물의 이름의 나침반 | null | FALLBACK |
| set_charm_130 | 노틸러스의 심해의 나침반 | null | FALLBACK |
| set_charm_131 | 오즈의 녹색 도시의 나침반 | null | FALLBACK |
| set_charm_132 | 셜우드의 숲의 나침반 | null | FALLBACK |
| set_charm_133 | 노트르담의 종의 나침반 | null | FALLBACK |
| set_charm_134 | 몽테크리스토의 장부의 나침반 | null | FALLBACK |
| set_charm_135 | 시간 기계의 잔광의 나침반 | null | FALLBACK |
| set_charm_136 | 드라큘라의 새벽의 나침반 | null | FALLBACK |
| set_charm_137 | 천일야화의 등불의 나침반 | null | FALLBACK |
| set_charm_138 | 성냥팔이의 불씨의 나침반 | null | FALLBACK |
| set_charm_139 | 파우스트의 서명의 나침반 | null | FALLBACK |
| set_charm_140 | 토끼굴의 인장 | null | FALLBACK |
| set_charm_141 | 하트 법정의 인장 | null | FALLBACK |
| set_charm_142 | 흰 토끼의 시계의 인장 | null | FALLBACK |
| set_charm_143 | 거울 나라의 인장 | null | FALLBACK |
| set_charm_144 | 피쿼드의 항해의 인장 | null | FALLBACK |
| set_charm_145 | 백경의 상흔의 인장 | null | FALLBACK |
| set_charm_146 | 라만차의 꿈의 인장 | null | FALLBACK |
| set_charm_147 | 산초의 귀환길의 인장 | null | FALLBACK |
| set_charm_148 | 봉합 실험실의 인장 | null | FALLBACK |
| set_charm_149 | 피조물의 이름의 인장 | null | FALLBACK |
| set_charm_150 | 노틸러스의 심해의 인장 | null | FALLBACK |
| set_charm_151 | 오즈의 녹색 도시의 인장 | null | FALLBACK |
| set_charm_152 | 셜우드의 숲의 인장 | null | FALLBACK |
| set_charm_153 | 노트르담의 종의 인장 | null | FALLBACK |
| set_charm_154 | 몽테크리스토의 장부의 인장 | null | FALLBACK |
| set_charm_155 | 시간 기계의 잔광의 인장 | null | FALLBACK |
| set_charm_156 | 드라큘라의 새벽의 인장 | null | FALLBACK |
| set_charm_157 | 천일야화의 등불의 인장 | null | FALLBACK |
| set_charm_158 | 성냥팔이의 불씨의 인장 | null | FALLBACK |
| set_charm_159 | 파우스트의 서명의 인장 | null | FALLBACK |
| set_charm_160 | 토끼굴의 유리구슬 | null | FALLBACK |
| set_charm_161 | 하트 법정의 유리구슬 | null | FALLBACK |
| set_charm_162 | 흰 토끼의 시계의 유리구슬 | null | FALLBACK |
| set_charm_163 | 거울 나라의 유리구슬 | null | FALLBACK |
| set_charm_164 | 피쿼드의 항해의 유리구슬 | null | FALLBACK |
| set_charm_165 | 백경의 상흔의 유리구슬 | null | FALLBACK |
| set_charm_166 | 라만차의 꿈의 유리구슬 | null | FALLBACK |
| set_charm_167 | 산초의 귀환길의 유리구슬 | null | FALLBACK |
| set_charm_168 | 봉합 실험실의 유리구슬 | null | FALLBACK |
| set_charm_169 | 피조물의 이름의 유리구슬 | null | FALLBACK |
| set_charm_170 | 노틸러스의 심해의 유리구슬 | null | FALLBACK |
| set_charm_171 | 오즈의 녹색 도시의 유리구슬 | null | FALLBACK |
| set_charm_172 | 셜우드의 숲의 유리구슬 | null | FALLBACK |
| set_charm_173 | 노트르담의 종의 유리구슬 | null | FALLBACK |
| set_charm_174 | 몽테크리스토의 장부의 유리구슬 | null | FALLBACK |
| set_charm_175 | 시간 기계의 잔광의 유리구슬 | null | FALLBACK |
| set_charm_176 | 드라큘라의 새벽의 유리구슬 | null | FALLBACK |
| set_charm_177 | 천일야화의 등불의 유리구슬 | null | FALLBACK |
| set_charm_178 | 성냥팔이의 불씨의 유리구슬 | null | FALLBACK |
| set_charm_179 | 파우스트의 서명의 유리구슬 | null | FALLBACK |
| set_charm_180 | 토끼굴의 종 | null | FALLBACK |
| set_charm_181 | 하트 법정의 종 | null | FALLBACK |
| set_charm_182 | 흰 토끼의 시계의 종 | null | FALLBACK |
| set_charm_183 | 거울 나라의 종 | null | FALLBACK |
| set_charm_184 | 피쿼드의 항해의 종 | null | FALLBACK |
| set_charm_185 | 백경의 상흔의 종 | null | FALLBACK |
| set_charm_186 | 라만차의 꿈의 종 | null | FALLBACK |
| set_charm_187 | 산초의 귀환길의 종 | null | FALLBACK |
| set_charm_188 | 봉합 실험실의 종 | null | FALLBACK |
| set_charm_189 | 피조물의 이름의 종 | null | FALLBACK |
| set_charm_190 | 노틸러스의 심해의 종 | null | FALLBACK |
| set_charm_191 | 오즈의 녹색 도시의 종 | null | FALLBACK |
| set_charm_192 | 셜우드의 숲의 종 | null | FALLBACK |
| set_charm_193 | 노트르담의 종의 종 | null | FALLBACK |
| set_charm_194 | 몽테크리스토의 장부의 종 | null | FALLBACK |
| set_charm_195 | 시간 기계의 잔광의 종 | null | FALLBACK |
| set_charm_196 | 드라큘라의 새벽의 종 | null | FALLBACK |
| set_charm_197 | 천일야화의 등불의 종 | null | FALLBACK |
| set_charm_198 | 성냥팔이의 불씨의 종 | null | FALLBACK |
| set_charm_199 | 파우스트의 서명의 종 | null | FALLBACK |
| set_charm_200 | 토끼굴의 브로치 | null | FALLBACK |
| set_charm_201 | 하트 법정의 브로치 | null | FALLBACK |
| set_charm_202 | 흰 토끼의 시계의 브로치 | null | FALLBACK |
| set_charm_203 | 거울 나라의 브로치 | null | FALLBACK |
| set_charm_204 | 피쿼드의 항해의 브로치 | null | FALLBACK |
| set_charm_205 | 백경의 상흔의 브로치 | null | FALLBACK |
| set_charm_206 | 라만차의 꿈의 브로치 | null | FALLBACK |
| set_charm_207 | 산초의 귀환길의 브로치 | null | FALLBACK |
| set_charm_208 | 봉합 실험실의 브로치 | null | FALLBACK |
| set_charm_209 | 피조물의 이름의 브로치 | null | FALLBACK |
| set_charm_210 | 노틸러스의 심해의 브로치 | null | FALLBACK |
| set_charm_211 | 오즈의 녹색 도시의 브로치 | null | FALLBACK |
| set_charm_212 | 셜우드의 숲의 브로치 | null | FALLBACK |
| set_charm_213 | 노트르담의 종의 브로치 | null | FALLBACK |
| set_charm_214 | 몽테크리스토의 장부의 브로치 | null | FALLBACK |
| set_charm_215 | 시간 기계의 잔광의 브로치 | null | FALLBACK |
| set_charm_216 | 드라큘라의 새벽의 브로치 | null | FALLBACK |
| set_charm_217 | 천일야화의 등불의 브로치 | null | FALLBACK |
| set_charm_218 | 성냥팔이의 불씨의 브로치 | null | FALLBACK |
| set_charm_219 | 파우스트의 서명의 브로치 | null | FALLBACK |
| set_charm_220 | 토끼굴의 열쇠 | null | FALLBACK |
| set_charm_221 | 하트 법정의 열쇠 | null | FALLBACK |
| set_charm_222 | 흰 토끼의 시계의 열쇠 | null | FALLBACK |
| set_charm_223 | 거울 나라의 열쇠 | null | FALLBACK |
| set_charm_224 | 피쿼드의 항해의 열쇠 | null | FALLBACK |
| set_charm_225 | 백경의 상흔의 열쇠 | null | FALLBACK |
| set_charm_226 | 라만차의 꿈의 열쇠 | null | FALLBACK |
| set_charm_227 | 산초의 귀환길의 열쇠 | null | FALLBACK |
| set_charm_228 | 봉합 실험실의 열쇠 | null | FALLBACK |
| set_charm_229 | 피조물의 이름의 열쇠 | null | FALLBACK |
| set_charm_230 | 노틸러스의 심해의 열쇠 | null | FALLBACK |
| set_charm_231 | 오즈의 녹색 도시의 열쇠 | null | FALLBACK |
| set_charm_232 | 셜우드의 숲의 열쇠 | null | FALLBACK |
| set_charm_233 | 노트르담의 종의 열쇠 | null | FALLBACK |
| set_charm_234 | 몽테크리스토의 장부의 열쇠 | null | FALLBACK |
| set_charm_235 | 시간 기계의 잔광의 열쇠 | null | FALLBACK |
| set_charm_236 | 드라큘라의 새벽의 열쇠 | null | FALLBACK |
| set_charm_237 | 천일야화의 등불의 열쇠 | null | FALLBACK |

## Held Library candidates

| Index | File | Reason |
|---|---|---|
| 3 | /텍스트 rpg/고딕 주술의 부적과 붉은 반지.png | Materialization failed; no mapping made |
| 4 | /텍스트 rpg/고딕 유물과 금이 간 거울.png | Materialization failed; no mapping made |
| 5 | /텍스트 rpg/고딕 촛불 아래의 저주받은 유물들.png | Materialization failed; no mapping made |
| 6 | /텍스트 rpg/달빛 아래 고딕 헌터와 까마귀.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 7 | /텍스트 rpg/고딕 성채의 장미 기사여왕.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 9 | /텍스트 rpg/촛불 아래 검은 토끼발 부적.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 11 | /텍스트 rpg/고딕 촛불 아래의 십자가와 모래시계.png | Materialization failed; no mapping made |
| 12 | /텍스트 rpg/고딕 제단의 십자가와 붉은 모래시계.png | Materialization failed; no mapping made |
| 13 | /텍스트 rpg/폭풍 속 고딕 성채의 사냥꾼.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 14 | /텍스트 rpg/달빛 아래 고딕 기사의 성채.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 15 | /텍스트 rpg/촛불 아래 낡은 나무 십자가.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 16 | /텍스트 rpg/비 내리는 폐허의 까마귀 마법사.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 17 | /텍스트 rpg/핏빛 고딕 왕관과 촛불의 제단.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 18 | /텍스트 rpg/핏빛 루비의 고딕 왕관.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 19 | /텍스트 rpg/캐릭터 및 아이템 이미지/달빛 아래의 고딕 성녀 자세.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 20 | /텍스트 rpg/캐릭터 및 아이템 이미지/고딕 양식의 붉은 보석 그리모어.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 21 | /텍스트 rpg/캐릭터 및 아이템 이미지/핏빛 루비의 고딕 왕관.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 22 | /텍스트 rpg/캐릭터 및 아이템 이미지/폭풍우 속 고딕 뱀파이어 기사.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 23 | /텍스트 rpg/캐릭터 및 아이템 이미지/달빛 아래의 고딕 마법사.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 25 | /텍스트 rpg/캐릭터 및 아이템 이미지/붉은 모래의 고딕 hourglass.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 26 | /텍스트 rpg/캐릭터 및 아이템 이미지/핏빛 루비의 고딕 아뮬렛.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 27 | /텍스트 rpg/캐릭터 및 아이템 이미지/비 내리는 고딕 도시의 사냥꾼.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 28 | /텍스트 rpg/캐릭터 및 아이템 이미지/폐허를 걷는 고독한 모험가(1).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 29 | /텍스트 rpg/캐릭터 및 아이템 이미지/폐허의 안개 속 판타지 방랑자.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 30 | /텍스트 rpg/캐릭터 및 아이템 이미지/고딕 양식의 천문 회중시계 유물.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 31 | /텍스트 rpg/캐릭터 및 아이템 이미지/폐허를 걷는 고독한 방랑자.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 32 | /텍스트 rpg/캐릭터 및 아이템 이미지/안개 낀 고딕 도시의 방랑자.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 33 | /텍스트 rpg/캐릭터 및 아이템 이미지/안개 낀 고딕 폐허의 방랑 전사.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 34 | /텍스트 rpg/캐릭터 및 아이템 이미지/폭풍우 속 고딕 도시의 방랑자.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 35 | /텍스트 rpg/캐릭터 및 아이템 이미지/비 내리는 고딕 도시의 방랑자.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 36 | /텍스트 rpg/캐릭터 및 아이템 이미지/안개 낀 폐허를 걷는 방랑자.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 37 | /텍스트 rpg/캐릭터 및 아이템 이미지/고딕 양식의 낡은 열쇠와 촛불.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 38 | /텍스트 rpg/캐릭터 및 아이템 이미지/안개 속 고딕 폐허의 방랑자.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 39 | /텍스트 rpg/캐릭터 및 아이템 이미지/안개 낀 고딕 폐허의 방랑자(3).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 40 | /텍스트 rpg/캐릭터 및 아이템 이미지/안개 낀 고딕 폐허의 방랑자(2).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 41 | /텍스트 rpg/캐릭터 및 아이템 이미지/폐허를 바라보는 방랑 모험가.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 42 | /텍스트 rpg/캐릭터 및 아이템 이미지/고대 문양의 낡은 마법서.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 43 | /텍스트 rpg/캐릭터 및 아이템 이미지/고대 고딕 그리모어와 촛불【zh?】.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 44 | /텍스트 rpg/캐릭터 및 아이템 이미지/고딕 연금술사의 붉은 마법 물약.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 45 | /텍스트 rpg/캐릭터 및 아이템 이미지/혈석이 박힌 고딕 성물 팬던트.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 46 | /텍스트 rpg/캐릭터 및 아이템 이미지/핏빛 보석의 고딕 부적.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 47 | /텍스트 rpg/캐릭터 및 아이템 이미지/폭풍 속 폐허를 지키는 기사.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 48 | /텍스트 rpg/캐릭터 및 아이템 이미지/안개 낀 고딕 폐허의 활잡이.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 49 | /텍스트 rpg/캐릭터 및 아이템 이미지/달빛 아래 고딕 헌터와 사냥개.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 50 | /텍스트 rpg/캐릭터 및 아이템 이미지/달빛 아래의 고딕 마녀 탐험가.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 51 | /텍스트 rpg/캐릭터 및 아이템 이미지/달빛 아래의 사냥꾼과 늑대.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 52 | /텍스트 rpg/캐릭터 및 아이템 이미지/잉크 마법사의 폐허 도서관.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 53 | /텍스트 rpg/캐릭터 및 아이템 이미지/달빛 아래 사냥꾼과 늑대.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 54 | /텍스트 rpg/캐릭터 및 아이템 이미지/폭풍 속 고서와 마녀 학자.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 55 | /텍스트 rpg/캐릭터 및 아이템 이미지/달빛 아래 고딕 사냥꾼과 늑대.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 56 | /텍스트 rpg/캐릭터 및 아이템 이미지/고딕 폐허의 달빛 사냥꾼.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 57 | /텍스트 rpg/캐릭터 및 아이템 이미지/어둠 속 전투 갑옷 유물.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 58 | /텍스트 rpg/캐릭터 및 아이템 이미지/어둠 속 녹슨 촛불 랜턴.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 59 | /텍스트 rpg/캐릭터 및 아이템 이미지/고풍스러운 가죽 주머니와 촛불ೇಜ.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 60 | /텍스트 rpg/캐릭터 및 아이템 이미지/녹슨 전장의 대형 워해머.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 61 | /텍스트 rpg/캐릭터 및 아이템 이미지/안개 낀 고딕 숲의 사냥꾼(1).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 62 | /텍스트 rpg/캐릭터 및 아이템 이미지/안개 속 폐허의 사슴 사냥꾼.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 63 | /텍스트 rpg/캐릭터 및 아이템 이미지/안개 낀 황혼의 고딕 사냥꾼.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 64 | /텍스트 rpg/캐릭터 및 아이템 이미지/안개 낀 고딕 폐허의 방랑자(1).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 65 | /텍스트 rpg/캐릭터 및 아이템 이미지/안개 낀 폐허의 방랑자.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 66 | /텍스트 rpg/캐릭터 및 아이템 이미지/안개 낀 고딕 숲의 사냥꾼.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 67 | /텍스트 rpg/캐릭터 및 아이템 이미지/안개 낀 고성의 방랑 검객.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 68 | /텍스트 rpg/캐릭터 및 아이템 이미지/안개 낀 고딕 폐허의 방랑자.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 69 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-10(2).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 70 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-9(3).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 71 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-8(3).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 72 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-7(3).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 73 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-6(3).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 74 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-5(3).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 75 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-4(3).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 76 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-3(3).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 77 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-2(3).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 78 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-1(3).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 79 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-10(1).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 80 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-9(2).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 81 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-8(2).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 82 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-7(2).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 83 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-6(2).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 84 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-5(2).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 85 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-4(2).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 86 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-3(2).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 87 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-2(2).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 88 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-1(2).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 89 | /텍스트 rpg/캐릭터 및 아이템 이미지/붉은 달 아래 고딕 성채의 사냥꾼.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 90 | /텍스트 rpg/캐릭터 및 아이템 이미지/달빛 아래 은빛 마녀의 주문.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 91 | /텍스트 rpg/캐릭터 및 아이템 이미지/폐허의 달빛 마도서술사.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 92 | /텍스트 rpg/캐릭터 및 아이템 이미지/비 내리는 고딕 도시의 외로운 사냥꾼.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 93 | /텍스트 rpg/캐릭터 및 아이템 이미지/안개 숲의 늑대 동료 ranger.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 95 | /텍스트 rpg/캐릭터 및 아이템 이미지/폭풍 속 고딕 아처의 귀환.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 96 | /텍스트 rpg/캐릭터 및 아이템 이미지/고딕 판타지 인물 초상 컬렉션.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 97 | /텍스트 rpg/캐릭터 및 아이템 이미지/폐허 속의 고독한 기사.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 99 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-10.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 100 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-9(1).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 101 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-8(1).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 102 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-7(1).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 103 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-6(1).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 104 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-5(1).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 105 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-4(1).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 106 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-3(1).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 107 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-2(1).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 108 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-1(1).png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 110 | /텍스트 rpg/캐릭터 및 아이템 이미지/안개 낀 고딕 황야의 방랑 전사.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 111 | /텍스트 rpg/캐릭터 및 아이템 이미지/안개 낀 폐허의 방랑 검객.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 112 | /텍스트 rpg/캐릭터 및 아이템 이미지/고딕 폐허를 걷는 생존자.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 113 | /텍스트 rpg/캐릭터 및 아이템 이미지/폐허를 지키는 방랑 전사.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 114 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-9.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 115 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-8.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 116 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-7.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 117 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-6.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 118 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-5.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 119 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-4.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 120 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-3.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 121 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-2.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |
| 122 | /텍스트 rpg/캐릭터 및 아이템 이미지/image-gen-1.png | Duplicate/composite or target ID/subject not established; held without arbitrary match |

## Rendering policy

Boss > enemy > event > same-character story/NPC > area > text fallback. Defeated enemy remains in resultVisual until the next situation. Midbosses have no dedicated illustration and use the current area. Hidden class art is shown only after discovery/unlock. No missing asset URL is synthesized. Shop/shrine/secret use the current area with action text, not unrelated art. Portraits use 2:3 contain; scene text grows and buttons are below the artwork. All images are lazy/async with meaningful alt and error fallback; HTTP failures remain test failures.

## Validation

Build runs validate-assets.cjs: case-sensitive file existence, exact-ID class asset linkage, JOBS.image consistency. Runtime null means intentional fallback, not MISSING. MISSING means an invalid mapped path/HTTP failure. Local HTTP and published Pages HTTP checks are separate from visual QA. WRONG_MATCH=0 applies to reviewed committed mappings, not held candidates.

## Latest Library additions

Inventory refreshed through 2026-10-06T12:46:18Z.

| File | Status | Reason |
|---|---|---|
| /텍스트 rpg/고딕 성당의 붉은 보석 성배.png | HELD | ID/subject mapping not established or foreign gear ID; no arbitrary replacement |
| /텍스트 rpg/고딕 사파이어 반지와 촛불의 밤.png | HELD | ID/subject mapping not established or foreign gear ID; no arbitrary replacement |
| /텍스트 rpg/고딕 성당의 신비로운 모래시계.png | HELD | ID/subject mapping not established or foreign gear ID; no arbitrary replacement |
| /텍스트 rpg/달빛 아래 고딕 도시의 후드 궁수.png | HELD | ID/subject mapping not established or foreign gear ID; no arbitrary replacement |
| /텍스트 rpg/안개 낀 폐허 정원의 슬링샷 사냥꾼.png | CONNECTED | Queue 013 x_ranged_2; unique slingshot + rose-garden subject inspected |
| /텍스트 rpg/고딕 성당의 천문 나침반.png | HELD | ID/subject mapping not established or foreign gear ID; no arbitrary replacement |
| /텍스트 rpg/달빛 아래 고딕 성녀와 황금 성스러운 지팡이.png | HELD | ID/subject mapping not established or foreign gear ID; no arbitrary replacement |
| /텍스트 rpg/달빛 아래 황금빛 대성당의 여사제.png | HELD | ID/subject mapping not established or foreign gear ID; no arbitrary replacement |
| /텍스트 rpg/금이 간 고딕 앤티크 거울.png | HELD | ID/subject mapping not established or foreign gear ID; no arbitrary replacement |
| /텍스트 rpg/비 내리는 폐허의 고독한 궁수.png | HELD | ID/subject mapping not established or foreign gear ID; no arbitrary replacement |
| /텍스트 rpg/고딕 성당의 진홍빛 연금술 병.png | HELD | ID/subject mapping not established or foreign gear ID; no arbitrary replacement |

## Legacy root artwork preserved

116 image files outside assets/: 113 byte-identical duplicates of mapped assets, two unused illustrations (guardian-card.webp, monster-4.webp), and one historical QA screenshot. None deleted or overwritten.

Duplicates: boss_00.webp, boss_01.webp, boss_02.webp, boss_03.webp, boss_04.webp, boss_05.webp, boss_06.webp, boss_07.webp, boss_rift.webp, camp-card.webp, character-0.webp, character-1.webp, character-2.webp, character-3.webp, character-4.webp, character-5.webp, class_abyss_anchor.webp, class_adam_sword.webp, class_ahab_harpoon.webp, class_blood.webp, class_card_spear.webp, class_chrono.webp, class_clock_reaver.webp, class_coffin.webp, class_fallen_dreamer.webp, class_gambler.webp, class_grave_hunter.webp, class_last_margin.webp, class_mage.webp, class_mirror_fist.webp, class_pagebreaker.webp, class_paladin.webp, class_pequod.webp, class_queen_exec.webp, class_rabbit_guard.webp, class_rogue.webp, class_rune.webp, class_sancho.webp, class_shadow.webp, class_stitch.webp, class_thorn_crown.webp, class_twin_duel.webp, class_warrior.webp, class_white_knight.webp, class_windmill.webp, enemy_01.webp, enemy_02.webp, enemy_03.webp, enemy_04.webp, enemy_05.webp, enemy_06.webp, enemy_07.webp, enemy_08.webp, enemy_09.webp, enemy_10.webp, enemy_11.webp, enemy_12.webp, enemy_13.webp, enemy_14.webp, enemy_15.webp, enemy_16.webp, enemy_17.webp, enemy_18.webp, enemy_19.webp, enemy_20.webp, enemy_21.webp, enemy_22.webp, enemy_23.webp, enemy_24.webp, enemy_25.webp, enemy_26.webp, enemy_27.webp, enemy_28.webp, enemy_29.webp, enemy_30.webp, enemy_31.webp, enemy_32.webp, enemy_mimic.webp, event_00.webp, event_01.webp, event_02.webp, event_03.webp, event_04.webp, event_05.webp, event_06.webp, event_07.webp, event_08.webp, event_09.webp, event_10.webp, event_11.webp, event_12.webp, event_13.webp, event_14.webp, event_15.webp, event_16.webp, event_17.webp, forest-banner.webp, location_00.webp, location_01.webp, location_02.webp, location_03.webp, location_04.webp, location_05.webp, location_06.webp, location_07.webp, monster-0.webp, monster-1.webp, monster-2.webp, monster-3.webp, monster-5.webp, story_adam.webp, story_ahab.webp, story_alice.webp

Unused: guardian-card.webp, monster-4.webp, qa-evidence-live-main.jpg

## Part B confirmed additions (2026-10-06)

Exact IDs come from dedicated generation context, current ID/name/lore and direct pixel inspection, not filenames or queue numbers. All nine source PNGs are 1024×1536; runtime WebPs are 640×960, quality 84. Existing 36 portraits are preserved.

| Class ID | Source | Runtime file | Bytes |
|---|---|---|---:|
| x_magic_11 | 검은 숲의 마지막 안개마법사.png | assets/class_x_magic_11.webp | 109378 |
| x_magic_10 | 거울 뒤의 연금술사.png | assets/class_x_magic_10.webp | 120112 |
| x_magic_9 | 검은 숲의 꿈결 마도사.png | assets/class_x_magic_9.webp | 152530 |
| x_magic_7 | 번개를 담은 실험실 마도사.png | assets/class_x_magic_7.webp | 129390 |
| x_magic_8 | 황금 실로 생명을 잇는 생체술사.png | assets/class_x_magic_8.webp | 139948 |
| x_magic_6 | 녹색 안경의 주술사.png | assets/class_x_magic_6.webp | 143854 |
| x_magic_1 | 검은 숲의 허수아비 학자.png | assets/class_x_magic_1.webp | 137504 |
| x_magic_2 | 별자리로 귀환길을 그리는 방랑 마도사.png | assets/class_x_magic_2.webp | 115530 |
| x_magic_5 | 장미 그림자를 빚는 환술사.png | assets/class_x_magic_5.webp | 128134 |

Current runtime: 121 files (45 class / 8 location / 33 enemy / 9 boss / 18 event / 3 story / 3 gear SVG / 2 camp/banner); 123 registry links, 1,077 null entries, assets/ orphan list empty. 69 classes still lack confirmed dedicated art. No existing artwork is replaced. All 118 runtime WebPs were directly viewed in labeled contact sheets, including every original scene/class subject. Original mappings also agree with the authoritative manifest. Three gear SVG slot fallbacks are existing generic icons; no character identity is assigned to them.

## Latest snapshot follow-up

Current runtime: 137 files, 61 class portraits, 53 unconfirmed classes, 139 registry links and 1,061 null entries. Latest Library inventory: 239 images, 7 documents, 1 folder. Exact late mapping tables are in late-image-mapping.md and newest-image-mapping.md. Sixteen additional portraits are connected, including two user-requested stronger Hidden revisions. Original lower-intensity PNGs remain preserved. The two latest crossbow/music-bow candidates are held because completed-generation IDs are not established. All 20 new source PNGs were directly reviewed; current runtime WebPs reviewed total 134. No prior runtime artwork is overwritten.

Quality exception: late Hidden portraits are 238,568 and 263,564 bytes; intricate seal/thread effects warrant retaining quality 84 at 640×960. Other new files above the approximate 150KB target preserve feathers, engraved metal or sea-current detail. Files are loaded only when needed.

## 첨부 G — 18자 권장 초과 목록과 검사 예외

30자 초과: 0개. 18자 초과 권장 감사: 72개. 의미를 유지하며 실제 모바일에서 두 줄 범위를 확인했습니다.

| 키 | 문구 | 길이 |
|---|---|---:|
| chapter.0.0.0 | 증언을 숨겨 생존자의 이름을 지킨다 | 19 |
| chapter.0.0.2 | 증언을 미끼로 명령의 출처를 추적한다 | 20 |
| chapter.0.1.0 | 뿌리를 풀어 이름을 가족에게 돌려준다 | 20 |
| chapter.0.1.1 | 이름을 복사한 뒤 뿌리를 다시 봉인한다 | 21 |
| chapter.0.1.2 | 이름을 묶은 자의 흔적부터 추적한다 | 19 |
| chapter.0.2.0 | 명령 각인을 부숴 파수꾼을 해방한다 | 19 |
| chapter.0.2.1 | 명령권을 법정의 관리 체계로 넘긴다 | 19 |
| chapter.0.2.2 | 명령 신호를 따라 배후의 근원을 추적한다 | 22 |
| chapter.1.0.0 | 피조물에게 등불 수리를 맡기고 주민과 함께 쓴다 | 26 |
| chapter.1.0.1 | 수리 과정을 등록하고 사용 규칙을 만든다 | 22 |
| chapter.1.0.2 | 등불의 힘이 어디서 오는지 추적한다 | 19 |
| chapter.1.1.0 | 재료 목록을 지우고 사람의 이름으로 되돌린다 | 24 |
| chapter.1.1.1 | 기록을 증거로 보존하고 이름을 공식 등록한다 | 24 |
| chapter.1.1.2 | 목록을 따라 사라진 사람들의 행방을 추적한다 | 24 |
| chapter.1.2.0 | 기억 삭제 기능을 멈추고 다른 동력을 찾는다 | 24 |
| chapter.1.2.1 | 삭제 범위를 제한해 종을 계속 가동한다 | 21 |
| chapter.1.2.2 | 종의 동력선을 따라 원천을 추적한다 | 19 |
| chapter.2.0.0 | 공격을 멈추고 백경의 상처부터 살핀다 | 20 |
| chapter.2.0.1 | 포획 구역을 정하고 접근을 통제한다 | 19 |
| chapter.2.1.0 | 거울을 깨고 정해진 결말을 거부한다 | 19 |
| chapter.2.1.2 | 거울 속 흔적으로 백경의 위치를 추적한다 | 22 |
| chapter.2.2.2 | 상처를 만든 사슬의 주인을 추적한다 | 19 |
| chapter.3.0.0 | 죄목에 이의를 제기하고 억울한 이를 보호한다 | 24 |
| chapter.3.0.1 | 임시 죄목을 받아들이고 절차대로 입성한다 | 22 |
| chapter.3.0.2 | 도장을 훔쳐 누가 죄목을 고쳐 쓰는지 추적한다 | 25 |
| chapter.3.1.0 | 법 밖에서도 증언을 공개해 누구나 듣게 한다 | 24 |
| chapter.3.1.1 | 법을 고쳐 증언을 공식 기록으로 인정한다 | 22 |
| chapter.3.1.2 | 지워진 예외 기록에서 조작의 흔적을 추적한다 | 24 |
| chapter.3.2.0 | 집행을 막고 증인들의 말을 먼저 듣는다 | 21 |
| chapter.3.2.1 | 재심 절차를 열어 판결을 다시 검토한다 | 21 |
| chapter.3.2.2 | 거짓 판결을 내린 권한의 출처를 추적한다 | 22 |
| chapter.4.0.0 | 여행자부터 보호하고 그림자의 정체를 살핀다 | 23 |
| chapter.4.0.1 | 안전 구역을 정하고 추적을 금지한다 | 19 |
| chapter.4.0.2 | 에이해브와 함께 그림자를 즉시 추적한다 | 21 |
| chapter.4.1.0 | 물을 나누고 원정대를 끝까지 함께 데려간다 | 23 |
| chapter.4.1.1 | 배급 규칙을 정해 생존 가능성을 높인다 | 21 |
| chapter.4.1.2 | 정찰대에 자원을 몰아 오아시스를 찾게 한다 | 23 |
| chapter.4.2.0 | 귀환할 사람의 이름부터 적어 결말을 바꾼다 | 23 |
| chapter.4.2.1 | 승선 명단을 확정해 예언을 관리한다 | 19 |
| chapter.4.2.2 | 예언서를 찢고 그것을 쓴 자를 추적한다 | 21 |
| chapter.5.0.0 | 두 기록을 모두 보존해 당사자들이 판단하게 한다 | 26 |
| chapter.5.0.1 | 증거를 비교해 하나의 공식 기록을 만든다 | 22 |
| chapter.5.0.2 | 두 기록을 충돌시킨 편집자의 흔적을 추적한다 | 24 |
| chapter.5.1.1 | 동의한 사람만 이름을 고정해 보호한다 | 20 |
| chapter.5.1.2 | 이름 고정의 저주에 틈이 있는지 추적한다 | 22 |
| chapter.5.2.0 | 누구나 자신의 문장을 덧쓸 수 있게 남긴다 | 23 |
| chapter.5.2.1 | 자유와 질서를 함께 지킬 규칙을 적는다 | 21 |
| chapter.6.0.0 | 거인에게 자신의 이름과 선택을 가르친다 | 21 |
| chapter.6.0.1 | 명령 체계를 점검하고 책임자를 지정한다 | 21 |
| chapter.6.0.2 | 명령이 내려오는 중심 장치를 추적한다 | 20 |
| chapter.6.1.0 | 자발적으로 나눈 불씨만 사용하게 바꾼다 | 21 |
| chapter.6.1.1 | 공식 규칙 아래 불씨 사용량을 제한한다 | 21 |
| chapter.6.1.2 | 회로를 끊고 최초 동력원을 추적한다 | 19 |
| chapter.6.2.0 | 명령을 해제하고 거인의 선택을 따른다 | 20 |
| chapter.6.2.1 | 거인의 동의를 받아 필요한 명령만 남긴다 | 22 |
| chapter.6.2.2 | 통제 장치를 파괴하고 창조주의 흔적을 추적한다 | 25 |
| chapter.7.0.1 | 증언을 정리해 하나의 공적 기록으로 만든다 | 23 |
| chapter.7.0.2 | 기억의 모순을 만든 조작자를 추적한다 | 20 |
| chapter.7.1.0 | 여러 결말이 동시에 존재하도록 지킨다 | 20 |
| chapter.7.1.1 | 모두가 동의할 최소한의 결말을 협상한다 | 21 |
| chapter.7.1.2 | 편집자를 쓰러뜨려 결말 강제를 끝낸다 | 20 |
| chapter.7.2.2 | 사슬을 끊고 근원을 끝까지 추적한다 | 19 |
| thread.alice.0.3 | 앨리스와 함께 증언의 원본을 확인한다 | 20 |
| thread.alice.1.3 | 앨리스와 사본을 만들어 함께 공개한다 | 20 |
| thread.adam.0.0 | 피조물에게 자기 이름을 고르게 한다 | 19 |
| thread.adam.0.3 | 피조물과 대체 심장 설계도를 확인한다 | 20 |
| bond.alice.0 | 기록상을 찾아 증언의 사본을 사 온다 | 20 |
| bond.alice.1 | 약초 잉크로 지워진 증인들의 이름을 복원한다 | 24 |
| bond.adam.0 | 봉합에 쓸 금속을 모아 새 심장틀을 만든다 | 23 |
| bond.adam.1 | 약초를 건네고 피조물이 자기 이름을 새기도록 돕는다 | 28 |
| bond.ahab.0 | 목재를 모아 남은 선원들의 구명정을 수리한다 | 24 |
| bond.ahab.1 | 항해 지도를 사서 선원들의 귀환 항로를 확보한다 | 26 |

```json
[
  {
    "term": "거울 복도의 권투사",
    "reason": "Named class/location lore refers to a mirror corridor, not the 별 없는 회랑. ID and name remain."
  },
  {
    "term": "종탑",
    "reason": "Chapter 2 exterior describes the building; 종탑의 까마귀 names the bird at that building. Device/function uses 종."
  },
  {
    "term": "사냥",
    "reason": "White-whale/faction narration and named hunters remain. No story/event action choice contains 사냥."
  },
  {
    "term": "골드",
    "reason": "Stats, prices and quantified effect/reward descriptions only; narrative choice 화폐 uses 동전."
  },
  {
    "term": "돌려주다",
    "reason": "Lexical compound (return an object/name to its owner), Korean Language Institute Q&A 316147; retained."
  },
  {
    "term": "놓아주다",
    "reason": "Lexical verb, Korean Basic Dictionary entry 45300; prescribed final action label is also explicitly frozen."
  },
  {
    "term": "물어보다",
    "reason": "Lexical compound (ask), Korean Language Institute FAQ 8606; retained."
  },
  {
    "term": "Past-tense results/history",
    "reason": "Resolved actions and saved historical logs retain past tense; active chapter entrance narration uses present tense."
  },
  {
    "term": "Legacy saved string logs",
    "reason": "Historical text is preserved in saves. Current entry scenes use canonical copy; old ending title is normalized only for display."
  }
]
```
