# 직업 개성 검토·승인 제안 — Phase O

**제안 문서이며 실행 데이터는 변경하지 않았다.** 전수 정의는 BALANCE_AUDIT.md와 gameplay/data-audit.json, 직업별 실제 시험은 gameplay/combat.json의 byJob/records에 있다. 114종의 이름 수와 독립 전투 방식 수는 다르다.

현재 확장 직업은 같은 계열의 스킬 템플릿과 두 패시브 조합을 많이 공유한다. support의 HP6% 회복, ranged의 관통, occult의 약화, magic의 마법 피해는 차이를 만들지만 계열 안에서 문학 모티프가 행동 선택으로 이어지는 정도는 약하다. 기본 스탯·티어·역할을 통제하지 않은 전투 순위로 너프 대상을 정하지 않는다. 실제 성장 경로의 선택 가능한 경쟁 직업끼리 비교하는 추가 시험이 필요하다.

| 우선 | 승인 대상 / 실제 ID | 의도와 적용 위치 | 기대 영향 / 위험 | 승인 후 검증 |
|---|---|---|---|---|
| P1 | 토끼굴 문지기 rabbit_guard, 하트 법정의 참수인 queen_exec | class-tree/effects의 기존 방어 후 집중·처형 효과를 이 두 모티프의 주행동으로 구분. 기존 공격/방어 두 행동을 활용하는 설계안 | 강공 방어와 처형 타이밍으로 역할 구분. 모든 후손의 공격력·승률이 바뀔 수 있음 | 형제 직업 동일 장비/동일레벨 비교, 숙련/처형 임계치/수령 전 HP/치명 RNG 회귀 |
| P1 | 잉크 견습생 x_magic_0, 시간 기계의 역행술사 x_magic_15 | 마법 계열 안에서 즉시 피해 vs 다음 턴 보호의 선택 차이를 먼저 설계. 이름만 다른 스킬 추가는 피함 | 버튼과 툴팁 및 스킬 해석에 영향. 현 스킬 효과와 교체 여부 승인 필요 | MP0/최대MP·도트·기절·적 heal/charge·저장된 전투 재개 |
| P2 | 피쿼드호 갑판검사 pequod, 에이해브 작살잡이 ahab_harpoon, 심연의 닻기사 abyss_anchor | ranged의 관통/표식/장기전 역할 후보. 동료 에이해브 지원과 중복 증폭 제한 설계 | 문학적 집착/포경 모티프를 전투에 연결. 보스 단축 및 과도한 누적 위험 | 보스/정예/회랑 16턴 이상, 지원 유무·지속효과 저장·상한 |
| P2 | 돌아온 성냥불의 성녀 x_support_16, 유리 심장의 재봉사 x_support_17 | 현재 회복 템플릿을 유지한 채 낮은 HP 구제 vs 방어 자원 운용으로 역할을 분리하는 후보 | 이미지·문학 모티프와 설명/효과의 정합성. 회복 루프나 풀HP 스킬 낭비 위험 | 풀HP/저HP·MP 고갈·기절·방어 루프·독립 승률/시간/물약 |
| P2 | 지옥문 앞의 길동무 x_occult_15, 찢어진 장의 경계인 x_occult_16 | 약화 지속/대가가 있는 피해 운용의 분리 후보 | 히든이 무조건 상위가 되는 문제와 영구 상태 증가 위험 | 해금14/음성 조건·히든 경로 잠금·저장 마이그레이션·가시 반사 |
| P3 | warrior/rogue/mage/adventurer/hunter/guardian | 첫30전의 정책 차이를 우선 조사하고 직업 선택 설명을 실측에 맞춰 개선하는 후보 | 시작 직업 강제 우열 감소. 초반 난이도 전체에 영향 | 자연6직업×다중시드·초반 사망/스킬사용/전직 시점·물약 소비 |

아직 승인받을 수치안으로 확정하지 않았다. 첫 단계는 전투 행동별 기능을 정하고, 현재 평균 행동/HP 범위 안에서 목표를 합의한 뒤 소규모 대상에만 구현하는 것이다. 피해 공식, 방어 무시, MP 회복, 전직 조건, 스킬 버튼 추가는 개별 변경 PR이 필요하다.

