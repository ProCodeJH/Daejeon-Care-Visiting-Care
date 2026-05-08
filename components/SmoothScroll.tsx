'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis smooth scroll — 부드러운 휠/터치 스크롤.
 * duration 1.4 / lerp 0.085 (jahyeon-site Wave 9 검증 값).
 * prefers-reduced-motion 시 비활성 (a11y 존중 = 어르신 옵션).
 *
 * Wave 447: matchMedia change event listener — 사용자 OS 설정 runtime 변경 즉시 반영.
 * 가족이 어르신 옆에서 "reduce 켜줘" 시 reload 없이 즉시 native scroll 전환.
 */
export function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: Lenis | null = null;
    let rafId = 0;

    const start = () => {
      if (mq.matches) return;
      lenis = new Lenis({
        duration: 1.4,
        lerp: 0.085,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    const stop = () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
      lenis = null;
      rafId = 0;
    };

    const handleChange = () => {
      stop();
      start();
    };

    start();
    mq.addEventListener('change', handleChange);

    return () => {
      mq.removeEventListener('change', handleChange);
      stop();
    };
  }, []);

  return null;
}
