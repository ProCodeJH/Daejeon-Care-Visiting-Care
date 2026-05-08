/**
 * BreadcrumbList JSON-LD — 페이지별 inject (SEO).
 * Google 검색 결과 > breadcrumb 리치 노출.
 */
import { SITE as SITE_CONFIG } from '@/lib/site';

const SITE = SITE_CONFIG.url;

type Crumb = { name: string; href?: string };

export function BreadcrumbJsonLd({ crumbs }: { crumbs: Crumb[] }) {
  const items = [
    { '@type': 'ListItem', position: 1, name: '홈', item: SITE },
    ...crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 2,
      name: c.name,
      ...(c.href ? { item: `${SITE}${c.href}` } : {}),
    })),
  ];

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld).replace(/</g, '\\u003c') }}
    />
  );
}
