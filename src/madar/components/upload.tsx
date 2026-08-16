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

/* ── Folder — a lit object with thickness, not a picture of one.

   The scene is real CSS 3D: a back panel, three walls that give the body its
   depth, a stack of sheets that grows with the file count, and a lid hinged on
   the bottom edge. Every face draws its color from one token and its
   brightness from the angle it presents to a single overhead light, so the
   object is lit rather than painted — one material, no second palette to keep
   in step with seven theme packs.

   `variant` is the same object read three ways, because a design system should
   show its own construction: `flat` is the drawn silhouette it started as,
   `solid` is the built object, and `exploded` pulls the layers apart in space
   the way a teardown does. The lid's angle carries state in all three.
──────────────────────────────────────────────────────────────────────── */

export type FolderVariant = 'flat' | 'solid' | 'exploded';

const W = 132;
const H = 100;
const D = 16;       // body thickness
const LID_H = 84;
const TAB_W = 58;
const TAB_H = 15;

/* Face brightness is the lighting model, and its direction is a constraint
   rather than a taste: the light sits *directly above* the object, tilted only
   toward the camera. Any lateral light would invert when the object mirrors
   for RTL, and light is physical, not linguistic — it must not follow the
   reading direction. See design-system/VISUAL-LAW.md §2. The two side walls
   therefore carry the same value; nothing here is brighter on one side. */
const LIGHT = {
  back: 0.86,
  tab: 0.94,
  bottomWall: 1.09,
  sideWall: 0.95,
  lid: 1.05,
};

