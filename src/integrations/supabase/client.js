
import { createClient } from '@supabase/supabase-js';

// Your Supabase URL and anon key
const supabaseUrl = "https://kimtfyvvmrjadnvbsjow.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpbXRmeXZ2bXJqYWRudmJzam93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NTIxMjcsImV4cCI6MjA1OTQyODEyN30.gzqRKGcP3oWPmX7s2oPoO9dnd0C1mjDY3PLEjWeyJ5Q";

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
