import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { CONTACT } from '@/lib/contact';

export const metadata: Metadata = {
  title: '자주 묻는 질문',
  description: `${CONTACT.name} FAQ — 신청 / 서비스 / 비용 카테고리별 자주 묻는 질문 7가지. 궁금증을 빠르게 풀어드립니다.`,
  alternates: { canonical: '/faq' },
};

export default function FaqLayout({ children }: { children: ReactNode }) {
  return children;
}
