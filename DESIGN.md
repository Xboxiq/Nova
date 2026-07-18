# NOVA UI Design System

هذا الملف هو عقد القراءة السريع للمشروع الحالي. المرجع الموسّع والمصدر النهائي للهوية والسلوك هو [`design-system/nova-design-os/DESIGN.md`](./design-system/nova-design-os/DESIGN.md)، والتوكنز القابلة للنقل في [`design-system/nova-design-os/tokens/`](./design-system/nova-design-os/tokens/). عند التعارض يتقدّم NOVA Design OS ثم التنفيذ الفعلي.

## Design Read

Reading this as: an Arabic-first component library for designers and frontend developers, with Apple-like physical materials, precise product behavior, and a Luminous Mineral identity built from cobalt, ice, mint, warm coral, and petrol navy.

## Design Dials

| Dial | Value | Meaning |
|---|---:|---|
| DESIGN_VARIANCE | 8/10 | Authored layouts and material moments with selective asymmetry |
| MOTION_INTENSITY | 6/10 | Physical press feedback, anchored disclosure, and restrained route continuity |
| VISUAL_DENSITY | 6/10 | Reference-rich content with deliberate grouping, generous chapter margins, and focused density inside tools |

## Core Principles

1. Hierarchy before decoration.
2. Cobalt is the functional action color; ice, mint, coral, and amber belong to atmospheric fields and data, never as indiscriminate decoration.
3. Cards represent real grouping or elevation, not default containers for every paragraph.
4. Glass, glow, foil, and gradients are showcase effects. Use one focal effect per surface.
5. Familiar interaction models win over novelty when task completion is involved.
6. Arabic is not a mirrored afterthought. Spacing, icon direction, alignment, and reading order are designed for RTL first.
7. Every visual decision must survive light mode, dark mode, mobile, keyboard use, and reduced motion.

## Color Tokens

### Light

| Token | Value | Use |
|---|---|---|
| `--nova-canvas` | `#F3F7F8` | Application canvas |
| `--nova-surface` | `#FFFFFF` | Primary component surface |
| `--nova-surface-quiet` | `#EAF0F2` | Nested or quiet surface |
| `--nova-ink` | `#10242E` | Primary text |
| `--nova-ink-secondary` | `#455E68` | Secondary text |
| `--nova-ink-tertiary` | `#5D747D` | Metadata and supporting labels |
| `--nova-border` | `#D6E1E4` | Borders and separators |
| `--nova-action` | `#0068D9` | Primary action and focus |
| `--nova-action-pressed` | `#004EA8` | Pressed action |
| `--nova-action-soft` | `#DCEEFF` | Selected and quiet action surfaces |

### Dark

| Token | Value | Use |
|---|---|---|
| `--nova-canvas` | `#0D1B22` | Lifted petrol canvas |
| `--nova-surface` | `#122833` | Primary component surface |
| `--nova-surface-quiet` | `#19343F` | Nested or quiet surface |
| `--nova-ink` | `#F3FAFB` | Primary text |
| `--nova-ink-secondary` | `#C0D0D4` | Secondary text |
| `--nova-ink-tertiary` | `#91A8AF` | Metadata and supporting labels |
| `--nova-border` | `#294955` | Borders and separators |
| `--nova-action` | `#70B7FF` | Primary action and focus |
| `--nova-action-pressed` | `#57A7F6` | Pressed action |

Semantic green, orange, red, and blue are reserved for status and data. They do not replace the primary accent.

## Typography

- Apple platforms use the system `SF Pro Text` and `SF Pro Display` through `-apple-system` and `BlinkMacSystemFont`.
- Production React self-hosts `IBM Plex Sans Arabic` and `IBM Plex Sans` as the non-Google cross-platform UI fallback; `Geist Mono Variable` remains code-only.
- Display and UI typography stay sans-serif; a serif is introduced only by a documented editorial requirement.
- Body text is at least 14px in compact metadata and 16px for normal reading.
- Body line-height is 1.5 to 1.7. Display line-height is 1.05 to 1.2.
- Do not mix a random serif word into a sans-serif headline for decoration.
- Visible product copy uses normal hyphens. Do not use em dashes or en dashes as separators.

