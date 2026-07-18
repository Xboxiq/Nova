import { useState } from "react";
import {
  PiArrowUp,
  PiBell,
  PiBookmarkSimple,
  PiCheck,
  PiClock,
  PiDotsThree,
  PiFolder,
  PiHouse,
  PiMapPin,
  PiMicrophone,
  PiPaperclip,
  PiPause,
  PiPlay,
  PiSparkle,
  PiUploadSimple,
  PiUser,
  PiWaveform,
} from "react-icons/pi";
import type { DemoProps } from "./shared";

export default function NavigationDemos({ kind, onNotify }: DemoProps) {
  switch (kind) {
    case "dynamic-island": return <DynamicIsland />;
    case "toolbar": return <Toolbar />;
    case "location": return <LocationTag />;
    case "activity": return <Activity />;
    case "glow-menu": return <GlowMenu />;
    case "agent-dock": return <AgentDock onNotify={onNotify} />;
    default: return null;
  }
}

function DynamicIsland() {
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(true);
  return (
    <div className="demo demo-island">
      <div className={`dynamic-island ${expanded ? "expanded" : ""}`}>
        <button className="island-toggle" type="button" aria-label={expanded ? "تصغير الجزيرة الديناميكية" : "توسيع الجزيرة الديناميكية"} aria-expanded={expanded} onClick={() => setExpanded((value) => !value)} />
        <span className="album-art"><PiWaveform /></span>
        <div className="island-copy"><strong>NOVA Radio</strong><small>{expanded ? "مساحة تركيز · 02:14" : "قيد التشغيل"}</small></div>
        <span className="equalizer" aria-hidden="true"><i /><i /><i /></span>
        {expanded && <button className="island-action" type="button" aria-label={playing ? "إيقاف الصوت" : "تشغيل الصوت"} onClick={() => setPlaying((value) => !value)}>{playing ? <PiPause /> : <PiPlay />}</button>}
      </div>
      <p>اضغط على الجزيرة لتوسيع حالة التشغيل.</p>
    </div>
  );
}

function Toolbar() {
  const [active, setActive] = useState("home");
  const tools = [
    ["home", "الرئيسية", PiHouse], ["files", "الملفات", PiFolder], ["saved", "المحفوظات", PiBookmarkSimple], ["profile", "الحساب", PiUser],
  ] as const;
  return (
    <div className="demo demo-toolbar">
      <div className="toolbar-dock" role="toolbar" aria-label="التنقّل السريع">
        {tools.map(([id, label, Icon]) => <button type="button" key={id} className={active === id ? "active" : ""} aria-label={label} aria-pressed={active === id} onClick={() => setActive(id)}><Icon /><span>{label}</span></button>)}
      </div>
      <small>المساحة الحالية: {tools.find(([id]) => id === active)?.[1]}</small>
    </div>
  );
}

function LocationTag() {
  const [open, setOpen] = useState(false);
  return (
    <div className="demo demo-location">
      <div className="map-field" aria-hidden="true"><i /><i /><i /><span className="map-pin"><PiMapPin /></span></div>
      <button className={`location-tag ${open ? "open" : ""}`} type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <span><PiMapPin /></span><div><small>موقع الاجتماع</small><strong>بغداد، الكرادة</strong>{open && <p>شارع 62 · الطابق الثالث</p>}</div><PiDotsThree />
      </button>
    </div>
  );
}

function Activity() {
  const [open, setOpen] = useState(true);
  const activities = [
    ["نشر سارة الإصدار 4.0", "الآن", PiUploadSimple], ["أضاف علي تعليقًا", "قبل 12 د", PiBell], ["اكتمل فحص الوصول", "قبل ساعة", PiCheck],
  ] as const;
  return (
    <div className="demo demo-activity">
      <button className="activity-trigger" type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}><span><PiBell /><i /></span><div><strong>النشاط</strong><small>3 تحديثات جديدة</small></div><PiDotsThree /></button>
      {open && <div className="activity-menu">{activities.map(([text, time, Icon]) => <button type="button" key={text}><span><Icon /></span><div><strong>{text}</strong><small><PiClock /> {time}</small></div></button>)}</div>}
    </div>
  );
}

function GlowMenu() {
  const [active, setActive] = useState(0);
  const items = [[PiHouse, "الرئيسية"], [PiSparkle, "الإبداع"], [PiFolder, "المشاريع"], [PiUser, "الحساب"]] as const;
  return (
    <div className="demo demo-glow-menu">
      <nav className="glow-nav" aria-label="قائمة داكنة">
        {items.map(([Icon, label], index) => <button type="button" key={label} className={active === index ? "active" : ""} aria-current={active === index ? "page" : undefined} onClick={() => setActive(index)}><Icon /><span>{label}</span></button>)}
      </nav>
      <p>مؤشر واحد يوضّح وجهتك الحالية.</p>
    </div>
  );
}

function AgentDock({ onNotify }: Pick<DemoProps, "onNotify">) {
  const [value, setValue] = useState("");
  const [listening, setListening] = useState(false);
  const send = () => {
    if (!value.trim()) return;
    onNotify("تم إرسال الرسالة إلى NOVA");
    setValue("");
  };
  return (
    <div className="demo demo-agent">
      <div className="agent-response"><span><PiSparkle /></span><div><small>NOVA Agent</small><p>كيف أستطيع مساعدتك في بناء الواجهة؟</p></div></div>
      <div className={`agent-composer ${listening ? "listening" : ""}`}>
        <button type="button" aria-label="إرفاق ملف"><PiPaperclip /></button>
        <input value={value} onChange={(event) => setValue(event.target.value)} placeholder={listening ? "أستمع إليك..." : "اكتب طلبك"} onKeyDown={(event) => { if (event.key === "Enter") send(); }} />
        <button type="button" aria-label={listening ? "إيقاف الاستماع" : "بدء الإدخال الصوتي"} onClick={() => setListening((state) => !state)}><PiMicrophone /></button>
        <button type="button" className="send" aria-label="إرسال" disabled={!value.trim()} onClick={send}><PiArrowUp /></button>
      </div>
    </div>
  );
}
