import { useMemo, useState } from 'react';

/* ────────────────────────────────────────────────────────────────────────
   Dispatch — several orders, one address, one delivery.

   The owner described the domain precisely: a customer places more than one
   order; the orders are recorded together; each has a courier; a courier can
   hand an order to another; four orders to one address are **one** delivery
   because the address is one; a far delivery can cost double a normal one; and
   one customer can carry a discount another does not.

   Every one of those is a *derivation*, which is why this is a family and not a
   form. The delivery is not a field someone fills in — it follows from the
   address. The fee is not typed — it is a base times a distance band minus a
   customer's rate. So the law that governs this file is §19: the finding is the
   coincidence, and it is drawn rather than asserted.

   What was checked before writing a line of it, and why none of it was reused:

   · `AllocationBar` (energy.tsx) is also a segmented bar, but it draws *shares
     of a budget*. A fee is not a share — it is an arithmetic with a
     **subtraction** in it, and a discount has no share to occupy. It needed a
     segment that reads as length taken away, which a share bar cannot express.
   · `DutyCycle` and `DayStrip` (schedule.tsx) are spans on a time axis, and a
     handoff was very nearly drawn as one. It would have been the same shape
     with new labels — the same trap the outage timeline fell into. A transfer's
     information is not *when*; it is **what moved and what each courier now
     carries**. So `CourierHandoff` draws two loads and the one order crossing
     between them, not a timeline.
   · `LoadComb` (energy.tsx) draws a counted quantity in units, and the order
     count here is drawn counted for the same reason (§15-a) — but as the stubs
     of the orders themselves, which are the things being counted, rather than
     as an abstract comb.
   · `FileCard` (surfaces) is an entity card; an order stub is not a card. It
     carries no independent surface, because an order that shares a delivery is
     *inside* that delivery and must read that way.
──────────────────────────────────────────────────────────────────────── */

const ar = (n: number, digits = 0) =>
  n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });

/** The distance bands. A band is a multiplier on the base fee, not a fee of its
    own: the owner's "double" has to stay literally double after any edit here. */
export const DISTANCE = {
  near: { factor: 1, ar: 'داخل النطاق', color: 'var(--info)' },
  far: { factor: 2, ar: 'خارج النطاق', color: 'var(--warning)' },
} as const;
export type Distance = keyof typeof DISTANCE;

export interface Order {
  id: string;
  /** What the customer asked for, in one line. */
  item: string;
  address: string;
  /** Piastres, or whatever the smallest unit is; the component never divides. */
  amount: number;
  courier: string;
  /** Whose order it is. Needed for more than a label: the delivery rate belongs
      to the customer, and "four orders to one door" is only true within one
      customer's orders. */
  customer: string;
  /** Cash on delivery, or already paid. The difference is not a label — it is
      money the courier is carrying, and it moves when the order moves. */
  pay: 'cod' | 'prepaid';
}

export interface DeliveryGroupProps {
  orders?: Order[];
  /** The fee for one delivery inside the near band, before any multiplier. */
  baseFee?: number;
  distance?: Distance;
  /** Overrides the customer's own rate. Normally left alone: the rate belongs to
      the customer, and passing it in is how a per-customer discount quietly
      becomes a per-call-site one. */
  discountPct?: number;
  customer?: string;
  currency?: string;
}

/* One dataset for the whole family, and the couriers are inside it rather than
   declared beside it. Two views read the same eight rows: the customer's, which
   groups by address, and the dispatcher's, which groups by courier. Declaring
   the couriers separately would mean two ledgers that can disagree — and a
   courier list that says someone holds an order the order does not agree with is
   the exact bug this family exists to make visible. */
