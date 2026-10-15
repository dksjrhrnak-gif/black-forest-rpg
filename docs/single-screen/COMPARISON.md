# 동일 상태 모바일 전후 비교

수정 전은 main `d01469cd157dd76798673641e4128370a99e036d`의 HTML이다. 동일 시드/저장/브라우저/화면폭·높이로 촬영한 실제 브라우저 JPEG이며 편집·합성하지 않았다. 수정 전은 기존 비교와 같은 play 상단 기준, 수정 후는 스크롤 0에서 촬영했다. 직업·장비는 동일 모달 scroll 0이다.

| 크기 | 화면 | HUD 높이(전→후) | 이미지 영역(전→후) | 원문 영역(후) | 하단 행동 영역(후) | 스크롤 없이 보이는 행동(전→후) |
|---|---|---:|---:|---:|---:|---:|
| 360×800 | exploration | 158.2→84.2 | 350.0→242.0 | 112.0 | 173.2 | 0→3 |
| 360×800 | battle | 107.1→73.2 | 320.0→198.5 | 112.0 | 253.6 | 5→5 |
| 360×800 | reward | 171.2→84.2 | —→— | — | 137.4 | 2→3 |
| 390×844 | exploration | 158.2→84.2 | 350.0→286.0 | 112.0 | 173.2 | 0→3 |
| 390×844 | battle | 107.1→73.2 | 320.0→242.5 | 112.0 | 253.6 | 5→5 |
| 390×844 | reward | 171.2→84.2 | —→— | — | 137.4 | 3→3 |
| 430×932 | exploration | 158.2→84.2 | 350.0→397.2 | 112.0 | 173.2 | 0→3 |
| 430×932 | battle | 107.1→73.2 | 320.0→330.5 | 112.0 | 253.6 | 5→5 |
| 430×932 | reward | 171.2→84.2 | —→— | — | 137.4 | 3→3 |
| 390×664 | exploration | 158.2→84.2 | 350.0→106.0 | 112.0 | 173.2 | 0→3 |
| 390×664 | battle | 107.1→73.2 | 320.0→62.5 | 112.0 | 253.6 | 4→5 |
| 390×664 | reward | 171.2→84.2 | —→— | — | 137.4 | 0→3 |
## 360×800

| 화면 | 전 | 후 |
|---|---|---|
| 탐험 | [전](screenshots/before-360x800-exploration.jpg) | [후](screenshots/after-360x800-exploration.jpg) |
| 전투 | [전](screenshots/before-360x800-battle.jpg) | [후](screenshots/after-360x800-battle.jpg) |
| 전설 보상 | [전](screenshots/before-360x800-reward.jpg) | [후](screenshots/after-360x800-reward.jpg) |
| 직업·전직 | [전](screenshots/before-360x800-jobs.jpg) | [후](screenshots/after-360x800-jobs.jpg) |
| 장비 | [전](screenshots/before-360x800-equipment.jpg) | [후](screenshots/after-360x800-equipment.jpg) |

## 390×844

| 화면 | 전 | 후 |
|---|---|---|
| 탐험 | [전](screenshots/before-390x844-exploration.jpg) | [후](screenshots/after-390x844-exploration.jpg) |
| 전투 | [전](screenshots/before-390x844-battle.jpg) | [후](screenshots/after-390x844-battle.jpg) |
| 전설 보상 | [전](screenshots/before-390x844-reward.jpg) | [후](screenshots/after-390x844-reward.jpg) |
| 직업·전직 | [전](screenshots/before-390x844-jobs.jpg) | [후](screenshots/after-390x844-jobs.jpg) |
| 장비 | [전](screenshots/before-390x844-equipment.jpg) | [후](screenshots/after-390x844-equipment.jpg) |

## 430×932

| 화면 | 전 | 후 |
|---|---|---|
| 탐험 | [전](screenshots/before-430x932-exploration.jpg) | [후](screenshots/after-430x932-exploration.jpg) |
| 전투 | [전](screenshots/before-430x932-battle.jpg) | [후](screenshots/after-430x932-battle.jpg) |
| 전설 보상 | [전](screenshots/before-430x932-reward.jpg) | [후](screenshots/after-430x932-reward.jpg) |
| 직업·전직 | [전](screenshots/before-430x932-jobs.jpg) | [후](screenshots/after-430x932-jobs.jpg) |
| 장비 | [전](screenshots/before-430x932-equipment.jpg) | [후](screenshots/after-430x932-equipment.jpg) |

## 390×664

| 화면 | 전 | 후 |
|---|---|---|
| 탐험 | [전](screenshots/before-390x664-exploration.jpg) | [후](screenshots/after-390x664-exploration.jpg) |
| 전투 | [전](screenshots/before-390x664-battle.jpg) | [후](screenshots/after-390x664-battle.jpg) |
| 전설 보상 | [전](screenshots/before-390x664-reward.jpg) | [후](screenshots/after-390x664-reward.jpg) |
| 직업·전직 | [전](screenshots/before-390x664-jobs.jpg) | [후](screenshots/after-390x664-jobs.jpg) |
| 장비 | [전](screenshots/before-390x664-equipment.jpg) | [후](screenshots/after-390x664-equipment.jpg) |

자동 PASS는 가독성/분위기의 사람 평가를 대신하지 않는다. 직업·장비는 모든 목록을 한 화면에 넣지 않고 기존 모달/목록 내부 스크롤을 유지한다. 보상은 별도 아이템 카드/비교 region이므로 scene image 대신 실제 item icon을 우선한다.

실제 휴대폰 주소창 전환·노치 safe area·OS 글자 확대·장시간/실제 FPS는 NOT TESTED. 390×664는 주소창 때문에 줄어든 viewport를 가정한 브라우저 크기이며 실제 특정 기기의 상태바를 차감한 값이 아니다.
