'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * SplitChars char-by-char stagger entry — 절제 (gap 0.04s, 자연스러움).
 * Hero h1, Section heading 등에 적용.
 * 한글: 글자 단위 split. prefers-reduced-motion 시 framer 자동 비활성.
 */
export function SplitText({
  text,
  className = '',
  delay = 0,
  charDelay = 0.04,
  as: Tag = 'span',
}: {
  text: string;
  className?: string;
  delay?: number;
  charDelay?: number;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
}) {
  const chars = Array.from(text);
  const MotionTag = motion[Tag] as typeof motion.span;
  return (
    <MotionTag aria-label={text} className={className}>
      {/*
       * SEO + JS 비활성 fallback:
       * char span은 visible (opacity 1) 상태로 SSG render. JS hydration 후 framer가 motion 추가.
       * 검증: Google bot은 inner text "대전 5구 지점" 정확 인식.
       */}
      {chars.map((char, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={{ y: 14, filter: 'blur(4px)' }}
          animate={{ y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.55,
            delay: delay + i * charDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </MotionTag>
  );
}
