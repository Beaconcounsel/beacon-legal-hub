
-- Fix view to use security_invoker (respects caller's RLS, not creator's)
DROP VIEW IF EXISTS public.booked_slots;
CREATE VIEW public.booked_slots
  WITH (security_invoker = true)
AS
SELECT slot_start, slot_end
FROM public.bookings
WHERE status = 'confirmed';

-- Allow public read of confirmed booking time-slots only (no PII columns)
CREATE POLICY "Public reads confirmed slot times"
  ON public.bookings FOR SELECT
  TO anon, authenticated
  USING (status = 'confirmed');

-- Wait — that exposes all columns. Better: keep RLS strict on bookings, and grant the view directly.
DROP POLICY "Public reads confirmed slot times" ON public.bookings;

-- Drop & recreate view as security_definer-equivalent via a function call instead.
-- Simplest: use a SECURITY DEFINER function that returns only slot times.
DROP VIEW IF EXISTS public.booked_slots;

CREATE OR REPLACE FUNCTION public.get_booked_slots(
  _from TIMESTAMPTZ,
  _to TIMESTAMPTZ
)
RETURNS TABLE (slot_start TIMESTAMPTZ, slot_end TIMESTAMPTZ)
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT slot_start, slot_end
  FROM public.bookings
  WHERE status = 'confirmed'
    AND slot_start >= _from
    AND slot_start < _to
$$;

-- Restrict execute: revoke from public, grant to anon + authenticated only
REVOKE EXECUTE ON FUNCTION public.get_booked_slots(TIMESTAMPTZ, TIMESTAMPTZ) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_booked_slots(TIMESTAMPTZ, TIMESTAMPTZ) TO anon, authenticated;

-- Lock down handle_new_user (trigger-only, should never be called directly)
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- has_role must stay callable for RLS expressions to work (RLS evaluates as the calling role)
-- It's already SECURITY DEFINER which is required to bypass RLS on user_roles itself.
-- The linter warning is acceptable here — it's the documented pattern.
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, app_role) TO authenticated;
