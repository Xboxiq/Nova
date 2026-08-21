# Reading the ninth batch: fourteen images, five artefacts, one spec sheet

The owner sent fourteen more reference images with four words — «أفعل نفس الشيء مع هذه
الصور». "The same thing" is a pipeline now, and its first step is not code.

## The count

Fourteen crops. **Five** artefacts:

1. **A compliance app on an emerald field** (2 crops) — a glass folder with document
   sheets fanned behind it, and a phone showing recent activity: a review track with
   a triangle marker, eye badges on documents, a time pill.
2. **A violet dark engineering board** (4 crops) — a time-sheet leaderboard with the
   leader in an accent plate, a four-band velocity arc reading a percentage, a task
   card with a priority flag and a subtask count, kanban lanes with coloured heads,
   an activity feed with a transfer at 43%.
3. **The palette slide already in the library**, on a lavender ground instead of an
   olive one (1 crop).
4. **A light learning hub** (3 crops) — gradient course cards over dark inner plates,
   a progress donut with a hatched In-Progress segment, a schedule of hatched tracks,
   a task list with exactly one card inverted.
5. **A hydration tracker on an aqua field** (4 crops) — a glass card with a week's
   curve, a dotted reference line and seven day pills; three gradient blobs and a
   white tile — **and one slide that is not a design at all**.

## The slide that is a spec sheet

The fifth artefact includes the recipe, with the numbers written on the artboard:

| stated | named as |
| --- | --- |
| Background Blur 20 | `--pane-blur` |
| Transparent Fill 25% | `--pane-fill` |
| White Stroke 35% | `--pane-stroke` |
| Top Highlight 1px White | `--pane-highlight` |
| Inner Shadow 0 / 1 / 8 · 20% | `--pane-inner` |
| Soft Shadow Y:8 Blur:30 · 12% | `--depth-pane` |

Being handed the numbers is the reason `glasswork.tsx` exists as one file. Two
unrelated products in this batch — the legal app on emerald, the hydration app on
aqua — are the *same pane* over different grounds. Typed at each use site, those
two drift apart inside a week of edits. Named, changing the pane is one edit. That
became §28.

§28 also carries the negative half: **two jobs are two named recipes, not one
function with a flag.** `glass()` in `mesh.tsx` is a chip floating on the
photographed mesh at blur 14 with a 24% stroke, tuned for a dark ground. `pane()`
is the reference's stated recipe at blur 20 and a 35% stroke, and it has to stay
legible over a pale one. Merging them behind a boolean would have saved lines and
hidden that they do different things.

## What was refused

Four components were not written, each with the reason on the page:

| the reference shows | what already does it |
| --- | --- |
| kanban lanes with coloured heads | `KanbanBoard` in `collections.tsx` — the card is new, the board is not |
| a progress donut with a hatched segment | `SplitDonut`, whose `hatch` slice kind has meant exactly that since the last batch |
| a month calendar | `CalendarMonth` |
| a project file tree | `TreeView` |

And one component was **not** built as a component at all. The lavender palette
slide is `PaletteSlide` with `tone="light"` — nine lines, because the type, the
pills, the spheres, the copy behaviour and the live region are identical and only
the field and the ink direction change. That became §29.

## What §29's hard half cost

§29 says a recurring design is a key, and adds: **a key that is not rendered is a
claim nothing measures.**

That was not theory. `LaneBoard`'s lane headings needed one ink per key — the raw
band hue measured 4.48:1 on the dark ground and 2.19:1 on the light one. I fixed
it, then mutated the fix back to prove the harness would catch it.

It did not. The light key was correct and **invisible**: the showcase rendered only
the dark board. Adding a light `LaneBoard` to the section turned the same mutation
into six axe violations. A key you declare, you render.

## Three defects a screenshot found and a harness did not, and one the reverse

**The arc ate the click.** `ArcGauge` draws a 240° sweep, so the drawing is 208px
tall and the visible arc is 162. The overflow — `aria-hidden`, i.e. not present for
a screen reader — sat over the legend below it. The first legend pill worked; the
second did nothing. Nothing looked wrong. `tools/qa/operable.mjs` found it, which
is what it was written for. That became §30: what does not exist in the
accessibility tree must not exist in the touch tree either.

