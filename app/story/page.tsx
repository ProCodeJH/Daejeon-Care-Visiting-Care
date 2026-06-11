'use client';

import { useState, useEffect, useMemo } from 'react';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';
import { STORIES as POSTS } from '@/content/stories';
import { CONTACT } from '@/lib/contact';
import {
  ADMIN_CONTENT_EVENT,
  fetchAdminContent,
  getStoryUrl,
  sortByDateDesc,
  STORY_CATEGORIES,
  type AdminStory,
  type ManagedStory,
} from '@/lib/admin-content';

// Wave 534: CATEGORIES brand-prefixed → CONTACT.brand derived (paradigm 16 cascade audit).
// Wave 533 stories.ts cat 변경 후 cascade 누락 catch — brand 변경 시 filter 정합성 보장.
const CATEGORIES = STORY_CATEGORIES;

export default function StoryPage() {
  const [activeCat, setActiveCat] = useState('전체');
  const [adminStories, setAdminStories] = useState<AdminStory[]>([]);

  // Wave 395: URL deep-link (Wave 369 패턴 saturation pass) — 카테고리 공유
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlCat = urlParams.get('cat');
      if (urlCat && CATEGORIES.some((category) => category === urlCat)) setActiveCat(urlCat);
    } catch {}
  }, []);

  useEffect(() => {
    const loadAdminContent = async () => {
      const snapshot = await fetchAdminContent();
      setAdminStories(snapshot.stories);
    };
    void loadAdminContent();
    window.addEventListener(ADMIN_CONTENT_EVENT, loadAdminContent);
    window.addEventListener('storage', loadAdminContent);
    return () => {
      window.removeEventListener(ADMIN_CONTENT_EVENT, loadAdminContent);
      window.removeEventListener('storage', loadAdminContent);
    };
  }, []);

  useEffect(() => {
    try {
      const newUrl =
        activeCat === '전체'
          ? window.location.pathname
          : `${window.location.pathname}?cat=${encodeURIComponent(activeCat)}`;
      window.history.replaceState(null, '', newUrl);
    } catch {}
  }, [activeCat]);

  const posts = useMemo(
    () => sortByDateDesc<ManagedStory>([...adminStories, ...POSTS]),
    [adminStories],
  );
  const filtered = activeCat === '전체' ? posts : posts.filter((p) => p.cat === activeCat);

  return (
    <>
      <PageHero
        bg="/page-hero/page-hero-2.png"
        title={`${CONTACT.brand} 이야기`}
        sub="현장에서 만난 따뜻한 순간을 함께 나눕니다"
        crumbs={[{ label: '노인정보', href: '/info' }, { label: `${CONTACT.brand} 이야기` }]}
      />

      {/* 카테고리 필터 */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="이야기 카테고리 필터">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActiveCat(c)}
                aria-pressed={activeCat === c}
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
          {/* Wave 395: WCAG 4.1.3 aria-live status (Wave 367 패턴 saturation pass) */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {activeCat === '전체'
              ? `전체 ${posts.length}건의 이야기`
              : `${activeCat} 카테고리 ${filtered.length}건의 이야기`}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <a
                key={String(p.id)}
                href={getStoryUrl(p)}
                className="group block bg-white border border-slate-200 hover:border-brand-300 transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:shadow-xl"
                aria-label={p.title}
              >
                {/* Wave 376: <img> SEO/lazy + gradient aria-hidden (Wave 358 패턴 saturation pass).
                    링크 aria-label 이미 있으므로 alt="" (decorative) — WCAG 정확. */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  {p.thumbnail ? (
                    <img
                      src={p.thumbnail}
                      alt=""
                      width={400}
                      height={300}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#F8FAFC_0%,#EAF2FF_50%,#D7E4F5_100%)]">
                      <div className="absolute left-5 right-5 top-6 h-px bg-slate-300/70" />
                      <div className="absolute bottom-6 left-5 h-12 w-24 border-l-2 border-t-2 border-brand-500/70" />
                      <div className="absolute right-6 top-6 h-20 w-20 rounded-full border border-brand-300/70" />
                    </div>
                  )}
                  {p.isNotice && (
                    <span className="absolute top-3 left-3 bg-white text-brand-700 text-xs font-bold px-2 py-1 z-10 shadow-sm" style={{ borderRadius: '2px' }}>
                      공지
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs text-brand-600 font-semibold mb-2">{p.cat}</p>
                  <h3 className="font-bold text-ink-primary leading-snug mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
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
