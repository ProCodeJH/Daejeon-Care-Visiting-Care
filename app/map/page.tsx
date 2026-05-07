import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

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
              <p className="text-brand-400 font-semibold tracking-[0.15em] text-sm mb-2">| HEAD OFFICE</p>
              <h3 className="text-xl font-bold text-ink-primary mb-5">대전케어 본점</h3>
              <div className="space-y-3 text-ink-secondary">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-brand-400 mt-1 shrink-0" />
                  <span>대전광역시 [구] [동] [도로명주소], [건물명] [층호]</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-brand-400 mt-1 shrink-0" />
                  <span>TEL. 042-369-0326 · FAX. 042-369-0326</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-brand-400 mt-1 shrink-0" />
                  <span>평일 09:00 ~ 18:00 (토·일·공휴일 휴무)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-brand-400 mt-1 shrink-0" />
                  <span>contact@daejeoncare.co.kr</span>
                </div>
              </div>
            </div>

            {/* 교통편 */}
            <div className="bg-brand-50 p-7">
              <p className="text-brand-400 font-semibold tracking-[0.15em] text-sm mb-2">| TRANSPORT</p>
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

      <CTASection title="방문 전 전화 주세요" sub="안내 드릴 사항이 있을 수 있습니다" />
    </>
  );
}
