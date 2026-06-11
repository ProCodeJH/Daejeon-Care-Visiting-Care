import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  EMPTY_ADMIN_CONTENT,
  type AdminContentSnapshot,
  type AdminKind,
  type AdminNotice,
  type AdminReview,
  type AdminStory,
} from '@/lib/admin-content';

type AdminRecord = {
  kind: AdminKind;
  id: string;
  payload: AdminReview | AdminStory | AdminNotice;
};

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'admin-content.json');

function cloneEmpty(): AdminContentSnapshot {
  return {
    reviews: [],
    stories: [],
    notices: [],
  };
}

function normalizeSnapshot(value: unknown): AdminContentSnapshot {
  const source = value && typeof value === 'object' ? (value as Partial<AdminContentSnapshot>) : EMPTY_ADMIN_CONTENT;
  return {
    reviews: Array.isArray(source.reviews) ? source.reviews : [],
    stories: Array.isArray(source.stories) ? source.stories : [],
    notices: Array.isArray(source.notices) ? source.notices : [],
  };
}

type SupabaseConfig =
  | {
      mode: 'service';
      url: string;
      key: string;
    }
  | {
      mode: 'admin-header';
      url: string;
      key: string;
      adminSecret: string | undefined;
    };

function supabaseConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const cleanUrl = url?.replace(/\/$/, '');
  if (!cleanUrl) return null;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceKey) {
    return { mode: 'service', url: cleanUrl, key: serviceKey };
  }

  const publicKey =
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!publicKey) return null;

  return {
    mode: 'admin-header',
    url: cleanUrl,
    key: publicKey,
    adminSecret: process.env.SUPABASE_ADMIN_CONTENT_SECRET || process.env.ADMIN_PASSWORD,
  };
}

function supabaseHeaders(key: string, adminSecret?: string) {
  const headers: Record<string, string> = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  };
  if (adminSecret) headers['x-admin-secret'] = adminSecret;
  return headers;
}

function snapshotFromRows(rows: AdminRecord[]): AdminContentSnapshot {
  const snapshot = cloneEmpty();
  for (const row of rows) {
    if (row.kind === 'reviews') snapshot.reviews.push(row.payload as AdminReview);
    if (row.kind === 'stories') snapshot.stories.push(row.payload as AdminStory);
    if (row.kind === 'notices') snapshot.notices.push(row.payload as AdminNotice);
  }
  return snapshot;
}

async function readFromSupabase(config: SupabaseConfig) {
  const response = await fetch(
    `${config.url}/rest/v1/admin_content?select=kind,id,payload&order=updated_at.desc`,
    {
      headers: supabaseHeaders(config.key),
      cache: 'no-store',
    },
  );
  if (!response.ok) throw new Error(`Supabase read failed: ${response.status}`);
  const rows = (await response.json()) as AdminRecord[];
  return snapshotFromRows(rows);
}

async function upsertToSupabase(config: SupabaseConfig, kind: AdminKind, record: AdminReview | AdminStory | AdminNotice) {
  if (config.mode === 'admin-header' && !config.adminSecret) {
    throw new Error('Supabase admin content secret is not configured');
  }

  const response = await fetch(
    `${config.url}/rest/v1/admin_content?on_conflict=kind,id`,
    {
      method: 'POST',
      headers: {
        ...supabaseHeaders(
          config.key,
          config.mode === 'admin-header' ? config.adminSecret : undefined,
        ),
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify({
        kind,
        id: record.id,
        payload: record,
        updated_at: new Date().toISOString(),
      }),
    },
  );
  if (!response.ok) throw new Error(`Supabase write failed: ${response.status}`);
}

async function deleteFromSupabase(config: SupabaseConfig, kind: AdminKind, id: string) {
  if (config.mode === 'admin-header' && !config.adminSecret) {
    throw new Error('Supabase admin content secret is not configured');
  }

  const response = await fetch(
    `${config.url}/rest/v1/admin_content?kind=eq.${encodeURIComponent(kind)}&id=eq.${encodeURIComponent(id)}`,
    {
      method: 'DELETE',
      headers: {
        ...supabaseHeaders(
          config.key,
          config.mode === 'admin-header' ? config.adminSecret : undefined,
        ),
        Prefer: 'return=minimal',
      },
    },
  );
  if (!response.ok) throw new Error(`Supabase delete failed: ${response.status}`);
}

async function readFromFile() {
  try {
    const raw = await readFile(DATA_FILE, 'utf8');
    return normalizeSnapshot(JSON.parse(raw));
  } catch {
    return cloneEmpty();
  }
}

async function writeToFile(snapshot: AdminContentSnapshot) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(snapshot, null, 2), 'utf8');
}

export async function readAdminContentStore() {
  const config = supabaseConfig();
  if (config) {
    try {
      return await readFromSupabase(config);
    } catch {
      return await readFromFile();
    }
  }
  return await readFromFile();
}

export async function upsertAdminContentRecord(
  kind: AdminKind,
  record: AdminReview | AdminStory | AdminNotice,
) {
  const current = await readAdminContentStore();
  const next = {
    ...current,
    [kind]: [record, ...current[kind].filter((item) => item.id !== record.id)],
  } as AdminContentSnapshot;

  const config = supabaseConfig();
  if (config) {
    try {
      await upsertToSupabase(config, kind, record);
      return await readFromSupabase(config);
    } catch {
      await writeToFile(next);
      return next;
    }
  }

  await writeToFile(next);
  return next;
}

export async function deleteAdminContentRecord(kind: AdminKind, id: string) {
  const current = await readAdminContentStore();
  const next = {
    ...current,
    [kind]: current[kind].filter((item) => item.id !== id),
  } as AdminContentSnapshot;

  const config = supabaseConfig();
  if (config) {
    try {
      await deleteFromSupabase(config, kind, id);
      return await readFromSupabase(config);
    } catch {
      await writeToFile(next);
      return next;
    }
  }

  await writeToFile(next);
  return next;
}
