import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

/**
 * robots.txt — Next.js 15 native.
 * Google/Naver/Daum 허용 + AI training bots 차단.
 */
export default function robots(): MetadataRoute.Robots {

  // 26 AI training bots 차단 (자현 콘텐츠 보호)
  const aiBots = [
    'GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai', 'Claude-Web', 'ClaudeBot',
    'Google-Extended', 'Bytespider', 'Amazonbot', 'PerplexityBot', 'cohere-ai',
    'YouBot', 'Diffbot', 'ImagesiftBot', 'Omgilibot', 'FacebookBot',
    'Applebot-Extended', 'TimpiBot', 'OAI-SearchBot', 'AwarioRssBot', 'AwarioSmartBot',
    'magpie-crawler', 'Meltwater', 'PiplBot', 'scoop.it', 'Seekr',
  ];

  return {
    rules: [
      // 일반 검색엔진 — 허용
      { userAgent: '*', allow: '/', disallow: ['/api/', '/_next/'] },
      // Google / Naver / Daum 명시 허용
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Yeti', allow: '/' }, // Naver
      { userAgent: 'Daumoa', allow: '/' }, // Daum
      // AI 학습 bots 차단
      ...aiBots.map((bot) => ({ userAgent: bot, disallow: '/' })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
