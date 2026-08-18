import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  PiArrowRight,
  PiBell,
  PiCaretDown,
  PiChartLine,
  PiCheck,
  PiCheckCircle,
  PiCircleNotch,
  PiFloppyDisk,
  PiGear,
  PiHouse,
  PiLightning,
  PiLightningThin,
  PiNavigationArrow,
  PiPalette,
  PiPenNib,
  PiPenNibThin,
  PiPlay,
  PiSquaresFour,
  PiStack,
  PiStackThin,
  PiUser,
  PiShapes,
  PiCompass,
  PiCompassThin,
} from "react-icons/pi";
import type { Locale } from "../i18n";

interface PatternStudioProps {
  locale: Locale;
  onNotify: (message: string) => void;
}

interface WorkbenchProps {
  locale: Locale;
  compact?: boolean;
}

const studioCopy = {
  ar: {
    title: "من التوكن إلى التفاعل، بلا تخمين.",
    lead: "مساحة عمل حيّة تجمع هندسة المسافات، هرمية الإجراءات، التنقّل، مادة الأيقونة، ومسارات الحركة ضمن قواعد قابلة لإعادة الاستخدام.",
    ruler: "إيقاع المسافة",
    rulerNote: "8px أساس · 24px تجميع · 64px فصل · 112px انتقال بين الفصول",
    actions: "منظومة الإجراءات",
    actionsBody: "اختلاف بصري محسوب بين الإجراء الأساسي والثانوي والهادئ والخطر، مع حالات تحميل ونجاح حقيقية.",
    icons: "مادة الأيقونة",
    iconsBody: "الحاوية جزء من المعنى: زجاج للطبقات العائمة، tonal للحالة، وحد مرسوم للمساحات التحريرية.",
    navigation: "هندسة التنقّل",
    navigationBody: "المحتوى واحد، لكن الغلاف يتكيّف بين dock وتبويبات وrail دون أن تتبدّل الخريطة الذهنية.",
    motion: "مسار الحركة",
    motionBody: "ضغط 90ms، إفصاح 260ms، وانتقال مسار 420ms—مع أصل حركة مرتبط بمكان القرار.",
  },
  en: {
    title: "From token to interaction, without guesswork.",
    lead: "A live workbench joining spacing architecture, action hierarchy, navigation, icon material, and motion paths into reusable rules.",
    ruler: "Spacing rhythm",
    rulerNote: "8px base · 24px grouping · 64px separation · 112px chapter transition",
    actions: "Action system",
    actionsBody: "Measured contrast between primary, secondary, quiet, and destructive actions—with real loading and success states.",
    icons: "Icon material",
    iconsBody: "The container carries meaning: glass for floating layers, tonal for state, and drawn outlines for editorial spaces.",
    navigation: "Navigation architecture",
    navigationBody: "The map stays stable while its shell adapts between dock, tabs, and rail.",
    motion: "Motion path",
    motionBody: "90ms press, 260ms disclosure, and 420ms route movement—each anchored to the point of intent.",
  },
} as const;

