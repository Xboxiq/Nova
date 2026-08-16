import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  PiBellRinging,
  PiCardsThree,
  PiCaretDown,
  PiCaretLeft,
  PiCaretRight,
  PiChartLineUp,
  PiCheck,
  PiCheckCircle,
  PiCircleNotch,
  PiCode,
  PiCopy,
  PiCornersOut,
  PiCursorClick,
  PiDotsThree,
  PiEye,
  PiFlag,
  PiFolderOpen,
  PiMagicWand,
  PiMinus,
  PiPaintBrush,
  PiPlus,
  PiRectangle,
  PiRocketLaunch,
  PiShieldCheck,
  PiSidebarSimple,
  PiSlidersHorizontal,
  PiTextT,
  PiTrash,
  PiUploadSimple,
} from "react-icons/pi";
import type { Locale } from "../i18n";

interface AdvancedPatternLabProps {
  locale: Locale;
  onNotify: (message: string) => void;
}

interface AdvancedDemoProps {
  locale: Locale;
  compact?: boolean;
  onNotify?: (message: string) => void;
}

const labCopy = {
  ar: {
    title: "أنظمة تتشكّل حول المهمة، لا حول القالب.",
    lead: "ثمانية أنماط أصلية تربط السياق بالقرار، والبيانات باللمس، والحالة بالاسترجاع؛ لتصبح الواجهة أداة عمل لا معرض مؤثرات.",
    principles: ["السياق قبل الأدوات", "التلاعب المباشر", "استمرارية مكانية", "استرجاع آمن"],
    panels: {
      context: ["شريط السياق", "أوامر تتبدّل وفق العنصر المحدد دون إغراق الواجهة.", "3 contexts · anchored"],
      signal: ["عدسة الإشارة", "مؤشر زمني يربط القيمة مباشرة بنقطة البيانات.", "7 points · scrub"],
      flow: ["كوكبة التدفّق", "خريطة علاقات توضّح الاعتماد والحالة والخطوة التالية.", "5 nodes · stateful"],
      notices: ["مكدّس الإشعارات", "عمق بصري يلخّص النشاط ثم ينفتح إلى قائمة قابلة للإدارة.", "stack · dismiss"],
      inspector: ["المفتّش المتكيّف", "إعدادات سريعة أولًا ثم خصائص دقيقة عند الطلب.", "quick · advanced"],
      range: ["مؤلّف النطاق", "تحكم لمسي مع قيمة كبيرة، خطوات دقيقة، وحدود مفهومة.", "direct · precise"],
      empty: ["الفراغ الإرشادي", "حالة فارغة تقترح مسارات بدء حقيقية وتغلق الحلقة بنجاح.", "empty · progress · done"],
      fold: ["رُزم الطي", "طبقات مواصفات تنفتح واحدة في كل مرة وتحفظ سياق المجموعة.", "accordion · layered"],
    },
  },
  en: {
    title: "Systems shaped around the task, not the template.",
    lead: "Eight authored patterns connect context to decisions, data to touch, and state to recovery—turning UI into a working instrument.",
    principles: ["Context before tools", "Direct manipulation", "Spatial continuity", "Safe recovery"],
    panels: {
      context: ["Context ribbon", "Commands change with the selected object without flooding the interface.", "3 contexts · anchored"],
      signal: ["Signal lens", "A temporal scrubber binds the current value to its exact data point.", "7 points · scrub"],
      flow: ["Flow constellation", "A relationship map makes dependency, state, and the next step visible.", "5 nodes · stateful"],
      notices: ["Notification stack", "Visual depth summarizes activity, then opens into a manageable list.", "stack · dismiss"],
      inspector: ["Adaptive inspector", "Quick settings first, precise properties on demand.", "quick · advanced"],
      range: ["Range composer", "A touchable control with a large value, precise steps, and clear limits.", "direct · precise"],
      empty: ["Guided empty state", "A blank surface offers real starting paths and closes the loop with success.", "empty · progress · done"],
      fold: ["Fold deck", "Specification layers open one at a time while preserving group context.", "accordion · layered"],
    },
  },
} as const;

