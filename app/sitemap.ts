import type { MetadataRoute } from 'next';
import { NOTICES } from '@/content/notices';
import { STORIES } from '@/content/stories';
import { SITE } from '@/lib/site';

/**
 * sitemap.xml — 17 정적 + N notice detail + M story detail = 동적 확장.
 * lastModified는 글 작성일 (notice/story) 또는 빌드 시점.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const SITE_URL = SITE.url;
  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    freq: 'daily' | 'weekly' | 'monthly';
  }[] = [
    { path: '/', priority: 1.0, freq: 'weekly' },
    { path: '/about', priority: 0.9, freq: 'monthly' },
    { path: '/service', priority: 0.95, freq: 'monthly' },
    { path: '/homecare', priority: 0.5, freq: 'monthly' },
    { path: '/process', priority: 0.85, freq: 'monthly' },
    { path: '/insurance', priority: 0.9, freq: 'monthly' },
    { path: '/insurance/grade', priority: 0.85, freq: 'monthly' },
    { path: '/insurance/cost', priority: 0.85, freq: 'monthly' },
    { path: '/story', priority: 0.7, freq: 'weekly' },
    { path: '/info', priority: 0.7, freq: 'monthly' },
    { path: '/jobs', priority: 0.85, freq: 'weekly' },
    { path: '/jobs/apply', priority: 0.8, freq: 'monthly' },
    { path: '/centers', priority: 0.85, freq: 'monthly' },
    { path: '/privacy', priority: 0.3, freq: 'monthly' },
    { path: '/terms', priority: 0.3, freq: 'monthly' },
    { path: '/notice', priority: 0.6, freq: 'weekly' },
    { path: '/contact', priority: 0.95, freq: 'monthly' },
    { path: '/qna', priority: 0.5, freq: 'monthly' },
    { path: '/faq', priority: 0.8, freq: 'monthly' },
    { path: '/map', priority: 0.85, freq: 'monthly' },
    { path: '/site-map', priority: 0.3, freq: 'monthly' },
  ];

  const noticeRoutes: MetadataRoute.Sitemap = NOTICES.map((n) => ({
    url: `${SITE_URL}/notice/${n.id}`,
    lastModified: new Date(n.date),
    changeFrequency: 'monthly',
    priority: n.pinned ? 0.7 : 0.5,
  }));

  const storyRoutes: MetadataRoute.Sitemap = STORIES.map((s) => ({
    url: `${SITE_URL}/story/${s.id}`,
    lastModified: new Date(s.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...staticRoutes.map(({ path, priority, freq }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: freq,
      priority,
    })),
    ...noticeRoutes,
    ...storyRoutes,
  ];
}
