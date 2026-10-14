# 전투 피드백·이펙트 인수인계

## 기준과 범위

- 시작 main: `98603e976381759f54940e429e66216add6c7c8b` (GitHub와 로컬 일치).
- 작업 브랜치: `qa/fx-feedback-pass`.
- FX-1 `b9513d6`, FX-2 `acd4cf8`, FX-3 `163bf6a`, FX-4 `cb7471d` 순서로 구현·검증·커밋.
- 게임 엔진, P1/P2/P3 모듈, 저장 형식, 콘텐츠/직업/장비 데이터, 이미지 자산은 변경하지 않는다. 효과는 실행된 명령의 전후 스냅샷을 읽고 렌더링된 DOM에만 적용한다. RNG 추첨이나 자동 진행/보상 지급을 추가하지 않는다.
- 기존 클라우드 설정과 설치된 Node/Playwright를 재사용했다. 별도 worktree나 새 환경 설정은 필요하지 않았다.

## 구현 목록

| 구간 | 실제 동작 |
|---|---|
| 공격/치명타 | 적 이미지 3px/5px 흔들림, 검붉은 플래시, 실제 피해/치명타 숫자 |
| 피격/회피 | HP 영역의 붉은 플래시, 피해 숫자와 회피 문구 |
| 회복/방어 | 초록 회복 숫자, 푸른 방어·집중 문구; 회복 후 피격과 적 회복도 구분; 치명적인 응답으로 수치를 복원할 수 없으면 스킬 회복 문구만 표시 |
| 상태이상 | 중독·화상·출혈·기절·공격 약화 구분, 지속 피해/반사 분리 |
| 버튼 | 눌림 이동 1px/축소 .98; 기존 입력·중복 클릭 방어 유지 |
| 보상 | 카드 등장, 기존 0–5등급별 테두리/광원, 능력치 상승·하락 색/화살표 |
| 지급 시점 | 미수령 전리품은 ‘확인’, 실제 수령 후에만 ‘확보’; 장비 판매/착용/보관 구분 |
| 전환 | 탐험·조우·전투·승리·보상·체크포인트·휴식의 짧은 명도 전환 |
| 특별 순간 | 보스/중간 수문장, 히든 비전 해금, 최종 선택 진입/결말, 전설·신화 발견 배너 |

현재 희귀도는 일반/고급/희귀/영웅/전설/신화다. 존재하지 않는 히든/유물 장비 등급이나 보스 2페이즈는 추가하지 않았다. 히든 비전 해금과 전직은 서로 다른 기존 행동이며, 해금 배너는 실제 신규 발견에만 나온다. 한 순간에는 특별 배너 하나만 사용하고 희귀 장비 발견이 일반 승리 알림보다 우선한다.

## 성능과 접근성

- CSS transform/opacity 애니메이션 위주. 타격 .24/.32초, 피격 .3초, 보상 .32초, 장면 .28초, 플로팅 .56초, 특별 배너 .6초. 마지막 플로팅 지연을 포함해 .65초에 정리한다.
- 스크롤로 대상이 화면 밖에 있을 때는 작은 화면 고정 피드백 영역을 사용한다. 대상 좌표는 DOM 쓰기 전에 한꺼번에 읽고, 가시 영역에서 벗어난 숫자/배너를 확인하는 재현 테스트를 추가했다. 특별 배너는 항상 화면 안에 있으며 자동 스크롤은 추가하지 않는다.
- 반복/상시 애니메이션, 파티클, canvas, 오디오, RAF 루프 없음. 플로팅은 대상별 최대 6개, 특별 배너는 1개, 정리 타이머는 1개다.
- 새 행동·렌더링·모달·저장 불러오기·pagehide·백그라운드 전환 시 정리. 과거 효과를 쌓거나 재접속 때 재생하지 않는다.
- 효과는 `pointer-events:none`, 장식은 `aria-hidden`; 기존 한국어 전투 기록과 `aria-live` 본문을 유지한다. 상승·하락은 색만이 아니라 부호/화살표로 표시한다. 버튼 포커스와 sticky 입력 위치를 보존한다.
- `prefers-reduced-motion:reduce`에서 흔들림·이동·축소·플래시/페이드 모두 제거하고 짧게 읽을 수 있는 정적 피드백을 남긴다.
- HTML 크기 338,088 → 354,088바이트 (+16,000바이트, 약 15.6KiB). 이미지/네트워크 의존성 추가 없음.
- Chromium 360px/4배 CPU 감속, 동일 시드 방어 30회씩: 최종 동기 클릭 중앙값 대조 11.8ms / 일반 FX 22.5ms / reduced 21.2ms. 일반 FX 95백분위 35.9ms. 화면 밖 대상 판정을 위한 좌표 읽기 비용을 포함한다. 피드백 노드 최대 3개, 종료 후 애니메이션 0, 정확한 저장/RNG 90/90. 단일 실험이며 FPS·실제 기기 성능을 입증하는 수치는 아니다. 원문: `fx/performance.json`.

