# Part A mobile layout QA follow-up

Part C first browser run 37539302147 exposed three-line chapter labels in the existing two-column action grid at 360/375/390/430px. This is a layout correction, separated from Part C sentence edits. Mobile chapter, event and final-story action groups now use one column, matching the existing NPC dialogue layout. Choice text, count/order, state, RNG and scoring are unchanged. The browser assertion remains strict: at most two text lines at every requested mobile width, without truncation, with actions below the scene image. Full A/B/C browser regression is rerun after this correction. No generated HTML is edited directly.

Initial run status: FAIL. Corrected run status: PASS, run 37539823734, all eleven jobs SUCCESS.

The first 320px run passed the chapter/thread/quest/event/NPC checks and then rejected an invalid synthetic pending-quest epilogue save (null outcome with completed quest). The fixture now uses the existing empty-string outcome and an unfinished quest count. Every synthetic import is validated before touching the save UI. This changes QA fixtures only; game validation and save rules are unchanged.

Part B visual follow-up: direct review of the actual 320px chapter screenshot showed that centered cover cropping cut Alice out of her own story illustration. Alice and Ahab stand on the left in their original approved story art, so those two scene images now anchor cover cropping to the left. Original image files and other mappings are untouched. The Creature/Victor illustration visibly contains both matching people and remains centered; reuse in their matching NPC scenes is therefore valid. Queen/Quixote keep the existing region fallback.


## Direct screenshot review after the integrated artwork extension

The 390px Chromium chapter screenshot at commit 54e6295 revealed that object-position alone did not keep Alice visible: the long dark text overlay still covered her lower position in the original 600×900 portrait. This is a visual FAIL, even though automated bounds checks passed. The story-only hero now reserves the whole original 2:3 image (contain, maximum 640px high), keeps the title over the image, and puts growing narrative text below it. Original pictures are unchanged. Landscape battle/event/boss layouts retain their cover behavior. The script browser harness now asserts that story copy follows the image instead of concealing its characters. A fresh full A/B/C gate is required before main.
