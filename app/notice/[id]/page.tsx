import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { NOTICES } from '@/content/notices';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';
import { ShareButton } from '@/components/ShareButton';
import { ArticleJsonLd } from '@/components/ArticleJsonLd';
import { CONTACT } from '@/lib/contact';

export function generateStaticParams() {
  return NOTICES.map((n) => ({ id: String(n.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const n = NOTICES.find((n) => n.id === Number(id));
  if (!n) return { title: '공지사항' };
  const description = n.body.slice(0, 140).replace(/\s+/g, ' ').trim();
  return {
    title: n.title,
    description,
    alternates: { canonical: `/notice/${n.id}` },
    openGraph: {
      title: n.title,
      description,
      type: 'article',
      publishedTime: n.date,
    },
  };
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idNum = Number(id);
  const n = NOTICES.find((n) => n.id === idNum);
  if (!n) notFound();

  const sorted = [...NOTICES].sort((a, b) => b.id - a.id);
  const currentIdx = sorted.findIndex((x) => x.id === idNum);
  const prev = sorted[currentIdx + 1];
  const next = sorted[currentIdx - 1];

  return (
    <>
      <ArticleJsonLd
        type="NewsArticle"
        headline={n.title}
        description={n.body.slice(0, 200).replace(/\s+/g, ' ').trim()}
        datePublished={n.date}
        author={n.author}
        url={`/notice/${n.id}`}
      />
      <PageHero
        title={n.title}
        sub={n.body.slice(0, 100).replace(/\s+/g, ' ').trim()}
        crumbs={[
          { label: '고객센터' },
          { label: '공지사항', href: '/notice' },
        ]}
      />

      <article className="bg-white py-16">
        <div className="max-w-[800px] mx-auto px-5">
          {/* 메타 */}
          <div className="border-b border-gray-200 pb-6 mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            {n.pinned && (
              <span className="inline-block bg-[#E63946] text-white text-xs font-bold px-2.5 py-1" style={{ borderRadius: '2px' }}>
                공지
              </span>
            )}
            <span className="text-ink-muted">{n.author}</span>
            <span className="text-ink-muted">·</span>
            <time dateTime={n.date} className="text-ink-muted">{n.date}</time>
            <span className="text-ink-muted">·</span>
            <span className="text-ink-muted">조회 {n.views}</span>
          </div>

          {/* 본문 */}
          <div
            className="prose prose-lg max-w-none text-ink-secondary leading-loose whitespace-pre-line"
            style={{ wordBreak: 'keep-all' }}
          >
            {n.body}
          </div>

          {/* 공유 (모바일 = 네이티브 share sheet · KakaoTalk 단톡 즉시 공유) */}
          <div className="mt-10 pt-6 border-t border-gray-100 flex items-center gap-3">
            <span className="text-xs text-ink-muted font-semibold tracking-[0.15em]">| SHARE</span>
            <ShareButton
              title={n.title}
              text={`${n.body.slice(0, 140).replace(/\s+/g, ' ').trim()}\n— ${CONTACT.name} ${CONTACT.phone}`}
            />
          </div>

          {/* 이전/다음 */}
          <nav className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Link
              href="/notice"
              className="inline-flex items-center gap-2 text-sm text-ink-secondary hover:text-brand-600 transition-colors font-semibold"
            >
              <ArrowLeft size={16} />목록으로
            </Link>
            <div className="flex gap-2">
              {prev && (
                <Link
                  href={`/notice/${prev.id}`}
                  className="flex items-center gap-1.5 bg-gray-50 hover:bg-brand-50 text-ink-secondary px-4 py-2 text-sm transition-colors"
                  style={{ borderRadius: '2px' }}
                >
                  <ChevronLeft size={14} />이전
                </Link>
              )}
              {next && (
                <Link
                  href={`/notice/${next.id}`}
                  className="flex items-center gap-1.5 bg-gray-50 hover:bg-brand-50 text-ink-secondary px-4 py-2 text-sm transition-colors"
                  style={{ borderRadius: '2px' }}
                >
                  다음<ChevronRight size={14} />
                </Link>
              )}
            </div>
          </nav>
        </div>
      </article>

      <CTASection />
    </>
  );
}
