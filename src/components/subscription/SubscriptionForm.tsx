'use client';

import { useState, useCallback } from 'react';
import {
  validateSubscriptionForm,
  type SubscriptionFormData,
} from '@/lib/subscription-validation';

interface Props {
  selectedTier: SubscriptionFormData['tier'];
}

type Status = 'idle' | 'submitting' | 'success' | 'error';
type FieldKey = 'name' | 'phone' | 'email' | 'address';

export function SubscriptionForm({ selectedTier }: Props) {
  const [form, setForm] = useState<SubscriptionFormData>({
    tier: selectedTier,
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SubscriptionFormData, string>>>({});
  const [touched, setTouched] = useState<Set<FieldKey>>(new Set());
  const [status, setStatus] = useState<Status>('idle');

  const update = <K extends keyof SubscriptionFormData>(key: K, value: SubscriptionFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (touched.has(key as FieldKey)) {
      const updated = { ...form, [key]: value, tier: selectedTier };
      const result = validateSubscriptionForm(updated);
      if (!result.ok && result.errors[key]) {
        setErrors((prev) => ({ ...prev, [key]: result.errors[key] }));
      } else {
        setErrors((prev) => { const next = { ...prev }; delete next[key]; return next; });
      }
    }
  };

  const handleBlur = useCallback((field: FieldKey) => {
    setTouched((prev) => new Set(prev).add(field));
    const result = validateSubscriptionForm({ ...form, tier: selectedTier });
    if (!result.ok && result.errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: result.errors[field] }));
    } else {
      setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
    }
  }, [form, selectedTier]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(new Set(['name', 'phone', 'email', 'address']));
    const payload = { ...form, tier: selectedTier };
    const validation = validateSubscriptionForm(payload);
    if (!validation.ok) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setStatus('submitting');

    const res = await fetch('/api/subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus('success');
    } else {
      const data = await res.json().catch(() => ({}));
      if (data.errors) setErrors(data.errors);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-night-muted rounded-xl p-10 text-center border border-copper/30">
        <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-3">ЗАЯВКА ПРИНЯТА</p>
        <h3 className="font-serif text-3xl text-copper">Спасибо!</h3>
        <p className="text-parchment/80 mt-4 max-w-md mx-auto">
          Мы получили вашу заявку и свяжемся с вами в течение рабочего дня.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5 bg-night-muted rounded-xl p-8 border border-copper/15">
      <Field label="Как к вам обращаться" error={errors.name}>
        <input
          type="text"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          className={`form-input ${errors.name ? 'form-input-error' : ''}`}
          placeholder="Иван Петров"
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Телефон" error={errors.phone}>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            className={`form-input ${errors.phone ? 'form-input-error' : ''}`}
            placeholder="+7 999 123 45 67"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className={`form-input ${errors.email ? 'form-input-error' : ''}`}
            placeholder="ivan@example.com"
          />
        </Field>
      </div>

      <Field label="Адрес доставки" error={errors.address}>
        <input
          type="text"
          value={form.address}
          onChange={(e) => update('address', e.target.value)}
          onBlur={() => handleBlur('address')}
          className={`form-input ${errors.address ? 'form-input-error' : ''}`}
          placeholder="Москва, улица, дом, квартира"
        />
      </Field>

      <Field label="Заметки (опционально)">
        <textarea
          value={form.notes}
          onChange={(e) => update('notes', e.target.value)}
          className="form-input min-h-[80px]"
          placeholder="Время доставки, пожелания, аллергии..."
        />
      </Field>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-copper text-night py-3 rounded-lg font-medium hover:bg-copper-muted transition-colors disabled:opacity-50"
      >
        {status === 'submitting' ? 'Отправляем…' : 'Оформить подписку'}
      </button>

      {status === 'error' && Object.keys(errors).length === 0 && (
        <p className="text-sm text-red-400 text-center">
          Что-то пошло не так. Попробуйте ещё раз.
        </p>
      )}

      <style jsx>{`
        :global(.form-input) {
          width: 100%;
          background: rgba(13, 31, 28, 0.6);
          border: 1px solid rgba(212, 160, 107, 0.25);
          border-radius: 8px;
          padding: 12px 14px;
          color: #f0e0c8;
          font-family: inherit;
          font-size: 14px;
          transition: border-color 0.2s;
        }
        :global(.form-input:focus) {
          outline: none;
          border-color: #d4a06b;
        }
        :global(.form-input-error) {
          border-color: #e87a7a !important;
          background: rgba(232, 122, 122, 0.05);
        }
      `}</style>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className={`font-mono text-[10px] tracking-[0.3em] mb-2 ${error ? 'text-red-400' : 'text-copper/60'}`}>
        {label.toUpperCase()}
      </div>
      {children}
      {error && (
        <div className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
          <span>⚠</span> {error}
        </div>
      )}
    </label>
  );
}
