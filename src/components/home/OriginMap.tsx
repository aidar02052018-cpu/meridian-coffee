'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';

interface Origin {
  country: string;
  region: string;
  // % coordinates inside the SVG viewBox (0-100)
  x: number;
  y: number;
}

const ORIGINS: Origin[] = [
  { country: 'Эфиопия', region: 'Йиргачеффе', x: 60, y: 60 },
  { country: 'Кения', region: 'Ньери', x: 61, y: 64 },
  { country: 'Колумбия', region: 'Уила', x: 27, y: 60 },
  { country: 'Бразилия', region: 'Минас-Жерайс', x: 33, y: 72 },
  { country: 'Гватемала', region: 'Антигуа', x: 22, y: 56 },
  { country: 'Коста-Рика', region: 'Тарразу', x: 23, y: 60 },
];

export function OriginMap() {
  return (
    <section className="py-32 border-b border-copper/15 bg-night-muted/40">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-4">
              ОТКУДА НАШЕ ЗЕРНО
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-copper">
              Шесть точек на карте
            </h2>
            <p className="text-parchment/70 mt-4 max-w-xl mx-auto">
              Каждая ферма работает с нами лично — без посредников. Мы знаем, кто собрал, кто обработал, кто отгрузил.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative aspect-[2/1] max-w-4xl mx-auto rounded-2xl border border-copper/15 bg-night/50 overflow-hidden p-8">
            {/* Latitude/longitude grid */}
            <svg
              viewBox="0 0 100 50"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              {[10, 25, 40].map((y) => (
                <line key={`h${y}`} x1="0" y1={y} x2="100" y2={y} stroke="#d4a06b" strokeWidth="0.05" strokeOpacity="0.2" strokeDasharray="0.5 0.5" />
              ))}
              {[20, 40, 60, 80].map((x) => (
                <line key={`v${x}`} x1={x} y1="0" x2={x} y2="50" stroke="#d4a06b" strokeWidth="0.05" strokeOpacity="0.2" strokeDasharray="0.5 0.5" />
              ))}
              {/* Equator */}
              <line x1="0" y1="25" x2="100" y2="25" stroke="#d4a06b" strokeWidth="0.1" strokeOpacity="0.4" />
            </svg>

            {/* Connecting lines between dots */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              {ORIGINS.map((o, i) =>
                ORIGINS.slice(i + 1).map((other, j) => (
                  <motion.line
                    key={`${i}-${j}`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.15 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3 + i * 0.05 }}
                    x1={o.x}
                    y1={o.y}
                    x2={other.x}
                    y2={other.y}
                    stroke="#d4a06b"
                    strokeWidth="0.1"
                  />
                ))
              )}
            </svg>

            {/* Origin dots */}
            {ORIGINS.map((o, i) => (
              <motion.div
                key={o.country}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="absolute"
                style={{ left: `${o.x}%`, top: `${o.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="relative group">
                  <div className="absolute inset-0 w-6 h-6 bg-copper rounded-full animate-ping opacity-50" />
                  <div className="relative w-3 h-3 bg-copper rounded-full ring-4 ring-copper/20" />
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="font-mono text-[9px] tracking-[0.2em] text-copper">
                      {o.country.toUpperCase()}
                    </div>
                    <div className="text-[10px] text-parchment/60">{o.region}</div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Decorative axis labels */}
            <div className="absolute top-3 left-3 font-mono text-[9px] tracking-[0.3em] text-copper/40">
              N
            </div>
            <div className="absolute bottom-3 right-3 font-mono text-[9px] tracking-[0.3em] text-copper/40">
              S
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="text-center mt-12 font-mono text-xs tracking-[0.3em] text-copper/60">
            6 ФЕРМ · 6 СТРАН · ОДНА ФИЛОСОФИЯ
          </div>
        </Reveal>
      </div>
    </section>
  );
}
