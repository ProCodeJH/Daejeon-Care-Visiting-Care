import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';
import { NOTICES } from '@/content/notices';
import { STORIES } from '@/content/stories';
import { CENTERS } from '@/content/centers';

export const metadata = {
  title: '사이트맵',
  description: '대전케어 방문요양센터 전체 페이지 안내.',
  alternates: { canonical: '/sitemap' },
};

const SECTIONS = [
  {
    title: '센터소개',
    color: 'border-[#1B6F4A]',
    pages: [
      { href: '/about', label: '인사말' },
      { href: '/service', label: '서비스 소개' },
      { href: '/process', label: '서비스 이용 절차' },
      { href: '/homecare', label: '방문요양' },
      { href: '/centers', label: '5구 지점' },
      { href: '/map', label: '찾아오시는 길' },
    ],
  },
  {
    title: '노인장기요양보험',
    color: 'border-brand-600',
    pages: [
      { href: '/insurance', label: '노인장기요양보험이란?' },
      { href: '/insurance/grade', label: '장기요양등급절차 및 심사' },
      { href: '/insurance/cost', label: '본인부담금 계산기' },
    ],
  },
  {
    title: '노인정보',
    color: 'border-[#F5A623]',
    pages: [
      { href: '/story', label: '대전케어 이야기' },
      { href: '/info', label: '요양 정보' },
    ],
  },
  {
    title: '요양보호사 일자리',
    color: 'border-[#E63946]',
    pages: [
      { href: '/jobs', label: '채용 공고' },
      { href: '/jobs/apply', label: '지원하기' },
    ],
  },
  {
    title: '고객센터',
    color: 'border-[#1B6F4A]',
    pages: [
      { href: '/notice', label: '공지사항' },
      { href: '/contact', label: '문의 / 상담' },
      { href: '/qna', label: '문의하기' },
      { href: '/faq', label: '자주 묻는 질문' },
    ],
  },
  {
    title: '약관 및 안내',
    color: 'border-gray-400',
    pages: [
      { href: '/privacy', label: '개인정보처리방침' },
      { href: '/terms', label: '이용약관' },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <PageHero
        title="사이트맵"
        sub="대전케어 방문요양센터 전체 페이지 안내"
        crumbs={[{ label: '사이트맵' }]}
      />

      {/* 메인 카테고리 */}
      <section className="bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-5">
          {/* Wave 382: 각 카테고리 = 독립 navigation landmark (WAI-ARIA APG, multiple nav OK with unique labels) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECTIONS.map((s) => (
              <nav
                key={s.title}
                aria-label={s.title}
                className={`bg-[#f8f8f8] p-6 border-t-4 ${s.color}`}
              >
                <h2 className="text-lg font-bold text-ink-primary mb-4">{s.title}</h2>
                <ul className="space-y-2">
                  {s.pages.map((p) => (
                    <li key={p.href}>
                      <Link
                        href={p.href}
                        className="text-sm text-ink-secondary hover:text-brand-600 transition-colors flex items-center gap-1.5"
                      >
                        <span className="text-brand-400">›</span>
                        {p.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </section>

      {/* 콘텐츠 detail (notices/stories) */}
      <section className="bg-[#f8f8f8] py-16">
        {/* Wave 382: detail 콘텐츠 navigation도 nav landmark — 공지/이야기 별도 landmark */}
        <div className="max-w-[1200px] mx-auto px-5 grid md:grid-cols-2 gap-6">
          <nav aria-label={`공지사항 전체 ${NOTICES.length}건`} className="bg-white p-6 border-t-4 border-[#1B6F4A]">
            <h2 className="text-lg font-bold text-ink-primary mb-4">공지사항 ({NOTICES.length})</h2>
            <ul className="space-y-2">
              {NOTICES.map((n) => (
                <li key={n.id}>
                  <Link
                    href={`/notice/${n.id}`}
                    className="text-sm text-ink-secondary hover:text-brand-600 transition-colors line-clamp-1"
                  >
                    <span className="text-brand-400 mr-1.5">›</span>
                    {n.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={`대전케어 이야기 전체 ${STORIES.length}건`} className="bg-white p-6 border-t-4 border-[#F5A623]">
            <h2 className="text-lg font-bold text-ink-primary mb-4">대전케어 이야기 ({STORIES.length})</h2>
            <ul className="space-y-2">
              {STORIES.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/story/${s.id}`}
                    className="text-sm text-ink-secondary hover:text-brand-600 transition-colors line-clamp-1"
                  >
                    <span className="text-brand-400 mr-1.5">›</span>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* 5구 지점 */}
      <section className="bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-lg font-bold text-ink-primary mb-4 text-center">대전 5구 지점</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {CENTERS.map((c) => (
              <Link
                key={c.slug}
                href="/centers"
                className="bg-[#f8f8f8] hover:bg-brand-50 p-4 text-center transition-colors border-l-4 border-brand-400"
              >
                <p className="font-bold text-ink-primary">{c.name}</p>
                <p className="text-xs text-ink-muted mt-1">{c.region}</p>
              </Link>
            ))}
          </div>
          <p className="text-center text-xs text-ink-muted mt-6">
            <Link href="/sitemap.xml" className="hover:text-brand-600 underline-offset-4 hover:underline">
              XML sitemap (검색엔진용) →
            </Link>
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