export default function AdvancedPatternLab({ locale, onNotify }: AdvancedPatternLabProps) {
  const copy = labCopy[locale];
  return (
    <section className="advanced-lab" id="advanced" aria-labelledby="advanced-title">
      <div className="section-intro advanced-intro">
        <div>
          <h2 id="advanced-title">{copy.title}</h2>
        </div>
        <p>{copy.lead}</p>
      </div>

      <ol className="advanced-principles" aria-label={locale === "ar" ? "مبادئ المختبر" : "Lab principles"}>
        {copy.principles.map((principle, index) => <li key={principle}><span>{String(index + 1).padStart(2, "0")}</span>{principle}</li>)}
      </ol>

      <div className="advanced-grid">
        <AdvancedPanel className="advanced-context" icon={<PiCursorClick />} copy={copy.panels.context}>
          <ContextRibbon locale={locale} onNotify={onNotify} />
        </AdvancedPanel>
        <AdvancedPanel className="advanced-signal" icon={<PiChartLineUp />} copy={copy.panels.signal}>
          <SignalLens locale={locale} />
        </AdvancedPanel>
        <AdvancedPanel className="advanced-flow" icon={<PiRocketLaunch />} copy={copy.panels.flow}>
          <FlowConstellation locale={locale} />
        </AdvancedPanel>
        <AdvancedPanel className="advanced-notices" icon={<PiBellRinging />} copy={copy.panels.notices}>
          <NotificationStack locale={locale} onNotify={onNotify} />
        </AdvancedPanel>
        <AdvancedPanel className="advanced-inspector" icon={<PiSlidersHorizontal />} copy={copy.panels.inspector}>
          <AdaptiveInspector locale={locale} />
        </AdvancedPanel>
        <AdvancedPanel className="advanced-range" icon={<PiCornersOut />} copy={copy.panels.range}>
          <RangeComposer locale={locale} />
        </AdvancedPanel>
        <AdvancedPanel className="advanced-empty" icon={<PiFolderOpen />} copy={copy.panels.empty}>
          <GuidedEmptyState locale={locale} onNotify={onNotify} />
        </AdvancedPanel>
        <AdvancedPanel className="advanced-fold" icon={<PiCardsThree />} copy={copy.panels.fold}>
          <FoldDeck locale={locale} />
        </AdvancedPanel>
      </div>
    </section>
  );
}

function AdvancedPanel({ className, icon, copy, children }: { className: string; icon: ReactNode; copy: readonly [string, string, string]; children: ReactNode }) {
  return (
    <article className={`advanced-panel ${className}`}>
      <header className="advanced-panel-header">
        <span aria-hidden="true">{icon}</span>
        <div><h3>{copy[0]}</h3><p>{copy[1]}</p></div>
        <small dir="ltr">{copy[2]}</small>
      </header>
      {children}
    </article>
  );
}

export function ContextRibbon({ locale, compact = false, onNotify }: AdvancedDemoProps) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const ar = locale === "ar";
  const contexts = [
    { label: ar ? "اللوحة" : "Canvas", hint: ar ? "مساحة العمل" : "Workspace", icon: PiCornersOut },
    { label: ar ? "البطاقة" : "Card", hint: ar ? "بطاقة الخدمة" : "Service card", icon: PiRectangle },
    { label: ar ? "النص" : "Text", hint: ar ? "العنوان الرئيسي" : "Main heading", icon: PiTextT },
  ];
  const selected = contexts[active];
  const SelectedIcon = selected.icon;

  return (
    <div className={`context-ribbon-demo ${compact ? "is-compact" : ""}`}>
      <div className="context-canvas" data-context={active}>
        <div className="context-object" aria-hidden="true"><i /><i /><i /></div>
        <div className="context-ribbon nova-glass">
          <div className="context-identity"><span><SelectedIcon /></span><div><small>{selected.hint}</small><strong>{selected.label}</strong></div></div>
          <div className="context-actions" role="toolbar" aria-label={ar ? "أوامر العنصر" : "Object commands"}>
            <button type="button" aria-label={ar ? "نسخ" : "Copy"} onClick={() => onNotify?.(ar ? "تم نسخ العنصر" : "Object copied")}><PiCopy /></button>
            <button type="button" aria-label={ar ? "حذف" : "Delete"} onClick={() => onNotify?.(ar ? "تم نقل العنصر إلى المحذوفات" : "Moved to trash")}><PiTrash /></button>
            <button type="button" aria-label={ar ? "المزيد" : "More"} aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}><PiDotsThree /></button>
          </div>
          <button className="context-apply" type="button" onClick={() => onNotify?.(ar ? `تم تطبيق إعدادات ${selected.label}` : `${selected.label} settings applied`)}><PiCheck />{ar ? "تطبيق" : "Apply"}</button>
        </div>
        {expanded && <div className="context-disclosure"><PiSlidersHorizontal /><span>{ar ? "المحاذاة · التباعد · المظهر" : "Alignment · spacing · appearance"}</span><kbd>⌘ ↵</kbd></div>}
      </div>
      <div className="context-switch" role="tablist" aria-label={ar ? "سياق التحديد" : "Selection context"}>
        {contexts.map((context, index) => {
          const Icon = context.icon;
          return <button type="button" role="tab" aria-selected={active === index} key={context.label} onClick={() => { setActive(index); setExpanded(false); }}><Icon />{context.label}</button>;
        })}
      </div>
    </div>
  );
}

