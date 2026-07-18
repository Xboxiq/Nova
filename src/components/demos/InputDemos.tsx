import { useRef, useState } from "react";
import {
  PiCalendarBlank,
  PiCamera,
  PiCaretDown,
  PiCaretLeft,
  PiCaretRight,
  PiCheck,
  PiCheckCircleFill,
  PiCurrencyDollar,
  PiEnvelope,
  PiFileImage,
  PiLock,
  PiShieldCheck,
  PiTrash,
  PiUploadSimple,
  PiUser,
  PiX,
} from "react-icons/pi";
import type { DemoProps } from "./shared";

export default function InputDemos({ kind, onNotify }: DemoProps) {
  switch (kind) {
    case "avatar-picker": return <AvatarPicker />;
    case "md3-switch": return <MaterialSwitches />;
    case "date-wheel": return <DateWheel />;
    case "liquid-radio": return <LiquidRadio />;
    case "apple-calendar": return <AppleCalendar />;
    case "otp": return <OtpInput onNotify={onNotify} />;
    case "hero-form": return <HeroForm onNotify={onNotify} />;
    case "select": return <AnimatedSelect />;
    case "multi-select": return <MultipleSelect />;
    case "addons-input": return <AddonsInput />;
    case "image-upload": return <ImageUpload onNotify={onNotify} />;
    default: return null;
  }
}

function AvatarPicker() {
  const [selected, setSelected] = useState(2);
  const avatars = ["م", "ل", "ن", "س", "ر"];
  return (
    <div className="demo demo-avatar-picker">
      <div className={`avatar-preview avatar-art avatar-${selected % 4}`}>{avatars[selected]}<span><PiCamera /></span></div>
      <div><span className="demo-kicker">الصورة الشخصية</span><h4>كيف تريد أن تظهر؟</h4><p>اختر شخصية ثم احفظ التغيير.</p></div>
      <div className="avatar-options" role="radiogroup" aria-label="اختيار الصورة">{avatars.map((label, index) => <button type="button" role="radio" aria-checked={selected === index} className={selected === index ? "selected" : ""} key={index} onClick={() => setSelected(index)}><span className={`avatar-art avatar-${index % 4}`}>{label}</span>{selected === index && <i><PiCheck /></i>}</button>)}</div>
    </div>
  );
}

function MaterialSwitches() {
  const [wifi, setWifi] = useState(true);
  const [backup, setBackup] = useState(false);
  return (
    <div className="demo demo-md-switch">
      <h4>تفضيلات الاتصال</h4>
      <SwitchRow label="المزامنة عبر Wi-Fi" detail="توفير بيانات الهاتف" checked={wifi} onChange={setWifi} />
      <SwitchRow label="النسخ الاحتياطي التلقائي" detail="كل ليلة عند الشحن" checked={backup} onChange={setBackup} />
      <SwitchRow label="استخدام شبكة الجوال" detail="يتطلب خطة مدفوعة" checked={false} disabled onChange={() => undefined} />
    </div>
  );
}

function SwitchRow({ label, detail, checked, disabled = false, onChange }: { label: string; detail: string; checked: boolean; disabled?: boolean; onChange: (value: boolean) => void }) {
  return <div className={`switch-row ${disabled ? "disabled" : ""}`}><div><strong>{label}</strong><small>{detail}</small></div><button type="button" className={`md-switch ${checked ? "on" : ""}`} role="switch" aria-label={label} aria-checked={checked} disabled={disabled} onClick={() => onChange(!checked)}><span>{checked && <PiCheck />}</span></button></div>;
}

