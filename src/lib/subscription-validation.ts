export interface SubscriptionFormData {
  tier: 'znakomstvo' | 'postoyanstvo' | 'otkryvatel';
  bean_id?: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

export type ValidationResult =
  | { ok: true }
  | { ok: false; errors: Partial<Record<keyof SubscriptionFormData, string>> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSubscriptionForm(data: SubscriptionFormData): ValidationResult {
  const errors: Partial<Record<keyof SubscriptionFormData, string>> = {};

  if (!data.name.trim()) errors.name = 'Имя обязательно';
  if (!EMAIL_RE.test(data.email)) errors.email = 'Неверный формат email';
  if (data.phone.replace(/\D/g, '').length < 10) errors.phone = 'Телефон слишком короткий';
  if (!data.address.trim()) errors.address = 'Адрес обязателен';

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true };
}