export function SignalLens({ locale, compact = false }: AdvancedDemoProps) {
  const values = [31, 46, 39, 58, 71, 65, 84];
  const [index, setIndex] = useState(4);
  const rawId = useId();
  const gradientId = `signal-${rawId.replace(/:/g, "")}`;
  const ar = locale === "ar";
  const labels = ar ? ["س", "ح", "ن", "ث", "ر", "خ", "ج"] : ["M", "T", "W", "T", "F", "S", "S"];
  const points = useMemo(() => values.map((value, pointIndex) => ({ x: 16 + pointIndex * 48, y: 142 - value * 1.24 })), []);
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `M ${points[0].x} 146 L ${points.map((point) => `${point.x} ${point.y}`).join(" L ")} L ${points.at(-1)?.x ?? 304} 146 Z`;
  const delta = index === 0 ? 0 : values[index] - values[index - 1];

  return (
    <div className={`signal-lens ${compact ? "is-compact" : ""}`}>
      <div className="signal-summary"><div><small>{ar ? "الإشارة الحالية" : "Current signal"}</small><strong>{values[index]}<span>%</span></strong></div><span className={delta >= 0 ? "is-up" : "is-down"}>{delta >= 0 ? "+" : ""}{delta}%</span></div>
      <div className="signal-chart">
        <svg viewBox="0 0 320 160" role="img" aria-label={ar ? "اتجاه الإشارة خلال سبعة أيام" : "Seven-day signal trend"}>
          <defs><linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--nova-expressive-sky)" stopOpacity=".42" /><stop offset="1" stopColor="var(--nova-expressive-sky)" stopOpacity="0" /></linearGradient></defs>
          <path d={area} fill={`url(#${gradientId})`} />
          <polyline points={line} fill="none" stroke="var(--nova-action)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <line x1={points[index].x} y1="16" x2={points[index].x} y2="146" className="signal-cursor" />
          <circle cx={points[index].x} cy={points[index].y} r="7" className="signal-point" />
        </svg>
        <div className="signal-labels" aria-hidden="true">{labels.map((label, labelIndex) => <span className={labelIndex === index ? "active" : ""} key={`${label}-${labelIndex}`}>{label}</span>)}</div>
      </div>
      <div className="signal-controls">
        <button className="signal-step" type="button" aria-label={ar ? "اليوم السابق" : "Previous day"} disabled={index === 0} onClick={() => setIndex((value) => Math.max(0, value - 1))}>{ar ? <PiCaretRight /> : <PiCaretLeft />}</button>
        <label><span className="sr-only">{ar ? "اختيار اليوم" : "Select day"}</span><input type="range" min="0" max="6" step="1" value={index} onChange={(event) => setIndex(Number(event.target.value))} style={{ "--signal-progress": `${index / 6 * 100}%` } as CSSProperties} /></label>
        <button className="signal-step" type="button" aria-label={ar ? "اليوم التالي" : "Next day"} disabled={index === 6} onClick={() => setIndex((value) => Math.min(6, value + 1))}>{ar ? <PiCaretLeft /> : <PiCaretRight />}</button>
      </div>
    </div>
  );
}

