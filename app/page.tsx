'use client';

import { HeroCarousel } from '@/components/HeroCarousel';
import { Reveal } from '@/components/Reveal';
import { TiltCard } from '@/components/TiltCard';
import { MagneticButton } from '@/components/MagneticButton';
import { StatsCounter } from '@/components/StatsCounter';
import { FaqJsonLd } from '@/components/FaqJsonLd';
import { FAQS as ALL_FAQS } from '@/content/faqs';
import { STORIES } from '@/content/stories';
import { CONTACT } from '@/lib/contact';

/**
 * 두손누리 home 1:1 layout (Playwright 측정 기반):
 * 13 sections × 5885px @ 1440 viewport.
 * BG 교차 (white / #f8f8f8 / #fefffd) + green accent #61B05A.
 */

/**
 * 자현이 daejeon-care 자체 YouTube 영상 추가 시 ID swap.
 * 빈 문자열 = placeholder card 표시 (저작권 0).
 */
const VIDEO_ID = ''; // 예: 'abc123XYZ'

const REVIEWS = [
  {
    text: '상담 때 요청사항을 자세히 물어봐주셨어요. 대화가 많은 분이 좋으신지, 식사는 짜게 드시는지 물어봐 주셔서 좋았습니다.',
    author: '보호자 김OO 님',
    tag: '방문요양',
    rating: 5,
    date: '2026.04',
  },
  {
    text: '어머니께서 처음에는 낯설어 하셨는데 요양보호사 선생님이 정말 친근하게 다가가 주셔서 금방 적응하셨어요.',
    author: '보호자 박OO 님',
    tag: '정서 지원',
    rating: 5,
    date: '2026.03',
  },
  {
    text: '서비스 이용 절차가 복잡할 줄 알았는데 센터에서 등급 신청부터 하나하나 친절하게 도와주셔서 감사했습니다.',
    author: '보호자 이OO 님',
    tag: '등급 신청',
    rating: 5,
    date: '2026.02',
  },
];

// Home Blog 섹션 = stories 최신 4개 (단일 source)
const BLOGS = STORIES.slice(0, 4).map((s) => ({ id: s.id, title: s.title, tag: s.cat }));

// Home FAQ 섹션 = faqs 첫 4개 (전체 7개는 /faq 페이지)
const FAQS = ALL_FAQS.slice(0, 4);

