/**
 * JSON-LD structured data — MedicalBusiness for Google rich results.
 * 자현 정체성 (대표번호 + 24시간 + 대전 5구) + 한글 도메인.
 */
import { CONTACT } from '@/lib/contact';

const SITE = 'https://대전케어방문요양.kr';

const BUSINESS_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  '@id': `${SITE}/#business`,
  name: CONTACT.name,
  alternateName: '대전케어',
  description:
    '대전 5구 통합 방문요양센터. 어르신 댁으로 직접 찾아가는 케어 — 방문요양·방문목욕·방문간호. 24시간 상담 가능.',
  url: SITE,
  logo: `${SITE}/icon`,
  image: `${SITE}/opengraph-image`,
  telephone: CONTACT.phoneIntl,
  email: CONTACT.email,
  priceRange: '₩',
  inLanguage: 'ko',
  currenciesAccepted: 'KRW',
  paymentAccepted: '본인부담금 (장기요양보험)',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'KR',
    addressRegion: '대전광역시',
    addressLocality: '대전',
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: '대전 유성구' },
    { '@type': 'AdministrativeArea', name: '대전 대덕구' },
    { '@type': 'AdministrativeArea', name: '대전 서구' },
    { '@type': 'AdministrativeArea', name: '대전 중구' },
    { '@type': 'AdministrativeArea', name: '대전 동구' },
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '00:00',
    closes: '23:59',
    description: '24시간 상담 가능',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: CONTACT.phoneIntl,
    email: CONTACT.email,
    contactType: 'customer service',
    availableLanguage: ['Korean'],
    hoursAvailable: '24시간',
  },
  serviceType: ['방문요양', '방문목욕', '방문간호', '장기요양 등급 신청 도움'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '대전케어 서비스',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '방문요양',
          description: '신체활동 / 일상생활 / 개인활동 / 정서 지원',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '방문목욕',
          description: '존엄을 지키는 목욕 케어',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '방문간호',
          description: '의료 케어가 일상 안으로',
        },
      },
    ],
  },
};

const WEBSITE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  url: SITE,
  name: CONTACT.name,
  inLanguage: 'ko',
  publisher: { '@id': `${SITE}/#business` },
};

/**
 * SpeakableSpecification — Google Voice Assistant / Naver Clova / Siri 음성 읽기 대상 지정.
 * Senior care: 어르신 시각 어려움 + 가족 운전 중 정보 듣기 use case.
 * cssSelector: h1 + [data-speakable] 마크된 요소만 읽음.
 */
const SPEAKABLE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '[data-speakable]'],
  },
  inLanguage: 'ko',
};

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BUSINESS_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SPEAKABLE_JSONLD) }}
      />
    </>
  );
}
