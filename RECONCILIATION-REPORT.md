> 과거 작업 당시의 기록입니다. 이 문서의 미배포·미검증 표시는 현재 상태를 뜻하지 않습니다. 현재 상태는 [후속 검수 보고](docs/handoff-audit.md)와 [최종 통합 보고](docs/final-completion-report.md)를 확인하세요.

# v4 / GitHub main 정합성 복구 보고

상태: **소스 통합·Node 검증 완료 / GitHub 반영 및 브라우저 QA 미완료**. 완료 기준 전체를 충족하지 않았습니다.

## Source reconciliation

- v4 source: Work의 별도 Sites 소스 저장소 `b5a741e6d826053c6f334290c9c176eac84dfbae`. GitHub 커밋이 아닙니다. GitHub 조회는 422 No commit found를 반환했습니다.
- GitHub previous main: API로 재확인한 `6b78d47327b54d17c2c1a104c4fa5a2a840cdf2a` / Add six-slot equipment migration and mobile armory UI.
- Merged source: 위 v4를 기준으로 실제 main 저장 형식의 읽기 마이그레이션, 모달 폭 보정, 독립 실행 가능한 회귀 fixture, GitHub QA workflow를 추가했습니다. 공식 장비 슬롯은 3개입니다.
- Final commit: **GitHub 커밋 없음**. 브랜치 생성 API가 403 Resource not accessible by integration을 반환했습니다. Work 소스 커밋은 별도로 저장하며 GitHub 커밋으로 보고하지 않습니다.
- 최신성: 단일 Git 이력이 아닙니다. main은 6슬롯 UI 변경을 포함하지만 일반 23 + 히든 6이고, Work v4는 일반 100 + 히든 14 / Career / 12노드를 포함합니다. 파일 날짜로 판단하지 않고 각 실제 파일을 실행·비교했습니다.
- 이전 두 ZIP 안의 게임 HTML과 Work v4 HTML은 바이트 단위로 일치했습니다. source ZIP 168 entries, Pages ZIP 109 entries.
- 원본 비교: `SOURCE-MAIN-V4.diff`, 추가 수정 비교: `SOURCE-V4-MERGED.diff`. 실제 배포 엔트리는 main 루트 `index.html`이며 기존 Pages build and deployment의 성공 실행 SHA도 6b78d473입니다.

## Class

| 항목 | 수 / 결과 |
|---|---|
| Regular | 100 — PASS |
| Hidden | 14 — PASS |
| Tier 0 | 6 |
| Tier 1 | 37 |
| Tier 2 | 33 |
| Tier 3 | 24 |

ID·이름 중복 없음, Tier/Parent/Skill/Passive/Effect/Unlock/Lore 필드와 28개 실제 효과를 검증했습니다. 114직업 전투 회귀, 일반 전직 계보·Mastery·Level·Boss·Story·NPC/Faction 조건, 자유 교차 전직 차단, Hidden 발견과 선택 분리 모두 Node PASS입니다. 직업 카드·비전서의 실제 브라우저 조작은 NOT TESTED입니다.

## Stage

- Regions: 8 — PASS
- Nodes: Story 지역마다 12 방문 노드 + 별도 Boss — PASS
- Mid Boss: 선택형 2개, 지역 인장을 대신 지급하지 않음 — PASS
- 외곽/심부/중심부 각 4단계, 구역별 전투·이벤트·보급·NPC·정예·비밀·휴식·스토리 후보가 실제 경로에 연결됩니다. 캠프 복귀 체크포인트 4/8/12의 경로 및 RNG 보존 PASS.
- 6개 시작 직업 × 3시드 = 18개 자연 진행 캠페인이 Tier 3와 엔딩에 도달했고 8지역 모두 12개 노드를 방문했습니다. 별도로 114직업 × 6시드 = 684개 직접 지정 전투 회귀 캠페인도 완료했습니다.

## Equipment

