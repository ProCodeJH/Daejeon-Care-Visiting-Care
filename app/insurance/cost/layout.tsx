import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '본인부담금 계산기',
  description:
    '장기요양 등급별 월 본인부담액 즉시 계산. 일반/감경/기초수급자 본인부담률 자동 산정. 2026년 기준 표준액.',
  alternates: { canonical: '/insurance/cost' },
};

export default function CostLayout({ children }: { children: ReactNode }) {
  return children;
}