## 검증

- `node test-fx.cjs`: 114직업 × 시드 1–8 × 4행동 = 3,648회. 참조 엔진 행동과 저장/RNG 일치, 3,648회 저장 복원. 공격·치명타·회피·물약/스킬/적 회복·중독·화상·출혈·기절·약화·반사·지속 피해 검증. 무효 입력, 만피 회복 과장, 중복 전리품 알림, 모달/재접속 재생 방지, 보스/해금/3결말도 검사한다.
- `node test-fx-ui.cjs`: Chromium/WebKit 각각 360/390/430px × 일반/reduced motion, 콘솔/런타임 오류 0. 실제 엔진 명령의 정확한 저장 코드, 6등급 비교, 보상 지급 전/후, 휴식/체크포인트/탐험, 보스, 룬검사 해금, 3결말, 연속 클릭, 자동 정리, 재접속 검증. 전설/신화 구매는 실제 RNG 시드 1/219를 이용했다.
- 전투/체크포인트/해금/엔딩과 모든 등급 배치는 빠른 UI 검증용 합성 저장 fixture다. 한 번의 자연 캠페인 또는 실제 기기 검증으로 보고하지 않는다. 실제 새 게임과 전체 진행은 기존 회귀 suite/CI가 담당한다.
- 기존 `npm test` 전체 통과: 18/18 자연 캠페인 엔딩, 67개 히든 조건 사례/14직업, 36 전리품 및 9 체크포인트·대화 사례, 156 수치/분기/RNG 문안 회귀, 이전 BF2/아카이브 저장, 149 이미지/151 경로, 번들 동기화.
- 기존 Chromium 모바일 전체 회귀 360/390/430px도 통과했다. 패널·장비·대화·전투·보상·정확한 저장/복원·중복 클릭·손상 세이브 보존·이미지 경계와 콘솔 오류 0을 검증했다. 원문은 `fx/regression.json`. Firefox 및 최종 PR/main/공개 검증은 아래 배포 기록에 실행 결과를 추가한다. 미실행 검사를 통과로 간주하지 않는다.
- 최종 검수에서 회복 스킬 직후 패배 경로를 추가했다. HP가 0으로 제한되어 회복 숫자를 정확히 복원할 수 없는 경우, 실제 회복 효과가 있는 스킬에만 숫자 없는 회복 문구를 표시한다. 3,648회 단위 검사를 재실행했고 Chromium/WebKit 360px의 두 모션 모드에서도 패배 경로·저장 일치를 확인했다 (`fx/fatal-response`). 기존 모바일 회귀 기록의 번들 hash는 이 표시 보완 전 후보이며 최종 CI가 전체 회귀를 다시 검사한다.
- 추가 스크롤 검수: 360×800px에서 페이지 하단부터 공격/보스 진입 시 기존 배너 y=-451px와 적 피드백이 화면 밖에 놓이는 문제를 재현했다. 화면 고정 배너/필요 시 작은 피드백 영역으로 수정했고 Chromium/WebKit의 일반/reduced 모드에서 모든 플로팅과 보스 배너가 화면 안에 남는지 검사했다 (`fx/scrolled`). 기존 전투 카드 흔들림은 그대로 활용한다.
- 기존 테스트를 삭제하거나 검사를 완화하지 않았다. Handoff workflow의 기존 3브라우저 job에 FX/reduced motion/공개 검증, Chromium CPU 감속 검사를 추가했다. 기존 P1/P2/P3 및 공개 자산 검사를 유지했다.

### 재현

```sh
python3 build.py
node export-data.cjs
python3 export-site.py
npm test
node test-fx.cjs
python3 -m http.server 4183 --directory dist
# 다른 터미널: 설치된 정상 Playwright 브라우저 사용
BF_QA_URL=http://127.0.0.1:4183/ BF_BROWSER=chromium node test-fx-ui.cjs
BF_QA_URL=http://127.0.0.1:4183/ BF_BROWSER=webkit node test-fx-ui.cjs
BF_QA_URL=http://127.0.0.1:4183/ BF_BROWSER=firefox node test-fx-ui.cjs
BF_QA_URL=http://127.0.0.1:4183/ node test-fx-performance.cjs
```