- Slots: **weapon / armor / charm** — PASS
- Templates: 1,000 — PASS
- Rarity: 6등급 — PASS
- Affix: 12개 옵션, 중복 방지 — PASS
- Visual UI: 중앙 직업 이미지, 3슬롯 카드, 공용 이미지 fallback, 이름·Rarity·강화·Affix·Frame/Glow·장착 비교·강화 확률·Reforge·판매·분해·능력치 변화 구현. **실제 시각·터치 QA는 NOT TESTED**.
- main의 acc는 charm으로 이전합니다. 보조무기/투구/유물은 `legacyEquipment`에 보존하며 능력치에 반영하지 않습니다. 원본 저장 코드는 자동 저장 전에 `.before-v4` 키에 보관합니다. 저장을 버전 차이만으로 초기화하지 않습니다.

## Relationship

- Faction: lantern / ink / hunt 기존 독립 상태 유지 — PASS
- Affinity: alice / queen / creature / victor / ahab / quixote 6종 저장·증감·관계 단계·대화 잠금·신뢰 보상·스토리 조건 — PASS
- 기존 alice / adam / ahab 동료 이야기·퀘스트·엔딩과 호환됩니다.

## Save

| 케이스 | 결과 |
|---|---|
| BF1 → BF3 | PASS |
| BF2 → BF3 | PASS |
| New / 재로드 | PASS |
| affinity 없는 Save | PASS |
| career 없는 Save | PASS |
| 기존 weapon / armor / charm | PASS |
| 실제 main 엔진 생성 29직업 Save | PASS |
| 6슬롯 추가 장비 보존 | PASS |
| RNG Restore / 같은 저장 재현 | PASS |

위 PASS는 Node로 직접 실행한 결과입니다. 사용자가 실제 플레이한 저장 파일을 제공받은 것은 아니며 실제 main 엔진으로 생성한 회귀 데이터도 포함합니다. 브라우저의 localStorage·새로고침 검증은 NOT TESTED입니다.

## Images

| 분류 | 개수 |
|---|---:|
| CONNECTED | 고유 105개 / 레지스트리 연결 106개 |
| FALLBACK | 1,094 매핑: 직업 85 + Portrait 6 + Story CG 3 + 장비 템플릿 1,000 |
| MISSING | 0 — 지정된 이미지 경로 기준 |
| WRONG_MATCH | 0 — GitHub art-manifest ID/파일명 매칭 기준 |

장비 1,000개는 3개 슬롯 공용 SVG를 사용합니다. Story creature는 adam 장면을 의도적으로 공유합니다. 원본 WebP 102개 모두 GitHub Git blob SHA와 일치하며 삭제·수정하지 않았습니다. 이미지 픽셀 의미에 대한 전수 시각 검증은 NOT TESTED입니다. lazy loading / alt / 로딩 실패 시 이미지 숨김 및 글자 fallback 연결은 정적 검사 PASS, 실제 Broken image 노출 QA는 NOT TESTED입니다.

## Browser

| Viewport | 결과 |
|---|---|
| 320×568 | NOT TESTED |
| 360×800 | NOT TESTED |
| 375×812 | NOT TESTED |
| 390×844 | NOT TESTED |
| 430×932 | NOT TESTED |
| Tablet 768×1024 | NOT TESTED |
| Desktop 1280×900 | NOT TESTED |

관리형 Work 환경에는 Sites가 요구하는 control-browser 스킬이 없고 새 agent-browser CLI도 설치되어 있지 않습니다. 사용자의 실제 브라우저 검증 요청에 따라 제공된 클라우드 UI 도구를 추가로 확인했습니다. 브라우저는 정상 열렸지만 v4 감독형 미리보기 서버는 `bwrap: Can’t mount proc on /newroot/proc: Operation not permitted`로 시작 실패했습니다. HTML 직접 실행도 브라우저 URL 정책이 file: 프로토콜을 거부했습니다. 정책 우회나 다른 서버로 대체하지 않았습니다. 따라서 v4 viewport QA는 미실행이며 Node·CSS/HTML 정적 검사를 완료했습니다. 모달의 데스크톱 패딩 + width:100% 문제는 body 잠금에 border-box를 적용하고 닫을 때 원래 값을 복원하도록 보정했습니다.

