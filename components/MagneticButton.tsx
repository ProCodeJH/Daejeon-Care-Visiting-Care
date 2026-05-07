'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * 자석 hover — 마우스 위치에 따라 버튼이 미세 끌림 (max 6px).
 * senior care 적합: 8px 미만 = 어르신 부담 X.
 * prefers-reduced-motion 시 framer-motion 자동 비활성.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  pullStrength = 0.25, // 0~1 (0.25 = 마우스 거리의 25%만 따라감)
  maxPull = 6, // px
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  pullStrength?: number;
  maxPull?: number;
  ariaLabel?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 22 });
  const sy = useSpring(y, { stiffness: 280, damping: 22 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * pullStrength;
    const dy = (e.clientY - cy) * pullStrength;
    x.set(Math.max(-maxPull, Math.min(maxPull, dx)));
    y.set(Math.max(-maxPull, Math.min(maxPull, dy)));
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const Tag: 'a' | 'button' = href ? 'a' : 'button';
  const tagProps = href ? { href } : { onClick, type: 'button' as const };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      <Tag {...tagProps} aria-label={ariaLabel} className={className}>
        {children}
      </Tag>
    </motion.div>
  );
}
