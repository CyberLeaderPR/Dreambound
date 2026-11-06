# Dreambound 1.0 release candidate: product and commercial review

Prepared October 18, 2026. Owner: Manny Colón. Target: a game people choose to replay and a path to $5,000+ per month in real sales.

## Decision

Ship this build as a free **1.0 release candidate**, then run a tightly measured paid-pilot decision. Do not describe it as a commercially proven 1.0 or as a $5,000/month business yet. There is no payment processing, subscription, purchase entitlement, or measured conversion funnel in this build. Existing access remains free. No money has been charged and no outreach has been sent.

The evidence supports continuing product development. The three submitted feedback reports were 4/5, 4/5, and 3/5 enjoyment, all with replay intent Yes. They are not a verified count of unique people. They do not establish retention, willingness to pay, revenue, educational effectiveness, or an engagement percentage.

## Competitor comparison

This is a review of official product descriptions, not a claim to have personally played the competitors. Their scale, production budgets, and audiences differ from Dreambound.

| Reference | What the official source demonstrates | Lesson for Dreambound | Position after this build |
| --- | --- | --- | --- |
| The Game of Life 2 | Solo and online play, cross-platform friends, themed worlds and cosmetic items; the publisher describes a paid base game and optional extra worlds. | The social experience and repeated themed play must justify paying. | URL joining removes installation friction, but two-player polling and the illustrated interface still need real-device comparison. |
| BitLife | Free base experience with optional upgrades for additional story content, job packs, and other features. Its help page states a 17+ rating. | Players can pay for more meaningful stories after enjoying a free core. | Dreambound can focus on a gentler financial-life rivalry; it has much less authored content. |
| Super Life (RPG) | A career/life progression game with achievements and Steam Cloud on its store listing. | Progress should be visible and owned across runs. | Recovery-backed result history, permanent cosmetics, a life-score trail, and a new daily reward strengthen that loop. |
| NGPF Arcade | Free financial games with focused topics, short playtimes, and reflection worksheets. | Generic finance learning alone is insufficient differentiation. | Dreambound needs the combination of personal dreams, rival decisions, businesses, and replayable life stories. |

Sources checked October 18, 2026:
- https://www.marmaladegamestudio.com/games/the-game-of-life-2
- https://www.marmaladegamestudio.com/news/the-family-guide-to-the-game-of-life-2
- https://bitlifeapp.com/help/
- https://store.steampowered.com/app/1087460/Super_Life_RPG/
- https://www.ngpf.org/arcade/

## Implemented in this candidate

1. **A complete short life in 15 decisions.** New version 1.0 runs reach level 100 on decision 15, rather than reaching it near decision 11 and repeating the final stage. Existing saves keep their earlier pacing.
2. **More credible wealth scoring.** Initial strategy tests found average final net worth around $33,000–$53,000. For new 1.0 Quick Matches, full wealth points now require $100,000 rather than $250,000. Old saves retain their original threshold. Five score contributions remain visible.
3. **Daily solo challenges.** A server-chosen UTC day fixes the starting dream, career, work goal, sport, and choice seed. Seven themes rotate; date-based seeds vary the offered story. Name and appearance do not confer an advantage. It is not a global ranked competition.
4. **A guaranteed cosmetic reward.** Completing all 15 daily decisions earns a Dawn companion and 20 style stars. It can be equipped immediately. The API blocks acquiring it before earning it. Repeated completion cannot double-award the same finished match.
5. **Recovery-backed personal records.** The latest 100 saved lives include results and scores. Standard solo runs compare only against other standard solo runs under the same 1.0 rules; daily runs compare only with that same day's daily runs. Multiplayer and older rules are excluded from these personal-best comparisons.
6. **A useful ending.** A score trail shows the effects of choices. The debrief identifies the weakest score area, explains one financial trade-off, and prompts reflection on relationships. Copy-result sharing is user initiated. Rematch creates a new room and prompts a new invitation.
7. **Less predictable shared encounters.** Eighteen authored scenario titles cover partnerships, auctions, and promises. Seeds vary the order, disclosed stake size, and scenario. These still use three core resolution systems; they are not eighteen separate management simulations.
8. **Career-quest availability.** The broader campaign test exposed too few opportunities to finish optional work quests before the ending. The offer priority now favors unfinished goals, and pilot, collaboration, and showcase variants change costs, benefits, energy, and obligations.
9. **Presentation and clarity.** An emerald/gold book-and-steps mark, matching favicon, sharing metadata, a standalone-launch manifest, a daily card, recent lives, an About & data page, and clearer separation of Quick Match scoring from optional dreams. The manifest does not provide offline multiplayer or offline saving.

The previous creator fixes, natural outfit colors, career backgrounds, turn alerts, tutorial, room joining, shared reveal, recovery codes, and cosmetic collections remain in place. Their mobile visual appearance is still awaiting device verification.

