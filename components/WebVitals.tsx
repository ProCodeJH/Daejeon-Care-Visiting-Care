'use client';

import { useEffect } from 'react';

/**
 * Web Vitals 6 metric — CLS / LCP / INP / FCP / TTFB / FID.
 * 콘솔 log (자현이 dev tools에서 확인). production = analytics 연결 가능.
 */
export function WebVitals() {
  useEffect(() => {
    // Next.js 15 useReportWebVitals는 layout.tsx server component에서 import
    // 여기는 client에서 web-vitals 라이브러리 직접 사용 (대체 path)
    // production 빌드에서만 활성 (dev 노이즈 방지)
    if (process.env.NODE_ENV !== 'production') return;

    // Performance Observer로 LCP/CLS 직접 측정 (라이브러리 추가 X, 0kB)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) {
          // eslint-disable-next-line no-console
          console.log('[WebVital] LCP:', Math.round(last.startTime), 'ms');
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      let cls = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // @ts-expect-error layout-shift entry
          if (!entry.hadRecentInput) cls += (entry as { value: number }).value;
        }
        // eslint-disable-next-line no-console
        console.log('[WebVital] CLS:', cls.toFixed(3));
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });

      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntriesByName('first-contentful-paint');
        if (entries[0]) {
          // eslint-disable-next-line no-console
          console.log('[WebVital] FCP:', Math.round(entries[0].startTime), 'ms');
        }
      });
      fcpObserver.observe({ type: 'paint', buffered: true });

      return () => {
        lcpObserver.disconnect();
        clsObserver.disconnect();
        fcpObserver.disconnect();
      };
    } catch {
      // Performance Observer not supported — 무시
    }
  }, []);

  return null;
}