const ORDERS: Order[] = [
  { id: 'A-4471', item: 'ماء ٦ عبوات', address: 'حيّ النرجس · شارع ٢٢ · منزل ٧', amount: 1800, courier: 'سالم', customer: 'أبو ريّان', pay: 'cod' },
  { id: 'A-4472', item: 'خبز وأجبان', address: 'حيّ النرجس · شارع ٢٢ · منزل ٧', amount: 2450, courier: 'سالم', customer: 'أبو ريّان', pay: 'cod' },
  { id: 'A-4473', item: 'غاز أسطوانة', address: 'حيّ النرجس · شارع ٢٢ · منزل ٧', amount: 5200, courier: 'سالم', customer: 'أبو ريّان', pay: 'prepaid' },
  { id: 'A-4474', item: 'دواء بوصفة', address: 'حيّ النرجس · شارع ٢٢ · منزل ٧', amount: 900, courier: 'سالم', customer: 'أبو ريّان', pay: 'cod' },
  /* the fifth order is the reason grouping has to be derived rather than
     declared: same customer, different address, so it is its own delivery */
  { id: 'A-4475', item: 'قرطاسية مكتب', address: 'حيّ الياسمين · شارع ٤ · مكتب ٣', amount: 3100, courier: 'هند', customer: 'أبو ريّان', pay: 'prepaid' },
  { id: 'A-4480', item: 'خضار صندوق', address: 'حيّ الربيع · شارع ٩ · منزل ٢', amount: 4300, courier: 'سالم', customer: 'أمّ ليان', pay: 'cod' },
  { id: 'A-4481', item: 'قطع غيار', address: 'الصناعية · ورشة ١٤', amount: 7600, courier: 'هند', customer: 'ورشة الزهراء', pay: 'cod' },
  { id: 'A-4482', item: 'كتب مدرسية', address: 'حيّ السلام · شارع ٣ · منزل ١١', amount: 2200, courier: 'كاظم', customer: 'مكتبة الرافدين', pay: 'prepaid' },
];

/* The delivery rate belongs to the customer, not to the call site. Two customers
   with different rates, because "a discount for one customer and not another" is
   only demonstrated when the same component draws both. */
export const RATES: Record<string, number> = {
  'أبو ريّان': 20,
  'أمّ ليان': 0,
  'ورشة الزهراء': 10,
  'مكتبة الرافدين': 0,
};

/* One address, one delivery — the grouping key. Trimmed and space-collapsed
   because "شارع ٢٢" and "شارع  ٢٢" are the same doorstep, and a courier who
   drives twice because of a double space is a real cost. */
const key = (address: string) => address.replace(/\s+/g, ' ').trim();

export interface Delivery {
  address: string;
  orders: Order[];
  /** What the goods themselves come to, before delivery. */
  goods: number;
  fee: number;
  /** What the same orders would have cost delivered one by one. */
  ifSeparate: number;
  /** Cash the courier will be handed at this door — the unpaid goods, plus the
      delivery fee, which is collected once per door because the door is visited
      once. A prepaid order at the same door contributes nothing to it, which is
      why the amount cannot be read off the order total. */
  cash: number;
}

/** The deliveries are derived from the addresses. Nothing declares them. */
export function groupByAddress(orders: Order[], feePerDelivery: number): Delivery[] {
  const bins = new Map<string, Order[]>();
  for (const order of orders) {
    const k = key(order.address);
    const bin = bins.get(k);
    if (bin) bin.push(order);
    else bins.set(k, [order]);
  }
  return [...bins.values()].map((bin) => {
    const cod = bin.filter((o) => o.pay === 'cod');
    return {
      address: bin[0].address,
      orders: bin,
      goods: bin.reduce((sum, o) => sum + o.amount, 0),
      fee: feePerDelivery,
      ifSeparate: feePerDelivery * bin.length,
      cash: cod.length ? cod.reduce((sum, o) => sum + o.amount, 0) + feePerDelivery : 0,
    };
  });
}

/* ── DeliveryGroup ───────────────────────────────────────────────────────────
   Four orders and one delivery, because the address is one. The count is drawn
   counted (§15-a): four stubs joined by a brace that spans exactly the orders
   that share the doorstep and no others — so the fifth order, at a different
   address, falls outside the brace on its own. The brace is the finding, drawn
   where the coincidence actually is (§19), which is the same rule that governs
   `OutageCompare`.

   The fee is then drawn as the arithmetic it is, at one scale, with the
   references it is measured against (§14):

     base ──────────── the near-band fee, and the reference for "double"
     surcharge ─────── the far band, exactly as long as base, because ×2
     discount ──────── length removed, hatched, because it was never charged

   Which means "double" and "discounted" are read off the drawing rather than
   from words beside it. */
