import { useState } from "react";
import {
  PiArrowClockwise,
  PiChartBar,
  PiCode,
  PiImage,
  PiLightning,
  PiPenNib,
  PiSpinnerGap,
} from "react-icons/pi";
import type { DemoProps } from "./shared";

export default function MotionDemos({ kind, onNotify }: DemoProps) {
  switch (kind) {
    case "dia-text": return <DiaText />;
    case "skills": return <Skills />;
    case "mini-chart": return <MiniChart />;
    case "sparkline": return <Sparkline />;
    case "shatter": return <Shatter onNotify={onNotify} />;
    case "logo-loader": return <LogoLoader />;
    case "shimmer": return <Shimmer />;
    case "foil": return <Foil />;
    default: return null;
  }
}

function DiaText() {
  const words = ["أوضح", "أهدأ", "أسرع"];
  const [word, setWord] = useState(0);
  return (
    <div className="demo demo-dia-text">
      <span className="demo-kicker">صمّم لتجربة</span>
      <h4>منتج <span key={word}>{words[word]}</span><br />من أول لحظة.</h4>
      <div className="word-selector" role="radiogroup" aria-label="اختر الكلمة"><button type="button" aria-label="الكلمة السابقة" onClick={() => setWord((value) => (value + 2) % 3)}>−</button>{words.map((label, index) => <i key={label} className={index === word ? "active" : ""} />)}<button type="button" aria-label="الكلمة التالية" onClick={() => setWord((value) => (value + 1) % 3)}>+</button></div>
    </div>
  );
}

function Skills() {
  const [selected, setSelected] = useState(0);
  const skills = [
    ["تصميم الأنظمة", 92, PiPenNib], ["React", 86, PiCode], ["تصوّر البيانات", 74, PiChartBar],
  ] as const;
  return (
    <div className="demo demo-skills">
      <header><div><span className="demo-kicker">القدرات</span><h4>أدوات تبني منتجًا</h4></div><strong>{skills[selected][1]}%</strong></header>
      <div className="skills-list">{skills.map(([label, value, Icon], index) => <button type="button" key={label} className={selected === index ? "active" : ""} onClick={() => setSelected(index)}><span><Icon /></span><div><strong>{label}</strong><i><b style={{ transform: `scaleX(${value / 100})` }} /></i></div><small>{value}%</small></button>)}</div>
    </div>
  );
}

function MiniChart() {
  const values = [38, 54, 46, 72, 65, 88, 76];
  const [selected, setSelected] = useState(5);
  return (
    <div className="demo demo-mini-chart">
      <header><div><span className="demo-kicker">الإيراد الأسبوعي</span><h4>${(values[selected] * 124).toLocaleString()}</h4></div><span className="positive">+18.2%</span></header>
      <div className="mini-bars" role="radiogroup" aria-label="اختر اليوم">{values.map((value, index) => <button type="button" key={index} role="radio" aria-checked={selected === index} className={selected === index ? "active" : ""} onClick={() => setSelected(index)} aria-label={`اليوم ${index + 1}: ${value}`}><i style={{ height: `${value}%` }} /></button>)}</div>
      <div className="chart-days"><span>س</span><span>ح</span><span>ن</span><span>ث</span><span>ر</span><span>خ</span><span>ج</span></div>
    </div>
  );
}

