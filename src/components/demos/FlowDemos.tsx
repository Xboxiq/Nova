import { useState } from "react";
import {
  PiArrowLeft,
  PiArrowRight,
  PiCalendarBlank,
  PiCheck,
  PiCheckCircleFill,
  PiFloppyDisk,
  PiMapPin,
  PiPackage,
  PiTruck,
  PiUser,
  PiWarningCircle,
} from "react-icons/pi";
import type { DemoProps } from "./shared";

export default function FlowDemos({ kind, onNotify }: DemoProps) {
  switch (kind) {
    case "onboarding": return <OnboardingDemo onNotify={onNotify} />;
    case "registration": return <RegistrationDemo />;
    case "events": return <EventsDemo />;
    case "multistep": return <MultistepDemo onNotify={onNotify} />;
    case "arrival": return <ArrivalDemo />;
    case "unsaved": return <UnsavedDemo onNotify={onNotify} />;
    default: return null;
  }
}

function OnboardingDemo({ onNotify }: Pick<DemoProps, "onNotify">) {
  const [avatar, setAvatar] = useState(1);
  const [done, setDone] = useState(false);
  const avatars = ["ن", "ر", "س", "ع"];
  /* The caption used to read "الخطوة 1 من 3" as a literal, beside three literal
     `<i>` dots, while `done` lit the SECOND dot. So the drawing advanced and the
     sentence under it did not — the hero card's defect, one screen over. */
  const steps = [true, done, false];
  const at = steps.filter(Boolean).length;

  return (
    <div className="demo demo-onboarding">
      <div className="demo-progress">{steps.map((on, index) => <i key={index} className={on ? "active" : ""} />)}</div>
      <span className="demo-kicker">الخطوة {at} من {steps.length}</span>
      <h4>{done ? "اختيار موفق" : "اختر حضورك البصري"}</h4>
      <p>{done ? "يمكنك تغييره لاحقًا من الإعدادات." : "ابدأ بصورة بسيطة تمثّلك داخل مساحة العمل."}</p>
      <div className="avatar-row" role="radiogroup" aria-label="اختر الصورة الشخصية">
        {avatars.map((label, index) => (
          <button
            type="button"
            key={label}
            className={avatar === index ? "selected" : ""}
            role="radio"
            aria-checked={avatar === index}
            onClick={() => { setAvatar(index); setDone(false); }}
          >
            <span className={`avatar-art avatar-${index}`}>{label}</span>
          </button>
        ))}
      </div>
      <button className="demo-primary" type="button" onClick={() => { setDone(true); onNotify("تم حفظ اختيارك"); }}>
        {done ? <PiCheck /> : <PiArrowLeft />} {done ? "تم الحفظ" : "متابعة"}
      </button>
    </div>
  );
}

function RegistrationDemo() {
  const [step, setStep] = useState(2);
  const labels = ["الحساب", "الهوية", "الفريق", "الإكمال"];
  return (
    <div className="demo demo-registration">
      <div className="registration-head"><span className="demo-icon"><PiUser /></span><div><h4>إنشاء الحساب</h4><p>دقيقتان تقريبًا</p></div></div>
      <ol className="vertical-stepper">
        {labels.map((label, index) => (
          <li key={label} className={index < step ? "done" : index === step ? "current" : ""}>
            <button type="button" onClick={() => setStep(index)} aria-current={index === step ? "step" : undefined}>
              <span>{index < step ? <PiCheck /> : index + 1}</span>
              <div><strong>{label}</strong><small>{index < step ? "مكتمل" : index === step ? "قيد الإعداد" : "التالي"}</small></div>
            </button>
          </li>
        ))}
      </ol>
      <button className="demo-secondary" type="button" onClick={() => setStep((value) => Math.min(labels.length - 1, value + 1))}>أكمل الخطوة <PiArrowLeft /></button>
    </div>
  );
}

function EventsDemo() {
  const [selected, setSelected] = useState(3);
  const days = [
    ["س", "12"], ["ح", "13"], ["ن", "14"], ["ث", "15"], ["ر", "16"], ["خ", "17"], ["ج", "18"],
  ];
  return (
    <div className="demo demo-events">
      <div className="calendar-heading"><div><span className="demo-kicker">أكتوبر 2026</span><h4>جدول الفريق</h4></div><PiCalendarBlank /></div>
      <div className="week-strip" role="radiogroup" aria-label="اختر اليوم">
        {days.map(([day, date], index) => (
          <button key={date} type="button" role="radio" aria-checked={selected === index} className={selected === index ? "active" : ""} onClick={() => setSelected(index)}>
            <small>{day}</small><strong>{date}</strong>
          </button>
        ))}
      </div>
      <div className="event-card"><span>10:30</span><i /><div><strong>{selected === 3 ? "مراجعة النظام" : "جلسة تصميم"}</strong><small>45 دقيقة · غرفة الإبداع</small></div><span className="event-avatars">ن&nbsp; س</span></div>
      <button type="button" className="demo-link">عرض اليوم الكامل <PiArrowLeft /></button>
    </div>
  );
}

