import type { Metadata } from 'next';
import { NOTICES } from '@/content/notices';
import { NoticeDetailClient } from './NoticeDetailClient';

export function generateStaticParams() {
  return NOTICES.map((notice) => ({ id: String(notice.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const notice = NOTICES.find((item) => String(item.id) === id);
  if (!notice) return { title: '공지사항' };
  const description = notice.body.slice(0, 140).replace(/\s+/g, ' ').trim();

  return {
    title: notice.title,
    description,
    authors: [{ name: notice.author }],
    alternates: { canonical: `/notice/${notice.id}` },
    openGraph: {
      title: notice.title,
      description,
      type: 'article',
      publishedTime: notice.date,
      authors: [notice.author],
      section: '공지사항',
    },
    twitter: {
      card: 'summary',
      title: notice.title,
      description,
    },
  };
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notice = NOTICES.find((item) => String(item.id) === id) ?? null;

  return <NoticeDetailClient id={id} initialNotice={notice} />;
}
