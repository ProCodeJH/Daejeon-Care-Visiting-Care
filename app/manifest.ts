import type { MetadataRoute } from 'next';

/**
 * site.webmanifest — 모바일 홈 화면 추가 (PWA-lite).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '대전케어 방문요양센터',
    short_name: '대전케어',
    description:
      '대전 5구 통합 방문요양센터 · 24시간 상담 042-369-0326 · 어르신 댁으로 직접 찾아가는 케어',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#1B6F4A',
    lang: 'ko-KR',
    orientation: 'portrait',
    categories: ['health', 'lifestyle', 'medical'],
    icons: [
      { src: '/icon', sizes: '64x64', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
