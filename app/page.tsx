'use client';

import { HeroCarousel } from '@/components/HeroCarousel';
import { Reveal } from '@/components/Reveal';

/**
 * 두손누리 home 1:1 layout (Playwright 측정 기반):
 * 13 sections × 5885px @ 1440 viewport.
 * BG 교차 (white / #f8f8f8 / #fefffd) + green accent #61B05A.
 */

const VIDEO_ID = 'Q3ZFz0gEvOE'; // 두손누리 자체 video (자현이 daejeon-care YouTube ID로 swap)

const REVIEWS = [
  {
    text: '상담 때 요청사항을 자세히 물어봐주셨어요. 대화가 많은 분이 좋으신지, 식사는 짜게 드시는지 물어봐 주셔서 좋았습니다.',
    author: '보호자 김OO 님',
  },
  {
    text: '어머니께서 처음에는 낯설어 하셨는데 요양보호사 선생님이 정말 친근하게 다가가 주셔서 금방 적응하셨어요.',
    author: '보호자 박OO 님',
  },
  {
    text: '서비스 이용 절차가 복잡할 줄 알았는데 센터에서 등급 신청부터 하나하나 친절하게 도와주셔서 감사했습니다.',
    author: '보호자 이OO 님',
  },
];

const BLOGS = [
  { title: '방문요양 우수 요양보호사님, 표창장 수상 비결은?', tag: '대전케어 이야기' },
  { title: '어르신 가정 환경 개선 프로젝트 – 자원봉사 현장 이야기', tag: '대전케어 이야기' },
  { title: '대전케어 일상 40. 어르신의 웃음 속에서 피어난 따뜻한 모니터링', tag: '대전케어 일상' },
  { title: '요양보호사 선생님의 하루 — 새벽 첫 방문부터 저녁까지', tag: '현장 이야기' },
];

const FAQS = [
  {
    q: '담당 요양보호사 선생님을 바꾸고 싶을 때는 어떻게 해야 하나요?',
    a: '센터에 연락 주시면 즉시 상담 후 새 매니저 배정해드립니다.',
  },
  {
    q: '서비스를 이용할 시 자기부담금이 얼마나 나오나요?',
    a: '장기요양 등급 및 본인 소득 수준에 따라 다릅니다. 본인부담금 계산기로 확인 가능합니다.',
  },
  {
    q: '장기요양등급 신청은 어디서 하나요?',
    a: '국민건강보험공단에 신청하시며, 대전케어가 신청 절차 전반을 도와드립니다.',
  },
  {
    q: '주말에도 방문요양 서비스가 가능한가요?',
    a: '네, 주말 및 공휴일에도 사전 협의된 일정에 따라 방문 가능합니다.',
  },
];

