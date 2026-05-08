import { PageHero } from '@/components/PageHero';
import { SectionBlock } from '@/components/SectionBlock';
import { CTASection } from '@/components/CTASection';
import { Reveal } from '@/components/Reveal';
import { HowToJsonLd } from '@/components/HowToJsonLd';

const STEPS = [
  {
    num: '01',
    title: '장기요양인정서 신청 및 수령',
    desc: '국민건강보험공단으로부터 장기요양인정서 수령',
  },
  {
    num: '02',
    title: '상담 및 신청 문의',
    desc: '대상자 본인 또는 가족이 방문요양센터에 서비스 신청',
  },
  {
    num: '03',
    title: '방문요양서비스 사전조사',
    desc: '센터의 사회복지사가 가정을 방문하여 서비스를 이용하실 대상자의 심신 상태를 체크',
  },
  {
    num: '04',
    title: '서비스 제공 및 계약서 작성',
    desc: '장기요양서비스를 이용하실 경우 원하는 서비스 내용과 시간, 일정 등을 상의하여 계약서 작성',
  },
  {
    num: '05',
    title: '방문요양서비스의 제공',
    desc: '요양보호사가 어르신 가정을 방문하여 신체 및 가사, 일상생활 지원 등의 서비스를 제공',
  },
  {
    num: '06',
    title: '서비스 모니터링',
    desc: '제공되는 서비스를 모니터링 하며 최적의 서비스를 제공할 수 있도록 노력',
  },
];

const VERIFICATION = [
  { num: '01', title: '서류 검증', desc: '자격증·경력 증빙 서류 확인' },
  { num: '02', title: '면접 검증', desc: '대면 인터뷰로 인성·태도 평가' },
  { num: '03', title: '교육 이수', desc: '센터 자체 교육 프로그램 완료' },
  { num: '04', title: '시범 매칭', desc: '어르신 마음에 드실 때까지 교체 가능' },
];

export default function ProcessPage() {
  return (
    <>
      <HowToJsonLd
        name="대전케어 방문요양 서비스 이용 절차"
        description="장기요양인정서 수령부터 방문요양 서비스 시작까지 6단계 절차"
        totalTime="P14D"
        steps={STEPS.map((s) => ({ name: s.title, text: s.desc }))}
      />
      <PageHero
        title="서비스 이용 절차"
        sub="신청부터 서비스까지 한 단계씩 안내드립니다"
        crumbs={[{ label: '센터소개', href: '/about' }, { label: '서비스 이용 절차' }]}
      />

      {/* 6 STEP */}
      <section className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <SectionBlock
            eyebrow="PROCESS"
            title="6단계 이용 절차"
            sub="어르신과 가족이 안심하고 시작할 수 있도록"
            className="mb-12"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {STEPS.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.1}>
                <div className="bg-[#f8f8f8] p-7 hover:bg-brand-50 transition-colors group h-full relative">
                  {/* 연결 선 (다음 카드로) */}
                  {i < STEPS.length - 1 && i % 3 !== 2 && (
                    <span aria-hidden="true" className="hidden lg:block absolute top-12 -right-3 text-brand-400 font-bold text-xl opacity-50">→</span>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-brand-600 group-hover:bg-brand-700 grid place-items-center text-white font-bold transition-colors" style={{ borderRadius: '2px' }}>
                      {s.num}
                    </div>
                    <p className="text-xs text-brand-600 font-semibold tracking-[0.15em]">STEP</p>
                  </div>
                  <h3 className="text-lg font-bold text-ink-primary mb-2 leading-snug">{s.title}</h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 요양보호사 검증절차 */}
      <section className="bg-[#fefffd] py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <SectionBlock
            eyebrow="VERIFICATION"
            title={
              <>
                대전케어만의
                <br />
                <span className="text-brand-400">요양보호사 검증절차</span>
              </>
            }
            sub="어르신께서 마음에 드실 때까지 매니저를 매칭합니다"
            className="mb-12"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {VERIFICATION.map((v) => (
              <div key={v.num} className="bg-white p-6 text-center border border-gray-100 hover:border-brand-400 transition-colors">
                <p className="text-3xl font-bold text-brand-400 mb-2">{v.num}</p>
                <h3 className="font-bold text-ink-primary mb-2">{v.title}</h3>
                <p className="text-sm text-ink-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 다음 단계 추천 (cross-page navigation) */}
      <section className="bg-white py-16">
        <div className="max-w-[1000px] mx-auto px-5">
          <SectionBlock eyebrow="NEXT STEP" title="더 알아보기" sub="이용 절차 다음 단계" className="mb-10" />
          <div className="grid md:grid-cols-2 gap-5">
            <a
              href="/insurance/cost"
              className="group bg-[#f8f8f8] hover:bg-brand-50 p-7 transition-colors block border-l-4 border-[#1B6F4A]"
            >
              <p className="text-xs text-[#1B6F4A] font-bold tracking-[0.15em] mb-2">CALCULATOR</p>
              <h3 className="text-lg font-bold text-ink-primary mb-2 group-hover:text-[#1B6F4A] transition-colors">
                본인부담금 계산 →
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                등급별 월 본인부담액을 즉시 확인하세요.
              </p>
            </a>
            <a
              href="/centers"
              className="group bg-[#f8f8f8] hover:bg-brand-50 p-7 transition-colors block border-l-4 border-brand-600"
            >
              <p className="text-xs text-brand-600 font-bold tracking-[0.15em] mb-2">LOCATIONS</p>
              <h3 className="text-lg font-bold text-ink-primary mb-2 group-hover:text-brand-600 transition-colors">
                대전 5구 지점 →
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                어르신 거주지 인근 가까운 지점을 확인하세요.
              </p>
            </a>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
