import type { DemoKind } from "../../types";

export interface DemoProps {
  kind: DemoKind;
  onNotify: (message: string) => void;
  onThemeToggle: () => void;
}

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
