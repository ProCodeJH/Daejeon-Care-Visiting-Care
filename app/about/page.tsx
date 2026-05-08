import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { CONTACT } from '@/lib/contact';

export const metadata: Metadata = {
  title: '인사말',
  description: `대전케어 방문요양센터 인사말 — 부모님의 손발이 되겠습니다. 대전 5구 통합, 24시간 상담 ${CONTACT.phone}.`,
  alternates: { canonical: '/about' },
};
import { SectionBlock } from '@/components/SectionBlock';
import { CTASection } from '@/components/CTASection';
import { StatsCounter } from '@/components/StatsCounter';
import { Reveal } from '@/components/Reveal';
import { ShieldCheck, Building2, Award, FileCheck } from 'lucide-react';

/**
 * 공식 등록 + 인증 배지 (자현 정확한 정보로 placeholder swap).
 * lazyweb research (GoGoGrandparent / understood-care / CVS) 패턴 = 신뢰 강화 = senior care 핵심.
 */
const TRUST_BADGES = [
  {
    Icon: Building2,
    title: '대전광역시 등록',
    desc: '관할 구청 정식 등록 방문요양센터',
  },
  {
    Icon: ShieldCheck,
    title: '국민건강보험공단 협력',
    desc: '장기요양보험 청구 정식 기관',
  },
  {
    Icon: Award,
    title: '장기요양기관 지정',
    desc: `지정번호 ${CONTACT.careNumber}`,
  },
  {
    Icon: FileCheck,
    title: '요양보호사 자격 검증',
    desc: `${CONTACT.managerCount}+명 자격증 + 경력 검증 완료`,
  },
];