function Sparkline() {
  const [period, setPeriod] = useState("7D");
  const paths: Record<string, string> = {
    "24H": "M2 43 C18 35 25 48 40 30 S69 19 84 29 S112 12 138 18 S165 7 198 13",
    "7D": "M2 46 C24 51 28 28 47 34 S78 40 93 21 S122 30 139 17 S171 25 198 7",
    "30D": "M2 39 C17 20 34 44 53 28 S81 11 101 23 S132 41 149 18 S176 15 198 10",
  };
  return (
    <div className="demo demo-sparkline">
      <header><div><span className="live-dot" /> مباشر</div><div className="period-tabs">{Object.keys(paths).map((key) => <button type="button" className={period === key ? "active" : ""} key={key} onClick={() => setPeriod(key)}>{key}</button>)}</div></header>
      <div className="spark-value"><strong>12,840</strong><span>+8.4%</span></div>
      <svg viewBox="0 0 200 58" role="img" aria-label="اتجاه صاعد للبيانات"><defs><linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--nova-action)" stopOpacity=".28"/><stop offset="1" stopColor="var(--nova-action)" stopOpacity="0"/></linearGradient></defs><path className="spark-area" d={`${paths[period]} L198 58 L2 58 Z`} /><path className="spark-line" key={period} d={paths[period]} /></svg>
    </div>
  );
}

function Shatter({ onNotify }: Pick<DemoProps, "onNotify">) {
  const [active, setActive] = useState(false);
  const run = () => {
    setActive(false);
    window.requestAnimationFrame(() => setActive(true));
    window.setTimeout(() => { setActive(false); onNotify("اكتمل التأثير"); }, 780);
  };
  return (
    <div className="demo demo-shatter">
      <div className={`shatter-stage ${active ? "active" : ""}`}>
        <button type="button" onClick={run} disabled={active}><PiLightning /> {active ? "تم!" : "شغّل التأثير"}</button>
        {Array.from({ length: 10 }, (_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}
      </div>
      <p>حركة احتفالية تنتهي خلال أقل من ثانية.</p>
    </div>
  );
}

function LogoLoader() {
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1300);
  };
  return (
    <div className="demo demo-logo-loader">
      <div className={`trace-logo ${loading ? "loading" : ""}`}><svg viewBox="0 0 80 80" aria-label="شعار NOVA"><path d="M16 59V21L40 55L64 21V59" /></svg><span>NOVA</span></div>
      <button type="button" className="demo-secondary" onClick={start} disabled={loading}>{loading ? <PiSpinnerGap className="spin" /> : <PiArrowClockwise />} {loading ? "جارٍ التحميل" : "أعد التشغيل"}</button>
    </div>
  );
}

function Shimmer() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="demo demo-shimmer">
      <button type="button" className="shimmer-card" onClick={() => setLoaded((value) => !value)} aria-label={loaded ? "عرض حالة التحميل" : "عرض المحتوى المحمّل"} aria-pressed={loaded}>
        {loaded ? <><span className="shimmer-photo"><PiImage /></span><div><strong>دراسة حالة NOVA</strong><p>نظام تصميم عربي قابل للتوسّع.</p><small>8 دقائق قراءة</small></div></> : <><span className="skeleton sk-photo" /><div><i className="skeleton sk-title" /><i className="skeleton sk-line" /><i className="skeleton sk-short" /></div></>}
      </button>
      <small>اضغط للتبديل بين التحميل والمحتوى.</small>
    </div>
  );
}

function Foil() {
  const [point, setPoint] = useState({ x: 55, y: 36 });
  return (
    <div className="demo demo-foil">
      <button
        type="button"
        className="foil-card"
        onPointerMove={(event) => {
          const box = event.currentTarget.getBoundingClientRect();
          setPoint({ x: ((event.clientX - box.left) / box.width) * 100, y: ((event.clientY - box.top) / box.height) * 100 });
        }}
        style={{ background: `radial-gradient(circle at ${point.x}% ${point.y}%, rgba(255,255,255,.86), transparent 22%), conic-gradient(from ${point.x * 2}deg at ${point.x}% ${point.y}%, #91efd4, #9ce2ff, #ffb49f, #f7dd89, #91efd4)` }}
      >
        <span className="foil-grain" /><div><small>NOVA / 004</small></div><h4>IRIDESCENT<br />SYSTEM</h4><footer><span>MEMBER CARD</span><strong>∞</strong></footer>
      </button>
    </div>
  );
}
