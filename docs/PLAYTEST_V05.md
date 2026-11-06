# Dreambound 0.5 — Variety and reward playtest

Tested October 7, 2026. Ten baseline campaigns and ten final comparison campaigns used the same seven dreams and ten seeds. These are automated engine simulations using a goal-oriented, one-turn lookahead policy, with separate browser checks. They are not ten human play sessions or a measured engagement score.

## Result

All ten final campaigns reached level 100 and completed their dream. Final runs took 83–111 decisions plus 12 Leap Tickets (95–123 total actions). The 60-minute active-time limit remains enforced; these simulations do not establish real human reading/play time.

| Measure | Before | After |
|---|---:|---:|
| Completed comparison runs | 10/10 | 10/10 |
| Mean distinct offered choice titles per campaign | 112.6 | 341.9 |
| Mean recent-choice repetition | 52.0% | 7.2% |
| New curveball encounters per campaign | 0 | 10–16 |

Repetition means a displayed option title also occurred in any of the preceding three sampled menus. Menus are sampled before each action, including a skip. This compares visible repetition, not how different each mechanic feels. Runs do not pursue optional work quests; the existing work milestone rules are unchanged.

## What changed

- 20 authored, age- and state-aware curveballs, with five distinct responses each (100 responses). Includes school disruptions, unexpected attention, competing commitments, relationship repair, late invoices, hotel group bookings, ingredient shortages, and succession offers.
- 18 additional everyday actions, each with three age-dependent titles: 54 authored labels. Each age now has at least 96 everyday candidates before optional business, dream, and work-goal choices.
- Selection remembers the last 30 displayed options, including those the player did not choose. Prior interests and needs still matter, but a saved per-life seed varies selection and menu order. Refreshing cannot reroll the current menu.
- Checkpoints no longer repeat a fixed five-level cycle; relationship return timing varies. An existing saved checkpoint keeps its original goal until cleared.
- Curveballs appear at irregular intervals, have a minimum gap, and cannot repeat in a life. They award 5 style stars once when resolved. Stated effects remain visible; surprises are situations, not hidden charges.
- A gold reward notification stays on screen for 12 seconds, wherever the player has scrolled, with exact stars, tickets, outfit/accessory names, and the available star balance. It can be dismissed or opened directly into rewards. The existing reward recap remains available. Glow/pop motion respects reduced-motion preferences.
- Rewards are announced for ordinary choices, business management, and Leap Ticket progression. Already-owned cross-run outfits no longer hide the name of a newly earned milestone.

## Defects found and fixed

The first revised batch completed 8/10 runs. A negative business asset balance from an older story effect made non-business dreams prioritize opening businesses over their final dream action. Asset balances now floor at zero, and business priority only applies to dreams that actually require business assets. The final repeated batch completed 10/10.

A browser check found the first-move reward could be mislabeled as level-up when its outfit was already owned. The milestone now keeps its own name.

## Verification

- Focused variety tests: 20 reachable curveballs, five responses each, 2,000 menus at low cash/health, stable options after serialization, differing new-life menus/checkpoints, once-only curve rewards, named rewards, and final-dream action availability.
- Multiplayer/API regression: separate players, turn enforcement, stale/duplicate moves, saved resume, profile recovery, cross-run cosmetics, management authorization, bonus sampling, and clock/skip authorization passed.
- Exactly one successful bonus outcome among 1,000 roll values, and 60-minute expiration passed.
- Browser: started an actual solo match, earned first-move/business/investment rewards, encountered and resolved a new curveball, verified changed options and contextual advice, and checked the visible reward receipt on a 390px phone-sized game.
- TypeScript passed. Production packaging is checked during publication.

## Feedback

The repeated-menu problem is substantially reduced in these tests, and rewards are now visible at the moment of earning. Some recurring actions remain intentionally available for recovery and dream completion. The underlying economy still uses a small set of resource mechanics, so longer-term players may learn effective strategies even when situations vary. Human testing should now focus on whether the trade-offs feel different, whether 12 seconds is the right reward-display duration, and how often players finish within the hour. No defensible numerical engagement score can be assigned without player feedback.
