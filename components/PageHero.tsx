/**
 * Sub-page Hero — breadcrumb + title.
 * 두손누리 sub-page 패턴: 320px 높이 + green BG image + 흰색 카피.
 */
type Crumb = { label: string; href?: string };

export function PageHero({
  title,
  sub,
  bg = 'https://cdn.imweb.me/thumbnail/20211020/17463a6a562f7.jpg',
  crumbs = [],
}: {
  title: string;
  sub?: string;
  bg?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section
      className="relative w-full h-[280px] md:h-[320px] flex items-center justify-center text-white overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.55)), url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
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
