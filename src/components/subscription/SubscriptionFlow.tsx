'use client';

import { useState } from 'react';
import { TARIFFS } from '@/lib/tariffs';
import { TariffCard } from './TariffCard';
import { SubscriptionForm } from './SubscriptionForm';
import type { SubscriptionFormData } from '@/lib/subscription-validation';

export function SubscriptionFlow() {
  const [selectedTier, setSelectedTier] = useState<SubscriptionFormData['tier']>('postoyanstvo');

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {TARIFFS.map((tariff) => (
          <TariffCard
            key={tariff.id}
            tariff={tariff}
            selected={selectedTier === tariff.id}
            onSelect={() => setSelectedTier(tariff.id)}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-2">
            ОФОРМЛЕНИЕ ЗАЯВКИ
          </p>
          <h2 className="font-serif text-3xl text-copper">Свяжемся, оплата по ссылке</h2>
        </div>
        <SubscriptionForm selectedTier={selectedTier} />
      </div>
    </>
  );
}