export default function PatternStudio({ locale, onNotify }: PatternStudioProps) {
  const copy = studioCopy[locale];

  return (
    <section className="pattern-studio" id="workbench" aria-labelledby="workbench-title">
      <div className="section-intro studio-intro">
        <div>
          <h2 id="workbench-title">{copy.title}</h2>
        </div>
        <p>{copy.lead}</p>
      </div>

      <div className="spacing-ruler" aria-label={`${copy.ruler}: ${copy.rulerNote}`}>
        <div><strong>{copy.ruler}</strong><span>{copy.rulerNote}</span></div>
        <ol aria-hidden="true">
          {[8, 16, 24, 32, 48, 64, 112].map((value) => (
            <li key={value} style={{ "--measure": `${value}px` } as CSSProperties}><i />{value}</li>
          ))}
        </ol>
      </div>

      <div className="studio-grid">
        <article className="studio-panel studio-actions">
          <StudioPanelHeader icon={<PiFloppyDisk />} title={copy.actions} body={copy.actionsBody} meta="Action hierarchy · 5 states" />
          <ButtonWorkbench locale={locale} onNotify={onNotify} />
        </article>

        <article className="studio-panel studio-icons">
          <StudioPanelHeader icon={<PiShapes />} title={copy.icons} body={copy.iconsBody} meta="Phosphor · 4 optical sizes" />
          <IconWorkbench locale={locale} />
        </article>

        <article className="studio-panel studio-navigation">
          <StudioPanelHeader icon={<PiNavigationArrow />} title={copy.navigation} body={copy.navigationBody} meta="Dock · Tabs · Rail" />
          <NavigationWorkbench locale={locale} />
        </article>

        <article className="studio-panel studio-motion">
          <StudioPanelHeader icon={<PiLightning />} title={copy.motion} body={copy.motionBody} meta="90 · 260 · 420 ms" />
          <MotionWorkbench locale={locale} />
        </article>
      </div>
    </section>
  );
}

function StudioPanelHeader({ icon, title, body, meta }: { icon: ReactNode; title: string; body: string; meta: string }) {
  return (
    <header className="studio-panel-header">
      <span aria-hidden="true">{icon}</span>
      <div><h3>{title}</h3><p>{body}</p></div>
      <small dir="ltr">{meta}</small>
    </header>
  );
}

