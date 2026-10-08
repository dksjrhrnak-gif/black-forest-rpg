# 이미지 자산 완성 계획

기준 main: `5f879371660038d516f71aab8d718fa3cb20b57e`. 실제 저장소 파일/데이터를 대조했으며 과거 수치를 복사하지 않았다.

## 분류와 범위

A: 정상 연결. B: 정확한 ID의 기존 파일이 미연결. C: 파일은 있으나 정확한 ID 불명. D: 전용 파일 없음. E: 연결 오류. 동일 해시 사본과 QA screenshot은 별도 표기한다.

직업 114종 중 71종 A / 43종 D. NPC 전용 portrait 6종 D(4명은 기존 story 그림, 2명은 지역 배경). Queen/Quixote story 2종 D. 장비 1000종은 전용 그림 D이며 3개 공용 슬롯 SVG는 정상 A이다. 공용 아이콘 사용을 개별 그림 완성으로 세지 않는다.

현재 연결 파일 147개/149매핑. 미연결 파일 중 기존 자산의 동일 사본 113개, QA 사진 1개, 정확한 ID 없는 그림 2개. B/E로 확정된 항목은 0개. root guardian-card.webp와 monster-4.webp를 직접 열었지만 이름/외형만으로 수호자·특정 적에 배정하지 않았다.

외부 라이브러리의 307개 과거 metadata는 현재 바이트 접근이 없다. 다운로드/실물 검수 없이 파일 존재나 연결 가능성을 확정하지 않는다.

## 데이터별 상태

