'use client';

import { useEffect, useState } from 'react';
import { animate, useMotionValue } from 'framer-motion';

/**
 * AnimatedNumber — value 변경 시 부드러운 transition (0.6s ease-out).
 * 한국어 천 단위 콤마 자동.
 * StatsCounter는 once trigger / AnimatedNumber는 every change.
 */
export function AnimatedNumber({
  value,
  suffix = '',
  prefix = '',
  duration = 0.6,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const motionValue = useMotionValue(value);
  const [display, setDisplay] = useState(value.toLocaleString('ko-KR'));

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplay(value.toLocaleString('ko-KR'));
      motionValue.set(value);
      return;
    }
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString('ko-KR')),
    });
    return () => controls.stop();
  }, [value, duration, motionValue]);

  return (
    <span aria-live="polite">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
