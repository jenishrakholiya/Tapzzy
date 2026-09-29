import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CREDENTIALS } from '../config/credentials';

export const supabase = createClient(
  SUPABASE_CREDENTIALS.url,
  SUPABASE_CREDENTIALS.anonKey
);
