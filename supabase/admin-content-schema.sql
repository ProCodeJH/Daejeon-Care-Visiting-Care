-- Daejeon Care admin content storage.
-- Replace CHANGE_ME_ADMIN_CONTENT_SECRET_SHA256 before running this SQL.
-- The value must be SHA-256 hex of the same value used for Vercel
-- ADMIN_PASSWORD, or for Vercel SUPABASE_ADMIN_CONTENT_SECRET.

create extension if not exists pgcrypto with schema extensions;

create schema if not exists daejeon_care_private;
revoke all on schema daejeon_care_private from public;
revoke all on schema daejeon_care_private from anon;
revoke all on schema daejeon_care_private from authenticated;
grant usage on schema daejeon_care_private to anon, authenticated;

create table if not exists public.admin_content (
  kind text not null check (kind in ('reviews', 'stories', 'notices')),
  id text not null,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (kind, id)
);

create index if not exists admin_content_kind_updated_idx
  on public.admin_content (kind, updated_at desc);

create table if not exists daejeon_care_private.settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

do $$
declare
  admin_content_secret_sha256 text := 'CHANGE_ME_ADMIN_CONTENT_SECRET_SHA256';
begin
  if admin_content_secret_sha256 = 'CHANGE_ME_ADMIN_CONTENT_SECRET_SHA256' then
    raise exception 'Replace CHANGE_ME_ADMIN_CONTENT_SECRET_SHA256 before running admin-content-schema.sql';
  end if;

  if admin_content_secret_sha256 !~ '^[0-9a-f]{64}$' then
    raise exception 'Admin content secret hash must be a 64-character lowercase SHA-256 hex string';
  end if;

  insert into daejeon_care_private.settings (key, value, updated_at)
  values (
    'admin_content_secret_sha256',
    admin_content_secret_sha256,
    now()
  )
  on conflict (key)
  do update set value = excluded.value, updated_at = now();
end $$;

create or replace function daejeon_care_private.admin_content_secret_is_valid()
returns boolean
language sql
stable
security definer
set search_path = daejeon_care_private, extensions
as $$
  select exists (
    select 1
    from daejeon_care_private.settings
    where key = 'admin_content_secret_sha256'
      and value = encode(
        extensions.digest(
          coalesce(current_setting('request.headers', true)::json->>'x-admin-secret', ''),
          'sha256'
        ),
        'hex'
      )
  );
$$;

revoke all on function daejeon_care_private.admin_content_secret_is_valid() from public;
grant execute on function daejeon_care_private.admin_content_secret_is_valid() to anon, authenticated;

alter table public.admin_content enable row level security;

grant select, insert, update, delete on table public.admin_content to service_role;
grant select, insert, update, delete on table public.admin_content to anon, authenticated;

drop policy if exists "public reads daejeon care admin content" on public.admin_content;
create policy "public reads daejeon care admin content"
  on public.admin_content
  for select
  to anon, authenticated
  using (true);

drop policy if exists "admin header inserts daejeon care admin content" on public.admin_content;
create policy "admin header inserts daejeon care admin content"
  on public.admin_content
  for insert
  to anon, authenticated
  with check (daejeon_care_private.admin_content_secret_is_valid());

drop policy if exists "admin header updates daejeon care admin content" on public.admin_content;
create policy "admin header updates daejeon care admin content"
  on public.admin_content
  for update
  to anon, authenticated
  using (daejeon_care_private.admin_content_secret_is_valid())
  with check (daejeon_care_private.admin_content_secret_is_valid());

drop policy if exists "admin header deletes daejeon care admin content" on public.admin_content;
create policy "admin header deletes daejeon care admin content"
  on public.admin_content
  for delete
  to anon, authenticated
  using (daejeon_care_private.admin_content_secret_is_valid());

drop policy if exists "service role manages daejeon care admin content" on public.admin_content;
create policy "service role manages daejeon care admin content"
  on public.admin_content
  for all
  to service_role
  using (true)
  with check (true);
