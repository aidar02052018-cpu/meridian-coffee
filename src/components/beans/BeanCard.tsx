import Link from 'next/link';
import Image from 'next/image';
import type { Bean } from '@/lib/types';

interface BeanCardProps {
  bean: Bean;
}

export function BeanCard({ bean }: BeanCardProps) {
  const coords =
    bean.latitude !== null && bean.longitude !== null
      ? `${bean.latitude.toFixed(1)}° · ${bean.longitude.toFixed(1)}°`
      : null;

  return (
    <Link
      href={`/beans/${bean.slug}`}
      className="block group rounded-2xl overflow-hidden border border-copper/15 hover:border-copper/40 transition-colors bg-night-muted"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {bean.image_url && (
          <Image
            src={bean.image_url}
            alt={bean.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex justify-between font-mono text-[10px] tracking-[0.2em] text-parchment/80">
          <span>{bean.country.toUpperCase()}</span>
          {coords && <span>{coords}</span>}
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <h3 className="font-serif text-2xl text-copper leading-tight">{bean.name}</h3>
          <p className="text-xs italic text-parchment/70 mt-1">
            {bean.process}
            {bean.altitude_m ? ` · ${bean.altitude_m} м` : ''}
          </p>
        </div>
      </div>
      <div className="p-5">
        <div className="text-sm text-parchment/80 line-clamp-2">
          {bean.tasting_notes.join(' · ')}
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-copper/15">
          <span className="text-copper font-medium text-sm">от {bean.price_250g} ₽</span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-copper/60 group-hover:text-copper transition-colors">
            ОТКРЫТЬ →
          </span>
        </div>
      </div>
    </Link>
  );
}
