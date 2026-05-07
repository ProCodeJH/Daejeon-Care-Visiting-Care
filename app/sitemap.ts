import type { MetadataRoute } from 'next';

/**
 * sitemap.xml — Next.js 15 native generation.
 * 17 페이지 모두 등록 + lastModified 자동.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const SITE = 'https://대전케어방문요양.kr';
  const now = new Date();

  const routes: { path: string; priority: number; freq: 'daily' | 'weekly' | 'monthly' }[] = [
    { path: '/', priority: 1.0, freq: 'weekly' },
    { path: '/about', priority: 0.9, freq: 'monthly' },
    { path: '/service', priority: 0.95, freq: 'monthly' },
    { path: '/homecare', priority: 0.9, freq: 'monthly' },
    { path: '/process', priority: 0.85, freq: 'monthly' },
    { path: '/insurance', priority: 0.9, freq: 'monthly' },
    { path: '/insurance/grade', priority: 0.85, freq: 'monthly' },
    { path: '/insurance/cost', priority: 0.85, freq: 'monthly' },
    { path: '/story', priority: 0.7, freq: 'weekly' },
    { path: '/info', priority: 0.7, freq: 'monthly' },
    { path: '/jobs', priority: 0.85, freq: 'weekly' },
    { path: '/jobs/apply', priority: 0.8, freq: 'monthly' },
    { path: '/notice', priority: 0.6, freq: 'weekly' },
    { path: '/contact', priority: 0.95, freq: 'monthly' },
    { path: '/qna', priority: 0.85, freq: 'monthly' },
    { path: '/faq', priority: 0.8, freq: 'monthly' },
    { path: '/map', priority: 0.85, freq: 'monthly' },
  ];

  return routes.map(({ path, priority, freq }) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));
}
