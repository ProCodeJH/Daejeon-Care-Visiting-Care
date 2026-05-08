import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { STORIES } from '@/content/stories';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';
import { ShareButton } from '@/components/ShareButton';
import { ArticleJsonLd } from '@/components/ArticleJsonLd';
import { CONTACT } from '@/lib/contact';

export function generateStaticParams() {
  return STORIES.map((s) => ({ id: String(s.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const s = STORIES.find((s) => s.id === Number(id));
  if (!s) return { title: '대전케어 이야기' };
  return {
    title: s.title,
    description: s.excerpt,
    alternates: { canonical: `/story/${s.id}` },
    openGraph: {
      title: s.title,
      description: s.excerpt,
      type: 'article',
      publishedTime: s.date,
    },
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idNum = Number(id);
  const s = STORIES.find((s) => s.id === idNum);
  if (!s) notFound();

  const sorted = [...STORIES].sort((a, b) => b.id - a.id);
  const currentIdx = sorted.findIndex((x) => x.id === idNum);
  const prev = sorted[currentIdx + 1];
  const next = sorted[currentIdx - 1];

  return (
    <>
      <ArticleJsonLd
        type="BlogPosting"
        headline={s.title}
        description={s.excerpt}
        datePublished={s.date}
        url={`/story/${s.id}`}
      />
      <PageHero
        title={s.title}
        sub={s.excerpt}
        crumbs={[
          { label: '노인정보' },
          { label: '대전케어 이야기', href: '/story' },
        ]}
      />

      <article className="bg-white py-16">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <p className="text-xs text-brand-600 font-semibold tracking-[0.2em]">
              {s.cat.toUpperCase()}
            </p>
            <span className="text-ink-muted">·</span>
            <time dateTime={s.date} className="text-ink-muted">{s.date}</time>
          </div>

          {/* 썸네일 — 자현 이미지 입력 시 활성, 미입력 시 정체성 gradient (저작권 0) */}
          {s.thumbnail ? (
            <div
              role="img"
              aria-label={s.title}
              className="aspect-[16/8] mb-10 bg-cover bg-center"
              style={{ borderRadius: '2px', backgroundImage: `url('${s.thumbnail}')` }}
            />
          ) : (
            <div className="aspect-[16/8] bg-gradient-to-br from-brand-200 via-brand-400 to-[#1B6F4A] mb-10" style={{ borderRadius: '2px' }} />
          )}

          <div className="text-ink-secondary leading-loose md:text-lg whitespace-pre-line" style={{ wordBreak: 'keep-all' }}>
            {s.body}
          </div>

          {/* 공유 (모바일 = 네이티브 share sheet · KakaoTalk 단톡 즉시 공유) */}
          <div className="mt-10 pt-6 border-t border-gray-100 flex items-center gap-3">
            <span className="text-xs text-ink-muted font-semibold tracking-[0.15em]">| SHARE</span>
            <ShareButton
              title={s.title}
              text={`${s.excerpt}\n— ${CONTACT.name} ${CONTACT.phone}`}
            />
          </div>

          {/* 이전/다음 */}
          <nav className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Link
              href="/story"
              className="inline-flex items-center gap-2 text-sm text-ink-secondary hover:text-brand-600 transition-colors font-semibold"
            >
              <ArrowLeft size={16} />이야기 목록
            </Link>
            <div className="flex gap-2">
              {prev && (
                <Link
                  href={`/story/${prev.id}`}
                  className="flex items-center gap-1.5 bg-gray-50 hover:bg-brand-50 text-ink-secondary px-4 py-2 text-sm transition-colors"
                  style={{ borderRadius: '2px' }}
                >
                  <ChevronLeft size={14} />이전
                </Link>
              )}
              {next && (
                <Link
                  href={`/story/${next.id}`}
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
