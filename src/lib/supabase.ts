import 'react-native-url-polyfill/auto';

import { Env } from '@env';
import { createClient } from '@supabase/supabase-js';

import { mmkvStorageConfigSupabase } from '@/core/storage';

const supabaseUrl = Env.SUPABASE_URL;
console.log('🚀 ~ file: supabase.ts:7 ~ supabaseUrl:', supabaseUrl);
const supabaseAnonKey = Env.SUPABASE_KEY;
console.log('🚀 ~ file: supabase.ts:9 ~ supabaseAnonKey:', supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: mmkvStorageConfigSupabase as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
