import type { MetadataRoute } from 'next';
import { CONTACT } from '@/lib/contact';

/**
 * site.webmanifest — 모바일 홈 화면 추가 (PWA-lite).
 * shortcuts = long-press 앱 아이콘 시 핵심 routes 빠른 진입 (senior care use case).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: CONTACT.name,
    short_name: CONTACT.brand,
    description: `대전 5구 통합 방문요양센터 · 24시간 상담 ${CONTACT.phone} · 어르신 댁으로 직접 찾아가는 케어`,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    display_override: ['standalone', 'minimal-ui'],
    background_color: '#FFFFFF',
    theme_color: '#1E40AF',
    lang: 'ko-KR',
    dir: 'ltr',
    orientation: 'portrait',
    categories: ['health', 'lifestyle', 'medical'],
    prefer_related_applications: false,
    // Wave 430: PWA-standard 192/512 추가 — Android Chrome "Install app" 프롬프트 활성화 + splash screen 정상 출력.
    icons: [
      { src: '/icon/small', sizes: '64x64', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
      { src: '/icon/medium', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon/large', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
    shortcuts: [
      {
        name: '본인부담금 계산',
        short_name: '비용 계산',
        description: '장기요양 등급별 본인부담액 즉시 확인',
        url: '/insurance/cost',
      },
      {
        name: '대전 5구 지점',
        short_name: '지점 안내',
        description: '유성·대덕·서구·중구·동구 가까운 지점',
        url: '/centers',
      },
      {
        name: '직접 문의하기',
        short_name: '문의',
        description: `24시간 상담 가능 · ${CONTACT.phone}`,
        url: '/contact',
      },
    ],
  };
}
