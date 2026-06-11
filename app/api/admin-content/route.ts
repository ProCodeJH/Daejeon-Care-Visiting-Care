import { NextRequest, NextResponse } from 'next/server';
import {
  STORAGE_KEYS,
  STORY_CATEGORIES,
  type AdminKind,
  type AdminNotice,
  type AdminReview,
  type AdminStory,
} from '@/lib/admin-content';
import {
  deleteAdminContentRecord,
  readAdminContentStore,
  upsertAdminContentRecord,
} from '@/lib/admin-content-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isAdminKind(value: unknown): value is AdminKind {
  return typeof value === 'string' && value in STORAGE_KEYS;
}

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function verifyAdmin(request: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return process.env.NODE_ENV !== 'production';
  return request.headers.get('x-admin-token') === password;
}

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized admin request' }, { status: 401 });
}

function stringValue(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

function optionalImage(value: unknown) {
  if (typeof value !== 'string') return undefined;
  if (value.length > 3_500_000) return undefined;
  if (value.startsWith('data:image/') || value.startsWith('/') || value.startsWith('https://')) {
    return value;
  }
  return undefined;
}

function safeDate(value: unknown, fallback = new Date().toISOString().slice(0, 10)) {
  const text = stringValue(value, 32);
  return text || fallback;
}

function safeTimestamp(value: unknown) {
  const text = stringValue(value, 64);
  return text || new Date().toISOString();
}

function validateAdminRecord(kind: AdminKind, record: unknown) {
  if (!record || typeof record !== 'object') {
    return { ok: false as const, message: 'Invalid record' };
  }

  const source = record as Record<string, unknown>;
  const id = stringValue(source.id, 160);
  if (!id) return { ok: false as const, message: 'Invalid record id' };

  if (kind === 'reviews') {
    const text = stringValue(source.text, 1200);
    const author = stringValue(source.author, 80);
    const tag = stringValue(source.tag, 40);
    const rating = Math.max(1, Math.min(5, Number(source.rating) || 5));
    if (!text || !author || !tag) return { ok: false as const, message: 'Review fields are required' };

    const normalized: AdminReview = {
      id,
      text,
      author,
      tag,
      rating,
      date: safeDate(source.date),
      image: optionalImage(source.image),
      createdAt: safeTimestamp(source.createdAt),
      updatedAt: new Date().toISOString(),
    };
    return { ok: true as const, record: normalized };
  }

  if (kind === 'stories') {
    const title = stringValue(source.title, 120);
    const excerpt = stringValue(source.excerpt, 240);
    const body = stringValue(source.body, 8000);
    const cat = STORY_CATEGORIES.includes(source.cat as never)
      ? (source.cat as AdminStory['cat'])
      : STORY_CATEGORIES[1];
    if (!title || !excerpt || !body) return { ok: false as const, message: 'Story fields are required' };

    const normalized: AdminStory = {
      id,
      source: 'admin',
      title,
      excerpt,
      body,
      cat,
      date: safeDate(source.date),
      isNotice: cat === '공지',
      thumbnail: optionalImage(source.thumbnail),
      createdAt: safeTimestamp(source.createdAt),
      updatedAt: new Date().toISOString(),
    };
    return { ok: true as const, record: normalized };
  }

  const title = stringValue(source.title, 120);
  const body = stringValue(source.body, 8000);
  const author = stringValue(source.author, 80) || '센터장';
  if (!title || !body) return { ok: false as const, message: 'Notice fields are required' };

  const normalized: AdminNotice = {
    id,
    source: 'admin',
    title,
    body,
    author,
    date: safeDate(source.date),
    views: Number.isFinite(Number(source.views)) ? Number(source.views) : 0,
    pinned: Boolean(source.pinned),
    thumbnail: optionalImage(source.thumbnail),
    createdAt: safeTimestamp(source.createdAt),
    updatedAt: new Date().toISOString(),
  };
  return { ok: true as const, record: normalized };
}

export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get('admin') === 'check') {
    if (!verifyAdmin(request)) return unauthorized();
    return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  }

  const snapshot = await readAdminContentStore();
  return NextResponse.json(snapshot, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) return unauthorized();

  const body = (await request.json().catch(() => null)) as {
    kind?: unknown;
    record?: { id?: unknown };
  } | null;

  if (!body || !isAdminKind(body.kind)) return badRequest('Invalid content kind');
  const validated = validateAdminRecord(body.kind, body.record);
  if (!validated.ok) return badRequest(validated.message);

  const snapshot = await upsertAdminContentRecord(body.kind, validated.record);
  return NextResponse.json(snapshot, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

export async function DELETE(request: NextRequest) {
  if (!verifyAdmin(request)) return unauthorized();

  const body = (await request.json().catch(() => null)) as {
    kind?: unknown;
    id?: unknown;
  } | null;

  if (!body || !isAdminKind(body.kind)) return badRequest('Invalid content kind');
  if (typeof body.id !== 'string') return badRequest('Invalid record id');

  const snapshot = await deleteAdminContentRecord(body.kind, body.id);
  return NextResponse.json(snapshot, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
