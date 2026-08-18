import { useEffect, useRef, useState } from 'react';

/* ────────────────────────────────────────────────────────────────────────
   Consequence — controls that show their own outcome.

   The thesis: the result of an action belongs on the control that caused
   it, not in a toast somewhere else on the page. A delete that shreds, an
   export that prints, a switch that gives under the thumb, a border that
   fills while work runs. The user never has to look away to learn what
   happened.

   Adapted from the Uiverse blocks listed in
   design-system/madar/SOURCES-UIVERSE.md. Only the ideas were taken; every
   color here is a Madar token that resolves to a NOVA token, so all six
   follow the active theme pack. Motion drives transform, opacity, filter,
   and clip-path only, and keyframes live in src/madar/bridge.css.
──────────────────────────────────────────────────────────────────────── */

/* ── Shred Confirm — destruction you can watch, with a window to take it back.
   A confirm dialog says "are you sure". This shows the document being
   destroyed and keeps it recoverable until the shredder finishes. */
export function ShredConfirm({
  label = 'حذف المستند',
  documentName = 'عقد-2026.pdf',
  onDone,
}: {
  label?: string;
  documentName?: string;
  onDone?: () => void;
}) {
  const [state, setState] = useState<'idle' | 'shredding' | 'gone'>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const start = () => {
    setState('shredding');
    timer.current = window.setTimeout(() => {
      setState('gone');
      onDone?.();
    }, 1400);
  };

  const undo = () => {
    window.clearTimeout(timer.current);
    setState('idle');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', alignItems: 'center', minWidth: 200 }}>
      <div
        aria-hidden={state === 'gone'}
        style={{
          position: 'relative', width: 132, height: 92, overflow: 'hidden',
          display: 'grid', placeItems: 'center',
        }}
      >
        <div
          style={{
            width: 96, height: 84, borderRadius: 'var(--r-xs)', background: 'var(--surface)',
            border: '1px solid var(--border)',            display: 'flex', flexDirection: 'column', gap: 6, padding: 'var(--sp-3)',
            transformOrigin: 'top center',
            animation: state === 'shredding' ? 'consequence-shred 1.4s var(--ease-out) forwards' : undefined,
            opacity: state === 'gone' ? 0 : 1,
          }}
        >
          {[100, 74, 88, 52].map((w, i) => (
            <span key={i} style={{ height: 5, width: `${w}%`, borderRadius: 2, background: 'var(--surface-2)' }} />
          ))}
        </div>
        {/* the blade line the document passes through */}
        <span
          style={{
            position: 'absolute', insetInlineStart: 0, insetInlineEnd: 0, bottom: 4, height: 3,
            borderRadius: 2, background: 'var(--border-strong)',
          }}
        />
      </div>

      <p style={{ margin: 0, fontSize: 12.5, color: 'var(--text-3)' }}>
        <bdi>{documentName}</bdi>
      </p>

      {state === 'shredding' ? (
        <button
          type="button"
          onClick={undo}
          className="i-lift i-press-97 i-focus-ring"
          style={{
            height: 44, padding: '0 22px', borderRadius: 'var(--r-full)', border: '1px solid var(--border-strong)',
            background: 'var(--surface)', color: 'var(--text)', fontFamily: 'inherit', fontSize: 14.5,
            fontWeight: 600, cursor: 'pointer',
          }}
        >
          تراجع
        </button>
      ) : (
        <button
          type="button"
          onClick={state === 'gone' ? () => setState('idle') : start}
          className="i-press-97 i-focus-ring"
          style={{
            height: 44, padding: '0 22px', borderRadius: 'var(--r-full)', border: 'none',
            background: state === 'gone' ? 'var(--surface-2)' : 'var(--danger)',
            color: state === 'gone' ? 'var(--text)' : 'var(--on-accent)',
            fontFamily: 'inherit', fontSize: 14.5, fontWeight: 600, cursor: 'pointer',
          }}
        >
          {state === 'gone' ? 'استعادة نسخة جديدة' : label}
        </button>
      )}

      <span role="status" aria-live="polite" style={{ fontSize: 12.5, color: 'var(--text-3)', minHeight: 18 }}>
        {state === 'shredding' ? 'يجري الإتلاف، لديك ثانية للتراجع' : state === 'gone' ? 'أُتلف المستند' : ''}
      </span>
    </div>
  );
}

/* ── Receipt Printer — an export that hands you the artifact.
   "Download started" tells you nothing. This feeds the paper out of the
   machine so the result of the action is the thing you asked for. */