export default function Home() {
  return (
    <>
      <FaqJsonLd faqs={FAQS} />
      {/* 1. Hero Carousel — 902px green/photo BG + 흰색 카피 */}
      <HeroCarousel />

      {/* 1.5. Stats 신뢰 지표 (Hero 직후, 즉시 신뢰) */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <Reveal className="text-center">
            <p className="text-3xl md:text-4xl font-extrabold text-[#1B6F4A] mb-1 tabular-nums">
              <StatsCounter value={5} suffix="구" />
            </p>
            <p className="text-xs md:text-sm text-ink-muted font-medium">대전 5구 통합</p>
          </Reveal>
          <Reveal delay={0.1} className="text-center">
            <p className="text-3xl md:text-4xl font-extrabold text-[#1B6F4A] mb-1 tabular-nums">
              <StatsCounter value={24} suffix="시간" />
            </p>
            <p className="text-xs md:text-sm text-ink-muted font-medium">365일 상담 가능</p>
          </Reveal>
          <Reveal delay={0.2} className="text-center">
            <p className="text-3xl md:text-4xl font-extrabold text-[#1B6F4A] mb-1 tabular-nums">
              <StatsCounter value={CONTACT.managerCount} suffix="+명" />
            </p>
            <p className="text-xs md:text-sm text-ink-muted font-medium">자격 매니저</p>
          </Reveal>
          <Reveal delay={0.3} className="text-center">
            <p className="text-3xl md:text-4xl font-extrabold text-[#E63946] mb-1 tabular-nums">
              {CONTACT.phone}
            </p>
            <p className="text-xs md:text-sm text-ink-muted font-medium">대표번호 · 무료 상담</p>
          </Reveal>
        </div>
      </section>

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
              <Reveal key={s.title} delay={i * 0.08}>
                <TiltCard
                  intensity={1.5}
                  className="glass hover:bg-brand-50/80 transition-colors p-8 text-center border-t-2 border-brand-400"
                >
                  <h3 className="text-xl font-bold text-ink-primary mb-2">{s.title}</h3>
                  <p className="text-sm text-ink-muted">{s.desc}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Video Section — YouTube embed 또는 placeholder */}
      <section className="bg-[#f8f8f8] py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-10">
            <p className="text-brand-400 font-semibold tracking-[0.2em] text-sm mb-3">| VIDEO</p>
            <h2 className="text-2xl md:text-3xl font-bold text-ink-primary">
              영상으로 보는 대전케어
            </h2>
          </div>
          {VIDEO_ID ? (
            <div className="aspect-video max-w-4xl mx-auto bg-black overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${VIDEO_ID}`}
                title="대전케어 소개 영상"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            // placeholder — 자현이 자체 영상 ID 추가 시 자동 iframe
            <div
              className="aspect-video max-w-4xl mx-auto overflow-hidden shadow-lg relative grid place-items-center text-white text-center px-5"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, #1B6F4A 0%, #15573A 50%, #0F3726 100%), radial-gradient(circle at 70% 70%, rgba(230,57,70,0.4) 0%, transparent 60%)',
              }}
            >
              {/* SVG decorative dots (CC0) */}
              <svg
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
              >
                <pattern id="vid-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="1.2" fill="rgba(255,255,255,0.5)" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#vid-dots)" />
              </svg>
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto rounded-full bg-white/15 backdrop-blur-sm grid place-items-center mb-5">
                  <svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-xl md:text-2xl font-bold mb-2">대전케어 영상 준비 중</p>
                <p className="text-sm md:text-base opacity-80">
                  곧 어르신 일상과 매니저 이야기를 영상으로 만나보실 수 있습니다.
                </p>
              </div>
            </div>
          )}
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
          <div className="flex justify-center gap-3 flex-wrap">
            <MagneticButton
              href="/contact"
              className="block bg-brand-600 hover:bg-brand-700 text-white px-8 py-3.5 font-semibold transition-colors"
              ariaLabel="무료 상담 신청"
            >
              <span style={{ borderRadius: '2px' }}>무료 상담 신청</span>
            </MagneticButton>
            <MagneticButton
              href={CONTACT.phoneTel}
              className="block bg-[#E63946] hover:bg-[#C12A37] text-white px-8 py-3.5 font-bold transition-colors"
              ariaLabel={`전화 상담 ${CONTACT.phone}`}
            >
              ☎ {CONTACT.phone}
            </MagneticButton>
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
                className="bg-white p-7 border border-gray-100 hover:border-brand-400 hover:shadow-md transition-all relative"
              >
                {/* Quote SVG (CC0, 직접 작성) */}
                <svg
                  aria-hidden="true"
                  width="40"
                  height="32"
                  viewBox="0 0 40 32"
                  fill="none"
                  className="text-brand-400 mb-3 opacity-80"
                >
                  <path
                    d="M9.5 0 C4.25 0 0 4.25 0 9.5 L0 22 C0 27.5 4.5 32 10 32 L11 32 C11.5 32 12 31.5 12 31 L12 22.5 C12 22 11.5 21.5 11 21.5 L8.5 21.5 C7 21.5 6 20.5 6 19 L6 18 C6 16.5 7 15.5 8.5 15.5 L11 15.5 C11.5 15.5 12 15 12 14.5 L12 1 C12 0.5 11.5 0 11 0 L9.5 0 Z M27.5 0 C22.25 0 18 4.25 18 9.5 L18 22 C18 27.5 22.5 32 28 32 L29 32 C29.5 32 30 31.5 30 31 L30 22.5 C30 22 29.5 21.5 29 21.5 L26.5 21.5 C25 21.5 24 20.5 24 19 L24 18 C24 16.5 25 15.5 26.5 15.5 L29 15.5 C29.5 15.5 30 15 30 14.5 L30 1 C30 0.5 29.5 0 29 0 L27.5 0 Z"
                    fill="currentColor"
                  />
                </svg>
                <blockquote className="text-ink-secondary leading-relaxed mb-5 text-[15px]">{r.text}</blockquote>
                {/* 별점 + 태그 + 작성일 — cite는 blockquote 형제로 author attribution */}
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <cite className="not-italic font-semibold text-brand-400">- {r.author}</cite>
                    <time dateTime={r.date.replace('.', '-')} className="text-ink-muted text-[11px] mt-0.5 block">{r.date}</time>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-brand-50 text-brand-600 px-2 py-0.5 font-medium" style={{ borderRadius: '2px' }}>
                      {r.tag}
                    </span>
                    <span aria-label={`별점 ${r.rating}점 만점에 ${r.rating}점`} className="text-[#F5A623]">
                      {'★'.repeat(r.rating)}
                    </span>
                  </div>
                </div>
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
              <Reveal key={b.id} delay={i * 0.06}>
                <a
                  href={`/story/${b.id}`}
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
