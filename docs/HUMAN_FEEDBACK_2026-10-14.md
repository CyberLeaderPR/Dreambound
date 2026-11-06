# First human feedback: Dreambound 0.6

Reported by Manny on October 14, 2026. Two player reports; not assumed to be two separate matches.

| Player | Time | Enjoyment | Replay intent | Report |
|---|---|---|---|---|
| 1 | 10 minutes | 4/5 | Yes | Opening tagline unreadable against illustration and obscured by character. |
| 2 | Not recorded | 4/5 | Yes | None reported. |

Mean enjoyment: 4/5. Replay intent: 2/2 yes. One recorded duration meets the 10–15 minute target. These are promising early signals, not a reliable population engagement score or evidence of ten human sessions.

## 0.6.1 correction

The opening illustration and character now occupy a separate fixed-height artwork row. All introductory copy flows below it on an opaque dark panel with light text. No fixed text-box height; copy can grow with wrapping or enlarged fonts. The character stays within the artwork region at desktop, tablet and phone breakpoints. No gameplay changes.

Source inspection identified overlapping absolute positioning and variable illustration contrast. The production build validates compilation. Fresh browser/phone visual QA remains pending because the required managed-preview browser skill is unavailable in this session.

## Next observations

Ask the first tester to refresh to 0.6.1 and confirm the full tagline is readable. For future players, record elapsed time, whether they understand stars versus cash, the decision they found most meaningful, and what would make them replay. Preserve “not recorded” for missing timings rather than estimating them.

## Career scenery added

Twelve illustrated workplace settings now follow the player's current career industry from level 21 onward. Childhood and teen chapters retain the hometown. All 120 careers map to one of the twelve sector scenes; this is not 120 unique rooms. Career switches update scenery automatically. The world badge identifies the setting. The in-game chapter caption now also has a dark readable panel above the illustration. No income, turn, or win rules changed.

Artwork: built-in image generation produced a 4-column workplace atlas (hotel, bakery, technology, clinic; creative studio, finance, trades, architecture; retail, classroom, logistics, outdoor science/sport). Source asset: public/career-worlds-v1.png. SVG viewport framing preserves artwork proportions while fitting responsive screens.
