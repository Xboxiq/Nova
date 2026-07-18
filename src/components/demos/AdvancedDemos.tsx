import {
  AdaptiveInspector,
  ContextRibbon,
  FlowConstellation,
  FoldDeck,
  GuidedEmptyState,
  NotificationStack,
  RangeComposer,
  SignalLens,
} from "../AdvancedPatternLab";
import type { DemoProps } from "./shared";

export default function AdvancedDemos({ kind, onNotify }: DemoProps) {
  switch (kind) {
    case "context-ribbon": return <div className="demo advanced-demo advanced-demo-context"><ContextRibbon locale="ar" compact onNotify={onNotify} /></div>;
    case "signal-lens": return <div className="demo advanced-demo"><SignalLens locale="ar" compact /></div>;
    case "flow-constellation": return <div className="demo advanced-demo"><FlowConstellation locale="ar" compact /></div>;
    case "notification-stack": return <div className="demo advanced-demo"><NotificationStack locale="ar" compact onNotify={onNotify} /></div>;
    case "range-composer": return <div className="demo advanced-demo"><RangeComposer locale="ar" compact /></div>;
    case "guided-empty-state": return <div className="demo advanced-demo"><GuidedEmptyState locale="ar" compact onNotify={onNotify} /></div>;
    case "fold-deck": return <div className="demo advanced-demo"><FoldDeck locale="ar" compact /></div>;
    case "adaptive-inspector": return <div className="demo advanced-demo"><AdaptiveInspector locale="ar" compact /></div>;
    default: return null;
  }
}
