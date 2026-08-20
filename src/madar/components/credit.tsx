import { useMemo, useState } from 'react';
import { MeshSurface, glass, ink } from './mesh';

/* ────────────────────────────────────────────────────────────────────────
   The credit family — the reference set, carried in unchanged.

   Nine of the fourteen references were not nine designs: they were two screens
   and two boards, photographed from different angles and distances. So this is
   two screens and the widgets they are made of, and the close-ups are camera
   shots of the same components.

   Every value is the reference's own, through the tokens in `bridge.css`. What
   was added on the way in is the part a screenshot cannot carry: the readings
   are derived, the states are counted, and the accent means one thing.

   Checked before writing it, and not reused:
   · `AllocationBar` (energy.tsx) is a share bar. `PaidSplit` is a *pair* with a
     divider between them, and the pairing is the reading: paid against left.
   · `DayStrip` (schedule.tsx) is 24 counted cells on a time axis. `MonthGrid` is
     a calendar of *states* — paid, missed, not yet due — and its shape is the
     year, not the day.
   · `MiniBarChart` (charts.tsx) plots a series. `ScoreBands` plots one reading
     against three named ranges, which is §14 with the reference drawn as bands.
──────────────────────────────────────────────────────────────────────── */

const n = (v: number, digits = 0) =>
  v.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });

/* ═══════════════════════════════════════════════════════════════════════════
   LoanWidget — the square card, green or peach
   ═══════════════════════════════════════════════════════════════════════════ */

export interface LoanWidgetProps {
  bank?: string;
  country?: string;
  paid?: number;
  termMonths?: number;
  nextPayment?: string;
  tone?: 'green' | 'peach';
  /** How the progress is drawn: dots count, bars measure. Same data, two reads. */
  meter?: 'dots' | 'bars';
  /** Months already paid, out of `termMonths`. The lit part is derived from it. */
  paidMonths?: number;
  size?: number;
}

function BankMark({ kind }: { kind: 'card' | 'bank' }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 58, height: 58, borderRadius: '50%', display: 'grid', placeItems: 'center', flex: 'none',
        boxShadow: 'inset 0 0 0 1.2px rgba(255,255,255,0.6)',
      }}
    >
      {kind === 'card' ? (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="14" height="11" rx="2.5" /><path d="M3 10h14" /><circle cx="17.5" cy="15.5" r="4" /><path d="M17.5 14v3" />
        </svg>
      ) : (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 9l8-5 8 5" /><path d="M5 9v9M19 9v5" /><path d="M9 18v-6M15 12v2" /><path d="M3 21h12" /><circle cx="18.5" cy="18" r="3.4" /><path d="M18.5 16.6v1.6" />
        </svg>
      )}
    </span>
  );
}

