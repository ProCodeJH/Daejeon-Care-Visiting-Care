import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { SectionBlock } from '@/components/SectionBlock';
import { CTASection } from '@/components/CTASection';
import { Reveal } from '@/components/Reveal';
import { HowToJsonLd } from '@/components/HowToJsonLd';

export const metadata: Metadata = {
  title: '장기요양등급 절차',
  description: '장기요양 등급 신청 5단계 절차 + 6단계 등급 안내. 국민건강보험공단 신청부터 결과 통보까지 약 30일.',
  alternates: { canonical: '/insurance/grade' },
};

const GRADES = [
  {
    grade: '1등급',
    score: '95점 이상',
    desc: '일상생활에서 전적으로 다른 사람의 도움이 필요한 상태',
    weight: 100,
  },
  {
    grade: '2등급',
    score: '75 ~ 94점',
    desc: '일상생활에서 상당 부분 다른 사람의 도움이 필요한 상태',
    weight: 84,
  },
  {
    grade: '3등급',
    score: '60 ~ 74점',
    desc: '일상생활에서 부분적으로 다른 사람의 도움이 필요한 상태',
    weight: 68,
  },
  {
    grade: '4등급',
    score: '51 ~ 59점',
    desc: '일상생활에서 일정 부분 다른 사람의 도움이 필요한 상태',
    weight: 56,
  },
  {
    grade: '5등급',
    score: '45 ~ 50점 + 치매',
    desc: '치매 환자 (노인성 치매로 일정 점수 미만이지만 치매 진단 받은 자)',
    weight: 48,
  },
  {
    grade: '인지지원등급',
    score: '45점 미만 + 치매',
    desc: '치매 환자 중 신체 기능은 양호하나 인지 활동 지원이 필요한 자',
    weight: 36,
  },
];

const STEPS = [
  { num: '01', title: '신청서 제출', desc: '국민건강보험공단 지사 또는 인터넷·우편으로 신청' },
  { num: '02', title: '방문조사', desc: '공단 직원이 어르신 댁을 방문하여 5개 영역 52개 항목 조사' },
  { num: '03', title: '의사 소견서', desc: '주치의 또는 지정 의사로부터 소견서 발급' },
  { num: '04', title: '등급판정위원회', desc: '의사·법조인 등 전문가가 등급 판정' },
  { num: '05', title: '결과 통보', desc: '신청일로부터 약 30일 이내 등급 결과 통보' },
];

