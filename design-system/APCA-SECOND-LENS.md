# APCA, the second lens — and the thirteen pairs the two lenses disagree about

`better-colors` asks for APCA (Lc) beside the WCAG 2.x ratio. `tools/qa/madar-qa.mjs`
now measures both on every token pair in all seven packs. They disagree, and the
disagreement is the whole reason the second lens was worth adding.

## Why two lenses

WCAG 2.x contrast is one formula with one number, and it is known to be wrong in
both directions: it passes some light-text-on-mid-tone pairs a reader struggles
with, and fails some dark pairs that read cleanly. It has no notion of **polarity** —
dark text on a light ground and light text on a dark ground are the same
calculation to it.

APCA models polarity with different exponents per direction. Seven theme packs, four
of them dark, is exactly the situation where that difference shows.

**AA stays the gate.** WCAG 2.x AA is what the standard requires and what axe
measures, and `CONTRAST_FAILURES` remains 0 with no allowance. APCA runs beside it
and is reported, not enforced.

## The thirteen

Measured with `APCA_BODY = 60`, APCA's floor for body text. Every one of these
**passes WCAG AA**, several of them comfortably:

| pack | pair | Lc | WCAG AA |
|---|---|---|---|
| dark | `--nova-ink-tertiary` / `--nova-surface-raised` | 50.1 | 4.96 |
| dark | `--nova-ink-tertiary` / `--nova-surface-quiet` | 53.7 | 5.97 |
| dark | `--nova-ink-tertiary` / `--nova-surface` | 56.0 | 6.96 |
| dark | `--nova-danger` / `--nova-surface` | 57.1 | 7.06 |
| dark | `--nova-on-action` / `--nova-action` | 59.5 | **7.62** |
| mint | `--nova-on-action` / `--nova-action` | 56.6 | **7.61** |
| night | `--nova-ink-secondary` / `--nova-surface` | 56.7 | 6.00 |
| night | `--nova-ink-tertiary` / `--nova-surface-quiet` | 57.0 | 6.52 |

Two shapes account for all of them:

1. **`--nova-ink-tertiary` on a dark ground.** The tertiary ink is the quietest of
   three weights, and on a dark surface APCA reads the pair as thinner than the
   ratio suggests. This is the polarity asymmetry, and it is the case APCA exists
   for.
2. **`--nova-on-action` on `--nova-action`.** Button text at AA 7.6 and Lc 56–59.
   A saturated mid-tone action colour is precisely where the two formulas part
   company.

## What was not done, and why

Thirteen pairs live in `nova-design-os/tokens.css` and drive every button, every
secondary line and every quiet caption in seven packs. Darkening them to clear
Lc 60 is not a fix, it is a **change to the product's look** — and this repo's own
rule is that a decided design decision is not reversed by a scanner.

So it is measured with a ceiling, exactly as `REFERENCE_GREY_CONTRAST` is:
`APCA_THIN_CEILING = 16`. **It may fall and must never rise** — with one recorded
exception, which is this one: the ceiling went from 13 to 16 because **two canvas
pairs were added to the list**, not because anything got worse. `madar-matrix`
found that `--nova-ink-secondary` and `--nova-ink-tertiary` were measured against
every surface tier and never against `--nova-canvas`, which is the ground every
secondary line outside a card actually sits on. Three of the new measurements are
thin (`mint`, `dark`, `night`). 13 and 16 are counts of different questions.

From here the rule applies again: a seventeenth thin pair fails the harness.

Three ways forward, if the owner wants one:

- **Chase all thirteen.** Darkens the tertiary ink in four dark packs and the action
  colour in two. Biggest visual change, cleanest number.
- **Chase `--nova-on-action` only.** Two pairs, and they carry button labels —
  the highest-traffic text in the product. Smallest change for the most reading.
- **Leave them.** They pass the standard the product is held to. APCA is a draft
  (WCAG 3 is not a recommendation), and Lc 50–59 is thin, not unreadable.

The second option is the one worth taking if only one is.
