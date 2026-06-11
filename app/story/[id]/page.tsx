import type { Metadata } from 'next';
import { STORIES } from '@/content/stories';
import { CONTACT } from '@/lib/contact';
import { StoryDetailClient } from './StoryDetailClient';

export function generateStaticParams() {
  return STORIES.map((story) => ({ id: String(story.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const story = STORIES.find((item) => String(item.id) === id);
  if (!story) return { title: `${CONTACT.brand} 이야기` };

  return {
    title: story.title,
    description: story.excerpt,
    alternates: { canonical: `/story/${story.id}` },
    openGraph: {
      title: story.title,
      description: story.excerpt,
      type: 'article',
      publishedTime: story.date,
      section: story.cat,
      tags: [story.cat],
      ...(story.thumbnail && { images: [{ url: story.thumbnail, alt: story.title }] }),
    },
    twitter: {
      card: story.thumbnail ? 'summary_large_image' : 'summary',
      title: story.title,
      description: story.excerpt,
      ...(story.thumbnail && { images: [story.thumbnail] }),
    },
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = STORIES.find((item) => String(item.id) === id) ?? null;

  return <StoryDetailClient id={id} initialStory={story} />;
}
