/* anti-slop-ui #19 and #17: the mark was a sparkle glyph from an icon set, which
   is the "AI magic" tell the standard names first. A wordmark's monogram is the
   opposite claim — it says which product this is, not that something magical
   happens here. Drawn rather than imported, so it belongs to NOVA. */
export default function BrandMark({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true"
      stroke="currentColor" strokeWidth="2" strokeLinecap="square"
    >
      <path d="M4.5 15.5V4.5l11 11V4.5" />
    </svg>
  );
}
