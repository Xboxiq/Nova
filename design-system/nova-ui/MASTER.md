# NOVA UI Master Design System

The canonical visual language is defined in `../nova-design-os/DESIGN.md`, with portable tokens in `../nova-design-os/tokens/`. Read those files before implementation. The repository-level `../../DESIGN.md` is the routing and project contract.

## Design Read

Arabic-first component library with premium spatial clarity, Apple-like physical materials, precise product behavior, and a Luminous Mineral identity.

## Design Dials

- DESIGN_VARIANCE: 8/10
- MOTION_INTENSITY: 6/10
- VISUAL_DENSITY: 6/10

## Master Tokens

| Role | Light | Dark |
|---|---|---|
| Canvas | `#F3F7F8` | `#0D1B22` |
| Surface | `#FFFFFF` | `#122833` |
| Quiet surface | `#EAF0F2` | `#19343F` |
| Primary text | `#10242E` | `#F3FAFB` |
| Secondary text | `#455E68` | `#C0D0D4` |
| Tertiary text | `#5D747D` | `#91A8AF` |
| Border | `#D6E1E4` | `#294955` |
| Action | `#0068D9` | `#70B7FF` |
| Action pressed | `#004EA8` | `#57A7F6` |

## Fixed Rules

- RTL first with a complete LTR mode.
- One cobalt action family. Ice, mint, coral, and amber remain atmospheric or contextual.
- Radius scale: 10px, 16px, 24px, 32px, and pill controls.
- Spacing scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 80px, 96px, 112px, 128px.
- Page composition uses responsive gutter, section-space, copy-gap, and card-inset aliases rather than local margin guesses.
- Control heights are 36/44/52/60px; icon glyphs are 16/20/24/32px inside 32/40/48/64px optical containers.
- Glass icon containers belong to floating chrome, tonal containers to state, and Phosphor Thin drawn containers to authored editorial moments.
- Apple system fonts first, then self-hosted IBM Plex Sans Arabic and IBM Plex Sans; Geist Mono is code-only.
- Motion ranges from 150ms to 500ms and respects reduced motion.
- WCAG AA contrast, visible focus, keyboard access, and 44px mobile targets.
- Vite, React, TypeScript, and React Icons with one Phosphor family are the default architecture.
- V7 authored patterns use progressive disclosure, direct manipulation, spatial continuity, and explicit recovery; novelty never replaces a familiar task model.

## Page Overrides

Place page-specific differences in `pages/<page-name>.md`. Overrides may narrow layout, density, or component behavior, but cannot silently change the core accent, accessibility requirements, RTL support, or architecture.
