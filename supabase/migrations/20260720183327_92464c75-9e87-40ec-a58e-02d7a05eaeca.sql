CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));

  -- Auto-grant admin role to Daniel's email addresses
  IF NEW.email IN ('mutidan@gmail.com', 'mutidan@beaconattorneys.rw') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  END IF;

  RETURN NEW;
END;
$$;

-- Create the new admin account if it doesn't exist
DO $$
DECLARE
  new_user_id UUID;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'mutidan@beaconattorneys.rw') THEN
    new_user_id := gen_random_uuid();

    INSERT INTO auth.users (
      id,
      instance_id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at
    ) VALUES (
      new_user_id,
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

    -- Ensure profile and admin role exist (in case the trigger didn't fire or is bypassed)
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (new_user_id, 'mutidan@beaconattorneys.rw', 'mutidan@beaconattorneys.rw')
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.user_roles (user_id, role)
    VALUES (new_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END $$;