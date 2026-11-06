# Dreambound — playtest 0.2

A turn-based two-player financial life simulation with fictional money. Players choose a life dream, explore career interests, and progress from childhood to adulthood through 100 levels.

## Playable scope

- 100 progression levels, grouped into 10 life chapters.
- 120 named careers and 60 business types in 12 industries.
- Each story level builds a bank of 75 choices (3 story-specific choices plus 72 career/industry options). A deterministic relevance scorer shows exactly five, using prior choices, career interests, affordability, wellbeing, checkpoint requirements, and the chosen dream. Diversity rules prevent five nearly identical actions.
- When a story choice does not meet the checkpoint, five preparation options are selected from six recovery/economic actions.
- Boutique hotel, business ownership, and financial independence dreams.
- Three advisors with helpful, practical, and potentially misleading advice.
- Persistent D1-backed matches, two-browser room joining, alternating turns, solo practice, autosave, and a recent-choice journal.
- Original pixel-art town, character portraits, and 18 full-body character graphics (six outfits × child/teen/adult). Six earnable outfit sets, 11 persistent achievements, achievement stars, wardrobe preview/equip controls, and milestone celebrations. Optional synthesized sounds and reduced-motion support.

## Economy

All values are invented game values. Each turn resolves a choice, earned and passive income, living costs, interest, and market movement. Skills increase earned income. Wellbeing below 25 halves earned income. Investments use one seeded shared market movement for a given level. Debt accrues 2% game interest per turn. Business assets have explicit passive income increments. Cash plus portfolio plus business value minus debt equals net worth.

A player first makes a story choice, then must meet the level checkpoint before advancing. Level 100 requires the dream's net worth, business asset or passive-income target, free time, and wellbeing. The first player to complete that checkpoint wins. The host takes the first turn.

## Important prototype boundaries

- No real-money deposits, payouts, purchases, investment accounts, or prizes.
- Careers and business categories have simplified effects, not 180 independent operating simulations. Professional licensing and education are not fully modeled.
- The 75-choice bank uses reusable industry/action patterns with stage-sensitive language and economics. It is not 7,500 independently authored branching narratives.
- The town is illustrated scenery, not a walkable 3D world. Characters visually grow at levels 11 and 21. Outfits include accessories; separate accessory slots and a full character creator are not implemented.
- Player identity uses an HttpOnly browser cookie; room state is persisted in D1. Clearing cookies loses the seat. No account recovery or cross-device player transfer yet.
- Resume-last-room stores only a local navigation preference. Game state is authoritative on the server.
- The hosting audience must allow a second person before room invitations can be used by them.
- No notifications, public matchmaking, chat, monetization, or retention policy UI yet.
- Playtest 0.2 received a browser run through level 25 against the running preview, including setup, saves, reload, reward unlocks, wardrobe changes, child/teen/adult graphics, and a 390px-wide responsive-layout test. Production build, type checks, nine full 100-level simulations, reward tests, and multiplayer route tests passed. See docs/TEST_REPORT.md for scope and remaining limitations.
- Browser WebMCP tools are feature-detected; registration in a supported browser was unavailable for validation.

## Implementation

- `lib/catalog.ts`: career and business catalogue.
- `lib/game.ts`: deterministic choice selection, progression, and economic resolution.
- `app/api/game/route.ts`: cookie identity, room operations, validation, optimistic concurrency.
- `db/schema.ts` and `drizzle/`: database schema and immutable migration history.
- `app/page.tsx`: game setup, play surface, advisors, goals, catalog, journal, and level map.

## Validation

Run `node tests/game.test.cjs` for all-level choice banks, catalog counts, branch differentiation, turn checks, and nine full campaign simulations. Run `node tests/multiplayer.test.cjs` for API route behavior using a real SQLite database behind a small D1 adapter, including room capacity, restoring state, concealed opponent player tokens, conflicting writes, and origin checks. Use `node node_modules/typescript/bin/tsc --noEmit` for type checking.

## Suggested next playtest questions

1. Are the five suggested choices meaningfully different and understandable?
2. Do career interests change the options enough to make a second life interesting?
3. Does the game feel like building a life, or only watching numbers rise?
4. How much risk and surprise should interrupt an otherwise strong strategy?
5. Should campaigns be long-running, or should short competitive matches award campaign progress?

## Playtest 0.3

Age-specific choice pools, five distinct decision priorities, checkpoint baselines,
persistent trust/network/obligations, scholarships, five business operating models,
style-star accessory purchases, palettes, guaranteed Leap Tickets, unbiased 1/1000
server bonus rolls, a 60-active-minute match budget, and original opt-in WebAudio
trance. New player fields are optional for compatibility with older JSON saves.

Run `node tests/game.test.cjs`, `node tests/depth.test.cjs`,
`node tests/rewards.test.cjs`, and `node tests/multiplayer.test.cjs`.
See `docs/TEST_REPORT.md` for scope, findings, limits, and the engagement rubric.
