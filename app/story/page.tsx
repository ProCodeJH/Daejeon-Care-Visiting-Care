'use client';

import { useState } from 'react';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';
import { STORIES as POSTS } from '@/content/stories';

const CATEGORIES = ['전체', '대전케어 이야기', '대전케어 일상', '현장 이야기', '공지'];

export default function StoryPage() {
  const [activeCat, setActiveCat] = useState('전체');

  const filtered = activeCat === '전체' ? POSTS : POSTS.filter((p) => p.cat === activeCat);

  return (
    <>
      <PageHero
        title="대전케어 이야기"
        sub="현장에서 만난 따뜻한 순간을 함께 나눕니다"
        crumbs={[{ label: '노인정보', href: '/info' }, { label: '대전케어 이야기' }]}
      />

      {/* 카테고리 필터 */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`px-5 py-2 text-sm font-medium transition-colors ${
                  activeCat === c
                    ? 'bg-brand-400 text-white'
                    : 'bg-gray-50 text-ink-secondary hover:bg-brand-50'
                }`}
                style={{ borderRadius: '2px' }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 게시글 그리드 */}
      <section className="bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <a
                key={p.id}
                href={`/story/${p.id}`}
                className="group block bg-[#f8f8f8] hover:bg-brand-50 transition-colors overflow-hidden"
                aria-label={p.title}
              >
                {/* 썸네일 — 자현 swap 자리 */}
                <div className="aspect-[4/3] bg-gradient-to-br from-brand-200 to-brand-400 relative">
                  {p.isNotice && (
                    <span className="absolute top-3 left-3 bg-white text-brand-400 text-xs font-bold px-2 py-1" style={{ borderRadius: '2px' }}>
                      공지
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs text-brand-400 font-semibold mb-2">{p.cat}</p>
                  <h3 className="font-bold text-ink-primary leading-snug mb-2 group-hover:text-brand-400 transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-ink-secondary line-clamp-2 mb-3 leading-relaxed">
                    {p.excerpt}
                  </p>
                  <time dateTime={p.date} className="text-xs text-ink-muted block">{p.date}</time>
                </div>
              </a>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-ink-muted py-20">해당 카테고리의 글이 없습니다.</p>
          )}

          <div className="text-center mt-12">
            <button
              className="border border-brand-400 hover:bg-brand-400 hover:text-white text-brand-400 px-8 py-3 font-semibold transition-colors"
              style={{ borderRadius: '2px' }}
            >
              더 보기 +
            </button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