**The fan could not be fanned.** Raising the selected sheet's z-index put it over
the middle of every sheet behind it. Selection became a lift instead, and the fan
pitches below each sheet's own height so every one keeps a band of itself exposed.
Also caught by the harness; also invisible in a still.

**Selection by subtraction.** Course cards at `opacity: 0.66` and arc bands at
`0.5` — which greyed out the black plate the card exists to carry, and turned amber
to brown and green to sludge. No harness measures "the design lost its colour", and
it took looking at a 2× screenshot. That became §31: the mark is added — a ring, a
shadow, a stroke width — never subtracted.

**And the reverse.** `SplitDonut` measured 1.64:1 in the night pack at 390px. Every
value in it is chosen for white, and both original call sites wrapped it in a white
card to make that true. A third call site forgot. axe found it in a second; no
amount of looking at the light theme would have. The fix was a `ground` prop and
**both wrappers deleted** — smaller than the bug.

## Eight contrast defects, fixed once each

| what | measured | why | fixed at |
| --- | --- | --- | --- |
| white on the dark accent | 4.23 | the accent was too light for 11px | the accent |
| the leader row's role line | 2.95 | 0.72 white on the accent, not on the plate | one conditional alpha |
| the light key's label, ×3 | 3.96–4.22 | 0.58 alpha | one alpha |
| the priority flag | **1.57** | hue ink on an 18% tint of itself | solid hue, dark ink |
| the lane heading | 4.48 / 2.19 | one ink for two keys | one ink per key |
| the course card's footer | unmeasurable | it stood on the raw gradient | moved onto the plate |
| the vitals blob text | ≈2 by hand | white on a mid-tone gradient — **axe skips gradients** | the ink moved, not the design |
| the day pills | ghostly | label alpha on a pale pane | full ink |

The seventh is the one worth naming. A gradient background is invisible to a
contrast checker, so "white on a pastel gradient" fails silently forever. A
gradient is legible under white only if *both* stops are dark; these blobs are
pastel by design, so the ink went dark and the design stayed.

## The slop standard, obeyed where it was right

Rule 04 bans five specific hexes — the tailwind violets — because they are the ones
reached for by default. It flagged **both** of my first two guesses at the
reference's accent, `#8b5cf6` and `#7c3aed`. The board is a purple board and stays
one; it does not have to be the *default* purple. `#6d3ce0` also clears 6.2:1 under
white, which `#8b5cf6` did not.

The scanner then flagged the comment recording why the banned violet was not used.
`geometry.mjs` had already learned that comments are not drawings; the same lesson
is now in `anti-slop-30.mjs`.

## What got smaller

- `isRtl`, `move`, `n` and `smooth` existed twice each in `credit.tsx` and
  `boards.tsx`, already drifted — one copy treated ArrowUp/Down as no-ops on a
  one-dimensional strip. A third pair was about to be written for these two
  families, so they moved to `roving.ts`. The stepping version won, because a
  vertical list read with the up arrow is the common case and a strip that ignores
  it is the bug the two copies were hiding from each other.
- Two white-card wrappers around `SplitDonut`, deleted.
- Two inert control groups in the showcase — a `BlobStat` row and a `CourseCard`
  pair with `onPick={() => {}}` — one made real, one deleted. A dead control on the
  page is the exact defect the owner caught two batches ago.

## The numbers

```
RAW_GRADIENT_ANGLES=2 (0deg 90deg)     two new families, no new dialect
HATCH_ANGLES=135 (token 135deg)        the empty lane, the empty track, the unsent half
RAW_RADII=0                            everything off the nine-step ladder
RAW_SHADOWS=0                          three new depth tokens, none typed
COLOUR_TWINS=10 (ceiling 10)           +33 distinct colours, +0 twins
DISTINCT_COLOURS=150
OPERATED=45 interactions               19 of them new
AXE_VIOLATIONS_MADAR=0
```

One twin candidate did appear — `#f4f2fb` for ink on the dark key against `#f4f3fa`
for the light key's ground, 1.4 apart. Two off-whites doing opposite jobs is exactly
what §27 was written about, so the ground moved rather than the ceiling.
