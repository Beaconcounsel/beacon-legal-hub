ALTER TABLE public.bookings ALTER COLUMN status SET DEFAULT 'pending';

CREATE OR REPLACE FUNCTION public.get_booked_slots(_from timestamp with time zone, _to timestamp with time zone)
 RETURNS TABLE(slot_start timestamp with time zone, slot_end timestamp with time zone)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT slot_start, slot_end
  FROM public.bookings
  WHERE status IN ('confirmed', 'pending')
    AND slot_start >= _from
    AND slot_start < _to
$function$;