import { supabase } from '@/lib/supabase';

import type { Post } from './types';

type Response = Post[];
type Variables = void; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

export const fetchPosts = async () => {
  const { data, error } = await supabase.from('news').select('*');

  if (error) {
    throw error;
  }

  return data as Response;
};

export const fetchPost = async(id: number) => {
  const { data, error } = await supabase.from('news').select('*').eq('id', id);

  if (error) {
    throw error;
  }

  return data ? (data[0]) as Post : null;
};
