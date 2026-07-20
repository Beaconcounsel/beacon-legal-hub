-- Ensure the mutidan@beaconattorneys.rw admin account has a valid auth identity record.
DO $$
DECLARE
  target_user_id UUID;
BEGIN
  SELECT id INTO target_user_id FROM auth.users WHERE email = 'mutidan@beaconattorneys.rw' LIMIT 1;

  IF target_user_id IS NULL THEN
    target_user_id := gen_random_uuid();

    INSERT INTO auth.users (
      id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
      raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
      target_user_id,
      '00000000-0000-0000-0000-000000000000',
      'authenticated',
      'authenticated',
      'mutidan@beaconattorneys.rw',
      crypt('beacon2026', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      jsonb_build_object('email', 'mutidan@beaconattorneys.rw', 'email_verified', true, 'phone_verified', false),
      now(),
      now()
    );

    INSERT INTO auth.identities (
      id, user_id, identity_data, provider, provider_id, created_at, updated_at, last_sign_in_at
    ) VALUES (
      gen_random_uuid(),
      target_user_id,
      jsonb_build_object('sub', target_user_id, 'email', 'mutidan@beaconattorneys.rw', 'email_verified', true, 'phone_verified', false),
      'email',
      target_user_id,
      now(),
      now(),
      now()
    );
  ELSE
    IF NOT EXISTS (SELECT 1 FROM auth.identities WHERE user_id = target_user_id AND provider = 'email') THEN
      INSERT INTO auth.identities (
        id, user_id, identity_data, provider, provider_id, created_at, updated_at, last_sign_in_at
      ) VALUES (
        gen_random_uuid(),
        target_user_id,
        jsonb_build_object('sub', target_user_id, 'email', 'mutidan@beaconattorneys.rw', 'email_verified', true, 'phone_verified', false),
        'email',
        target_user_id,
        now(),
        now(),
        now()
      );
    END IF;
  END IF;

  INSERT INTO public.profiles (id, email, full_name)
  VALUES (target_user_id, 'mutidan@beaconattorneys.rw', 'mutidan@beaconattorneys.rw')
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (target_user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
END $$;