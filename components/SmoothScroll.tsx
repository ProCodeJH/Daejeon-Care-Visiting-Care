'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis smooth scroll — 부드러운 휠/터치 스크롤.
 * duration 1.4 / lerp 0.085 (jahyeon-site Wave 9 검증 값).
 * prefers-reduced-motion 시 비활성 (a11y 존중 = 어르신 옵션).
 */
export function SmoothScroll() {
  useEffect(() => {
    // prefers-reduced-motion 체크 — 어르신/접근성 사용자는 native scroll
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.4,
      lerp: 0.085,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // gentle ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
