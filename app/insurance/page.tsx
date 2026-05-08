import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { SectionBlock } from '@/components/SectionBlock';
import { CTASection } from '@/components/CTASection';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: '노인장기요양보험',
  description: '노인장기요양보험 안내 — 대상자 / 등급 / 본인부담금. 국민건강보험공단 정식 협력 기관 대전케어 방문요양센터.',
  alternates: { canonical: '/insurance' },
};

const COST_BREAKDOWN = [
  { type: '일반 대상자', percent: '15%', desc: '기본 본인부담률', color: 'bg-gray-100' },
  { type: '감경 대상자', percent: '9%', desc: '소득·재산 기준 일부 감경', color: 'bg-brand-50' },
  { type: '감경 대상자', percent: '6%', desc: '추가 감경 적용 대상', color: 'bg-brand-100' },
  { type: '기초수급자', percent: '0%', desc: '본인부담금 전액 면제', color: 'bg-brand-200' },
];

const ELIGIBILITY = [
  {
    title: '대상',
    desc: '고령이나 노인성 질환으로 혼자서 일상생활을 수행하기 어려운 어르신 중, 국민건강보험공단으로부터 장기요양인정 및 등급판정을 받은 자',
  },
  {
    title: '지원 내용',
    desc: '신체활동 또는 목욕, 식사 및 일상생활의 도움, 말벗이나 격려 등의 정서적인 지원, 병원동행이나 산책 등의 활동 지원, 인지활동 지원',
  },
  {
    title: '목적',
    desc: '어르신 노후의 건강증진 및 생활의 안정, 가족 부담의 경감, 가족 구성원의 삶의 질 향상',
  },
];

export default function InsurancePage() {
  return (
    <>
      <PageHero
        title="노인장기요양보험"
        sub="국민건강보험공단의 사회보장 제도를 안내드립니다"
        crumbs={[{ label: '노인장기요양보험' }]}
      />

      {/* 정의 */}
      <section className="bg-white py-20">
        <div className="max-w-[1000px] mx-auto px-5">
          <SectionBlock
            eyebrow="INSURANCE"
            title="노인장기요양보험이란?"
            sub={
              <>
                고령이나 노인성 질병으로 인해 혼자서 일상생활을 수행하기 어려운{' '}
                <strong className="text-ink-primary">65세 이상의 노인</strong>에게
                <br className="hidden md:inline" />
                신체 활동 또는 가사 지원 등의 장기 요양 급여를 제공하는 사회보장 제도입니다.
              </>
            }
          />
          <div className="mt-12 bg-brand-50 p-7 md:p-10 border-l-4 border-brand-400">
            <p className="text-brand-400 font-semibold tracking-[0.15em] text-sm mb-3">
              | 재가복지서비스 (방문요양·방문목욕)
            </p>
            <p className="text-lg md:text-xl text-ink-primary leading-relaxed font-medium">
              국민건강보험공단으로부터{' '}
              <span className="text-brand-400 font-bold">비용의 85%</span>를 지원받는
              사회보장보험입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 본인부담금 */}
      <section className="bg-[#f8f8f8] py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <SectionBlock
            eyebrow="COST"
            title="본인부담금"
            sub="대상자 분류에 따라 본인부담률이 다릅니다"
            className="mb-12"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {COST_BREAKDOWN.map((c, i) => (
              <Reveal key={i} delay={i * 0.06} className={`${c.color} p-6 md:p-7 text-center hover:shadow-md transition-shadow`}>
                <p className="text-4xl md:text-5xl font-bold text-brand-700 mb-2 tabular-nums">
                  {c.percent}
                </p>
                <h3 className="font-bold text-ink-primary mb-1">{c.type}</h3>
                <p className="text-xs text-ink-muted">{c.desc}</p>
              </Reveal>
            ))}
          </div>
          <p className="text-center text-xs text-ink-muted mt-6">
            * 정확한 본인부담금은 국민건강보험공단 또는 대전케어 상담을 통해 확인하세요.
          </p>
        </div>
      </section>

      {/* 대상/지원내용/목적 */}
      <section className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <SectionBlock
            eyebrow="DETAIL"
            title="대상 · 지원 · 목적"
            className="mb-12"
          />
          <div className="grid md:grid-cols-3 gap-5">
            {ELIGIBILITY.map((e, i) => (
              <Reveal key={i} delay={i * 0.08} className="bg-[#f8f8f8] p-7 hover:bg-brand-50 transition-colors">
                <div className="w-10 h-10 bg-brand-600 text-white grid place-items-center font-bold mb-4" style={{ borderRadius: '2px' }}>
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-ink-primary mb-3">{e.title}</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">{e.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Wave 363: <aside> = complementary landmark (cross-page navigation) */}
      <aside aria-label="추천 페이지" className="bg-white py-16">
        <div className="max-w-[1000px] mx-auto px-5">
          <SectionBlock eyebrow="NEXT STEP" title="더 알아보기" sub="장기요양 신청 방법과 비용" className="mb-10" />
          <div className="grid md:grid-cols-2 gap-5">
            <a
              href="/insurance/grade"
              className="group bg-[#f8f8f8] hover:bg-brand-50 p-7 transition-colors block border-l-4 border-brand-600"
            >
              <p className="text-xs text-brand-600 font-bold tracking-[0.15em] mb-2">GRADES</p>
              <h3 className="text-lg font-bold text-ink-primary mb-2 group-hover:text-brand-600 transition-colors">
                등급 신청 방법 →
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                국민건강보험공단 5단계 신청 절차 + 6 등급 안내.
              </p>
            </a>
            <a
              href="/insurance/cost"
              className="group bg-[#f8f8f8] hover:bg-brand-50 p-7 transition-colors block border-l-4 border-[#1B6F4A]"
            >
              <p className="text-xs text-[#1B6F4A] font-bold tracking-[0.15em] mb-2">CALCULATOR</p>
              <h3 className="text-lg font-bold text-ink-primary mb-2 group-hover:text-[#1B6F4A] transition-colors">
                본인부담금 계산기 →
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                등급별 월 본인부담액을 즉시 계산하세요.
              </p>
            </a>
          </div>
        </div>
      </aside>

      <CTASection
        title="등급 신청부터 도와드립니다"
        sub="복잡한 절차, 대전케어가 처음부터 동행합니다"
      />
    </>
  );
}
