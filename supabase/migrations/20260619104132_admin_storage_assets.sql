-- Store admin-uploaded review/story images as files instead of large data URLs.
-- Public bucket: visitors can load published images quickly through the CDN.
-- Mutations remain protected by the same x-admin-secret hash used by admin_content.

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'daejeon-care-admin',
  'daejeon-care-admin',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id)
do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "admin uploads daejeon care storage assets" on storage.objects;
create policy "admin uploads daejeon care storage assets"
  on storage.objects
  for insert
  to anon, authenticated
  with check (
    bucket_id = 'daejeon-care-admin'
    and daejeon_care_private.admin_content_secret_is_valid()
    and (storage.foldername(name))[1] in ('reviews', 'stories', 'notices')
    and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp', 'gif')
  );

drop policy if exists "admin updates daejeon care storage assets" on storage.objects;
create policy "admin updates daejeon care storage assets"
  on storage.objects
  for update
  to anon, authenticated
  using (
    bucket_id = 'daejeon-care-admin'
    and daejeon_care_private.admin_content_secret_is_valid()
  )
  with check (
    bucket_id = 'daejeon-care-admin'
    and daejeon_care_private.admin_content_secret_is_valid()
    and (storage.foldername(name))[1] in ('reviews', 'stories', 'notices')
    and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp', 'gif')
  );

drop policy if exists "admin deletes daejeon care storage assets" on storage.objects;
create policy "admin deletes daejeon care storage assets"
  on storage.objects
  for delete
  to anon, authenticated
  using (
    bucket_id = 'daejeon-care-admin'
    and daejeon_care_private.admin_content_secret_is_valid()
  );
