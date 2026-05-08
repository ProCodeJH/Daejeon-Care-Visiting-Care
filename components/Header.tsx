'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { Logo } from './Logo';
import { CONTACT } from '@/lib/contact';

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
      { href: '/centers', label: '5구 지점' },
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  // scroll-driven glass — Header backdrop-blur scroll 시 진해짐
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // a11y: ESC 키 → 모바일 메뉴 + 데스크탑 dropdown 동시 닫기 (Wave 351)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setHovered(null);
      }
    };
    if (open || hovered) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, hovered]);

  // route change 감지 = 모바일 메뉴 자동 닫기
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Wave 436: body scroll lock — 모바일 메뉴 open 시 background scroll 차단.
  // 어르신 메뉴 살피다 실수 scroll → 메뉴 사라지는 disorienting 회피. cleanup으로 unmount 시 복원.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <>
      {/* 24시간 상담 띠 */}
      <div className="bg-[#1B6F4A] text-white text-xs md:text-sm">
        <div className="max-w-[1200px] mx-auto px-5 py-2 flex items-center justify-between">
          <p className="flex items-center gap-2">
            <span className="inline-flex w-5 h-5 rounded-full bg-[#E63946] grid place-items-center text-[10px]">♥</span>
            <span className="font-medium">{CONTACT.available}</span>
          </p>
          {/* Wave 409: 24h 띠 phone CTA aria-label */}
          <a
            href={CONTACT.phoneTel}
            aria-label={`전화 걸기 대표번호 ${CONTACT.phone}`}
            className="font-bold hover:text-[#FFD166] transition-colors"
          >
            대표번호 {CONTACT.phone}
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/85 backdrop-blur-xl border-b border-gray-200 shadow-sm'
            : 'bg-white/95 backdrop-blur-md border-b border-gray-100'
        }`}
      >
        <div
          className={`max-w-[1200px] mx-auto px-5 flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-[64px] md:h-[80px]' : 'h-[80px] md:h-[100px]'
          }`}
        >
          {/* 로고 */}
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <Logo size={48} withText />
          </Link>

        {/* Desktop Nav — Wave 351: 키보드 a11y 강화.
            hover + focus 둘 다 dropdown 열기 + 항상-마운트 + inert + opacity/transform smooth transition. */}
        <nav aria-label="주 메뉴" className="hidden lg:flex items-center gap-10">
          {NAV.map((item) => {
            const isOpen = hovered === item.label;
            return (
              <div
                key={item.label}
                className="relative py-9"
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(item.label)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                    setHovered(null);
                  }
                }}
              >
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  aria-expanded={item.children ? isOpen : undefined}
                  // Wave 436: aria-haspopup="menu" — screen reader "has submenu" announce. ARIA APG nav pattern.
                  aria-haspopup={item.children ? 'menu' : undefined}
                  className={`font-semibold text-[15px] flex items-center gap-1 transition-colors ${
                    isActive(item.href)
                      ? 'text-brand-600'
                      : 'text-ink-primary hover:text-brand-400'
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown size={14} />}
                  {isActive(item.href) && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-brand-600" />
                  )}
                </Link>
                {/* Dropdown — 항상 마운트, opacity/transform 트랜지션 + inert로 닫힘 시 focus/a11y 차단 */}
                {item.children && (
                  <div
                    inert={!isOpen}
                    className="absolute top-full left-1/2 bg-white shadow-lg border border-gray-100 rounded-md py-2 min-w-[200px] z-50 transition-all duration-200"
                    style={{
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? 'translate(-50%, 0)' : 'translate(-50%, -4px)',
                    }}
                  >
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
            );
          })}
        </nav>

        {/* CTA — 24시간 직통. Wave 407: aria-label 의도 명확 */}
        <a
          href={CONTACT.phoneTel}
          aria-label={`전화 걸기 ${CONTACT.phone} (24시간 상담)`}
          className="hidden lg:flex items-center gap-2 bg-[#E63946] hover:bg-[#C12A37] text-white px-5 py-2.5 text-sm font-bold transition-colors"
          style={{ borderRadius: '2px' }}
        >
          <Phone size={16} />
          {CONTACT.phone}
        </a>

        {/* Mobile menu */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="lg:hidden w-12 h-12 grid place-items-center -mr-1"
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav — Wave 350: 항상 마운트 + accordion-content (grid 0fr→1fr) + inert.
          conditional render 대비 부드러운 slide-down + 닫힘 시 inert로 focus/a11y tree 차단. */}
      <nav
        id="mobile-nav"
        aria-label="모바일 메뉴"
        className="lg:hidden border-t border-gray-100 bg-white accordion-content"
        data-open={open}
        inert={!open}
      >
        <div>
          <div className="px-5 py-4 flex flex-col">
            {NAV.map((item) => (
              <div key={item.label} className="border-b border-gray-50 py-3">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className={`font-semibold ${
                    isActive(item.href) ? 'text-brand-600' : 'text-ink-primary'
                  }`}
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
            {/* Wave 409: 모바일 메뉴 phone CTA aria-label */}
            <a
              href={CONTACT.phoneTel}
              onClick={() => setOpen(false)}
              aria-label={`전화 걸기 ${CONTACT.phone} (24시간 상담)`}
              className="mt-4 bg-[#E63946] text-white text-center py-4 font-bold flex items-center justify-center gap-2"
              style={{ borderRadius: '2px' }}
            >
              <Phone size={16} /> {CONTACT.phone} · 24시간 상담
            </a>
          </div>
        </div>
      </nav>
      </header>
    </>
  );
}
