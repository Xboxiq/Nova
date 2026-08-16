import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/* ────────────────────────────────────────────────────────────────────────
   Upload — a destination you can see, and a transfer you can steer.

   Adapted from the Glass Upload Card in
   design-system/madar/SOURCES-UPLOAD.md. The idea taken is that an upload
   has a *destination* with an identity, and that the destination should
   react to what lands in it. The original's colors, its six-stop gradient
   card, its CDN font and icon host, and its fake counter to 100 were not
   taken; see the source note for what was rejected and why.

   What is added here is the part an upload UI actually needs: per-file
   state, a transfer that can be cancelled and retried, and a folder whose
   lid is driven by that state rather than by a loop. Every color is a Madar
   token resolving to a NOVA token, so this follows the active theme pack.
──────────────────────────────────────────────────────────────────────── */

export type UploadPhase = 'queued' | 'uploading' | 'done' | 'failed';

export interface UploadItem {
  id: number;
  name: string;
  size: number;
  progress: number;
  phase: UploadPhase;
}

/** Drives one file. Report progress 0..1, resolve on success, reject to fail.
 *  Honour `signal` so cancel stops the transfer instead of only hiding it. */
export type Uploader = (
  file: File,
  onProgress: (fraction: number) => void,
  signal: AbortSignal,
) => Promise<void>;

/* A stand-in transfer for documentation and tests: paced by file size so a
   large file visibly takes longer, and abortable like a real one. */
export const simulatedUpload: Uploader = (file, onProgress, signal) =>
  new Promise((resolve, reject) => {
    const steps = Math.min(60, Math.max(14, Math.round(file.size / 24000) || 20));
    let done = 0;
    const tick = window.setInterval(() => {
      done += 1;
      onProgress(done / steps);
      if (done >= steps) {
        window.clearInterval(tick);
        resolve();
      }
    }, 55);
    signal.addEventListener('abort', () => {
      window.clearInterval(tick);
      reject(new DOMException('aborted', 'AbortError'));
    });
  });

const formatSize = (bytes: number) =>
  bytes < 1024
    ? `${bytes} B`
    : bytes < 1048576
      ? `${(bytes / 1024).toFixed(1)} KB`
      : `${(bytes / 1048576).toFixed(1)} MB`;

/* ── Folder — the destination, drawn as an object with a lid.

   Two panels and a tab, from the source's geometry. The lid's angle is the
   component's state made visible: shut when empty, wide open while files
   are landing, resting ajar once they are in. */