export function FlowConstellation({ locale, compact = false }: AdvancedDemoProps) {
  const [selected, setSelected] = useState(2);
  const ar = locale === "ar";
  const nodes = [
    { label: ar ? "الفكرة" : "Brief", detail: ar ? "نطاق موحّد" : "Aligned scope", icon: PiFlag, state: "done" },
    { label: ar ? "التصميم" : "Design", detail: ar ? "النظام جاهز" : "System ready", icon: PiMagicWand, state: "done" },
    { label: ar ? "البناء" : "Build", detail: ar ? "قيد التنفيذ" : "In progress", icon: PiCode, state: "active" },
    { label: ar ? "الفحص" : "Review", detail: ar ? "بانتظار البناء" : "Waiting for build", icon: PiShieldCheck, state: "pending" },
    { label: ar ? "الإطلاق" : "Launch", detail: ar ? "بعد الاعتماد" : "After approval", icon: PiRocketLaunch, state: "pending" },
  ];
  const current = nodes[selected];

  return (
    <div className={`flow-constellation ${compact ? "is-compact" : ""}`}>
      <div className="constellation-stage">
        <svg viewBox="0 0 520 250" aria-hidden="true"><path d="M58 126H165C205 126 205 55 260 55S315 126 360 126H462M260 55V198H360" /></svg>
        {nodes.map((node, index) => {
          const Icon = node.icon;
          return <button type="button" className={`flow-node node-${index + 1} is-${node.state}`} aria-pressed={selected === index} key={node.label} onClick={() => setSelected(index)}><span><Icon /></span><small>{node.label}</small>{node.state === "done" && <><i aria-hidden="true"><PiCheck /></i><b className="sr-only">{ar ? "مكتمل" : "Complete"}</b></>}</button>;
        })}
      </div>
      <div className="flow-detail" aria-live="polite"><span className={`flow-state is-${current.state}`}>{current.state === "done" ? (ar ? "مكتمل" : "Complete") : current.state === "active" ? (ar ? "الحالي" : "Current") : (ar ? "قادم" : "Next")}</span><div><strong>{current.label}</strong><small>{current.detail}</small></div><b>{selected + 1}/5</b></div>
    </div>
  );
}

export function NotificationStack({ locale, compact = false, onNotify }: AdvancedDemoProps) {
  const ar = locale === "ar";
  const initial = [
    { id: 1, title: ar ? "المراجعة جاهزة" : "Review is ready", body: ar ? "اكتمل فحص شاشة الجوال" : "Mobile screen review completed", time: "2m", icon: PiShieldCheck },
    { id: 2, title: ar ? "تم حفظ الإصدار" : "Version saved", body: ar ? "أضيفت نقطة استرجاع جديدة" : "A new restore point was added", time: "8m", icon: PiCheckCircle },
    { id: 3, title: ar ? "تعليق على البناء" : "Build comment", body: ar ? "ملاحظة جديدة في نظام التنقّل" : "New note on navigation", time: "18m", icon: PiBellRinging },
  ];
  const [items, setItems] = useState(initial);
  const [expanded, setExpanded] = useState(false);
  const dismiss = (id: number) => { setItems((value) => value.filter((item) => item.id !== id)); onNotify?.(ar ? "تمت أرشفة الإشعار" : "Notification archived"); };

  return (
    <div className={`notification-stack ${expanded ? "is-expanded" : ""} ${compact ? "is-compact" : ""}`}>
      <div className="notification-toolbar"><span aria-live="polite">{ar ? `${items.length} تحديثات` : `${items.length} updates`}</span>{items.length > 0 && <button type="button" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>{expanded ? (ar ? "طي" : "Collapse") : (ar ? "فتح الكل" : "Open all")}<PiCaretDown /></button>}</div>
      {items.length ? (
        <div className="notification-deck">
          {items.map((item, index) => { const Icon = item.icon; return (
            <article key={item.id} style={{ "--stack-index": index } as CSSProperties}>
              <span><Icon /></span><div><strong>{item.title}</strong><small>{item.body}</small></div><time>{item.time}</time>
              <button type="button" aria-label={ar ? `أرشفة ${item.title}` : `Archive ${item.title}`} onClick={() => dismiss(item.id)}><PiCheck /></button>
            </article>
          ); })}
        </div>
      ) : (
        <div className="notification-complete"><PiCheckCircle /><strong>{ar ? "كل شيء واضح" : "All caught up"}</strong><button type="button" onClick={() => setItems(initial)}>{ar ? "استعادة المثال" : "Restore demo"}</button></div>
      )}
    </div>
  );
}

