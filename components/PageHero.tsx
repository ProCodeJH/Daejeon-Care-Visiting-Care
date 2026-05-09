'use client';

import Link from 'next/link';
import { SplitText } from './SplitText';
import { BreadcrumbJsonLd } from './BreadcrumbJsonLd';

/**
 * Sub-page Hero — breadcrumb + title (SplitText char stagger).
 * Wave 575: bg prop — 페이지별 ChatGPT 생성 배경 이미지 + dark indigo overlay.
 *   bg 미지정 시 default 인디고 그라디언트 (Wave 575 컬러 swap).
 */
type Crumb = { label: string; href?: string };

export function PageHero({
  title,
  sub,
  crumbs = [],
  bg,
}: {
  title: string;
  sub?: string;
  crumbs?: Crumb[];
  /** 배경 이미지 path (예: '/page-hero/page-hero-1.png'). 미지정 시 그라디언트만. */
  bg?: string;
}) {
  return (
    <>
      {crumbs.length > 0 && (
        <BreadcrumbJsonLd
          crumbs={crumbs.map((c) => ({ name: c.label, href: c.href }))}
        />
      )}
    <section
      className="relative w-full h-[280px] md:h-[360px] flex items-center justify-center text-white overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 20% 30%, #1E40AF 0%, #1E3A8A 45%, #172554 100%), radial-gradient(circle at 80% 70%, rgba(230,57,70,0.3) 0%, transparent 60%)',
      }}
    >
      {/* 자현 PNG 배경 이미지 + dark navy overlay (텍스트 가독성 보장) */}
      {bg && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.55,
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(23,37,84,0.55) 0%, rgba(30,58,138,0.65) 50%, rgba(23,37,84,0.75) 100%)',
            }}
          />
        </>
      )}

      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25 mix-blend-screen"
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
              {/* Wave 455: <a> → <Link> — Lenis smooth scroll + prefetch */}
              <li><Link href="/" className="hover:opacity-100">홈</Link></li>
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span aria-hidden="true" className="opacity-60">›</span>
                  {c.href ? (
                    <Link href={c.href} className="hover:opacity-100">{c.label}</Link>
                  ) : (
                    <span className="font-medium" aria-current="page">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {/* Wave 435: textWrap 제거 — globals.css h1-h6 { text-wrap: balance } single source */}
        <h1
          className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-md"
          style={{
            fontVariationSettings: '"wght" 800',
          }}
        >
          <SplitText text={title} charDelay={0.035} />
        </h1>
        {sub && (
          <p
            className="text-base md:text-lg opacity-95 leading-relaxed drop-shadow-sm"
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
