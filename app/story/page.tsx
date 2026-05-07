'use client';

import { useState } from 'react';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';

const CATEGORIES = ['전체', '대전케어 이야기', '대전케어 일상', '현장 이야기', '공지'];

const POSTS = [
  {
    id: 1,
    title: '방문요양 우수 요양보호사님, 표창장 수상 비결은?',
    excerpt: '대전케어 요양보호사 선생님이 표창장을 수상하셨습니다. 평소 어르신들께 정성을 다하는 모습이...',
    cat: '대전케어 이야기',
    date: '2025-09-15',
    isNotice: true,
  },
  {
    id: 2,
    title: '어르신 가정 환경 개선 프로젝트 – 자원봉사 현장 이야기',
    excerpt: '거동이 불편하신 어르신들을 위한 가정 환경 개선 프로젝트. 자원봉사자분들이 함께해주셨습니다.',
    cat: '대전케어 이야기',
    date: '2025-09-08',
  },
  {
    id: 3,
    title: '대전케어 일상 40. 어르신의 웃음 속에서 피어난 따뜻한 모니터링',
    excerpt: '매일 어르신을 찾아뵙는 요양보호사 선생님의 따뜻한 일상. 작은 모니터링이 큰 차이를 만듭니다.',
    cat: '대전케어 일상',
    date: '2025-08-18',
  },
  {
    id: 4,
    title: '요양보호사 선생님의 하루 — 새벽 첫 방문부터 저녁까지',
    excerpt: '하루 3-4시간씩 어르신 댁을 방문하는 요양보호사의 진솔한 하루를 담았습니다.',
    cat: '현장 이야기',
    date: '2025-07-22',
  },
  {
    id: 5,
    title: '치매 어르신과 함께하는 인지활동 — 작은 변화의 기적',
    excerpt: '치매 진행을 늦추는 인지활동 프로그램을 통해 만난 작은 변화들을 소개합니다.',
    cat: '대전케어 일상',
    date: '2025-07-05',
  },
  {
    id: 6,
    title: '여름철 어르신 건강 관리 — 폭염 대비 7가지 수칙',
    excerpt: '폭염 속 어르신 건강을 지키는 실용적인 7가지 수칙을 정리했습니다.',
    cat: '공지',
    date: '2025-06-28',
  },
];

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
                  <p className="text-xs text-ink-muted">{p.date}</p>
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
