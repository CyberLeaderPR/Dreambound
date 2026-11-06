# Dreambound 0.6.2 — character styling and turn reminders

- Corrected inaccurate original outfit descriptions (teal jacket, violet sneakers, green workwear).
- Renamed the original palette to Original outfit colors: every earned outfit keeps its authored colors. Optional violet, ocean blue, and neon green tints normalize the base before tinting so the result does not depend on the original outfit hue. Picker swatches now use the intended tint.
- Creator preview uses the current outfit and selected palette instead of always showing an untinted starter.
- Bob has its own wider, shorter frame and scalp anchor across all skin/face and age combinations, rather than inheriting the other hair frame.
- Woman selection applies arched brows, rose lips, and independent gold stud earrings. Man selection applies heavier brows and a stronger mouth/chin accent. Other gender options retain the original face. Hair, skin, face shape, and body remain independently selectable.
- Persistent multiplayer turn banner appears on the main screen and inside settings/creator dialogs, including unanswered simultaneous opportunities. Go to choices closes settings and scrolls/focuses the decision panel. Creator warns to save edits before leaving. The alert chime obeys the existing sound toggle; tab title also identifies the turn.
- Repeated polls do not repeat the arrival chime. Alerts are suppressed for submitted shared votes (including vote 0), spectators, solo mode, incomplete rooms, paused/offline play, and finished games.

Validation: TypeScript passed. tests/turn-notice.test.cjs passed the relevant state transitions and duplicate-poll key check. Production build is run during publication. No gameplay economy or scoring changes.

Verification limit: Browser/phone visual QA was not available in this session (Sites requires control-browser, which is unavailable). Appearance alignment and modal interaction need an actual phone pass; do not interpret compilation as proof of visual perfection.