## Spacing, Shape, and Elevation

### Spacing

`4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 112, 128`

The small values shape controls; the large values create reading rhythm. Use `--nova-gutter-page`, `--nova-section-space`, `--nova-copy-gap`, and `--nova-card-inset` before inventing a page-local margin.

### Radius

| Token | Value | Use |
|---|---:|---|
| `--radius-sm` | 10px | Small controls and chips |
| `--radius` | 16px | Inputs and standard surfaces |
| `--radius-lg` | 24px | Component previews |
| `--radius-xl` | 32px | Hero and major containers |
| pill | 999px | Toggles, segmented controls, compact actions |

### Elevation

- Small shadows indicate clickability or a floating tool.
- Medium shadows are for cards, dropdowns, and sticky surfaces.
- Large shadows are reserved for hero surfaces and modals.
- Shadows are tinted toward the surrounding neutral. Avoid pure black shadows on light surfaces.

## Layout

- Desktop sidebar: 252px.
- Content width: maximum 1510px.
- Page gutter: `clamp(20px, 3.5vw, 64px)`; major chapter spacing: `clamp(88px, 8vw, 144px)`.
- Use CSS Grid for component layouts. Avoid percentage-based flex calculations.
- Wide previews span the grid only when the interaction needs horizontal room.
- At 768px and below, navigation becomes compact and all component previews collapse to one column.
- Use logical CSS properties such as `margin-inline`, `padding-inline`, and `inset-inline`.
- Do not hide core functionality behind hover-only interactions.

## Components and States

Every interactive component should consider:

- Default
- Hover
- Focus-visible
- Active
- Selected
- Disabled
- Loading
- Empty
- Error
- Success

Use inline errors for forms, contextual toasts for transient actions, and skeletons shaped like the final content for loading.

### V7 primitives and authored systems

- Controls use 36, 44, 52, and 60px visual heights; touch-critical actions never fall below 44px.
- The action hierarchy is primary, secondary, quiet, destructive, and unavailable. A split action is used only when the adjacent options share one intent.
- Press feedback begins in 90ms; disclosure takes 260ms; route continuity takes 420ms.
- Icons use 16, 20, 24, and 32px optical sizes inside 32, 40, 48, and 64px containers.
- Glass icon containers are for floating navigation and elevated tools over a real background. Tonal containers communicate state. Drawn containers use Phosphor Thin within editorial or sketch-like surfaces.
- One icon family and one optical weight per surface. Never mix filled, outlined, and hand-drawn vocabularies without a semantic reason.
- Contextual tools remain anchored to the selected object and reveal secondary properties progressively.
- Data lenses pair a direct-manipulation scrubber with a precise value, label, and keyboard-reachable step controls.
- Relationship maps communicate state with label, icon, and position rather than color alone.
- Stacked activity, guided empty states, fold decks, range composers, and adaptive inspectors must each include recovery and reduced-motion paths.

## Motion

- Hover and press feedback: 150ms to 220ms.
- Standard state transitions: 220ms to 320ms.
- Modal and large surface transitions: 320ms to 500ms.
- Prefer opacity, transform, and filter. Avoid animating layout dimensions in dense surfaces.
- Motion must explain hierarchy, state, progress, or spatial continuity.
- Endless animation is limited to a loader or one ambient showcase effect.
- Respect `prefers-reduced-motion: reduce` and provide an immediate equivalent.

## Icons

- React implementation: use React Icons as the package gateway and Phosphor through `react-icons/pi` as NOVA's single icon family.
- Standalone HTML: preserve the current consistent icon vocabulary. Do not add new hand-drawn paths when a maintained icon exists.
- Standardize stroke weight at approximately 1.8.
- Icon-only buttons require an accessible name and at least a 44px touch target when used as primary mobile controls.
- Emojis are content only, never the default icon system.

