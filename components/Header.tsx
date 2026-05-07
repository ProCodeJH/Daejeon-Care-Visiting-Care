'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

/**
 * 두손누리 Header 1:1 — 6 nav + dropdown sub-nav.
 * 흰색 BG, 112px 높이, 하단 1px green #61B05A border.
 */
const NAV = [
  {
    label: '센터소개',
    href: '/about',
    children: [
      { href: '/about', label: '인사말' },
      { href: '/service', label: '서비스 소개' },
      { href: '/process', label: '서비스 이용 절차' },
      { href: '/homecare', label: '방문요양' },
      { href: '/map', label: '찾아오시는 길' },
    ],
  },
  {
    label: '노인장기요양보험',
    href: '/insurance',
    children: [
      { href: '/insurance', label: '노인장기요양보험이란?' },
      { href: '/insurance/grade', label: '장기요양등급절차 및 심사' },
      { href: '/insurance/cost', label: '본인부담금 계산기' },
    ],
  },
  {
    label: '노인정보',
    href: '/info',
    children: [
      { href: '/story', label: '대전케어 이야기' },
      { href: '/info', label: '요양 정보' },
    ],
  },
  {
    label: '요양보호사 일자리',
    href: '/jobs',
    children: [
      { href: '/jobs', label: '채용 공고' },
      { href: '/jobs/apply', label: '지원하기' },
    ],
  },
  {
    label: '고객센터',
    href: '/contact',
    children: [
      { href: '/notice', label: '공지사항' },
      { href: '/qna', label: '문의하기' },
      { href: '/faq', label: '자주묻는 질문' },
    ],
  },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-brand-400">
      <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-between h-[80px] md:h-[112px]">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-brand-400 grid place-items-center text-white font-bold text-lg">
            대
          </div>
          <div className="leading-tight">
            <p className="font-bold text-base md:text-lg text-ink-primary">대전케어</p>
            <p className="text-xs text-ink-muted">방문요양센터</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV.map((item) => (
            <div
              key={item.label}
              className="relative py-9"
              onMouseEnter={() => setHovered(item.label)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link
                href={item.href}
                className="text-ink-primary hover:text-brand-400 font-semibold text-[15px] flex items-center gap-1 transition-colors"
              >
                {item.label}
                {item.children && <ChevronDown size={14} />}
              </Link>
              {/* Dropdown */}
              {item.children && hovered === item.label && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-lg border border-gray-100 rounded-md py-2 min-w-[200px] z-50">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block px-5 py-2.5 text-sm text-ink-secondary hover:bg-brand-50 hover:text-brand-400 whitespace-nowrap"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/contact"
          className="hidden lg:inline-block bg-brand-400 hover:bg-brand-500 text-white px-5 py-2 text-sm font-semibold transition-colors"
          style={{ borderRadius: '2px' }}
        >
          무료 상담
        </Link>

        {/* Mobile menu */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden w-10 h-10 grid place-items-center"
          aria-label="메뉴"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <nav className="lg:hidden border-t border-gray-100 bg-white">
          <div className="px-5 py-4 flex flex-col">
            {NAV.map((item) => (
              <div key={item.label} className="border-b border-gray-50 py-3">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-semibold text-ink-primary"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="mt-2 ml-3 flex flex-col gap-1.5">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setOpen(false)}
                        className="text-sm text-ink-muted py-1"
                      >
                        · {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 bg-brand-400 text-white text-center py-3 font-semibold"
              style={{ borderRadius: '2px' }}
            >
              무료 상담
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
