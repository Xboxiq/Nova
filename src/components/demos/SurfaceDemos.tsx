import { useEffect, useRef, useState } from "react";
import {
  PiArrowLeft,
  PiBag,
  PiCheck,
  PiCheckCircleFill,
  PiCurrencyCircleDollar,
  PiHeart,
  PiImage,
  PiInfo,
  PiMagicWand,
  PiMinus,
  PiPackage,
  PiPlus,
  PiShareNetwork,
  PiShoppingBag,
  PiSpinnerGap,
  PiTruck,
  PiX,
  PiStack,
} from "react-icons/pi";
import type { DemoProps } from "./shared";

export default function SurfaceDemos({ kind, onNotify }: DemoProps) {
  switch (kind) {
    case "profile": return <Profile />;
    case "dashboard": return <Dashboard />;
    case "tracking": return <Tracking />;
    case "dialog": return <DialogDemo onNotify={onNotify} />;
    case "checkout": return <Checkout onNotify={onNotify} />;
    case "ai-gen": return <AiGen onNotify={onNotify} />;
    case "display-cards": return <DisplayCards />;
    default: return null;
  }
}

function Profile() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="demo demo-profile">
      <div className={`profile-card ${expanded ? "expanded" : ""}`}>
        <div className="profile-cover"><button type="button" aria-label="مشاركة الملف"><PiShareNetwork /></button></div>
        <div className="profile-core"><span className="profile-avatar avatar-art avatar-2">ن<i><PiCheck /></i></span><div><h4>نور الهاشمي</h4><p><bdi dir="ltr" lang="en">Senior Product Designer</bdi></p></div><button type="button" aria-label="حفظ الملف"><PiHeart /></button></div>
        {expanded && <div className="profile-stats"><div><strong>48</strong><small>مشروعًا</small></div><div><strong>12.8k</strong><small>متابع</small></div><div><strong>4.9</strong><small>تقييم</small></div></div>}
        <button className="profile-expand" type="button" onClick={() => setExpanded((value) => !value)}>{expanded ? "عرض أقل" : "عرض الإحصاءات"}<PiArrowLeft /></button>
      </div>
    </div>
  );
}

function Dashboard() {
  const [range, setRange] = useState("7 أيام");
  const values = range === "7 أيام" ? [34, 44, 38, 62, 54, 76, 68] : [42, 57, 48, 66, 72, 61, 86];
  return (
    <div className="demo demo-dashboard">
      <header><div><span className="demo-kicker">صافي الدخل</span><h4><bdi dir="ltr" lang="en">$8,420.50</bdi></h4></div><select aria-label="النطاق الزمني" value={range} onChange={(event) => setRange(event.target.value)}><option>7 أيام</option><option>30 يومًا</option></select></header>
      <div className="dashboard-change"><span><bdi dir="ltr">+17.3%</bdi></span><small><bdi dir="ltr" lang="en">$1,240</bdi> مقارنة بالفترة السابقة</small></div>
      <div className="dashboard-chart" role="img" aria-label="مخطط دخل صاعد">{values.map((value, index) => <i key={index} style={{ height: `${value}%` }}><b /></i>)}</div>
      <footer><div><span className="income"><PiCurrencyCircleDollar /></span><small>الدخل</small><strong><bdi dir="ltr" lang="en">$12,800</bdi></strong></div><div><span className="expense"><PiBag /></span><small>الصرف</small><strong><bdi dir="ltr" lang="en">$4,380</bdi></strong></div></footer>
    </div>
  );
}

function Tracking() {
  const [selected, setSelected] = useState(2);
  const steps = [[PiShoppingBag, "تم الطلب", "14 تموز، 9:30 ص"], [PiPackage, "تم التجهيز", "15 تموز، 2:20 م"], [PiTruck, "في الطريق", "الوصول اليوم"], [PiCheckCircleFill, "تم التوصيل", "التالي"]] as const;
  return (
    <div className="demo demo-tracking">
      <header><div><span className="demo-kicker">الطلب <bdi dir="ltr" lang="en">#NV-2048</bdi></span><h4>يصل اليوم</h4></div><span className="tracking-badge">مباشر</span></header>
      <div className="tracking-list">{steps.map(([Icon, title, detail], index) => <button type="button" key={title} className={index < selected ? "done" : index === selected ? "current" : ""} onClick={() => setSelected(index)}><span><Icon /></span><div><strong>{title}</strong><small>{detail}</small></div>{index === selected && <i>الحالية</i>}</button>)}</div>
    </div>
  );
}

