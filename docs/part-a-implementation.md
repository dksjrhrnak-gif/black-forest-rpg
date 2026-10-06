# Part A — action copy and journey verification

Baseline: a38d692203b73ea92d981ae1f8f85d81566f4016. Source build/export was already synchronized (299372 bytes); no baseline repair needed. `build.py` creates `black-forest.html`; `export-site.py` copies it to root `index.html` and `dist/index.html`. `verify-html.py` rejects any bytes after closing `</html>` and different exported HTML. Final Part A SHA256: 8a318a8ac53ec965af42792fefb1aea5ef0f37551a33c72a779b7cd41bc27861.

## Incremental changes in this task

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

## State and rewards

`journey.js` freezes the existing engine's victory calculation and its RNG state. Numeric awards are held in `rewardState.after`, result awards in `rewardState.rewards`, and generated loot in `s.loot`. `claimVictory()` writes claimed before copying credited fields. One synchronous click runs claim + loot handling + original progression/route/story/boss conditions; the UI writes the final state to localStorage once. Native click is the only activation path; the target is disabled immediately and navigation actions have a 250ms input lock. `pageshow.persisted` reloads the newest saved state. No timer chooses a scene.

Old saves without new fields receive null/default values. Historic reward/loot saves were already credited by the old engine: loading does not create a second credit. Existing 40-item bag rule auto-sells its oldest item and is retained. RNG/Alea restoration, BF1/BF2/BF3, three-slot and archived six-slot equipment preservation are covered by the existing compatibility suite. New Part A adds no save format.

## Evidence

Node regression: PASS (local), including 36 frozen reward combinations, exact restore/RNG, no duplicate claim, credited legacy loot, optional guardian and retained rest point; 18 natural campaigns across 8 areas. AST user-string audit: PASS, 1916 candidates, 14 source/shell files. `verify-html.py`: PASS. Browser gate: see GitHub run 37533781963 and the final report; no browser PASS is inferred from Node checks.

Local browser installation: NOT TESTED because the permitted download route returned truncated/non-ZIP browser files. The QA workflow executes the actual Chromium/WebKit suites on GitHub-hosted runners. Physical devices: NOT TESTED.
