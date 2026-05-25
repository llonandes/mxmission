import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-side Supabase client using the service role key.
// Returns null when env vars are missing so the app still runs in dev
// (registrations are logged instead of persisted).
export function getServiceClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
