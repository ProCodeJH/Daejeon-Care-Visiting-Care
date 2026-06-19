-- Supabase Storage delete requires the caller to be able to select the object row.
-- Keep admin visibility scoped to the folders and image extensions used by the site.

drop policy if exists "admin reads daejeon care storage assets" on storage.objects;
create policy "admin reads daejeon care storage assets"
  on storage.objects
  for select
  to anon, authenticated
  using (
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
    and (storage.foldername(name))[1] in ('reviews', 'stories', 'notices')
    and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp', 'gif')
  );
