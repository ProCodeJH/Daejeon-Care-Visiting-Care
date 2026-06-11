'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { NOTICES, type Notice } from '@/content/notices';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';
import { ShareButton } from '@/components/ShareButton';
import { SpeakButton } from '@/components/SpeakButton';
import { ArticleJsonLd } from '@/components/ArticleJsonLd';
import { CONTACT } from '@/lib/contact';
import {
  ADMIN_CONTENT_EVENT,
  fetchAdminContent,
  getNoticeUrl,
  sortByDateDesc,
  type AdminNotice,
  type ManagedNotice,
} from '@/lib/admin-content';

export function NoticeDetailClient({
  id,
  initialNotice,
}: {
  id: string;
  initialNotice: Notice | null;
}) {
  const [adminNotices, setAdminNotices] = useState<AdminNotice[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadAdminContent = async () => {
      const snapshot = await fetchAdminContent();
      setAdminNotices(snapshot.notices);
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

  const notices = useMemo(
    () => sortByDateDesc<ManagedNotice>([...adminNotices, ...NOTICES]),
    [adminNotices],
  );
  const notice = notices.find((item) => String(item.id) === id) ?? initialNotice;

  if (!notice && !loaded) {
    return (
      <PageHero
        title="공지사항"
        sub="공지사항을 불러오는 중입니다"
        crumbs={[{ label: '공지사항', href: '/notice' }]}
      />
    );
  }

  if (!notice) {
    return (
      <>
        <PageHero
          title="공지사항을 찾을 수 없습니다"
          sub="삭제되었거나 현재 브라우저에 저장되지 않은 공지입니다"
          crumbs={[{ label: '공지사항', href: '/notice' }, { label: '미확인 공지' }]}
        />
        <section className="bg-white py-16">
          <div className="mx-auto max-w-[800px] px-5 text-center">
            <Link
              href="/notice"
              className="inline-flex items-center gap-2 bg-brand-600 px-5 py-3 text-sm font-bold text-white"
              style={{ borderRadius: '4px' }}
            >
              <ArrowLeft size={16} />
              공지 목록으로
            </Link>
          </div>
        </section>
      </>
    );
  }

  const currentIdx = notices.findIndex((item) => String(item.id) === String(notice.id));
  const prev = notices[currentIdx + 1];
  const next = notices[currentIdx - 1];
  const readMinutes = Math.max(1, Math.ceil(notice.body.length / 300));

  return (
    <>
      <ArticleJsonLd
        type="NewsArticle"
        headline={notice.title}
        description={notice.body.slice(0, 200).replace(/\s+/g, ' ').trim()}
        datePublished={notice.date}
        author={notice.author}
        url={getNoticeUrl(notice)}
      />
      <PageHero
        title={notice.title}
        sub={notice.body.slice(0, 100).replace(/\s+/g, ' ').trim()}
        crumbs={[
          { label: '고객센터' },
          { label: '공지사항', href: '/notice' },
        ]}
      />

      <article className="bg-white py-16">
        <div className="mx-auto max-w-[800px] px-5">
          <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-gray-200 pb-6 text-sm">
            {notice.pinned && (
              <span className="inline-block bg-[#E63946] px-2.5 py-1 text-xs font-bold text-white" style={{ borderRadius: '2px' }}>
                공지
              </span>
            )}
            <span className="text-ink-muted">{notice.author}</span>
            <span aria-hidden="true" className="text-ink-muted">·</span>
            <time dateTime={notice.date} className="text-ink-muted">{notice.date}</time>
            <span aria-hidden="true" className="text-ink-muted">·</span>
            <span className="text-ink-muted">조회 {notice.views}</span>
            <span aria-hidden="true" className="text-ink-muted">·</span>
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
              <Clock size={14} aria-hidden="true" />
              {readMinutes}분 읽기
            </span>
          </div>

          <div
            className="prose prose-lg max-w-none whitespace-pre-line text-ink-secondary leading-loose"
            style={{ wordBreak: 'keep-all' }}
          >
            {notice.body}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-6">
            <span lang="en" className="text-xs font-semibold tracking-[0.15em] text-ink-muted">
              <span aria-hidden="true">|</span> LISTEN & SHARE
            </span>
            <SpeakButton text={`${notice.title}. ${notice.body}`} />
            <ShareButton
              title={notice.title}
              text={`${notice.body.slice(0, 140).replace(/\s+/g, ' ').trim()}\n${CONTACT.name} ${CONTACT.phone}`}
            />
          </div>

          <nav className="mt-12 flex flex-col gap-4 border-t border-gray-200 pt-6 md:flex-row md:items-center md:justify-between">
            <Link
              href="/notice"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-secondary transition-colors hover:text-brand-600"
            >
              <ArrowLeft size={16} />
              목록으로
            </Link>
            <div className="flex gap-2">
              {prev && (
                <Link
                  href={getNoticeUrl(prev)}
                  className="flex items-center gap-1.5 bg-gray-50 px-4 py-2 text-sm text-ink-secondary transition-colors hover:bg-brand-50"
                  style={{ borderRadius: '2px' }}
                >
                  <ChevronLeft size={14} />
                  이전
                </Link>
              )}
              {next && (
                <Link
                  href={getNoticeUrl(next)}
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
