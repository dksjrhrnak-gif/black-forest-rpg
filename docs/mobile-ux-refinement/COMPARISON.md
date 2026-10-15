# 모바일 UX 실제 전후 비교

기준 UI: main `4fe67d3310af9c3a22d2688305bafbef362d13eb`. 아래 이미지는 Chromium의 실제 실행 캡처입니다. 두 버전은 20개 상태 모두 저장 코드 SHA-256이 같으며 시드는 17입니다. 전투는 재현을 위한 집중 QA 저장 상태이며 자연 진행이나 사람의 장시간 플레이 결과를 뜻하지 않습니다. 강제 전직은 후보를 선택하기 전 같은 화면 상태를 촬영했습니다.

이미지는 실제 요청·decode 완료 후 촬영했습니다. 테스트에서 이미지의 `loading` 속성이나 원본을 바꾸지 않았습니다. 모션·축척·이미지를 편집한 목업이 아닙니다.

## 390px 화면 전후 실측

높이는 CSS px이며 소수 둘째 자리까지 반올림했습니다. `—`는 해당 화면의 전투/탐험 장면 영역이 없음을 뜻합니다. 전직은 후보 카드 목록, 보상은 전리품 상세의 개별 이미지를 사용합니다. 전직의 중복 HUD는 개선 화면에서 숨기고 현재 직업·저장 기능은 전직 헤더에 유지합니다.

| 크기 | 화면 | HUD 전→후 | 장면 이미지 전→후 | 서술 전→후 | 행동 영역 전→후 | 화면 내 행동 전→후 | 비교 캡처 |
|---|---|---:|---:|---:|---:|---:|---|
| 390×844 | 일반 전투 | 73.19 → 73.19 | 242.45 → 364.86 | 112.00 → 48.00 | 253.56 → 246.56 | 5 → 5 | [전](screenshots/before-390x844-battle.jpg) / [후](screenshots/after-390x844-battle.jpg) |
| 390×844 | 보스 전투 | 73.19 → 73.19 | 242.45 → 364.86 | 112.00 → 48.00 | 253.56 → 246.56 | 5 → 5 | [전](screenshots/before-390x844-boss.jpg) / [후](screenshots/after-390x844-boss.jpg) |
| 390×844 | 탐험 | 84.19 → 84.19 | 285.95 → 309.95 | 112.00 → 112.00 | 173.17 → 173.17 | 3 → 3 | [전](screenshots/before-390x844-exploration.jpg) / [후](screenshots/after-390x844-exploration.jpg) |
| 390×844 | 강제 전직 | 171.22 → — | — → — | — → — | 99.09 → 99.09 | 1 → 1 | [전](screenshots/before-390x844-promotion.jpg) / [후](screenshots/after-390x844-promotion.jpg) |
| 390×844 | 보상 | 84.19 → 84.19 | — → — | 48.00 → 112.00 | 137.39 → 137.39 | 3 → 3 | [전](screenshots/before-390x844-reward.jpg) / [후](screenshots/after-390x844-reward.jpg) |
| 390×664 | 일반 전투 | 73.19 → 73.19 | 62.45 → 184.86 | 112.00 → 48.00 | 253.56 → 246.56 | 5 → 5 | [전](screenshots/before-390x664-battle.jpg) / [후](screenshots/after-390x664-battle.jpg) |
| 390×664 | 보스 전투 | 73.19 → 73.19 | 62.45 → 184.86 | 112.00 → 48.00 | 253.56 → 246.56 | 5 → 5 | [전](screenshots/before-390x664-boss.jpg) / [후](screenshots/after-390x664-boss.jpg) |
| 390×664 | 탐험 | 84.19 → 84.19 | 105.95 → 129.95 | 112.00 → 112.00 | 173.17 → 173.17 | 3 → 3 | [전](screenshots/before-390x664-exploration.jpg) / [후](screenshots/after-390x664-exploration.jpg) |
| 390×664 | 강제 전직 | 171.22 → — | — → — | — → — | 99.09 → 99.09 | 1 → 1 | [전](screenshots/before-390x664-promotion.jpg) / [후](screenshots/after-390x664-promotion.jpg) |
| 390×664 | 보상 | 84.19 → 84.19 | — → — | 48.00 → 112.00 | 137.39 → 137.39 | 3 → 3 | [전](screenshots/before-390x664-reward.jpg) / [후](screenshots/after-390x664-reward.jpg) |

