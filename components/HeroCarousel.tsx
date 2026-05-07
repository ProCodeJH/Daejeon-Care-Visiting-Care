'use client';

import { useEffect, useState } from 'react';

/**
 * 두손누리 Hero owl-carousel 1:1 — 자동 슬라이드 + 가족 사진 BG + 흰색 카피.
 * 902px (md+) / 600px (mobile) 높이. 5초 auto-slide.
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

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative w-full h-[600px] md:h-[902px] overflow-hidden">
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.45)), url(${s.bg})`,
            backgroundSize: 'cover',
            backgroundPosition: s.bgPos,
            opacity: idx === i ? 1 : 0,
          }}
        />
      ))}

      {/* Caption */}
      <div className="relative z-10 h-full max-w-[1200px] mx-auto px-5 flex flex-col justify-center items-start text-white">
        <p className="text-sm md:text-[19px] mb-3 md:mb-5 opacity-95 tracking-wide font-light">
          {SLIDES[idx].eyebrow}
        </p>
        <h1 className="text-3xl md:text-6xl font-bold mb-5 md:mb-8 leading-tight max-w-3xl drop-shadow-md">
          {SLIDES[idx].title}
        </h1>
        <p className="text-base md:text-xl opacity-90 max-w-2xl leading-relaxed font-light">
          {SLIDES[idx].sub}
        </p>

        <div className="flex gap-3 mt-8 md:mt-12">
          <a
            href="/contact"
            className="bg-brand-400 hover:bg-brand-500 text-white px-6 md:px-8 py-3 md:py-3.5 font-semibold text-sm md:text-base transition-colors"
            style={{ borderRadius: '2px' }}
          >
            무료 상담 신청
          </a>
          <a
            href="tel:042-000-0000"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/40 text-white px-6 md:px-8 py-3 md:py-3.5 font-semibold text-sm md:text-base transition-colors"
            style={{ borderRadius: '2px' }}
          >
            전화 상담
          </a>
        </div>
      </div>

      {/* Dot pagination */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 transition-all ${
              idx === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
            }`}
            style={{ borderRadius: '2px' }}
          />
        ))}
      </div>
    </section>
  );
}
