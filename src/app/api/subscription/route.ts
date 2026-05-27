import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';
import {
  validateSubscriptionForm,
  type SubscriptionFormData,
} from '@/lib/subscription-validation';
import { TARIFFS } from '@/lib/tariffs';

export async function POST(request: Request) {
  const body = (await request.json()) as SubscriptionFormData;
  const validation = validateSubscriptionForm(body);
  if (!validation.ok) {
    return NextResponse.json({ ok: false, errors: validation.errors }, { status: 400 });
  }

  const { error } = await supabase.from('subscription_requests').insert({
    tier: body.tier,
    bean_id: body.bean_id ?? null,
    name: body.name,
    phone: body.phone,
    email: body.email,
    address: body.address,
    notes: body.notes,
  });

  if (error) {
    console.error('Supabase insert failed:', error);
    return NextResponse.json({ ok: false, error: 'database' }, { status: 500 });
  }

  const tariff = TARIFFS.find((t) => t.id === body.tier);
  const fromEmail = process.env.RESEND_FROM_EMAIL!;
  const adminEmail = process.env.ADMIN_EMAIL!;

  // Письмо клиенту
  resend.emails
    .send({
      from: `МЕРИДИАН <${fromEmail}>`,
      to: body.email,
      subject: 'Заявка на подписку получена',
      html: `
        <p>Здравствуйте, ${body.name}!</p>
        <p>Мы получили вашу заявку на тариф <strong>«${tariff?.name}»</strong>. В течение рабочего дня свяжемся с вами по телефону <strong>${body.phone}</strong> для подтверждения и оплаты.</p>
        <p>Спасибо, что выбрали МЕРИДИАН.</p>
      `,
    })
    .catch((e) => console.error('Client email failed:', e));

  // Письмо админу
  resend.emails
    .send({
      from: `МЕРИДИАН <${fromEmail}>`,
      to: adminEmail,
      subject: `Новая заявка: ${body.name}, тариф «${tariff?.name}»`,
      html: `
        <h2>Новая заявка на подписку</h2>
        <ul>
          <li><strong>Имя:</strong> ${body.name}</li>
          <li><strong>Тел:</strong> ${body.phone}</li>
          <li><strong>Email:</strong> ${body.email}</li>
          <li><strong>Адрес:</strong> ${body.address}</li>
          <li><strong>Тариф:</strong> ${tariff?.name} (${tariff?.pricePerMonth} ₽/мес)</li>
          <li><strong>Заметки:</strong> ${body.notes || '—'}</li>
        </ul>
      `,
    })
    .catch((e) => console.error('Admin email failed:', e));

  return NextResponse.json({ ok: true });
}
