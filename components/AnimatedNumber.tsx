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

  // Wave 497: aria-atomic="true" — number animate 시 부분 발음 회피, 전체 새 값 announce (faq/notice/story 일관)
  return (
    <span aria-live="polite" aria-atomic="true">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