| ID | 명칭 | 종류 | 티어/희귀도 | 분류 | 현재 전용 경로 | 목표 경로 |
|---|---|---|---|---|---|---|
| warrior | 전사 | class | 0 | A | assets/class_warrior.webp | assets/class_warrior.webp |
| rogue | 도적 | class | 0 | A | assets/class_rogue.webp | assets/class_rogue.webp |
| mage | 마도사 | class | 0 | A | assets/class_mage.webp | assets/class_mage.webp |
| paladin | 성기사 | class | Hidden | A | assets/class_paladin.webp | assets/class_paladin.webp |
| blood | 혈기사 | class | Hidden | A | assets/class_blood.webp | assets/class_blood.webp |
| rune | 룬검사 | class | Hidden | A | assets/class_rune.webp | assets/class_rune.webp |
| shadow | 그림자 군주 | class | Hidden | A | assets/class_shadow.webp | assets/class_shadow.webp |
| gambler | 운명의 도박사 | class | Hidden | A | assets/class_gambler.webp | assets/class_gambler.webp |
| chrono | 시간술사 | class | Hidden | A | assets/class_chrono.webp | assets/class_chrono.webp |
| rabbit_guard | 토끼굴 문지기 | class | 1 | A | assets/class_rabbit_guard.webp | assets/class_rabbit_guard.webp |
| pequod | 피쿼드호 갑판검사 | class | 1 | A | assets/class_pequod.webp | assets/class_pequod.webp |
| windmill | 풍차의 결투자 | class | 1 | A | assets/class_windmill.webp | assets/class_windmill.webp |
| stitch | 봉합된 검투사 | class | 1 | A | assets/class_stitch.webp | assets/class_stitch.webp |
| card_spear | 찢긴 카드 창병 | class | 1 | A | assets/class_card_spear.webp | assets/class_card_spear.webp |
| sancho | 산초의 방패지기 | class | 1 | A | assets/class_sancho.webp | assets/class_sancho.webp |
| coffin | 빈 관의 파수꾼 | class | 1 | A | assets/class_coffin.webp | assets/class_coffin.webp |
| mirror_fist | 거울 복도의 권투사 | class | 1 | A | assets/class_mirror_fist.webp | assets/class_mirror_fist.webp |
| ahab_harpoon | 광기에 찬 포경선 작살잡이 | class | 2 | A | assets/class_ahab_harpoon.webp | assets/class_ahab_harpoon.webp |
| fallen_dreamer | 기사도를 잃은 몽상가 | class | 2 | A | assets/class_fallen_dreamer.webp | assets/class_fallen_dreamer.webp |
| queen_exec | 하트 법정의 참수인 | class | 2 | A | assets/class_queen_exec.webp | assets/class_queen_exec.webp |
| adam_sword | 피조물의 자유검사 | class | 2 | A | assets/class_adam_sword.webp | assets/class_adam_sword.webp |
| twin_duel | 지킬의 이중 결투자 | class | 2 | A | assets/class_twin_duel.webp | assets/class_twin_duel.webp |
| white_knight | 백기사의 균형검 | class | 2 | A | assets/class_white_knight.webp | assets/class_white_knight.webp |
| grave_hunter | 성당 지하의 사냥꾼 | class | 2 | A | assets/class_grave_hunter.webp | assets/class_grave_hunter.webp |
| pagebreaker | 끝장을 찢는 검성 | class | 3 | A | assets/class_pagebreaker.webp | assets/class_pagebreaker.webp |
| abyss_anchor | 심연을 고정하는 닻기사 | class | 3 | A | assets/class_abyss_anchor.webp | assets/class_abyss_anchor.webp |
| clock_reaver | 멈춘 시계의 결투왕 | class | 3 | A | assets/class_clock_reaver.webp | assets/class_clock_reaver.webp |
| thorn_crown | 가시 왕관의 반역자 | class | 3 | A | assets/class_thorn_crown.webp | assets/class_thorn_crown.webp |
| last_margin | 마지막 여백의 용병왕 | class | 3 | A | assets/class_last_margin.webp | assets/class_last_margin.webp |
| x_magic_0 | 잉크 견습생 | class | 1 | A | assets/class_x_magic_0.webp | assets/class_x_magic_0.webp |
| x_magic_1 | 오즈의 허수아비 학자 | class | 1 | A | assets/class_x_magic_1.webp | assets/class_x_magic_1.webp |
| x_magic_2 | 네버랜드 별읽기 | class | 1 | A | assets/class_x_magic_2.webp | assets/class_x_magic_2.webp |
| x_magic_3 | 우물의 이름술사 | class | 1 | A | assets/class_x_magic_3.webp | assets/class_x_magic_3.webp |
| x_magic_4 | 해저 전류술사 | class | 1 | A | assets/class_x_magic_4.webp | assets/class_x_magic_4.webp |
| x_magic_5 | 장미 정원의 환술사 | class | 1 | A | assets/class_x_magic_5.webp | assets/class_x_magic_5.webp |
| x_magic_6 | 녹색 안경의 주술사 | class | 1 | A | assets/class_x_magic_6.webp | assets/class_x_magic_6.webp |
| x_magic_7 | 번개 실험실의 도전술사 | class | 2 | A | assets/class_x_magic_7.webp | assets/class_x_magic_7.webp |
| x_magic_8 | 프랑켄슈타인의 생체술사 | class | 2 | A | assets/class_x_magic_8.webp | assets/class_x_magic_8.webp |
| x_magic_9 | 그림 동화의 잠술사 | class | 2 | A | assets/class_x_magic_9.webp | assets/class_x_magic_9.webp |
| x_magic_10 | 거울 뒷면의 연금술사 | class | 2 | A | assets/class_x_magic_10.webp | assets/class_x_magic_10.webp |
| x_magic_11 | 빅토리아의 안개술사 | class | 2 | A | assets/class_x_magic_11.webp | assets/class_x_magic_11.webp |
| x_magic_12 | 노틸러스의 폭풍학자 | class | 2 | A | assets/class_x_magic_12.webp | assets/class_x_magic_12.webp |
| x_magic_13 | 오즈의 가짜 대마법사 | class | 3 | A | assets/class_x_magic_13.webp | assets/class_x_magic_13.webp |
| x_magic_14 | 별을 읽는 어린 왕자 | class | 3 | A | assets/class_x_magic_14.webp | assets/class_x_magic_14.webp |
| x_magic_15 | 시간 기계의 역행술사 | class | 3 | A | assets/class_x_magic_15.webp | assets/class_x_magic_15.webp |
| x_magic_16 | 파우스트의 계약해독자 | class | Hidden | A | assets/class_x_magic_16.webp | assets/class_x_magic_16.webp |
| x_magic_17 | 금서의 마지막 독자 | class | Hidden | A | assets/class_x_magic_17.webp | assets/class_x_magic_17.webp |
| x_ranged_0 | 셜우드의 견습 궁수 | class | 1 | A | assets/class_x_ranged_0.webp | assets/class_x_ranged_0.webp |
| x_ranged_1 | 피쿼드호 투창수 | class | 1 | A | assets/class_x_ranged_1.webp | assets/class_x_ranged_1.webp |
| x_ranged_2 | 이상한 정원의 새총잡이 | class | 1 | A | assets/class_x_ranged_2.webp | assets/class_x_ranged_2.webp |
| x_ranged_3 | 해적섬의 화승총수 | class | 1 | A | assets/class_x_ranged_3.webp | assets/class_x_ranged_3.webp |
| x_ranged_4 | 황야의 우편 저격수 | class | 1 | A | assets/class_x_ranged_4.webp | assets/class_x_ranged_4.webp |
| x_ranged_5 | 종탑의 까마귀 사수 | class | 1 | A | assets/class_x_ranged_5.webp | assets/class_x_ranged_5.webp |
| x_ranged_6 | 오즈의 양철 포수 | class | 1 | A | assets/class_x_ranged_6.webp | assets/class_x_ranged_6.webp |
| x_ranged_7 | 붉은 머리의 표적꾼 | class | 2 | A | assets/class_x_ranged_7.webp | assets/class_x_ranged_7.webp |
| x_ranged_8 | 로빈후드의 망명 궁수 | class | 2 | A | assets/class_x_ranged_8.webp | assets/class_x_ranged_8.webp |
| x_ranged_9 | 노틸러스의 수압포수 | class | 2 | A | assets/class_x_ranged_9.webp | assets/class_x_ranged_9.webp |
| x_ranged_10 | 퀴퀘그의 문신 투창수 | class | 2 | A | assets/class_x_ranged_10.webp | assets/class_x_ranged_10.webp |
| x_ranged_11 | 지옥 항로의 쇠뇌수 | class | 2 | D | 전용 파일 없음 | assets/class_x_ranged_11.webp |
| x_ranged_12 | 하멜른의 음표 사수 | class | 2 | D | 전용 파일 없음 | assets/class_x_ranged_12.webp |
| x_ranged_13 | 성벽의 불씨 투석수 | class | 3 | A | assets/class_x_ranged_13.webp | assets/class_x_ranged_13.webp |
| x_ranged_14 | 포그의 일주 저격수 | class | 3 | D | 전용 파일 없음 | assets/class_x_ranged_14.webp |
| x_ranged_15 | 백경의 망루 사냥꾼 | class | 3 | D | 전용 파일 없음 | assets/class_x_ranged_15.webp |
| x_ranged_16 | 아르고호의 황금 사수 | class | Hidden | A | assets/class_x_ranged_16.webp | assets/class_x_ranged_16.webp |
| x_ranged_17 | 수평선 너머의 명사수 | class | Hidden | A | assets/class_x_ranged_17.webp | assets/class_x_ranged_17.webp |
| x_support_0 | 구빈원 붕대지기 | class | 1 | D | 전용 파일 없음 | assets/class_x_support_0.webp |
| x_support_1 | 촛불 성당의 견습수도사 | class | 1 | D | 전용 파일 없음 | assets/class_x_support_1.webp |
| x_support_2 | 산초의 야전 취사병 | class | 1 | D | 전용 파일 없음 | assets/class_x_support_2.webp |
| x_support_3 | 작은 아씨들의 간호사 | class | 1 | D | 전용 파일 없음 | assets/class_x_support_3.webp |
| x_support_4 | 오즈의 마음 수선공 | class | 1 | D | 전용 파일 없음 | assets/class_x_support_4.webp |
| x_support_5 | 성냥의 온기지기 | class | 1 | D | 전용 파일 없음 | assets/class_x_support_5.webp |
| x_support_6 | 노틸러스의 선의 | class | 1 | D | 전용 파일 없음 | assets/class_x_support_6.webp |
| x_support_7 | 토끼굴 길안내자 | class | 2 | D | 전용 파일 없음 | assets/class_x_support_7.webp |
| x_support_8 | 피조물의 상처봉합사 | class | 2 | D | 전용 파일 없음 | assets/class_x_support_8.webp |
| x_support_9 | 노트르담의 종치유사 | class | 2 | D | 전용 파일 없음 | assets/class_x_support_9.webp |
| x_support_10 | 레미제라블의 은촛대지기 | class | 2 | D | 전용 파일 없음 | assets/class_x_support_10.webp |
| x_support_11 | 캔터베리의 순례의사 | class | 2 | D | 전용 파일 없음 | assets/class_x_support_11.webp |
| x_support_12 | 셜우드의 구호대장 | class | 2 | D | 전용 파일 없음 | assets/class_x_support_12.webp |
| x_support_13 | 백지 연맹의 기록보호자 | class | 3 | D | 전용 파일 없음 | assets/class_x_support_13.webp |
| x_support_14 | 스쿠루지의 새벽 구호가 | class | 3 | D | 전용 파일 없음 | assets/class_x_support_14.webp |
| x_support_15 | 천일야화의 생명 이야기꾼 | class | 3 | D | 전용 파일 없음 | assets/class_x_support_15.webp |
| x_support_16 | 돌아온 성냥불의 성녀 | class | Hidden | D | 전용 파일 없음 | assets/class_x_support_16.webp |
| x_support_17 | 유리 심장의 재봉사 | class | Hidden | A | assets/class_x_support_17.webp | assets/class_x_support_17.webp |
| x_occult_0 | 거울 장터의 골동품상 | class | 1 | D | 전용 파일 없음 | assets/class_x_occult_0.webp |
| x_occult_1 | 허클베리의 강길잡이 | class | 1 | D | 전용 파일 없음 | assets/class_x_occult_1.webp |
| x_occult_2 | 몽테크리스토의 장부지기 | class | 1 | D | 전용 파일 없음 | assets/class_x_occult_2.webp |
| x_occult_3 | 드라큘라의 주간 문지기 | class | 1 | D | 전용 파일 없음 | assets/class_x_occult_3.webp |
| x_occult_4 | 걸리버의 축척기사 | class | 1 | D | 전용 파일 없음 | assets/class_x_occult_4.webp |
| x_occult_5 | 도리언의 초상 관리인 | class | 1 | D | 전용 파일 없음 | assets/class_x_occult_5.webp |
| x_occult_6 | 보물섬의 암호해독자 | class | 1 | D | 전용 파일 없음 | assets/class_x_occult_6.webp |
| x_occult_7 | 시간 여행의 관측자 | class | 2 | D | 전용 파일 없음 | assets/class_x_occult_7.webp |
| x_occult_8 | 셜록의 흔적 수집가 | class | 2 | D | 전용 파일 없음 | assets/class_x_occult_8.webp |
| x_occult_9 | 오디세우스의 매듭꾼 | class | 2 | D | 전용 파일 없음 | assets/class_x_occult_9.webp |
| x_occult_10 | 카르밀라의 야간 감시자 | class | 2 | D | 전용 파일 없음 | assets/class_x_occult_10.webp |
| x_occult_11 | 체셔의 미소 밀수꾼 | class | 2 | D | 전용 파일 없음 | assets/class_x_occult_11.webp |
| x_occult_12 | 해저 이만리의 유물잠수사 | class | 2 | D | 전용 파일 없음 | assets/class_x_occult_12.webp |
| x_occult_13 | 동물 재판의 증언 도둑 | class | 3 | A | assets/class_x_occult_13.webp | assets/class_x_occult_13.webp |
| x_occult_14 | 세헤라자드의 결말 협상가 | class | 3 | D | 전용 파일 없음 | assets/class_x_occult_14.webp |
| x_occult_15 | 지옥문 앞의 길동무 | class | Hidden | A | assets/class_x_occult_15.webp | assets/class_x_occult_15.webp |
| x_occult_16 | 찢어진 장의 경계인 | class | Hidden | A | assets/class_x_occult_16.webp | assets/class_x_occult_16.webp |
| adventurer | 모험가 | class | 0 | A | assets/class_adventurer.webp | assets/class_adventurer.webp |
| hunter | 사냥꾼 | class | 0 | A | assets/class_hunter.webp | assets/class_hunter.webp |
| guardian | 수호자 | class | 0 | A | assets/class_guardian.webp | assets/class_guardian.webp |
| whale_slayer | 백경 살해자 | class | 3 | D | 전용 파일 없음 | assets/class_whale_slayer.webp |
| self_named | 스스로 이름 붙인 검왕 | class | 3 | A | assets/class_self_named.webp | assets/class_self_named.webp |
| dream_guard | 라만차의 꿈 수호자 | class | 3 | A | assets/class_dream_guard.webp | assets/class_dream_guard.webp |
| court_witness | 하트 법정의 증언기사 | class | 3 | A | assets/class_court_witness.webp | assets/class_court_witness.webp |
| alice_return | 앨리스의 귀환 안내자 | class | 2 | D | 전용 파일 없음 | assets/class_alice_return.webp |
| victor_heir | 빅터의 속죄 봉합사 | class | 2 | D | 전용 파일 없음 | assets/class_victor_heir.webp |
| quixote_squire | 라만차의 맹세 종자 | class | 1 | D | 전용 파일 없음 | assets/class_quixote_squire.webp |
| sherwood_warden | 셜우드의 숲 파수장 | class | 3 | D | 전용 파일 없음 | assets/class_sherwood_warden.webp |
| oz_restorer | 오즈의 심장 복원사 | class | 3 | D | 전용 파일 없음 | assets/class_oz_restorer.webp |
| faust_release | 파우스트의 계약 파기자 | class | 3 | D | 전용 파일 없음 | assets/class_faust_release.webp |
| margin_keeper | 경계의 여백 수호자 | class | 3 | D | 전용 파일 없음 | assets/class_margin_keeper.webp |
| alice | 앨리스 | npc | — | D | 전용 파일 없음 | assets/npc_alice.webp |
| queen | 하트 여왕 | npc | — | D | 전용 파일 없음 | assets/npc_queen.webp |
| creature | 피조물 | npc | — | D | 전용 파일 없음 | assets/npc_creature.webp |
| victor | 빅터 | npc | — | D | 전용 파일 없음 | assets/npc_victor.webp |
| ahab | 에이해브 | npc | — | D | 전용 파일 없음 | assets/npc_ahab.webp |
| quixote | 돈키호테 | npc | — | D | 전용 파일 없음 | assets/npc_quixote.webp |
| queen | 하트 여왕 | story | — | D | 전용 파일 없음 | assets/story_queen.webp |
| quixote | 돈키호테 | story | — | D | 전용 파일 없음 | assets/story_quixote.webp |

