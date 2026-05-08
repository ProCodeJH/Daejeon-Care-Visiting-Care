'use client';

import { useState } from 'react';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';
import { NOTICES } from '@/content/notices';

export default function NoticePage() {
  const [search, setSearch] = useState('');

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

      {/* 검색 */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-[1000px] mx-auto px-5 flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="제목 검색"
            className="flex-1 px-4 py-2.5 border border-gray-200 focus:border-brand-400 focus:outline-none text-sm"
            style={{ borderRadius: '2px' }}
          />
          <button
            className="bg-brand-400 hover:bg-brand-500 text-white px-5 py-2.5 text-sm font-semibold transition-colors"
            style={{ borderRadius: '2px' }}
          >
            검색
          </button>
        </div>
      </section>

      {/* 게시판 */}
      <section className="bg-white py-10">
        <div className="max-w-[1000px] mx-auto px-5">
          <table className="w-full">
            <thead>
              <tr className="border-y-2 border-brand-400">
                <th className="py-3 text-sm font-bold text-ink-primary w-16">No</th>
                <th className="py-3 text-sm font-bold text-ink-primary text-left">제목</th>
                <th className="py-3 text-sm font-bold text-ink-primary w-24 hidden md:table-cell">글쓴이</th>
                <th className="py-3 text-sm font-bold text-ink-primary w-28 hidden md:table-cell">작성시간</th>
                <th className="py-3 text-sm font-bold text-ink-primary w-20 hidden md:table-cell">조회수</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((n) => (
                <tr
                  key={n.id}
                  className="border-b border-gray-100 hover:bg-brand-50 transition-colors cursor-pointer"
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
                    <a href={`/notice/${n.id}`} className="hover:text-brand-400 font-medium">
                      {n.title}
                    </a>
                  </td>
                  <td className="py-4 text-center text-sm text-ink-muted hidden md:table-cell">{n.author}</td>
                  <td className="py-4 text-center text-sm text-ink-muted hidden md:table-cell">{n.date}</td>
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
