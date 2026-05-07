/**
 * /homecare = /service alias (방문요양 = 메인 서비스).
 * Header NAV에서 별도 link 제공이라 redirect 대신 동일 콘텐츠 재사용.
 */
import ServicePage from '../service/page';

export default function HomecarePage() {
  return <ServicePage />;
}
