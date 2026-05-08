'use client';

import { SplitText } from './SplitText';
import { BreadcrumbJsonLd } from './BreadcrumbJsonLd';

/**
 * Sub-page Hero — breadcrumb + title (SplitText char stagger).
 * 정체성 그라디언트 + decorative dots SVG (CC0).
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
    <>
      {crumbs.length > 0 && (
        <BreadcrumbJsonLd
          crumbs={crumbs.map((c) => ({ name: c.label, href: c.href }))}
        />
      )}
    <section
      className="relative w-full h-[280px] md:h-[320px] flex items-center justify-center text-white overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 20% 30%, #1B6F4A 0%, #15573A 45%, #0F3726 100%), radial-gradient(circle at 80% 70%, rgba(230,57,70,0.3) 0%, transparent 60%)',
      }}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30 mix-blend-screen"
      >
        <pattern id="ph-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1.2" fill="rgba(255,255,255,0.5)" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#ph-dots)" />
      </svg>

      <div className="text-center px-5 relative z-10">
        {crumbs.length > 0 && (
          <nav className="text-xs md:text-sm opacity-80 mb-3" aria-label="breadcrumb">
            {/* Wave 303: <ol>+<li> W3C ARIA Authoring Practices breadcrumb pattern. */}
            <ol className="list-none p-0 m-0 flex items-center justify-center gap-2 flex-wrap">
              <li><a href="/" className="hover:opacity-100">홈</a></li>
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span aria-hidden="true" className="opacity-60">›</span>
                  {c.href ? (
                    <a href={c.href} className="hover:opacity-100">{c.label}</a>
                  ) : (
                    <span className="font-medium" aria-current="page">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {/* Wave 435: textWrap 제거 — globals.css h1-h6 { text-wrap: balance } single source (Wave 434 saturation pass) */}
        <h1
          className="text-3xl md:text-5xl font-bold mb-3"
          style={{
            fontVariationSettings: '"wght" 800',
          }}
        >
          <SplitText text={title} charDelay={0.035} />
        </h1>
        {sub && (
          <p
            className="text-base md:text-lg opacity-90 leading-relaxed"
            data-speakable="true"
          >
            {sub}
          </p>
        )}
      </div>
    </section>
    </>
  );
}
