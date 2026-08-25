import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Relative asset URLs, so one build serves from the domain root, from a
  // GitHub Pages project subpath (`/nova/`), or from a local `vite preview`
  // without a per-target `base`. Safe here because the app is a single page
  // with no client-side router — nothing is ever served from a deeper path.
  base: "./",
  // Tailwind is here for the imported reference code, which is written in utility
  // classes. `src/tailwind.css` takes its theme and utilities layers and leaves
  // preflight out, so the global reset never touches this project's own tokens.
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2022",
    sourcemap: true,
  },
});