function MultistepDemo({ onNotify }: Pick<DemoProps, "onNotify">) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const screens = [
    { title: "عرّف مشروعك", label: "اسم المشروع", placeholder: "مثل: منصّة نواة" },
    { title: "حدّد الاستخدام", label: "الهدف الأساسي", placeholder: "مكتبة تصميم داخلية" },
    { title: "جاهز للانطلاق", label: "ملاحظة اختيارية", placeholder: "أي تفاصيل إضافية" },
  ];
  const current = screens[step];
  const last = screens.length - 1;
  const next = () => {
    if (step < last) setStep((value) => value + 1);
    else onNotify("اكتمل إعداد المشروع");
  };
  return (
    <form className="demo demo-multistep" onSubmit={(event) => { event.preventDefault(); next(); }}>
      <div className="form-step-head"><span>0{step + 1}</span><div><small>إعداد سريع</small><h4>{current.title}</h4></div></div>
      <label><span>{current.label}</span><input value={name} onChange={(event) => setName(event.target.value)} placeholder={current.placeholder} /></label>
      <div className="form-progress" role="progressbar" aria-label="تقدّم النموذج" aria-valuemin={1} aria-valuemax={screens.length} aria-valuenow={step + 1}><i style={{ transform: `scaleX(${(step + 1) / screens.length})` }} /></div>
      <div className="form-actions">
        <button className="demo-secondary" type="button" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}><PiArrowRight /> رجوع</button>
        <button className="demo-primary" type="submit">{step === last ? "إنهاء" : "متابعة"} <PiArrowLeft /></button>
      </div>
    </form>
  );
}

function ArrivalDemo() {
  const [details, setDetails] = useState(false);
  return (
    <div className="demo demo-arrival">
      <div className="arrival-head"><span><PiTruck /></span><div><small>موعد الوصول المتوقع</small><h4>اليوم، 4:20 م</h4></div><strong>38 دقيقة</strong></div>
      <div className="route-line"><span className="done"><PiPackage /></span><i /><span className="active"><PiTruck /></span><i /><span><PiMapPin /></span></div>
      <div className="route-labels"><span>تم الاستلام</span><span>في الطريق</span><span>وصل</span></div>
      {details && <div className="driver-row"><span className="driver-avatar">م</span><div><strong>محمد كريم</strong><small>السائق · 4.9 ★</small></div><button type="button" aria-label="الاتصال بالسائق">اتصال</button></div>}
      <button type="button" className="demo-secondary full" onClick={() => setDetails((value) => !value)}>{details ? "إخفاء التفاصيل" : "تفاصيل الرحلة"}</button>
    </div>
  );
}

function UnsavedDemo({ onNotify }: Pick<DemoProps, "onNotify">) {
  const initial = "تجربة واضحة تبدأ من حاجات المستخدم.";
  const [saved, setSaved] = useState(initial);
  const [value, setValue] = useState(initial);
  const dirty = value !== saved;
  return (
    <div className="demo demo-unsaved">
      <div className="unsaved-status" data-dirty={dirty}><span>{dirty ? <PiWarningCircle /> : <PiCheckCircleFill />}</span><div><strong>{dirty ? "تغييرات غير محفوظة" : "كل شيء محفوظ"}</strong><small>{dirty ? "لن نفقد عملك دون تنبيه" : "آخر حفظ الآن"}</small></div></div>
      <label><span>وصف المنتج</span><textarea value={value} onChange={(event) => setValue(event.target.value)} rows={3} /></label>
      <div className="form-actions">
        <button className="demo-secondary" type="button" disabled={!dirty} onClick={() => setValue(saved)}>تراجع</button>
        <button className="demo-primary" type="button" disabled={!dirty} onClick={() => { setSaved(value); onNotify("تم حفظ التغييرات"); }}><PiFloppyDisk /> حفظ</button>
      </div>
    </div>
  );
}