## Architecture

- React 19, TypeScript, and Vite are the primary implementation stack.
- Quality bar: flagship personal tool, not an MVP or public template.
- Keep component metadata separate from interactive demo renderers so the 72-pattern catalog remains searchable and maintainable.
- Use local React state for isolated demonstrations and shared context only for global theme and direction.
- Lazy-load the gallery surface and keep source attribution visible for every pattern.
- Preserve `nova-ui-library.html` only as a legacy reference.

## Laws of UX Application

| Law | NOVA Rule |
|---|---|
| Hick's Law | Reduce visible choices with search, filters, sections, and progressive disclosure |
| Fitts's Law | Primary targets are large, close to the task, and at least 44px on touch surfaces |
| Jakob's Law | Keep conventional navigation, forms, dialogs, and checkout behavior |
| Law of Proximity | Group labels, controls, helper text, and errors into one readable unit |
| Law of Common Region | Use cards or boundaries only when they communicate a real group |
| Cognitive Load | Chunk the 72-component library into named categories and preserve a strong visual hierarchy |
| Von Restorff Effect | Use one cobalt action or selected lens to break the rhythm instead of coloring every control |
| Doherty Threshold | Show feedback within 400ms for search, copy, toggles, and form actions |
| Goal-Gradient Effect | Use clear progress for multi-step forms, delivery, and onboarding |
| Peak-End Rule | Make success and completion states deliberate, calm, and memorable |

## Anti-Patterns

- Generic purple-to-blue AI gradients across every surface.
- Three identical cards as the default section layout.
- Cards nested inside cards without hierarchy.
- Random glassmorphism or glow on functional forms.
- Multiple competing accent colors.
- Excessive pills, badges, decorative dots, or uppercase micro-labels.
- Placeholder-only labels.
- Hover as the only way to reveal an action.
- Decorative animation without state or narrative value.
- Fake metrics, fake urgency, or fabricated social proof.
- Mixed icon families within one surface.
- Publishing or installing a 21st.dev component without first adapting it to NOVA tokens and accessibility rules.

## Source Priority

When sources disagree, use this order:

1. User brief and existing NOVA behavior.
2. `PRODUCT.md` and this `DESIGN.md`.
3. Page overrides under `design-system/nova-ui/pages/`.
4. UI/UX Pro Max database for researched options and accessibility checks.
5. Taste Skill and Impeccable for critique and anti-pattern review.
6. Awesome DESIGN.md for comparative visual language, never blind brand imitation.
7. 21st.dev for component discovery and rapid variants.
8. React Icons for React icon implementation.

## Reference URLs

- Impeccable: https://github.com/pbakaus/impeccable
- Taste Skill: https://github.com/Leonxlnx/taste-skill
- UI/UX Pro Max: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- Awesome DESIGN.md: https://github.com/VoltAgent/awesome-design-md
- React Icons: https://react-icons.github.io/react-icons/
- 21st.dev skills: https://github.com/21st-dev/skill
- 21st.dev Codex plugin: https://github.com/21st-dev/codex-plugin
- Laws of UX: https://lawsofux.com/

## Pre-Delivery Review

- [ ] Design Read and dials are stated.
- [ ] Existing tokens are preserved unless a deliberate redesign is approved.
- [ ] One primary accent and one coherent radius system.
- [ ] RTL, LTR, light, dark, keyboard, and reduced-motion paths work.
- [ ] Text and controls pass WCAG AA contrast.
- [ ] Mobile checked at 390px with no horizontal overflow.
- [ ] Primary touch targets are at least 44px where appropriate.
- [ ] Loading, empty, error, success, and disabled states are addressed.
- [ ] Motion has a functional reason and cleans up correctly.
- [ ] No visible em dash or en dash separators.
- [ ] No console errors and HTML validation passes.
- [ ] External inspiration remains attributed.
