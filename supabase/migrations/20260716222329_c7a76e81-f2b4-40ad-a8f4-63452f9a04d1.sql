CREATE TABLE public.google_oauth_states (
  state TEXT PRIMARY KEY,
  user_id UUID NOT NULL,
  origin TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.google_oauth_states TO service_role;
ALTER TABLE public.google_oauth_states ENABLE ROW LEVEL SECURITY;
CREATE POLICY "no direct access" ON public.google_oauth_states FOR ALL USING (false) WITH CHECK (false);
CREATE INDEX google_oauth_states_expires_at_idx ON public.google_oauth_states(expires_at);