# Dreambound 1.0 RC3 — Dreams and remembered choices

## Added
- Seven authored final dilemmas: hotel, founder, financial freedom, athlete, artist, explorer, and changemaker.
- Five responses per dream, with 35 named endings. Quick Matches use decision 15; campaigns present the dilemma at level 100. Existing campaign win requirements still apply.
- Epilogues reflect the chosen route, actual health, freedom, debt, strongest recorded relationship, and unresolved promises. Runs that end early acknowledge the unfinished story.
- A visible People Remember panel records original choices, contacts, relationship trust, and pending or resolved commitments.
- Returning contacts explain the original decision that brought them back. Personal relationships and public reputation both affect referral offers.
- Returning authored stories change cash offers based on the earlier relationship decision: damaged trust reduces offers by 35%; positive trust increases them by 20%. Hints display the actual effects.
- Saved recent lives and copied results include the ending title.

## Verification
- Passed 70 finale branches: seven dreams × five choices × two modes, including zero-cash access, once-only recording, correct timing, and rejection of management actions that bypass the final dilemma.
- Passed ten automated two-player API matches (300 decisions, 40 shared reveals), including persistence, authorization, duplicate/stale requests, recovery, and profile regression checks. These were simulations, not ten human play sessions.
- Passed ten automated Quick Runs and 2,250 mentor readings; 1,390 distinct readings across these samples.
- Passed 2,000 low-resource menus and event variety/recovery tests.
- Passed nine baseline full campaigns across three dreams/seeds (140–149 decisions), ten work-goal campaigns, and 150 strategy simulations plus daily challenge checks.
- Browser-reviewed the hotel shared-ownership ending and athlete recovery ending using temporary local fixtures and production UI components. The fixture route was removed before packaging. Screenshot: docs/qa/rc3-ending.jpg.
- TypeScript and production build checked during packaging.

## Practical limits
The seven dreams have authored narrative branches and share five resource trade-off patterns. Endings do not guarantee victory or invent achievements. Old saves without recorded choice origins display an explicit fallback. A match that times out or ends before a player reaches their dilemma produces an unfinished epilogue. Physical-phone and fresh human engagement testing remain useful; automated tests cannot establish how memorable or emotionally satisfying an ending feels.

## Suggested next playtest
Ask two friends to finish different dreams, retell the final trade-off without looking at the screen, and name an earlier choice that changed a later offer. If they can do both, the narrative connections are visible enough; if not, strengthen those specific scenes before adding more content.
