import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { SectionBlock } from '@/components/SectionBlock';
import { CTASection } from '@/components/CTASection';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { CONTACT } from '@/lib/contact';

export const metadata: Metadata = {
  title: '찾아오시는 길',
  description: '대전케어 방문요양센터 본점 위치 + 교통편 + 운영 시간. 대전 5구 어디서나 가까운 지점에서 매니저 매칭.',
  alternates: { canonical: '/map' },
};

export default function MapPage() {
  return (
    <>
      <PageHero
        title="찾아오시는 길"
        sub="대전 5구 어디서나 가까운 지점에서"
        crumbs={[{ label: '센터소개', href: '/about' }, { label: '찾아오시는 길' }]}
      />

      {/* 지도 + 정보 */}
      <section className="bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-5">
          {/* Kakao Map placeholder — 자현이 실제 daum map embed로 swap */}
          <div className="aspect-[16/9] md:aspect-[3/1] bg-gray-100 mb-10 grid place-items-center border border-gray-200">
            <div className="text-center text-ink-muted">
              <MapPin size={48} className="mx-auto text-brand-400 mb-3" />
              <p className="font-medium">카카오 지도 / Daum 지도 embed 자리</p>
              <p className="text-xs mt-1">자현이 src를 daejeon-care 실제 위치로 swap</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* 본점 */}
            <div className="bg-[#f8f8f8] p-7">
              <p lang="en" className="text-brand-400 font-semibold tracking-[0.15em] text-sm mb-2">| HEAD OFFICE</p>
              <h3 className="text-xl font-bold text-ink-primary mb-5">대전케어 본점</h3>
              <address className="space-y-3 text-ink-secondary not-italic">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-brand-400 mt-1 shrink-0" />
                  <span>{CONTACT.address}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-brand-400 mt-1 shrink-0" />
                  {/* Wave 354: tel: 링크 — 본점 정보 one-tap dial */}
                  <span>
                    TEL.{' '}
                    <a
                      href={CONTACT.phoneTel}
                      aria-label={`전화 걸기 본점 ${CONTACT.phone}`}
                      className="font-medium hover:text-brand-400 hover:underline transition-colors"
                    >
                      {CONTACT.phone}
                    </a>
                    {' '}· FAX. {CONTACT.phone}
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
              <p lang="en" className="text-brand-400 font-semibold tracking-[0.15em] text-sm mb-2">| TRANSPORT</p>
              <h3 className="text-xl font-bold text-ink-primary mb-5">교통편 안내</h3>
              <div className="space-y-4 text-ink-secondary">
                <div>
                  <p className="font-semibold text-ink-primary mb-1">🚇 지하철</p>
                  <p className="text-sm">대전 1호선 [역명] [번호] 출구 도보 [분]</p>
                </div>
                <div>
                  <p className="font-semibold text-ink-primary mb-1">🚌 버스</p>
                  <p className="text-sm">[정류장명] 하차 도보 [분] · [버스번호] 노선</p>
                </div>
                <div>
                  <p className="font-semibold text-ink-primary mb-1">🚗 자차</p>
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
              className="group bg-[#f8f8f8] hover:bg-brand-50 p-7 transition-colors block border-l-4 border-[#1B6F4A]"
            >
              <p lang="en" className="text-xs text-[#1B6F4A] font-bold tracking-[0.15em] mb-2">CONTACT</p>
              <h3 className="text-lg font-bold text-ink-primary mb-2 group-hover:text-[#1B6F4A] transition-colors">
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
