# Dreambound 1.0 RC — verification results

October 18, 2026. These are automated engine/API checks, not human sessions or a measured engagement score.

| Check | Outcome |
| --- | --- |
| TypeScript compilation | Passed before production packaging; repeated as a packaging check. |
| `tests/v1.test.cjs` | Passed 21 UTC-day challenge configurations, each repeated with two independently identified players: same choices and score trail for the same strategy. All seven daily dream themes validated against real catalog IDs and work goals. |
| New pacing | All 15 decisions visit distinct life stages; level 100 is reached only after decision 15. Every simulated turn retained a legal affordable choice. |
| Strategy comparison | 50 seeds per strategy, 150 solo Quick Runs. Income-first: 21.1 average score, $53,358 average net worth. Learning-first: 56.5 score, $32,825 net worth. Balanced: 65.0 score, $44,142 net worth. These narrow algorithms are not representative human players; the comparison demonstrates trade-offs, not commercial balance proof. |
| Daily reward | Completion earns Dawn and 20 cosmetic stars. Direct pre-earning acquisition is rejected. Re-running finalization does not add another award. |
| `tests/multiplayer.test.cjs` | Passed ten full two-client API Quick Matches: 300 persisted choices and 40 shared reveals. Also passed two daily API runs (30 further choices), common forced setup, matching histories, archived score recovery, record isolation, and Dawn collection recovery. |
| Deadline and authorization | Passed start-at-join/start-at-solo rules, dormant-room expiration, no late shared rewards, outsider rejection, duplicate/stale move handling, turn authorization, hidden sealed votes, and cross-origin rejection. |
| `tests/multiplayer-edition.cjs` | Passed ten additional two-player engine Quick Matches, 15 choices per player, four shared events, expiry defaults, saved-state resume, auction fairness, no quick-mode leap exploit, and score arithmetic. |
| `tests/work-campaigns.test.cjs` | Initially failed because optional work quests were not offered often enough. After changing offers and adding distinct work-step trade-offs, all ten founder campaigns focused on the ten different work goals reached all three milestones in 100–116 total actions. Also passed story branches, all 60 business specialties, hotel/bakery management, appearance validation, and once-only work rewards. |
| `tests/game.test.cjs` | Passed catalog/choice-pool, campaign, and adaptive recommendation regression checks. |
| `tests/rewards.test.cjs` | Passed unlock gates, permanent collections, legacy saves, idempotent stars, automatic/manual outfit behavior, and age boundaries. |
| `tests/turn-notice.test.cjs` | Passed ordinary/shared turn reminders, no reminder after vote 0, waiting/spectator/offline/pause/final states, and duplicate-poll key stability. |
| Patch whitespace check | `git diff --check` passed. |
| Production package | Built during source workflow; deployment outcome is recorded by the hosting tool. |

## Known limits

- No new humans participated in these tests. No new willingness-to-pay or retention evidence was collected.
- No iPhone/Safari or browser screenshots were possible: the Sites-required control-browser skill is unavailable. Hair alignment, full phone layouts, and modal focus behavior still need actual device verification.
- No concurrent-user load benchmark, independent security review, payment, refund, or entitlement flow has been tested. Payment functionality is absent rather than simulated.
- Records compare the latest 100 saved lives, not an unlimited lifetime leaderboard. Recovery must be configured before losing the browser cookie. Replacing a recovery code does not revoke already active devices.
- The full campaign still uses simplified economic periods, not actual financial projections. The three simulated policies are intentionally narrow; a broader human strategy study may reveal dominant choices that require further tuning.

## Reproduction

From the project checkout:

```
node node_modules/typescript/bin/tsc --noEmit
node tests/v1.test.cjs
node tests/multiplayer.test.cjs
node tests/multiplayer-edition.cjs
node tests/work-campaigns.test.cjs
node tests/game.test.cjs
node tests/rewards.test.cjs
node tests/turn-notice.test.cjs
```

Build and publication use the Sites source workflow and `build-site.mjs`. Credentials are supplied through hidden stdin and are not in the project.
