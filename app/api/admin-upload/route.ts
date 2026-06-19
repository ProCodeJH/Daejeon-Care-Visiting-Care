import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BUCKET = 'daejeon-care-admin';
const MAX_IMAGE_SIZE = 5_000_000;
const ALLOWED_KINDS = new Set(['reviews', 'stories', 'notices']);
const ALLOWED_TYPES = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/gif', 'gif'],
]);

function verifyAdmin(request: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return process.env.NODE_ENV !== 'production';
  return request.headers.get('x-admin-token') === password;
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function supabaseConfig() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, '');
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;
  return {
    url,
    key,
    adminSecret: process.env.SUPABASE_ADMIN_CONTENT_SECRET || process.env.ADMIN_PASSWORD,
  };
}

function encodePath(path: string) {
  return path.split('/').map(encodeURIComponent).join('/');
}

export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) return jsonError('Unauthorized admin request', 401);

  const config = supabaseConfig();
  if (!config) return jsonError('Supabase storage is not configured', 501);

  const formData = await request.formData().catch(() => null);
  const file = formData?.get('file');
  const kind = String(formData?.get('kind') || '');

  if (!ALLOWED_KINDS.has(kind)) return jsonError('Invalid upload kind', 400);
  if (!(file instanceof File)) return jsonError('Image file is required', 400);
  if (file.size <= 0 || file.size > MAX_IMAGE_SIZE) return jsonError('Image file must be 5MB or smaller', 400);

  const extension = ALLOWED_TYPES.get(file.type);
  if (!extension) return jsonError('Unsupported image type', 400);

  const objectPath = `${kind}/${Date.now()}-${randomUUID()}.${extension}`;
  const uploadUrl = `${config.url}/storage/v1/object/${BUCKET}/${encodePath(objectPath)}`;
  const response = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      'Content-Type': file.type,
      'Cache-Control': '31536000',
      ...(config.adminSecret ? { 'x-admin-secret': config.adminSecret } : {}),
    },
    body: Buffer.from(await file.arrayBuffer()),
    cache: 'no-store',
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    return jsonError(`Supabase storage upload failed: ${response.status}${detail ? ` ${detail}` : ''}`, 502);
  }

  return NextResponse.json(
    {
      bucket: BUCKET,
      path: objectPath,
      url: `${config.url}/storage/v1/object/public/${BUCKET}/${encodePath(objectPath)}`,
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
