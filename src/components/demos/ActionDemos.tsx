import { useState } from "react";
import {
  PiBell,
  PiChartLine,
  PiFilePlus,
  PiFolderPlus,
  PiGear,
  PiHouse,
  PiListPlus,
  PiMagnifyingGlass,
  PiMoon,
  PiPlus,
  PiSignOut,
  PiSun,
  PiUserCircle,
  PiX,
} from "react-icons/pi";
import type { DemoProps } from "./shared";

export default function ActionDemos({ kind, onNotify, onThemeToggle }: DemoProps) {
  switch (kind) {
    case "search-dock": return <SearchDock />;
    case "create-menu": return <CreateMenu onNotify={onNotify} />;
    case "tabs": return <Tabs />;
    case "announcement": return <Announcement />;
    case "theme-toggle": return <ThemeToggle onThemeToggle={onThemeToggle} />;
    case "fab": return <FloatingMenu onNotify={onNotify} />;
    case "expandable-tabs": return <ExpandableTabs />;
    default: return null;
  }
}

function SearchDock() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div className="demo demo-search-dock">
      <div className={`expanding-search ${open ? "open" : ""}`}>
        <button type="button" aria-label={open ? "إغلاق البحث" : "فتح البحث"} onClick={() => { setOpen((state) => !state); if (open) setValue(""); }}>{open ? <PiX /> : <PiMagnifyingGlass />}</button>
        {open && <input autoFocus value={value} onChange={(event) => setValue(event.target.value)} placeholder="ابحث في المشاريع..." />}
        {open && value && <kbd>↵</kbd>}
      </div>
      {open && value ? <div className="search-result"><span>N</span><div><strong>NOVA Design System</strong><small>آخر تعديل قبل 4 دقائق</small></div></div> : <p>{open ? "اكتب NOVA لإظهار نتيجة." : "ابدأ من زر واحد واضح."}</p>}
    </div>
  );
}

function CreateMenu({ onNotify }: Pick<DemoProps, "onNotify">) {
  const [open, setOpen] = useState(false);
  const actions = [[PiFilePlus, "مستند جديد"], [PiFolderPlus, "مجلد جديد"], [PiListPlus, "قائمة مهمات"]] as const;
  return (
    <div className="demo demo-create-menu">
      <div className="create-anchor">
        <button className={`create-trigger ${open ? "active" : ""}`} type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}><PiPlus /> إنشاء</button>
        {open && <div className="create-popover" role="menu">{actions.map(([Icon, label]) => <button type="button" role="menuitem" key={label} onClick={() => { setOpen(false); onNotify(`تم اختيار: ${label}`); }}><span><Icon /></span><div><strong>{label}</strong><small>⌘ N</small></div></button>)}</div>}
      </div>
      <p>إجراءات متقاربة حسب تكرار الاستخدام.</p>
    </div>
  );
}

function Tabs() {
  const [tab, setTab] = useState(0);
  const tabs = ["نظرة عامة", "النشاط", "الإعدادات"];
  return (
    <div className="demo demo-tabs">
      <div className="hero-tabs" role="tablist" aria-label="بيانات المشروع">{tabs.map((label, index) => <button type="button" role="tab" id={`tab-${index}`} aria-controls={`panel-${index}`} aria-selected={tab === index} key={label} onClick={() => setTab(index)}>{label}</button>)}</div>
      <div className="tab-panel" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === 0 && <><span className="tab-stat">84%</span><div><strong>جودة النظام</strong><p>12 من 14 فحصًا مكتملًا.</p></div></>}
        {tab === 1 && <><span className="tab-stat"><PiChartLine /></span><div><strong>نشاط متصاعد</strong><p>38 تعديلًا خلال هذا الأسبوع.</p></div></>}
        {tab === 2 && <><span className="tab-stat"><PiGear /></span><div><strong>إعدادات المشروع</strong><p>الوصول محصور بأعضاء الفريق.</p></div></>}
      </div>
    </div>
  );
}

function Announcement() {
  const [visible, setVisible] = useState(true);
  return (
    <div className="demo demo-announcement">
      {visible ? <div className="announcement-bar"><span className="announcement-tag">جديد</span><p>أصبح NOVA يدعم أكثر من 60 نمطًا تفاعليًا.</p><a href="#components">استكشفها</a><button type="button" aria-label="إخفاء الإعلان" onClick={() => setVisible(false)}><PiX /></button></div> : <button className="demo-secondary" type="button" onClick={() => setVisible(true)}><PiBell /> إظهار الإعلان</button>}
    </div>
  );
}

function ThemeToggle({ onThemeToggle }: Pick<DemoProps, "onThemeToggle">) {
  const [dark, setDark] = useState(false);
  const toggle = () => { setDark((value) => !value); onThemeToggle(); };
  return (
    <div className={`demo demo-theme-action ${dark ? "dark" : ""}`}>
      <div><small>المظهر الحالي</small><h4>{dark ? "ليلي هادئ" : "نهاري واضح"}</h4><p>يتبع اختيارك في كامل المكتبة.</p></div>
      <button type="button" aria-label="تبديل المظهر" onClick={toggle}><span className="sun-layer"><PiSun /></span><span className="moon-layer"><PiMoon /></span></button>
    </div>
  );
}

function FloatingMenu({ onNotify }: Pick<DemoProps, "onNotify">) {
  const [open, setOpen] = useState(false);
  const items = [[PiUserCircle, "الحساب"], [PiGear, "الإعدادات"], [PiSignOut, "خروج"]] as const;
  return (
    <div className="demo demo-fab">
      <div className={`fab-cluster ${open ? "open" : ""}`}>{items.map(([Icon, label]) => <button type="button" key={label} aria-label={label} onClick={() => onNotify(`تم اختيار ${label}`)}><Icon /><span>{label}</span></button>)}<button type="button" className="fab-main" aria-label={open ? "إغلاق قائمة الإجراءات" : "فتح قائمة الإجراءات"} aria-expanded={open} onClick={() => setOpen((value) => !value)}><PiPlus /></button></div>
      <p>{open ? "اختر إجراءً من القائمة." : "الإجراءات الثانوية مخفية حتى تحتاجها."}</p>
    </div>
  );
}

function ExpandableTabs() {
  const [active, setActive] = useState(0);
  const tabs = [[PiHouse, "الرئيسية"], [PiChartLine, "التحليلات"], [PiBell, "التنبيهات"], [PiGear, "الإعدادات"]] as const;
  return (
    <div className="demo demo-expandable-tabs">
      <nav aria-label="تنقّل قابل للتوسّع">{tabs.map(([Icon, label], index) => <button type="button" key={label} className={active === index ? "active" : ""} aria-current={active === index ? "page" : undefined} onClick={() => setActive(index)}><Icon /><span>{label}</span>{active === index && <i />}</button>)}</nav>
      <small>يعرض اسم الوجهة النشطة فقط.</small>
    </div>
  );
}