## 장비 제작 명세

1000개 개별 장비의 ID·명칭·종류·고정/무작위 희귀도·현재 공용 아이콘·파일 존재·실제 UI 사용·목표 경로·독립 생성 프롬프트는 ASSET_COMPLETION_DATA.json의 records(kind=item)에 전수 기록했다. 무작위 희귀도 장비는 특정 등급으로 고정해 그리지 않는다. 제안 경로는 실제 존재하는 파일이 아니다.

## 제작 우선순위

1. 소규모 확인 배치: x_support_16(설정/이름/역할 명확한 히든 직업), w0(쇠 장검, 무기-검). 기존 미연결 후보에 ID 근거가 없어 새로 독립 제작한다.
2. 남은 직업은 모든 ID별 prompt를 준비하고 T1 실용적/ T2 전문 도구/ T3 정교한 복식/Hidden 초자연 연출을 구분한다.
3. NPC/스토리는 기존 인물 외형의 연속성 검토 후 진행. Queen/Quixote 외형 확정은 검토 항목이다.
4. 장비는 데이터 정의가 명확한 항목부터 작은 배치로 검수하고 개별 ID에만 연결. 외부 후보 그림은 제작 ID 근거를 먼저 확보한다.

생성 → 원본 검수 → 2:3 확인 → WebP 배포 파일 → 해당 ID만 연결 → 브라우저 decode/UI/숨김 조건/세이브 보존 검증. 생성되지 않은 나머지는 계속 D로 유지한다.
