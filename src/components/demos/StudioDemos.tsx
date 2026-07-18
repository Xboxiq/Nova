import type { DemoProps } from "./shared";
import { ButtonWorkbench, IconWorkbench, MotionWorkbench, NavigationWorkbench } from "../PatternStudio";

export default function StudioDemos({ kind, onNotify }: DemoProps) {
  switch (kind) {
    case "action-system": return <div className="demo studio-demo"><ButtonWorkbench locale="ar" compact onNotify={onNotify} /></div>;
    case "navigation-architecture": return <div className="demo studio-demo"><NavigationWorkbench locale="ar" compact /></div>;
    case "icon-material-lab": return <div className="demo studio-demo"><IconWorkbench locale="ar" compact /></div>;
    case "anchored-transition": return <div className="demo studio-demo"><MotionWorkbench locale="ar" compact /></div>;
    default: return null;
  }
}
