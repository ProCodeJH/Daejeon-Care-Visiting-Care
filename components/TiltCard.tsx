'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * 절제된 3D tilt — hover 시 max 2deg rotateX/Y.
 * jahyeon Image3DTilt 적용을 senior care에 맞게 축소.
 * prefers-reduced-motion 시 framer-motion 자동 비활성.
 */
export function TiltCard({
  children,
  className = '',
  intensity = 2, // max degree (default 2 = 매우 절제)
  href,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  href?: string;
  ariaLabel?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 20 });
  const sy = useSpring(y, { stiffness: 250, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-intensity, intensity]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const content = (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1200,
      }}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className={`will-change-transform ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">
        {content}
      </a>
    );
  }
  return content;
}
