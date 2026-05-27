import { supabase } from './supabase';
import type { Bean } from './types';

export async function getAllBeans(): Promise<Bean[]> {
  const { data, error } = await supabase
    .from('beans')
    .select('*')
    .eq('is_active', true)
    .order('name');
  if (error) throw error;
  return data ?? [];
}

export async function getBeanBySlug(slug: string): Promise<Bean | null> {
  const { data, error } = await supabase
    .from('beans')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data;
}
