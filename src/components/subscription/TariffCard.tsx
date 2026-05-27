'use client';

import type { Tariff } from '@/lib/tariffs';

interface Props {
  tariff: Tariff;
  selected: boolean;
  onSelect: () => void;
}

export function TariffCard({ tariff, selected, onSelect }: Props) {
  return (
    <button
      onClick={onSelect}
      className={`text-left p-8 rounded-xl border-2 transition-colors w-full ${
        selected
          ? 'border-copper bg-copper/5'
          : 'border-copper/20 hover:border-copper/50'
      }`}
    >
      <p className="font-mono text-[10px] tracking-[0.3em] text-copper/60">
        {tariff.tagline.toUpperCase()}
      </p>
      <h3 className="font-serif text-3xl text-copper mt-2">{tariff.name}</h3>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-serif text-3xl text-parchment">{tariff.pricePerMonth} ₽</span>
        <span className="text-parchment/60 text-sm">/ мес</span>
      </div>
      <div className="text-sm text-parchment/70 mt-1">
        {tariff.weight} · {tariff.frequency}
      </div>
      <p className="text-parchment/80 mt-6 leading-relaxed">{tariff.description}</p>
      <ul className="mt-6 space-y-2">
        {tariff.features.map((f) => (
          <li key={f} className="text-sm text-parchment/70 flex gap-2">
            <span className="text-copper">·</span> {f}
          </li>
        ))}
      </ul>
    </button>
  );
}
