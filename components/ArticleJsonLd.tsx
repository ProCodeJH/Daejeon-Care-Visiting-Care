/**
 * Article JSON-LD — Story/Notice detail 페이지용.
 * Google 검색 결과 > Article 리치 노출 (썸네일 + 작성일 + 저자 carousel).
 * Senior care content 발견성 ↑.
 *
 * Wave 475: CONTACT.name single source — author/publisher hardcoded 위반 catch (paradigm 16).
 */
import { SITE as SITE_CONFIG } from '@/lib/site';
import { CONTACT } from '@/lib/contact';

const SITE = SITE_CONFIG.url;
const ORG_ID = `${SITE}/#business`;

export function ArticleJsonLd({
  type = 'Article',
  headline,
  description,
  datePublished,
  dateModified,
  author = CONTACT.name,
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
    inLanguage: SITE_CONFIG.lang,
    author: {
      '@type': 'Organization',
      name: author,
      '@id': ORG_ID,
    },
    publisher: {
      '@type': 'Organization',
      name: CONTACT.name,
      '@id': ORG_ID,
      logo: {
        '@type': 'ImageObject',
        // Wave 474: Wave 444 saturation 누락 catch — generateImageMetadata 후 /icon 무효, /icon/large (512×512) 정확
        url: `${SITE}/icon/large`,
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