export function RangeComposer({ locale, compact = false }: AdvancedDemoProps) {
  const [value, setValue] = useState(42);
  const ar = locale === "ar";
  const price = value * 18;
  const update = (next: number) => setValue(Math.min(100, Math.max(10, next)));
  return (
    <div className={`range-composer ${compact ? "is-compact" : ""}`}>
      <div className="range-orbit" style={{ "--range-value": `${value}%` } as CSSProperties}><div><small>{ar ? "السعة" : "Capacity"}</small><output>{value}</output><span>{ar ? "مقعدًا" : "seats"}</span></div></div>
      <div className="range-editor">
        <div className="range-value"><span>{ar ? "التكلفة المتوقعة" : "Estimated cost"}</span><strong><bdi dir="ltr">${price.toLocaleString("en-US")}</bdi></strong></div>
        <label><span className="sr-only">{ar ? "عدد المقاعد" : "Seat count"}</span><input type="range" min="10" max="100" step="1" value={value} onChange={(event) => update(Number(event.target.value))} style={{ "--range-value": `${(value - 10) / 90 * 100}%` } as CSSProperties} /></label>
        <div className="range-actions"><button type="button" aria-label={ar ? "تقليل مقعد واحد" : "Remove one seat"} onClick={() => update(value - 1)}><PiMinus /></button><div>{[20, 40, 60, 80].map((preset) => <button type="button" aria-pressed={value === preset} key={preset} onClick={() => update(preset)}>{preset}</button>)}</div><button type="button" aria-label={ar ? "إضافة مقعد واحد" : "Add one seat"} onClick={() => update(value + 1)}><PiPlus /></button></div>
      </div>
    </div>
  );
}

export function GuidedEmptyState({ locale, compact = false, onNotify }: AdvancedDemoProps) {
  const [status, setStatus] = useState<"empty" | "working" | "done">("empty");
  const [intent, setIntent] = useState("");
  const timer = useRef<number | null>(null);
  const ar = locale === "ar";
  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);
  const start = (nextIntent: string) => {
    setIntent(nextIntent); setStatus("working");
    timer.current = window.setTimeout(() => { setStatus("done"); onNotify?.(ar ? "أصبحت المساحة جاهزة" : "Workspace is ready"); }, 760);
  };

  return (
    <div className={`guided-empty ${compact ? "is-compact" : ""}`} aria-live="polite">
      <div className={`empty-orbit is-${status}`} aria-hidden="true"><i /><i /><span>{status === "working" ? <PiCircleNotch /> : status === "done" ? <PiCheck /> : <PiFolderOpen />}</span></div>
      {status === "empty" && <><div className="empty-copy"><strong>{ar ? "ابدأ من نقطة مفهومة" : "Start from a clear point"}</strong><p>{ar ? "أنشئ مساحة فارغة، استورد ملفًا، أو استخدم هيكلًا جاهزًا." : "Create a blank space, import a file, or use a proven structure."}</p></div><div className="empty-actions"><button type="button" onClick={() => start(ar ? "مساحة جديدة" : "New space")}><PiPlus />{ar ? "مساحة جديدة" : "New space"}</button><button type="button" onClick={() => start(ar ? "استيراد" : "Import")}><PiUploadSimple />{ar ? "استيراد" : "Import"}</button><button type="button" onClick={() => start(ar ? "قالب" : "Template")}><PiCardsThree />{ar ? "هيكل جاهز" : "Template"}</button></div></>}
      {status === "working" && <div className="empty-copy"><strong>{ar ? `جارٍ إعداد ${intent}` : `Preparing ${intent}`}</strong><p>{ar ? "نبني الهيكل ونحفظ نقطة استرجاع." : "Building the structure and saving a restore point."}</p></div>}
      {status === "done" && <><div className="empty-copy"><strong>{ar ? "المساحة جاهزة" : "Workspace ready"}</strong><p>{ar ? `تم إنشاء ${intent} ويمكنك البدء بأمان.` : `${intent} was created and is safe to edit.`}</p></div><button className="empty-reset" type="button" onClick={() => setStatus("empty")}>{ar ? "إعادة المثال" : "Reset demo"}</button></>}
    </div>
  );
}

