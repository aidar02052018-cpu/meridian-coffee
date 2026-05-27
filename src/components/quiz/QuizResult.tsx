'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Bean } from '@/lib/types';

interface Props {
  beans: Bean[];
  onRestart: () => void;
}

export function QuizResult({ beans, onRestart }: Props) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-3">
          ВАША РЕКОМЕНДАЦИЯ
        </p>
        <h2 className="font-serif text-4xl text-copper">
          {beans.length > 1 ? 'Эти зёрна вам подойдут' : 'Это зерно вам подойдёт'}
        </h2>
      </div>

      <div className="space-y-6">
        {beans.map((bean) => (
          <Link
            key={bean.id}
            href={`/beans/${bean.slug}`}
            className="flex flex-col md:flex-row gap-6 bg-night-muted rounded-xl overflow-hidden border border-copper/20 hover:border-copper transition-colors group"
          >
            {bean.image_url && (
              <div className="relative w-full md:w-48 aspect-square md:aspect-auto flex-shrink-0 overflow-hidden">
                <Image
                  src={bean.image_url}
                  alt={bean.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            )}
            <div className="p-6 md:py-6 md:pr-6 md:pl-0 flex-1">
              <div className="flex justify-between items-baseline mb-3">
                <p className="font-mono text-[10px] tracking-[0.3em] text-copper/60">
                  {bean.country.toUpperCase()}
                </p>
                <p className="text-copper font-medium">{bean.price_250g} ₽ / 250 г</p>
              </div>
              <h3 className="font-serif text-3xl text-copper">{bean.name}</h3>
              <p className="text-parchment/80 mt-3">{bean.tasting_notes.join(' · ')}</p>
              {bean.description && (
                <p className="text-parchment/60 text-sm mt-3 italic">{bean.description}</p>
              )}
              <p className="text-copper text-sm mt-4">Открыть карточку →</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={onRestart}
          className="text-sm font-mono tracking-[0.2em] text-copper/60 hover:text-copper"
        >
          ↻ ПРОЙТИ ЕЩЁ РАЗ
        </button>
      </div>
    </div>
  );
}