function DialogDemo({ onNotify }: Pick<DemoProps, "onNotify">) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const controls = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button, [href], [tabindex]:not([tabindex='-1'])") ?? []);
      if (!controls.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus();
    };
  }, [open]);

  return (
    <div className="demo demo-dialog">
      <div className="dialog-teaser"><span><PiInfo /></span><div><h4>اتفاقية الاستخدام</h4><p>محتوى طويل مع عنوان وإجراء ثابتين.</p></div></div>
      <button className="demo-primary" type="button" onClick={() => setOpen(true)}>فتح النافذة</button>
      {open && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setOpen(false); }}><div ref={dialogRef} className="mini-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><header><div><small>آخر تحديث: تموز 2026</small><h4 id="dialog-title">شروط استخدام NOVA</h4></div><button ref={closeRef} type="button" aria-label="إغلاق النافذة" onClick={() => setOpen(false)}><PiX /></button></header><div className="dialog-scroll" tabIndex={0}><p>باستخدام هذه المكتبة، أنت تحتفظ بالتحكّم الكامل في مشروعك وملفاتك.</p><h5>الاستخدام الشخصي</h5><p>يمكنك تعديل المكوّنات وتكييفها مع منتجاتك دون نشرها في سجل خارجي.</p><h5>المصادر</h5><p>نحتفظ بروابط الإلهام الأصلية داخل كل بطاقة لضمان الشفافية.</p><h5>الوصول</h5><p>يجب الحفاظ على التركيز المرئي وتسميات الأزرار ودعم لوحة المفاتيح.</p></div><footer><button type="button" className="demo-secondary" onClick={() => setOpen(false)}>إلغاء</button><button type="button" className="demo-primary" onClick={() => { setOpen(false); onNotify("تم قبول الشروط"); }}>أوافق</button></footer></div></div>}
    </div>
  );
}

function Checkout({ onNotify }: Pick<DemoProps, "onNotify">) {
  const [quantity, setQuantity] = useState(1);
  const price = 89;
  return (
    <div className="demo demo-checkout">
      <header><span><PiShoppingBag /></span><div><h4>ملخّص الطلب</h4><p>شحن مجاني اليوم</p></div><strong>{quantity} عنصر</strong></header>
      <div className="checkout-item"><span className="product-art">N</span><div><strong><bdi dir="ltr" lang="en">NOVA System Kit</bdi></strong><small>ترخيص شخصي · أزرق معدني</small><div className="quantity"><button type="button" aria-label="إنقاص الكمية" disabled={quantity === 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))}><PiMinus /></button><span>{quantity}</span><button type="button" aria-label="زيادة الكمية" onClick={() => setQuantity((value) => value + 1)}><PiPlus /></button></div></div><b><bdi dir="ltr" lang="en">${price * quantity}</bdi></b></div>
      <div className="checkout-total"><span>الإجمالي</span><strong><bdi dir="ltr" lang="en">${price * quantity}.00</bdi></strong></div>
      <button className="demo-primary full" type="button" onClick={() => onNotify("تمت محاكاة إتمام الطلب")}><PiShoppingBag /> إتمام الطلب</button>
    </div>
  );
}

function AiGen({ onNotify }: Pick<DemoProps, "onNotify">) {
  const [prompt, setPrompt] = useState("واجهة مالية عربية هادئة");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const generate = () => {
    if (!prompt.trim() || generating) return;
    setGenerating(true); setGenerated(false);
    window.setTimeout(() => { setGenerating(false); setGenerated(true); onNotify("اكتملت المعاينة التجريبية"); }, 1000);
  };
  return (
    <div className="demo demo-ai-gen">
      <div className={`ai-canvas ${generated ? "generated" : ""}`}>{generating ? <><PiSpinnerGap className="spin" /><span>نبني المعاينة...</span></> : generated ? <div className="generated-ui"><span /><span /><i /><i /><i /></div> : <><PiImage /><span>ستظهر المعاينة هنا</span></>}</div>
      <label><span>صف فكرتك</span><textarea rows={2} value={prompt} onChange={(event) => setPrompt(event.target.value)} /></label>
      <button className="demo-primary full" type="button" disabled={!prompt.trim() || generating} onClick={generate}>{generating ? <PiSpinnerGap className="spin" /> : <PiMagicWand />} {generating ? "جارٍ التوليد" : "ولّد معاينة"}</button>
    </div>
  );
}

function DisplayCards() {
  const [active, setActive] = useState(0);
  const cards = [["استراتيجية المنتج", "12 ملفًا", "card-sky"], ["بحث المستخدم", "8 مقابلات", "card-coral"], ["نظام NOVA", "72 مكوّنًا", "card-mint"]];
  return (
    <div className="demo demo-display-cards">
      <div className="card-stack">{cards.map(([title, detail, tone], index) => <button type="button" key={title} className={`${tone} ${active === index ? "active" : ""}`} style={{ "--order": index } as React.CSSProperties} onClick={() => setActive(index)}><span><PiStack /></span><div><small>COLLECTION 0{index + 1}</small><h4>{title}</h4><p>{detail}</p></div><PiArrowLeft /></button>)}</div>
      <small>اختر بطاقة لإحضارها إلى المقدّمة.</small>
    </div>
  );
}
