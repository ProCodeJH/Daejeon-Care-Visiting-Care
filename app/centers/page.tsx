import { PageHero } from '@/components/PageHero';
import { SectionBlock } from '@/components/SectionBlock';
import { CTASection } from '@/components/CTASection';
import { Reveal } from '@/components/Reveal';
import { StatsCounter } from '@/components/StatsCounter';
import { CONTACT } from '@/lib/contact';
import { CENTERS } from '@/content/centers';
import { MapPin, Users, Phone, ChevronRight } from 'lucide-react';

export const metadata = {
  title: '대전 5구 지점',
  description: '대전케어 방문요양센터 대전 5구 지점 안내 — 유성구·대덕구·서구·중구·동구 각 지점별 매니저 매칭.',
  alternates: { canonical: '/centers' },
};

export default function CentersPage() {
  const totalManagers = CENTERS.reduce((sum, c) => sum + c.managers, 0);

  return (
    <>
      <PageHero
        title="대전 5구 지점"
        sub="유성·대덕·서구·중구·동구 — 가까운 지점에서 빠르게"
        crumbs={[{ label: '센터소개' }, { label: '5구 지점' }]}
      />

      {/* 통합 stats */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-3 gap-6 text-center">
          <Reveal>
            <p className="text-3xl md:text-4xl font-extrabold text-[#1B6F4A] mb-1 tabular-nums">
              <StatsCounter value={CENTERS.length} suffix="구" />
            </p>
            <p className="text-xs md:text-sm text-ink-muted font-medium">대전 5구 모두 운영</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-3xl md:text-4xl font-extrabold text-[#1B6F4A] mb-1 tabular-nums">
              <StatsCounter value={totalManagers} suffix="명" />
            </p>
            <p className="text-xs md:text-sm text-ink-muted font-medium">총 자격 매니저 수</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-3xl md:text-4xl font-extrabold text-[#E63946] mb-1 tabular-nums">
              <StatsCounter value={24} suffix="시간" />
            </p>
            <p className="text-xs md:text-sm text-ink-muted font-medium">365일 상담 가능</p>
          </Reveal>
        </div>
      </section>

      {/* 지점 카드 grid */}
      <section className="bg-[#f8f8f8] py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <SectionBlock
            eyebrow="LOCATIONS"
            title="가까운 지점 찾기"
            sub="어르신 거주지 인근 지점에서 매니저를 매칭드립니다"
            className="mb-12"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CENTERS.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.06}>
                <article className="bg-white p-7 hover:shadow-md transition-all border-t-4 border-brand-600 h-full">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-ink-primary mb-1">{c.name}</h3>
                      <p className="text-xs text-ink-muted">{c.region}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-brand-600 font-semibold text-sm">
                      <Users size={14} />
                      {c.managers}명
                    </div>
                  </div>

                  {/* Wave 381: <address> semantic — 각 center가 <article>이므로 이 안의 address는 그 center의 contact info (HTML5 정확) */}
                  <address className="not-italic text-sm text-ink-secondary mb-4 flex items-start gap-2">
                    <MapPin size={14} className="text-brand-600 mt-0.5 shrink-0" />
                    <span>{c.address}</span>
                  </address>

                  <ul className="text-sm text-ink-secondary space-y-1.5 mb-5 border-t border-gray-100 pt-4">
                    {c.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <ChevronRight size={14} className="text-brand-400 mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={CONTACT.phoneTel}
                    className="flex items-center justify-center gap-2 bg-[#1B6F4A] hover:bg-[#15573A] text-white py-2.5 font-semibold transition-colors text-sm"
                    style={{ borderRadius: '2px' }}
                  >
                    <Phone size={14} />
                    {c.shortName} 지점 상담 · {CONTACT.phone}
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 매칭 paradigm */}
      <section className="bg-white py-16">
        <div className="max-w-[900px] mx-auto px-5">
          <div className="bg-brand-50 p-8 md:p-10 border-l-4 border-brand-600">
            <p className="text-brand-600 font-semibold tracking-[0.15em] text-sm mb-3">| MATCHING</p>
            <h3 className="text-xl md:text-2xl font-bold text-ink-primary mb-4">
              어르신 댁에서 가장 가까운 매니저 우선 매칭
            </h3>
            <p className="text-ink-secondary leading-relaxed mb-3">
              대전케어는 어르신 거주지 5km 이내 매니저를 우선 매칭합니다.
              짧은 이동 시간 = 약속 시간 정확 + 어르신 부담 감소.
            </p>
            <p className="text-sm text-ink-muted">
              💡 5구 외 지역 (세종·청주·옥천 등) 거주 어르신도 상담 가능. {CONTACT.phone}으로 문의 주세요.
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
              <p className="text-xs text-brand-600 font-bold tracking-[0.15em] mb-2">SERVICE</p>
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
              <p className="text-xs text-[#1B6F4A] font-bold tracking-[0.15em] mb-2">MAP</p>
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
