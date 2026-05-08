'use client';

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * 절제된 3D tilt — hover 시 max 2deg rotateX/Y.
 * jahyeon Image3DTilt 적용을 senior care에 맞게 축소.
 *
 * Wave 453: useReducedMotion 명시 분기 — 3D rotate가 vestibular 자극 가능.
 * reduced 시 mouse handlers undefined + transform style omit → plain card.
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
  const reducedMotion = useReducedMotion();
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
      onMouseMove={reducedMotion ? undefined : handleMove}
      onMouseLeave={reducedMotion ? undefined : reset}
      style={
        reducedMotion
          ? undefined
          : {
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              transformPerspective: 1200,
            }
      }
      whileHover={reducedMotion ? undefined : { y: -2 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className={`will-change-transform ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </motion.div>
  );

  if (href) {
    // Wave 389: 사이트 globally `*:focus-visible { outline: 2px solid #2563EB }` 사용 — 일관성
    // Wave 462: internal/external 분기 — internal은 <Link> (SPA routing + prefetch), external은 raw <a>
    const isInternal = href.startsWith('/');
    if (isInternal) {
      return (
        <Link href={href} className="block">
          {content}
        </Link>
      );
    }
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }
  return content;
}