export default function Home() {
  return (
    <>
      {/* 1. Hero Carousel — 902px green/photo BG + 흰색 카피 */}
      <HeroCarousel />

      {/* 2. About — "집으로 찾아가는 또 다른 가족, 방문요양 서비스" (606px, white) */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-12">
            <p className="text-brand-400 font-semibold tracking-[0.2em] text-sm mb-4">| ABOUT</p>
            <h2 className="text-2xl md:text-4xl font-bold text-ink-primary mb-5 leading-snug">
              집으로 찾아가는 또 다른 가족,
              <br />
              <span className="text-brand-400">방문요양 서비스</span>
            </h2>
            <p className="text-ink-secondary md:text-lg max-w-2xl mx-auto leading-relaxed">
              대전케어 방문요양센터에서 문의하세요.
              <br className="hidden md:inline" />
              자격을 갖춘 요양보호사가 어르신 댁으로 직접 찾아갑니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {[
              { title: '방문요양', desc: '일상 생활 지원 / 정서 지원' },
              { title: '방문목욕', desc: '존엄을 지키는 목욕 케어' },
              { title: '방문간호', desc: '의료 케어가 일상 안으로' },
            ].map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 0.08}
                className="bg-gray-50 hover:bg-brand-50 transition-colors p-8 text-center border-t-2 border-brand-400"
              >
                <h3 className="text-xl font-bold text-ink-primary mb-2">{s.title}</h3>
                <p className="text-sm text-ink-muted">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Video Section — YouTube embed (594px, #f8f8f8) */}
      <section className="bg-[#f8f8f8] py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-10">
            <p className="text-brand-400 font-semibold tracking-[0.2em] text-sm mb-3">| VIDEO</p>
            <h2 className="text-2xl md:text-3xl font-bold text-ink-primary">
              영상으로 보는 대전케어
            </h2>
          </div>
          <div className="aspect-video max-w-4xl mx-auto bg-black overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${VIDEO_ID}`}
              title="대전케어 소개 영상"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* 4. Story — "생생한 대전케어 이야기" (215px, white) */}
      <section className="bg-white pt-20 pb-10">
        <div className="max-w-[1200px] mx-auto px-5 text-center">
          <p className="text-brand-400 font-semibold tracking-[0.2em] text-sm mb-3">| STORY</p>
          <h2 className="text-2xl md:text-4xl font-bold text-ink-primary mb-3">
            생생한 대전케어 이야기
          </h2>
          <p className="text-ink-muted">실제 현장의 이야기를 영상으로 만나보세요</p>
        </div>
      </section>

      {/* 5. CTA Strip — "언제든 문의 주세요" (310px, #f8f8f8) */}
      <section className="bg-[#f8f8f8] py-20">
        <div className="max-w-[1200px] mx-auto px-5 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-ink-primary mb-3 leading-snug">
            언제든 문의 주세요.
          </h2>
          <p className="text-lg md:text-xl text-ink-secondary mb-8">
            부모님의 손발이 되어드리겠습니다
          </p>
          <div className="flex justify-center gap-3">
            <a
              href="/contact"
              className="bg-brand-400 hover:bg-brand-500 text-white px-8 py-3.5 font-semibold transition-colors"
              style={{ borderRadius: '2px' }}
            >
              무료 상담 신청
            </a>
            <a
              href="tel:042-369-0326"
              className="bg-white border border-brand-400 hover:bg-brand-50 text-brand-400 px-8 py-3.5 font-semibold transition-colors"
              style={{ borderRadius: '2px' }}
            >
              전화 상담
            </a>
          </div>
        </div>
      </section>

      {/* 6. Reviews — "대전케어를 찾아주신 고객의 목소리" (496px, #fefffd) */}
      <section className="bg-[#fefffd] py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-12">
            <p className="text-brand-400 font-semibold tracking-[0.2em] text-sm mb-3">| REVIEWS</p>
            <h2 className="text-2xl md:text-4xl font-bold text-ink-primary leading-snug">
              대전케어를 찾아주신
              <br />
              고객의 목소리
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <Reveal
                key={i}
                delay={i * 0.08}
                className="bg-white p-7 border border-gray-100 hover:border-brand-400 hover:shadow-md transition-all"
              >
                <div className="text-brand-400 text-3xl font-serif leading-none mb-3">"</div>
                <p className="text-ink-secondary leading-relaxed mb-5 text-[15px]">{r.text}</p>
                <p className="text-sm font-semibold text-brand-400">- {r.author} -</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Blog — "대전케어 이야기" 4 cards (588px, white) */}
      <section className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-10">
            <p className="text-brand-400 font-semibold tracking-[0.2em] text-sm mb-3">| BLOG</p>
            <h2 className="text-2xl md:text-3xl font-bold text-ink-primary">
              대전케어 이야기
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BLOGS.map((b, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <a
                  href="/story"
                  className="group block bg-gray-50 hover:bg-brand-50 transition-colors overflow-hidden"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-brand-200 to-brand-400" />
                  <div className="p-4">
                    <p className="text-xs text-brand-400 font-medium mb-1.5">{b.tag}</p>
                    <p className="text-sm font-semibold text-ink-primary leading-snug group-hover:text-brand-400 transition-colors line-clamp-2">
                      {b.title}
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ — 4 cards (491px, #f8f8f8) */}
      <section className="bg-[#f8f8f8] py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-10">
            <p className="text-brand-400 font-semibold tracking-[0.2em] text-sm mb-3">| FAQ</p>
            <h2 className="text-2xl md:text-3xl font-bold text-ink-primary">
              자주 묻는 질문
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {FAQS.map((f, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <details className="group bg-white p-5 border border-gray-100 hover:border-brand-400 transition-colors cursor-pointer">
                  <summary className="font-semibold text-ink-primary flex items-start gap-3 list-none">
                    <span className="text-brand-400 font-bold shrink-0">Q.</span>
                    <span className="flex-1">{f.q}</span>
                    <span className="text-brand-400 group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <div className="mt-3 pl-6 text-sm text-ink-secondary leading-relaxed">
                    <span className="text-brand-400 font-bold mr-2">A.</span>
                    {f.a}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="/faq"
              className="inline-block border border-brand-400 hover:bg-brand-400 hover:text-white text-brand-400 px-7 py-2.5 font-semibold transition-colors text-sm"
              style={{ borderRadius: '2px' }}
            >
              전체 FAQ 보기
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
