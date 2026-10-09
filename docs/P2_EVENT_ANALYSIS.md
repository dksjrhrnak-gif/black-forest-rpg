# P2 지역·이벤트 분석

시작 main fa059638b48a38e4f0c10dcb7f9699ab5234c2be. P1 문서와 전체8지역/18이벤트/1000장비 데이터를 먼저 읽었다. 원본 비용·보상·성공률은 p2/baseline-analysis.json, 현재 전수는 p2/event-analysis.json.

## 지역별 구조

| 지역 | 이전 이벤트 수 | P2 지역 전용 | 조건/반복 |
|---|---:|---|---|
| 0 검은 숲 | 18 | 없음 | 공용18·최근6 제외 |
| 1 침묵의 마을 | 18 | 종 아래 남은 증언 | 이야기/해당지역/챕터경험/미기록·9번슬롯·모험당1회 |
| 2 유리 늪 | 18 | 없음 | 공용18·최근6 제외 |
| 3 잊힌 왕성 | 18 | 없음 | 공용18·최근6 제외 |
| 4 붉은 사막 | 18 | 모래에 묻힌 물통 | 이야기/해당지역/챕터경험/미기록·9번슬롯·모험당1회 |
| 5 달의 도서관 | 18 | 여백의 빌린 이름 | 이야기/해당지역/챕터경험/미기록·9번슬롯·모험당1회 |
| 6 공허의 용광로 | 18 | 없음 | 공용18·최근6 제외 |
| 7 새벽 없는 왕좌 | 18 | 없음 | 공용18·최근6 제외 |

기존은8지역의18/18 이벤트ID·선택·보상·확률이 같았다. 지역별 고정이야기/NPC/쉼터, 2지역 중간 수문장 외 랜덤 사건의 차이는 작았다. 모든 기존 이벤트는2선택, 비용 선지불, 실패 결과 명시, 기본EXP12가 공통이다. 신규는3선택이다.

## 기존18개 전수

| ID / 사건 | 선택 / 비용 | 성공률·보상 / 실패 | 해석 |
|---|---|---|---|
| 0 부상당한 사냥꾼 | 물약을 건넨다 (물약 1)<br>지름길을 물어본다 (없음) | 100% 자비 1 / 골드 22 / 없음<br>100% 광석 3 / 없음 | same event and two-choice structure in all8 regions |
| 1 검은 제단 | 피를 바친다 (HP 10)<br>약초만 챙긴다 (없음) | 80% 골드 40 / 광석 4 / 약초 2<br>100% 약초 3 / 없음 | same event and two-choice structure in all8 regions |
| 2 돌아갈 곳 | 함께 집을 찾는다 (없음)<br>동전을 받는다 (없음) | 100% 자비 1 / HP 회복 14 / 없음<br>100% 골드 24 / 없음 | full vitals cap recovery; possible low late-game value; same event and two-choice structure in all8 regions |
| 3 무너진 광산 | 깊이 내려간다 (HP 6)<br>입구에서 채굴한다 (없음) | 65% 광석 9 / 광석 2<br>100% 광석 3 / 없음 | same event and two-choice structure in all8 regions |
| 4 수상한 지도 | 지도를 산다 (골드 18)<br>지도를 외우고 떠난다 (없음) | 40% 인장 1 / 비밀 1 / 목재 4<br>100% EXP 10 / 없음 | same event and two-choice structure in all8 regions |
| 5 까마귀의 거래 | 동전을 던진다 (골드 12)<br>먹이를 찾아 준다 (없음) | 55% 장비 elite / 약초 3<br>100% 자비 1 / 목재 2 / 없음 | random slot may be immediately sold; same event and two-choice structure in all8 regions |
| 6 부서진 대장간 | 화로에 광석을 넣는다 (광석 3)<br>도구를 회수한다 (없음) | 75% 장비 elite / 제작 1 / 광석 2<br>100% 광석 3 / 목재 3 / 없음 | random slot may be immediately sold; same event and two-choice structure in all8 regions |
| 7 달빛 우물 | 목소리에 답한다 (없음)<br>동전을 던진다 (골드 5) | 70% MP 회복 99 / 자비 1 / HP 회복 10<br>25% 인장 1 / HP 회복 20 | full vitals cap recovery; possible low late-game value; same event and two-choice structure in all8 regions |
| 8 이름 없는 묘지 | 망자를 위해 기도한다 (없음)<br>봉인된 관을 조사한다 (HP 8) | 100% 자비 1 / 약초 3 / 없음<br>50% 장비 secret / 골드 20 | random slot may be immediately sold; same event and two-choice structure in all8 regions |
| 9 운명의 탁자 | 주사위를 굴린다 (골드 15)<br>탁자를 지나친다 (없음) | 40% 골드 55 / 보급함 1 / 광석 2<br>100% EXP 12 / 없음 | same event and two-choice structure in all8 regions |
| 10 도망친 견습생 | 추격자를 따돌려 준다 (HP 5)<br>책을 돌려보낸다 (없음) | 60% 자비 1 / 인장 1 / 자비 1 / 약초 4<br>100% 골드 20 / EXP 12 / 없음 | same event and two-choice structure in all8 regions |
| 11 잠든 용의 둥지 | 무기에 손을 뻗는다 (HP 12)<br>비늘만 줍는다 (없음) | 50% 장비 boss / 광석 5<br>100% 광석 4 / 없음 | random slot may be immediately sold; same event and two-choice structure in all8 regions |
| 12 유리 다리 | 아래로 내려간다 (HP 7)<br>다리를 수리한다 (목재 3) | 70% 골드 40 / 보급함 1 / 목재 5<br>100% 자비 1 / EXP 18 / 없음 | same event and two-choice structure in all8 regions |
| 13 얼어붙은 시간 | 틈을 만져 본다 (없음)<br>순간을 기록한다 (없음) | 35% 인장 1 / 비밀 1 / MP 회복 8 / EXP 15<br>100% EXP 20 / 약초 2 / 없음 | same event and two-choice structure in all8 regions |
| 14 별의 낙하 | 맨손으로 꺼낸다 (HP 10)<br>식을 때까지 기다린다 (없음) | 65% 장비 secret / 광석 5<br>100% 광석 5 / 없음 | random slot may be immediately sold; same event and two-choice structure in all8 regions |
| 15 마지막 장사 | 등불을 나눠 준다 (목재 3)<br>짐을 산다 (골드 20) | 100% 자비 1 / 물약 2 / 없음<br>100% 장비 elite / 없음 | random slot may be immediately sold; same event and two-choice structure in all8 regions |
| 16 숲의 연회 | 잔을 든다 (없음)<br>이야기를 듣는다 (없음) | 60% HP 회복 99 / MP 회복 99 / 골드 18<br>100% EXP 20 / 자비 1 / 없음 | full vitals cap recovery; possible low late-game value; same event and two-choice structure in all8 regions |
| 17 닫히는 균열 | 몸을 던진다 (HP 8)<br>흔적을 모은다 (없음) | 70% 인장 1 / 비밀 1 / 광석 5 / 약초 4<br>100% 광석 4 / EXP 12 / 없음 | same event and two-choice structure in all8 regions |

