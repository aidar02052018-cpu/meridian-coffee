import Link from 'next/link';
import type { Bean } from '@/lib/types';

interface BeanCardProps {
  bean: Bean;
}

export function BeanCard({ bean }: BeanCardProps) {
  const coords =
    bean.latitude !== null && bean.longitude !== null
      ? `${bean.latitude.toFixed(2)}° · ${bean.longitude.toFixed(2)}°`
      : null;

  return (
    <Link
      href={`/beans/${bean.slug}`}
      className="block bg-night-muted rounded-xl p-6 border border-copper/10 hover:border-copper/40 transition-colors"
    >
      <div className="flex justify-between font-mono text-[10px] tracking-[0.2em] text-copper/60">
        <span>{bean.country.toUpperCase()}</span>
        {coords && <span>{coords}</span>}
      </div>
      <h3 className="font-serif text-2xl text-copper mt-4">{bean.name}</h3>
      <div className="text-sm italic text-parchment/60 mt-1">
        {bean.process}
        {bean.altitude_m ? ` · ${bean.altitude_m} м` : ''}
        {bean.variety ? ` · ${bean.variety}` : ''}
      </div>
      <div className="h-px bg-copper/20 my-4" />
      <div className="text-sm text-parchment/80">
        {bean.tasting_notes.join(' · ')}
      </div>
      <div className="mt-4 text-copper font-medium text-sm">
        от {bean.price_250g} ₽ / 250 г →
      </div>
    </Link>
  );
}