클라우드의 시스템 Chromium과 설치된 WebKit은 실제 실행했다. 이 클라우드 Firefox는 기존 sandbox 제한으로 실행되지 않아 정상 GitHub Actions runner에서 검증한다. 공개 WebKit은 기존 환경 proxy를 사용하며 TLS 검증을 유지한다. 공개 Chromium은 정상 CI runner에서 확인한다.

## 수정 파일

- UI: `ui-fx.js`, `ui.js`, `style.css`.
- 번들/문안 검사: `build.py`, `audit-copy.cjs`, `test-reconciliation.cjs`, `index.html`, `black-forest.html`, `docs/system-copy-audit.json`.
- QA: `fx-test-fixtures.cjs`, `test-fx.cjs`, `test-fx-ui.cjs`, `test-fx-performance.cjs`, `.github/workflows/handoff-audit.yml`.
- 인수인계/증거: 본 문서, `docs/fx/*.json`, `docs/fx/rare-supplement/*.json`; 공개 검증 결과는 `docs/fx/public`.

## 남은 개선 후보와 사용자 검토 항목

- 실제 저사양 Android/iPhone에서 긴 플레이, 발열·배터리·스크린리더 평가 미검증.
- 연출 강도/문체/속도 만족도는 사람의 플레이 평가가 필요하다. 자동 QA로 재미 향상을 확정하지 않는다.
- 새로운 소리나 진동은 구현하지 않았다. 사용자 선호/브라우저 정책을 고려해 후속 작업으로 검토할 수 있다.
- 신규 전용 이미지는 만들지 않았다. 기존 미제작 직업 42/장비 999/NPC 6/이야기 2/P2 지역 이벤트 3와 ID 불명 후보 2는 기존 인수인계 목록을 유지한다.
- 사용자 검토 항목은 위 체감/실제 기기 평가이며 이번 안전한 구현·배포를 멈추는 승인 단계가 아니다.

## 배포 기록

- [PR #6](https://github.com/dksjrhrnak-gif/black-forest-rpg/pull/6) 최종 코드 `69d547e82f1d3d305709064dbf8863fe54781123` 검수 후 병합. PR 변경 25파일; 핵심 엔진/콘텐츠/데이터/이미지 diff 없음.
- PR CI: [Handoff 38497101241](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/38497101241) 8개 + [통합 38497103265](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/38497103265) 11개 = 19개 성공. main 전용 공개 job 1개는 QA 브랜치에서 의도적으로 건너뜀.
- 병합 main `5f76a55feaa8661f33aa9ce6e90e45d1a68bb103`, 2026-10-14 01:57:32 UTC. 병합 tree는 검증한 작업 브랜치와 동일하다.
- main CI: [Handoff 38498492714](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/38498492714) 10개 + [통합 38498492744](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/38498492744) 11개 = 21개 모두 성공.
- [Pages 38498492273](https://github.com/dksjrhrnak-gif/black-forest-rpg/actions/runs/38498492273), deployment `7054866917` 성공(2026-10-14 02:01:18 UTC).
- 공개 Chromium/WebKit/Firefox: 기존 P3 5화면폭 경로와 FX 360/390/430px × 일반/reduced motion 모두 실제 실행 성공. 기존 Chromium/WebKit P1/P2 및 전체 모바일 공개 회귀도 성공. 새 게임·전투·보상·제작/강화/세트·히든·엔딩·저장과 FX 연속 클릭/스크롤/정리에서 콘솔·런타임 오류 0을 assert했다.
- 클라우드 공개 WebKit도 독립 실행하여 6개 모바일/모션 조합 모두 통과(`fx/public/ui-webkit.json`). 공개 HTML 및 149 이미지/CSV 3개는 로컬과 바이트 일치(`fx/public/http-assets.json`). HTML SHA-256 `08c5f1f388f0e900c1e53c53e28b52ae1137ad77c7842888a1a1b82bd9326349`.
- API에서 확인한 실행 SHA·job 결론·공개 FX step은 `fx/ci-verification.json`에 기록했다. 중간 후보의 취소/완료된 실행을 최종 CI 숫자에 합산하지 않았다. CPU 감속 step은 Chromium 전용이며 다른 브라우저의 해당 step은 의도적으로 건너뜀.
- 이 완료 기록과 공개 증거만 문서 커밋으로 추가한다. 런타임/HTML/CSV/이미지는 동일하며 코드 CI 21검사를 다시 실행하지 않는다. 최종 문서 main SHA의 Pages 배포/공개 바이트를 한 번 더 확인하고 최종 제출 보고서에 남긴다.
- 기능 오류는 이번 검증 범위에서 남아 있지 않다. 실제 기기와 장시간/주관적 플레이 평가의 한계는 위 절을 유지한다.
