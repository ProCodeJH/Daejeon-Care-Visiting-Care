'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { STORIES, type Story } from '@/content/stories';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';
import { ShareButton } from '@/components/ShareButton';
import { SpeakButton } from '@/components/SpeakButton';
import { ArticleJsonLd } from '@/components/ArticleJsonLd';
import { CONTACT } from '@/lib/contact';
import {
  ADMIN_CONTENT_EVENT,
  fetchAdminContent,
  getStoryUrl,
  sortByDateDesc,
  type AdminStory,
  type ManagedStory,
} from '@/lib/admin-content';

export function StoryDetailClient({
  id,
  initialStory,
}: {
  id: string;
  initialStory: Story | null;
}) {
  const [adminStories, setAdminStories] = useState<AdminStory[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadAdminContent = async () => {
      const snapshot = await fetchAdminContent();
      setAdminStories(snapshot.stories);
      setLoaded(true);
    };
    void loadAdminContent();
    window.addEventListener(ADMIN_CONTENT_EVENT, loadAdminContent);
    window.addEventListener('storage', loadAdminContent);
    return () => {
      window.removeEventListener(ADMIN_CONTENT_EVENT, loadAdminContent);
      window.removeEventListener('storage', loadAdminContent);
    };
  }, []);

  const stories = useMemo(
    () => sortByDateDesc<ManagedStory>([...adminStories, ...STORIES]),
    [adminStories],
  );
  const story = stories.find((item) => String(item.id) === id) ?? initialStory;

  if (!story && !loaded) {
    return (
      <PageHero
        title={`${CONTACT.brand} 이야기`}
        sub="게시글을 불러오는 중입니다"
        crumbs={[{ label: `${CONTACT.brand} 이야기`, href: '/story' }]}
      />
    );
  }

  if (!story) {
    return (
      <>
        <PageHero
          title="글을 찾을 수 없습니다"
          sub="삭제되었거나 현재 브라우저에 저장되지 않은 글입니다"
          crumbs={[{ label: `${CONTACT.brand} 이야기`, href: '/story' }, { label: '미확인 글' }]}
        />
        <section className="bg-white py-16">
          <div className="mx-auto max-w-[800px] px-5 text-center">
            <Link
              href="/story"
              className="inline-flex items-center gap-2 bg-brand-600 px-5 py-3 text-sm font-bold text-white"
              style={{ borderRadius: '4px' }}
            >
              <ArrowLeft size={16} />
              이야기 목록으로
            </Link>
          </div>
        </section>
      </>
    );
  }

  const currentIdx = stories.findIndex((item) => String(item.id) === String(story.id));
  const prev = stories[currentIdx + 1];
  const next = stories[currentIdx - 1];
  const readMinutes = Math.max(1, Math.ceil(story.body.length / 300));

  return (
    <>
      <ArticleJsonLd
        type="BlogPosting"
        headline={story.title}
        description={story.excerpt}
        datePublished={story.date}
        url={getStoryUrl(story)}
      />
      <PageHero
        title={story.title}
        sub={story.excerpt}
        crumbs={[
          { label: '노인정보' },
          { label: `${CONTACT.brand} 이야기`, href: '/story' },
        ]}
      />

      <article className="bg-white py-16">
        <div className="mx-auto max-w-[800px] px-5">
          <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-600">
              {story.cat.toUpperCase()}
            </p>
            <span aria-hidden="true" className="text-ink-muted">·</span>
            <time dateTime={story.date} className="text-ink-muted">{story.date}</time>
            <span aria-hidden="true" className="text-ink-muted">·</span>
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
              <Clock size={14} aria-hidden="true" />
              {readMinutes}분 읽기
            </span>
          </div>

          {story.thumbnail ? (
            <figure className="mb-10 overflow-hidden border border-slate-200">
              <img
                src={story.thumbnail}
                alt={story.title}
                width={1200}
                height={600}
                loading="lazy"
                decoding="async"
                className="w-full aspect-[16/8] object-cover"
              />
              <figcaption className="sr-only">{story.title}</figcaption>
            </figure>
          ) : (
            <div
              aria-hidden="true"
              className="mb-10 aspect-[16/8] border border-slate-200 bg-[linear-gradient(135deg,#F8FAFC_0%,#EAF2FF_50%,#D7E4F5_100%)]"
            />
          )}

          <div className="whitespace-pre-line text-ink-secondary leading-loose md:text-lg" style={{ wordBreak: 'keep-all' }}>
            {story.body}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-6">
            <span lang="en" className="text-xs font-semibold tracking-[0.15em] text-ink-muted">
              <span aria-hidden="true">|</span> LISTEN & SHARE
            </span>
            <SpeakButton text={`${story.title}. ${story.excerpt}. ${story.body}`} />
            <ShareButton
              title={story.title}
              text={`${story.excerpt}\n${CONTACT.name} ${CONTACT.phone}`}
            />
          </div>

          <nav className="mt-12 flex flex-col gap-4 border-t border-gray-200 pt-6 md:flex-row md:items-center md:justify-between">
            <Link
              href="/story"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-secondary transition-colors hover:text-brand-600"
            >
              <ArrowLeft size={16} />
              이야기 목록
            </Link>
            <div className="flex gap-2">
              {prev && (
                <Link
                  href={getStoryUrl(prev)}
                  className="flex items-center gap-1.5 bg-gray-50 px-4 py-2 text-sm text-ink-secondary transition-colors hover:bg-brand-50"
                  style={{ borderRadius: '2px' }}
                >
                  <ChevronLeft size={14} />
                  이전
                </Link>
              )}
              {next && (
                <Link
                  href={getStoryUrl(next)}
                  className="flex items-center gap-1.5 bg-gray-50 px-4 py-2 text-sm text-ink-secondary transition-colors hover:bg-brand-50"
                  style={{ borderRadius: '2px' }}
                >
                  다음
                  <ChevronRight size={14} />
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
