import { describe, it, expect, vi, afterEach } from 'vitest';
import { POST } from '@/app/api/subscription/route';

const valid = {
  tier: 'znakomstvo',
  name: 'Иван Петров',
  phone: '+7 999 123 45 67',
  email: 'ivan@example.com',
  address: 'Москва, улица Ленина, дом 1, кв 5',
  notes: '',
};

const post = (body: unknown) =>
  POST(new Request('http://localhost/api/subscription', { method: 'POST', body: JSON.stringify(body) }));

afterEach(() => vi.restoreAllMocks());

describe('заявка на подписку в демо-режиме', () => {
  it('принимает правильную заявку и никуда её не отправляет', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const res = await post(valid);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, demo: true });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('возвращает ошибки полей для неправильной заявки', async () => {
    const res = await post({ ...valid, name: '' });
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.ok).toBe(false);
    expect(data.errors.name).toBeDefined();
  });
});
