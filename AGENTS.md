# NOVA UI Working Agreement

Apply these rules to every request that changes how NOVA looks, feels, moves, or is understood.

## Required Context

1. Read `PRODUCT.md`.
2. Read `DESIGN.md`.
3. Read `design-system/nova-ui/MASTER.md`.
4. Read `design-system/nova-design-os/DESIGN.md` and the specialized files relevant to the task.
5. For anything touching the Madar library, read `design-system/madar/GUIDE.md` first, then `design-system/madar/design.md`.
6. If a page override exists under `design-system/nova-ui/pages/`, it overrides the master only for that page.
7. Inspect the current React implementation, legacy HTML, and tokens before proposing a redesign.

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

## Project Skills

Three skill sets are vendored under `.claude/skills/` so every session on this repo gets them without a separate install.

- **ponytail** (`skills/ponytail`, MIT, DietrichGebert/ponytail @ 2ed6c52) governs what gets built: YAGNI, reuse what is already in this codebase, stdlib and native platform features before dependencies, no unrequested abstractions. Default intensity is full. Companions: `ponytail-review` for a diff, `ponytail-audit` for the whole repo, `ponytail-debt` to harvest `ponytail:` comments.
- **unlazy** (`skills/unlazy`, MIT, Leonxlnx/unlazy @ ed9e8d2) governs when work is finished: write acceptance gates to a file before starting, prove each one with a runnable check, and report only against a full ledger. Use it for substantial work, never for a one-line fix.
- Run them together on real changes. ponytail decides what to build, unlazy decides when you are done. Where they collide, ponytail loses: a gate is not satisfied by a smaller diff.

Both are wired into `.claude/settings.json`, so they are enforced by the harness rather than by good intentions:

| Event | Command | Effect |
|---|---|---|
| `statusLine` | `ponytail-statusline.sh` | Shows the active level, e.g. `[PONYTAIL]` or `[PONYTAIL:ULTRA]` |
| `SessionStart` | `ponytail-activate.js` | Loads the ponytail ruleset at the configured level |
| `SubagentStart` | `ponytail-subagent.js` | Gives every spawned subagent the same ruleset |
| `UserPromptSubmit` | `ponytail-mode-tracker.js` | Tracks `/ponytail lite\|full\|ultra` and `stop ponytail` |
| `Stop` | unlazy `stop-hook.mjs` | **Blocks ending the turn** while `GATES.md` or `gates/*.md` hold unmet gates |

Paths use `$CLAUDE_PROJECT_DIR`, so the tracked file works on any machine.

Rules for this repo:

- A substantial change writes `GATES.md` first, with a `CHECK:` and `EXPECT:` line wherever an outcome can be proved by a command. Verify with `node .claude/skills/unlazy/scripts/gate-check.mjs GATES.md`.
- The Stop hook is a real wall: with an unchecked box in `GATES.md` you cannot end the turn. Escape hatches are finishing the gate, or an honest `ABANDON: <id> <reason>` line. It releases itself after six consecutive blocks with no progress, so it never traps a stuck agent. Remove it with `node .claude/skills/unlazy/scripts/install-hooks.mjs --shared --uninstall`.
- `npm run qa:madar` is the existing runnable check for the Madar surface: contrast across all packs, Axe, overflow, theme menu, runtime errors. Reuse it in gates instead of writing a new harness.
- Every ponytail-review finding is either applied or refused with the reason recorded. A silently dropped finding is an unmet gate.
- `.claude/skills/ponytail/hooks/package.json` pins that directory to CommonJS. The root `package.json` sets `"type": "module"`, which would otherwise make Node parse the vendored hooks as ESM and crash every one of them. Do not delete it.
- Set the default level with `PONYTAIL_DEFAULT_MODE` or `~/.config/ponytail/config.json`; `off` disables ponytail without uninstalling anything.

## Impeccable Full Mode

Use the full project-local Impeccable payload in `tools/impeccable/` for context, audit, critique, layout, typography, accessibility, and polish guidance.

The user explicitly approved full mode for this private project. If the live browser editor is used, bind it to localhost, keep it active only during the reviewed session, and stop it immediately after use. Never expose it to a shared interface or network.

## Project Architecture

- Vite, React, and TypeScript are the primary architecture.
- Use React Icons with the Phosphor family from `react-icons/pi`.
- Keep `nova-ui-library.html` as a legacy reference without making it the source of truth.
- Adapt external ideas into NOVA components and tokens instead of copying registry output verbatim.
- Treat `design-system/nova-design-os/tokens/tokens.json` as the future portable token source and migrate deliberately; do not mix old and new token systems inside one component.
- Color lives in exactly two files: `tokens.css` for the base set and the light and dark packs, and `tokens/theme-packs.css` for the Madar packs. `src/madar/bridge.css` only aliases Madar names onto `--nova-*` and must never declare a color.
- The Madar library stays under `src/madar/`. Its showcase sections consume `src/madar/components`; they never re-implement a component, and they never own theme state.
- Register a new Madar section in `src/madar/sections.ts` so search and the command palette can reach it.
- Element-level CSS coming from Madar is scoped to `.madar-surface`. Do not add unscoped element selectors that reach the NOVA shell.
- `archive/madar/` is a historical record. Never import from it and never build it.
- Do not publish, upload, or sync components or themes externally without explicit user authorization.
- Preserve unrelated user edits.

## Verification

- Run TypeScript checks and a production Vite build.
- Test desktop and 390px mobile layouts.
- Test search, filters, theme, direction, copy actions, modals, and interactive demos.
- Test keyboard focus and reduced motion.
- Report any source limitation, security concern, or unsupported interaction before enabling it.
