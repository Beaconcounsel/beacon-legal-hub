-- The user was recreated via the Supabase admin API; create the matching public profile and admin role.
DO $$
DECLARE
  target_user_id UUID;
BEGIN
  SELECT id INTO target_user_id FROM auth.users WHERE email = 'mutidan@beaconattorneys.rw' LIMIT 1;
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'mutidan@beaconattorneys.rw user not found';
  END IF;

  INSERT INTO public.profiles (id, email, full_name)
  VALUES (target_user_id, 'mutidan@beaconattorneys.rw', 'Daniel Mutiganda')
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (target_user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
END $$;