function DateWheel() {
  const [day, setDay] = useState("17");
  const [month, setMonth] = useState("تموز");
  const [year, setYear] = useState("2026");
  const days = Array.from({ length: 31 }, (_, index) => String(index + 1));
  return (
    <div className="demo demo-date-wheel">
      <span className="demo-kicker">تاريخ الميلاد</span><h4>{day} {month} {year}</h4>
      <div className="wheel-picker"><label><span>اليوم</span><select value={day} onChange={(event) => setDay(event.target.value)}>{days.map((value) => <option key={value}>{value}</option>)}</select></label><label><span>الشهر</span><select value={month} onChange={(event) => setMonth(event.target.value)}>{["كانون الثاني", "شباط", "آذار", "نيسان", "أيار", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"].map((value) => <option key={value}>{value}</option>)}</select></label><label><span>السنة</span><select value={year} onChange={(event) => setYear(event.target.value)}>{["2024", "2025", "2026", "2027", "2028"].map((value) => <option key={value}>{value}</option>)}</select></label></div>
      <small><PiCalendarBlank /> استخدم الأسهم لتغيير القيم.</small>
    </div>
  );
}

function LiquidRadio() {
  const [selected, setSelected] = useState(1);
  const plans = [["شخصي", "$0", "مشروع واحد"], ["محترف", "$19", "مشاريع غير محدودة"], ["فريق", "$49", "حتى 10 أعضاء"]];
  return (
    <div className="demo demo-liquid-radio">
      <header><span className="demo-kicker">اختر خطتك</span><h4>ابدأ بالحجم المناسب</h4></header>
      <div className="liquid-options" role="radiogroup" aria-label="خطط الاشتراك">{plans.map(([name, price, detail], index) => <button type="button" role="radio" aria-checked={selected === index} className={selected === index ? "selected" : ""} key={name} onClick={() => setSelected(index)}><span className="liquid-dot"><i /></span><div><strong>{name}</strong><small>{detail}</small></div><b><bdi dir="ltr" lang="en">{price}</bdi></b></button>)}</div>
    </div>
  );
}

function AppleCalendar() {
  const [day, setDay] = useState(17);
  const [monthOffset, setMonthOffset] = useState(0);
  const month = monthOffset === 0 ? "تموز" : monthOffset > 0 ? "آب" : "حزيران";
  return (
    <div className="demo demo-apple-calendar">
      <header><button type="button" aria-label="الشهر السابق" onClick={() => setMonthOffset((value) => value - 1)}><PiCaretRight /></button><div><small>2026</small><h4>{month}</h4></div><button type="button" aria-label="الشهر التالي" onClick={() => setMonthOffset((value) => value + 1)}><PiCaretLeft /></button></header>
      <div className="calendar-week"><span>س</span><span>ح</span><span>ن</span><span>ث</span><span>ر</span><span>خ</span><span>ج</span></div>
      <div className="calendar-grid">{Array.from({ length: 35 }, (_, index) => { const date = index - 2; return date > 0 && date < 32 ? <button type="button" key={index} className={day === date ? "selected" : date === 24 ? "event" : ""} aria-pressed={day === date} onClick={() => setDay(date)}>{date}</button> : <span key={index} />; })}</div>
      <footer><span><i /> اجتماع في 24 {month}</span><strong>المحدد: {day} {month}</strong></footer>
    </div>
  );
}

function OtpInput({ onNotify }: Pick<DemoProps, "onNotify">) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const update = (index: number, input: string) => {
    const digit = input.replace(/\D/g, "").slice(-1);
    const next = [...digits]; next[index] = digit; setDigits(next); setError(false);
    if (digit && index < 5) refs.current[index + 1]?.focus();
  };
  const verify = () => {
    if (digits.join("") === "246810") onNotify("تم التحقق من الرمز");
    else setError(true);
  };
  return (
    <div className="demo demo-otp">
      <span className="otp-icon"><PiShieldCheck /></span><h4>تحقق من رقمك</h4><p>أدخل الرمز التجريبي 246810.</p>
      <div className={`otp-fields ${error ? "invalid" : ""}`} dir="ltr" onPaste={(event) => { const value = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split(""); if (value.length) { event.preventDefault(); setDigits([...value, ...Array(6 - value.length).fill("")]); refs.current[Math.min(value.length, 5)]?.focus(); setError(false); } }}>
        {digits.map((digit, index) => <input key={index} ref={(element) => { refs.current[index] = element; }} aria-label={`الرقم ${index + 1}`} inputMode="numeric" autoComplete={index === 0 ? "one-time-code" : "off"} maxLength={1} value={digit} onChange={(event) => update(index, event.target.value)} onKeyDown={(event) => { if (event.key === "Backspace" && !digit && index > 0) refs.current[index - 1]?.focus(); }} />)}
      </div>
      {error && <small className="error-text">الرمز غير صحيح، جرّب 246810</small>}
      <button className="demo-primary full" type="button" disabled={digits.some((digit) => !digit)} onClick={verify}>تحقق الآن</button>
    </div>
  );
}

function HeroForm({ onNotify }: Pick<DemoProps, "onNotify">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const emailInvalid = submitted && !/^\S+@\S+\.\S+$/.test(email);
  const passwordInvalid = submitted && password.length < 8;
  return (
    <form className="demo demo-hero-form" noValidate onSubmit={(event) => { event.preventDefault(); setSubmitted(true); if (/^\S+@\S+\.\S+$/.test(email) && password.length >= 8) onNotify("تم إنشاء الحساب بنجاح"); }}>
      <div className="form-brand"><span>N</span><div><h4>أنشئ حسابك</h4><p>ابدأ تجربتك خلال دقيقة.</p></div></div>
      <label><span>البريد الإلكتروني</span><div className={`input-shell ${emailInvalid ? "invalid" : ""}`}><PiEnvelope /><input dir="ltr" lang="en" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@company.com" aria-invalid={emailInvalid} /></div>{emailInvalid && <small className="error-text">اكتب بريدًا إلكترونيًا صحيحًا</small>}</label>
      <label><span>كلمة المرور</span><div className={`input-shell ${passwordInvalid ? "invalid" : ""}`}><PiLock /><input type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="8 أحرف على الأقل" aria-invalid={passwordInvalid} /></div>{passwordInvalid && <small className="error-text">تحتاج إلى 8 أحرف على الأقل</small>}</label>
      <button className="demo-primary full" type="submit">إنشاء الحساب</button>
    </form>
  );
}

function AnimatedSelect() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("تصميم المنتج");
  const options = ["تصميم المنتج", "تطوير الواجهة", "بحث المستخدم", "إدارة المنتج"];
  return (
    <div className="demo demo-select">
      <label><span>التخصّص</span><button type="button" className="select-trigger" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((value) => !value)}><span><PiUser />{selected}</span><PiCaretDown /></button></label>
      {open && <div className="select-menu" role="listbox">{options.map((option) => <button type="button" role="option" aria-selected={selected === option} key={option} onClick={() => { setSelected(option); setOpen(false); }}>{option}{selected === option && <PiCheck />}</button>)}</div>}
      <small>الخيار الحالي: {selected}</small>
    </div>
  );
}