function Folder({ open, count, label }: { open: number; count: number; label: string }) {
  return (
    <div
      aria-hidden="true"
      className="madar-folder"
      style={{
        position: 'relative', width: 118, height: 96, flex: 'none',
        perspective: 520,
      }}
    >
      {/* back panel, with the tab */}
      <svg
        viewBox="0 0 50 40"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          color: 'var(--accent-soft)',
        }}
      >
        <path
          d="M0 4C0 1.79086 1.79086 0 4 0H16.524C17.721 0 18.8415 0.54051 19.574 1.4673L22.426 5.0654C23.1585 5.99219 24.279 6.5327 25.476 6.5327H46C48.2091 6.5327 50 8.32356 50 10.5327V36C50 38.2091 48.2091 40 46 40H4C1.79086 40 0 38.2091 0 36V4Z"
          fill="currentColor"
          stroke="var(--accent)"
          strokeWidth="0.75"
        />
      </svg>

      {/* what is inside — it clears the lid's edge only once the lid lifts */}
      <div
        className="madar-folder-slot"
        style={{
          display: 'grid', placeItems: 'center',
          borderRadius: 'var(--r-xs)', background: 'var(--surface)',
          border: '1px solid var(--border-strong)',
          boxShadow: 'var(--shadow-1)',
          opacity: count ? 1 : 0,
          transition: `opacity var(--dur-2) var(--ease-out)`,
          fontSize: 14, fontWeight: 700, color: 'var(--accent-ink)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {count}
      </div>

      {/* front panel — the lid, hinged on its bottom edge */}
      <svg
        viewBox="0 0 50 34"
        style={{
          position: 'absolute', insetInline: 0, bottom: 0, width: '100%',
          color: 'var(--accent)',
          transformOrigin: 'bottom center',
          transform: `rotateX(${open * 62}deg)`,
          transition: `transform var(--dur-4) var(--ease-spring)`,
        }}
      >
        <path
          d="M0 4C0 1.79086 1.79086 0 4 0H46C48.2091 0 50 1.79086 50 4V30C50 32.2091 48.2091 34 46 34H4C1.79086 34 0 32.2091 0 30V4Z"
          fill="currentColor"
          fillOpacity="0.28"
          stroke="var(--accent)"
          strokeWidth="0.75"
        />
      </svg>

      {/* the label rides the tab the back panel already draws */}
      <span
        className="madar-folder-tab"
        style={{
          padding: '2px 8px', borderRadius: 'var(--r-xs)',
          background: 'var(--surface)', border: '1px solid var(--border-strong)',
          fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
          color: 'var(--text-2)', whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ── Row — one file, its share of the transfer, and the way out of it. */
function Row({
  item, onCancel, onRetry, onRemove, labels,
}: {
  item: UploadItem;
  onCancel: () => void;
  onRetry: () => void;
  onRemove: () => void;
  labels: { cancel: string; retry: string; remove: string; failed: string };
}) {
  const tone =
    item.phase === 'failed' ? 'var(--danger)'
      : item.phase === 'done' ? 'var(--success)'
        : 'var(--accent)';

  return (
    <li
      style={{
        display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto auto', alignItems: 'center',
        gap: 'var(--sp-3)', padding: '10px 12px',
        borderRadius: 'var(--r-sm)', background: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
    >
      <div style={{ minWidth: 0 }}>
        {/* A filename is an LTR structure even when its words are Arabic:
            without isolation the extension migrates to the wrong end. */}
        <bdi
          dir="ltr"
          style={{
            display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}
        >
          {item.name}
        </bdi>
        {/* the track doubles as the row's rule, so progress needs no extra height */}
        <div
          style={{
            marginBlockStart: 7, height: 4, borderRadius: 'var(--r-full)',
            background: 'var(--surface-2)', overflow: 'hidden',
          }}
        >
          <div
            className="madar-fill"
            style={{
              height: '100%', width: '100%', borderRadius: 'inherit',
              background: tone, transform: `scaleX(${item.progress})`,
              transition: `transform var(--dur-2) linear, background-color var(--dur-2) var(--ease-out)`,
            }}
          />
        </div>
      </div>

      <span
        style={{
          fontSize: 11.5, color: item.phase === 'failed' ? 'var(--danger)' : 'var(--text-3)',
          fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap',
        }}
      >
        {item.phase === 'failed' ? labels.failed : <bdi dir="ltr">{formatSize(item.size)}</bdi>}
      </span>

      {item.phase === 'uploading' ? (
        <button type="button" onClick={onCancel} aria-label={`${labels.cancel}: ${item.name}`} style={iconButton}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      ) : item.phase === 'failed' ? (
        <button type="button" onClick={onRetry} aria-label={`${labels.retry}: ${item.name}`} style={iconButton}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 3v6h-6" /></svg>
        </button>
      ) : (
        <button type="button" onClick={onRemove} aria-label={`${labels.remove}: ${item.name}`} style={iconButton}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      )}
    </li>
  );
}

const iconButton: React.CSSProperties = {
  display: 'grid', placeItems: 'center', width: 26, height: 26,
  border: '1px solid var(--border)', borderRadius: 'var(--r-xs)',
  background: 'var(--surface-2)', color: 'var(--text-2)',
  cursor: 'pointer', padding: 0, font: 'inherit',
};

export interface UploadFolderProps {
  /** Destination name, shown as the card's title. */
  title?: string;
  /** Short line under the title — capacity, path, whatever names the place. */
  meta?: string;
  /** Text on the folder tab. */
  tabLabel?: string;
  /** How each file is transferred. Defaults to a paced simulation. */
  upload?: Uploader;
  onComplete?: (items: UploadItem[]) => void;
}

export function UploadFolder({
  title = 'مستندات المشروع',
  meta = '80 ميغابايت متاحة',
  tabLabel = 'FILES',
  upload = simulatedUpload,
  onComplete,
}: UploadFolderProps) {
  const [items, setItems] = useState<UploadItem[]>([]);
  const [over, setOver] = useState(false);
  const input = useRef<HTMLInputElement | null>(null);
  const files = useRef(new Map<number, File>());
  const controllers = useRef(new Map<number, AbortController>());
  const nextId = useRef(0);

  useEffect(() => () => { controllers.current.forEach((c) => c.abort()); }, []);

  const patch = useCallback((id: number, change: Partial<UploadItem>) => {
    setItems((xs) => xs.map((x) => (x.id === id ? { ...x, ...change } : x)));
  }, []);

  const run = useCallback(async (id: number) => {
    const file = files.current.get(id);
    if (!file) return;
    const controller = new AbortController();
    controllers.current.set(id, controller);
    patch(id, { phase: 'uploading', progress: 0 });
    try {
      await upload(file, (p) => patch(id, { progress: Math.min(1, Math.max(0, p)) }), controller.signal);
      patch(id, { phase: 'done', progress: 1 });
    } catch (error) {
      // A cancel is a user decision, not a failure: drop the row entirely.
      if ((error as Error)?.name === 'AbortError') {
        setItems((xs) => xs.filter((x) => x.id !== id));
        files.current.delete(id);
      } else {
        patch(id, { phase: 'failed' });
      }
    } finally {
      controllers.current.delete(id);
    }
  }, [patch, upload]);

  const add = useCallback((list: FileList | null) => {
    if (!list?.length) return;
    const fresh = Array.from(list).map((file) => {
      const id = (nextId.current += 1);
      files.current.set(id, file);
      return { id, name: file.name, size: file.size, progress: 0, phase: 'queued' as UploadPhase };
    });
    setItems((xs) => [...xs, ...fresh]);
    fresh.forEach((item) => { void run(item.id); });
  }, [run]);

  const active = items.some((x) => x.phase === 'uploading' || x.phase === 'queued');
  const failed = items.filter((x) => x.phase === 'failed').length;
  const settled = items.filter((x) => x.phase === 'done').length;
  const total = items.length
    ? items.reduce((sum, x) => sum + (x.phase === 'done' ? 1 : x.progress), 0) / items.length
    : 0;

  // The lid answers the state: shut when empty, wide while landing, ajar after.
  const lid = !items.length ? 0 : active || over ? 1 : 0.42;

  const doneRef = useRef(false);
  useEffect(() => {
    const finished = items.length > 0 && !active;
    if (finished && !doneRef.current) onComplete?.(items);
    doneRef.current = finished;
  }, [active, items, onComplete]);

  const status = useMemo(() => {
    if (!items.length) return 'لم يُضَف أي ملف بعد';
    if (active) return `جارٍ الرفع… ${settled} من ${items.length}`;
    if (failed) return `اكتمل ${settled}، وأخفق ${failed}`;
    return 'اكتمل الرفع';
  }, [active, failed, items.length, settled]);

  const percent = Math.round(total * 100);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); add(e.dataTransfer.files); }}
      style={{
        display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)',
        width: '100%', maxWidth: 460, padding: 'var(--sp-5)',
        borderRadius: 'var(--r-xl)',
        background: 'var(--surface)',
        border: `1.5px solid ${over ? 'var(--accent)' : 'var(--border)'}`,
        boxShadow: over ? 'var(--shadow-3)' : 'var(--shadow-1)',
        transition: `border-color var(--dur-2) var(--ease-out), box-shadow var(--dur-2) var(--ease-out)`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-5)' }}>
        <Folder open={lid} count={items.length} label={tabLabel} />
        <div style={{ minWidth: 0 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: 'var(--text)' }}>{title}</h3>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--text-3)' }}>{meta}</p>
        </div>
      </div>

      <div
        style={{
          display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)',
          padding: 'var(--sp-4)', borderRadius: 'var(--r-lg)',
          background: 'var(--surface-2)', border: '1px solid var(--border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--sp-3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', minWidth: 0 }}>
            <span
              aria-hidden="true"
              style={{
                display: 'grid', placeItems: 'center', width: 24, height: 24, flex: 'none',
                borderRadius: 'var(--r-full)',
                border: active ? '2.5px solid var(--border-strong)' : 'none',
                borderTopColor: active ? 'var(--accent)' : undefined,
                background: active ? 'transparent' : failed ? 'var(--danger)' : items.length ? 'var(--success)' : 'var(--surface)',
                color: 'var(--on-accent)',
                animation: active ? 'spin 800ms linear infinite' : undefined,
              }}
            >
              {!active && items.length > 0 && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  {failed ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 12.5l5 5L20 6.5" />}
                </svg>
              )}
            </span>
            <p aria-live="polite" style={{ margin: 0, fontSize: 13, fontWeight: 500, color: 'var(--text-2)' }}>{status}</p>
          </div>
          <b style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>{percent}%</b>
        </div>

        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="تقدّم الرفع الكلّي"
          style={{ height: 8, borderRadius: 'var(--r-full)', background: 'var(--surface)', border: '1px solid var(--border)', overflow: 'hidden' }}
        >
          <div
            className="madar-fill"
            style={{
              height: '100%', width: '100%',
              background: failed && !active ? 'var(--danger)' : 'var(--accent)',
              transform: `scaleX(${total})`,
              transition: `transform var(--dur-2) linear, background-color var(--dur-2) var(--ease-out)`,
            }}
          />
        </div>
      </div>

      {items.length > 0 && (
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)', listStyle: 'none', margin: 0, padding: 0 }}>
          {items.map((item) => (
            <Row
              key={item.id}
              item={item}
              labels={{ cancel: 'إلغاء', retry: 'إعادة المحاولة', remove: 'إزالة', failed: 'أخفق' }}
              onCancel={() => controllers.current.get(item.id)?.abort()}
              onRetry={() => { void run(item.id); }}
              onRemove={() => {
                setItems((xs) => xs.filter((x) => x.id !== item.id));
                files.current.delete(item.id);
              }}
            />
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={() => input.current?.click()}
        className="i-press-97"
        style={{
          height: 42, borderRadius: 'var(--r-md)', border: 'none',
          background: 'var(--accent)', color: 'var(--on-accent)',
          font: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
        }}
      >
        اختيار الملفات أو إسقاطها هنا
      </button>
      <input ref={input} type="file" multiple hidden onChange={(e) => { add(e.target.files); e.target.value = ''; }} />
    </div>
  );
}
