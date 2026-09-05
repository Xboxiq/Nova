import { useMemo } from 'react';

/* ────────────────────────────────────────────────────────────────────────
   Outage — is it me, or is it the grid?

   The obvious component here would be a timeline of outages. It was not built,
   because that is `DutyCycle`'s shape with different labels: spans on an axis,
   width for duration. Drawing it again would add a component and no answer.

   The question a customer actually has is comparative. Power went out; whose
   fault is it? And that answer is not in either series — it is in whether they
   coincide:

     · out here and out in the area   → the grid went down
     · out here while the area held    → the fault is inside the premises
     · the area out while here held    → a different feeder, or backup ran

   Hence §19 of VISUAL-LAW.md: when two series share an axis, the information is
   often the coincidence, so the drawing has to make coincidence visible instead
   of leaving the reader to compare two charts by memory. The tie between the
   tracks *is* the finding, drawn.

   And the discipline the fifth batch taught: the saturated colour appears once.
   A restored outage is history and takes the neutral; only one that is still
   happening is coloured, because only it can be acted on.
──────────────────────────────────────────────────────────────────────── */

export interface Span {
  /** Hours from the window's start. */
  from: number;
  to: number;
}

export type Verdict = 'grid' | 'premises' | 'area' | 'clear';

const VERDICT: Record<Verdict, { ar: string; note: string; tone: string }> = {
  grid: {
    ar: 'الانقطاع من الشبكة',
    note: 'انقطع عندك وعند الحيّ في الوقت نفسه، فالعيب خارج البيت ولا شيء تفعله في اللوحة.',
    tone: 'var(--info)',
  },
  premises: {
    ar: 'العيب داخل البيت',
    note: 'انقطع عندك والحيّ يعمل. افحص القاطع الرئيسي والتوصيلة قبل أن تُبلّغ.',
    tone: 'var(--danger)',
  },
  area: {
    ar: 'الحيّ فقط',
    note: 'انقطع عند الحيّ وأنت تعمل — مغذٍّ مختلف أو مصدر احتياطي شغّل عندك.',
    tone: 'var(--text-3)',
  },
  clear: { ar: 'لا انقطاع', note: 'لم يسجّل العدّاد انقطاعًا في هذه النافذة.', tone: 'var(--text-3)' },
};

const mins = (h: number) => Math.round(h * 60);
const hh = (h: number) => `${String(Math.floor(h) % 24).padStart(2, '0')}:${String(Math.round((h % 1) * 60)).padStart(2, '0')}`;

/** Where two spans overlap, or null. The overlap is the finding, so it is
    computed rather than eyeballed. */
function cross(a: Span, b: Span): Span | null {
  const from = Math.max(a.from, b.from);
  const to = Math.min(a.to, b.to);
  return to > from ? { from, to } : null;
}

export interface OutageCompareProps {
  yours?: Span[];
  area?: Span[];
  /** The window, in hours from midnight. */
  span?: [number, number];
  now?: number;
}

