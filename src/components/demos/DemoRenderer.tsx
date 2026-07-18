import type { DemoKind } from "../../types";
import AdvancedDemos from "./AdvancedDemos";
import ActionDemos from "./ActionDemos";
import ControlDemos from "./ControlDemos";
import EffectDemos from "./EffectDemos";
import FlowDemos from "./FlowDemos";
import InputDemos from "./InputDemos";
import MotionDemos from "./MotionDemos";
import NavigationDemos from "./NavigationDemos";
import SurfaceDemos from "./SurfaceDemos";
import StudioDemos from "./StudioDemos";

interface DemoRendererProps {
  kind: DemoKind;
  onNotify: (message: string) => void;
  onThemeToggle: () => void;
}

const flowKinds = new Set<DemoKind>(["onboarding", "registration", "events", "multistep", "arrival", "unsaved"]);
const controlKinds = new Set<DemoKind>(["publish", "glow-toggle", "bouncy-toggle", "theme-switcher", "format-toggle", "number-field", "autocomplete", "list-box", "fieldset", "copy-code"]);
const navigationKinds = new Set<DemoKind>(["dynamic-island", "toolbar", "location", "activity", "glow-menu", "agent-dock"]);
const motionKinds = new Set<DemoKind>(["dia-text", "skills", "mini-chart", "sparkline", "shatter", "logo-loader", "shimmer", "foil"]);
const inputKinds = new Set<DemoKind>(["avatar-picker", "md3-switch", "date-wheel", "liquid-radio", "apple-calendar", "otp", "hero-form", "select", "multi-select", "addons-input", "image-upload"]);
const actionKinds = new Set<DemoKind>(["search-dock", "create-menu", "tabs", "announcement", "theme-toggle", "fab", "expandable-tabs"]);
const surfaceKinds = new Set<DemoKind>(["profile", "dashboard", "tracking", "dialog", "checkout", "ai-gen", "display-cards"]);
const studioKinds = new Set<DemoKind>(["action-system", "navigation-architecture", "icon-material-lab", "anchored-transition"]);
const advancedKinds = new Set<DemoKind>(["context-ribbon", "signal-lens", "flow-constellation", "notification-stack", "range-composer", "guided-empty-state", "fold-deck", "adaptive-inspector"]);

export default function DemoRenderer(props: DemoRendererProps) {
  if (advancedKinds.has(props.kind)) return <AdvancedDemos {...props} />;
  if (studioKinds.has(props.kind)) return <StudioDemos {...props} />;
  if (flowKinds.has(props.kind)) return <FlowDemos {...props} />;
  if (controlKinds.has(props.kind)) return <ControlDemos {...props} />;
  if (navigationKinds.has(props.kind)) return <NavigationDemos {...props} />;
  if (motionKinds.has(props.kind)) return <MotionDemos {...props} />;
  if (inputKinds.has(props.kind)) return <InputDemos {...props} />;
  if (actionKinds.has(props.kind)) return <ActionDemos {...props} />;
  if (surfaceKinds.has(props.kind)) return <SurfaceDemos {...props} />;
  return <EffectDemos {...props} />;
}
