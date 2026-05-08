/**
 * Sub-page Hero — breadcrumb + title.
 * 두손누리 sub-page 패턴: 320px 높이 + green BG image + 흰색 카피.
 */
type Crumb = { label: string; href?: string };

export function PageHero({
  title,
  sub,
  crumbs = [],
}: {
  title: string;
  sub?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section
      className="relative w-full h-[280px] md:h-[320px] flex items-center justify-center text-white overflow-hidden"
      style={{
        // 저작권 회피 (Wave 10): 두손누리 imweb 이미지 제거 → 정체성 gradient + decorative.
        background:
          'radial-gradient(circle at 20% 30%, #1B6F4A 0%, #15573A 45%, #0F3726 100%), radial-gradient(circle at 80% 70%, rgba(230,57,70,0.3) 0%, transparent 60%)',
      }}
    >
      {/* decorative dots pattern (CC0) */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30 mix-blend-screen"
      >
        <pattern id="ph-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1.2" fill="rgba(255,255,255,0.5)" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#ph-dots)" />
      </svg>
      <div className="text-center px-5">
        {crumbs.length > 0 && (
          <nav className="text-xs md:text-sm opacity-80 mb-3 flex items-center justify-center gap-2">
            <a href="/" className="hover:opacity-100">홈</a>
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="opacity-60">›</span>
                {c.href ? (
                  <a href={c.href} className="hover:opacity-100">{c.label}</a>
                ) : (
                  <span className="font-medium">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-3xl md:text-5xl font-bold mb-3">{title}</h1>
        {sub && <p className="text-base md:text-lg opacity-90">{sub}</p>}
      </div>
    </section>
  );
}
