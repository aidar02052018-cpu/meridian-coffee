import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import type { Bean } from '@/lib/types';

interface Props {
  beans: Bean[];
}

export function FeaturedBeans({ beans }: Props) {
  const featured = beans.slice(0, 3);
  return (
    <section className="py-32 border-b border-copper/15">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-4">
                ИЗ КАТАЛОГА
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-copper">
                Знакомьтесь, наши герои
              </h2>
            </div>
            <Link
              href="/beans"
              className="mt-6 md:mt-0 font-mono text-xs tracking-[0.3em] text-copper hover:text-parchment transition-colors"
            >
              ВСЕ 6 ЗЁРЕН →
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((bean, i) => (
            <Reveal key={bean.id} delay={i * 0.1}>
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
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex justify-between font-mono text-[10px] tracking-[0.2em] text-parchment/80">
                    <span>{bean.country.toUpperCase()}</span>
                    {bean.latitude !== null && bean.longitude !== null && (
                      <span>
                        {bean.latitude.toFixed(1)}° · {bean.longitude.toFixed(1)}°
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-serif text-3xl text-copper">{bean.name}</h3>
                    <p className="text-sm italic text-parchment/70 mt-1">
                      {bean.process} · {bean.altitude_m} м
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-parchment/80 mb-4">
                    {bean.tasting_notes.join(' · ')}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-copper/15">
                    <span className="text-copper font-medium">от {bean.price_250g} ₽</span>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-copper/60">
                      ОТКРЫТЬ →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