회복은 상한HP/MP에서0이 되고, 단순 자원 수량은 후반에 상대적으로 작아진다. 위험형 광산/대장간/둥지/별 파편은 실패 시 재료를 남기지만 장비 슬롯이 무작위라 필요한 장비가 아닐 수 있다. 모든 상황에서 무조건 정답인 선택은 자원 벡터만으로 확정하지 않았다. 물약/HP/골드 비용과 자비·인장·회복·장비는 서로 다른 목적이다. 동일한 두 선택 구조가 반복되고, 기록되지 않은 선택이 후속 문장에 재등장하지 않는 점을 우선 개선했다. 기존18개의 수치와 선택은 유지했다.

## 구현3개

- 침묵의 마을 「종 아래 남은 증언」: 앞선 등불 공동 사용 선택으로 낭독 성공률65→85%; 반사/회피 장비로 추적60→80%. 골드·HP 위험과 약초/MP·방어구·광석 사이 선택. 실패도 광석/목재와 다른 후속 문장.
- 붉은 사막 「모래에 묻힌 물통」: 물약을 나눠 재료로 바꾸거나 HP6을 쓰고 전갈과 싸우거나 무료로 MP/광석을 얻는다. 앞선 물 나눔 선택은 약초2→3, 방어3행동/회피 장비는 첫 공격 약화. 전투 승패는 실제 전투·보상/죽음 체계로 처리한다.
- 달의 도서관 「여백의 빌린 이름」: MP4를 써 장신구에 도전, 약초2로 회복, 무료 사본/EXP·목재 선택. 앞선 낭독/물약 공유 기록으로70→90%; MP 장비는 봉합 회복20→28; 완전HP/MP에서는 회복 대신광석4(집중장비5); 명부 사본은 무료 선택에MP4 추가. 실패는약초3와 미해결 이름을 옮기는 반응.

최소3지역, 다른 비용/행동/보상. 기존 챕터 원문·선택 효과·자비 임계값·히든/직업 해금은 바꾸지 않았다. 새 자비 보너스도 없다. 지역 이벤트는 기존 랜덤슬롯9을 사용하고 고정이야기/NPC/쉼터/보스 순서를 보존한다. secretPity는 다른 고정슬롯과 같이 다음 랜덤슬롯에서 적용된다. 회랑과 안개 경로에는 지역 전용 사건이 누출되지 않는다.

## 이야기 반응·저장

기존 decisions에 p2_bell/p2_water/p2_margin 문자열만 저장한다. 이벤트가 해결되기 전에 기록해 중복 보상과 확률 재시도를 막는다. 결과/전투/장비는 기존 여정 저장·보상 수령을 사용한다. 신규 세이브 버전이나 필드를 추가하지 않는다. 누락 키는 미경험, 잘못된 값은 로드 거부. 기존228 P1 저장 및228 pre-P1 저장을 그대로 복원한다. 지역 중심부 이야기/재방문과 NPC 문장에서 앞선 선택을 기억하며, 다른지역 기록은 도서관 조건/보상으로 연결된다.

## 이미지

기존149파일 전수와 정확한ID 경로를 확인했다. event_18.webp/19/20은 없다. 전용 매핑은null이며 기존 지역 배경을 일반 장면 배경으로 표시한다. 제작된 전용 사건 이미지로 보고하지 않는다. 제작 용도와 잔여목록은 P2_HANDOFF.md에 기록한다.
