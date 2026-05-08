'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { SplitText } from './SplitText';
import { CONTACT } from '@/lib/contact';

/**
 * Hero carousel — 저작권 회피 (Wave 10):
 * 두손누리 imweb 이미지 제거 → 정체성 gradient + decorative SVG (CC0, 자체 작성).
 * 자현이 daejeon-care 자체 사진 추가 시 SLIDES.bg에 자현 자산 path 입력 가능.
 *
 * Wave 4 motion 유지: mask-image dissolve / letterbox / radial halo / variable font hover.
 */
/**
 * Hero SLIDES — gradient mesh (저작권 0 default).
 *
 * 🔧 자현 이미지 swap 가이드:
 *   - 이미지 사이즈: 1920×1080 (16:9) WebP 또는 JPG, 200-400 KB 권장
 *   - 위치: `public/hero-1.webp` 등 (Next.js static asset)
 *   - 활성: 각 SLIDE에 `bg: '/hero-1.webp'` 추가 (optional)
 *   - 자동 적용: dark overlay (rgba 0.45) + image cover + gradient fallback
 *   - 저작권: Unsplash (next.config 화이트리스트) / Pexels / 자현 직접 촬영 (모델 동의 필수)
 */
type Slide = {
  /** Gradient mesh fallback (이미지 없을 때 + 이미지 로드 실패 시 fallback) */
  grad: string;
  /** Optional 자현 이미지 path (예: '/hero-2.webp'). 비어있으면 grad만 사용. */
  bg?: string;
  eyebrow: string;
  title: string;
  sub: string;
  accent: string;
};

const SLIDES: Slide[] = [
  {
    grad: 'radial-gradient(circle at 18% 24%, rgba(27,111,74,0.95) 0%, rgba(21,87,58,0.85) 35%, rgba(15,55,38,0.95) 100%), radial-gradient(circle at 78% 76%, rgba(230,57,70,0.45) 0%, transparent 50%)',
    bg: '/hero/hero-1.png',
    eyebrow: '장기요양등급 신청이 어려우시면',
    title: '등급신청을 도와 드립니다',
    sub: '상담부터 신청까지 전문 상담사와 함께 하세요',
    accent: '#1B6F4A',
  },
  {
    grad: 'radial-gradient(circle at 25% 30%, rgba(15,55,38,0.95) 0%, rgba(27,111,74,0.85) 30%, rgba(21,87,58,0.95) 100%), radial-gradient(circle at 80% 60%, rgba(245,166,35,0.35) 0%, transparent 55%)',
    bg: '/hero/hero-2.png',
    eyebrow: '부모님 마음에 맞는',
    title: '요양보호사님을 찾아드릴게요',
    sub: '대전케어만의 요양보호사 검증절차가 있습니다',
    accent: '#F5A623',
  },
  {
    grad: 'radial-gradient(circle at 70% 25%, rgba(27,111,74,0.85) 0%, rgba(15,55,38,0.95) 50%, rgba(21,87,58,0.95) 100%), radial-gradient(circle at 20% 75%, rgba(230,57,70,0.4) 0%, transparent 50%)',
    bg: '/hero/hero-3.png',
    eyebrow: '24시간 언제나',
    title: '언제든 편하게 문의하세요',
    sub: `대표번호 ${CONTACT.phone} · 부모님의 손발이 되어드리겠습니다`,
    accent: '#E63946',
  },
  {
    grad: 'radial-gradient(circle at 30% 70%, rgba(27,111,74,0.85) 0%, rgba(15,55,38,0.95) 50%, rgba(21,87,58,0.95) 100%), radial-gradient(circle at 80% 30%, rgba(245,166,35,0.4) 0%, transparent 50%)',
    bg: '/hero/hero-4.png',
    eyebrow: '어르신과 가족 모두',
    title: '함께 상담드립니다',
    sub: '등급 신청부터 본인부담금까지 가족 회의처럼 자세히',
    accent: '#1B6F4A',
  },
  {
    grad: 'radial-gradient(circle at 60% 40%, rgba(27,111,74,0.85) 0%, rgba(15,55,38,0.95) 50%, rgba(21,87,58,0.95) 100%), radial-gradient(circle at 25% 70%, rgba(230,57,70,0.4) 0%, transparent 50%)',
    bg: '/hero/hero-5.png',
    eyebrow: '신체활동부터 정서 지원까지',
    title: '일상이 활기차도록',
    sub: '운동·식사·말벗까지 어르신 댁에서 함께',
    accent: '#F5A623',
  },
];

/** image cover + grad fallback (자현 명시: 원본 그대로, dark overlay X. 텍스트는 text-shadow로 가독성 보장). */
const slideBg = (s: Slide) =>
  s.bg
    ? `url('${s.bg}') center/cover no-repeat, ${s.grad}`
    : s.grad;

/**
 * Decorative SVG — 따뜻한 손/원/하트 모티브 (CC0, 직접 작성).
 * Hero BG 위 subtle 표시. mix-blend-screen으로 부드러움.
 */
function HeroDecoration() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 902"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-40"
    >
      <defs>
        <radialGradient id="warmth" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD166" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#F5A623" stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <pattern id="dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="1" fill="rgba(255,255,255,0.18)" />
        </pattern>
      </defs>
      <rect width="1440" height="902" fill="url(#dots)" />
      <circle cx="240" cy="300" r="180" fill="url(#warmth)" />
      <circle cx="1200" cy="650" r="280" fill="url(#warmth)" />
      {/* 손바닥 cradle 곡선 (자현 로고 모티브) */}
      <path
        d="M 1080 720 Q 1080 820 1180 845 Q 1280 855 1340 850 Q 1410 840 1410 760 Q 1410 730 1390 730 Q 1390 800 1310 815 Q 1260 818 1220 815 Q 1100 810 1100 730 Q 1080 700 1080 720 Z"
        fill="rgba(245, 166, 35, 0.18)"
      />
    </svg>
  );
}