function OpenButton({ quiet = false, dark = true }: { quiet?: boolean; dark?: boolean }) {
  return (
    <button
      type="button"
      aria-label="Open"
      style={{
        width: 58, height: 58, border: 0, borderRadius: '50%', cursor: 'pointer', flex: 'none',
        display: 'grid', placeItems: 'center',
        background: quiet ? (dark ? 'rgba(255,255,255,0.24)' : '#f2f2f0') : '#0c0c0c',
        boxShadow: quiet
          ? 'inset 0 1px 0 rgba(255,255,255,0.42)'
          : 'inset 0 1px 0 rgba(255,255,255,0.16), var(--depth-press)',
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={quiet && !dark ? '#101010' : '#fff'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17 17 7" /><path d="M9 7h8v8" />
      </svg>
    </button>
  );
}

export function LoanWidget({
  bank = 'TD Bank',
  country = 'USA',
  paid = 12340,
  termMonths = 36,
  nextPayment = '03.05.2024',
  tone = 'green',
  meter = 'dots',
  paidMonths = 23,
  size = 316,
}: LoanWidgetProps) {
  /* The meter is derived from the months, never passed in as a width: a widget
     that can be told a wrong length is a widget that will be. */
  const cols = 14;
  const lit = Math.round((Math.min(paidMonths, termMonths) / termMonths) * cols);

  return (
    <MeshSurface
      variant={tone}
      glow
      bevel
      style={{ width: size, height: size, padding: 26, display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <BankMark kind={tone === 'green' ? 'card' : 'bank'} />
        <div style={{ flex: 1, paddingInlineStart: 14, paddingTop: 4, fontSize: 25, lineHeight: 1.12, letterSpacing: '-0.015em' }}>
          {bank}<br />{country}
        </div>
        <OpenButton />
      </div>

      <div style={{ marginTop: 34 }}>
        <div style={{ fontSize: 16, color: ink.label }}>Paid Amount</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ fontSize: 46, fontWeight: 300, letterSpacing: '-0.035em', lineHeight: 1.05, display: 'flex', alignItems: 'baseline', gap: 3 }}>
            <span style={{ fontSize: 22, color: 'rgba(255,255,255,0.6)' }}>$</span>
            <bdi dir="ltr">{n(paid)}</bdi>
          </div>
          <div style={{ fontSize: 14, color: ink.soft, textAlign: 'end', lineHeight: 1.35, paddingBottom: 6 }}>
            Term<br /><bdi dir="ltr">{n(termMonths)} m.</bdi>
          </div>
        </div>
      </div>

      {/* dots count the instalments; bars measure the same run. The lit part is
          the paid part, and lime means measured. */}
      <div
        data-meter={meter}
        data-lit={lit}
        aria-hidden="true"
        style={{ marginTop: 'auto', display: 'flex', gap: meter === 'dots' ? 12 : 8, alignItems: 'flex-end', height: 26 }}
      >
        {Array.from({ length: cols }, (_, i) => {
          const on = i >= cols - lit;
          return meter === 'dots' ? (
            <span key={i} style={{ display: 'grid', gap: 6 }}>
              {[0, 1, 2].map((r) => (
                <span
                  key={r}
                  style={{
                    width: 3.6, height: 3.6, borderRadius: '50%',
                    background: on ? 'var(--lime-bright)' : 'rgba(255,255,255,0.42)',
                  }}
                />
              ))}
            </span>
          ) : (
            <span
              key={i}
              style={{
                width: 2, height: on ? 26 : 18, borderRadius: 1,
                background: on ? 'var(--lime-bright)' : 'rgba(255,255,255,0.44)',
              }}
            />
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', fontSize: 15, marginTop: 18 }}>
        <span style={{ color: ink.label }}>Next Payment</span>
        <span><bdi dir="ltr">{nextPayment}</bdi></span>
      </div>
    </MeshSurface>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   StatWidget — the white card and the glass card
   ═══════════════════════════════════════════════════════════════════════════ */

export interface StatWidgetProps {
  title?: string;
  value?: number;
  /** `of` draws a denominator; `pct` draws a percent. */
  unit?: { of: number } | 'pct';
  tone?: 'white' | 'glass';
  /** Amber marks a reading that wants attention; it is not decoration. */
  warn?: boolean;
  icon?: 'calendar' | 'card';
  size?: number;
}

export function StatWidget({
  title = 'Payments on Time',
  value = 24,
  unit = { of: 38 },
  tone = 'white',
  warn = true,
  icon = 'calendar',
  size = 316,
}: StatWidgetProps) {
  const light = tone === 'white';
  const total = typeof unit === 'object' ? unit.of : 100;
  /* The dot matrix counts the actual reading — §15-a: a counted quantity is
     drawn counted, so twenty-four dots are twenty-four dots. */
  const dots = Math.min(12, Math.max(1, Math.round((value / total) * 12)));

  return (
    <div
      data-stat={tone}
      className="madar-glow"
      style={{
        width: size, height: size, padding: 26, borderRadius: 'var(--r-widget)',
        display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
        color: light ? '#101010' : '#fff',
        background: light
          ? 'linear-gradient(178deg, #ffffff 0%, #fbfbfa 100%)'
          : 'linear-gradient(168deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.16) 100%)',
        backdropFilter: light ? undefined : 'blur(26px)',
        boxShadow: light
          ? 'inset 0 1.5px 0 #ffffff, inset 0 -1px 0 rgba(0,0,0,0.05), var(--depth-widget)'
          : 'inset 0 1.5px 0 rgba(255,255,255,0.6), inset 0 -1.5px 0 rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.3), var(--depth-widget)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span
          aria-hidden="true"
          style={{
            width: 58, height: 58, borderRadius: '50%', display: 'grid', placeItems: 'center', position: 'relative',
            boxShadow: `inset 0 0 0 1.2px ${light ? 'rgba(16,16,16,0.14)' : 'rgba(255,255,255,0.6)'}`,
          }}
        >
          {icon === 'calendar' ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={light ? '#101010' : '#fff'} strokeWidth="1.4" strokeLinecap="round">
              <rect x="3.5" y="5" width="17" height="16" rx="3" /><path d="M3.5 10h17M8 3v4M16 3v4" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={light ? '#101010' : '#fff'} strokeWidth="1.4" strokeLinecap="round">
              <rect x="3" y="6" width="14" height="11" rx="2.5" /><path d="M3 10h14" /><circle cx="17.5" cy="15.5" r="4" /><path d="M17.5 14v3" />
            </svg>
          )}
          {warn && (
            <span style={{ position: 'absolute', top: -4, right: -4, display: 'grid', placeItems: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3.5l9 16H3z" fill={light ? '#f5a623' : '#f5721f'} />
                <path d="M12 9v5M12 16.4v.3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
          )}
        </span>
        <OpenButton quiet dark={!light} />
      </div>

      <div style={{ marginTop: 26, fontSize: 21, letterSpacing: '-0.012em' }}>{title}</div>

      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, fontSize: 44, fontWeight: light ? 600 : 500, letterSpacing: '-0.03em' }}>
          <bdi dir="ltr">{n(value)}</bdi>
          <small style={{ fontSize: 22, fontWeight: 400, color: light ? 'rgba(16,16,16,0.4)' : 'rgba(255,255,255,0.66)' }}>
            {unit === 'pct' ? '%' : <>/{n(total)}</>}
          </small>
        </div>

        {unit === 'pct' ? (
          <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                style={{
                  width: i === 3 ? 30 : 22, height: i === 3 ? 30 : 22, borderRadius: '50%',
                  boxShadow: `inset 0 0 0 ${i === 3 ? 2.2 : 1.6}px ${i === 3 ? '#fff' : 'rgba(255,255,255,0.5)'}`,
                }}
              />
            ))}
          </span>
        ) : (
          <span aria-hidden="true" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 8 }}>
            {Array.from({ length: 12 }, (_, i) => (
              <span
                key={i}
                style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: i >= 12 - dots ? '#101010' : '#d8d8d5',
                }}
              />
            ))}
          </span>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PaidSplit — paid against left to pay, with the divider between them
   ═══════════════════════════════════════════════════════════════════════════ */

export function PaidSplit({ paid = 12340, total = 15000 }: { paid?: number; total?: number }) {
  const left = Math.max(0, total - paid);
  return (
    <div data-split="" style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: 16, alignItems: 'center' }}>
      <div>
        <Chip lit value={paid} />
        <div style={{ fontSize: 14, color: ink.label, marginTop: 8 }}>You’ve Paid</div>
      </div>
      {/* the divider is a reading too: lime at the top where the paid side is */}
      <span
        aria-hidden="true"
        style={{
          position: 'relative', height: 96,
          background: 'linear-gradient(180deg, var(--lime) 0%, rgba(255,255,255,0.3) 46%, rgba(255,255,255,0.12) 100%)',
        }}
      >
        <span
          style={{
            position: 'absolute', left: '50%', top: -9, transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '7px solid transparent', borderRight: '7px solid transparent',
            borderTop: '9px solid var(--lime)',
            filter: 'drop-shadow(0 0 6px rgba(210,245,74,0.6))',
          }}
        />
      </span>
      <div>
        <Chip value={left} />
        <div style={{ fontSize: 14, color: ink.label, marginTop: 8, textAlign: 'end' }}>Left To Pay</div>
      </div>
    </div>
  );
}

function Chip({ value, lit = false }: { value: number; lit?: boolean }) {
  return (
    <div
      data-chip={lit ? 'paid' : 'due'}
      style={{
        height: 52, padding: '0 18px', borderRadius: 26,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        fontSize: 17, ...glass(lit),
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 22, height: 22, borderRadius: '50%', flex: 'none', display: 'grid', placeItems: 'center',
          border: `1.4px solid ${lit ? 'var(--lime)' : 'rgba(255,255,255,0.5)'}`,
          boxShadow: lit ? '0 0 10px rgba(210,245,74,0.55)' : undefined,
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: lit ? 'var(--lime)' : '#fff' }} />
      </span>
      <span><bdi dir="ltr">${n(value)}</bdi></span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MonthGrid — the year as states, not as a strip
   ═══════════════════════════════════════════════════════════════════════════ */

export type MonthState = 'paid' | 'missed' | 'due';
export interface MonthRow { year: number; months: { label: string; state: MonthState }[] }

const YEARS: MonthRow[] = [
  {
    year: 2023,
    months: [
      { label: 'Jan', state: 'due' }, { label: 'Feb', state: 'paid' },
      { label: 'Mar', state: 'paid' }, { label: 'Apr', state: 'paid' },
      { label: 'Jul', state: 'paid' }, { label: 'Aug', state: 'paid' },
      { label: 'Sep', state: 'missed' }, { label: 'Oct', state: 'paid' },
    ],
  },
  {
    year: 2024,
    months: [
      { label: 'Jan', state: 'due' }, { label: 'Feb', state: 'due' },
      { label: 'Mar', state: 'due' }, { label: 'Apr', state: 'due' },
    ],
  },
];

export function MonthGrid({ years = YEARS }: { years?: MonthRow[] }) {
  const paid = useMemo(
    () => years.flatMap((y) => y.months).filter((m) => m.state === 'paid').length,
    [years],
  );

  return (
    <div data-months={paid}>
      {years.map((row, i) => (
        <div key={row.year} style={{ marginTop: i ? 24 : 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 22 }}><bdi dir="ltr">{row.year}</bdi></span>
            {i === 0 && <span style={{ fontSize: 14, color: ink.label }}>First Payment · <bdi dir="ltr">{row.year}</bdi></span>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 11, marginTop: 14 }}>
            {row.months.map((m) => (
              <div
                key={m.label}
                data-month={m.state}
                style={{
                  height: 92, borderRadius: 18, paddingTop: 11,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
                  fontSize: 15,
                  opacity: m.state === 'due' ? 0.72 : 1,
                  border: `1px solid ${m.state === 'paid' ? 'rgba(255,255,255,0.26)' : 'rgba(255,255,255,0.2)'}`,
                  background: 'rgba(255,255,255,0.08)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.26)',
                }}
              >
                <span>{m.label}</span>
                <span
                  style={{
                    width: 30, height: 30, borderRadius: '50%', marginBottom: 12,
                    display: 'grid', placeItems: 'center',
                    visibility: m.state === 'due' ? 'hidden' : 'visible',
                    background: m.state === 'paid' ? 'var(--lime)' : 'transparent',
                    border: m.state === 'missed' ? '1px solid rgba(255,255,255,0.38)' : undefined,
                    boxShadow: m.state === 'paid' ? 'var(--depth-lime), inset 0 -1px 0 rgba(0,0,0,0.12)' : undefined,
                  }}
                >
                  {m.state === 'paid' ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--lime-ink)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 12l6 6L20 6" />
                    </svg>
                  ) : (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.72)" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LoanScreen — the whole thing
   ═══════════════════════════════════════════════════════════════════════════ */

export function LoanScreen({ paid = 12340, total = 15000, termMonths = 36 }: { paid?: number; total?: number; termMonths?: number }) {
  const [tab, setTab] = useState<'details' | 'timeline' | 'updates'>('timeline');
  const pct = Math.round((paid / total) * 100);

  return (
    <MeshSurface
      variant="run"
      radius="var(--r-screen)"
      style={{ width: 430, height: 932, display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ position: 'absolute', inset: 0, padding: '58px 26px 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <BankMark kind="card" />
            <div style={{ fontSize: 21, lineHeight: 1.16 }}>TD Bank<br />USA</div>
          </div>
          <OpenButton />
        </div>

        {/* the percentage, on a drawn path — the squiggle is the run it measures */}
        <div style={{ position: 'absolute', insetInlineEnd: 26, top: 118, textAlign: 'end' }}>
          <svg width="132" height="52" viewBox="0 0 132 52" fill="none" aria-hidden="true" style={{ display: 'block', marginInlineStart: 'auto' }}>
            <path d="M4 40c14 6 26-2 30-14C38 12 30 4 22 8c-9 4-6 20 8 26 16 7 34 2 48-10 8-7 18-10 26-6" stroke="var(--lime)" strokeWidth="1.4" opacity="0.9" />
            <circle cx="118" cy="15" r="6.5" fill="none" stroke="var(--lime)" strokeWidth="1.4" />
            <circle cx="118" cy="15" r="2.6" fill="var(--lime)" />
          </svg>
          <div style={{ fontSize: 34, fontWeight: 300, letterSpacing: '-0.02em' }}>
            <bdi dir="ltr">{pct}</bdi><span style={{ fontSize: 17, color: ink.label }}>%</span>
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <div style={{ fontSize: 15, color: ink.label }}>Paid Amount</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginTop: 4 }}>
            <div style={{ fontSize: 62, fontWeight: 300, letterSpacing: '-0.035em', lineHeight: 1, display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontSize: 26, color: 'rgba(255,255,255,0.62)' }}>$</span>
              <bdi dir="ltr">{n(paid)}</bdi>
            </div>
            <div style={{ fontSize: 15, color: ink.soft, lineHeight: 1.3, paddingBottom: 8 }}>
              Term<b style={{ display: 'block', fontWeight: 400, color: '#fff' }}><bdi dir="ltr">{termMonths} m.</bdi></b>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 26 }}>
          <span style={{ fontSize: 15, color: ink.label }}>Next Payment</span>
          <span style={{ fontSize: 17 }}><bdi dir="ltr">03.05.2024</bdi></span>
        </div>

        <div style={{ marginTop: 26 }}><PaidSplit paid={paid} total={total} /></div>

        {/* the active tab is a raised lip on the sheet below it, not an underline */}
        <div role="tablist" aria-label="Loan views" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 30, padding: '0 4px' }}>
          {(['details', 'timeline', 'updates'] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              style={{
                border: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 19, textTransform: 'capitalize',
                color: tab === t ? '#fff' : ink.soft,
                background: tab === t ? 'rgba(255,255,255,0.14)' : 'transparent',
                padding: tab === t ? '10px 22px 14px' : '10px 4px',
                borderRadius: tab === t ? '20px 20px 0 0' : 0,
                boxShadow: tab === t ? 'inset 0 1px 0 rgba(255,255,255,0.4)' : undefined,
                backdropFilter: tab === t ? 'blur(10px)' : undefined,
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div
          style={{
            margin: '0 -26px', padding: '22px 26px 120px', flex: 1,
            borderRadius: 'var(--r-sheet) var(--r-sheet) 0 0',
            background: 'rgba(255,255,255,0.11)',
            borderTop: '1px solid rgba(255,255,255,0.3)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.34)',
            backdropFilter: 'blur(16px)',
            overflow: 'hidden',
          }}
        >
          {tab === 'timeline' && <MonthGrid />}
          {tab === 'details' && (
            <div style={{ fontSize: 15, lineHeight: 1.7, color: ink.soft }}>
              Fixed rate · <bdi dir="ltr">{termMonths}</bdi> instalments · first drawn 2023.
              <br />Early settlement carries no fee.
            </div>
          )}
          {tab === 'updates' && (
            <div style={{ fontSize: 15, lineHeight: 1.7, color: ink.soft }}>
              One missed instalment on record — September 2023. Nothing outstanding since.
            </div>
          )}
        </div>
      </div>

      <div style={{ position: 'absolute', insetInline: 18, bottom: 22, display: 'flex', gap: 10 }}>
        <button
          type="button"
          style={{
            flex: 1.05, height: 62, border: 0, borderRadius: 31, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            fontFamily: 'inherit', fontSize: 17, fontWeight: 500,
            background: '#fff', color: '#101010',
            boxShadow: 'inset 0 1px 0 #fff, var(--depth-float)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#101010" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
            <rect x="2.5" y="6" width="14" height="10" rx="2.4" /><path d="M2.5 10h14" /><path d="M20 9v6M17 12h6" />
          </svg>
          Make Payment
        </button>
        <button
          type="button"
          style={{
            flex: 1, height: 62, borderRadius: 31, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            fontFamily: 'inherit', fontSize: 17, fontWeight: 500, color: '#fff',
            ...glass(),
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <rect x="4" y="3.5" width="16" height="17" rx="3" /><path d="M8 9h6M8 13h8M8 17h4" />
          </svg>
          Create Dispute
        </button>
      </div>
    </MeshSurface>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ScoreBands + CreditHistory + ScoreScreen — the light twin
   ═══════════════════════════════════════════════════════════════════════════ */

const BANDS = [
  { from: 300, to: 629, dot: '#e8703f', soft: '#e8825c', bg: 'linear-gradient(150deg, #fdece4, #fbdccf)' },
  { from: 630, to: 689, dot: '#e0a11c', soft: '#e0ab34', bg: 'linear-gradient(150deg, #fdf4d8, #fbedc0)' },
  { from: 690, to: 850, dot: '#3f8f2f', soft: '#4e9b3f', bg: 'linear-gradient(150deg, #e8f5e0, #d9efcd)' },
];

export function ScoreBands({ score = 730 }: { score?: number }) {
  /* Which band the reading falls in, and where inside it — derived, so the
     marker cannot be told a position that contradicts the number beside it. */
  const at = useMemo(() => {
    const i = BANDS.findIndex((b) => score <= b.to);
    const band = BANDS[i < 0 ? BANDS.length - 1 : i];
    const idx = i < 0 ? BANDS.length - 1 : i;
    const within = Math.min(1, Math.max(0, (score - band.from) / (band.to - band.from)));
    return { idx, within };
  }, [score]);

  return (
    <div data-bands={at.idx}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 9, position: 'relative' }}>
        {BANDS.map((b, i) => (
          <div key={b.from} style={{ height: 62, borderRadius: 15, background: b.bg, position: 'relative', overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(16,16,16,0.05)' }}>
            <svg width="100%" height="62" viewBox="0 0 124 62" preserveAspectRatio="none" aria-hidden="true">
              <g fill={b.soft} opacity="0.82">
                {[14, 30, 46, 62, 78, 92].map((x, k) => (
                  <circle key={x} cx={x} cy={26 + ((k * 7 + i * 5) % 20)} r="2" />
                ))}
              </g>
              <circle cx="106" cy={i === 2 ? 26 : 38} r="4" fill={b.dot} />
              <circle cx="106" cy={i === 2 ? 26 : 38} r="8" fill="none" stroke={b.dot} strokeWidth="1.4" />
            </svg>
          </div>
        ))}
        {/* the marker: a triangle on a hairline, standing on the reading */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', top: -12, textAlign: 'center',
            insetInlineStart: `calc(${(at.idx / 3) * 100}% + ${at.within * 30 + 2}%)`,
          }}
        >
          <span style={{ display: 'block', width: 0, height: 0, margin: '0 auto', borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: '9px solid #101010' }} />
          <span style={{ display: 'block', width: 1.4, height: 62, background: '#101010', margin: '0 auto' }} />
          <span style={{ display: 'block', fontSize: 13, fontWeight: 600, marginTop: 8 }}><bdi dir="ltr">{n(score)}</bdi></span>
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginTop: 9, fontSize: 13, color: '#9a9a97' }}>
        <span>300</span><span style={{ textAlign: 'center' }}>630</span><span style={{ textAlign: 'end' }}>690</span>
      </div>
    </div>
  );
}

export function CreditHistory({ score = 730, on = '16 Jun' }: { score?: number; on?: string }) {
  return (
    <div
      data-history=""
      style={{
        borderRadius: 'var(--r-sheet)', padding: '18px 18px 12px', background: '#fff', color: '#101010',
        boxShadow: 'inset 0 1.5px 0 #fff, var(--depth-card)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span aria-hidden="true" style={{ width: 42, height: 42, borderRadius: '50%', display: 'grid', placeItems: 'center', boxShadow: 'inset 0 0 0 1.2px rgba(16,16,16,0.16)' }}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#101010" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 7v5l3.5 2" /><path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" /><path d="M3 5v4h4" />
          </svg>
        </span>
        <h3 style={{ margin: 0, flex: 1, fontSize: 19, fontWeight: 500, letterSpacing: '-0.015em', color: '#101010' }}>Credit History</h3>
        <OpenButton quiet dark={false} />
      </div>

      <svg width="100%" viewBox="0 0 340 168" fill="none" style={{ marginTop: 12 }}>
        <g stroke="#e6e6e3" strokeWidth="1" strokeDasharray="3 4">
          <path d="M44 22h292" /><path d="M44 60h292" /><path d="M44 98h292" /><path d="M44 136h292" />
        </g>
        <g fill="#a5a5a2" fontSize="11">
          <text x="14" y="26">730</text><text x="14" y="64">720</text><text x="14" y="102">710</text><text x="14" y="140">700</text>
        </g>
        {/* the two quieter bureaus sit behind: same axis, less ink */}
        <path d="M46 74C74 60 92 58 116 66c26 9 40 34 66 34s40-24 66-30c22-5 34 2 46 12" stroke="#ececea" strokeWidth="2" />
        <path d="M46 96C72 92 88 100 112 106c26 7 42 26 68 22s42-22 68-24c20-2 32 4 42 10" stroke="#f2f2f0" strokeWidth="2" />
        <path d="M46 60h34c10 0 16-2 24-8 8-6 14-8 22-8" stroke="#1a1a1a" strokeWidth="2" />
        <path d="M148 30c14 12 22 44 44 48 20 4 30-6 44-6" stroke="#1a1a1a" strokeWidth="2" />
        <path d="M236 72c16 0 24 12 40 12" stroke="#1a1a1a" strokeWidth="2" />
        <circle cx="82" cy="55" r="4" fill="#1a1a1a" /><circle cx="212" cy="78" r="5" fill="#1a1a1a" /><circle cx="276" cy="84" r="4" fill="#1a1a1a" />
        {/* the reading, in the accent, with a drop line to the date it belongs to */}
        <circle cx="140" cy="28" r="23" fill="var(--lime)" />
        <text x="140" y="33" textAnchor="middle" fontSize="15" fontWeight="600" fill="#101010">{score}</text>
        <path d="M140 51v79" stroke="#8f8f8c" strokeWidth="1.2" strokeDasharray="4 4" />
        <g transform="translate(140 136)"><circle r="13" fill="#f4f4f2" /><path d="M-6 -4h12l-6 8z" fill="#101010" /></g>
        <text x="140" y="164" textAnchor="middle" fontSize="12" fill="#8f8f8c">{on}</text>
      </svg>

      <div style={{ display: 'flex', gap: 20, alignItems: 'center', fontSize: 13, color: '#8f8f8c', padding: '8px 4px 2px' }}>
        {[['Transunion', '#101010'], ['Equifax', '#d3d3d0'], ['Experian', '#e6e6e3']].map(([name, dot]) => (
          <span key={name}>
            <i style={{ width: 7, height: 7, borderRadius: '50%', display: 'inline-block', marginInlineEnd: 7, background: dot }} />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ScoreScreen({ score = 730, name = 'Stewart', delta = 6 }: { score?: number; name?: string; delta?: number }) {
  return (
    <MeshSurface
      variant="light"
      grain="light"
      radius="var(--r-screen)"
      style={{ width: 430, height: 932 }}
    >
      <div style={{ position: 'absolute', inset: 0, padding: '56px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#101010" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
            <path d="M4 16c0-5 3-8 6-8s6 3 6 8" /><path d="M8 8c0 5 3 8 6 8s6-3 6-8" />
          </svg>
          <button type="button" aria-label="Menu" style={roundBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#101010" strokeWidth="1.9" strokeLinecap="round"><path d="M4 7h16M4 12h11M4 17h7" /></svg>
          </button>
          <span style={{ flex: 1 }} />
          <button type="button" aria-label="Support" style={roundBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#101010" strokeWidth="1.5" strokeLinecap="round"><path d="M6 20V8a6 6 0 0 1 12 0v3" /><path d="M18 11h1.5a2 2 0 0 1 0 4H18" /></svg>
          </button>
          <span
            aria-hidden="true"
            style={{
              width: 48, height: 48, borderRadius: '50%', display: 'grid', placeItems: 'center',
              background: 'radial-gradient(70% 70% at 34% 26%, #4b5b6e, #1b2430)',
              boxShadow: 'inset 0 -2px 4px rgba(255,255,255,0.14), var(--depth-avatar)',
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#cdd6e0"><circle cx="12" cy="9" r="3.6" /><path d="M4.5 21c0-4.1 3.4-6.4 7.5-6.4s7.5 2.3 7.5 6.4z" /></svg>
          </span>
        </div>

        <div style={{ marginTop: 34, fontSize: 30, fontWeight: 500, letterSpacing: '-0.028em', lineHeight: 1.18, color: '#101010' }}>
          Hey, {name}!<span style={{ display: 'block', color: '#a9a9a6' }}>Let’s analyze your stats!</span>
        </div>

        <div style={{ marginTop: 22, fontSize: 15, color: ink.labelOnLight }}>
          +<bdi dir="ltr">{delta}</bdi> <span style={{ fontSize: 13 }}>pts</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 2 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
            <span style={{ fontSize: 68, fontWeight: 500, letterSpacing: '-0.045em', lineHeight: 0.92, color: '#101010' }}>
              <bdi dir="ltr">{n(score)}</bdi>
            </span>
            <span style={{ fontSize: 13.5, color: ink.labelOnLight, lineHeight: 1.45, paddingBottom: 8 }}>
              Excellent<br />Upd. 5 Days Ago
            </span>
          </div>
          <button
            type="button"
            style={{
              height: 46, padding: '0 18px', borderRadius: 23, background: 'transparent',
              border: '1.2px solid rgba(16,16,16,0.28)', fontFamily: 'inherit', fontSize: 15,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, marginTop: 6, color: '#101010',
            }}
          >
            Transunion
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#101010" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
          </button>
        </div>

        <div style={{ marginTop: 26 }}><ScoreBands score={score} /></div>
        <div style={{ marginTop: 34 }}><CreditHistory score={score} /></div>
      </div>

      <div
        style={{
          position: 'absolute', insetInlineStart: 22, bottom: 24,
          display: 'flex', alignItems: 'center', gap: 8, padding: 8, borderRadius: 36,
          background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(18px)',
          boxShadow: 'inset 0 1px 0 #fff, var(--depth-float)',
        }}
      >
        {['grid', 'history', 'offers', 'disputes', 'reports'].map((k, i) => (
          <button
            key={k}
            type="button"
            aria-label={k}
            aria-current={i === 0 ? 'page' : undefined}
            style={{
              width: 52, height: 52, border: 0, borderRadius: '50%', cursor: 'pointer',
              display: 'grid', placeItems: 'center',
              background: i === 0 ? '#101010' : '#f4f4f2',
              boxShadow: i === 0 ? 'inset 0 1px 0 rgba(255,255,255,0.2), var(--depth-press)' : undefined,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? '#fff' : '#101010'} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              {i === 0 && <><rect x="4" y="4" width="7" height="7" rx="2" /><rect x="13" y="4" width="7" height="7" rx="2" /><rect x="4" y="13" width="7" height="7" rx="2" /><rect x="13" y="13" width="7" height="7" rx="2" /></>}
              {i === 1 && <><path d="M12 7v5l3.5 2" /><path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" /><path d="M3 5v4h4" /></>}
              {i === 2 && <><circle cx="12" cy="12" r="8.5" /><path d="M9 15l6-6" /></>}
              {i === 3 && <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 10h6M8 14h8" /></>}
              {i === 4 && <><path d="M6 3h9l4 4v14H6z" /><path d="M9 9h4M9 13h6M9 17h3" /></>}
            </svg>
          </button>
        ))}
      </div>
    </MeshSurface>
  );
}

const roundBtn = {
  width: 46, height: 46, border: 0, borderRadius: '50%', cursor: 'pointer',
  display: 'grid', placeItems: 'center', background: '#fff',
  boxShadow: 'inset 0 1px 0 #fff, inset 0 0 0 1px rgba(16,16,16,0.07), var(--depth-round)',
} as const;
