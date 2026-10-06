# Part B implementation and evidence

A gate: GitHub Actions run 37533781963, job 112509448887, SUCCESS before any B code changes.

- Baseline assets: 112 files; 36 dedicated class portraits. After: 121 files; 45 class portraits; 69 classes without confirmed artwork.
- 9 newly confirmed dedicated portraits added as WebP (640×960, quality 84, 109–153 KB). Original source PNGs and existing runtime assets are preserved. Largest new portrait is 152,530 bytes (148.96 KiB); quality retained for fine dream details.
- All 8 areas, 33 enemies including mimic, 9 bosses including rift, 18 events and 3 story artworks are connected. Story/NPC identity reuse follows existing author-approved Alice / Creature-Victor / Ahab scenes. Queen and Quixote keep fallback. No dedicated scene artwork for merchant, shrine, secret room or optional midboss; existing regional backdrop remains.
- Camp uses camp-card.webp; start/banner uses forest-banner.webp. Equipment already displays current job portrait; it remains. Current-job status detail now also displays that job's portrait. Start cards read image → name → Tier → description. Class portraits stay 2:3/contain; mobile job list becomes one column; no mass preload.
- Added null-registration/file-existence cross-check and valid nonempty WebP header check to the build. Case-sensitive paths and JOBS.image agreement are enforced. All 121 files are referenced; assets/ orphan list is empty. Historical root duplicates and unused illustrations remain documented in image-mapping.md and are not removed.
- Direct pixel review: 9 new portraits and 3 story artworks. Original 102 WebP ID/name mappings are verified against the authoritative artwork manifest; original scene pixels were not all re-reviewed during this task. Library candidate holds remain explicit; no inferred numeric-ID assignment.
- Local Node regression had an initial FAIL: a new portrait's working copy was empty after an interrupted check. It was restored byte-for-byte from this task's artwork commit (not from another class); no existing image changed. Build now rejects empty/invalid WebP files.

## Browser gate

Pending remote Chromium/WebKit runs after B publication; do not start C until success. All required widths are device emulation; physical devices are NOT TESTED. Live Pages checks happen after the final approved main integration, so the newly added files on live Pages are NOT TESTED at this gate.