function Face({
  brightness, part, style, children,
}: {
  brightness: number;
  /** Names the face so a check can read it directly instead of counting children. */
  part: string;
  style: React.CSSProperties;
  children?: React.ReactNode;
}) {
  return (
    <div
      data-folder-part={part}
      className="madar-folder-face"
      style={{
        // VISUAL-LAW.md §9: the containers in the references are neutral and
        // the colour belongs to what they hold. An object painted in the action
        // colour competes with the action button beside it, so the body is a
        // material that reads by light instead of by fill.
        background: 'var(--surface-2)',
        border: '1px solid var(--border)',
        filter: `brightness(${brightness})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* Unequal by hand, not by loop: three identical angles read as a `for`, three
   different ones read as someone having put them there. VISUAL-LAW.md §4. */
const SLIP_TILT = [-3.5, 2.1, -1.2];

/* One paperclip drawn twice: the back copy is clipped to the length that
   passes behind the leaf, the front copy to the length that passes over it.
   Their different translateZ does the occluding, so the wire genuinely goes
   over and under rather than being painted to look as though it does. */
function Clip({ z, lift, half }: { z: number; lift: number; half: 'front' | 'back' }) {
  return (
    <div
      data-folder-part={`clip-${half}`}
      className="madar-folder-face"
      style={{
        insetInlineStart: W - 56, top: H - LID_H - 16,
        width: 30, height: 46, background: 'transparent',
        color: 'var(--text-2)',
        clipPath: half === 'back' ? 'inset(38% 0 0 0)' : 'inset(0 0 62% 0)',
        transform: `translateZ(${z}px) translateY(${-lift}px) rotateZ(${SLIP_TILT[0]}deg)`,
      }}
    >
      <svg viewBox="0 0 26 40" width="30" height="46" fill="none" aria-hidden="true">
        <path
          d="M18 11v18a5.5 5.5 0 0 1-11 0V9a3.5 3.5 0 0 1 7 0v19a1.8 1.8 0 0 1-3.6 0V12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function Folder({
  open, count, label, variant, tilt, filed,
}: {
  open: number;
  count: number;
  label: string;
  variant: FolderVariant;
  tilt: { x: number; y: number };
  /** True once every transfer has settled — the clip is a state, not a trim. */
  filed: boolean;
}) {
  if (variant === 'flat') return <FlatFolder open={open} count={count} label={label} />;

  const spread = variant === 'exploded' ? 1 : 0;
  const sheets = Math.min(3, count);

  // The teardown reads from an angle; the built object faces you.
  const camX = (spread ? 34 : 14) + tilt.x;
  const camY = (spread ? -12 : -15) + tilt.y;

  return (
    <div
      aria-hidden="true"
      className="madar-folder-stage"
      style={{ width: W + 24, height: H + (spread ? 62 : 78), flex: 'none' }}
    >
      <div className="madar-folder-mirror">
        <div
          className="madar-folder-scene"
          style={{
            width: W, height: H, margin: `${spread ? 40 : 58}px auto 0`,
            transform: `rotateX(${camX}deg) rotateY(${camY}deg) scale(${spread ? 0.78 : 0.92})`,
          }}
        >
          {/* Two of the three shadows the law asks for. Contact is tight and
              dark where the object meets the surface and gives it weight; cast
              is wider, softer and lower and gives it height. Both fall straight
              down, because the light is straight above. VISUAL-LAW.md §3. */}
          <div
            data-folder-part="cast-shadow"
            className="madar-folder-contact"
            style={{
              insetInlineStart: 4, top: H + 6, width: W - 8, height: 18,
              filter: 'blur(14px)',
              opacity: spread ? 0.05 : 0.13,
              transform: `translateZ(-${D}px) scaleX(${1 + open * 0.16})`,
            }}
          />
          <div
            data-folder-part="contact-shadow"
            className="madar-folder-contact"
            style={{
              insetInlineStart: 16, top: H + 1, width: W - 32, height: 8,
              filter: 'blur(5px)',
              opacity: spread ? 0.08 : 0.3,
              transform: `translateZ(-${D}px) scaleX(${1 + open * 0.1})`,
            }}
          />

          {/* back panel and its tab — one plane, the object's spine */}
          <Face
            part="back"
            brightness={LIGHT.back}
            style={{
              inset: 0,
              borderStartStartRadius: 'var(--r-sm)', borderStartEndRadius: 'var(--r-sm)',
              transform: `translateZ(${-spread * 42}px)`,
            }}
          />
          <Face
            part="tab"
            brightness={LIGHT.tab}
            style={{
              insetInlineStart: 6, top: -TAB_H + 4, width: TAB_W, height: TAB_H,
              borderStartStartRadius: 'var(--r-xs)', borderStartEndRadius: 'var(--r-xs)',
              transform: `translateZ(${-spread * 42}px)`,
            }}
          />

          {/* the three walls that turn a rectangle into a body */}
          <Face
            part="wall"
            brightness={LIGHT.bottomWall}
            style={{
              insetInlineStart: 0, top: H, width: W, height: D,
              transformOrigin: 'top center',
              transform: `rotateX(-90deg)`,
              opacity: spread ? 0 : 1,
              borderEndStartRadius: 'var(--r-xs)', borderEndEndRadius: 'var(--r-xs)',
            }}
          />
          <Face
            part="wall"
            brightness={LIGHT.sideWall}
            style={{
              insetInlineStart: 0, top: 0, width: D, height: H,
              transformOrigin: 'left center',
              transform: `rotateY(90deg)`,
              opacity: spread ? 0 : 1,
            }}
          />
          <Face
            part="wall"
            brightness={LIGHT.sideWall}
            style={{
              insetInlineStart: W - D, top: 0, width: D, height: H,
              transformOrigin: 'right center',
              transform: `rotateY(-90deg)`,
              opacity: spread ? 0 : 1,
            }}
          />

          {spread === 1 && sheets === 0 && (
            <div
              data-folder-part="slot"
              className="madar-folder-face"
              style={{
                insetInlineStart: 15, top: H - LID_H, width: W - 30, height: LID_H - 6,
                background: 'var(--surface)',
                opacity: 0.4,
                border: '1px dashed var(--border-strong)',
                borderRadius: 'var(--r-xs)',
                transform: `translateZ(22px)`,
              }}
            />
          )}

          {/* the sheets — a stack that grows, each leaf catching less light */}
          {Array.from({ length: sheets }, (_, i) => (
            <div
              key={i}
              data-folder-part="sheet"
              className="madar-folder-face"
              style={{
                insetInlineStart: 15 + i * 4, top: H - LID_H,
                width: W - 30 - i * 8, height: LID_H - 6,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-xs)',
                // cast straight down: the light is overhead, so a leaf drops its
                // shadow onto the leaf behind it, not off to one side
                boxShadow: '0 3px 6px -2px var(--shadow-color)',
                filter: `brightness(${1 - i * 0.04})`,
                transform: `translateZ(${5 + i * 3 + spread * (22 + i * 18)}px) translateY(${-open * (48 + i * 15)}px) rotateZ(${SLIP_TILT[i]}deg)`,
              }}
            />
          ))}

          {/* the count, printed on the topmost sheet rather than floating */}
          {count > 0 && (
            <div
              data-folder-part="count"
              className="madar-folder-face madar-folder-legend"
              style={{
                insetInlineStart: 15 + (sheets - 1) * 4, top: H - LID_H,
                width: W - 30 - (sheets - 1) * 8, height: LID_H - 6,
                background: 'transparent',
                display: 'grid', justifyItems: 'center', alignItems: 'start',
                paddingBlockStart: 13,
                transform: `translateZ(${6 + (sheets - 1) * 3 + spread * (22 + (sheets - 1) * 18)}px) translateY(${-open * (48 + (sheets - 1) * 15)}px) rotateZ(${SLIP_TILT[Math.max(0, sheets - 1)]}deg) scaleX(var(--madar-mirror))`,
                fontSize: 20, fontWeight: 700, color: 'var(--accent-ink)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {count}
            </div>
          )}

          {/* The third shadow: the lid is in front and overhead light does not
              reach behind it, so the leaves darken where they enter the pocket.
              This is the joint, and the joint is where objects stop being
              stickers. VISUAL-LAW.md §3, §5. */}
          {sheets > 0 && spread === 0 && (
            <div
              data-folder-part="occlusion"
              className="madar-folder-contact"
              style={{
                insetInlineStart: 12, top: H - LID_H - 4, width: W - 24, height: 14,
                borderRadius: 0,
                filter: 'blur(6px)',
                opacity: 0.26,
                transform: `translateZ(${D - 2}px)`,
              }}
            />
          )}

          {/* Filed: the clip appears only once every transfer has settled, so it
              reports a state rather than trimming the object. Its wire crosses
              in front of the top leaf and disappears behind it, which is the
              detail that makes a drawn object read as a real one.
              VISUAL-LAW.md §5, §8. */}
          {filed && sheets > 0 && spread === 0 && (
            <>
              <Clip z={5 + (sheets - 1) * 3 - 2} lift={open * (48 + (sheets - 1) * 15)} half="back" />
              <Clip z={5 + (sheets - 1) * 3 + 4} lift={open * (48 + (sheets - 1) * 15)} half="front" />
            </>
          )}

          {/* the lid — hinged at the bottom edge, its angle is the state */}
          <Face
            part="lid"
            brightness={LIGHT.lid}
            style={{
              insetInlineStart: 0, top: H - LID_H, width: W, height: LID_H,
              borderStartStartRadius: 'var(--r-sm)', borderStartEndRadius: 'var(--r-sm)',
              boxShadow: 'inset 0 1px 0 var(--glass-hl)',
              transformOrigin: 'bottom center',
              transform: `translateZ(${D + spread * 76}px) rotateX(-${open * (spread ? 4 : 9)}deg)`,
            }}
          >
            <span
              className="madar-folder-legend"
              style={{
                position: 'absolute', insetInlineStart: 10, top: 9,
                fontSize: 9, fontWeight: 700, letterSpacing: '0.14em',
                color: 'var(--text-2)', whiteSpace: 'nowrap',
              }}
            >
              {label}
            </span>
          </Face>
        </div>
      </div>
    </div>
  );
}

/* ── FlatFolder — the drawn original, kept so the built object has something
   to be compared against rather than only described. */
function FlatFolder({ open, count, label }: { open: number; count: number; label: string }) {
  return (
    <div
      aria-hidden="true"
      className="madar-folder-stage"
      style={{ width: W + 24, height: H + 44, flex: 'none' }}
    >
      <div className="madar-folder-mirror">
        {/* the drawn original keeps the box it was drawn for: forcing it into
            the built object's larger box made its lid swallow the count */}
        <div className="madar-folder-plane" style={{ width: 118, height: 96, margin: '24px auto 0' }}>
          <svg
            viewBox="0 0 50 40"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', color: 'var(--accent-soft)' }}
          >
            <path
              d="M0 4C0 1.79086 1.79086 0 4 0H16.524C17.721 0 18.8415 0.54051 19.574 1.4673L22.426 5.0654C23.1585 5.99219 24.279 6.5327 25.476 6.5327H46C48.2091 6.5327 50 8.32356 50 10.5327V36C50 38.2091 48.2091 40 46 40H4C1.79086 40 0 38.2091 0 36V4Z"
              fill="currentColor"
              stroke="var(--accent)"
              strokeWidth="0.75"
            />
          </svg>

          <div
            className="madar-folder-slot"
            style={{
              display: 'grid', placeItems: 'center',
              borderRadius: 'var(--r-xs)', background: 'var(--surface)',
              border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-1)',
              opacity: count ? 1 : 0,
              transition: `opacity var(--dur-2) var(--ease-out)`,
              fontSize: 12, fontWeight: 700, color: 'var(--accent-ink)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {count}
          </div>

          <svg
            viewBox="0 0 50 34"
            style={{
              position: 'absolute', insetInline: 0, bottom: 0, width: '100%',
              color: 'var(--accent)', transformOrigin: 'bottom center',
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

          <span
            className="madar-folder-tab madar-folder-legend"
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
      </div>
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
          className="madar-track"
          style={{ marginBlockStart: 7, height: 4, borderRadius: 'var(--r-full)', overflow: 'hidden' }}
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
  /** How the destination is drawn: the built object, its teardown, or the
   *  flat silhouette this started as. */
  variant?: FolderVariant;
  onComplete?: (items: UploadItem[]) => void;
}

export function UploadFolder({
  title = 'مستندات المشروع',
  meta = '80 ميغابايت متاحة',
  tabLabel = 'FILES',
  upload = simulatedUpload,
  variant = 'solid',
  onComplete,
}: UploadFolderProps) {
  const [items, setItems] = useState<UploadItem[]>([]);
  const [over, setOver] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
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
      onDrop={(e) => { e.preventDefault(); setOver(false); setTilt({ x: 0, y: 0 }); add(e.dataTransfer.files); }}
      // Parallax is a courtesy, not the effect: a few degrees, so the object
      // reads as sitting in space rather than printed on the card.
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setTilt({
          x: (0.5 - (e.clientY - r.top) / r.height) * -9,
          y: ((e.clientX - r.left) / r.width - 0.5) * 12,
        });
      }}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
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
        <Folder open={lid} count={items.length} label={tabLabel} variant={variant} tilt={tilt} filed={!active && !failed && items.length > 0} />
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
          className="madar-track"
          style={{ height: 8, borderRadius: 'var(--r-full)', border: '1px solid var(--border)', overflow: 'hidden' }}
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
