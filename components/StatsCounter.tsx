'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, animate } from 'framer-motion';

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
  const count = useMotionValue(value);
  // SSG render = final value (SEO 우선). JS hydration 후 inView 시 0 → target animate.
  const [display, setDisplay] = useState(value.toLocaleString('ko-KR'));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || !inView) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplay(value.toLocaleString('ko-KR'));
      return;
    }
    // 0부터 시작 → target. SSR display final → JS hydration 후 잠시 0 → animate to target.
    count.set(0);
    setDisplay('0');
    const controls = animate(count, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString('ko-KR')),
    });
    return () => controls.stop();
  }, [hydrated, inView, value, duration, count]);

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