`.github/workflows/v4-qa.yml`에 Chromium 클릭·모바일 터치, WebKit 모바일 터치 QA를 구성했습니다. 8개 뷰포트(370 추가), 모달 경계·가로 overflow·이미지·전직 잠금·장비·대화·저장·새로고침·터치 한 번/턴 한 번·44px 전투 버튼·JS 오류를 검증하도록 준비했습니다. 그러나 GitHub 쓰기 차단으로 workflow도 원격 실행되지 않았습니다. 이 준비물을 실행 결과로 계산하지 않습니다.

## Performance

| 항목 | GitHub main / 이전 | 통합본 | 감소 |
|---|---:|---:|---:|
| HTML | 333,171 B | 224,818 B | 108,353 B |
| inline JS | 313,078 B | 205,663 B | 107,415 B |
| ROT | 184,374 B | 4,535 B | 179,839 B |

Work 원본 v4 HTML은 221,545 B였으며 실제 main 저장 호환 등을 추가한 통합본은 3,273 B 커졌습니다. ROT 전체 Display/Backend/Map/FOV/Path/Lighting/Noise/Engine/EventQueue 런타임 번들을 RNG 전용 구현으로 대체했습니다. 전체 ROT는 테스트 fixture에만 있고 런타임에 포함되지 않습니다. 동일 RNG 알고리즘·Seed·State 복원·6시드 5,000회 시퀀스 비교 PASS. 첫 로딩 시간·모바일 파싱 시간은 NOT TESTED이며 파일 크기를 시간 측정으로 주장하지 않습니다.

## Tests

새 게임 / 일반 전투 / 보스 / 이벤트 / 스토리 / 개인 호감도 / 세력 평판 / 전직 / 장비 / 저장·불러오기 / 지역 해금: **Node PASS**. 상세 실행 로그 `reconciliation-node-results.txt`.

## GitHub Pages

- Deploy: **FAIL — GitHub 연결 쓰기 권한 403으로 미진행**
- Latest Commit: API 확인 main `6b78d47327b54d17c2c1a104c4fa5a2a840cdf2a`
- Live verification: **FAIL — v4 미반영**. 클라우드 Chromium에서 실제 Pages를 열고 장비창의 weapon/subweapon/head/armor/acc/relic 6슬롯과 지역 선택의 6개 갈림길을 확인했습니다. 기존 Pages workflow의 6b78d473 배포 성공 기록과 일치하는 기능입니다. 라이브 HTML 바이트의 SHA 대조는 미실행입니다. `qa-evidence-live-main.jpg`는 현재 배포본의 증거이며 v4 화면이 아닙니다.
- main 통합: 미진행. 브라우저 QA 미실행 상태에서 새 코드를 배포하지 않았습니다.

## 남은 TODO

1. GitHub 연결에 이 저장소의 브랜치·Contents 및 QA workflow 쓰기 권한 확보. 브랜치 생성의 서버 권한 거절이며 사용자의 기존 작업 지시를 승인 부족으로 해석한 것이 아닙니다.
2. 별도 `v4-reconciliation-qa` 브랜치에 통합본 반영 후 Chromium/WebKit workflow 실행. 실패 시 수정·재검증.
3. Work 미리보기 인프라 복구 또는 원격 QA workflow를 실행할 권한 확보. 실제 휴대폰 Safari/Chrome에서 스크롤 후 터치·safe-area·긴 직업/장비명·직업 비전서·모달·장비창 최종 확인.
4. QA 통과한 브랜치만 main에 통합. 기존 이미지 보존.
5. Pages 배포 SHA와 라이브 HTML을 대조하고 114직업·12노드·Career·affinity·3슬롯·Save 재확인.
