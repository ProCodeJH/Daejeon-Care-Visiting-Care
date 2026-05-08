import type { Metadata } from 'next';
/**
 * /homecare = /service alias (방문요양 = 메인 서비스).
 * Header NAV에서 별도 link 제공이라 redirect 대신 동일 콘텐츠 재사용.
 * canonical → /service (duplicate content SEO 방지).
 */
import ServicePage from '../service/page';
import { CONTACT } from '@/lib/contact';

export const metadata: Metadata = {
  title: '방문요양',
  description: `${CONTACT.brand} 방문요양 — 신체활동 / 일상생활 / 개인활동 / 정서 지원 4종. 어르신 댁으로 직접 찾아가는 케어.`,
  alternates: { canonical: '/service' },
};

export default function HomecarePage() {
  return <ServicePage />;
}
