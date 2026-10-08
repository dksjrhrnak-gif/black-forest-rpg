# 게임성 개발 인수인계 — Phase N–T

- 기준 main: `5f879371660038d516f71aab8d718fa3cb20b57e`. 이전 A–G는 main에 반영됐으며 H는 `9a0e821454d7f7cd7907b07155c6bd7701463209`에서 감사/계획 완료.
- 같은 브랜치 `qa/asset-quality-20261008`를 유지했다. 중복 브랜치 생성/자동 main 병합/Pages 신규 배포 없음.
- H–M 이월: 기존 정확 ID 미연결 B=0, ID 불명 C2개 유지. 소규모 J2장 제작·검수/연결. 클래스72/114, 장비 전용1/1000. 미제작42/999/NPC6/story2는 그대로 미완성으로 기록한다. K30화면×Chromium/WebKit, L실측 분석, M회귀+PR로 마무리한다.
- N 완료: 114직업/24적 템플릿/1000장비/28효과 전수 추출. BALANCE_AUDIT.md와 gameplay/data-audit.json.
- O 완료: 모든 직업 원본/성능 비교와 계열별 개성·대상ID·영향·회귀 제안. CLASS_IDENTITY_PROPOSALS.md. 데이터 적용 없음.
- P 완료: 11,880전. combat/stress/rift의 고정시드/장비/자원/정책별 개별 기록과 COMBAT_BALANCE_REPORT.md. 최대16행동, 30턴이상 자연 전투는 미검증.
- Q/R 완료: 19,200슬롯 조건부 탐험·이벤트 분포, 자연 장비 교체 로그, 경제/제작/보상 검토. EXPLORATION_REWARD_REVIEW.md의 새 이벤트3개는 완전 사양 제안이며 미적용.
- S 완료: 72챕터 선택/6엔딩 조건/14히든 충분조건 fixture+기존67해금 양음성 테스트. STORY_REVIEW.md. 자연 모든 히든의 획득 빈도는 미검증.
- T 완료: 자연54/54엔딩, 473회 저장 완전일치, 진행208–267명령·레벨13–16·공격정책1회 부활. LONG_PLAY_QA.md. 실제 몇 시간 플레이/재미 측정으로 환산하지 않는다.
- 실제 안전 변경: x_support_16/w0 전용 이미지; 해당아이템의2:3 표시/정확alt; 비교/강화 피드백의한국어 능력치명. 엔진·수치·드롭·전직·스토리·세이브 스키마는 변경하지 않았다.
- 분석 도구의 초기 실패: hidden fixture 상태 검증 조건 누락과 최대HP 물약 no-op 정책. harness만 수정하고 최종 all 재실행 성공. 첫 npm test의 bundle 미동기화는 build/export-site 후 해소. 게임 오류로 과장하지 않는다.
- 재현: npm ci --ignore-scripts; npm run build; node export-data.cjs; python3 export-site.py; npm test; node audit-gameplay-quality.cjs all. HTTP를 연 뒤 test-ui/test-mobile, test-handoff-readiness, test-quality-mobile을 Chromium/WebKit으로 실행.
- 다음: 최종 CI/PR 결과를 이 문서에 추가한다. 승인 후 별도 PR로 직업/지역 이벤트/경제/엔딩 제안을 하나씩 설계·검증. 대량 그림은 남은 ID별 생성 계획대로 소규모 검수 반복. main 병합 이후에만 새 배포SHA/공개 페이지·자산·모바일을 다시 검증한다.

## 안전 수정 checkpoint

`202002a`에서 소규모 이미지2장,2:3 표시,한국어 비교정보와 재생성 bundle/registry를 커밋·push했다. N–T는 별도 분석 커밋으로 이어진다. 미확인 후보 연결/수치 조정/스토리 변경은 없다.

## 통합 검증 checkpoint

분석 커밋 `18099ca995ea1cbfdad8c5e2e5e43b00354eeec9`. 최종 소스의 npm test/build/export/HTML 경계·동기화 통과. Chromium/WebKit의 360·390·430 터치 여정 회귀 모두 통과, 추가 readiness 각각22개 통과, 신규 자산/표시30화면씩 통과. 두 새 이미지 원본과 주요 화면을 직접 열어 확인했다. 런타임/콘솔 오류0. 기존10이미지 decode 회귀도 유지했다.

PR: https://github.com/dksjrhrnak-gif/black-forest-rpg/pull/1 . CI의 최신 커밋 결과는 PR Checks에서 확인한다. main/Pages는 기준 SHA 그대로이며 신규 그림이 공개 페이지에 배포됐다고 주장하지 않는다. 물리 기기·Firefox·장시간 독서·자연 모든 히든·30턴이상 전투는 미검증이다. 남은 큰 변경의 승인 범위와 우선순위는 개성/탐험/이야기 제안 문서에 기록했다.