export function FoldDeck({ locale, compact = false }: AdvancedDemoProps) {
  const [open, setOpen] = useState(0);
  const ar = locale === "ar";
  const cards = [
    { title: ar ? "الهيكل" : "Structure", subtitle: ar ? "المسافة والشكل" : "Spacing and shape", icon: PiRectangle, points: ar ? ["شبكة 12 عمودًا", "فاصل فصل 112px", "حواف منطقية"] : ["12-column grid", "112px chapter gap", "Logical edges"] },
    { title: ar ? "السلوك" : "Behavior", subtitle: ar ? "الحالة والحركة" : "State and motion", icon: PiCursorClick, points: ar ? ["ضغط خلال 90ms", "إفصاح مرتبط", "استرجاع فوري"] : ["90ms press", "Anchored disclosure", "Immediate recovery"] },
    { title: ar ? "الوصول" : "Access", subtitle: ar ? "لوحة المفاتيح والوضوح" : "Keyboard and clarity", icon: PiEye, points: ar ? ["تباين AA", "هدف لمس 44px", "حركة مخفّضة"] : ["AA contrast", "44px touch target", "Reduced motion"] },
  ];
  return (
    <div className={`fold-deck ${compact ? "is-compact" : ""}`}>
      {cards.map((card, index) => { const Icon = card.icon; const active = open === index; return (
        <article key={card.title} data-open={active}>
          <button type="button" aria-expanded={active} onClick={() => setOpen(index)}><span><Icon /></span><div><small>{String(index + 1).padStart(2, "0")}</small><strong>{card.title}</strong><em>{card.subtitle}</em></div><PiCaretDown /></button>
          <div className="fold-content" aria-hidden={!active}><div><ul>{card.points.map((point) => <li key={point}><PiCheck />{point}</li>)}</ul><code>{index === 0 ? "layout.*" : index === 1 ? "motion.*" : "a11y.*"}</code></div></div>
        </article>
      ); })}
    </div>
  );
}

export function AdaptiveInspector({ locale, compact = false }: AdvancedDemoProps) {
  const [mode, setMode] = useState<"quick" | "advanced">("quick");
  const [corner, setCorner] = useState(24);
  const [depth, setDepth] = useState(18);
  const [grid, setGrid] = useState(true);
  const ar = locale === "ar";
  return (
    <div className={`adaptive-inspector ${compact ? "is-compact" : ""}`}>
      <div className="inspector-preview" style={{ "--preview-corner": `${corner}px`, "--preview-depth": `${depth}px` } as CSSProperties}>
        {grid && <i aria-hidden="true" />}
        <div className="preview-object"><span><PiPaintBrush /></span><strong>NOVA</strong><small>{ar ? "سطح متكيّف" : "Adaptive surface"}</small></div>
      </div>
      <div className="inspector-sheet">
        <div className="inspector-tabs" role="tablist" aria-label={ar ? "مستوى الإعدادات" : "Settings level"}>{(["quick", "advanced"] as const).map((entry) => <button type="button" role="tab" aria-selected={mode === entry} key={entry} onClick={() => setMode(entry)}>{entry === "quick" ? (ar ? "سريع" : "Quick") : (ar ? "متقدم" : "Advanced")}</button>)}</div>
        <div role="tabpanel" className="inspector-fields">
          <label className="inspector-toggle"><span><PiSidebarSimple /><b>{ar ? "إظهار الشبكة" : "Show grid"}</b></span><input type="checkbox" checked={grid} onChange={(event) => setGrid(event.target.checked)} /></label>
          <label><span><b>{ar ? "استدارة الحواف" : "Corner radius"}</b><output>{corner}px</output></span><input type="range" min="8" max="40" value={corner} style={{ "--range-value": `${(corner - 8) / 32 * 100}%` } as CSSProperties} onChange={(event) => setCorner(Number(event.target.value))} /></label>
          {mode === "advanced" && <label><span><b>{ar ? "عمق الظل" : "Shadow depth"}</b><output>{depth}px</output></span><input type="range" min="0" max="36" value={depth} style={{ "--range-value": `${depth / 36 * 100}%` } as CSSProperties} onChange={(event) => setDepth(Number(event.target.value))} /></label>}
        </div>
      </div>
    </div>
  );
}