export function ReceiptPrinter({
  title = 'إيصال الطلب',
  lines = [
    { label: 'اشتراك سنوي', value: '٤٨٠' },
    { label: 'ضريبة', value: '٧٢' },
  ],
  total = '٥٥٢',
}: {
  title?: string;
  lines?: { label: string; value: string }[];
  total?: string;
}) {
  const [printed, setPrinted] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--sp-3)', minWidth: 220 }}>
      <div style={{ position: 'relative', width: 200 }}>
        {/* the machine */}
        <div
          style={{
            position: 'relative', zIndex: 2, height: 54, borderRadius: 'var(--r-sm)',
            background: 'var(--surface-2)', border: '1px solid var(--border-strong)',
 display: 'grid', placeItems: 'center',
          }}
        >
          <span style={{ width: '62%', height: 4, borderRadius: 2, background: 'var(--border-strong)' }} />
        </div>

        {/* the paper, clipped so it appears to feed out of the slot */}
        <div
          style={{
            position: 'relative', zIndex: 1, marginTop: -2,
            clipPath: printed ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
            transition: 'clip-path var(--dur-4) var(--ease-out)',
          }}
        >
          <div
            style={{
              padding: 'var(--sp-4)', background: 'var(--surface)', border: '1px solid var(--border)',
              borderTop: 'none', display: 'grid', gap: 'var(--sp-2)',
              fontSize: 12.5, color: 'var(--text-2)',
            }}
          >
            <strong style={{ color: 'var(--text)', fontSize: 13.5 }}>{title}</strong>
            {lines.map((line) => (
              <span key={line.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--sp-3)' }}>
                <span>{line.label}</span>
                <bdi style={{ fontVariantNumeric: 'tabular-nums' }}>{line.value}</bdi>
              </span>
            ))}
            <span
              style={{
                display: 'flex', justifyContent: 'space-between', gap: 'var(--sp-3)',
                paddingTop: 'var(--sp-2)', borderTop: '1px dashed var(--border-strong)',
                color: 'var(--text)', fontWeight: 600,
              }}
            >
              <span>الإجمالي</span>
              <bdi style={{ fontVariantNumeric: 'tabular-nums' }}>{total}</bdi>
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPrinted((v) => !v)}
        aria-expanded={printed}
        className="i-lift-shadow i-press-97 i-focus-ring"
        style={{
          height: 44, padding: '0 22px', borderRadius: 'var(--r-full)', border: 'none',
          background: 'var(--ink)', color: 'var(--on-ink)', fontFamily: 'inherit',
          fontSize: 14.5, fontWeight: 600, cursor: 'pointer',
        }}
      >
        {printed ? 'سحب الإيصال' : 'اطبع الإيصال'}
      </button>
    </div>
  );
}

/* ── Dot Matrix Readout — a status display built from lit cells.
   For an operational surface where a spinner says too little: the readout
   scans, so you can see the system is alive and which stage it is on. */
/* ── Elastic Switch — the thumb stretches under the press, then snaps.
   The give tells you the control registered the touch before the state
   has changed, which a hard-swapping toggle never communicates. */
export function ElasticSwitch({
  label = 'المزامنة التلقائية',
  defaultOn = false,
}: {
  label?: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  const [held, setHeld] = useState(false);

  const track = 62;
  const thumb = 24;
  const inset = 3;

  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-3)', cursor: 'pointer' }}>
      <input
        type="checkbox"
        checked={on}
        onChange={(event) => setOn(event.target.checked)}
        onPointerDown={() => setHeld(true)}
        onPointerUp={() => setHeld(false)}
        onPointerLeave={() => setHeld(false)}
        onBlur={() => setHeld(false)}
        style={{ position: 'absolute', width: 1, height: 1, opacity: 0, margin: -1 }}
      />
      <span
        aria-hidden="true"
        style={{
          position: 'relative', width: track, height: thumb + inset * 2, flex: 'none',
          borderRadius: 'var(--r-full)', background: on ? 'var(--accent)' : 'var(--surface-2)',
          border: '1px solid var(--border-strong)',
          transition: 'background-color var(--dur-2) var(--ease-out)',
        }}
      >
        <span
          style={{
            position: 'absolute', top: inset, insetInlineStart: inset,
            width: held ? track - inset * 2 - 2 : thumb, height: thumb,
            borderRadius: 'var(--r-full)', background: 'var(--surface)',            transform: on && !held ? `translateX(calc(var(--dir-sign) * ${track - thumb - inset * 2 - 2}px))` : 'none',
            marginInlineStart: on && held ? 'auto' : undefined,
            insetInlineEnd: on && held ? inset : undefined,
            transition: 'width var(--dur-2) var(--ease-spring), transform var(--dur-2) var(--ease-spring)',
          }}
        />
      </span>
      <span style={{ fontSize: 14, color: 'var(--text)' }}>{label}</span>
    </label>
  );
}

/* ── Perimeter Progress — the work runs around the control that started it.
   A separate progress bar splits attention. Here the button's own border
   fills, so the thing you pressed is the thing reporting. */
