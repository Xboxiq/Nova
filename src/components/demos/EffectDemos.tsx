import { useState } from "react";
import {
  PiArrowUpRight,
  PiBell,
  PiHouse,
  PiMagnifyingGlass,
  PiMagicWand,
  PiSparkle,
  PiUserCircle,
} from "react-icons/pi";
import type { DemoProps } from "./shared";

export default function EffectDemos({ kind, onNotify }: DemoProps) {
  switch (kind) {
    case "glowing-shadow": return <GlowingShadow />;
    case "gradient-button": return <GradientButton onNotify={onNotify} />;
    case "glass-button": return <GlassButton onNotify={onNotify} />;
    case "liquid-glass": return <LiquidGlass />;
    case "shiny-text": return <ShinyText />;
    default: return null;
  }
}

function GlowingShadow() {
  const [active, setActive] = useState(false);
  return (
    <div className="demo demo-glowing-shadow">
      <button type="button" className={`glowing-card ${active ? "active" : ""}`} onClick={() => setActive((value) => !value)}>
        <span className="glow-edge" /><div><span><PiSparkle /></span><small>ميزة الأسبوع</small></div><h4>حوّل الفكرة إلى نظام.</h4><p>ظل واحد يحدّد الأولوية دون تشويش بقية الواجهة.</p><footer><strong>{active ? "التوهّج فعّال" : "اضغط للتفعيل"}</strong><PiArrowUpRight /></footer>
      </button>
    </div>
  );
}

function GradientButton({ onNotify }: Pick<DemoProps, "onNotify">) {
  const [loading, setLoading] = useState(false);
  const run = () => { setLoading(true); window.setTimeout(() => { setLoading(false); onNotify("بدأت جلسة التصميم"); }, 700); };
  return (
    <div className="demo demo-gradient-button">
      <span className="demo-kicker">إجراء مميز</span><h4>حدود تتحرّك، سطح لا يصرخ.</h4>
      <button type="button" className={`border-gradient-button ${loading ? "loading" : ""}`} disabled={loading} onClick={run}><span><PiMagicWand />{loading ? "جارٍ البدء" : "ابدأ جلسة التصميم"}</span></button>
      <p>التدرّج محصور في الحد للحفاظ على التباين.</p>
    </div>
  );
}

function GlassButton({ onNotify }: Pick<DemoProps, "onNotify">) {
  const [pressed, setPressed] = useState(false);
  return (
    <div className="demo demo-glass-button">
      <div className="glass-scene"><i /><i /><i /><button type="button" className={pressed ? "pressed" : ""} onClick={() => { setPressed(true); onNotify("تم تنفيذ الإجراء الزجاجي"); window.setTimeout(() => setPressed(false), 500); }}><PiSparkle /><span>إنشاء مساحة</span><PiArrowUpRight /></button></div>
    </div>
  );
}

function LiquidGlass() {
  const [active, setActive] = useState(0);
  const icons = [[PiHouse, "الرئيسية"], [PiMagnifyingGlass, "البحث"], [PiBell, "التنبيهات"], [PiUserCircle, "الحساب"]] as const;
  return (
    <div className="demo demo-liquid-glass">
      <div className="liquid-wallpaper"><span /><span /><span /></div>
      <nav className="liquid-dock" aria-label="مرسى زجاجي">{icons.map(([Icon, label], index) => <button type="button" aria-label={label} aria-current={active === index ? "page" : undefined} className={active === index ? "active" : ""} key={label} onClick={() => setActive(index)}><Icon /><span>{label}</span></button>)}</nav>
    </div>
  );
}

function ShinyText() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="demo demo-shiny-text">
      <button type="button" className={`shiny-badge ${paused ? "paused" : ""}`} aria-pressed={paused} onClick={() => setPaused((value) => !value)}><PiSparkle /><span>مدعوم بتفاصيل NOVA</span></button>
      <h4>واجهة تبدو هادئة<br />وتشعر بأنها حيّة.</h4>
      <p>{paused ? "تم إيقاف اللمعة." : "اضغط على الوسم لإيقاف اللمعة."}</p>
    </div>
  );
}
