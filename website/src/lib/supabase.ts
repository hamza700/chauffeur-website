import type { SupabaseClient } from '@supabase/supabase-js';

import { createClient } from '@supabase/supabase-js';

import { CONFIG } from '../config-global';

// ----------------------------------------------------------------------

const isSupabase = CONFIG.auth.method === 'supabase';

const supabaseUrl = CONFIG.supabase.url;
const supabaseKey = CONFIG.supabase.key;

export const supabase = isSupabase
  ? createClient(supabaseUrl, supabaseKey)
  : ({} as SupabaseClient<any, 'public', any>);