export function PerimeterProgress({
  label = 'تحليل الحساب',
  duration = 2600,
}: {
  label?: string;
  duration?: number;
}) {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => () => cancelAnimationFrame(frame.current!), []);

  const run = () => {
    if (running) return;
    setRunning(true);
    setProgress(0);
    const started = performance.now();
    const tick = (now: number) => {
      const value = Math.min(1, (now - started) / duration);
      setProgress(value);
      if (value < 1) frame.current = requestAnimationFrame(tick);
      else setRunning(false);
    };
    frame.current = requestAnimationFrame(tick);
  };

  const done = progress === 1;

  return (
    <button
      type="button"
      onClick={run}
      aria-busy={running}
      className="i-press-97 i-focus-ring"
      style={{
        position: 'relative', height: 52, padding: '0 26px', borderRadius: 'var(--r-full)',
        border: 'none', background: 'var(--surface)', color: 'var(--text)', fontFamily: 'inherit',
        fontSize: 14.5, fontWeight: 600, cursor: running ? 'progress' : 'pointer',
 isolation: 'isolate',
      }}
    >
      {/* the filling rim: a conic sweep masked to a 2px ring */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, borderRadius: 'inherit', padding: 2,
          background: `conic-gradient(var(--accent) ${progress * 360}deg, var(--border) 0deg)`,
          /* a mask reads alpha only, so currentColor is an opaque stencil and
             keeps the rule free of a literal color */
          WebkitMask: 'linear-gradient(currentColor 0 0) content-box, linear-gradient(currentColor 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(currentColor 0 0) content-box, linear-gradient(currentColor 0 0)',
          maskComposite: 'exclude',
          opacity: progress === 0 ? 0.6 : 1,
        }}
      />
      <span style={{ position: 'relative' }}>
        {done ? 'اكتمل التحليل' : running ? `${Math.round(progress * 100)}٪` : label}
      </span>
    </button>
  );
}

/* ── Marquee Frame — the selection draws itself onto the content.
   Corner anchors land first, then the edges connect them, so a selected
   region reads as deliberately captured rather than merely outlined. */
export function MarqueeFrame({
  caption = 'مرّر لتحديد المنطقة',
  children,
}: {
  caption?: string;
  children?: React.ReactNode;
}) {
  const [active, setActive] = useState(false);

  const corner = (block: 'start' | 'end', inline: 'start' | 'end', delay: number) => ({
    position: 'absolute' as const,
    [block === 'start' ? 'insetBlockStart' : 'insetBlockEnd']: -3,
    [inline === 'start' ? 'insetInlineStart' : 'insetInlineEnd']: -3,
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: 'var(--accent)',
    transform: active ? 'scale(1)' : 'scale(0)',
    opacity: active ? 1 : 0,
    transition: `transform var(--dur-2) var(--ease-spring) ${delay}ms, opacity var(--dur-1) linear ${delay}ms`,
  });

  const edge = (axis: 'x' | 'y', side: 'start' | 'end', delay: number) => ({
    position: 'absolute' as const,
    ...(axis === 'x'
      ? {
          insetInlineStart: 0,
          insetInlineEnd: 0,
          height: 1,
          [side === 'start' ? 'insetBlockStart' : 'insetBlockEnd']: 0,
          transform: active ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'var(--underline-origin)',
        }
      : {
          insetBlockStart: 0,
          insetBlockEnd: 0,
          width: 1,
          [side === 'start' ? 'insetInlineStart' : 'insetInlineEnd']: 0,
          transform: active ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top',
        }),
    background: 'var(--accent)',
    transition: `transform var(--dur-2) var(--ease-out) ${delay}ms`,
  });

  return (
    <div style={{ display: 'grid', gap: 'var(--sp-3)', justifyItems: 'center' }}>
      <div
        onPointerEnter={() => setActive(true)}
        onPointerLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        tabIndex={0}
        role="group"
        aria-label={caption}
        className="i-focus-ring"
        style={{
          position: 'relative', padding: 'var(--sp-6)', minWidth: 180, borderRadius: 'var(--r-xs)',
          background: active ? 'var(--accent-soft)' : 'var(--surface-2)',
          transition: 'background-color var(--dur-2) var(--ease-out)',
          display: 'grid', placeItems: 'center', cursor: 'crosshair',
        }}
      >
        <span aria-hidden="true" style={edge('x', 'start', 320)} />
        <span aria-hidden="true" style={edge('x', 'end', 440)} />
        <span aria-hidden="true" style={edge('y', 'start', 500)} />
        <span aria-hidden="true" style={edge('y', 'end', 380)} />
        <span aria-hidden="true" style={corner('start', 'start', 0)} />
        <span aria-hidden="true" style={corner('start', 'end', 90)} />
        <span aria-hidden="true" style={corner('end', 'end', 180)} />
        <span aria-hidden="true" style={corner('end', 'start', 270)} />
        {children ?? <span style={{ fontSize: 13, color: 'var(--text-2)' }}>منطقة قابلة للتحديد</span>}
      </div>
      <p style={{ margin: 0, fontSize: 12.5, color: 'var(--text-3)' }}>{caption}</p>
    </div>
  );
}
