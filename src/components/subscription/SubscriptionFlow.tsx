'use client';

import { useState, useRef } from 'react';
import { TARIFFS } from '@/lib/tariffs';
import { TariffCard } from './TariffCard';
import { SubscriptionForm } from './SubscriptionForm';
import type { SubscriptionFormData } from '@/lib/subscription-validation';

export function SubscriptionFlow() {
  const [selectedTier, setSelectedTier] = useState<SubscriptionFormData['tier'] | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleSelect = (tierId: SubscriptionFormData['tier']) => {
    setSelectedTier(tierId);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const selectedTariff = TARIFFS.find((t) => t.id === selectedTier);

  return (
    <>
      <div className="text-center mb-10">
        <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-2">
          ШАГ 1
        </p>
        <h2 className="font-serif text-3xl text-copper">Выберите тариф</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {TARIFFS.map((tariff) => (
          <TariffCard
            key={tariff.id}
            tariff={tariff}
            selected={selectedTier === tariff.id}
            onSelect={() => handleSelect(tariff.id)}
          />
        ))}
      </div>

      <div ref={formRef} className="max-w-2xl mx-auto scroll-mt-24">
        {selectedTier ? (
          <>
            <div className="text-center mb-8">
              <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-2">
                ШАГ 2 · ТАРИФ «{selectedTariff?.name.toUpperCase()}»
              </p>
              <h2 className="font-serif text-3xl text-copper">Оформите заявку</h2>
              <p className="text-parchment/60 mt-2 text-sm">
                Свяжемся в течение дня, оплата по ссылке
              </p>
            </div>
            <SubscriptionForm selectedTier={selectedTier} />
          </>
        ) : (
          <div className="text-center py-16 border border-dashed border-copper/20 rounded-2xl">
            <p className="text-parchment/50 font-serif text-xl">
              ↑ Выберите тариф, чтобы перейти к оформлению
            </p>
          </div>
        )}
      </div>
    </>
  );
}
