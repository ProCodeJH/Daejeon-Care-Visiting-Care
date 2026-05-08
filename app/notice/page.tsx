'use client';

import { useState, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';
import { NOTICES } from '@/content/notices';

/**
 * Wave 359: 검색어 매치 부분에 <mark> semantic + 시각 highlight.
 * regex split + capture group으로 all matches 처리.
 */
function highlightMatch(text: string, query: string): ReactNode {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="bg-yellow-100 text-ink-primary px-0.5">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export default function NoticePage() {
  const [search, setSearch] = useState('');

  // Wave 370: URL deep-link — 검색어 공유 시 받는 사람도 동일 필터 즉시 적용.
  // 500ms debounce: keystroke마다 history API 호출 회피.
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlQuery = urlParams.get('q');
      if (urlQuery) setSearch(urlQuery);
    } catch {}
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const newUrl = search
          ? `${window.location.pathname}?q=${encodeURIComponent(search)}`
          : window.location.pathname;
        window.history.replaceState(null, '', newUrl);
      } catch {}
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const filtered = NOTICES.filter((n) =>
    search ? n.title.toLowerCase().includes(search.toLowerCase()) : true,
  );

  return (
    <>
      <PageHero
        title="공지사항"
        sub="새로운 소식을 알려드립니다"
        crumbs={[{ label: '고객센터', href: '/contact' }, { label: '공지사항' }]}
      />

      {/* 검색 — 실시간 필터. Wave 353: HTML5 <search> element (Chrome/FF/Safari all 2023+).
          implicit role="search" landmark — ARIA 속성보다 native semantic. */}
      <section className="bg-white py-10 border-b border-gray-100">
        <search aria-label="공지사항 검색">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="max-w-[1000px] mx-auto px-5 flex items-center gap-3"
          >
            <label htmlFor="notice-search" className="sr-only">제목 검색</label>
            <input
              id="notice-search"
              name="q"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="제목 검색"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              enterKeyHint="search"
              className="flex-1 px-4 py-2.5 border border-gray-200 focus:border-brand-400 focus:outline-none text-sm"
              style={{ borderRadius: '2px' }}
            />
            <button
              type="submit"
              className="bg-brand-400 hover:bg-brand-500 text-white px-5 py-2.5 text-sm font-semibold transition-colors"
              style={{ borderRadius: '2px' }}
            >
              검색
            </button>
          </form>
        </search>
      </section>

      {/* 게시판 */}
      <section className="bg-white py-10">
        <div className="max-w-[1000px] mx-auto px-5">
          {/* Wave 367: WCAG 4.1.3 Status Messages — 검색 필터 결과 변화를 screen reader에 announce */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {search ? `검색 결과 ${filtered.length}건` : `전체 ${NOTICES.length}건`}
          </div>
          <table className="w-full">
            {/* Wave 461: <caption> + scope="col" — SR table navigation a11y */}
            <caption className="sr-only">공지사항 게시판 — {NOTICES.length}건</caption>
            <thead>
              <tr className="border-y-2 border-brand-400">
                <th scope="col" className="py-3 text-sm font-bold text-ink-primary w-16">No</th>
                <th scope="col" className="py-3 text-sm font-bold text-ink-primary text-left">제목</th>
                <th scope="col" className="py-3 text-sm font-bold text-ink-primary w-24 hidden md:table-cell">글쓴이</th>
                <th scope="col" className="py-3 text-sm font-bold text-ink-primary w-28 hidden md:table-cell">작성시간</th>
                <th scope="col" className="py-3 text-sm font-bold text-ink-primary w-20 hidden md:table-cell">조회수</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((n) => (
                <tr
                  key={n.id}
                  className="border-b border-gray-100 hover:bg-brand-50 transition-colors"
                >
                  <td className="py-4 text-center text-sm text-ink-muted">
                    {n.pinned ? (
                      <span className="bg-brand-400 text-white text-xs font-bold px-2 py-1" style={{ borderRadius: '2px' }}>
                        공지
                      </span>
                    ) : (
                      n.id
                    )}
                  </td>
                  <td className="py-4 text-ink-primary">
                    {/* Wave 461: <a> → <Link> — Wave 455 saturation 누락 catch (template literal grep miss) */}
                    <Link href={`/notice/${n.id}`} className="hover:text-brand-400 font-medium">
                      {highlightMatch(n.title, search)}
                    </Link>
                  </td>
                  <td className="py-4 text-center text-sm text-ink-muted hidden md:table-cell">{n.author}</td>
                  <td className="py-4 text-center text-sm text-ink-muted hidden md:table-cell">
                    <time dateTime={n.date}>{n.date}</time>
                  </td>
                  <td className="py-4 text-center text-sm text-ink-muted hidden md:table-cell">{n.views}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="text-center text-ink-muted py-20">검색 결과가 없습니다.</p>
          )}

          {/* 페이지네이션 */}
          <div className="flex justify-center gap-1 mt-10">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                type="button"
                aria-label={`${p} 페이지`}
                className={`w-9 h-9 text-sm transition-colors ${
                  p === 1
                    ? 'bg-brand-400 text-white'
                    : 'bg-gray-50 text-ink-secondary hover:bg-brand-50'
                }`}
                style={{ borderRadius: '2px' }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
