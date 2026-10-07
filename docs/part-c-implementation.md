# Part C copy correction and verification

B gate: runs 37535467636 and 37535893902 both completed SUCCESS before C editing began. Commit baseline: 43b35605d216a56b3e7b1c2c1cfb36e8428a9a22.

## Copy ownership and synchronization

`narrative.js` is the single source for NOVEL_COPY and DIALOGUE_CHOICES. `ui.js` references those exported objects. Initialization populates existing THREADS.stage.text / choices[][0], COMPANIONS.intro/resolve/special and NPCS.text from the same arrays. Original choice counts/order, IDs, faction IDs, decision codes, costs, score deltas, thresholds, saves and RNG are unchanged. The three basic answers remain answers[0..2]; fourth responses use the separate character-specific joint string.

`validate-script.cjs` fails mismatched source/generated conversation messages or labels. Build also runs the AST user-copy audit, image validation and the 156-case numeric/branch/RNG comparison. No timer/navigation or A action label changes occur in C.

## Required corrections

- Creature: chest engraving and matching neck tag introduced; tag is torn off/discarded while the chest engraving remains visible in the quest. Heart-stop warning and dry speech replace the inconsistent memory loss line. Epilogue pronoun is corrected.
- Alice: testimony clues instead of target location, testimony instead of her own name, empty names instead of written names.
- Ahab: chain scars introduced before chain action; return-route decision and captain speech corrected.
- Three joint answers are separated by character; six low/intimate/repeat lines are documented in npc-copy-before-after.md. Middle three relationship tiers retain narration. Grammatical particles in greetings/epilogues are corrected.
- Chapter 1 present-tense narration and scene description replace repetition/choice previews. Chapter 2 device uses 종; exterior building retains 종탑. Chapters 3–8 corrections introduce action targets, name the party and remove narrator/question echoes. Chapter 8 final chapter question/choices follow requirement 39. Its specific redesign supersedes the old-label shortening examples in requirement 42; all new labels are under 30 characters.
- Random events introduce herbs, coin, coffin, scales, temporal gap, forge/fireplace; well uses 당신, crow uses 동전. 별 없는 복도 becomes 별 없는 회랑; 법정 기록고 is canonical.
- Ending 1 becomes 불씨를 놓아준 자. Current finish stores that title. UI ending/journal/saved-title presentation normalizes the historic title without modifying old state strings. Endings 2/3 and final action labels stay unchanged. No title-based achievement exists; numbered ending IDs and quest/achievement records remain unchanged.
- Sancho has indirect narrated speech in chapter 5, not an independent direct-dialogue track; wording is retained.

## Evidence and limits

PASS local: 156 full state/RNG comparisons (72 chapter choices, 24 thread choices, 18 quest choices including deferral, 36 event choices, 3 endings + 3 postgames). Text/log/title values are excluded, decision keys retained. Existing numerical/compatibility/campaign suites also pass.

PASS static: 261 choice labels (including 114 skill labels and UI NPC/quest/final labels); 72 exceed the 18-character recommendation, zero exceed 30. No unspaced targeted auxiliary patterns, forbidden system phrases, source terminology failures or high-similarity narrator/question candidates remain. Literal before/after: part-c-string-diff.md (runtime keys) and part-c-source-diff.md (all source literal edits, including canonical movement).

Browser gate: PASS, run 37539823734 (commit d423f0d), all eleven jobs SUCCESS; ten script jobs each executed 376 entry/result/layout checks. The script-review matrix imports synthetic BF2 states through the normal save UI and taps the real actions. Each Chromium/WebKit width 320/360/375/390/430 checks all 24 chapter entrances and 72 chapter results, all 24 main-thread results, 18 quest choices, all 18 events/36 event choices, all six NPCs/five relationship tiers/repeats, NPC choices, three endings/faction/NPC epilogues, alternative companion epilogues, new/archived save reload/journal and simulated persisted-pageshow restoration. Buttons/text bounds, two-line story labels, image loads, HTTP and console failures are assertions. Physical devices and actual browser process/tab restoration remain NOT TESTED; persisted-pageshow handler is explicitly simulated.

Logs are stored as strings (note unshifts text, last 30 retained), not IDs. New logs receive canonical corrected sentences. Old historical log strings remain unchanged to preserve player history; revisiting a current dialogue renders canonical copy. Old dialogue sentences can therefore remain in historic journals. Automatic rewriting was declined because it would alter an already-recorded choice/story. Historic system phrases and ending title are display-normalized only.

Spacing exceptions: dictionary lexical verbs 돌려주다, 놓아주다, 물어보다 remain joined; user-specified 보여 준다 / 풀어 준다 / 나누어 준다 and other audited auxiliaries are spaced. Sources: Korean Language Institute Q&A 316147, FAQ 8606, Korean Basic Dictionary entry 45300. Mirror corridor class name, building 종탑, white-whale narration 사냥, quantified 골드 UI and resolved-action past tense remain intentional exceptions, listed in script-audit.json.