export function DeliveryGroup({
  orders = ORDERS,
  baseFee = 1500,
  distance = 'far',
  discountPct,
  customer = 'أبو ريّان',
  currency = 'د.ع',
}: DeliveryGroupProps) {
  const band = DISTANCE[distance];
  const feePerDelivery = baseFee * band.factor;

  /* One customer's orders, because a doorstep is only shared within one
     customer's set — and the rate is read from the customer rather than passed
     in, so two customers drawn by the same component get different fees for the
     same distance. */
  const mine = useMemo(() => orders.filter((o) => o.customer === customer), [orders, customer]);
  const rate = discountPct ?? RATES[customer] ?? 0;

  const deliveries = useMemo(() => groupByAddress(mine, feePerDelivery), [mine, feePerDelivery]);

  /* The money, derived in one place so the drawing and the total cannot
     disagree: every segment below is a slice of these numbers. */
  const money = useMemo(() => {
    const base = baseFee * deliveries.length;
    const surcharge = baseFee * (band.factor - 1) * deliveries.length;
    const discount = Math.round(((base + surcharge) * rate) / 100);
    const goods = deliveries.reduce((sum, d) => sum + d.goods, 0);
    return { base, surcharge, discount, goods, delivery: base + surcharge - discount };
  }, [baseFee, band.factor, deliveries, rate]);

  /* The bar is scaled to the fee before the discount, so the discount can be
     drawn as length *taken off the end* rather than as a share of a smaller
     whole — a discount that shrinks its own scale cannot be seen.

     The discount is therefore drawn *over* the end of the track rather than
     appended to it. The first attempt appended it as a third flex child, which
     made the row 120% wide and `overflow: hidden` clipped the discount away
     entirely — and the gate passed, because `getBoundingClientRect` reports the
     laid-out width of a clipped box. §22 again, one layer deeper: measure the
     paint, not the box. */
  const scale = money.base + money.surcharge;
  const pct = (n: number) => `${(n / scale) * 100}%`;

  return (
    <div
      data-dispatch-group=""
      data-edge="lit"
      style={{
        width: '100%', maxWidth: 460, display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)',
        padding: 'var(--sp-5)', background: 'var(--surface)', borderRadius: 'var(--r-md)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--sp-3)' }}>
        <b style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{customer}</b>
        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
          <bdi>{ar(mine.length)} طلبات</bdi> · <bdi>{ar(deliveries.length)} توصيل</bdi>
        </span>
      </div>

      {/* ── the orders, and the brace that groups them ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
        {deliveries.map((delivery) => (
          <div
            key={key(delivery.address)}
            data-delivery={delivery.orders.length}
            style={{ display: 'grid', gridTemplateColumns: '11px 1fr', gap: 'var(--sp-3)', alignItems: 'stretch' }}
          >
            {/* The brace spans the shared orders and nothing else. One order
                alone gets a tick, not a brace: a brace around one thing claims a
                grouping that is not there. */}
            <span
              aria-hidden="true"
              data-brace={delivery.orders.length > 1 ? 'group' : 'single'}
              style={{
                borderInlineStartWidth: 1,
                borderBlockStartWidth: delivery.orders.length > 1 ? 1 : 0,
                borderBlockEndWidth: delivery.orders.length > 1 ? 1 : 0,
                borderInlineEndWidth: 0,
                borderStyle: 'solid',
                borderColor: 'var(--border-strong)',
                borderStartStartRadius: 2,
                borderEndStartRadius: 2,
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
              <div style={{ fontSize: 12, color: 'var(--text-2)', display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>
                  {delivery.orders.length > 1 ? `×${ar(delivery.orders.length)}` : '·'}
                </span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{delivery.address}</span>
              </div>
              {delivery.orders.map((order) => (
                <div
                  key={order.id}
                  data-order={order.id}
                  style={{
                    display: 'flex', alignItems: 'baseline', gap: 'var(--sp-3)',
                    paddingBlock: 4, borderBlockEndWidth: 1, borderBlockEndStyle: 'solid',
                    borderBlockEndColor: 'var(--border)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', flex: 'none' }}>{order.id}</span>
                  <span style={{ fontSize: 12.5, color: 'var(--text)', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.item}</span>
                  {/* A prepaid amount is not cash the courier will hold, so it
                      is not drawn like one: hatched, because at this door it is
                      not a realised collection (§15-b). */}
                  <span
                    data-pay={order.pay}
                    className={order.pay === 'prepaid' ? 'madar-hatch' : undefined}
                    style={{
                      fontSize: 12, flex: 'none', fontVariantNumeric: 'tabular-nums',
                      color: order.pay === 'prepaid' ? 'var(--text-3)' : 'var(--text-2)',
                      paddingInline: order.pay === 'prepaid' ? 4 : 0,
                      borderRadius: 2,
                      ...(order.pay === 'prepaid' ? { ['--madar-hatch-color' as string]: 'var(--border)' } : null),
                    }}
                  >
                    <bdi dir="ltr">{ar(order.amount)}</bdi>
                  </span>
                  <span style={{ fontSize: 11.5, color: 'var(--text-3)', flex: 'none' }}>{order.courier}</span>
                </div>
              ))}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)', fontSize: 11.5, color: 'var(--text-3)' }}>
                {delivery.orders.length > 1 && (
                  <span>
                    عنوانٌ واحد، فأجرة واحدة — لا <bdi dir="ltr">{ar(delivery.orders.length)}</bdi>:
                    {' '}
                    <bdi dir="ltr">{ar(delivery.fee)}</bdi> بدلًا من <bdi dir="ltr">{ar(delivery.ifSeparate)}</bdi> {currency}
                  </span>
                )}
                {/* The fee is collected once per door because the door is opened
                    once — so cash at the door is not the order total, and a
                    prepaid order among unpaid ones changes it. */}
                <span data-cash={delivery.cash} style={{ color: delivery.cash ? 'var(--text-2)' : 'var(--text-3)' }}>
                  {delivery.cash
                    ? <>يُستلَم عند الباب <bdi dir="ltr">{ar(delivery.cash)}</bdi> {currency}</>
                    : <>مدفوعٌ سلفًا — لا نقد عند الباب</>}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── the fee, drawn as its own arithmetic ── */}
      <div data-fee="" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--sp-3)' }}>
          <span style={{ fontSize: 12, color: 'var(--text-2)' }}>أجرة التوصيل</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>
            <bdi dir="ltr">{ar(money.delivery)}</bdi> {currency}
          </span>
        </div>

        <div
          style={{
            position: 'relative', display: 'flex', height: 16, width: '100%',
            backgroundColor: 'var(--surface-2)', borderRadius: 2, overflow: 'hidden',
          }}
        >
          {/* base — and the reference the surcharge is measured against */}
          <span
            data-seg="base"
            style={{ width: pct(money.base), backgroundColor: 'var(--info)', flex: 'none' }}
          />
          {/* surcharge — exactly as long as base when the band doubles, which is
              what makes "ضعف" a thing you see instead of a thing you are told */}
          {money.surcharge > 0 && (
            <span
              data-seg="surcharge"
              style={{ width: pct(money.surcharge), backgroundColor: band.color, flex: 'none' }}
            />
          )}
          {/* discount — length taken off the end of the fee, drawn over it.
              Hatched, because it is not a charge that was made; §15-b: the hatch
              means "not a realised measurement". And its leading edge is the
              drawn reference (§14) — it says where the fee actually ends, with
              the removed length still visible beyond it. */}
          {money.discount > 0 && (
            <span
              data-seg="discount"
              data-ref="undiscounted"
              className="madar-hatch"
              style={{
                position: 'absolute', insetBlock: 0, insetInlineEnd: 0,
                width: pct(money.discount),
                backgroundColor: 'color-mix(in srgb, var(--surface-2) 82%, transparent)',
                borderInlineStartWidth: 1,
                borderInlineStartStyle: 'solid',
                borderInlineStartColor: 'var(--text-3)',
                ['--madar-hatch-color' as string]: 'var(--success)',
              }}
            />
          )}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)', fontSize: 11.5, color: 'var(--text-3)' }}>
          <span><span style={{ display: 'inline-block', width: 8, height: 8, backgroundColor: 'var(--info)', borderRadius: 1, marginInlineEnd: 5 }} />أساس <bdi dir="ltr">{ar(money.base)}</bdi></span>
          {money.surcharge > 0 && (
            <span>
              <span style={{ display: 'inline-block', width: 8, height: 8, backgroundColor: band.color, borderRadius: 1, marginInlineEnd: 5 }} />
              {band.ar} ×<bdi dir="ltr">{ar(band.factor)}</bdi> · <bdi dir="ltr">+{ar(money.surcharge)}</bdi>
            </span>
          )}
          {money.discount > 0 && (
            <span>
              <span className="madar-hatch" style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 1, marginInlineEnd: 5, backgroundColor: 'var(--surface-2)', ['--madar-hatch-color' as string]: 'var(--success)' }} />
              خصم {ar(rate)}٪ · <bdi dir="ltr">−{ar(money.discount)}</bdi>
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--sp-3)', paddingBlockStart: 8, borderBlockStart: '1px solid var(--border)' }}>
          <span style={{ fontSize: 12, color: 'var(--text-2)' }}>البضاعة + التوصيل</span>
          <b data-total="" style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>
            <bdi dir="ltr">{ar(money.goods + money.delivery)}</bdi> {currency}
          </b>
        </div>
      </div>
    </div>
  );
}

