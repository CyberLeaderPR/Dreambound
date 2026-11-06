# Dreambound v0.4 — playtest and release report

Prepared October 5, 2026. This report covers the career-goal additions and the pending v0.4 update. All currency and prizes are fictional.

## What changed

**All ten work-goal categories are selectable**, separately from your life dream and career. You can pursue sports with a mastery goal, run a bakery with a creativity goal, or build a business while prioritizing mentorship. Work goals add age-appropriate decisions, visible progress, and three personal milestones. They are optional: completing your life dream still wins the race.

| Work goal | What its decisions emphasize | Final milestone also requires |
|---|---|---|
| Financial freedom and time autonomy | Recurring income, delegation, protected time | 75 free time |
| Career mastery and professional excellence | Practice, qualifications, teaching expertise | 95 skill |
| Leadership and influence | Developing people, responsibility, succession | 85 trust |
| Entrepreneurship and business building | Paid experiments, assets, repeatable operations | $80,000 business assets |
| Impact, purpose and meaning | Community-led projects and services | 250 impact |
| Creativity, innovation and expression | Original projects, prototypes, licensing | 2,000 audience |
| Stability, security and predictability | Dependable work, reserves, fewer obligations | $100,000 cash |
| Lifestyle design and freedom of location | Portable skills, remote work, boundaries | 90 free time |
| Recognition, status and achievement | Verified results, credible awards, reputation | 90 trust |
| Legacy, teaching and mentorship | Teaching, mentoring, sustained institutions | 300 impact |

Each final milestone also requires 18 work-goal decisions and level 61 or higher. The three stages award 15, 30, and 50 style stars. Stage two adds a Leap Ticket; stage three unlocks the permanent Legacy Laurel. Repeating a completed milestone cannot award it again. Buying cosmetics does not improve the odds of winning.

The broader update includes:

- **Seven life dreams:** hotel ownership, entrepreneurship, financial freedom, sports champion, headline performer, world exploration, and community impact. Each has its own completion requirements. Sports offers basketball, soccer, tennis, and track as themes; these are choice-based stories, not playable sports matches.
- **24 authored scenes in 12 returning story arcs.** Friends, family, coaches, collaborators, employees, and clients remember prior decisions. Later dialogue changes; trust, obligations, networks, and finances carry consequences forward. Not every scene appears in every life.
- **Expanded character creator:** gender, three skin tones, three face shapes, six hairstyles plus bald, five hair colors, and three body builds. Face, hair, outfit, palette, and companion are separate layers. Gender does not change abilities or available work.
- **Hotel management:** add standard, suite, family, or accessible rooms to a property of up to 12 rooms. Occupancy depends on demand and staffing. Room mix changes rates; unused rooms still cost money. This is a room-mix editor, not a furniture or architectural floor-plan builder.
- **Bakery management:** choose flour, product, batch size, and price. Recipes include sourdough and no-added-sugar loaves. Costs, demand, production, inventory, and spoilage affect operating results.
- **60 business profiles and 180 named specialties** across five shared operating families. Specialties affect quality, efficiency/capacity, or demand. These are not 60 entirely separate management simulations.
- **Permanent cosmetic collection and player recovery.** Owned outfits/accessories carry into new lives. Stars remain specific to each life. A private recovery code restores the player, saved lives, and collection after cookie loss or on another device. Only its hash is stored. Replacing the code invalidates the old code but does not sign out existing devices. Save a code before losing access; there is no email-based recovery if both cookie and code are lost.

The existing 100 levels, 120 careers, five relevant choices, earned three-level skips, independent 1-in-1,000 decision bonus, optional trance music, and 60-active-minute match limit remain.

## Test results

**All six automated suites and TypeScript checking passed.** The recorded run includes 98 completed simulated campaigns:

| Test | Result |
|---|---|
| 70 combinations: seven dreams × ten work goals | Every main dream completed; 79–110 decisions and 91–123 total actions including skips |
| Ten deliberately work-focused campaigns | Every final work-goal milestone earned; 97–112 total actions |
| Nine original-dream campaigns without skips | Completed in 142–183 decisions |
| Nine original-dream campaigns using skips | Completed in 88–110 total actions |
| Two-player API integration | Separate players, alternating turns, room capacity, saved resume, stale-request rejection, duplicate-move protection, and hidden rival credentials passed |
| Collection and recovery | Hash-only storage, invalid-code rejection, recovery without the old cookie, code replacement, saved appearance/work goal/sport, and free reuse of owned cosmetics passed |
| Rewards and management | Once-only milestone rewards, final-level skip safety, management authorization, invalid-setting rejection, room capacity, recipe waste, and business specialty validation passed |
| Bonus and timer | Exactly one winning value among 1,000 possible rolls; unbiased server sampling; timer expiration and pause passed |