export function HeroCarousel() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const letterbox = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.4]);
  const decorParallax = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Wave 348 (WCAG 2.2.2 Pause, Stop, Hide): auto-rotate >5s requires user control.
  // Skip when paused, focused-within (keyboard nav), or prefers-reduced-motion.
  useEffect(() => {
    if (paused || reducedMotion) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [paused, reducedMotion]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      aria-roledescription="carousel"
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
      className="relative w-full h-[600px] md:h-[902px] overflow-hidden bg-black"
    >
      {/* gradient slides */}
      {/* Wave 437: ARIA APG Carousel pattern — slide-level role/roledescription/label.
       * carousel container (line 142)에 이미 aria-roledescription="carousel" → slide-level도 일치 필요.
       * aria-label "N / M"으로 위치 정보 (screen reader 사용자가 어디 있는지 명확). */}
      <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${SLIDES.length}`}
            aria-hidden={idx !== i}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-out"
            style={{
              background: slideBg(s),
              opacity: idx === i ? 1 : 0,
            }}
          />
        ))}
        {/* decorative SVG with parallax */}
        <motion.div style={{ y: decorParallax }} className="absolute inset-0">
          <HeroDecoration />
        </motion.div>
      </motion.div>

      {/* Letterbox top */}
      <motion.div
        aria-hidden="true"
        style={{ height: letterbox }}
        className="absolute top-0 left-0 right-0 bg-black z-30 pointer-events-none"
      />
      {/* Letterbox bottom */}
      <motion.div
        aria-hidden="true"
        style={{ height: letterbox }}
        className="absolute bottom-0 left-0 right-0 bg-black z-30 pointer-events-none"
      />

      {/* Caption — text-shadow로 가독성 보장 (이미지 원본 그대로 노출) */}
      <div
        className="relative z-10 h-full max-w-[1200px] mx-auto px-5 flex flex-col justify-center items-start text-white"
        style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.9)' }}
      >
        <motion.p
          key={`eyebrow-${idx}`}
          initial={{ y: 8 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm md:text-[19px] mb-3 md:mb-5 tracking-wide font-light"
        >
          {SLIDES[idx].eyebrow}
        </motion.p>

        {/* Wave 435: textWrap 제거 — globals.css h1-h6 { text-wrap: balance } single source (Wave 434 saturation pass) */}
        <h1
          id="hero-title"
          key={`title-${idx}`}
          className="text-3xl md:text-6xl font-bold mb-5 md:mb-8 leading-tight max-w-3xl drop-shadow-md"
          style={{
            fontVariationSettings: '"wght" 800',
          }}
        >
          <SplitText text={SLIDES[idx].title} charDelay={0.04} />
        </h1>

        <motion.p
          key={`sub-${idx}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.92, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-xl max-w-2xl leading-relaxed font-light"
          data-speakable="true"
        >
          {SLIDES[idx].sub}
        </motion.p>

        <div className="flex gap-3 mt-8 md:mt-12 flex-wrap">
          <a
            href="/contact"
            className="hero-cta bg-white hover:bg-gray-50 text-[#1B6F4A] px-6 md:px-8 py-3 md:py-3.5 font-bold text-sm md:text-base transition-all"
            style={{ borderRadius: '2px' }}
          >
            무료 상담 신청
          </a>
          {/* Wave 407: aria-label — phone CTA 의도 명확 ("전화 걸기 042-...") */}
          <a
            href={CONTACT.phoneTel}
            aria-label={`전화 걸기 ${CONTACT.phone}`}
            className="hero-cta hero-cta-pulse flex items-center gap-2 bg-[#E63946] hover:bg-[#C12A37] text-white px-6 md:px-8 py-3 md:py-3.5 font-bold text-sm md:text-base transition-all relative"
            style={{ borderRadius: '2px' }}
          >
            ☎ {CONTACT.phone}
          </a>
        </div>

        {/* 24시간 상담 강조 */}
        <div
          className="absolute top-6 left-5 md:left-8 z-20 hidden md:flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2"
          style={{ borderRadius: '2px' }}
        >
          <span className="inline-flex w-5 h-5 rounded-full bg-[#E63946] grid place-items-center text-white text-[10px]">
            ♥
          </span>
          <span className="text-sm font-bold text-[#1B6F4A]">24시간 상담 가능</span>
        </div>
      </div>

      {/* Wave 348 (WCAG 2.2.2): Pause/play button — required for auto-rotate >5s. */}
      {!reducedMotion && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? '슬라이드 자동 전환 재생' : '슬라이드 자동 전환 일시정지'}
          aria-pressed={paused}
          className="absolute bottom-7 right-5 md:right-8 z-20 w-10 h-10 grid place-items-center bg-white/90 hover:bg-white text-[#1B6F4A] backdrop-blur-sm transition-colors"
          style={{ borderRadius: '2px' }}
        >
          <span aria-hidden="true" className="text-base leading-none">
            {paused ? '▶' : '❚❚'}
          </span>
        </button>
      )}

      {/* Dot pagination */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIdx(i)}
            aria-label={`슬라이드 ${i + 1} / ${SLIDES.length}`}
            aria-current={idx === i ? 'true' : undefined}
            className={`h-1.5 transition-all duration-500 ${
              idx === i ? 'w-10 bg-white' : 'w-5 bg-white/50 hover:bg-white/80'
            }`}
            style={{ borderRadius: '2px' }}
          />
        ))}
      </div>
    </section>
  );
}
