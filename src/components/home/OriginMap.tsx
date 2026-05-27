'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';

const CITIES = [
  { name: 'Москва', x: 37, y: 32 },
  { name: 'Санкт-Петербург', x: 30, y: 24 },
  { name: 'Казань', x: 49, y: 30 },
  { name: 'Екатеринбург', x: 60, y: 28 },
  { name: 'Новосибирск', x: 73, y: 30 },
  { name: 'Краснодар', x: 38, y: 42 },
  { name: 'Нижний Новгород', x: 43, y: 30 },
  { name: 'Самара', x: 50, y: 35 },
];

const ORIGINS = [
  'Эфиопия', 'Колумбия', 'Бразилия', 'Гватемала', 'Кения', 'Коста-Рика',
  'Руанда', 'Индонезия', 'Сальвадор', 'Панама', 'Йемен', 'Перу',
];

export function OriginMap() {
  return (
    <section className="py-32 border-b border-copper/15 bg-night-muted/40">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-8">
            <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-4">
              ГЕОГРАФИЯ
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-copper">
              Зерно из 12 стран.<br />Доставка по всей России.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-3xl mx-auto">
            {ORIGINS.map((country, i) => (
              <motion.span
                key={country}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="text-xs border border-copper/25 px-3 py-1.5 rounded-full text-copper/80"
              >
                {country}
              </motion.span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="relative max-w-4xl mx-auto rounded-2xl border border-copper/15 bg-night/60 overflow-hidden p-8 md:p-12">
            <p className="font-mono text-[10px] tracking-[0.3em] text-copper/50 text-center mb-8">
              ДОСТАВЛЯЕМ ЧЕРЕЗ СДЭК И ПОЧТУ РОССИИ
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CITIES.map((city, i) => (
                <motion.div
                  key={city.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="text-center p-4 rounded-xl border border-copper/15 bg-night-muted/50 hover:border-copper/40 transition-colors"
                >
                  <div className="w-2 h-2 bg-copper rounded-full mx-auto mb-3">
                    <div className="w-2 h-2 bg-copper rounded-full animate-ping" />
                  </div>
                  <div className="font-serif text-lg text-copper">{city.name}</div>
                  <div className="font-mono text-[9px] tracking-[0.2em] text-parchment/50 mt-1">
                    {i < 2 ? '1–2 ДНЯ' : '3–5 ДНЕЙ'}
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-parchment/50 text-sm mt-8">
              И ещё 1 100+ городов по России
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="text-center mt-12 font-mono text-xs tracking-[0.3em] text-copper/60">
            12 СТРАН-ПОСТАВЩИКОВ · ДОСТАВКА ПО ВСЕЙ РОССИИ
          </div>
        </Reveal>
      </div>
    </section>
  );
}
