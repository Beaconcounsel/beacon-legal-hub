-- Delete the broken user that was created via direct SQL insert.
-- It will be recreated through the admin API, which ensures all internal GoTrue records are correct.
DELETE FROM auth.users WHERE email = 'mutidan@beaconattorneys.rw';
DELETE FROM public.user_roles WHERE user_id = 'ed74de15-f83c-42db-9078-1a902c9bd6f0';
DELETE FROM public.profiles WHERE id = 'ed74de15-f83c-42db-9078-1a902c9bd6f0';