export default function GradePage() {
  return (
    <>
      <HowToJsonLd
        name="장기요양 등급 신청 방법"
        description="국민건강보험공단에 장기요양 등급을 신청하고 결과를 받기까지 5단계 절차"
        totalTime="P30D"
        steps={STEPS.map((s) => ({ name: s.title, text: s.desc }))}
      />
      <PageHero
        bg="/page-hero/page-hero-6.png"
        title="장기요양등급절차 및 심사"
        sub="등급 신청부터 결과 통보까지 안내드립니다"
        crumbs={[
          { label: '노인장기요양보험', href: '/insurance' },
          { label: '장기요양등급절차 및 심사' },
        ]}
      />

      {/* 등급 6단계 */}
      <section className="bg-[#F6F8FB] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-5">
          <SectionBlock
            eyebrow="GRADES"
            title="장기요양 등급 6단계"
            sub="신체 기능 / 인지 기능 / 행동 변화 등을 평가한 점수에 따라 등급이 결정됩니다"
            className="mb-12"
          />
          <div className="mb-8 grid gap-4 border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-3 md:p-6">
            {[
              { label: '평가 기준', value: '52개 항목' },
              { label: '결과 통보', value: '약 30일' },
              { label: '센터 지원', value: '신청 동행' },
            ].map((item) => (
              <div key={item.label} className="border-l-2 border-brand-700 pl-4">
                <p className="text-xs font-bold tracking-[0.14em] text-slate-500">{item.label}</p>
                <p className="mt-1 text-xl font-extrabold text-ink-primary">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GRADES.map((g, i) => (
              <Reveal
                key={g.grade}
                delay={i * 0.06}
                className="care-grade-card group flex min-h-[230px] flex-col border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p lang="en" className="text-[11px] font-extrabold tracking-[0.18em] text-brand-700">
                      GRADE {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-2 text-2xl font-extrabold text-ink-primary">{g.grade}</h3>
                  </div>
                  <p className="shrink-0 border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700" style={{ borderRadius: '999px' }}>
                    {g.score}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-ink-secondary">{g.desc}</p>
                <div className="mt-auto pt-6">
                  <div className="mb-2 flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span>심사 강도</span>
                    <span>{g.score}</span>
                  </div>
                  <div className="h-2 overflow-hidden bg-slate-100">
                    <span
                      aria-hidden="true"
                      className="block h-full bg-gradient-to-r from-brand-800 via-brand-600 to-[#E63946] transition-all duration-700 group-hover:brightness-110"
                      style={{ width: `${g.weight}%` }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          {/* Wave 357: <small> semantic — disclaimer/면책 (HTML5 small print) */}
          <small className="block text-center text-xs text-ink-muted mt-8">
            * 점수는 국민건강보험공단의 장기요양인정 점수표 기준 (참고용)
          </small>
        </div>
      </section>

      {/* 신청 절차 5단계 */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-5">
          <SectionBlock
            eyebrow="PROCESS"
            title="등급 신청 절차"
            sub="신청부터 등급 결과 통보까지 약 30일"
            className="mb-12"
          />
          {/* Wave 355: <ol>+<li> WCAG 1.3.1 (sequential process semantic). list-none = decimal marker 숨김 (visual badge로 대체) */}
          <ol className="care-process-track grid gap-4 list-none p-0 m-0 md:grid-cols-5">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.num} delay={i * 0.08} className="relative z-10">
                <div className="care-process-card h-full border border-slate-200 bg-[#F8FAFC] p-5 text-center shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-300 hover:bg-white hover:shadow-xl">
                  <div className="care-process-node mx-auto mb-5 grid h-12 w-12 place-items-center bg-slate-950 text-white font-extrabold" data-delay={String(i)} style={{ borderRadius: '4px' }}>
                    {s.num}
                  </div>
                  <h3 className="font-bold text-ink-primary mb-2 text-sm">{s.title}</h3>
                  <p className="text-xs text-ink-muted leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 어디서 신청? */}
      <section className="bg-white py-20">
        <div className="max-w-[900px] mx-auto px-5">
          <div className="bg-brand-50 p-8 md:p-10 border-l-4 border-brand-400">
            <p lang="en" className="text-brand-400 font-semibold tracking-[0.15em] text-sm mb-3"><span aria-hidden="true">|</span> WHERE TO APPLY</p>
            <h3 className="text-xl md:text-2xl font-bold text-ink-primary mb-4">
              어디서 어떻게 신청하나요?
            </h3>
            <ul className="space-y-3 text-ink-secondary">
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-brand-400 font-bold mt-0.5">·</span>
                <span><strong>방문</strong>: 가까운 국민건강보험공단 지사</span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-brand-400 font-bold mt-0.5">·</span>
                <span><strong>인터넷</strong>: 국민건강보험공단 홈페이지 (www.nhis.or.kr)</span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-brand-400 font-bold mt-0.5">·</span>
                <span><strong>우편/팩스</strong>: 공단 지사에 신청서 발송</span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="text-brand-400 font-bold mt-0.5">·</span>
                <span><strong>대리신청</strong>: 가족·이해관계인이 위임장으로 대리 신청</span>
              </li>
            </ul>
            {/* Wave 486: emoji aria-hidden (paradigm 16 saturation) */}
            <p className="mt-5 text-sm text-ink-secondary bg-white p-4 border border-brand-200">
              <span className="mr-2 inline-block bg-brand-600 px-2 py-0.5 text-xs font-bold text-white" style={{ borderRadius: '2px' }}>안내</span>
              대전케어가 신청서 작성부터 결과 통보까지 <strong className="text-brand-400">전 과정 동행</strong>합니다.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="등급 신청, 어렵게 느껴지셨나요?"
        sub="대전케어가 처음부터 끝까지 함께 합니다"
      />
    </>
  );
}
