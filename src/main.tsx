import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/ibm-plex-sans/index.css";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "@fontsource/ibm-plex-sans-arabic/600.css";
import "@fontsource/ibm-plex-sans-arabic/700.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-600.css";
import "@fontsource/ubuntu/latin-700.css";
import "@fontsource/space-grotesk/latin-300.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/outfit/latin-400.css";
import "@fontsource/outfit/latin-500.css";
import "@fontsource/outfit/latin-600.css";
import App from "./App";
import "../design-system/nova-design-os/tokens/tokens.css";
import "../design-system/nova-design-os/tokens/theme-packs.css";
import "../design-system/nova-design-os/tokens/brands.css";
import "../design-system/nova-design-os/tokens/directions.css";
import "./styles.css";
import "./tailwind.css";
/* Override sheet, imported last so it wins: see the header of the file. Deleting
   this one line reverts every change it makes. */
import "./gold-showcase.css";
import "./gold-gallery.css";
import "./gold-lab.css";
import "./gold-studio.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
