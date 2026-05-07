/**
 * /qna = /contact alias (Header에서 "문의하기" link).
 * 문의 폼이 같으니 /contact 콘텐츠 재사용.
 */
import ContactPage from '../contact/page';

export default function QnAPage() {
  return <ContactPage />;
}
