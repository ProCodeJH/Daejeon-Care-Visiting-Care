'use client';

import { useState } from 'react';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';
import { FaqJsonLd } from '@/components/FaqJsonLd';
import { FAQS } from '@/content/faqs';

const CATS = ['전체', '신청', '서비스', '비용'];

export default function FAQPage() {
  const [activeCat, setActiveCat] = useState('전체');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

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
          <div className="flex flex-wrap justify-center gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setActiveCat(c);
                  setOpenIdx(null);
                }}
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
          <div className="space-y-3">
            {filtered.map((f, i) => (
              <div
                key={i}
                className={`border ${
                  openIdx === i ? 'border-brand-400 shadow-md' : 'border-gray-100'
                } transition-all`}
              >
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
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
                {openIdx === i && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6 pl-12 md:pl-14 -mt-2">
                    <div className="bg-brand-50 p-4 md:p-5 flex items-start gap-3">
                      <span className="text-brand-400 font-bold shrink-0">A.</span>
                      <p className="text-ink-secondary leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-ink-muted py-20">해당 카테고리의 질문이 없습니다.</p>
          )}
        </div>
      </section>

      <CTASection
        title="원하는 답을 찾지 못하셨나요?"
        sub="언제든 직접 문의 주세요. 친절히 답변드립니다."
      />
    </>
  );
}
