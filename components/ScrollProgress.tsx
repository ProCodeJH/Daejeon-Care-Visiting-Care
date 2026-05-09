'use client';

import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

/**
 * 페이지 상단 1.5px 얇은 진행 띠 — 어르신이 긴 페이지 위치 파악.
 * 자현 정체성 색 (코랄 #E63946) gradient = 시각 피드백.
 *
 * Wave 440: 주석/코드 일치 — useReducedMotion 분기로 spring vs instant.
 * WCAG 2.3.3 Animation from Interactions 준수 (정보 전달 essential, spring decorative).
 */
export function ScrollProgress() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: reducedMotion ? scrollYProgress : scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
    >
      <div className="h-full bg-gradient-to-r from-[#1E40AF] via-[#2563EB] to-[#E63946]" />
    </motion.div>
  );
}