## 모든 직업의 현재 차별 요소

아래는 실제효과의 타입 목록이다. 같은 타입 조합이라도 값과 기본스탯이 다를 수 있어 원본 JSON/전투기록을 함께 확인한다. 새로운 효과를 이미 구현한 것으로 읽지 않는다.

| ID / 명칭 | 역할 | 숙련 행동 | 실제 효과 타입 |
|---|---|---|---|
| warrior / 전사 | 균형 | defend | skillPower, skillStun |
| rogue / 도적 | 균형 | critical | skillPower, skillDotLevel, critBase |
| mage / 마도사 | 균형 | skill | skillPower, skillMagic, skillDotLevel |
| paladin / 성기사 | 특수 전투 | attack | skillPower, skillHeal |
| blood / 혈기사 | 특수 전투 | attack | skillPower, skillLeech, lowHealthAttack |
| rune / 룬검사 | 특수 전투 | attack | skillPower, skillMagic, skillWeak |
| shadow / 그림자 군주 | 특수 전투 | attack | skillPower, skillExecution, dodgeBase |
| gambler / 운명의 도박사 | 특수 전투 | attack | skillPower, luckBase |
| chrono / 시간술사 | 특수 전투 | attack | skillPower, skillMagic, skillStun |
| rabbit_guard / 토끼굴 문지기 | 근접 전투 | defend | defendMana, skillPower |
| pequod / 피쿼드호 갑판검사 | 근접 전투 | attack | damageMultiplier, skillPower |
| windmill / 풍차의 결투자 | 근접 전투 | defend | guardNext, skillPower |
| stitch / 봉합된 검투사 | 근접 전투 | attack | healKill, skillPower |
| card_spear / 찢긴 카드 창병 | 근접 전투 | attack | dodgeBonus, skillPower |
| sancho / 산초의 방패지기 | 근접 전투 | defend | guardHeal, skillPower |
| coffin / 빈 관의 파수꾼 | 근접 전투 | attack | thornsBonus, skillPower |
| mirror_fist / 거울 복도의 권투사 | 근접 전투 | attack | damageMultiplier, skillPower |
| ahab_harpoon / 광기에 찬 포경선 작살잡이 | 근접 전투 | attack | damageMultiplier, skillPower |
| fallen_dreamer / 기사도를 잃은 몽상가 | 근접 전투 | attack | damageMultiplier, skillPower |
| queen_exec / 하트 법정의 참수인 | 근접 전투 | attack | damageMultiplier, skillPower |
| adam_sword / 피조물의 자유검사 | 근접 전투 | attack | leechBonus, skillPower |
| twin_duel / 지킬의 이중 결투자 | 근접 전투 | attack | combo, skillPower |
| white_knight / 백기사의 균형검 | 근접 전투 | attack | skillSaver, skillPower |
| grave_hunter / 성당 지하의 사냥꾼 | 근접 전투 | attack | damageMultiplier, skillPower |
| pagebreaker / 끝장을 찢는 검성 | 근접 전투 | attack | normalPierce, skillPower |
| abyss_anchor / 심연을 고정하는 닻기사 | 근접 전투 | attack | potionBoost, skillPower |
| clock_reaver / 멈춘 시계의 결투왕 | 근접 전투 | attack | critBonus, skillPower |
| thorn_crown / 가시 왕관의 반역자 | 근접 전투 | attack | skillDot, skillPower |
| last_margin / 마지막 여백의 용병왕 | 근접 전투 | attack | goldBonus, skillPower |
| x_magic_0 / 잉크 견습생 | 주문과 집중 | defend | defendMana, healKill, skillPower, skillMagic |
| x_magic_1 / 오즈의 허수아비 학자 | 주문과 집중 | skill | damageMultiplier, dodgeBonus, skillPower, skillMagic |
| x_magic_2 / 네버랜드 별읽기 | 주문과 집중 | defend | guardNext, guardHeal, skillPower, skillMagic |
| x_magic_3 / 우물의 이름술사 | 주문과 집중 | skill | healKill, thornsBonus, skillPower, skillMagic |
| x_magic_4 / 해저 전류술사 | 주문과 집중 | skill | dodgeBonus, damageMultiplier, skillPower, skillMagic |
| x_magic_5 / 장미 정원의 환술사 | 주문과 집중 | defend | guardHeal, damageMultiplier, skillPower, skillMagic |
| x_magic_6 / 녹색 안경의 주술사 | 주문과 집중 | skill | thornsBonus, damageMultiplier, skillPower, skillMagic |
| x_magic_7 / 번개 실험실의 도전술사 | 주문과 집중 | skill | damageMultiplier, skillPower, skillMagic |
| x_magic_8 / 프랑켄슈타인의 생체술사 | 주문과 집중 | skill | damageMultiplier, leechBonus, skillPower, skillMagic |
| x_magic_9 / 그림 동화의 잠술사 | 주문과 집중 | skill | damageMultiplier, skillSaver, skillPower, skillMagic |
| x_magic_10 / 거울 뒷면의 연금술사 | 주문과 집중 | skill | damageMultiplier, skillPower, skillMagic |
| x_magic_11 / 빅토리아의 안개술사 | 주문과 집중 | skill | leechBonus, normalPierce, skillPower, skillMagic |
| x_magic_12 / 노틸러스의 폭풍학자 | 주문과 집중 | skill | skillSaver, potionBoost, skillPower, skillMagic |
| x_magic_13 / 오즈의 가짜 대마법사 | 주문과 집중 | skill | damageMultiplier, critBonus, skillPower, skillMagic |
| x_magic_14 / 별을 읽는 어린 왕자 | 주문과 집중 | skill | normalPierce, goldBonus, skillPower, skillMagic |
| x_magic_15 / 시간 기계의 역행술사 | 주문과 집중 | defend | potionBoost, defendMana, skillPower, skillMagic |
| x_magic_16 / 파우스트의 계약해독자 | 주문과 집중 | skill | critBonus, damageMultiplier, skillPower, skillMagic |
| x_magic_17 / 금서의 마지막 독자 | 주문과 집중 | defend | goldBonus, guardNext, skillPower, skillMagic |
| x_ranged_0 / 셜우드의 견습 궁수 | 조준과 추적 | defend | defendMana, thornsBonus, skillPower, skillPierce |
| x_ranged_1 / 피쿼드호 투창수 | 조준과 추적 | critical | damageMultiplier, skillPower, skillPierce |
| x_ranged_2 / 이상한 정원의 새총잡이 | 조준과 추적 | defend | guardNext, damageMultiplier, skillPower, skillPierce |
| x_ranged_3 / 해적섬의 화승총수 | 조준과 추적 | critical | healKill, damageMultiplier, skillPower, skillPierce |
| x_ranged_4 / 황야의 우편 저격수 | 조준과 추적 | critical | dodgeBonus, damageMultiplier, skillPower, skillPierce |
| x_ranged_5 / 종탑의 까마귀 사수 | 조준과 추적 | defend | guardHeal, leechBonus, skillPower, skillPierce |
| x_ranged_6 / 오즈의 양철 포수 | 조준과 추적 | critical | thornsBonus, skillSaver, skillPower, skillPierce |
| x_ranged_7 / 붉은 머리의 표적꾼 | 조준과 추적 | critical | damageMultiplier, skillPower, skillPierce |
| x_ranged_8 / 로빈후드의 망명 궁수 | 조준과 추적 | critical | damageMultiplier, normalPierce, skillPower, skillPierce |
| x_ranged_9 / 노틸러스의 수압포수 | 조준과 추적 | critical | damageMultiplier, potionBoost, skillPower, skillPierce |
| x_ranged_10 / 퀴퀘그의 문신 투창수 | 조준과 추적 | critical | damageMultiplier, critBonus, skillPower, skillPierce |
| x_ranged_11 / 지옥 항로의 쇠뇌수 | 조준과 추적 | critical | leechBonus, goldBonus, skillPower, skillPierce |
| x_ranged_12 / 하멜른의 음표 사수 | 조준과 추적 | defend | skillSaver, defendMana, skillPower, skillPierce |
| x_ranged_13 / 성벽의 불씨 투석수 | 조준과 추적 | critical | damageMultiplier, skillPower, skillPierce |
| x_ranged_14 / 포그의 일주 저격수 | 조준과 추적 | defend | normalPierce, guardNext, skillPower, skillPierce |
| x_ranged_15 / 백경의 망루 사냥꾼 | 조준과 추적 | critical | potionBoost, healKill, skillPower, skillPierce |
| x_ranged_16 / 아르고호의 황금 사수 | 조준과 추적 | critical | critBonus, dodgeBonus, skillPower, skillPierce |
| x_ranged_17 / 수평선 너머의 명사수 | 조준과 추적 | defend | goldBonus, guardHeal, skillPower, skillPierce |
| x_support_0 / 구빈원 붕대지기 | 회복과 방어 | defend | defendMana, damageMultiplier, skillPower, skillHeal |
| x_support_1 / 촛불 성당의 견습수도사 | 회복과 방어 | attack | damageMultiplier, skillPower, skillHeal |
| x_support_2 / 산초의 야전 취사병 | 회복과 방어 | defend | guardNext, leechBonus, skillPower, skillHeal |
| x_support_3 / 작은 아씨들의 간호사 | 회복과 방어 | attack | healKill, skillSaver, skillPower, skillHeal |
| x_support_4 / 오즈의 마음 수선공 | 회복과 방어 | attack | dodgeBonus, damageMultiplier, skillPower, skillHeal |
| x_support_5 / 성냥의 온기지기 | 회복과 방어 | defend | guardHeal, normalPierce, skillPower, skillHeal |
| x_support_6 / 노틸러스의 선의 | 회복과 방어 | attack | thornsBonus, potionBoost, skillPower, skillHeal |
| x_support_7 / 토끼굴 길안내자 | 회복과 방어 | attack | damageMultiplier, critBonus, skillPower, skillHeal |
| x_support_8 / 피조물의 상처봉합사 | 회복과 방어 | attack | damageMultiplier, goldBonus, skillPower, skillHeal |
| x_support_9 / 노트르담의 종치유사 | 회복과 방어 | defend | damageMultiplier, defendMana, skillPower, skillHeal |
| x_support_10 / 레미제라블의 은촛대지기 | 회복과 방어 | attack | damageMultiplier, skillPower, skillHeal |
| x_support_11 / 캔터베리의 순례의사 | 회복과 방어 | defend | leechBonus, guardNext, skillPower, skillHeal |
| x_support_12 / 셜우드의 구호대장 | 회복과 방어 | attack | skillSaver, healKill, skillPower, skillHeal |
| x_support_13 / 백지 연맹의 기록보호자 | 회복과 방어 | attack | damageMultiplier, dodgeBonus, skillPower, skillHeal |
| x_support_14 / 스쿠루지의 새벽 구호가 | 회복과 방어 | defend | normalPierce, guardHeal, skillPower, skillHeal |
| x_support_15 / 천일야화의 생명 이야기꾼 | 회복과 방어 | attack | potionBoost, thornsBonus, skillPower, skillHeal |
| x_support_16 / 돌아온 성냥불의 성녀 | 회복과 방어 | attack | critBonus, damageMultiplier, skillPower, skillHeal |
| x_support_17 / 유리 심장의 재봉사 | 회복과 방어 | attack | goldBonus, damageMultiplier, skillPower, skillHeal |
| x_occult_0 / 거울 장터의 골동품상 | 기회와 계약 | defend | defendMana, skillSaver, skillPower, skillWeak |
| x_occult_1 / 허클베리의 강길잡이 | 기회와 계약 | skill | damageMultiplier, skillPower, skillWeak |
| x_occult_2 / 몽테크리스토의 장부지기 | 기회와 계약 | defend | guardNext, normalPierce, skillPower, skillWeak |
| x_occult_3 / 드라큘라의 주간 문지기 | 기회와 계약 | skill | healKill, potionBoost, skillPower, skillWeak |
| x_occult_4 / 걸리버의 축척기사 | 기회와 계약 | skill | dodgeBonus, critBonus, skillPower, skillWeak |
| x_occult_5 / 도리언의 초상 관리인 | 기회와 계약 | defend | guardHeal, goldBonus, skillPower, skillWeak |
| x_occult_6 / 보물섬의 암호해독자 | 기회와 계약 | defend | thornsBonus, defendMana, skillPower, skillWeak |
| x_occult_7 / 시간 여행의 관측자 | 기회와 계약 | skill | damageMultiplier, skillPower, skillWeak |
| x_occult_8 / 셜록의 흔적 수집가 | 기회와 계약 | defend | damageMultiplier, guardNext, skillPower, skillWeak |
| x_occult_9 / 오디세우스의 매듭꾼 | 기회와 계약 | skill | damageMultiplier, healKill, skillPower, skillWeak |
| x_occult_10 / 카르밀라의 야간 감시자 | 기회와 계약 | skill | damageMultiplier, dodgeBonus, skillPower, skillWeak |
| x_occult_11 / 체셔의 미소 밀수꾼 | 기회와 계약 | defend | leechBonus, guardHeal, skillPower, skillWeak |
| x_occult_12 / 해저 이만리의 유물잠수사 | 기회와 계약 | skill | skillSaver, thornsBonus, skillPower, skillWeak |
| x_occult_13 / 동물 재판의 증언 도둑 | 기회와 계약 | skill | damageMultiplier, skillPower, skillWeak |
| x_occult_14 / 세헤라자드의 결말 협상가 | 기회와 계약 | skill | normalPierce, damageMultiplier, skillPower, skillWeak |
| x_occult_15 / 지옥문 앞의 길동무 | 기회와 계약 | skill | potionBoost, damageMultiplier, skillPower, skillWeak |
| x_occult_16 / 찢어진 장의 경계인 | 기회와 계약 | skill | critBonus, damageMultiplier, skillPower, skillWeak |
| adventurer / 모험가 | 균형 | defend | healKill, defendMana, skillPower |
| hunter / 사냥꾼 | 조준과 추적 | critical | damageMultiplier, skillPower, skillPierce |
| guardian / 수호자 | 회복과 방어 | defend | guardHeal, skillPower, skillHeal |
| whale_slayer / 백경 살해자 | 근접 전투 | attack | damageMultiplier, normalPierce, skillPower |
| self_named / 스스로 이름 붙인 검왕 | 근접 전투 | attack | leechBonus, healKill, skillPower |
| dream_guard / 라만차의 꿈 수호자 | 근접 전투 | defend | guardNext, guardHeal, skillPower |
| court_witness / 하트 법정의 증언기사 | 근접 전투 | defend | damageMultiplier, defendMana, skillPower |
| alice_return / 앨리스의 귀환 안내자 | 기회와 계약 | skill | dodgeBonus, skillSaver, skillPower, skillWeak |
| victor_heir / 빅터의 속죄 봉합사 | 회복과 방어 | attack | healKill, thornsBonus, skillPower, skillHeal |
| quixote_squire / 라만차의 맹세 종자 | 근접 전투 | defend | guardNext, defendMana, skillPower |
| sherwood_warden / 셜우드의 숲 파수장 | 조준과 추적 | critical | damageMultiplier, skillPower, skillPierce |
| oz_restorer / 오즈의 심장 복원사 | 회복과 방어 | attack | potionBoost, skillSaver, skillPower, skillHeal |
| faust_release / 파우스트의 계약 파기자 | 주문과 집중 | defend | skillDot, defendMana, skillPower, skillMagic |
| margin_keeper / 경계의 여백 수호자 | 기회와 계약 | skill | normalPierce, dodgeBonus, skillPower, skillWeak |
