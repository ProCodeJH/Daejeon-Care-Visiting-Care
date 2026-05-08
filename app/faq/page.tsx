'use client';

import { useState, useEffect } from 'react';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';
import { FaqJsonLd } from '@/components/FaqJsonLd';
import { FAQS } from '@/content/faqs';
import { CONTACT } from '@/lib/contact';

const CATS = ['전체', '신청', '서비스', '비용'];

export default function FAQPage() {
  const [activeCat, setActiveCat] = useState('전체');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  // Wave 369: URL deep-link — 카테고리 필터 공유 시 받는 사람도 동일 필터 적용.
  // 전체 = clean URL, 다른 카테고리 = ?cat=비용 등.
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlCat = urlParams.get('cat');
      if (urlCat && CATS.includes(urlCat)) {
        setActiveCat(urlCat);
      }
    } catch {}
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

  const filtered = activeCat === '전체' ? FAQS : FAQS.filter((f) => f.cat === activeCat);

  return (
    <>
      <FaqJsonLd faqs={FAQS} />
      <PageHero
        title="자주 묻는 질문"
        sub="궁금증을 빠르게 풀어드립니다"
        crumbs={[{ label: '고객센터', href: '/contact' }, { label: 'FAQ' }]}
      />

      {/* 카테고리 + Search */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-[900px] mx-auto px-5">
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="FAQ 카테고리 필터">
            {CATS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setActiveCat(c);
                  setOpenIdx(null);
                }}
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

      {/* FAQ 아코디언 */}
      <section className="bg-white py-16">
        <div className="max-w-[900px] mx-auto px-5">
          {/* Wave 391: <noscript> fallback — JS 비활성 시 모든 답 펼치기 불가, phone CTA 안내 */}
          <noscript>
            <div className="bg-[#FFF8E1] border-l-4 border-[#F5A623] p-4 mb-6">
              <p className="text-sm text-ink-primary">
                JavaScript가 비활성화되어 답변 펼치기가 제한됩니다.
                직접 문의는{' '}
                {/* Wave 471: CONTACT.phoneTel single source (다른 3 noscript 패턴 일관) */}
                <a href={CONTACT.phoneTel} className="underline font-bold text-[#1B6F4A]">
                  {CONTACT.phone}
                </a>
                으로 주세요.
              </p>
            </div>
          </noscript>
          {/* Wave 367: WCAG 4.1.3 Status Messages — 카테고리 필터 결과를 screen reader에 announce */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {activeCat === '전체'
              ? `전체 ${FAQS.length}건의 질문`
              : `${activeCat} 카테고리 ${filtered.length}건의 질문`}
          </div>
          <div className="space-y-3">
            {filtered.map((f, i) => (
              <div
                key={i}
                className={`border ${
                  openIdx === i ? 'border-brand-400 shadow-md' : 'border-gray-100'
                } transition-all`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  aria-expanded={openIdx === i}
                  aria-controls={`faq-answer-${i}`}
                  className="w-full text-left p-5 md:p-6 flex items-start gap-4"
                >
                  <span className="text-brand-400 font-bold text-xl shrink-0">Q.</span>
                  <span className="flex-1 font-semibold text-ink-primary leading-snug">
                    {f.q}
                  </span>
                  <span
                    className={`text-brand-400 text-xl shrink-0 transition-transform ${
                      openIdx === i ? 'rotate-180' : ''
                    }`}
                  >
                    ▾
                  </span>
                </button>
                {/* Wave 349: 항상 마운트 + grid-template-rows 0fr→1fr 부드러운 transition.
                    inert로 닫힘 상태에서 focus + 스크린리더 차단 (React 19 native boolean). */}
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  className="accordion-content"
                  data-open={openIdx === i}
                  inert={openIdx !== i}
                >
                  <div>
                    <div className="px-5 md:px-6 pb-5 md:pb-6 pl-12 md:pl-14 -mt-2">
                      <div className="bg-brand-50 p-4 md:p-5 flex items-start gap-3">
                        <span className="text-brand-400 font-bold shrink-0">A.</span>
                        <p className="text-ink-secondary leading-relaxed">{f.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-ink-muted py-20">해당 카테고리의 질문이 없습니다.</p>
          )}
        </div>
      </section>

      {/* Wave 363: <aside> = complementary landmark (cross-page navigation) */}
      <aside aria-label="추천 페이지" className="bg-white py-16">
        <div className="max-w-[1000px] mx-auto px-5">
          <div className="text-center mb-10">
            <p lang="en" className="text-brand-400 font-semibold tracking-[0.2em] text-sm mb-3"><span aria-hidden="true">|</span> EXPLORE</p>
            <h2 className="text-2xl md:text-3xl font-bold text-ink-primary">더 알아보기</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <a
              href="/insurance/cost"
              className="group bg-[#f8f8f8] hover:bg-brand-50 p-7 transition-colors block border-l-4 border-[#1B6F4A]"
            >
              <p lang="en" className="text-xs text-[#1B6F4A] font-bold tracking-[0.15em] mb-2">CALCULATOR</p>
              <h3 className="text-lg font-bold text-ink-primary mb-2 group-hover:text-[#1B6F4A] transition-colors">
                본인부담금 계산 →
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                등급별 월 본인부담액을 즉시 확인.
              </p>
            </a>
            <a
              href="/contact"
              className="group bg-[#f8f8f8] hover:bg-brand-50 p-7 transition-colors block border-l-4 border-brand-600"
            >
              <p lang="en" className="text-xs text-brand-600 font-bold tracking-[0.15em] mb-2">CONTACT</p>
              <h3 className="text-lg font-bold text-ink-primary mb-2 group-hover:text-brand-600 transition-colors">
                직접 문의하기 →
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                전화 {CONTACT.phone} 또는 온라인 폼 (24시간).
              </p>
            </a>
          </div>
        </div>
      </aside>

      <CTASection
        title="원하는 답을 찾지 못하셨나요?"
        sub="언제든 직접 문의 주세요. 친절히 답변드립니다."
      />
    </>
  );
}
