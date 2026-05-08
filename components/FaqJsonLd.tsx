/**
 * FAQPage JSON-LD — Google 검색 결과 FAQ 리치 노출.
 * Google "대전 방문요양 등급 신청" 검색 시 FAQ 자동 표시.
 */
type Faq = { q: string; a: string };

export function FaqJsonLd({ faqs }: { faqs: Faq[] }) {
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
    />
  );
}
