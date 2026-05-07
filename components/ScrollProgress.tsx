'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * 페이지 상단 1.5px 얇은 진행 띠 — 어르신이 긴 페이지 위치 파악.
 * 자현 정체성 색 (코랄 #E63946) gradient = 시각 피드백.
 * prefers-reduced-motion 시 instant (no animation, but still indicator).
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
    >
      <div className="h-full bg-gradient-to-r from-[#1B6F4A] via-[#2563EB] to-[#E63946]" />
    </motion.div>
  );
}
