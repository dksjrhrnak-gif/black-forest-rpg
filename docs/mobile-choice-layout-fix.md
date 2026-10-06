# Part A mobile layout QA follow-up

Part C first browser run 37539302147 exposed three-line chapter labels in the existing two-column action grid at 360/375/390/430px. This is a layout correction, separated from Part C sentence edits. Mobile chapter, event and final-story action groups now use one column, matching the existing NPC dialogue layout. Choice text, count/order, state, RNG and scoring are unchanged. The browser assertion remains strict: at most two text lines at every requested mobile width, without truncation, with actions below the scene image. Full A/B/C browser regression is rerun after this correction. No generated HTML is edited directly.

Initial run status: FAIL. Corrected run status: PENDING until workflow completion.

The first 320px run passed the chapter/thread/quest/event/NPC checks and then rejected an invalid synthetic pending-quest epilogue save (null outcome with completed quest). The fixture now uses the existing empty-string outcome and an unfinished quest count. Every synthetic import is validated before touching the save UI. This changes QA fixtures only; game validation and save rules are unchanged.
