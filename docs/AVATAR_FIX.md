# Avatar alignment fix — 2026-10-06

The face and hair atlases contain different amounts of transparent padding in each cell. Fixed CSS offsets positioned some hair over the eyes and exposed the scalp, while other skin tones also shifted the head.

The renderer now normalizes each face around its visible center and chin, uses a scalp anchor for each hairstyle, and keeps the head attached to the body at child, teen, and adult sizes. Existing saved appearances use the corrected rendering without a migration. Artwork is unchanged.

Visual checks: all 63 combinations of seven hairstyle options (including bald), three faces, and three skin tones; child/teen/adult neck alignment; short crop with tan/angular face in the actual creator at 390px width. All inspected combinations retain a covered crown and visible eyes. Phone screenshot: avatar-hair-fixed.jpg.

TypeScript check passed. This is a rendering-only repair; the full campaign simulation was not rerun.
