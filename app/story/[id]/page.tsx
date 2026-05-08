import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { STORIES } from '@/content/stories';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';
import { ShareButton } from '@/components/ShareButton';

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
      <PageHero
        title="대전케어 이야기"
        sub="현장에서 만난 따뜻한 순간"
        crumbs={[{ label: '노인정보' }, { label: '대전케어 이야기', href: '/story' }]}
      />

      <article className="bg-white py-16">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="mb-8">
            <p className="text-xs text-brand-600 font-semibold tracking-[0.2em] mb-3">{s.cat.toUpperCase()}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-ink-primary leading-snug mb-4" style={{ textWrap: 'balance' as const }}>
              {s.title}
            </h1>
            <time dateTime={s.date} className="text-sm text-ink-muted">{s.date}</time>
          </div>

          {/* 썸네일 자리 (저작권 0 gradient) */}
          <div className="aspect-[16/8] bg-gradient-to-br from-brand-200 via-brand-400 to-[#1B6F4A] mb-10" style={{ borderRadius: '2px' }} />

          <div className="text-ink-secondary leading-loose md:text-lg whitespace-pre-line" style={{ wordBreak: 'keep-all' }}>
            {s.body}
          </div>

          {/* 공유 (모바일 = 네이티브 share sheet · KakaoTalk 단톡 즉시 공유) */}
          <div className="mt-10 pt-6 border-t border-gray-100 flex items-center gap-3">
            <span className="text-xs text-ink-muted font-semibold tracking-[0.15em]">| SHARE</span>
            <ShareButton title={s.title} text={s.excerpt} />
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
