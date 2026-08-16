# Madar Components — مكتبة المكونات

**175+ reusable, typed React components** rebuilt on Madar's token system — the full 21st.dev import set (design.md §18), the **complete 99/99 Kinetics catalog** (§19, verified against [ckissi/kinetics](https://github.com/ckissi/kinetics)), every worthwhile pattern mined from the four source libraries (Jahez 95-pattern bank, Liquid Soft, Icons & Cards Lab, v2 — §16–§17), the 2026 X-trends vocabulary (TRENDS.md), a dataviz + collections layer built to the dataviz-skill procedure, and five full hero-section layouts. Every component recolors with the 5 themes and mirrors under `dir="rtl"` automatically. Import any of them anywhere:

```tsx
import { PublishButton, DynamicIsland, ToolbarDock, Stepper } from './components';
```

## Requirements

1. Load the tokens once (they carry the 5 themes, glass levels, and keyframes):
   ```ts
   import './styles/tokens.css';
   import './styles/interactions.css';
   ```
2. Wrap your app (or any subtree) in a themed container:
   ```html
   <div data-theme="mint" data-glass="g2" dir="rtl">…</div>
   ```
   Every component recolors itself with the theme and mirrors itself under `dir="rtl"` automatically — no per-component work.

## Component map (source → export)

| 21st.dev source | Export | Notes |
|---|---|---|
| rafa-porto/publish-button | `PublishButton` | async `onAction`, width-locked 3-state machine |
| minhxthanh/copy-code-button | `CopyCodeButton` | real clipboard write + morphing check |
| koustubhayadiyala36/shatter-button | `ShatterButton` | 12-particle burst, `onAction` |
| jatin-yadav05/bouncy-toggle | `BouncyToggle` | controlled or uncontrolled |
| daiwiikharihar17147/cinematic-glow-toggle · omrohilla6/cinematic-theme-switcher | `CinematicThemeSwitch` | sun/moon + stars |
| uniquesonu/glow-menu | `GlowMenu` | one glowing active pill |
| hero_ui/heroui-toggle-button | `ToggleChips` | multi/single select |
| hero_ui/heroui-number-field | `NumberField` | min/max/step, disabled rails |
| ravikatiyar162/registration-stepper · jatin-yadav05/multistep-form | `Stepper` | generic steps + content slots |
| ravikatiyar162/onboarding-form | `Stepper` + `TypeCardPicker` | stepper + selectable type cards |
| stvenchg/unsaved-changes | `UnsavedChangesBar` | spring pill, Save/Reset |
| hedevelope/estimated-arrival | `EstimatedArrival` | ETA, progress 0–1, worded phases |
| vaib215/event-manager | `EventCard` | details, capacity bar, CTAs |
| hero_ui/heroui-autocomplete | `Autocomplete` | live filtering, bolded match |
| larsen66/heroui-fieldset | `Fieldset` (+ `Field`) | legend chip on the border |
| minhxthanh/activity-dropdown | `ActivityDropdown` | unread dots |
| edwinvakayil/dia-text | `DiaText` + `Ignite` | gradient words ignite on hover |
| jatin-yadav05/location-tag | `LocationTag` | pulsing live dot |
| dqnamo/iridescent-foil | `IridescentFoilCard` | holographic sheen card |
| dqnamo/logo-trace-loader | `LogoTraceLoader` | custom `path` prop |
| mona_biasia/gradient-shimmer | `GradientShimmerText` (+ `GradientHeadline`) | one line max |
| dqnamo/agent-dock | `AgentDock` | thinking/idle/done states |
| jatin-yadav05/skills-showcase | `SkillsShowcase` | chip cloud + "+N more" |
| jatin-yadav05/mini-chart · larsen66/animated-sparkline | `Sparkline`, `MiniBarChart` | draw-in once, never loops |
| ruixen.ui/toolbar-dock | `ToolbarDock` | pill glides + stretches, RTL-safe |
| starc007/be-ui-dynamic-island | `DynamicIsland` | pill ↔ card morph, content slot |
| hero_ui/heroui-list-box | `ListBox` | icon tile + title + description |

## Example

```tsx
<PublishButton onAction={() => api.publish()} idleLabel="نشر" workingLabel="جارٍ النشر…" doneLabel="تم النشر" />

<DynamicIsland title="طلبك في الطريق" meta="12 min">
  <ProgressBar value={0.62} />
</DynamicIsland>

<Stepper
  steps={[
    { label: 'Account', content: <Field label="Email" placeholder="you@company.com" /> },
    { label: 'Workspace', content: <TypeCardPicker options={[…]} /> },
    { label: 'Done', content: <p>جاهز.</p> },
  ]}
/>
```

