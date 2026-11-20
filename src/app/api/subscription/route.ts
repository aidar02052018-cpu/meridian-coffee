import { NextResponse } from 'next/server';
import {
  validateSubscriptionForm,
  type SubscriptionFormData,
} from '@/lib/subscription-validation';

// Демо-режим: заявка проверяется, но никуда не сохраняется и не отправляется.
// Раньше заявки писались в Supabase и уходили письмами через Resend.
export async function POST(request: Request) {
  const body = (await request.json()) as SubscriptionFormData;
  const validation = validateSubscriptionForm(body);
  if (!validation.ok) {
    return NextResponse.json({ ok: false, errors: validation.errors }, { status: 400 });
  }
  return NextResponse.json({ ok: true, demo: true });
}
