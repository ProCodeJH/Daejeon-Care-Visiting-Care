import { CONTACT } from '@/lib/contact';
import { SITE } from '@/lib/site';

/**
 * JobPosting JSON-LD — Google for Jobs / 한국 검색엔진 채용 노출.
 * /jobs 페이지의 evergreen "요양보호사 항시 채용"을 schema.org 표준으로 표현.
 *
 * 가이드라인: datePosted = build time (recent), validThrough = 6 months 후.
 * Vercel SSG 빌드 시 자동 갱신 (push마다 재생성 = 항상 fresh date).
 */
type EmploymentType =
  | 'FULL_TIME'
  | 'PART_TIME'
  | 'CONTRACTOR'
  | 'TEMPORARY'
  | 'INTERN'
  | 'VOLUNTEER'
  | 'PER_DIEM'
  | 'OTHER';

export function JobPostingJsonLd({
  title,
  description,
  datePosted,
  validThrough,
  employmentType = 'PART_TIME',
  industry = 'Healthcare',
  skills,
  experienceRequirements,
  workHours,
}: {
  title: string;
  description: string;
  datePosted: string;
  validThrough: string;
  employmentType?: EmploymentType;
  industry?: string;
  skills?: string;
  experienceRequirements?: string;
  workHours?: string;
}) {
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title,
    description,
    datePosted,
    validThrough,
    employmentType,
    industry,
    inLanguage: SITE.lang,
    hiringOrganization: {
      '@type': 'Organization',
      name: CONTACT.name,
      sameAs: SITE.url,
      telephone: CONTACT.phoneIntl,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: '대전광역시',
        addressRegion: '대전',
        addressCountry: 'KR',
      },
    },
    ...(skills && { skills }),
    ...(experienceRequirements && { experienceRequirements }),
    ...(workHours && { workHours }),
    directApply: true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld).replace(/</g, '\\u003c') }}
    />
  );
}
