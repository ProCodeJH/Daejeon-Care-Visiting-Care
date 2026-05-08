import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { CONTACT } from '@/lib/contact';

/**
 * /story 리스트 페이지 metadata.
 * /story/[id] 디테일 페이지는 page.tsx의 generateMetadata가 우선 적용.
 */
export const metadata: Metadata = {
  title: `${CONTACT.brand} 이야기`,
  description:
    '현장에서 만난 따뜻한 순간 — 대전케어 매니저들의 이야기와 어르신 일상. 카테고리별 콘텐츠 안내.',
  alternates: { canonical: '/story' },
};

export default function StoryLayout({ children }: { children: ReactNode }) {
  return children;
}
