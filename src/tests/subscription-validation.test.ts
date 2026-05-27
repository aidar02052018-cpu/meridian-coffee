import { describe, it, expect } from 'vitest';
import { validateSubscriptionForm, type SubscriptionFormData } from '@/lib/subscription-validation';

const valid: SubscriptionFormData = {
  tier: 'znakomstvo',
  name: 'Иван Петров',
  phone: '+7 999 123 45 67',
  email: 'ivan@example.com',
  address: 'Москва, улица Ленина, 1',
  notes: '',
};

describe('validateSubscriptionForm', () => {
  it('passes valid input', () => {
    const result = validateSubscriptionForm(valid);
    expect(result.ok).toBe(true);
  });

  it('rejects empty name', () => {
    const result = validateSubscriptionForm({ ...valid, name: '' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.name).toBeDefined();
  });

  it('rejects malformed email', () => {
    const result = validateSubscriptionForm({ ...valid, email: 'not-an-email' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.email).toBeDefined();
  });

  it('rejects short phone', () => {
    const result = validateSubscriptionForm({ ...valid, phone: '123' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.phone).toBeDefined();
  });

  it('rejects empty address', () => {
    const result = validateSubscriptionForm({ ...valid, address: '   ' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.address).toBeDefined();
  });
});
