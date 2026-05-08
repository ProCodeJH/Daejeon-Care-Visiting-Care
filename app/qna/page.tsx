import type { Metadata } from 'next';
/**
 * /qna = /contact alias (Header에서 "문의하기" link).
 * 문의 폼이 같으니 /contact 콘텐츠 재사용.
 * canonical → /contact (duplicate content SEO 방지).
 */
import ContactPage from '../contact/page';
import { CONTACT } from '@/lib/contact';

export const metadata: Metadata = {
  title: '문의 Q&A',
  description: `대전케어 방문요양센터 문의 — 24시간 상담 ${CONTACT.phone}. 무료 상담 + 등급 신청 도움.`,
  alternates: { canonical: '/contact' },
};

export default function QnAPage() {
  return <ContactPage />;
}