/* ── CourierHandoff ──────────────────────────────────────────────────────────
   Moving an order from one courier to another. Drawn as the two loads, not as a
   timeline — a timeline would have been `DutyCycle` again with different labels,
   and the question a dispatcher actually asks is not *when* the handoff happened
   but **what each courier is carrying now**.

   So each courier is a row of counted stubs (§15-a), and the moved order is
   drawn in both rows at once: hatched in the row it left, because it is no
   longer a load there, and solid in the row that received it (§15-b). The
   rebalance is therefore visible as a shape — one row got shorter, one longer —
   rather than as a toast that says "transferred".

   Operable by keyboard because a dispatcher does this a hundred times a shift:
   the orders are radio-like, arrows move along the writing direction, and the
   destination is a button per courier.

   Two things the transfer *derives*, which is what makes it more than a move:

   · **The cash moves with the order.** A courier holding unpaid goods is holding
     money, and that is the number a shift is reconciled against. Hand the order
     over and the liability follows it — drawn, not recalculated somewhere else.
   · **A split door is a finding.** Four orders to one doorstep are one delivery;
     give one of them to another courier and the door is now visited twice, which
     is the exact waste this whole family exists to prevent. So the split is
     derived from the same address key that formed the group and drawn on both
     rows — the transfer shows its own cost instead of succeeding quietly. */
