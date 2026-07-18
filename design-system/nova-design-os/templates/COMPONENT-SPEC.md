# Component Spec: [ComponentName]

## Summary

- Purpose:
- User need:
- Non-goals:
- Register(s):
- Existing primitive/registry candidate:
- Source/provenance:

## Anatomy

1. Root:
2. Label/title:
3. Content/value:
4. Leading/trailing slot:
5. Helper/status:
6. Action region:

## API

```ts
export type ComponentProps = {
  // semantic, controlled where shared state matters
};
```

- Controlled state:
- Uncontrolled default:
- Events:
- Slots/render props:
- Data attributes:
- Ref target:

## Variants

| Variant | Use | Do not use for |
|---|---|---|
| Default | | |

## Sizes and geometry

| Size | Height/min size | Padding | Type | Touch area |
|---|---:|---:|---|---:|
| Compact | | | | |
| Standard | | | | |
| Large | | | | |

- Radius token:
- Border/elevation:
- Container behavior:
- Long content/wrapping:

## Token mapping

| Property | Semantic token |
|---|---|
| Background | |
| Text/icon | |
| Border | |
| Focus | |
| Spacing | |
| Motion | |

No raw color values unless an asset-specific exception is documented here:

## State matrix

| State | Visual | Behavior | Announcement |
|---|---|---|---|
| Default | | | |
| Hover | | | |
| Focus-visible | | | |
| Active/pressed | | | |
| Selected | | | |
| Disabled | | | |
| Read-only | | | |
| Loading | | | |
| Empty | | | |
| Error | | | |
| Success | | | |
| Offline/stale | | | |

## Interaction model

- Pointer:
- Touch:
- Keyboard:
- Escape/back:
- Focus entry:
- Focus return:
- Gesture threshold/velocity if relevant:
- Haptic/sound if relevant:

## Semantics and accessibility

- Native element/ARIA pattern:
- Accessible name:
- Description/error links:
- Roles/states/properties:
- Live region policy:
- Minimum contrast:
- Non-color cue:
- Gesture alternative:

## RTL and localization

- Logical properties:
- Directional icons/paths:
- DOM order:
- Mixed-direction content:
- Text expansion:
- Number/date/unit formatting:

## Motion

- Purpose:
- Entry/exit path:
- Duration/easing or spring:
- Interruptibility:
- Reduced-motion equivalent:
- Reduced-transparency equivalent:

## Responsive behavior

- 320px:
- 390px:
- Tablet:
- Desktop:
- Container query:
- Safe-area/keyboard:

## Performance

- Render cost:
- Heavy dependency:
- Lazy/virtual strategy:
- Cleanup:
- Layout shift prevention:

## Content examples

- Short Arabic:
- Long Arabic:
- English:
- Mixed-direction:
- Empty/error/loading:

## Tests

### Unit/interaction

- [ ] role/name queries
- [ ] keyboard sequence
- [ ] controlled/uncontrolled
- [ ] async states
- [ ] focus return

### Visual

- [ ] light/dark
- [ ] RTL/LTR
- [ ] compact/standard/large
- [ ] 390px/desktop
- [ ] long text/200% zoom
- [ ] reduced motion/transparency

## Acceptance criteria

1.
2.
3.

## Decision log

- Why this pattern:
- Alternatives rejected:
- Trade-offs:
- Source adaptation:
- Known limitations:

