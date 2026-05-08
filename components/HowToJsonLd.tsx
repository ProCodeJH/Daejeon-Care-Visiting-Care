/**
 * HowTo JSON-LD — Google 검색 결과 단계별 리치 노출.
 * "장기요양 신청 방법" / "방문요양 이용 절차" 검색 시 단계별 표시.
 */
type Step = { name: string; text: string };

export function HowToJsonLd({
  name,
  description,
  totalTime = 'P30D',
  steps,
}: {
  name: string;
  description: string;
  totalTime?: string;
  steps: Step[];
}) {
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    totalTime,
    inLanguage: 'ko',
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld).replace(/</g, '\\u003c') }}
    />
  );
}
