// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vjrqwphptiosmxutulni.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqcnF3cGhwdGlvc214dXR1bG5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0NzE1ODQsImV4cCI6MjA2ODA0NzU4NH0.I2XzoF-pNuaizmvi8h2scGVoFbfyiqlgrS3gO9IOQcE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});