export interface Courier {
  id: string;
  name: string;
  /** Order ids the courier is holding before any transfer. */
  holding: string[];
}

/** The couriers are derived from the orders, not listed beside them. */
export function couriersOf(orders: Order[]): Courier[] {
  const bins = new Map<string, string[]>();
  for (const o of orders) {
    const bin = bins.get(o.courier);
    if (bin) bin.push(o.id);
    else bins.set(o.courier, [o.id]);
  }
  return [...bins].map(([name, holding]) => ({ id: name, name, holding }));
}

export function CourierHandoff({ orders = ORDERS }: { orders?: Order[] }) {
  const couriers = useMemo(() => couriersOf(orders), [orders]);
  /* Only the moves are state. The loads are derived from them, so an undo is a
     removal rather than a second bookkeeping path that can disagree. */
  const [moves, setMoves] = useState<Record<string, string>>({});
  const [picked, setPicked] = useState<string | null>('A-4473');

  const rtl = typeof document !== 'undefined' ? getComputedStyle(document.documentElement).direction === 'rtl' : true;

  const byId = useMemo(() => new Map(orders.map((o) => [o.id, o])), [orders]);

  const origin = useMemo(() => {
    const map: Record<string, string> = {};
    for (const c of couriers) for (const id of c.holding) map[id] = c.id;
    return map;
  }, [couriers]);

  /* Who holds an order now: the move if there is one, otherwise where it began.
     One function, so no view can disagree with another about it. */
  const heldBy = useMemo(() => {
    const map: Record<string, string> = { ...origin };
    for (const [id, to] of Object.entries(moves)) map[id] = to;
    return map;
  }, [origin, moves]);

  /* A door held by more than one courier is visited more than once. Derived from
     the same address key that formed the delivery groups, so the two views
     cannot disagree about what "one door" means. */
  const splitDoors = useMemo(() => {
    const doors = new Map<string, Set<string>>();
    for (const o of orders) {
      const k = key(o.address);
      const set = doors.get(k) ?? new Set();
      set.add(heldBy[o.id]);
      doors.set(k, set);
    }
    return new Map([...doors].filter(([, holders]) => holders.size > 1));
  }, [orders, heldBy]);

  const rows = useMemo(
    () =>
      couriers.map((c) => {
        const kept = c.holding.filter((id) => !moves[id] || moves[id] === c.id);
        const left = c.holding.filter((id) => moves[id] && moves[id] !== c.id);
        const gained = Object.entries(moves)
          .filter(([id, to]) => to === c.id && origin[id] !== c.id)
          .map(([id]) => id);
        const holds = [...kept, ...gained];
        /* Cash the courier is answerable for: the unpaid goods in hand. It moves
           when the order moves, which is the whole point of deriving it. */
        const cash = holds.reduce((sum, id) => {
          const o = byId.get(id);
          return sum + (o && o.pay === 'cod' ? o.amount : 0);
        }, 0);
        const splits = [...splitDoors.keys()].filter((door) =>
          holds.some((id) => key(byId.get(id)?.address ?? '') === door));
        return { courier: c, kept, left, gained, holds, cash, splits, load: holds.length };
      }),
    [couriers, moves, origin, byId, splitDoors],
  );

  const all = useMemo(() => couriers.flatMap((c) => c.holding), [couriers]);
  const holderOf = (id: string) => heldBy[id];

  const move = (to: string) => {
    if (!picked) return;
    setMoves((m) => {
      const next = { ...m };
      if (to === origin[picked]) delete next[picked];
      else next[picked] = to;
      return next;
    });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const forward = rtl ? 'ArrowLeft' : 'ArrowRight';
    const back = rtl ? 'ArrowRight' : 'ArrowLeft';
    const step: Record<string, number> = { [forward]: 1, [back]: -1, Home: -all.length, End: all.length };
    if (!(e.key in step)) return;
    e.preventDefault();
    const at = picked ? all.indexOf(picked) : 0;
    setPicked(all[Math.min(all.length - 1, Math.max(0, at + step[e.key]))]);
  };

  const moved = picked ? holderOf(picked) !== origin[picked] : false;

  return (
    <div
      data-handoff=""
      data-edge="lit"
      style={{
        width: '100%', maxWidth: 460, display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)',
        padding: 'var(--sp-5)', background: 'var(--surface)', borderRadius: 'var(--r-md)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--sp-3)' }}>
        <b style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>تحويل طلب بين المندوبين</b>
        <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>
          {picked ? <>المحدَّد <bdi dir="ltr">{picked}</bdi></> : 'اختر طلبًا'}
        </span>
      </div>

      <div
        role="radiogroup"
        aria-label="الطلبات"
        onKeyDown={onKeyDown}
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}
      >
        {rows.map(({ courier, kept, left, gained, load, cash, splits }) => (
          <div key={courier.id} data-courier={courier.id} data-load={load} data-cash={cash} data-splits={splits.length} style={{ display: 'grid', gridTemplateColumns: '5.5rem 1fr', gap: 'var(--sp-3)', alignItems: 'center' }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 12.5, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{courier.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', fontVariantNumeric: 'tabular-nums' }}>
                <bdi dir="ltr">{ar(load)}</bdi>
                {load !== courier.holding.length && (
                  <> <span style={{ color: load > courier.holding.length ? 'var(--success)' : 'var(--warning)' }}>
                    ({load > courier.holding.length ? '+' : '−'}<bdi dir="ltr">{ar(Math.abs(load - courier.holding.length))}</bdi>)
                  </span></>
                )}
              </div>
              {/* the money in hand, derived from what is held */}
              <div style={{ fontSize: 10.5, color: cash ? 'var(--text-2)' : 'var(--text-3)', fontVariantNumeric: 'tabular-nums' }}>
                {cash ? <>نقدًا <bdi dir="ltr">{ar(cash)}</bdi></> : 'لا نقد'}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
              {[...kept, ...gained].map((id) => (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={picked === id}
                  aria-label={`طلب ${id} · ${courier.name}`}
                  tabIndex={picked === id ? 0 : -1}
                  onClick={() => setPicked(id)}
                  data-stub={gained.includes(id) ? 'gained' : 'held'}
                  style={{
                    width: 26, height: 30, padding: 0, cursor: 'pointer',
                    border: picked === id ? '1px solid var(--accent)' : '1px solid var(--border)',
                    borderRadius: 2,
                    backgroundColor: gained.includes(id) ? 'var(--success-soft, var(--surface-2))' : 'var(--surface-2)',
                    boxShadow: picked === id ? 'inset 0 0 0 1px var(--accent)' : undefined,
                  }}
                />
              ))}
              {/* a door this courier now shares with another: the transfer's own
                  cost, drawn on the row rather than reported after it */}
              {splits.length > 0 && (
                <span
                  data-split-door={splits.length}
                  style={{
                    fontSize: 10.5, color: 'var(--warning)', paddingInline: 6, paddingBlock: 2,
                    borderRadius: 2, border: '1px solid var(--warning)', whiteSpace: 'nowrap',
                  }}
                >
                  بابٌ مقسوم ×<bdi dir="ltr">{ar(splits.length)}</bdi>
                </span>
              )}
              {/* the gap it left: hatched, because the load is no longer there */}
              {left.map((id) => (
                <span
                  key={id}
                  aria-hidden="true"
                  data-stub="left"
                  className="madar-hatch"
                  style={{
                    width: 26, height: 30, borderRadius: 2,
                    border: '1px dashed var(--border-strong)',
                    backgroundColor: 'var(--surface-2)',
                    ['--madar-hatch-color' as string]: 'var(--warning)',
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)', alignItems: 'center', paddingBlockStart: 'var(--sp-3)', borderBlockStart: '1px solid var(--border)' }}>
        <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>حوّله إلى</span>
        {couriers.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => move(c.id)}
            disabled={!picked || holderOf(picked) === c.id}
            data-target={c.id}
            style={{
              fontSize: 12, padding: '5px 11px', cursor: picked && holderOf(picked) !== c.id ? 'pointer' : 'default',
              border: '1px solid var(--border)', borderRadius: 3,
              backgroundColor: 'var(--surface-2)', color: 'var(--text)',
              opacity: !picked || holderOf(picked) === c.id ? 0.45 : 1,
            }}
          >
            {c.name}
          </button>
        ))}
        {moved && picked && (
          <button
            type="button"
            onClick={() => move(origin[picked])}
            style={{
              fontSize: 12, padding: '5px 11px', cursor: 'pointer', marginInlineStart: 'auto',
              border: '1px solid var(--border-strong)', borderRadius: 3,
              backgroundColor: 'transparent', color: 'var(--text-2)',
            }}
          >
            أعِده
          </button>
        )}
      </div>
    </div>
  );
}

/* ── DeliveryRun ─────────────────────────────────────────────────────────────
   A courier's stops, and which one is late.

   The obvious component here is a three-dot tracker — received, on the way,
   delivered — and it was refused: `Stepper` in `forms.tsx` already draws stages
   with a current position, and three dots would be that with new labels and no
   new answer. A dispatcher does not ask which stage a delivery is in; the app
   already knows. They ask **which stop is late, and is it that stop's fault**.

   That question has an answer no single number carries, because a run is a chain:
   a stop that overruns pushes every stop behind it. So the delay is split into
   the part a stop inherited and the part it caused (§17 — offset is state, length
   is duration, and the fault is a shape rather than a threshold):

     inherited ──── the run was already behind when this stop began
     within ─────── the time it was promised, drawn to the promise
     overrun ────── past the promise tick: this stop's own doing

   The tick is the drawn reference (§14), so "late" is a length past a mark rather
   than a red word. Stops not yet reached are hatched, because their duration is
   not a measurement yet (§15-b) — a plan drawn solid claims a reading nobody
   took.

   Not a timeline: no absolute axis, no spans positioned by clock time. That
   shape is `DutyCycle`, and reusing it here would have answered "when" to a
   question that asked "whose fault". */
export interface Stop {
  address: string;
  /** Minutes this stop was promised, door to door. */
  promise: number;
  /** Minutes it actually took. Absent means the courier has not reached it. */
  actual?: number;
  orders: number;
}

const STOPS: Stop[] = [
  { address: 'حيّ النرجس · شارع ٢٢ · منزل ٧', promise: 18, actual: 16, orders: 4 },
  { address: 'حيّ الربيع · شارع ٩ · منزل ٢', promise: 12, actual: 27, orders: 1 },
  { address: 'حيّ السلام · شارع ٣ · منزل ١١', promise: 15, actual: 17, orders: 1 },
  { address: 'الصناعية · ورشة ١٤', promise: 20, orders: 1 },
  { address: 'حيّ الياسمين · شارع ٤ · مكتب ٣', promise: 14, orders: 1 },
];

export interface RunStop extends Stop {
  /** Minutes the run was already behind when this stop started. */
  inherited: number;
  /** Minutes past its own promise. Negative means it made time up. */
  own: number;
  done: boolean;
}

/** The carry is the whole point: lateness propagates, so it is accumulated once
    here rather than recomputed per row. */
export function runStops(stops: Stop[]): RunStop[] {
  let carry = 0;
  return stops.map((stop) => {
    const inherited = carry;
    const own = stop.actual === undefined ? 0 : stop.actual - stop.promise;
    if (stop.actual !== undefined) carry += own;
    return { ...stop, inherited, own, done: stop.actual !== undefined };
  });
}

export function DeliveryRun({ stops = STOPS, courier = 'سالم' }: { stops?: Stop[]; courier?: string }) {
  const rows = useMemo(() => runStops(stops), [stops]);

  /* One scale for every row, or the rows cannot be compared: the widest row is
     an inherited delay plus a promise plus an overrun. */
  const scale = Math.max(...rows.map((r) => r.inherited + r.promise + Math.max(0, r.own)));
  const pct = (n: number) => `${(n / scale) * 100}%`;

  const late = rows.filter((r) => r.done && r.own > 0);
  const worst = late.reduce<RunStop | null>((w, r) => (!w || r.own > w.own ? r : w), null);
  const behind = rows.reduce((c, r) => c + (r.done ? r.own : 0), 0);

  return (
    <div
      data-run=""
      data-edge="lit"
      style={{
        width: '100%', maxWidth: 460, display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)',
        padding: 'var(--sp-5)', background: 'var(--surface)', borderRadius: 'var(--r-md)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--sp-3)' }}>
        <b style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>خطّ سير {courier}</b>
        <span data-behind={behind} style={{ fontSize: 12, color: behind > 0 ? 'var(--danger)' : 'var(--success)', fontVariantNumeric: 'tabular-nums' }}>
          {behind > 0
            ? <>متأخّر <bdi dir="ltr">{ar(behind)}</bdi> دقيقة</>
            : <>في الوقت</>}
        </span>
      </div>

      <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
        {rows.map((r, i) => (
          <li
            key={r.address}
            data-stop={i + 1}
            data-own={r.own}
            data-inherited={r.inherited}
            data-done={r.done ? '' : undefined}
            style={{ display: 'grid', gap: 5 }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontSize: 11.5, minWidth: 0 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--text-3)', flex: 'none' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ color: 'var(--text-2)', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.address}</span>
              {r.orders > 1 && <span style={{ fontSize: 10.5, color: 'var(--text-3)', flex: 'none' }}>×<bdi dir="ltr">{ar(r.orders)}</bdi></span>}
              <span style={{ flex: 'none', color: r.own > 0 ? 'var(--danger)' : 'var(--text-3)', fontVariantNumeric: 'tabular-nums' }}>
                {!r.done
                  ? <>لم يُصل</>
                  : r.own > 0
                    ? <>+<bdi dir="ltr">{ar(r.own)}</bdi></>
                    : r.own < 0
                      ? <>−<bdi dir="ltr">{ar(-r.own)}</bdi></>
                      : <>في الوقت</>}
              </span>
            </div>

            <div style={{ position: 'relative', display: 'flex', height: 14, width: '100%', backgroundColor: 'var(--surface-2)', borderRadius: 2 }}>
              {/* inherited: real time lost, but not at this door */}
              {r.inherited > 0 && (
                <span
                  data-seg="inherited"
                  className="madar-hatch"
                  style={{
                    width: pct(r.inherited), flex: 'none', borderStartStartRadius: 2, borderEndStartRadius: 2,
                    backgroundColor: 'var(--surface-2)',
                    ['--madar-hatch-color' as string]: 'var(--warning)',
                  }}
                />
              )}
              {/* the promised duration. Hatched while unreached: a plan is not a
                  measurement, and drawing it solid would claim one. */}
              <span
                data-seg="within"
                className={r.done ? undefined : 'madar-hatch'}
                style={{
                  width: pct(r.promise), flex: 'none',
                  backgroundColor: r.done ? 'var(--accent)' : 'var(--surface-2)',
                  ...(r.done ? null : { ['--madar-hatch-color' as string]: 'var(--border-strong)' }),
                }}
              />
              {/* past the tick: this stop's own doing */}
              {r.own > 0 && (
                <span data-seg="overrun" style={{ width: pct(r.own), flex: 'none', backgroundColor: 'var(--danger)' }} />
              )}
              {/* the drawn reference: where the promise ended */}
              <span
                aria-hidden="true"
                data-tick=""
                style={{
                  position: 'absolute', insetBlock: -2, insetInlineStart: pct(r.inherited + r.promise),
                  borderInlineStartWidth: 1, borderInlineStartStyle: 'solid',
                  borderInlineStartColor: r.own > 0 ? 'var(--text)' : 'var(--text-3)',
                }}
              />
            </div>
          </li>
        ))}
      </ol>

      <p data-verdict={worst ? 'stop' : 'clear'} style={{ margin: 0, fontSize: 11.5, lineHeight: 1.7, color: 'var(--text-2)' }}>
        {worst
          ? <>
              التأخير كلّه من محطّة واحدة: <bdi dir="ltr">{String(rows.indexOf(worst) + 1).padStart(2, '0')}</bdi>
              {' '}تجاوزت وعدها <bdi dir="ltr">{ar(worst.own)}</bdi> دقيقة، وما بعدها بدأ متأخّرًا لا مقصّرًا —
              والفرق بين اللومَين هو ما يفصل «عالِج المحطّة» عن «عالِج المندوب».
            </>
          : <>لا محطّة تجاوزت وعدها، فالخطّ في وقته ولا شيء يُعالَج.</>}
      </p>
    </div>
  );
}
