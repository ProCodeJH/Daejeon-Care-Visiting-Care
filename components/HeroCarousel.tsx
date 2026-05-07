'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Hero carousel — Wave 4 polish:
 * - mask-image dissolve (h1 카피 등장)
 * - letterbox cinematic frames (top/bottom 0→24px scroll-driven, 절제)
 * - radial-gradient halo 배경 (절제, 어르신 부담 X)
 * - variable font wght hover (CTA 미세 인터랙션)
 * - prefers-reduced-motion 시 mask 즉시 표시
 */
const SLIDES = [
  {
    bg: 'https://cdn.imweb.me/thumbnail/20211020/17463a6a562f7.jpg',
    bgPos: '50% 100%',
    eyebrow: '장기요양등급 신청이 어려우시면',
    title: '등급신청을 도와 드립니다',
    sub: '상담부터 신청까지 전문 상담사와 함께 하세요',
  },
  {
    bg: 'https://cdn.imweb.me/thumbnail/20211023/d6103abdaad49.jpg',
    bgPos: '50% 50%',
    eyebrow: '부모님 마음에 맞는',
    title: '요양보호사님을 찾아드릴게요',
    sub: '대전케어만의 요양보호사 검증절차가 있습니다',
  },
];

export function HeroCarousel() {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLElement>(null);

  // scroll-driven letterbox (Hero scroll 시 위/아래 검은 띠 0→24px 절제)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const letterbox = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.4]);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="relative w-full h-[600px] md:h-[902px] overflow-hidden bg-black">
      {/* BG Slides */}
      <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            aria-hidden={idx !== i}
            className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.55)), url(${s.bg})`,
              backgroundSize: 'cover',
              backgroundPosition: s.bgPos,
              opacity: idx === i ? 1 : 0,
            }}
          />
        ))}
        {/* radial halo — 절제된 빛 효과 (좌상 자현 정체성 그린, 우하 코랄, 매우 약함) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none mix-blend-screen"
          style={{
            background:
              'radial-gradient(circle at 18% 22%, rgba(27,111,74,0.18) 0%, transparent 45%), radial-gradient(circle at 82% 78%, rgba(230,57,70,0.12) 0%, transparent 50%)',
          }}
        />
      </motion.div>

      {/* Letterbox top (cinematic, scroll-driven) */}
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

      {/* Caption */}
      <div className="relative z-10 h-full max-w-[1200px] mx-auto px-5 flex flex-col justify-center items-start text-white">
        <motion.p
          key={`eyebrow-${idx}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.95, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm md:text-[19px] mb-3 md:mb-5 tracking-wide font-light"
        >
          {SLIDES[idx].eyebrow}
        </motion.p>

        {/* h1 with mask-image dissolve */}
        <motion.h1
          key={`title-${idx}`}
          initial={{ opacity: 0, maskPosition: '0% 0%' }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-6xl font-bold mb-5 md:mb-8 leading-tight max-w-3xl drop-shadow-md hero-title-mask"
          style={{
            fontVariationSettings: '"wght" 800',
            textWrap: 'balance' as const,
          }}
        >
          {SLIDES[idx].title}
        </motion.h1>

        <motion.p
          key={`sub-${idx}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.92, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-xl max-w-2xl leading-relaxed font-light"
        >
          {SLIDES[idx].sub}
        </motion.p>

        <div className="flex gap-3 mt-8 md:mt-12">
          <a
            href="/contact"
            className="hero-cta bg-brand-600 hover:bg-brand-700 text-white px-6 md:px-8 py-3 md:py-3.5 font-semibold text-sm md:text-base transition-all"
            style={{ borderRadius: '2px' }}
          >
            무료 상담 신청
          </a>
          <a
            href="tel:042-369-0326"
            className="hero-cta flex items-center gap-2 bg-[#E63946] hover:bg-[#C12A37] text-white px-6 md:px-8 py-3 md:py-3.5 font-bold text-sm md:text-base transition-all"
            style={{ borderRadius: '2px' }}
          >
            ☎ 042-369-0326
          </a>
        </div>

        {/* 24시간 상담 강조 — Hero 좌상단 */}
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

      {/* Dot pagination */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Slide ${i + 1} of ${SLIDES.length}`}
            aria-current={idx === i}
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
