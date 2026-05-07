'use client';

import { useState } from 'react';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';

const FAQS = [
  {
    cat: '서비스',
    q: '담당 요양보호사 선생님을 바꾸고 싶을 때는 어떻게 해야 하나요?',
    a: '센터에 연락 주시면 즉시 상담 후 어르신께 어울리는 새 매니저로 배정해드립니다. 어르신 마음에 드실 때까지 교체 가능합니다.',
  },
  {
    cat: '비용',
    q: '서비스를 이용할 시 자기부담금이 얼마나 나오나요?',
    a: '장기요양 등급 및 본인 소득 수준에 따라 다릅니다. 일반 대상자는 15%, 감경 대상자는 9% 또는 6%, 기초수급자는 0%입니다. 정확한 금액은 본인부담금 계산기 또는 상담을 통해 확인하세요.',
  },
  {
    cat: '서비스',
    q: '부모님 거주지가 센터에서 멀리 떨어져 계신데 가능할까요?',
    a: '대전 5구 (유성·대덕·서구·중구·동구) 전 지역에서 서비스 가능합니다. 지점별 가까운 센터에서 매니저 매칭 후 방문드립니다.',
  },
  {
    cat: '신청',
    q: '장기요양인정등급 신청은 누가 해야 하나요?',
    a: '대상자 본인 또는 가족이 국민건강보험공단에 신청합니다. 대전케어가 신청 절차 전반을 동행하여 도와드립니다.',
  },
  {
    cat: '신청',
    q: '등급을 받지 않고 요양서비스를 받을 수 있나요?',
    a: '장기요양보험을 통한 서비스는 등급 판정이 필요합니다. 등급이 없으신 경우 자비 부담의 일반 가사 서비스 또는 등급 신청 절차 안내가 가능합니다.',
  },
  {
    cat: '서비스',
    q: '주말에도 방문요양 서비스가 가능한가요?',
    a: '평일 외에도 사전 협의된 일정에 따라 주말 및 공휴일 방문이 가능합니다. 자세한 일정은 상담 시 조정합니다.',
  },
  {
    cat: '비용',
    q: '계약 후 서비스 시간을 변경할 수 있나요?',
    a: '가능합니다. 어르신과 가족의 상황에 맞춰 시간 조정을 위한 상담을 제공합니다. 변경 시 새 계약서 작성이 필요합니다.',
  },
];

const CATS = ['전체', '신청', '서비스', '비용'];

export default function FAQPage() {
  const [activeCat, setActiveCat] = useState('전체');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filtered = activeCat === '전체' ? FAQS : FAQS.filter((f) => f.cat === activeCat);

  return (
    <>
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