function MultipleSelect() {
  const options = ["React", "TypeScript", "Design Systems", "Accessibility"];
  const [selected, setSelected] = useState(["React", "TypeScript"]);
  const [open, setOpen] = useState(false);
  const toggle = (option: string) => setSelected((values) => values.includes(option) ? values.filter((value) => value !== option) : [...values, option]);
  return (
    <div className="demo demo-multi-select">
      <label><span>المهارات</span><button type="button" className="multi-trigger" aria-expanded={open} onClick={() => setOpen((value) => !value)}>{selected.length ? <span className="chip-row">{selected.map((item) => <i key={item}>{item}<span aria-hidden="true"><PiX /></span></i>)}</span> : <span>اختر المهارات</span>}<PiCaretDown /></button></label>
      {open && <div className="select-menu" role="listbox" aria-multiselectable="true">{options.map((option) => <button type="button" role="option" aria-selected={selected.includes(option)} key={option} onClick={() => toggle(option)}><span className="check-box">{selected.includes(option) && <PiCheck />}</span>{option}</button>)}</div>}
    </div>
  );
}

function AddonsInput() {
  const [value, setValue] = useState("1250");
  const amount = Number(value || 0);
  return (
    <div className="demo demo-addons">
      <label><span>المبلغ</span><div className="addon-input"><span><PiCurrencyDollar /></span><input dir="ltr" inputMode="decimal" value={value} onChange={(event) => setValue(event.target.value.replace(/[^0-9.]/g, ""))} aria-describedby="fee-detail" /><strong><bdi dir="ltr" lang="en">USD</bdi></strong></div></label>
      <div className="amount-breakdown" id="fee-detail"><span>رسوم المعالجة</span><strong><bdi dir="ltr" lang="en">${(amount * 0.029).toFixed(2)}</bdi></strong><span>صافي المبلغ</span><strong><bdi dir="ltr" lang="en">${Math.max(0, amount - amount * 0.029).toFixed(2)}</bdi></strong></div>
    </div>
  );
}

function ImageUpload({ onNotify }: Pick<DemoProps, "onNotify">) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState("");
  const [fileName, setFileName] = useState("");
  const readFile = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { onNotify("اختر ملف صورة فقط"); return; }
    const reader = new FileReader();
    reader.onload = () => { setPreview(String(reader.result)); setFileName(file.name); onNotify("تمت إضافة الصورة"); };
    reader.readAsDataURL(file);
  };
  return (
    <div className="demo demo-upload">
      <input ref={inputRef} className="sr-only" type="file" accept="image/*" aria-label="رفع صورة" onChange={(event) => readFile(event.target.files?.[0])} />
      {preview ? <div className="upload-preview"><img src={preview} alt="معاينة الصورة المرفوعة" /><div><strong>{fileName}</strong><small>جاهزة للاستخدام</small></div><button type="button" aria-label="إزالة الصورة" onClick={() => { setPreview(""); setFileName(""); }}><PiTrash /></button></div> : <button type="button" className="drop-zone" onClick={() => inputRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); readFile(event.dataTransfer.files[0]); }}><span><PiFileImage /></span><strong>اسحب صورتك هنا</strong><small>PNG أو JPG حتى 10MB</small><i><PiUploadSimple /> اختيار ملف</i></button>}
      <small className="privacy-note"><PiCheckCircleFill /> تتم المعالجة داخل متصفّحك فقط.</small>
    </div>
  );
}
