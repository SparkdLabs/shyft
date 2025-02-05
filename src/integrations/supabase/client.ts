import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kwuwljwdflwmuccsvxoc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3dXdsandkZmx3bXVjY3N2eG9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyNjE4NTQsImV4cCI6MjA1MTgzNzg1NH0.BGKtCAAia4G83BuIoNFOFLb7TaDrUQn-RGlsPwerCo8";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    }
  }
});