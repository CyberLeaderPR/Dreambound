# Dreambound 0.6 — Multiplayer readiness report

October 11, 2026. This report distinguishes implemented features, automated evidence, and validation that requires people. No measured 99% completion or 90% enjoyment claim is made.

## What changed

1. Public access requested for the existing URL; publication/access outcome is reported separately in the delivery message.
2. Shared-state polling reduced from four seconds to 1.2 seconds while visible. Focus, visibility and online events trigger recovery. Visible connection state, explicit reconnect, request timeouts, stale-revision recovery, and missing-cookie guidance. This is polling, not WebSocket push; network latency still applies.
3. A three-stage playable tutorial uses the actual choice engine in isolated browser state. Make a choice, see income/costs and a reward, then learn each mode's win condition. Tutorial items do not enter the permanent collection. “60 seconds” is a target, not a measured reading time.
4. Three shared encounters: a joint venture, sealed business bids, and a mutual promise. Both players lock choices; the server hides opponent votes until resolution. Only an auction winner pays; ties cancel the sale. A 60-second wall-clock deadline defaults absent players to pass, sit out or renegotiate. Resolution happens when a player next polls. Ordinary turns are blocked during an open shared event.
5. Quick Match: 12 decisions per player, three shared encounters, accelerated ages, no Leap Ticket use, and a 15-active-minute limit. Highest balanced life score wins: wealth 35%, wellbeing 20%, free time 20%, trust 15%, skills 10%. Wealth caps at $250,000. Draws are supported. Quick wins do not grant the full-dream victory cape. Full 100-level campaigns remain available.
6. An always-present in-match reward section previews the next milestone/associated outfit, exact stars and balance, and offers an Equip button for the latest unlocked outfit. Existing bright reward receipts remain. Shared-event rewards announce on the waiting player's next update as well as the resolving player's response.
7. Earlier connections, broken promises and business openings create later mentor, relationship-repair and returning-customer encounters. Timing varies. Reliable reputation increases referral value; repair, delegation, renegotiation and withdrawal have distinct costs. Existing relationship arcs and operational businesses remain.
8. End-of-match player feedback can be copied and shared: duration, enjoyment, replay intent and confusing/broken moments. Nothing is submitted automatically. A ten-session human playtest sheet is included.

## Verification and results

- Ten deterministic two-player engine Quick Matches completed: 24 ordinary decisions each and three shared events each. Tests cover timeout defaults, secret votes, duplicate vote rejection, tied bids, winner-only payment, recovery choices, returning consequences, serialization/resume, the 15-minute cap and blocked ticket exploits.
- Ten additional two-client API Quick Matches completed: 240 persisted decisions and 30 shared reveals. Separate player cookies; outsider rejection; opponent votes redacted. These use the actual route handlers with an in-memory SQLite adapter, not the production network.
- Existing multiplayer/API regression passed: turn rules, stale/duplicate moves, concurrent writes, player privacy, capacity, profile recovery and code rotation, cosmetic authorization/persistence, clock and skip authorization, and unbiased server bonus sampling.
- Ten full campaign simulations completed: 84–111 decisions, 96–123 actions including tickets. Average recent choice-title repetition 7.1%. These goal-oriented simulations are not human timing or engagement measurements. Campaign result JSON is retained.
- Variety regression passed: 2,000 low-resource menus, five distinct choices, reachable curveballs, repeat prevention, deterministic refresh, reward idempotence, rare bonus and the campaign clock.
- Reward and edition feature checks passed for unlocks, legacy saves, business specialties, appearance validation, work quests and authored story branches.
- TypeScript and publication build results are confirmed separately during packaging.

## Defects found and addressed

- Unaffordable shared choices initially required clicking to learn they were unavailable. Buttons now disable when cash is insufficient; every encounter retains a free choice.
- Polling players initially did not receive a flash for a shared reward resolved by the other player. Acceptance now recognizes that shared reveal transition and announces it.
- Quick Match winners could have been shown the campaign victory outfit by presentation helpers. Quick/time results now exclude that full-dream reward.
- Dependency additions required updating the standalone test transpilers. A malformed test dependency tuple was corrected before the API suite passed.

## What remains unverified

The Sites workflow requires the control-browser skill for managed preview testing. That skill is absent in this session, so no new browser preview was started and no mobile screenshot or fresh end-to-end device session is claimed. Production deployment confirmation does not prove anonymous joining, mobile visual correctness, synchronization latency, or recovery on a real device.

Ten human multiplayer sessions have NOT occurred. There are no real participant enjoyment scores, completion-time distributions or replay measurements. The ten API matches and ten engine matches are automated checks. Shared phases use wall time while the gameplay cap uses active time, so elapsed session length can exceed 15 minutes with pauses, reading or disconnections.

## Is it dreamy enough?

The strongest appeal is turning a personal life ambition into a visible character journey. Sports, music, ownership and freedom offer different reasons to care. Shared opportunities now make the other person relevant beyond a scoreboard, and the shorter mode makes trying the game less demanding.

The main design risk is still that varied writing can sit on familiar resource trade-offs. Three shared encounter families may become predictable across repeat matches. The character art and reward previews also need fresh phone inspection. More content alone will not prove delight.

The next direction should be evidence-led polish: test with unfamiliar players, shorten setup if they hesitate, tune Quick Match scoring from observed strategies, and deepen the most-loved shared event. Keep the full campaign for players who ask for more. Do not expand to many simultaneous players until the two-player flow is validated.

## Ten human sessions: protocol and proposed acceptance targets

Recruit ten pairs across friends/family/classmates, including at least four phone-to-phone pairs and two mixed phone/laptop pairs. Use fresh browsers where possible. Have each pair create/join without coaching, try the tutorial, finish Quick Match, and return once after backgrounding a phone. Ask permission before recording any session; anonymous notes suffice.

Record joining time, whether login/approval appeared, tutorial comprehension (cash vs stars and winning), match duration, stuck points, sleep/reconnect behavior, enjoyment 1–5, and replay intent. Use the session sheet. Ask: “Which choice mattered most?”, “When did the other player affect you?”, and “What would make you play one more match?”

Targets, not results: all ten pairs join without login; no lost/duplicated turns; at least nine explain cash vs stars and the win condition; at least eight finish Quick Match within 15 elapsed minutes without coaching; at least eight rate enjoyment 4/5 or higher and say they would replay. Investigate every failed join and every stuck match before submission.

## Submission readiness

After public deployment: verify anonymous access from a signed-out device; run the human sessions; fix observed UI/network issues; capture the current game screen; prepare the title, cover image, short description and live link. Submit manually in Handshake. Earlier review found the official rules deadline is October 30, 2026 at 11:59 p.m. Pacific, despite October 31 promotional wording; recheck the current rules before entry.
