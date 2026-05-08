import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { SectionBlock } from '@/components/SectionBlock';
import { CTASection } from '@/components/CTASection';
import { Reveal } from '@/components/Reveal';
import { Wallet, Clock, Home, BookOpen, Users, Heart, type LucideIcon } from 'lucide-react';
import { CONTACT } from '@/lib/contact';

export const metadata: Metadata = {
  title: '요양보호사 일자리',
  description: '대전케어 요양보호사 채용 — 안정 수입 / 시간 자율 / 가까운 지역 / 교육 지원. 신입 환영, 경력자 우대.',
  alternates: { canonical: '/jobs' },
};

type Benefit = { Icon: LucideIcon; title: string; desc: string };

const BENEFITS: Benefit[] = [
  { Icon: Wallet, title: '안정적 수입', desc: '국민건강보험공단 지원 사업으로 급여 안정성' },
  { Icon: Clock, title: '시간 자율성', desc: '하루 3-4시간 / 본인 일정 맞춰 매칭' },
  { Icon: Home, title: '가까운 지역', desc: '거주지 인근 어르신 댁 우선 매칭' },
  { Icon: BookOpen, title: '교육 지원', desc: '센터 자체 교육 프로그램 + 자격증 갱신 지원' },
  { Icon: Users, title: '동료 네트워크', desc: '경력 매니저와의 노하우 공유 + 정기 모임' },
  { Icon: Heart, title: '보람 있는 일', desc: '어르신과 가족의 일상에 함께하는 의미' },
];

const REQUIREMENTS = [
  { title: '자격', desc: '요양보호사 1급 또는 2급 자격증 보유자' },
  { title: '경력', desc: '신입 환영 (경력자 우대)' },
  { title: '근무지', desc: '대전 5구 (유성·대덕·서구·중구·동구) 본인 거주지 인근' },
  { title: '근무시간', desc: '평일 / 주말 협의 가능 · 하루 3-4시간 기본' },
];

export default function JobsPage() {
  return (
    <>
      <PageHero
        title="요양보호사 일자리"
        sub="대전케어와 함께 따뜻한 손길을 나눠주실 분을 찾습니다"
        crumbs={[{ label: '요양보호사 일자리' }]}
      />

      {/* 인트로 */}
      <section className="bg-white py-20">
        <div className="max-w-[900px] mx-auto px-5 text-center">
          <SectionBlock
            eyebrow="JOIN US"
            title={
              <>
                저희와 함께 일하실
                <br />
                <span className="text-brand-400">요양보호사님을 모십니다</span>
              </>
            }
            sub={
              <>
                대전케어 방문요양센터로 전화주시면 일자리 소개 및 상담을 도와드립니다.
                <br className="hidden md:inline" />
                마음에 맞는 어르신과 매칭될 때까지 함께 합니다.
              </>
            }
          />
          <a
            href={CONTACT.phoneTel}
            className="inline-block mt-8 bg-brand-400 hover:bg-brand-500 text-white px-8 py-4 font-bold text-lg transition-colors"
            style={{ borderRadius: '2px' }}
          >
            ☎️ {CONTACT.phone} 문의
          </a>
        </div>
      </section>

      {/* 복지/혜택 */}
      <section className="bg-[#f8f8f8] py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <SectionBlock
            eyebrow="BENEFITS"
            title="대전케어 매니저 혜택"
            sub="안정적이고 보람 있는 일자리"
            className="mb-12"
          />
          <div className="grid md:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <Reveal key={i} delay={i * 0.06} className="bg-white p-7 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 grid place-items-center bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors mb-4" style={{ borderRadius: '2px' }}>
                  <b.Icon size={24} strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-bold text-ink-primary mb-2">{b.title}</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">{b.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 지원 자격 */}
      <section className="bg-white py-20">
        <div className="max-w-[1000px] mx-auto px-5">
          <SectionBlock
            eyebrow="REQUIREMENTS"
            title="지원 자격"
            className="mb-12"
          />
          {/* Wave 356: <dl> description list — 자격/경력/근무지/근무시간 key-value 그룹 (HTML 5.2+ div 그룹핑 허용) */}
          <dl className="grid md:grid-cols-2 gap-4 m-0">
            {REQUIREMENTS.map((r) => (
              <div key={r.title} className="bg-[#f8f8f8] p-6 border-l-4 border-brand-400">
                <dt className="font-bold text-ink-primary mb-2 text-lg">{r.title}</dt>
                <dd className="text-ink-secondary m-0">{r.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Wave 361: <aside> = complementary landmark (cross-page navigation은 tangential) */}
      <aside aria-label="추천 페이지" className="bg-white py-16">
        <div className="max-w-[1000px] mx-auto px-5">
          <SectionBlock eyebrow="EXPLORE" title="더 알아보기" sub="지원 절차 + 대전케어 소개" className="mb-10" />
          <div className="grid md:grid-cols-2 gap-5">
            <a
              href="/jobs/apply"
              className="group bg-[#f8f8f8] hover:bg-brand-50 p-7 transition-colors block border-l-4 border-brand-600"
            >
              <p className="text-xs text-brand-600 font-bold tracking-[0.15em] mb-2">APPLY</p>
              <h3 className="text-lg font-bold text-ink-primary mb-2 group-hover:text-brand-600 transition-colors">
                지원하기 →
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                간단한 지원서로 시작 — 24시간 내 담당자 연락드립니다.
              </p>
            </a>
            <a
              href="/about"
              className="group bg-[#f8f8f8] hover:bg-brand-50 p-7 transition-colors block border-l-4 border-[#1B6F4A]"
            >
              <p className="text-xs text-[#1B6F4A] font-bold tracking-[0.15em] mb-2">ABOUT</p>
              <h3 className="text-lg font-bold text-ink-primary mb-2 group-hover:text-[#1B6F4A] transition-colors">
                대전케어 소개 →
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                인사말 + 4 가치 + 공식 등록 + {CONTACT.managerCount}+명 매니저.
              </p>
            </a>
          </div>
        </div>
      </aside>

      <CTASection
        title="지금 바로 지원하세요"
        sub="전화 주시면 친절히 안내드립니다"
      />
    </>
  );
}
