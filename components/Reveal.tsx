'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * 절제된 scroll-reveal — IntersectionObserver 기반 (whileInView).
 * once: true = 한 번만 발동 (어르신 산만 방지).
 * delay 옵션 = staggered 카드 그리드용.
 * prefers-reduced-motion 시 framer-motion 자동 비활성.
 */
/**
 * SEO + JS-disabled fallback paradigm:
 * - opacity 변화 X (SSG render 시 visible 1)
 * - y motion만 유지 (slide-in entry)
 * - Google bot/screen reader/모든 user 즉시 인식
 */
const variants: Variants = {
  hidden: { y: 18 },
  visible: { y: 0 },
};

export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li';
}) {
  const MotionTag = motion[Tag] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
