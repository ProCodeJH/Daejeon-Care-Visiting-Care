import { PageHero } from '@/components/PageHero';
import { SectionBlock } from '@/components/SectionBlock';
import { CTASection } from '@/components/CTASection';
import { Reveal } from '@/components/Reveal';
import { StatsCounter } from '@/components/StatsCounter';
import { CONTACT } from '@/lib/contact';
import { CENTERS } from '@/content/centers';
import { MapPin, Users, Phone, ChevronRight } from 'lucide-react';

export const metadata = {
  title: '본점 안내',
  description: `${CONTACT.name} 본점 — 대전 대덕구 신탄진로 808. 대전 5구 어디든 어르신 댁 인근 매니저 매칭.`,
  alternates: { canonical: '/centers' },
};

export default function CentersPage() {
  const main = CENTERS[0]!;

  return (
    <>
      <PageHero
        title="본점 안내"
        sub="대전 대덕구 신탄진로 808 — 대전 5구 어디든 어르신 댁으로 직접 찾아갑니다"
        crumbs={[{ label: '센터소개' }, { label: '본점 안내' }]}
      />

      {/* 통합 stats — 본점 1곳화 후 신뢰 지표 재구성 */}
      <section className="bg-white py-12 border-b border-gray-100">
        <dl className="max-w-[1200px] mx-auto px-5 grid grid-cols-3 gap-6 text-center m-0">
          <Reveal as="div" className="flex flex-col-reverse gap-1">
            <dt className="text-xs md:text-sm text-ink-muted font-medium">대전 5구 전 지역</dt>
            <dd className="text-3xl md:text-4xl font-extrabold text-[#1B6F4A] tabular-nums m-0">
              <StatsCounter value={5} suffix="구" />
            </dd>
          </Reveal>
          <Reveal as="div" delay={0.1} className="flex flex-col-reverse gap-1">
            <dt className="text-xs md:text-sm text-ink-muted font-medium">자격 매니저 수</dt>
            <dd className="text-3xl md:text-4xl font-extrabold text-[#1B6F4A] tabular-nums m-0">
              <StatsCounter value={main.managers} suffix="명" />
            </dd>
          </Reveal>
          <Reveal as="div" delay={0.2} className="flex flex-col-reverse gap-1">
            <dt className="text-xs md:text-sm text-ink-muted font-medium">365일 상담 가능</dt>
            <dd className="text-3xl md:text-4xl font-extrabold text-[#E63946] tabular-nums m-0">
              <StatsCounter value={24} suffix="시간" />
            </dd>
          </Reveal>
        </dl>
      </section>

      {/* 본점 카드 — 1곳 fullwidth */}
      <section className="bg-[#f8f8f8] py-20">
        <div className="max-w-[900px] mx-auto px-5">
          <SectionBlock
            eyebrow="MAIN OFFICE"
            title="본점 위치"
            sub="대전 대덕구 신탄진로 808 — 본점 1곳에서 대전 5구 전 지역 매니저 운영"
            className="mb-12"
          />
          <Reveal>
            <article className="bg-white p-8 md:p-10 hover:shadow-md transition-all border-t-4 border-brand-600">
              <div className="flex items-baseline justify-between mb-5">
                <div>
                  <h3 className="text-2xl font-bold text-ink-primary mb-1">{main.name}</h3>
                  <p className="text-sm text-ink-muted">{main.region}</p>
                </div>
                <div className="flex items-center gap-1.5 text-brand-600 font-semibold">
                  <Users size={16} />
                  {main.managers}명
                </div>
              </div>

              <address className="not-italic text-base text-ink-secondary mb-5 flex items-start gap-2">
                <MapPin size={16} className="text-brand-600 mt-1 shrink-0" />
                <span className="leading-relaxed">{main.address}</span>
              </address>

              <ul className="text-sm text-ink-secondary space-y-2 mb-6 border-t border-gray-100 pt-5">
                {main.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <ChevronRight size={14} className="text-brand-400 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={CONTACT.phoneTel}
                aria-label={`본점 상담 전화 걸기 ${CONTACT.phone}`}
                className="flex items-center justify-center gap-2 bg-[#1B6F4A] hover:bg-[#15573A] text-white py-3 font-semibold transition-colors"
                style={{ borderRadius: '2px' }}
              >
                <Phone size={16} />
                본점 상담 · {CONTACT.phone}
              </a>
            </article>
          </Reveal>
        </div>
      </section>

      {/* 매칭 paradigm */}
      <section className="bg-white py-16">
        <div className="max-w-[900px] mx-auto px-5">
          <div className="bg-brand-50 p-8 md:p-10 border-l-4 border-brand-600">
            <p lang="en" className="text-brand-600 font-semibold tracking-[0.15em] text-sm mb-3"><span aria-hidden="true">|</span> MATCHING</p>
            <h3 className="text-xl md:text-2xl font-bold text-ink-primary mb-4">
              어르신 댁에서 가장 가까운 매니저 우선 매칭
            </h3>
            <p className="text-ink-secondary leading-relaxed mb-3">
              본점은 신탄진로 808에 있지만 매니저는 대전 5구 곳곳에 거주합니다.
              어르신 댁 인근 매니저를 우선 매칭해 짧은 이동·정확한 약속 시간·어르신 부담 감소를 만들어 드립니다.
            </p>
            <p className="text-sm text-ink-muted">
              <span aria-hidden="true">💡</span> 5구 외 지역(세종·청주·옥천 등) 거주 어르신도 먼저 상담해 드립니다. {CONTACT.phone}으로 편하게 연락 주세요.
            </p>
          </div>
        </div>
      </section>

      {/* Wave 363: <aside> = complementary landmark (cross-page navigation) */}
      <aside aria-label="추천 페이지" className="bg-white py-16">
        <div className="max-w-[1000px] mx-auto px-5">
          <SectionBlock eyebrow="EXPLORE" title="더 알아보기" sub="서비스 소개와 찾아오시는 길" className="mb-10" />
          <div className="grid md:grid-cols-2 gap-5">
            <a
              href="/service"
              className="group bg-[#f8f8f8] hover:bg-brand-50 p-7 transition-colors block border-l-4 border-brand-600"
            >
              <p lang="en" className="text-xs text-brand-600 font-bold tracking-[0.15em] mb-2">SERVICE</p>
              <h3 className="text-lg font-bold text-ink-primary mb-2 group-hover:text-brand-600 transition-colors">
                서비스 소개 →
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                방문요양 4 세부 서비스 (신체/일상/개인/정서).
              </p>
            </a>
            <a
              href="/map"
              className="group bg-[#f8f8f8] hover:bg-brand-50 p-7 transition-colors block border-l-4 border-[#1B6F4A]"
            >
              <p lang="en" className="text-xs text-[#1B6F4A] font-bold tracking-[0.15em] mb-2">MAP</p>
              <h3 className="text-lg font-bold text-ink-primary mb-2 group-hover:text-[#1B6F4A] transition-colors">
                찾아오시는 길 →
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                본점 위치 + 교통편 + 운영 시간 안내.
              </p>
            </a>
          </div>
        </div>
      </aside>

      <CTASection />
    </>
  );
}
