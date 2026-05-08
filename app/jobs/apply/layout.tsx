import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { CONTACT } from '@/lib/contact';

/**
 * Segment layout — page.tsx가 'use client'라 metadata export 불가 → 여기서 처리.
 * Next.js App Router 표준 paradigm.
 */
export const metadata: Metadata = {
  title: '요양보호사 지원',
  description: `${CONTACT.name} 요양보호사 지원 — 5구 지점 + 자격증 우대 + 24시간 상담 ${CONTACT.phone}.`,
  alternates: { canonical: '/jobs/apply' },
};

export default function JobsApplyLayout({ children }: { children: ReactNode }) {
  return children;
}
