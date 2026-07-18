import { useMemo, useState } from "react";
import {
  PiBuildings,
  PiCheck,
  PiCheckCircle,
  PiCircleNotch,
  PiCopy,
  PiCreditCard,
  PiMagnifyingGlass,
  PiMinus,
  PiMoon,
  PiPaperPlaneTilt,
  PiPlus,
  PiSun,
  PiTextB,
  PiTextItalic,
  PiTextUnderline,
  PiUsers,
} from "react-icons/pi";
import type { DemoProps } from "./shared";
import { clamp } from "./shared";

export default function ControlDemos({ kind, onNotify, onThemeToggle }: DemoProps) {
  switch (kind) {
    case "publish": return <PublishDemo onNotify={onNotify} />;
    case "glow-toggle": return <GlowToggle />;
    case "bouncy-toggle": return <BouncyToggle />;
    case "theme-switcher": return <ThemeSwitcher onThemeToggle={onThemeToggle} />;
    case "format-toggle": return <FormatToggle />;
    case "number-field": return <NumberField />;
    case "autocomplete": return <Autocomplete />;
    case "list-box": return <ListBox />;
    case "fieldset": return <Fieldset onNotify={onNotify} />;
    case "copy-code": return <CopyCode onNotify={onNotify} />;
    default: return null;
  }
}

function PublishDemo({ onNotify }: Pick<DemoProps, "onNotify">) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const publish = () => {
    if (status === "loading") return;
    setStatus("loading");
    window.setTimeout(() => { setStatus("done"); onNotify("تم نشر التحديث"); }, 850);
  };
  return (
    <div className="demo demo-publish">
      <div className="publish-preview"><span>N</span><div><small>nova.system</small><strong>الإصدار الرابع</strong></div><i className="online" /></div>
      <button className={`publish-button ${status}`} type="button" onClick={publish} disabled={status === "loading"}>
        {status === "loading" ? <PiCircleNotch className="spin" /> : status === "done" ? <PiCheck /> : <PiPaperPlaneTilt />}
        {status === "loading" ? "جارٍ النشر" : status === "done" ? "تم النشر" : "انشر الآن"}
      </button>
      <button type="button" className="demo-link" onClick={() => setStatus("idle")}>إعادة الحالة</button>
    </div>
  );
}

function GlowToggle() {
  const [enabled, setEnabled] = useState(true);
  return (
    <div className={`demo demo-glow-toggle ${enabled ? "enabled" : ""}`}>
      <div className="night-surface"><span className="orb" /><div><small>الوضع المحيطي</small><h4>{enabled ? "الإضاءة فعّالة" : "الإضاءة متوقفة"}</h4></div></div>
      <button className="cinematic-switch" type="button" role="switch" aria-label="تفعيل الإضاءة المحيطية" aria-checked={enabled} onClick={() => setEnabled((value) => !value)}><span /></button>
    </div>
  );
}

function BouncyToggle() {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="demo demo-bouncy-toggle">
      <div><span className="demo-kicker">إشعارات المشروع</span><h4>{enabled ? "لن يفوتك جديد" : "الإشعارات متوقفة"}</h4><p>ملخّص هادئ عند اكتمال المهمات.</p></div>
      <button type="button" className={`bouncy-switch ${enabled ? "on" : ""}`} role="switch" aria-label="تفعيل إشعارات المشروع" aria-checked={enabled} onClick={() => setEnabled((value) => !value)}><span><PiCheck /></span></button>
    </div>
  );
}

function ThemeSwitcher({ onThemeToggle }: Pick<DemoProps, "onThemeToggle">) {
  const [dark, setDark] = useState(false);
  const toggle = (value: boolean) => {
    if (value !== dark) onThemeToggle();
    setDark(value);
  };
  return (
    <div className={`demo demo-theme-switcher ${dark ? "night" : "day"}`}>
      <div className="theme-sky"><span className="celestial">{dark ? <PiMoon /> : <PiSun />}</span><i /><i /><i /></div>
      <div className="segmented theme-segment" role="radiogroup" aria-label="اختر المظهر">
        <button type="button" role="radio" aria-checked={!dark} className={!dark ? "active" : ""} onClick={() => toggle(false)}><PiSun /> نهاري</button>
        <button type="button" role="radio" aria-checked={dark} className={dark ? "active" : ""} onClick={() => toggle(true)}><PiMoon /> ليلي</button>
      </div>
    </div>
  );
}

function FormatToggle() {
  const [active, setActive] = useState<string[]>(["bold"]);
  const tools = [["bold", PiTextB, "عريض"], ["italic", PiTextItalic, "مائل"], ["underline", PiTextUnderline, "تحته خط"]] as const;
  return (
    <div className="demo demo-format">
      <div className="format-toolbar" role="toolbar" aria-label="تنسيق النص">
        {tools.map(([id, Icon, label]) => (
          <button type="button" key={id} aria-label={label} aria-pressed={active.includes(id)} className={active.includes(id) ? "active" : ""} onClick={() => setActive((values) => values.includes(id) ? values.filter((value) => value !== id) : [...values, id])}><Icon /></button>
        ))}
      </div>
      <p className={active.join(" ")}>نص حيّ يتغيّر بحسب اختيارك.</p>
      <small>{active.length ? `${active.length} تنسيقات فعّالة` : "دون تنسيق"}</small>
    </div>
  );
}