## Validation and its limits

See V1_TEST_RESULTS.md for the final commands and outcomes. Automated simulations exercise rules and persistence; they do not measure fun. Simulated strategies deliberately optimize a small set of attributes and are not a model of human behavior. Test runtimes are not session-length measurements.

Browser visual QA is blocked in this environment. The applicable Sites skill says: “If `$control-browser` is unavailable, skip browser QA: do not start a preview server, install a browser, or improvise another browser-control path.” That skill is at skill://plugin_connector_1p_689987207de08191979cf68eca2941c6/sites/SKILL.md. The required browser skill is not available here. Typechecking and builds cannot prove hair alignment, contrast on an iPhone, or modal usability.

No load test, independent security assessment, new human multiplayer sessions, or paid transactions were performed. Recovery codes control seats; they are not verified-email accounts or a payment identity system. The source still needs a commercial launch pass for abuse limits, support, deletion/retention handling, and payment entitlements. This is a concrete reason to keep this candidate free.

## Positioning and pricing hypothesis

Suggested positioning: **“Fifteen decisions. One life. Build your own kind of rich with a friend.”** Lead with a social life-strategy game. Explain the money learning through consequences and the result debrief.

Test a **$9.99 one-time purchase** before asking for a subscription. A potential offer is a host license for the commercial edition, with one friend able to join that host's room. This is a proposed product model, not an active feature or promise of content already paid for. Define what remains free, how existing players are treated, and exactly what a buyer receives before enabling checkout.

Optional authored story/world packs could later provide repeat revenue. Do not sell higher winning scores, better bonus odds, real-money investment returns, or access to recovery. Monthly pricing needs evidence that enough people return for fresh content and that content can be produced sustainably.

## What $5,000/month requires

These are planning scenarios, not market forecasts. Values below use U.S. dollars. Gross revenue is different from owner income.

| Model | Units needed for at least $5,000 gross per month | Gross revenue at that volume |
| --- | ---: | ---: |
| $9.99 one-time sale | 501 new sales every month | $5,004.99 |
| $4.99 monthly subscription | 1,003 active paying subscribers | $5,004.97 |
| $49 monthly group license | 103 active paying groups | $5,047.00 |

Illustrative cost model: assume 5% of gross for payment/platform fees, 3% refunds on the remainder, and $200/month fixed running costs. These assumptions are not processor quotes or measured Dreambound costs. A $9.99 sale contributes about $9.206 before fixed costs. Approximately **565 sales/month** would leave $5,000 after those assumed fees, refunds, and $200 costs, but **before advertising, support labor, content development, and taxes**.

At an assumed 2% qualified-visitor-to-purchase conversion, 565 sales requires about **28,250 qualified visitors/month**. At 1%, it requires 56,500; at 5%, 11,300. These conversion rates are unvalidated. A subscription's churn would require replacement customers every month. Group licensing faces free educational competitors and requires its own buyer research.

## Release gates before accepting money

Suggested decision thresholds, not claims of universal industry benchmarks:

- Ten additional real two-device sessions across iPhone/Safari and laptop browsers. At least nine should join without live help. Log connection recovery, missed turns, and any seat loss.
- At least eight of those ten players should correctly explain winning, cosmetic stars, and the 15-minute limit before decision three.
- Complete mobile visual review of all skin/face shapes, bob hair at all ages, gender details, natural colors, and the settings turn reminder. Fix every blocking issue first.
- At least eight of ten should finish a Quick Match without a blocking bug. Record actual time, enjoyment, and replay intention. Then observe seven-day returns rather than relying only on stated intention.
- Interview at least five target buyers about the exact $9.99 offer. A stronger signal is a completed purchase after a clear description, refund policy, and working entitlement flow—not a survey saying “maybe.”
- Merchant account under the owner's control; working checkout, verified webhook, idempotent entitlement storage, purchase restore, refund handling, and a buyer support path. Test failed payments and refunded purchases as well as success.
- Verify hosting usage and costs under realistic concurrent play; establish abuse limits and data/support procedures before paid traffic.

## Next decision needed from Manny

Choose the initial buyer and paid offer. My recommendation is a consumer one-time $9.99 commercial host edition, tested with a small paid pilot after device QA. Confirm whether this is the offer to build, and identify the payment/seller account you want to own and connect. Do not open a subscription or advertise a $5,000/month earning claim before the evidence exists.

## Professional assessment

Dreambound now has a more coherent replay loop and a clearer social-life strategy identity. I am comfortable putting this release candidate in front of more testers. I am not yet comfortable claiming commercial demand, $5,000/month revenue, or a finished paid 1.0. The next bottleneck is observed human behavior and payment ownership, not the version number or a larger question bank.