export function OutageCompare({
  yours,
  area,
  span = [18, 24],
  now = 23.2,
}: OutageCompareProps) {
  const mine: Span[] = yours ?? [{ from: 19.1, to: 19.7 }, { from: 21.4, to: 21.55 }, { from: 22.9, to: 23.2 }];
  /* Every outage here has a counterpart in the area, which is what makes the
     default a grid fault. The check caught this: the first draft left the 21:24
     dip untied and the verdict came out `premises`, correctly contradicting the
     example it was meant to be. */
  const theirs: Span[] = area ?? [
    { from: 19.05, to: 19.8 },
    { from: 21.35, to: 21.6 },
    { from: 22.85, to: 23.2 },
  ];

  const [open, close] = span;
  const width = close - open;
  const pct = (h: number) => ((h - open) / width) * 100;

  const ties = useMemo(
    () => mine.flatMap((m) => theirs.map((t) => cross(m, t)).filter(Boolean) as Span[]),
    [mine, theirs],
  );

  const verdict: Verdict = useMemo(() => {
    if (!mine.length) return theirs.length ? 'area' : 'clear';
    const alone = mine.filter((m) => !theirs.some((t) => cross(m, t)));
    return alone.length ? 'premises' : 'grid';
  }, [mine, theirs]);

  const lost = mine.reduce((s, m) => s + (m.to - m.from), 0);
  const ongoing = mine.some((m) => m.to >= now);

  const Track = ({ label, spans, live }: { label: string; spans: Span[]; live: boolean }) => (
    <div style={{ display: 'grid', gap: 5 }}>
      <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{label}</span>
      <div
        data-track={label}
        role="img"
        aria-label={`${label}: ${spans.length ? `${spans.length} انقطاع، مجموعها ${mins(spans.reduce((a, s) => a + (s.to - s.from), 0))} دقيقة` : 'لا انقطاع'}`}
        style={{
          position: 'relative', height: 22,
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-xs)', overflow: 'hidden',
        }}
      >
        {spans.map((s, i) => {
          const still = live && s.to >= now;
          return (
            <span
              key={i}
              data-outage={still ? 'ongoing' : 'restored'}
              title={`${hh(s.from)} – ${hh(s.to)} · ${mins(s.to - s.from)} دقيقة`}
              style={{
                position: 'absolute', insetBlock: 0,
                insetInlineStart: `${pct(s.from)}%`,
                width: `max(3px, ${pct(s.to) - pct(s.from)}%)`,
                // history is neutral; only what is still happening is coloured
                background: still ? 'var(--danger)' : 'var(--border-strong)',
              }}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)',
        padding: 'var(--sp-5)', background: 'var(--surface)',
        border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--sp-3)' }}>
        <b style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>الانقطاع الليلة</b>
        <span style={{ fontSize: 12, color: 'var(--text-3)', fontVariantNumeric: 'tabular-nums' }}>
          فقدتَ <bdi dir="ltr">{mins(lost)}</bdi> دقيقة
        </span>
      </div>

      <div style={{ position: 'relative', display: 'grid', gap: 'var(--sp-3)' }}>
        <Track label="عندك" spans={mine} live={ongoing} />

        {/* The tie is the finding: a line drawn only where the two coincide. */}
        <div style={{ position: 'relative', height: 14 }}>
          {ties.map((t, i) => (
            <span
              key={i}
              data-tie=""
              aria-hidden="true"
              /* The tie has to read as a column joining the two blocks, because
                 it is the finding. Two hairlines alone were too quiet to see at
                 three pixels wide, so the span between them is shaded as well. */
              style={{
                position: 'absolute', insetBlock: 0,
                insetInlineStart: `${pct(t.from)}%`,
                width: `max(3px, ${pct(t.to) - pct(t.from)}%)`,
                borderInlineStart: '1px solid var(--border-strong)',
                borderInlineEnd: '1px solid var(--border-strong)',
                backgroundColor: 'color-mix(in srgb, var(--border-strong) 26%, transparent)',
              }}
            />
          ))}
        </div>

        <Track label="الحيّ" spans={theirs} live={false} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: 'var(--text-3)', fontVariantNumeric: 'tabular-nums' }}>
        {[0, 0.5, 1].map((f) => <span key={f}><bdi dir="ltr">{hh(open + f * width)}</bdi></span>)}
      </div>

      {/* The verdict is derived from the crossings, not typed in beside them. */}
      <div
        data-verdict={verdict}
        style={{
          display: 'grid', gap: 5, paddingBlockStart: 'var(--sp-3)',
          borderBlockStart: '1px solid var(--border)',
        }}
      >
        <b style={{ fontSize: 12.5, fontWeight: 600, color: VERDICT[verdict].tone }}>{VERDICT[verdict].ar}</b>
        <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: 'var(--text-2)' }}>{VERDICT[verdict].note}</p>
      </div>
    </div>
  );
}
