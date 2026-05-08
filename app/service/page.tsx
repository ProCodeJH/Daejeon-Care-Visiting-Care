import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { SectionBlock } from '@/components/SectionBlock';
import { CTASection } from '@/components/CTASection';
import { Reveal } from '@/components/Reveal';
import { HandHeart, Home, Footprints, MessageCircle, type LucideIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: '서비스 소개',
  description: '대전케어 방문요양 서비스 — 신체활동 / 일상생활 / 개인활동 / 정서 지원 4종. 어르신 댁으로 직접 찾아가는 케어.',
  alternates: { canonical: '/service' },
};

type SubService = {
  Icon: LucideIcon;
  title: string;
  items: string[];
};

const SUB_SERVICES: SubService[] = [
  {
    Icon: HandHeart,
    title: '신체활동 지원',
    items: ['세면 도움', '구강 관리', '머리 감기기', '몸단장', '옷 갈아입히기', '목욕 도움', '식사 도움', '체위 변경', '이동 도움', '신체기능 유지/증진', '화장실 이용'],
  },
  {
    Icon: Home,
    title: '일상생활 지원',
    items: ['취사', '청소 및 주변정돈', '세탁'],
  },
  {
    Icon: Footprints,
    title: '개인활동 지원',
    items: ['외출 시 동행', '일상업무 대행 (약국/병원 약 타오기 등)'],
  },
  {
    Icon: MessageCircle,
    title: '정서 지원',
    items: ['말벗', '격려 및 위로', '생활상담'],
  },
];

export default function ServicePage() {
  return (
    <>
      <PageHero
        title="서비스 소개"
        sub="어르신의 편안한 노후를 위해 최선을 다하겠습니다"
        crumbs={[{ label: '센터소개', href: '/about' }, { label: '서비스 소개' }]}
      />

      {/* 방문요양 정의 */}
      <section className="bg-white py-20">
        <div className="max-w-[1000px] mx-auto px-5">
          <SectionBlock
            eyebrow="VISIT CARE"
            title="방문요양이란?"
            sub={
              <>
                요양보호사가 대상의 집을 방문하여 신체활동, 일상생활 및 가사활동을 지원하고
                <br className="hidden md:inline" />
                정서적으로 안정을 제공하는 서비스입니다. 하루 3~4시간 동안 진행됩니다.
              </>
            }
          />
        </div>
      </section>

      {/* 대상자 */}
      <section className="bg-[#f8f8f8] py-16">
        <div className="max-w-[900px] mx-auto px-5">
          <div className="bg-white p-8 md:p-10 border-l-4 border-brand-400">
            <p lang="en" className="text-brand-400 font-semibold tracking-[0.2em] text-sm mb-3">| ELIGIBILITY</p>
            <h3 className="text-xl md:text-2xl font-bold text-ink-primary mb-4">
              방문요양 대상자
            </h3>
            <p className="text-ink-secondary md:text-lg leading-relaxed">
              노인장기요양보호법에 따라{' '}
              <strong className="text-ink-primary">65세 이상의 노인</strong> 및{' '}
              <strong className="text-ink-primary">65세 미만으로 노인성 질병</strong>을 가진 자가
              장기요양인정 신청을 하여 국민건강보험공단으로부터{' '}
              <span className="text-brand-400 font-semibold">'장기요양인정서'</span>를 발급 받으신 분
            </p>
          </div>
        </div>
      </section>

      {/* 세부 서비스 4개 */}
      <section className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <SectionBlock
            eyebrow="DETAIL"
            title="세부 서비스"
            sub="어르신 일상의 모든 영역을 함께합니다"
            className="mb-12"
          />
          <div className="grid md:grid-cols-2 gap-5">
            {SUB_SERVICES.map((s, i) => (
              <Reveal
                key={i}
                delay={i * 0.08}
                className="bg-[#f8f8f8] p-7 hover:bg-brand-50 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 grid place-items-center bg-[#1B6F4A] text-white group-hover:bg-[#15573A] transition-colors" style={{ borderRadius: '2px' }}>
                    <s.Icon size={24} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-xl font-bold text-ink-primary">{s.title}</h3>
                </div>
                <ul className="space-y-2 text-ink-secondary">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm md:text-base">
                      <span className="text-brand-400 mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Wave 363: <aside> = complementary landmark (cross-page navigation) */}
      <aside aria-label="추천 페이지" className="bg-white py-16">
        <div className="max-w-[1000px] mx-auto px-5">
          <SectionBlock eyebrow="NEXT STEP" title="다음 단계" sub="서비스 시작 전 알아두면 좋은 정보" className="mb-10" />
          <div className="grid md:grid-cols-2 gap-5">
            <a
              href="/process"
              className="group bg-[#f8f8f8] hover:bg-brand-50 p-7 transition-colors block border-l-4 border-brand-600"
            >
              <p lang="en" className="text-xs text-brand-600 font-bold tracking-[0.15em] mb-2">STEP</p>
              <h3 className="text-lg font-bold text-ink-primary mb-2 group-hover:text-brand-600 transition-colors">
                서비스 이용 절차 →
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                장기요양인정서 수령부터 서비스 시작까지 6단계 절차를 자세히 안내합니다.
              </p>
            </a>
            <a
              href="/insurance/cost"
              className="group bg-[#f8f8f8] hover:bg-brand-50 p-7 transition-colors block border-l-4 border-[#1B6F4A]"
            >
              <p lang="en" className="text-xs text-[#1B6F4A] font-bold tracking-[0.15em] mb-2">CALCULATOR</p>
              <h3 className="text-lg font-bold text-ink-primary mb-2 group-hover:text-[#1B6F4A] transition-colors">
                본인부담금 계산기 →
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                등급과 본인부담률에 따른 월 본인부담액을 즉시 확인하세요.
              </p>
            </a>
          </div>
        </div>
      </aside>

      <CTASection />
    </>
  );
}
