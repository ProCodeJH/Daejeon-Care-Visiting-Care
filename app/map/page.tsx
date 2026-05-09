import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { SectionBlock } from '@/components/SectionBlock';
import { CTASection } from '@/components/CTASection';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { CONTACT } from '@/lib/contact';

export const metadata: Metadata = {
  title: '찾아오시는 길',
  description: `${CONTACT.name} 본점 위치 + 교통편 + 운영 시간. 대전 5구 어디서나 가까운 지점에서 매니저 매칭.`,
  alternates: { canonical: '/map' },
};

export default function MapPage() {
  return (
    <>
      <PageHero
        bg="/page-hero/page-hero-10.png"
        title="찾아오시는 길"
        sub="대전 대덕구 신탄진로 808 — 본점 1곳에서 대전 5구 전 지역 매니저 운영"
        crumbs={[{ label: '센터소개', href: '/about' }, { label: '찾아오시는 길' }]}
      />

      {/* 지도 + 정보 */}
      <section className="bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-5">
          {/* 카카오맵 임베드 — 신탄진로 808 좌표.
           * Wave 575: 일반 검색 결과 카카오맵 iframe 임베드 (저작권 0).
           * 자현이 카카오맵 좌표 추출해 src 정확화 가능. 우선 검색 URL로 작동. */}
          <div className="aspect-[16/9] md:aspect-[3/1] mb-10 border border-gray-200 overflow-hidden">
            <iframe
              src="https://map.kakao.com/?q=%EB%8C%80%EC%A0%84%20%EB%8C%80%EB%8D%95%EA%B5%AC%20%EC%8B%A0%ED%83%84%EC%A7%84%EB%A1%9C%20808"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              title="대전케어 본점 위치 — 대전 대덕구 신탄진로 808"
              allowFullScreen
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* 본점 */}
            <div className="bg-[#f8f8f8] p-7">
              <p lang="en" className="text-brand-400 font-semibold tracking-[0.15em] text-sm mb-2"><span aria-hidden="true">|</span> HEAD OFFICE</p>
              <h3 className="text-xl font-bold text-ink-primary mb-5">대전케어 본점</h3>
              <address className="space-y-3 text-ink-secondary not-italic">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-brand-400 mt-1 shrink-0" />
                  <span>{CONTACT.address}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-brand-400 mt-1 shrink-0" />
                  {/* Wave 354: tel: 링크 — 본점 정보 one-tap dial */}
                  {/* Wave 493: TEL/FAX 영문 abbreviation lang="en" + · aria-hidden (paradigm 16 saturation) */}
                  <span>
                    <span lang="en">TEL</span>.{' '}
                    <a
                      href={CONTACT.phoneTel}
                      aria-label={`전화 걸기 본점 ${CONTACT.phone}`}
                      className="font-medium hover:text-brand-400 hover:underline transition-colors"
                    >
                      {CONTACT.phone}
                    </a>
                    {' '}<span aria-hidden="true">·</span>{' '}<span lang="en">FAX</span>. {CONTACT.phone}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-brand-400 mt-1 shrink-0" />
                  <span>평일 09:00 ~ 18:00 (토·일·공휴일 휴무)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-brand-400 mt-1 shrink-0" />
                  {/* Wave 354: mailto: 링크 — 메일 클라이언트 자동 열림 */}
                  <a
                    href={CONTACT.emailMailto}
                    className="hover:text-brand-400 hover:underline transition-colors"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </address>
            </div>

            {/* 교통편 */}
            <div className="bg-brand-50 p-7">
              <p lang="en" className="text-brand-400 font-semibold tracking-[0.15em] text-sm mb-2"><span aria-hidden="true">|</span> TRANSPORT</p>
              <h3 className="text-xl font-bold text-ink-primary mb-5">교통편 안내</h3>
              <div className="space-y-4 text-ink-secondary">
                <div>
                  <p className="font-semibold text-ink-primary mb-1"><span aria-hidden="true">🚇</span> 지하철</p>
                  <p className="text-sm">대전 1호선 [역명] [번호] 출구 도보 [분]</p>
                </div>
                <div>
                  <p className="font-semibold text-ink-primary mb-1"><span aria-hidden="true">🚌</span> 버스</p>
                  <p className="text-sm">[정류장명] 하차 도보 [분] · [버스번호] 노선</p>
                </div>
                <div>
                  <p className="font-semibold text-ink-primary mb-1"><span aria-hidden="true">🚗</span> 자차</p>
                  <p className="text-sm">건물 부설 주차장 이용 가능 (방문 시 무료)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave 361: <aside> = complementary landmark (cross-page navigation) */}
      <aside aria-label="추천 페이지" className="bg-white py-16">
        <div className="max-w-[1000px] mx-auto px-5">
          <SectionBlock eyebrow="EXPLORE" title="더 알아보기" sub="가까운 지점 + 직접 문의" className="mb-10" />
          <div className="grid md:grid-cols-2 gap-5">
            <a
              href="/centers"
              className="group bg-[#f8f8f8] hover:bg-brand-50 p-7 transition-colors block border-l-4 border-brand-600"
            >
              <p lang="en" className="text-xs text-brand-600 font-bold tracking-[0.15em] mb-2">LOCATIONS</p>
              <h3 className="text-lg font-bold text-ink-primary mb-2 group-hover:text-brand-600 transition-colors">
                대전 5구 지점 →
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                유성·대덕·서구·중구·동구 지점별 매니저 매칭.
              </p>
            </a>
            <a
              href="/contact"
              className="group bg-[#f8f8f8] hover:bg-brand-50 p-7 transition-colors block border-l-4 border-[#1E40AF]"
            >
              <p lang="en" className="text-xs text-[#1E40AF] font-bold tracking-[0.15em] mb-2">CONTACT</p>
              <h3 className="text-lg font-bold text-ink-primary mb-2 group-hover:text-[#1E40AF] transition-colors">
                직접 문의하기 →
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                전화 {CONTACT.phone} 또는 온라인 폼 (24시간).
              </p>
            </a>
          </div>
        </div>
      </aside>

      <CTASection title="방문 전 전화 주세요" sub="안내 드릴 사항이 있을 수 있습니다" />
    </>
  );
}
