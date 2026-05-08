import { PageHero } from '@/components/PageHero';
import { SectionBlock } from '@/components/SectionBlock';
import { CTASection } from '@/components/CTASection';
import { Reveal } from '@/components/Reveal';

import { Brain, ShieldCheck, UtensilsCrossed, Pill, Palette, ClipboardList, type LucideIcon } from 'lucide-react';

type Topic = { title: string; desc: string; Icon: LucideIcon; href: string };

const TOPICS: Topic[] = [
  { title: '치매 어르신 케어', desc: '치매 진행을 늦추는 일상 케어 방법', Icon: Brain, href: '/info/dementia' },
  { title: '낙상 예방', desc: '집안에서 어르신 낙상을 막는 7가지', Icon: ShieldCheck, href: '/info/fall' },
  { title: '식사 관리', desc: '연령대별 식단 가이드 + 영양제 안내', Icon: UtensilsCrossed, href: '/info/meal' },
  { title: '복용약 관리', desc: '여러 약을 안전하게 복용하는 법', Icon: Pill, href: '/info/medication' },
  { title: '인지활동', desc: '두뇌 자극 활동으로 활기찬 일상', Icon: Palette, href: '/info/cognitive' },
  { title: '복지 서비스', desc: '국가/지자체 복지 서비스 신청 가이드', Icon: ClipboardList, href: '/info/welfare' },
];

const RESOURCES = [
  { title: '국민건강보험공단', sub: '장기요양보험 신청', href: 'https://www.nhis.or.kr' },
  { title: '실버용품 쇼핑몰', sub: '복지용구 구입', href: '#' },
  { title: '요양기관 검색', sub: '전국 요양기관 정보', href: '#' },
  { title: '복지 서비스', sub: '대전시 어르신 복지', href: '#' },
];

export default function InfoPage() {
  return (
    <>
      <PageHero
        title="요양 정보"
        sub="어르신과 가족이 알아두면 좋은 정보"
        crumbs={[{ label: '노인정보', href: '/info' }, { label: '요양 정보' }]}
      />

      {/* 주제별 정보 */}
      <section className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <SectionBlock
            eyebrow="TOPICS"
            title="알아두면 좋은 정보"
            sub="어르신을 모시는 가족을 위한 실용 가이드"
            className="mb-12"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOPICS.map((t, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <a
                  href={t.href}
                  className="group block bg-[#f8f8f8] hover:bg-brand-50 p-7 transition-colors"
                >
                <div className="w-12 h-12 grid place-items-center bg-white group-hover:bg-brand-600 text-brand-600 group-hover:text-white transition-colors mb-4 shadow-sm" style={{ borderRadius: '2px' }}>
                  <t.Icon size={24} strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-bold text-ink-primary mb-2 group-hover:text-brand-600 transition-colors">
                  {t.title}
                </h3>
                <p className="text-sm text-ink-secondary leading-relaxed">{t.desc}</p>
                  <p className="text-xs text-brand-600 mt-4 font-semibold">자세히 보기 →</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 외부 자원 */}
      <section className="bg-[#f8f8f8] py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <SectionBlock
            eyebrow="RESOURCES"
            title="유용한 외부 자원"
            sub="공단·복지서비스 등 외부 사이트 안내"
            className="mb-12"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {RESOURCES.map((r, i) => (
              <a
                key={i}
                href={r.href}
                target="_blank"
                rel="noreferrer"
                className="bg-white p-6 hover:shadow-md transition-shadow border border-gray-100 hover:border-brand-400"
              >
                <p className="font-bold text-ink-primary mb-1">{r.title}</p>
                <p className="text-sm text-ink-muted">{r.sub}</p>
                <p className="text-xs text-brand-400 mt-3 font-semibold">바로가기 ↗</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 다음 단계 추천 (cross-page navigation) */}
      <section className="bg-white py-16">
        <div className="max-w-[1000px] mx-auto px-5">
          <SectionBlock eyebrow="EXPLORE" title="더 알아보기" sub="대전케어 이야기 + 서비스" className="mb-10" />
          <div className="grid md:grid-cols-2 gap-5">
            <a
              href="/story"
              className="group bg-[#f8f8f8] hover:bg-brand-50 p-7 transition-colors block border-l-4 border-[#F5A623]"
            >
              <p className="text-xs text-[#F5A623] font-bold tracking-[0.15em] mb-2">STORY</p>
              <h3 className="text-lg font-bold text-ink-primary mb-2 group-hover:text-[#F5A623] transition-colors">
                대전케어 이야기 →
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                현장에서 만난 따뜻한 순간 + 매니저 이야기.
              </p>
            </a>
            <a
              href="/service"
              className="group bg-[#f8f8f8] hover:bg-brand-50 p-7 transition-colors block border-l-4 border-brand-600"
            >
              <p className="text-xs text-brand-600 font-bold tracking-[0.15em] mb-2">SERVICE</p>
              <h3 className="text-lg font-bold text-ink-primary mb-2 group-hover:text-brand-600 transition-colors">
                서비스 소개 →
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                방문요양 4 세부 서비스 (신체/일상/개인/정서).
              </p>
            </a>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
