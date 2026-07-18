# NOVA UI Product Context

## Product

NOVA UI is an Arabic-first React component library and interactive pattern gallery delivered as a Vite and TypeScript project.

## Audience

- UI and UX designers evaluating patterns and interaction ideas.
- Frontend developers who need reusable React, TypeScript, and CSS examples.
- Product teams prototyping bilingual Arabic and English experiences.

## Primary Jobs

1. Find a component quickly through search, filters, and sections.
2. Preview real interactions in a fast local development environment.
3. Copy or adapt a component while retaining its source reference.
4. Verify responsive, RTL, LTR, light, and dark behavior.

## Product Constraints

- The primary deliverable is a Vite, React, and TypeScript project with a production build.
- `nova-ui-library.html` remains a legacy reference and is not the primary implementation.
- No authentication, backend, data persistence, or live payment processing.
- Support starts at 320px and is explicitly checked at 390px, 768px, 1024px, and 1440px.
- Arabic RTL is the default. English LTR must remain available.
- Every control must work with keyboard input and show a visible focus state.
- External component sources are inspiration and attribution. Final code must fit NOVA tokens and architecture.

## Out of Scope

- Production data persistence.
- Real checkout, wallet, account, or publishing operations.
- Automatic publication to npm, 21st.dev, or any external registry.

## Definition of Done

- A successful TypeScript check and production build with zero console errors.
- No horizontal overflow on mobile.
- Working loading, empty, error, success, and disabled states where relevant.
- WCAG AA contrast for text and interactive controls.
- Reduced-motion support for non-essential animation.
- Search, filtering, theme, direction, copy actions, and demos remain functional.
- Each third-party-inspired pattern retains a direct source reference.