These are simulated decisions, not measured human playtime or retention. The timer caps a match at 60 active minutes even if the dream remains unfinished; highest level wins, with dream progress breaking ties. Pausing or leaving the game inactive can make wall-clock time longer than one hour.

### Browser checks

Played 11 actual interface decisions in a sports/mastery life, reaching level 6 and resolving the childhood friendship and coach stories. Verified the work-goal counter, rewards, changing advice, and saved character appearance.

Used two isolated local level-41 fixtures to test the business editors: adding a corner suite increased the property from two rooms to three and updated operating results; launching an oat-blend, no-added-sugar recipe saved the selections and produced a sales/cost/waste ledger. These fixture checks were not full manually played campaigns.

Inspected desktop and a 390-pixel phone frame. The phone document width and scroll width both measured 375 pixels after its scrollbar: no horizontal overflow. The choices and character editor remained usable. This is a responsive browser check, not a physical iPhone test.

The last planned collection-screen browser check was interrupted when automatic approval review could not complete because the session hit a usage limit. Collection and recovery passed automated API tests; a complete visual recovery flow was not performed. Music was not subjectively evaluated through speakers in this release. Production load testing and a broad accessibility audit remain unperformed.

## Problems corrected during this update

- Connected the previously unfinished creator, story, management, and collection modules to the game interface; fixed compilation errors.
- Aligned the separate face, hair, and body layers; kept the selected appearance in reward celebrations.
- Replaced percentage formatting on wins, fans, and discoveries with actual counts and targets.
- Disabled choices until their required skill, wellbeing, and cash are available.
- Gave business specialties operational effects and corrected hotel occupancy to use actual rooms sold.
- Updated outdated text that said cosmetics were restricted to one match or recovery was unavailable.
- Applied the new tables and indexes to the local preview database, fixing its initial save failure. Production migrations are included in the release.
- Updated an old test policy that assumed fixed dream-goal positions and overlooked the hotel ownership requirement. Goal checks now follow their labels.
- Made the work-focused simulation protect trust. Quick-payday decisions could otherwise complete the main dream while missing a trust-based personal milestone; that is an intentional trade-off, not an automatic reward.

No blocking defect remained in the tested paths. Passing these tests does not establish that every possible sequence is bug-free.

## Engagement feedback

My provisional **design assessment is 88/100**, compared with 82/100 for v0.3. It is an editorial assessment, not a measured attention percentage, retention rate, or guarantee. The requested 90% human-engagement target remains unverified.

| Dimension | Score | Assessment |
|---|---:|---|
| Meaningful choices | 18/20 | Work values and distinct dreams create competing priorities; the checkpoint sequence remains learnable. |
| Rewards and anticipation | 19/20 | Personal milestone quests, skips, persistent cosmetics, and recovery give progress more lasting value. |
| Consequences and business depth | 18/20 | Returning relationships, room capacity, recipes, and specialties improve decisions; shared business models remain. |
| Pacing and clarity | 17/20 | Visible requirements and a one-hour active limit help; setup and the side panels still ask players to read a lot. |
| Visual and audio feedback | 16/20 | Independent character features and responsive layouts improve ownership; the world remains largely static and music needs listening tests. |
| **Total** | **88/100** | **Stronger playtest candidate; real-player validation is next.** |

What I would change next, based on these tests:

1. **Vary checkpoints more.** Replace some recurring wealth/investment/skill/health/time checkpoints with authored dream or business objectives. The new stories interrupt repetition but do not eliminate it.
2. **Add more business-specific surprises.** Hotel group bookings, staff turnover, bakery preorders, and supplier failures should have distinct follow-up choices. The current room and recipe editors are useful foundations.
3. **Shorten onboarding.** Keep the initial goal choice simple and reveal advanced metrics when relevant. Watch whether friends understand stars, work goals, and their next checkpoint without help.
4. **Measure voluntary replay before claiming 90% engagement.** Have five pairs play and record completion, time, confusion, and whether they choose another life. Ask what choice they remember and why. Do not turn a developer score into a claim about player attention.

Before playing, start a new life to select a work goal. Existing saves remain playable and can use the new wardrobe and recovery tools, but are not automatically assigned a work goal. Save your recovery code through **Player & collection**. The Site remains owner-private; a room link alone does not grant a friend access.

Evidence: [automated verification](verification-v04.txt), [70 campaign results](campaigns-v04.json), [hotel editor](playtest-v04-hotel.jpg), [bakery editor](playtest-v04-bakery.jpg), [phone choices](playtest-v04-phone.jpg), [phone creator](playtest-v04-creator-phone.jpg).
