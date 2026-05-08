import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { CONTACT } from '@/lib/contact';

/**
 * Segment layout — page.tsx가 'use client'라 metadata export 불가 → 여기서 처리.
 * Next.js App Router 표준 paradigm.
 */
export const metadata: Metadata = {
  title: '상담 문의',
  description: `${CONTACT.name} 상담 문의 — 24시간 상담 ${CONTACT.phone}. 무료 상담 + 등급 신청 도움.`,
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