export function ButtonWorkbench({ locale, compact = false, onNotify }: WorkbenchProps & { onNotify?: (message: string) => void }) {
  const [status, setStatus] = useState<"idle" | "working" | "done">("idle");
  const [menuOpen, setMenuOpen] = useState(false);
  const timer = useRef<number | null>(null);
  const ar = locale === "ar";

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const run = () => {
    if (status === "working") return;
    setStatus("working");
    timer.current = window.setTimeout(() => {
      setStatus("done");
      onNotify?.(ar ? "تم حفظ التغييرات" : "Changes saved");
    }, 920);
  };

  return (
    <div className={`button-workbench ${compact ? "is-compact" : ""}`}>
      <div className="workbench-bar"><span>{ar ? "القرار الأساسي" : "Primary decision"}</span><code>52 / 44 / 36</code></div>
      <div className="button-main-row">
        <button className="nova-control is-primary is-lg" type="button" onClick={run} disabled={status === "working"} aria-live="polite">
          {status === "working" ? <PiCircleNotch className="nova-spinner" /> : status === "done" ? <PiCheckCircle /> : <PiFloppyDisk />}
          {status === "working" ? (ar ? "جارٍ الحفظ" : "Saving") : status === "done" ? (ar ? "تم الحفظ" : "Saved") : (ar ? "حفظ التغييرات" : "Save changes")}
        </button>

        <div className="split-action">
          <button className="nova-control is-secondary is-lg" type="button" onClick={() => onNotify?.(ar ? "تمت المعاينة" : "Preview opened")}>
            <PiPlay />{ar ? "معاينة" : "Preview"}
          </button>
          <button className="nova-control is-secondary is-lg is-icon-only" type="button" aria-label={ar ? "خيارات المعاينة" : "Preview options"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><PiCaretDown /></button>
          {menuOpen && (
            <div className="split-popover" role="menu">
              {[ar ? "معاينة الجوال" : "Mobile preview", ar ? "نسخ رابط الفحص" : "Copy review link"].map((label) => (
                <button type="button" role="menuitem" key={label} onClick={() => { setMenuOpen(false); onNotify?.(label); }}>{label}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="button-spectrum" aria-label={ar ? "مستويات الإجراءات" : "Action levels"}>
        <button className="nova-control is-secondary" type="button"><PiPalette />{ar ? "ثانوي" : "Secondary"}</button>
        <button className="nova-control is-quiet" type="button"><PiGear />{ar ? "هادئ" : "Quiet"}</button>
        <button className="nova-control is-danger" type="button">{ar ? "حذف" : "Delete"}</button>
        <button className="nova-control is-secondary" type="button" disabled>{ar ? "غير متاح" : "Unavailable"}</button>
      </div>

      <dl className="control-anatomy">
        <div><dt>{ar ? "اللمس" : "Hit"}</dt><dd>44px+</dd></div>
        <div><dt>{ar ? "الضغط" : "Press"}</dt><dd>90ms</dd></div>
        <div><dt>{ar ? "الفاصل" : "Gap"}</dt><dd>8px</dd></div>
        <div><dt>{ar ? "الحالة" : "State"}</dt><dd>{status}</dd></div>
      </dl>
    </div>
  );
}

export function NavigationWorkbench({ locale, compact = false }: WorkbenchProps) {
  const [mode, setMode] = useState<"dock" | "tabs" | "rail">("dock");
  const [active, setActive] = useState(0);
  const ar = locale === "ar";
  const items = [
    [PiHouse, ar ? "الرئيسية" : "Home"],
    [PiChartLine, ar ? "التحليلات" : "Analytics"],
    [PiSquaresFour, ar ? "المشاريع" : "Projects"],
    [PiUser, ar ? "الحساب" : "Account"],
  ] as const;
  const transform = mode === "rail"
    ? `translateY(${active * 100}%)`
    : `translateX(${(ar ? -1 : 1) * active * 100}%)`;

  return (
    <div className={`navigation-workbench ${compact ? "is-compact" : ""}`}>
      <div className="nav-mode-switch" role="toolbar" aria-label={ar ? "نوع التنقّل" : "Navigation shell"}>
        {(["dock", "tabs", "rail"] as const).map((entry) => (
          <button className="nova-control is-sm" type="button" key={entry} aria-pressed={mode === entry} onClick={() => setMode(entry)}>{entry}</button>
        ))}
      </div>

      <div className={`navigation-stage is-${mode}`}>
        <div className="nav-content-preview">
          <span className="nova-icon-tile is-tonal"><PiNavigationArrow /></span>
          <div><small>{ar ? "المساحة الحالية" : "Current space"}</small><strong>{items[active][1]}</strong></div>
          <i aria-hidden="true" />
        </div>
        <nav className="adaptive-nav" aria-label={ar ? "معاينة التنقّل" : "Navigation preview"}>
          <span className="adaptive-nav-lens" style={{ transform }} aria-hidden="true" />
          {items.map(([Icon, label], index) => (
            <button type="button" key={label} className={active === index ? "active" : ""} aria-current={active === index ? "page" : undefined} onClick={() => setActive(index)}>
              <Icon /><span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
      <p className="nav-rule"><PiCheck />{ar ? "اسم الوجهة يظهر دائمًا في التبويبات، وللنشطة فقط في الـdock." : "Labels stay visible in tabs and reveal contextually in the dock."}</p>
    </div>
  );
}

export function IconWorkbench({ locale, compact = false }: WorkbenchProps) {
  const [material, setMaterial] = useState<"glass" | "tonal" | "drawn">("glass");
  const [size, setSize] = useState<"md" | "lg" | "xl">("lg");
  const [selected, setSelected] = useState(0);
  const ar = locale === "ar";
  const icons = [
    { label: ar ? "إلهام" : "Ideas", regular: PiCompass, thin: PiCompassThin },
    { label: ar ? "رسم" : "Draw", regular: PiPenNib, thin: PiPenNibThin },
    { label: ar ? "طبقات" : "Layers", regular: PiStack, thin: PiStackThin },
    { label: ar ? "طاقة" : "Energy", regular: PiLightning, thin: PiLightningThin },
  ] as const;

  return (
    <div className={`icon-workbench ${compact ? "is-compact" : ""}`}>
      <div className="icon-controls">
        <div role="toolbar" aria-label={ar ? "مادة الأيقونة" : "Icon material"}>
          {(["glass", "tonal", "drawn"] as const).map((entry) => (
            <button className="nova-control is-sm" type="button" key={entry} aria-pressed={material === entry} onClick={() => setMaterial(entry)}>{entry}</button>
          ))}
        </div>
        <div role="toolbar" aria-label={ar ? "حجم الأيقونة" : "Icon size"}>
          {(["md", "lg", "xl"] as const).map((entry) => (
            <button type="button" key={entry} aria-pressed={size === entry} onClick={() => setSize(entry)}>{entry}</button>
          ))}
        </div>
      </div>

      <div className="icon-material-scene">
        <i className="icon-field field-one" aria-hidden="true" />
        <i className="icon-field field-two" aria-hidden="true" />
        <div className="icon-tile-row">
          {icons.map((entry, index) => {
            const Icon = material === "drawn" ? entry.thin : entry.regular;
            return (
              <button
                type="button"
                key={entry.label}
                className={`nova-icon-tile is-${material} is-${size} ${selected === index ? "is-selected" : ""}`}
                aria-label={entry.label}
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
              ><Icon /></button>
            );
          })}
        </div>
      </div>

      <div className="icon-spec">
        <span className={`nova-icon-tile is-${material} is-lg`}>{(() => { const ActiveIcon = material === "drawn" ? icons[selected].thin : icons[selected].regular; return <ActiveIcon />; })()}</span>
        <div><strong>{icons[selected].label}</strong><small>{material} · {size} · {material === "drawn" ? "1.25px" : "1.75px"}</small></div>
        <code>{size === "md" ? "40/20" : size === "lg" ? "48/24" : "64/32"}</code>
      </div>
    </div>
  );
}

export function MotionWorkbench({ locale, compact = false }: WorkbenchProps) {
  const [mode, setMode] = useState<"press" | "reveal" | "route">("reveal");
  const [open, setOpen] = useState(true);
  const [cycle, setCycle] = useState(0);
  const ar = locale === "ar";

  const play = () => {
    if (mode === "reveal") setOpen((value) => !value);
    else setCycle((value) => value + 1);
  };

  return (
    <div className={`motion-workbench ${compact ? "is-compact" : ""}`}>
      <div className="motion-mode-switch" role="toolbar" aria-label={ar ? "نوع الحركة" : "Motion type"}>
        {(["press", "reveal", "route"] as const).map((entry) => (
          <button type="button" key={entry} aria-pressed={mode === entry} onClick={() => { setMode(entry); setOpen(true); }}>{entry}</button>
        ))}
      </div>

      <button className={`motion-canvas is-${mode} ${open ? "is-open" : ""}`} type="button" onClick={play} aria-label={ar ? "تشغيل معاينة الحركة" : "Play motion preview"}>
        {mode === "press" && <span className="motion-press-object" key={cycle}><PiLightning /></span>}
        {mode === "reveal" && (
          <span className="motion-reveal-object">
            <i><PiBell /></i>
            <b>{ar ? "3 تحديثات جاهزة" : "3 updates ready"}</b>
            <small>{ar ? "من نقطة القرار نفسها" : "From the point of intent"}</small>
          </span>
        )}
        {mode === "route" && (
          <span className="motion-route-object" key={cycle}>
            <i>{cycle % 2 === 0 ? "01" : "02"}</i>
            <b>{cycle % 2 === 0 ? (ar ? "النظام" : "System") : (ar ? "المكوّن" : "Component")}</b>
            <PiArrowRight />
          </span>
        )}
      </button>

      <div className="motion-metrics">
        <span><i />{mode === "press" ? "90ms" : mode === "reveal" ? "260ms" : "420ms"}</span>
        <span>{mode === "press" ? "scale .985" : mode === "reveal" ? "origin: anchor" : "path: shared-axis"}</span>
      </div>
    </div>
  );
}