모든 기본 행동은 실제 렌더링 높이 52px이며 개선 화면에서 15px/600·반경 10px을 확인했습니다. 전투 5개, 탐험 3개, 보상 3개 행동이 네 세로 화면에서 동시에 보였습니다. 확인 시 저장 코드와 실행 중 Game 상태/RNG는 변하지 않았습니다.

## 추가 스트레스 검사

Chromium과 WebKit에서 같은 결과를 확인했습니다. 모든 항목은 390×664이며 행동 5개가 동시에 보였습니다. 긴 로그와 상태가 많은 경우 이미지 공간이 줄어드는 기존 레이아웃의 절충은 남아 있습니다.

| 조건 | 장면 이미지 높이 | 서술 높이 | 화면 내 행동 |
|---|---:|---:|---:|
| long-log | 96.86px | 112.00px | 5 |
| long-skill | 184.86px | 48.00px | 5 |
| many-statuses | 96.77px | 48.00px | 5 |
| large-text-simulation | 128.42px | 48.34px | 5 |

긴 로그는 기존 문장 반복을 포함한 유효 저장 상태로 재현했습니다. 최장 직업 설명은 실제 `x_ranged_2` 데이터이며 전체 설명 패널로 접근됩니다. 여러 상태는 화상·기절·공격 약화·방어를 동시에 가진 저장 상태입니다. 19px 글자 검사는 CSS를 통한 명시적 확대 모사이며 실제 OS 글자 확대는 **NOT TESTED**입니다. End/Home 키로 서술의 끝과 처음에 도달하고, 스크롤 안내가 끝에서 사라지고 처음에서 다시 나타남을 검사했습니다.

## 보스 이미지 별도 조사

브라우저에서 `boss_00.webp`의 실제 HTTP 응답을 잠시 보류하여 로딩 전 프레임을 촬영한 뒤, 응답을 해제하고 `decode()` 완료 후 프레임을 촬영했습니다. 전·후 모두 자연 크기 600×900·HTTP 200·`object-fit:contain`·opacity 1의 정상 이미지가 표시되었습니다. 로딩 전에는 `complete=false`, 자연 너비 0인 빈 영역을 확인했습니다. 기존 이미지는 `lazy`, 개선된 주 장면 이미지는 `eager`입니다.

이 검사는 이미지 준비 전에 캡처하면 빈 영역이 생길 수 있음을 입증합니다. 과거 보고된 단일 검은 스크린샷의 원인을 유일하게 확정한 재현으로 해석해서는 안 됩니다. 원본 자산은 어두운 숲 색조이며 decode 후 실제 보스가 보이는 것을 아래 사진으로 확인했습니다.

| 버전·크기 | 로딩 전 | decode 후 |
|---|---|---|
| before 390×844 | [사진](boss-image/before-390x844-initial.jpg) | [사진](boss-image/before-390x844-decoded.jpg) |
| before 390×664 | [사진](boss-image/before-390x664-initial.jpg) | [사진](boss-image/before-390x664-decoded.jpg) |
| after 390×844 | [사진](boss-image/after-390x844-initial.jpg) | [사진](boss-image/after-390x844-decoded.jpg) |
| after 390×664 | [사진](boss-image/after-390x664-initial.jpg) | [사진](boss-image/after-390x664-decoded.jpg) |

## 원본 결과

- [개선 전 Chromium 20개 상태](before-chromium.json)
- [개선 후 Chromium 20개 상태 + 스트레스 4개](after-chromium.json)
- [개선 후 WebKit 20개 상태 + 스트레스 4개](after-webkit.json)
- [보스 이미지 개선 전 Chromium](boss-image-before-chromium.json)
- [보스 이미지 개선 후 Chromium](boss-image-after-chromium.json)
- [보스 이미지 개선 후 WebKit](boss-image-after-webkit.json)

이 문서의 로컬 검증은 Chromium·WebKit을 실제 실행한 결과입니다. Firefox·공개 Pages·실제 기기·주소창 변화·OS 확대·실측 FPS·장시간 사람 플레이 결과는 별도 CI 및 최종 인수인계의 실제 실행 결과를 확인해야 합니다.
