import { describe, it, expect } from 'vitest';
import { getAllBeans, getBeanBySlug } from '@/lib/beans';

describe('каталог зёрен без базы данных', () => {
  it('отдаёт все 30 активных зёрен, отсортированных по названию', async () => {
    const beans = await getAllBeans();
    expect(beans).toHaveLength(30);
    expect(beans.every((b) => b.is_active)).toBe(true);
    const names = beans.map((b) => b.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  it('находит зерно по адресу страницы', async () => {
    const bean = await getBeanBySlug('chanchamayo-peru');
    expect(bean?.name).toBe('Чанчамайо');
    expect(bean?.country).toBe('Перу');
  });

  it('возвращает null для несуществующего зерна', async () => {
    expect(await getBeanBySlug('net-takogo-zerna')).toBeNull();
  });

  it('у каждого зерна уникальный адрес страницы и картинка', async () => {
    const beans = await getAllBeans();
    expect(new Set(beans.map((b) => b.slug)).size).toBe(30);
    expect(beans.every((b) => b.image_url?.startsWith('https://images.unsplash.com/'))).toBe(true);
  });
});
