/**
 * Article JSON-LD — Story/Notice detail 페이지용.
 * Google 검색 결과 > Article 리치 노출 (썸네일 + 작성일 + 저자 carousel).
 * Senior care content 발견성 ↑.
 */
import { SITE as SITE_CONFIG } from '@/lib/site';

const SITE = SITE_CONFIG.url;
const ORG_ID = `${SITE}/#business`;

export function ArticleJsonLd({
  type = 'Article',
  headline,
  description,
  datePublished,
  dateModified,
  author = '대전케어 방문요양센터',
  url,
}: {
  type?: 'Article' | 'BlogPosting' | 'NewsArticle';
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
}) {
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': type,
    headline,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    inLanguage: 'ko',
    author: {
      '@type': 'Organization',
      name: author,
      '@id': ORG_ID,
    },
    publisher: {
      '@type': 'Organization',
      name: '대전케어 방문요양센터',
      '@id': ORG_ID,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE}/icon`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE}${url}`,
    },
    image: `${SITE}/opengraph-image`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld).replace(/</g, '\\u003c') }}
    />
  );
}
