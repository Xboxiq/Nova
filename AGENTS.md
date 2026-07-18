# NOVA UI Working Agreement

Apply these rules to every request that changes how NOVA looks, feels, moves, or is understood.

## Required Context

1. Read `PRODUCT.md`.
2. Read `DESIGN.md`.
3. Read `design-system/nova-ui/MASTER.md`.
4. Read `design-system/nova-design-os/DESIGN.md` and the specialized files relevant to the task.
5. If a page override exists under `design-system/nova-ui/pages/`, it overrides the master only for that page.
6. Inspect the current React implementation, legacy HTML, and tokens before proposing a redesign.

## Required Design Workflow

1. State a one-line Design Read.
2. State `DESIGN_VARIANCE`, `MOTION_INTENSITY`, and `VISUAL_DENSITY`.
3. Use `ui-ux-pro-max` for design-system research, accessibility rules, and stack guidance.
4. Use `design-taste-frontend` for landing pages, portfolios, and redesign critique. Do not apply its marketing-only rules blindly to dense product UI.
5. Search with `21st-cli-use` before hand-writing a common React or shadcn pattern.
6. Use `21st-ai` only when the user asks for generated variants or rapid visual exploration.
7. Treat Awesome DESIGN.md as comparative research. Extract principles, never clone a brand.
8. Use Laws of UX to justify interaction decisions.
9. Use React Icons only in React projects. Choose one icon family per surface.
10. Use the installed `apple-design` skill for direct manipulation, interruptible motion, material hierarchy, and native-feeling mobile behavior.
11. Run `design-system/nova-design-os/11-ANTI-SLOP.md` and the checklist in `DESIGN.md` before delivery.

## Impeccable Full Mode

Use the full project-local Impeccable payload in `tools/impeccable/` for context, audit, critique, layout, typography, accessibility, and polish guidance.

The user explicitly approved full mode for this private project. If the live browser editor is used, bind it to localhost, keep it active only during the reviewed session, and stop it immediately after use. Never expose it to a shared interface or network.

## Project Architecture

- Vite, React, and TypeScript are the primary architecture.
- Use React Icons with the Phosphor family from `react-icons/pi`.
- Keep `nova-ui-library.html` as a legacy reference without making it the source of truth.
- Adapt external ideas into NOVA components and tokens instead of copying registry output verbatim.
- Treat `design-system/nova-design-os/tokens/tokens.json` as the future portable token source and migrate deliberately; do not mix old and new token systems inside one component.
- Do not publish, upload, or sync components or themes externally without explicit user authorization.
- Preserve unrelated user edits.

## Verification

- Run TypeScript checks and a production Vite build.
- Test desktop and 390px mobile layouts.
- Test search, filters, theme, direction, copy actions, modals, and interactive demos.
- Test keyboard focus and reduced motion.
- Report any source limitation, security concern, or unsupported interaction before enabling it.
