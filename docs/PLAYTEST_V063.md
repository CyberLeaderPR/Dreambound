# Dreambound 0.6.3 — understandable scoring and longer Quick Matches

## User feedback
Latest submitted report: 8 minutes, enjoyment 3/5, would replay Yes. Confusion: natural outfit colors were hard to find; winning criteria and solo results were unclear; 12 decisions felt short. These are reports, not independently observed sessions. Do not infer unique-player counts or a measured engagement percentage.

## Changes
- Natural colors · no tint explicitly preserves each outfit's authored colors; the wardrobe explains the optional tints.
- Quick Match now ends after 15 decisions per player (30 total in multiplayer) or 15 real minutes, whichever comes first. Shared responses are extra decisions and do not consume the 15 regular choices. Four shared encounters ordinarily occur before the finish.
- Server deadline starts at solo creation or when the second player joins. It continues in settings, on pause requests, and during disconnects. Reads and subsequent requests settle expired matches before any further choices/rewards. Campaign retains its existing active-time limit.
- Live and final score breakdown shows the five contributions: wealth /35, wellbeing /20, free time /20, trust /15, skills /10. Wealth is net worth, capped at $250,000. Dreams and work goals shape choices and rewards; stars are cosmetic. Rules are visible at setup and during the match, not only in help.
- Solo Quick Runs finish as scored completions, not automatic wins. Personal best is compared to the previous 15-decision solo best. Reopening the same result preserves its original comparison. Records are browser-local and scoped to the player; they do not recover across devices or cookie loss. Legacy 12-decision completed games are excluded.
- Solo campaign win still requires level 100 plus the dream. Timed-out solo campaigns report progress. Multiplayer campaign ranks level first, then dream progress; adjusted the fractional tie-break so dream progress cannot outweigh a full level.
- Joining players see the actual room's mode in the pre-game rules.

## Verification
TypeScript passed. Ten engine multiplayer simulations completed at 15 decisions each (300 decisions total), with four shared opportunities per match. Ten full two-client API simulations also completed 300 persisted decisions and 40 shared reveals. Additional checks cover solo completion, repeat-result record comparison, tie and score arithmetic, no cosmetic contribution to score, deadline starting conditions, pause/disconnect deadline enforcement, dormant-room expiration, and rejection of late shared rewards. An API check caught the public-view serializer incorrectly mapping the new solo-complete result to opponent; corrected and retested successfully.

Production build runs during publication. Browser/phone visual QA is unavailable in this session; the Sites workflow requires control-browser and it is not exposed here. These automated checks are not human usability testing.

## Next direction
Ask the next player to explain how to win before their third decision, select Natural colors successfully, and identify the largest contribution to their final score. Measure completion time and replay intent again. A separate balancing pass should assess whether the $250,000 wealth cap makes wealth too weak over 15 decisions; this release exposes the existing formula rather than silently changing it. Do not claim a 90% or 99% engagement score from these results.
