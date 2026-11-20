import { BEANS } from '@/data/beans';
import type { Bean } from './types';

// Данные лежат в самом сайте (src/data/beans.ts), поэтому функции работают без сети.
// Сигнатуры остались асинхронными, чтобы страницы не пришлось переписывать.

export async function getAllBeans(): Promise<Bean[]> {
  return BEANS.filter((b) => b.is_active).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getBeanBySlug(slug: string): Promise<Bean | null> {
  return BEANS.find((b) => b.slug === slug && b.is_active) ?? null;
}