const VALUES = [
  {
    title: '깊이 이해합니다',
    desc: '나이가 들어감에 따른 변화와 새로운 적응을 깊이 이해합니다.',
  },
  {
    title: '존중하며 고려합니다',
    desc: '어르신들의 살아오신 날들만큼 다양한 경험과 취향을 존중하며 고려합니다.',
  },
  {
    title: '전문성과 성실',
    desc: '마음만으로는 부족할 수 있는 부분들을 위한 전문성과 성실을 위해 노력합니다.',
  },
  {
    title: '친구이자 서포터',
    desc: '어르신들의 친구이자 서포터가 되어 필요를 채워드립니다.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="인사말"
        sub="부모님의 손발이 되겠습니다"
        crumbs={[{ label: '센터소개', href: '/about' }, { label: '인사말' }]}
      />

      {/* 인사말 본문 */}
      <section className="bg-white py-20">
        <div className="max-w-[900px] mx-auto px-5">
          <SectionBlock
            eyebrow="GREETING"
            title={
              <>
                <span className="text-brand-400">대전케어</span>는
                <br />
                부모님을 향한 마음에서 출발했습니다
              </>
            }
            sub={
              <>
                대전케어는 대전 지역에서 운영하는 실버전문서비스 브랜드입니다.
                <br />
                일상생활에서 불편함을 느끼시는 분들에게 정부 지원을 받는 기회를 소개하고,
                <br className="hidden md:inline" />
                마음에 맞는 요양보호사님들을 연결해 드립니다.
              </>
            }
          />

          <div className="mt-12 space-y-5 text-ink-secondary leading-loose md:text-lg">
            <p>
              대전케어는, 저희의 부모님을 향한 마음에서 출발한 만큼{' '}
              <strong className="text-ink-primary">한 분 한 분 정성을 다합니다.</strong>
            </p>
            <p>만나 뵙기를 기대하고 기다립니다. 감사합니다.</p>
          </div>
        </div>
      </section>

      {/* 신뢰 지표 4개 — StatsCounter (whileInView 카운트). Wave 387: <dl> semantic saturation pass */}
      <section className="bg-white pb-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-gray-100 py-10 m-0">
            <div className="text-center flex flex-col-reverse gap-2">
              <dt className="text-sm text-ink-muted font-medium">대전 5구 통합</dt>
              <dd className="text-4xl md:text-5xl font-extrabold text-[#1B6F4A] tabular-nums m-0">
                <StatsCounter value={5} suffix="구" />
              </dd>
            </div>
            <div className="text-center flex flex-col-reverse gap-2">
              <dt className="text-sm text-ink-muted font-medium">365일 상담 가능</dt>
              <dd className="text-4xl md:text-5xl font-extrabold text-[#1B6F4A] tabular-nums m-0">
                <StatsCounter value={24} suffix="시간" />
              </dd>
            </div>
            <div className="text-center flex flex-col-reverse gap-2">
              <dt className="text-sm text-ink-muted font-medium">자격 매니저</dt>
              <dd className="text-4xl md:text-5xl font-extrabold text-[#1B6F4A] tabular-nums m-0">
                <StatsCounter value={CONTACT.managerCount} suffix="+명" />
              </dd>
            </div>
            <div className="text-center flex flex-col-reverse gap-2">
              <dt className="text-sm text-ink-muted font-medium">무료 상담 + 등급 신청 동행</dt>
              <dd className="text-4xl md:text-5xl font-extrabold text-[#1B6F4A] tabular-nums m-0">
                <StatsCounter value={100} suffix="%" />
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 공식 등록 + 인증 배지 (lazyweb research = senior care 신뢰 강화) */}
      <section className="bg-white pb-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <SectionBlock
            eyebrow="OFFICIAL"
            title="공식 등록 + 인증"
            sub="법적으로 인정된 기관으로 안심하고 이용하실 수 있습니다"
            className="mb-10"
          />
          {/* Wave 366: <dl> description list — credential 키-값 (HTML 5.2+ div 그룹핑) */}
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 m-0">
            {TRUST_BADGES.map((b, i) => (
              <Reveal key={i} delay={i * 0.06} className="bg-[#f8f8f8] p-5 text-center hover:bg-brand-50 transition-colors group">
                <div className="w-12 h-12 mx-auto mb-3 grid place-items-center bg-white text-[#1B6F4A] group-hover:bg-[#1B6F4A] group-hover:text-white transition-colors shadow-sm" style={{ borderRadius: '999px' }}>
                  <b.Icon size={22} strokeWidth={1.8} />
                </div>
                <dt className="font-bold text-ink-primary text-sm mb-1">{b.title}</dt>
                <dd className="text-xs text-ink-muted leading-relaxed m-0">{b.desc}</dd>
              </Reveal>
            ))}
          </dl>
          {/* Wave 366: <small> = footnote/disclaimer semantic */}
          <small className="block text-center text-xs text-ink-muted mt-6">
            ※ 정확한 등록번호는 <a href="/contact" className="text-brand-600 hover:underline">상담 문의</a>로 확인 가능합니다.
          </small>
        </div>
      </section>

      {/* 가치 4개 */}
      <section className="bg-[#f8f8f8] py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <SectionBlock
            eyebrow="OUR VALUES"
            title="대전케어가 일하는 마음"
            sub="어르신과 가족 모두에게 신뢰받는 서비스를 위해"
            className="mb-12"
          />
          <div className="grid md:grid-cols-2 gap-5">
            {VALUES.map((v, i) => (
              <Reveal
                key={i}
                delay={i * 0.08}
                className="bg-white p-7 border-l-4 border-brand-600 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-50 grid place-items-center text-brand-600 font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink-primary mb-2">{v.title}</h3>
                    <p className="text-ink-secondary leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Wave 363: <aside> = complementary landmark (cross-page navigation) */}
      <aside aria-label="추천 페이지" className="bg-white py-16">
        <div className="max-w-[1000px] mx-auto px-5">
          <SectionBlock eyebrow="EXPLORE" title="더 알아보기" sub="대전케어 서비스와 절차" className="mb-10" />
          <div className="grid md:grid-cols-2 gap-5">
            <a
              href="/service"
              className="group bg-[#f8f8f8] hover:bg-brand-50 p-7 transition-colors block border-l-4 border-brand-600"
            >
              <p className="text-xs text-brand-600 font-bold tracking-[0.15em] mb-2">SERVICE</p>
              <h3 className="text-lg font-bold text-ink-primary mb-2 group-hover:text-brand-600 transition-colors">
                서비스 소개 →
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                방문요양 4 세부 서비스 (신체/일상/개인/정서 지원).
              </p>
            </a>
            <a
              href="/centers"
              className="group bg-[#f8f8f8] hover:bg-brand-50 p-7 transition-colors block border-l-4 border-[#1B6F4A]"
            >
              <p className="text-xs text-[#1B6F4A] font-bold tracking-[0.15em] mb-2">LOCATIONS</p>
              <h3 className="text-lg font-bold text-ink-primary mb-2 group-hover:text-[#1B6F4A] transition-colors">
                대전 5구 지점 →
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                어르신 거주지 인근 5km 이내 매니저 우선 매칭.
              </p>
            </a>
          </div>
        </div>
      </aside>

      <CTASection title="만나 뵙기를 기다립니다" sub="언제든 편하게 문의 주세요" />
    </>
  );
}
