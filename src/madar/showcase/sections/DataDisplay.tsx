import { Section, SectionHeader } from '../SectionHeader';

const shimmerBg: React.CSSProperties = {
  background: 'linear-gradient(90deg, var(--surface-2) 25%, var(--bg-deep) 50%, var(--surface-2) 75%)',
  backgroundSize: '200% 100%', animation: 'shimmer 1.6s linear infinite',
};

function StatusBadge({ token, label }: { token: string; label: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 6, background: `var(--${token}-soft)`, color: `var(--${token})`, fontSize: 12, fontWeight: 600 }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: `var(--${token})` }} />{label}
    </span>
  );
}

function TableRow({ initials, bg, name, plan, status, statusLabel, amount }: { initials: string; bg: string; name: string; plan: string; status: string; statusLabel: string; amount: number }) {
  return (
    <div className="i-surface2" style={{ display: 'grid', gridTemplateColumns: '2fr 1.4fr 1fr 0.8fr', gap: 12, alignItems: 'center', padding: '0 18px', height: 52, borderTop: '1px solid var(--border)', fontSize: 14, transition: 'background 140ms' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600 }}>
        <span style={{ width: 28, height: 28, borderRadius: '50%', background: bg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{initials}</span>{name}
      </span>
      <span style={{ color: 'var(--text-2)' }}>{plan}</span>
      <span><StatusBadge token={status} label={statusLabel} /></span>
      <span style={{ textAlign: 'end', fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{amount}</span>
    </div>
  );
}

export function DataDisplay() {
  return (
    <Section label="Data display">
      <SectionHeader eyebrow="08 · DATA" title="Tables, badges, progress, skeletons">
        52px rows, hairline dividers, tabular numerals end-aligned. Status is always a word with a dot — never color alone.
      </SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20, alignItems: 'start' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.4fr 1fr 0.8fr', gap: 12, padding: '10px 18px', background: 'var(--bg-deep)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-3)' }}>
            <span>CUSTOMER</span><span>PLAN</span><span>STATUS</span><span style={{ textAlign: 'end' }}>AMOUNT</span>
          </div>
          <TableRow initials="سع" bg="var(--accent-soft)" name="سارة العلي" plan="Growth" status="success" statusLabel="Active" amount={199} />
          <TableRow initials="YH" bg="var(--info-soft)" name="Yousef Hamdan" plan="Starter" status="warning" statusLabel="Pending" amount={49} />
          <TableRow initials="رق" bg="var(--warning-soft)" name="ريم القحطاني" plan="Growth" status="danger" statusLabel="Failed" amount={199} />
          <TableRow initials="AD" bg="var(--success-soft)" name="Adam Darwish" plan="Scale" status="success" statusLabel="Active" amount={499} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Storage used</span>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}>68%</span>
            </div>
            <div style={{ height: 8, borderRadius: 6, background: 'var(--surface-2)' }}>
              <div style={{ width: '68%', height: 8, borderRadius: 6, background: 'var(--accent)', transition: 'width 560ms cubic-bezier(0.22,1,0.36,1)' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 6 }}>
              <span style={{ display: 'flex' }}>
                <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent-soft)', border: '2px solid var(--surface)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>سع</span>
                <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--info-soft)', border: '2px solid var(--surface)', marginInlineStart: -9, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>YH</span>
                <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--warning-soft)', border: '2px solid var(--surface)', marginInlineStart: -9, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>رق</span>
                <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--surface-2)', border: '2px solid var(--surface)', marginInlineStart: -9, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--text-2)' }}>+4</span>
              </span>
              <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>Avatar stack · −9px overlap</span>
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Skeleton — shape-true, never spinners</div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ width: 40, height: 40, borderRadius: '50%', flex: 'none', ...shimmerBg }} />
              <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ height: 12, borderRadius: 6, width: '60%', ...shimmerBg }} />
                <span style={{ height: 12, borderRadius: 6, width: '85%', ...shimmerBg }} />
              </span>
            </div>
            <div style={{ height: 64, borderRadius: 6, ...shimmerBg }} />
          </div>
        </div>
      </div>
    </Section>
  );
}
