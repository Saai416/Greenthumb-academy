import { createClient } from '@supabase/supabase-js';

// Supabase project credentials
// The anon key is safe to expose in client-side code (it has row-level security)
const SUPABASE_URL = 'https://reqvllhplxqowngnhrac.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlcXZsbGhwbHhxb3duZ25ocmFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTg2NjcsImV4cCI6MjA5Mjg5NDY2N30.3AE9ZI_6KNOAIztZ9d9lpbqwvy7pqtPmhEP8ShmWO6o';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
