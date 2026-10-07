# 검은 숲의 방랑자 — A·B·C 통합 검토 기록

배포 전 기록입니다. 아래 브라우저·통합·Pages 상태는 실제 실행 결과로만 갱신합니다. 실기기는 검증하지 않았습니다.

## 1–6. 파트 A

버튼과 안내의 전/후 전체 변경은 [part-a-implementation.md](part-a-implementation.md)에 있습니다. 일반 계속·전리품·쉼터·상점·NPC·성소·비밀방·새 여정의 행동형 기본 문구를 유지했습니다. 내부 변수/주석을 제외하고 버튼·본문·토스트·로그·접근성 문자열에서 지정 금지어를 검사합니다. 새 대사 모듈을 포함한 16개 소스/셸/CSS, 1,901개 문자열 후보에서 위반 0건입니다.

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

추가 27장: class_x_magic_1/2/5/6/7/8/9/10/11/12/13/14/15/16/17.webp 및 class_x_ranged_0/1/3/4/5/6/7/8/9/10.webp. ID·이름·제작 맥락과 직접 시각 확인에 근거해 연결했습니다. 원본 PNG는 보존하고 640×960 WebP(quality 84), 109–264KB로 변환했습니다. 두 Hidden 공식 개정본의 복잡한 봉인·실 표현을 보존하려고 가장 큰 파일은 263,564바이트입니다. 150KB 권장을 넘는 그림은 품질 84를 유지하고 현재 직업/목록 지연 로딩으로 부담을 줄였습니다. 사용자 요청에 따른 최신 Hidden 개정본을 선택했고, 이전 PNG 후보도 보존했습니다. 기존 assets 112개는 바이트 변경·삭제 0건입니다. 기존 공식본의 임의 교체는 없습니다.

[image-mapping.md](image-mapping.md)에 모든 직업·지역·적·보스·이벤트·인물의 ID↔이름↔파일 표가 있습니다. 현재 134 WebP 전수를 연락 시트로 직접 열어 대상 확인했고, 3개 SVG는 공용 장비 아이콘입니다. 루트의 과거 이미지 116개는 유지했습니다(113개 중복본, 미사용 guardian-card.webp/monster-4.webp, 과거 QA 사진). assets orphan은 없습니다.

확정 못 한 추가 후보 207개는 기존 공식본 유지 또는 연결 보류로 [library-current-disposition.json](library-current-disposition.json)에 파일별 기록했습니다. 239개 이미지 후보 중 32개의 확인된 원본(이전 7장+이번 27장)을 연결했습니다. 마지막 2개 후보인 은발 석궁수/푸른 선율 궁수는 제작 완료 ID 근거가 없어 보류했습니다. 이는 runtime 이미지 누락 파일을 숨긴 수가 아닙니다. 다른 직업/인물 이미지를 대신 연결하지 않았습니다.

아직 전용 이미지 없는 직업 ID 53개:

`x_ranged_11, x_ranged_12, x_ranged_13, x_ranged_14, x_ranged_15, x_ranged_16, x_ranged_17, x_support_0, x_support_1, x_support_2, x_support_3, x_support_4, x_support_5, x_support_6, x_support_7, x_support_8, x_support_9, x_support_10, x_support_11, x_support_12, x_support_13, x_support_14, x_support_15, x_support_16, x_support_17, x_occult_0, x_occult_1, x_occult_2, x_occult_3, x_occult_4, x_occult_5, x_occult_6, x_occult_7, x_occult_8, x_occult_9, x_occult_10, x_occult_11, x_occult_12, x_occult_13, x_occult_14, x_occult_15, x_occult_16, whale_slayer, self_named, dream_guard, court_witness, alice_return, victor_heir, quixote_squire, sherwood_warden, oz_restorer, faust_release, margin_keeper`

일반 적 33개·지역 8개·보스 9개·이벤트 18개는 전부 연결되어 해당 목록에 이미지 없는 항목은 없습니다. 전용 그림 없는 선택적 중간 수문장은 지역 배경을 유지합니다. NPC Queen/Quixote는 지역 fallback을 유지합니다. Alice/Creature/Ahab에는 인물이 일치하는 기존 story 그림을 사용하고, story_adam에는 Creature와 Victor가 모두 실제로 있어 Victor 대화에도 사용할 수 있습니다. 전용 NPC 레지스트리는 여전히 6개 null입니다. 빅터 관련 메인 스토리는 같은 승인된 그림을 사용합니다.

camp-card는 캠프, forest-banner는 시작 화면입니다. 상점·성소·비밀방·선택적 중간 수문장은 전용 이미지가 없어 기존 지역 배경입니다. 깨진 URL을 만들어 채우지 않습니다.

직업 그림은 시작 선택·직업 비전서·승급 후보·장비창·현재 직업 상세에서 연결됩니다. 2:3 contain, 목록 lazy/async로 대량 preload를 피하고 미해금 Hidden 그림은 숨깁니다. 장면은 큰 cover 이미지+확장되는 어두운 텍스트 오버레이+아래 버튼입니다. 결과 그림을 유지하고 새 장면에서 교체합니다. 320px 실제 스크린샷 확인 후 Alice/Ahab의 왼쪽 인물을 살리는 object-position 보정을 별도 B 커밋으로 분리했습니다.

Service worker나 별도 캐시 저장/버전 코드는 없습니다. 모든 경로는 상대경로입니다. 로컬 137개 이미지 HTTP 200 및 파일 바이트 동일: PASS. 최종 Pages HTML 해시와 모든 이미지 HTTP/바이트 확인은 배포 뒤에 실행합니다.

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
| 최종 통합 A/B/C | NOT TESTED | 최종 빌드 회귀 실행 예정 |
| main 통합 | NOT TESTED | 게이트 통과 후 |
| Pages HTML/137개 이미지 | NOT TESTED | 배포 후 |

실행하지 않은 검증은 PASS로 표기하지 않습니다. 브라우저 console/page error, 이미지 HTTP 오류와 클리핑/overflow는 실패 조건입니다. 최초 실패 원인과 보정은 [mobile-choice-layout-fix.md](mobile-choice-layout-fix.md)에 남겼습니다.