function NumberField() {
  const [value, setValue] = useState(4);
  return (
    <div className="demo demo-number-field">
      <div><span className="demo-kicker">عدد المقاعد</span><h4>فريق التصميم</h4><p>بين مقعد واحد و12 مقعدًا.</p></div>
      <div className="number-control">
        <button type="button" aria-label="إنقاص العدد" disabled={value === 1} onClick={() => setValue((number) => clamp(number - 1, 1, 12))}><PiMinus /></button>
        <input aria-label="عدد المقاعد" type="number" inputMode="numeric" min="1" max="12" value={value} onChange={(event) => setValue(clamp(Number(event.target.value) || 1, 1, 12))} />
        <button type="button" aria-label="زيادة العدد" disabled={value === 12} onClick={() => setValue((number) => clamp(number + 1, 1, 12))}><PiPlus /></button>
      </div>
      <strong className="price-value">${value * 12}<small> / شهر</small></strong>
    </div>
  );
}

function Autocomplete() {
  const cities = ["بغداد", "البصرة", "أربيل", "النجف", "الموصل"];
  const [value, setValue] = useState("");
  const options = useMemo(() => cities.filter((city) => city.includes(value.trim())), [value]);
  return (
    <div className="demo demo-autocomplete">
      <label><span>المدينة</span><div className="input-shell"><PiMagnifyingGlass /><input role="combobox" aria-expanded={Boolean(value)} aria-controls="city-options" value={value} onChange={(event) => setValue(event.target.value)} placeholder="ابدأ بالكتابة..." /></div></label>
      {value && <div className="option-popover" id="city-options" role="listbox">{options.length ? options.map((city) => <button type="button" role="option" aria-selected={value === city} key={city} onClick={() => setValue(city)}><span><PiBuildings /></span>{city}{value === city && <PiCheck />}</button>) : <p>لا توجد مدينة مطابقة</p>}</div>}
      <small>اكتب «ب» لتجربة الاقتراحات.</small>
    </div>
  );
}

function ListBox() {
  const [selected, setSelected] = useState(0);
  const options = [
    ["فريق NOVA", "12 عضوًا", PiUsers],
    ["المشروع الشخصي", "أنت فقط", PiBuildings],
    ["عميل التجربة", "5 أعضاء", PiCreditCard],
  ] as const;
  return (
    <div className="demo demo-listbox" role="listbox" aria-label="اختر مساحة العمل">
      {options.map(([title, detail, Icon], index) => <button type="button" role="option" aria-selected={selected === index} className={selected === index ? "selected" : ""} key={title} onClick={() => setSelected(index)}><span className="list-icon"><Icon /></span><div><strong>{title}</strong><small>{detail}</small></div><span className="radio-dot" /></button>)}
    </div>
  );
}

function Fieldset({ onNotify }: Pick<DemoProps, "onNotify">) {
  const [number, setNumber] = useState("");
  const invalid = number.length > 0 && number.replace(/\s/g, "").length < 8;
  return (
    <form className="demo demo-fieldset" onSubmit={(event) => { event.preventDefault(); if (!invalid && number) onNotify("تم حفظ بيانات الفوترة"); }}>
      <fieldset>
        <legend>بيانات الفوترة</legend>
        <p>لن يتم خصم أي مبلغ في هذا المثال.</p>
        <label><span>رقم البطاقة</span><div className={`input-shell ${invalid ? "invalid" : ""}`}><PiCreditCard /><input inputMode="numeric" value={number} onChange={(event) => setNumber(event.target.value)} placeholder="4242 4242 4242 4242" aria-invalid={invalid} /></div>{invalid && <small className="error-text">أدخل ثمانية أرقام على الأقل</small>}</label>
        <button className="demo-primary" type="submit" disabled={!number || invalid}>حفظ البطاقة</button>
      </fieldset>
    </form>
  );
}

function CopyCode({ onNotify }: Pick<DemoProps, "onNotify">) {
  const [copied, setCopied] = useState(false);
  const code = "npm install @nova/ui";
  const copy = () => {
    void navigator.clipboard.writeText(code);
    setCopied(true);
    onNotify("تم نسخ الأمر");
    window.setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="demo demo-copy-code">
      <div className="code-window"><div><span /><span /><span /></div><code><b>$</b> {code}</code><button type="button" onClick={copy} aria-label="نسخ أمر التثبيت">{copied ? <PiCheckCircle /> : <PiCopy />}<span>{copied ? "تم النسخ" : "نسخ"}</span></button></div>
      <p>أمر واحد لبدء استخدام المكتبة محليًا.</p>
    </div>
  );
}
