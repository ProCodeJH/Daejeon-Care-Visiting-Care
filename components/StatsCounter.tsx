'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

/**
 * StatsCounter — whileInView + animate(0 → target).
 * 1.5s ease-out (senior care 천천히 = 부담 X).
 * prefers-reduced-motion 시 즉시 표시.
 */
export function StatsCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1.5,
  className = '',
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (n) => Math.round(n).toLocaleString('ko-KR'));
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplay(value.toLocaleString('ko-KR'));
      return;
    }
    const controls = animate(count, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString('ko-KR')),
    });
    return () => controls.stop();
  }, [inView, value, duration, count]);

  return (
    <span ref={ref} aria-label={`${prefix}${value}${suffix}`} className={className}>
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
    </span>
  );
}
