import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '공지사항',
  description:
    '대전케어 방문요양센터 공지사항 — 새로운 소식과 안내 사항을 전해드립니다.',
  alternates: { canonical: '/notice' },
};

export default function NoticeLayout({ children }: { children: ReactNode }) {
  return children;
}
