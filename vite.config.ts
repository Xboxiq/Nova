import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative asset URLs, so one build serves from the domain root, from a
  // GitHub Pages project subpath (`/nova/`), or from a local `vite preview`
  // without a per-target `base`. Safe here because the app is a single page
  // with no client-side router — nothing is ever served from a deeper path.
  base: "./",
  plugins: [react()],
  build: {
    target: "es2022",
    sourcemap: true,
  },
});
