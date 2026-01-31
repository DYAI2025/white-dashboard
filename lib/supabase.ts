import { createClient } from '@supabase/supabase-js';

// Provided credentials
const SUPABASE_URL = 'https://houcjugyrjjdehxcasxg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvdWNqdWd5cmpqZGVoeGNhc3hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNzExNzgsImV4cCI6MjA3Nzc0NzE3OH0.JDOeRZdb7YPOzrLp6jPm5lu2sGBncgXdp7ReSKZX5P4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);