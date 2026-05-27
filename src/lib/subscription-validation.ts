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
const PHONE_RE = /^[\+]?[0-9\s\-\(\)]{10,18}$/;
const NAME_RE = /^[а-яА-ЯёЁa-zA-Z\s\-]{2,}$/;

export function validateSubscriptionForm(data: SubscriptionFormData): ValidationResult {
  const errors: Partial<Record<keyof SubscriptionFormData, string>> = {};

  const trimmedName = data.name.trim();
  if (!trimmedName) {
    errors.name = 'Введите ваше имя';
  } else if (!NAME_RE.test(trimmedName)) {
    errors.name = 'Имя может содержать только буквы, пробелы и дефисы';
  } else if (trimmedName.length < 2) {
    errors.name = 'Имя слишком короткое';
  }

  if (!data.email.trim()) {
    errors.email = 'Введите email';
  } else if (!EMAIL_RE.test(data.email.trim())) {
    errors.email = 'Неверный формат email (пример: ivan@mail.ru)';
  }

  const digits = data.phone.replace(/\D/g, '');
  if (!data.phone.trim()) {
    errors.phone = 'Введите номер телефона';
  } else if (!PHONE_RE.test(data.phone.trim())) {
    errors.phone = 'Некорректный формат телефона';
  } else if (digits.length < 10 || digits.length > 15) {
    errors.phone = 'Номер должен содержать 10–15 цифр';
  }

  const trimmedAddr = data.address.trim();
  if (!trimmedAddr) {
    errors.address = 'Введите адрес доставки';
  } else if (trimmedAddr.length < 10) {
    errors.address = 'Укажите полный адрес (город, улица, дом, квартира)';
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true };
}
