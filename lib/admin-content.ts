import type { Story } from '@/content/stories';
import type { Notice } from '@/content/notices';
import { CONTACT } from '@/lib/contact';

export const ADMIN_CONTENT_EVENT = 'daejeoncare-admin-content';

export const STORY_CATEGORIES = [
  '전체',
  `${CONTACT.brand} 이야기`,
  `${CONTACT.brand} 일상`,
  '현장 이야기',
  '공지',
] as const;

export const STORAGE_KEYS = {
  reviews: 'daejeoncare.admin.reviews.v1',
  stories: 'daejeoncare.admin.stories.v1',
  notices: 'daejeoncare.admin.notices.v1',
} as const;

export type AdminKind = keyof typeof STORAGE_KEYS;

export type AdminReview = {
  id: string;
  text: string;
  author: string;
  tag: string;
  rating: number;
  date: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminStory = Omit<Story, 'id'> & {
  id: string;
  source: 'admin';
  createdAt: string;
  updatedAt: string;
};

export type ManagedStory = Story | AdminStory;

export type AdminNotice = Omit<Notice, 'id'> & {
  id: string;
  source: 'admin';
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
};

export type ManagedNotice = Notice | AdminNotice;

export type AdminContentSnapshot = {
  reviews: AdminReview[];
  stories: AdminStory[];
  notices: AdminNotice[];
};

export const EMPTY_ADMIN_CONTENT: AdminContentSnapshot = {
  reviews: [],
  stories: [],
  notices: [],
};

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readRecords<T>(key: string): T[] {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function writeRecords<T extends { id: string }>(key: string, records: T[], notify = true) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(records));
  if (notify) window.dispatchEvent(new CustomEvent(ADMIN_CONTENT_EVENT, { detail: { key } }));
}

export function makeAdminId(prefix: 'review' | 'story' | 'notice') {
  const random =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${prefix}-${Date.now()}-${random}`;
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function readAdminReviews() {
  return readRecords<AdminReview>(STORAGE_KEYS.reviews);
}

export function readAdminStories() {
  return readRecords<AdminStory>(STORAGE_KEYS.stories);
}

export function readAdminNotices() {
  return readRecords<AdminNotice>(STORAGE_KEYS.notices);
}

export function readLocalAdminContent(): AdminContentSnapshot {
  return {
    reviews: readAdminReviews(),
    stories: readAdminStories(),
    notices: readAdminNotices(),
  };
}

export function upsertAdminReview(review: AdminReview) {
  const current = readAdminReviews();
  writeRecords(STORAGE_KEYS.reviews, [review, ...current.filter((item) => item.id !== review.id)]);
}

export function upsertAdminStory(story: AdminStory) {
  const current = readAdminStories();
  writeRecords(STORAGE_KEYS.stories, [story, ...current.filter((item) => item.id !== story.id)]);
}

export function upsertAdminNotice(notice: AdminNotice) {
  const current = readAdminNotices();
  writeRecords(STORAGE_KEYS.notices, [notice, ...current.filter((item) => item.id !== notice.id)]);
}

export function deleteAdminRecord(kind: keyof typeof STORAGE_KEYS, id: string) {
  const current = readRecords<{ id: string }>(STORAGE_KEYS[kind]);
  writeRecords(
    STORAGE_KEYS[kind],
    current.filter((item) => item.id !== id),
  );
}

function writeSnapshot(snapshot: AdminContentSnapshot) {
  writeRecords(STORAGE_KEYS.reviews, snapshot.reviews, false);
  writeRecords(STORAGE_KEYS.stories, snapshot.stories, false);
  writeRecords(STORAGE_KEYS.notices, snapshot.notices, false);
}

export async function fetchAdminContent(): Promise<AdminContentSnapshot> {
  try {
    const response = await fetch('/api/admin-content', { cache: 'no-store' });
    if (!response.ok) throw new Error(`Admin content API ${response.status}`);
    const snapshot = (await response.json()) as AdminContentSnapshot;
    writeSnapshot(snapshot);
    return snapshot;
  } catch {
    return readLocalAdminContent();
  }
}

async function postAdminRecord<T extends { id: string }>(kind: AdminKind, record: T, adminToken?: string) {
  const response = await fetch('/api/admin-content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(adminToken ? { 'x-admin-token': adminToken } : {}),
    },
    body: JSON.stringify({ kind, record }),
  });
  if (response.status === 401) throw new Error('UNAUTHORIZED_ADMIN');
  if (!response.ok) throw new Error(`Admin content save failed: ${response.status}`);
  return (await response.json()) as AdminContentSnapshot;
}

export async function saveAdminReview(review: AdminReview, adminToken?: string) {
  try {
    const snapshot = await postAdminRecord('reviews', review, adminToken);
    writeSnapshot(snapshot);
    return snapshot;
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED_ADMIN') throw error;
    upsertAdminReview(review);
    return readLocalAdminContent();
  }
}

export async function saveAdminStory(story: AdminStory, adminToken?: string) {
  try {
    const snapshot = await postAdminRecord('stories', story, adminToken);
    writeSnapshot(snapshot);
    return snapshot;
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED_ADMIN') throw error;
    upsertAdminStory(story);
    return readLocalAdminContent();
  }
}

export async function saveAdminNotice(notice: AdminNotice, adminToken?: string) {
  try {
    const snapshot = await postAdminRecord('notices', notice, adminToken);
    writeSnapshot(snapshot);
    return snapshot;
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED_ADMIN') throw error;
    upsertAdminNotice(notice);
    return readLocalAdminContent();
  }
}

export async function removeAdminRecord(kind: AdminKind, id: string, adminToken?: string) {
  try {
    const response = await fetch('/api/admin-content', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(adminToken ? { 'x-admin-token': adminToken } : {}),
      },
      body: JSON.stringify({ kind, id }),
    });
    if (response.status === 401) throw new Error('UNAUTHORIZED_ADMIN');
    if (!response.ok) throw new Error(`Admin content delete failed: ${response.status}`);
    const snapshot = (await response.json()) as AdminContentSnapshot;
    writeSnapshot(snapshot);
    return snapshot;
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED_ADMIN') throw error;
    deleteAdminRecord(kind, id);
    return readLocalAdminContent();
  }
}

export function sortByDateDesc<T extends { date: string; id: string | number }>(items: T[]) {
  return [...items].sort((a, b) => {
    const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateDiff !== 0) return dateDiff;
    return String(b.id).localeCompare(String(a.id), 'ko');
  });
}

export function getStoryUrl(story: ManagedStory) {
  return `/story/${String(story.id)}`;
}

export function getNoticeUrl(notice: ManagedNotice) {
  return `/notice/${String(notice.id)}`;
}