## Kinetics physics catalog (kinetics.colorion.co → design.md §19)

The core 24-pattern spring-physics vocabulary, importable. The four canon curves are exported as constants: `SPRING`, `GLIDE`, `DRAW`, `DROP_IN`. The remaining catalog effects live across `motion.tsx`, `feedback.tsx`, `soft.tsx`, `rituals.tsx`, and the completion set below — together reaching **full 99/99 parity** with the [ckissi/kinetics](https://github.com/ckissi/kinetics) source repo.

| Kinetics pattern | Export | Physics |
|---|---|---|
| Magnetic button | `MagneticButton` | magnet(0.3) · 150ms track, 500ms spring return |
| Hold to confirm | `HoldToConfirm` | hold(900ms) ring drain, 250ms cancel snap |
| Slide to unlock | `SlideToUnlock` | 1:1 tracking · 85% latch · spring return |
| Elastic counter | `ElasticCounter` | spring(280,18) · scale 1.25 + accent flash |
| PIN input | `PinInput` | spring(360,22) pop + auto-advance |
| Keycap press | `KeycapButton` | press(90ms) · solid bottom edge |
| Push button | `PushButton` | press(60ms) · colored edge |
| Squish button | `SquishButton` | down 80ms ease-out · up 500ms spring |
| Rubber-band slider | `RubberBandSlider` | rubber(0.32) overshoot |
| Drag to dismiss | `DragToDismissCard` | friction · rotate(x×0.05°) · 100px fling |
| Number scrubber | `NumberScrubber` | 1px = 1 · ew-resize · accent scale |
| Reorderable list | `ReorderableList` | midpoint swap · neighbors glide |
| Speed-dial FAB | `SpeedDialFab` | fan + scale 0.4→1 · 20/70/120ms |
| Sliding gradient | `SlidingGradientButton` | 3-stop 200% · position glides 500ms |
| Scramble reveal | `ScrambleText` | 35ms glyph swap · locks left→right |
| Underline draw | `UnderlineLink` | scaleX 0→1 · DRAW curve · RTL origin auto |
| Icon morph swap | `IconMorphSwap` | blur(6px) scale rotate crossfade 300ms |
| Odometer count-up | `OdometerNumber` | ease-out cubic 1.4s · in-view once |
| Typewriter | `Typewriter` | 55/30ms · 1.1s hold · steps(1) caret |
| Heartbeat/EKG dot | `EkgPath` | offset-distance 0→100% along the path |
| Segment loader | `SegmentLoader` | scaleX bars · 120ms stagger |
| Undo snackbar | `UndoSnackbar` | spring in + 3s linear drain bar |
| Stagger entrance | `Stagger` | 90ms apart · GLIDE · in-view once |
| Tab pill glide | `ToolbarDock` | measured left+width glide |

## Source-library vault (Icons & Cards Lab · Liquid Soft · Jahez · v2 → design.md §16–§17)

| Source pattern | Export | Notes |
|---|---|---|
| Squircle tonal triple (§17.0) | `SquircleIcon` | hues via `SOFT_HUES`, `fill`/`tint` variants, sizes 22–64 |
| 3D specular orb (§17.2) | `SpecularOrb` | 4 hue palettes, highlight + halo |
| Burst-star seal (§17.2) | `BurstSeal` | 12-point computed polygon |
| Memoji avatar (§17.2) | `MemojiAvatar` | palette picked by name hash |
| Self-drawing ritual (§16.1) | `SelfDrawingIcon` | idle ghost + hover stroke draw |
| Icon orbit ring (§17.2) | `IconOrbitRing` | icons counter-rotate to stay upright |
| Animated state icons (§17.2) | `AnimatedStateIcon` | loading orbits / success draws / error shakes |
| Blueprint card (§17.3) | `BlueprintCard` | engineering grid fades on hover |
| Aperture card (§17.3) | `ApertureCard` | clip-path iris reveal |
| Breaker card (§17.3) | `BreakerCard` | switch floods the card with color |
| Meter dial (§17.3) | `MeterDial` | gauge sweep + odometer digits |
| Tilted 3D stack (§17.3) | `TiltedStack3D` | perspective fan upward |
| File folder (§17.3) | `FolderCard` | 3-layer CSS folder, sheet lifts |
| Aurora mesh hero (§17.4) | `AuroraMeshHero` | drifting radials + floating orbs |
| Cursor spotlight (§17.4) | `CursorSpotlight` | pointer-tracked radial over dot grid |
| Generate/AI button (§17.1) | `GenerateButton` | rotating conic ring behind dark pill |
| Glowing input halo (§17.1) | `GlowInput` | animated gradient halo, brightens on focus |
| Agent planning timeline (§17.7) | `AgentTimeline` | done/active/error/pending, expandable |
| Swipeable list (§17.6) | `SwipeableListRow` | drag reveals action layer, RTL-aware |
| macOS magnifying dock (§17.5) | `MagnifyingDock` | scale = f(distance): 1.32/1.14/1.05 |

## Pattern atlas — the rest of the Jahez 95-pattern bank (design.md §17)

Grouped by file. Every one is an importable component.

**`overlays.tsx`** — `Popover`, `FrostedTooltip`, `SelectField`, `DropdownMenu`, `AlertDialog`, `WelcomeModal`, `CommandBarTrigger`, `KbdButton`, `SpotlightButton`, `MessageDock`

**`feedback.tsx`** — `AiLoader` (dots/line/spinner/pulse), `FluxLoader`, `SyncProgressPanel`, `PulseRadar`, `MetricRing`, `RangeBar`, `StatusStrip`, `LogsTable`

**`social.tsx`** — `ReactionBar`, `TypingDots`, `CommentThread`, `LiveCursorLabel`, `TestimonialSlider`, `TeamSection`, `AssigneeUser`, `AvatarBadge`, `AvatarStack`, `YearsTimeline`

**`content.tsx`** — `SquishyPricing`, `SplitCard`, `GradientMeshCard`, `NoiseDotCard`, `PinnedNote`, `WorkflowSteps`, `OnboardingChecklist`, `ChecklistRow`, `NumberedFeatures`, `BigStatRow`, `HeadlineChip`, `ConfigRow`, `FooterNewsletter`, `BentoGrid`/`BentoCell`, `MasonryColumns`/`MasonryItem`, `IconClusterNetwork`, `TimeField`, `ColorPicker`, `GradientPaletteGrid` (+ `CURATED_GRADIENTS`), `DuotoneImage`, `IconMarquee`, `FileCard`, `EditorialCard`

Live demos: showcase sections **19 Library Vault** and **20 Pattern Atlas**.

## Chrome & 2026 trends (TRENDS.md)

**`chrome.tsx`** — `CompactNav`, `ProgressiveNavbar`, `BucketGlyph` (+ `useScrolled`)

**`trends2026.tsx`** — `ProgressiveBlur` (Apple-style ramped blur), `LiquidGlassCard` (pointer-tracked glare + reactive shadow), `GlassSegmented`, `AnticipatoryDashboard` (where/missing/next/why), `PromptCanvas`, `GlanceableTile`

Live demo: showcase section **22 Trends 2026** (glass demoed over an aurora stage).

## Data visualization (dataviz skill procedure)

**`dataviz.tsx`** — built form → color-by-job → validated palette → mark specs → hover → a11y.

| Export | Job | Notes |
|---|---|---|
| `CATEGORICAL` | identity palette | fixed order `#2E6FE0 #C77A12 #12967A #6D3FE0 #D8443C`, validated with `validate_palette.js` (light + Night), never the theme accent, never cycled |
| `DonutChart` | magnitude-of-a-whole | 5-slice max (6th folds to "Other"), 2px surface gap, center total, legend + per-slice hover |
| `Gauge` | one headline on a scale | sequential accent sweep, number is the label |
| `ProgressCircle` | a single fraction | sequential accent ring |
| `Heatmap` | contribution grid | sequential one-hue light→dark, per-cell hover, legend ramp |
| `StarRating` | status / score | interactive or `readOnly`, warning-token fill |

## Collections & navigation

**`collections.tsx`** — the structural components a system still needs. All tokenized, RTL-safe.

| Export | Notes |
|---|---|
| `Tabs` | shared underline glides via `inset-inline-start` (RTL-safe), controlled or uncontrolled |
| `Accordion` | one-open group, `grid-rows 0fr→1fr` expansion |
| `Breadcrumb` | chevrons flip under RTL via `i-chevron-dir` |
| `Pagination` | first/last + ellipsis window, arrows mirror in RTL |
| `KanbanBoard` | native HTML drag-and-drop between columns |
| `CalendarMonth` | month grid, Arabic month/day names, event dots, day select |
| `TreeView` | nested expandable rows, folder/file default icons |
| `TagInput` | removable chips + free entry (Enter adds, Backspace pops) |

Live demo: showcase section **23 Data & Collections** (LTR + Night/RTL verified).

## Hero layouts (the "6 heroes for 2026" set)

**`heroLayouts.tsx`** — five full hero compositions. Every one recolors with the theme, mirrors under `dir="rtl"`, and needs **zero external assets**: image areas are `HeroVisual` — generative, token-derived gradient meshes (five moods: `bloom`/`mesh`/`ridge`/`aurora`/`grid`) plus grain. Pass `children` or an `<img>` to any visual slot to drop in real art.

| Export | Pattern | Notes |
|---|---|---|
| `SplitStatsHero` | text + image side-by-side | accent headline, stats row spanning the base |
| `ProductHero` | headline + wide product frame | ships a stylized dashboard (`ProductFrame`) with line + distribution charts; override via `children` |
| `ImmersiveHero` | full-bleed visual, nav overlaid | headline + social proof bottom-start, copy + CTA bottom-end |
| `DisplayWordHero` | oversized wordmark | focal visual breaks through the center letters |
| `GalleryScatterHero` | centered headline, scattered tiles | museum-wall scatter; tiles use logical offsets so the scatter mirrors under RTL |
| `HeroVisual`, `HeroNav` | shared primitives | the generative image surface + the mark/links/CTA bar (light or dark tone) |

Live demo: showcase section **24 Hero Layouts** (LTR + Night/RTL verified).

## Kinetics 99 — completion set (ckissi/kinetics parity)

**`kinetics99.tsx`** — the two dozen catalog effects the first pass didn't cover, verified against the source repo's 99-card `body.html`. This closes the gap to a full **99/99**. All tokenized, theme-aware, RTL-safe; ambient/status loops honour `prefers-reduced-motion` via the global rule in `tokens.css`.

`RippleButton`, `CursorTrail`, `PasswordMeter`, `RotaryKnob`, `CountdownRing`, `SkeletonToContent`, `BatteryCharge`, `SignalBars`, `BookmarkToggle`, `WaveLoader`, `EqualizerBars`, `NewtonsCradle`, `BouncingBall`, `NeonGlowPulse`, `GradientBorderMorph`, `GlitchText`, `TextSplitReveal`, `TextWave`, `FlipCard`, `CubeRotate3D`, `ClipWipe`, `FoldingDoors`, `BeforeAfter`, `PagePeel`

Live demo: showcase section **25 Kinetics 99** (LTR + Night/RTL verified).

## Essentials — structural app surfaces

**`essentials.tsx`** — the production pieces a complete design system needs. All tokenized, theme-aware, RTL-safe (logical properties only).

| Export | Notes |
|---|---|
| `DataTable` | generic, sortable headers, optional row selection, zebra rows, horizontal scroll |
| `Drawer` | edge sheet over a scrim, `side` is logical (mirrors under RTL), Esc + scrim close |
| `ToastDemo` | spring-in toast stack, four tones, auto-dismiss (the reducer that powers a provider) |
| `FileDropzone` | drag-and-drop upload with a growing file list + sizes |
| `EmptyState` | icon + title + copy + action |
| `Banner` | inline status message, four tones, dismissible |
| `RangeSlider` | dual-handle min/max, filled track, RTL-aware dragging |

Live demo: showcase section **26 Essentials** (LTR + Night/RTL verified).

`HeroVisual` (in `heroLayouts.tsx`) now takes `src` + `alt`: pass real art and it renders an `<img>`; omit them and it stays a labelled generative placeholder slot.

## Atelier — the premium tier (high-end-visual-design skill)

**`atelier.tsx`** — the $150k-agency techniques, made reusable and token-driven so they recolor across all five themes and mirror under RTL. Adds a high-contrast Didone display font (`--font-display`: Bodoni Moda, with Aref Ruqaa for Arabic).

| Export | Technique (skill section) |
|---|---|
| `BezelCard` | Double-Bezel / Doppelrand — machined outer shell + inner core, concentric radii, inset highlight (§4.A) |
| `MagneticCTA` | Island pill + button-in-button trailing icon, magnetic drift, diagonal icon travel, press compression (§4.B / §5.B) |
| `SpecularCard` | pointer-tracked specular sheen + reactive tilt + accent-tinted reactive shadow (haptic depth) |
| `RevealOnView` | heavy fade-up + de-blur on enter via IntersectionObserver, reduced-motion safe (§5.C) |
| `EditorialFigure` | oversized Didone numeral + eyebrow pill + accent hairline (editorial luxury) |
| `AtelierEyebrow`, `DisplaySerif` | the microscopic pill eyebrow + a luxe display-serif wrapper |

Live demo: showcase section **Atelier** (unnumbered showpiece after the hero; LTR + Night/RTL verified). Motion touches only transform/opacity/filter; all curves are the heavy `cubic-bezier(0.32,0.72,0,1)`.

## Rules that ship with the bank (design.md §18.4)

1. A control that changes shape to report progress beats a toast explaining it.
2. Success color is earned — only after a real async completion.
3. Particle / shatter / foil effects: max ONE per app, on its signature action.
4. Animated entrances run once; only status indicators (thinking dots, live position) may loop.
