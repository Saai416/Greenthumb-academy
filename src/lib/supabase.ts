import { createClient } from '@supabase/supabase-js';

// Try both import.meta.env (standard Vite) and process.env (vite-plugin-environment)
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_URL : undefined);

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_ANON_KEY : undefined);

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'undefined') {
  console.warn('Supabase credentials missing. DB features will not work.');
}

const validUrl = supabaseUrl && supabaseUrl !== 'undefined'
  ? supabaseUrl
  : 'https://placeholder.supabase.co';

const validKey = supabaseAnonKey && supabaseAnonKey !== 'undefined'
  ? supabaseAnonKey
  : 'placeholder';

export const supabase = createClient(validUrl, validKey);
