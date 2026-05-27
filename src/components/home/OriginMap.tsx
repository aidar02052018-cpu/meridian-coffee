'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';

interface Origin {
  country: string;
  region: string;
  x: number;
  y: number;
}

const ORIGINS: Origin[] = [
  { country: 'Эфиопия', region: 'Йиргачеффе', x: 60, y: 52 },
  { country: 'Кения', region: 'Ньери', x: 58, y: 57 },
  { country: 'Колумбия', region: 'Уила', x: 27, y: 52 },
  { country: 'Бразилия', region: 'Минас-Жерайс', x: 33, y: 68 },
  { country: 'Гватемала', region: 'Антигуа', x: 22, y: 47 },
  { country: 'Коста-Рика', region: 'Тарразу', x: 24, y: 52 },
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
              Каждая ферма работает с нами лично — без посредников. Мы знаем,
              кто собрал, кто обработал, кто отгрузил.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative max-w-4xl mx-auto rounded-2xl border border-copper/15 bg-night/60 overflow-hidden">
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-auto"
              fill="none"
            >
              {/* Simplified continent outlines */}
              <g stroke="#d4a06b" strokeWidth="0.8" strokeOpacity="0.2" fill="#d4a06b" fillOpacity="0.04">
                <path d="M520 150 L560 140 L590 160 L610 200 L620 260 L610 310 L590 340 L560 360 L530 350 L510 320 L500 280 L490 240 L500 200 L510 170 Z" />
                <path d="M230 280 L260 260 L290 250 L310 260 L330 290 L340 330 L350 370 L340 400 L310 420 L280 410 L250 380 L230 340 L220 310 Z" />
                <path d="M190 210 L210 200 L240 210 L260 230 L250 250 L230 260 L210 250 L190 240 Z" />
                <path d="M150 80 L200 60 L260 70 L300 90 L310 120 L300 160 L270 180 L230 190 L200 180 L170 160 L150 130 Z" />
                <path d="M470 60 L520 50 L560 60 L580 80 L570 110 L540 130 L510 140 L480 130 L460 110 L450 80 Z" />
                <path d="M580 60 L650 40 L720 50 L780 70 L820 100 L840 140 L830 180 L800 200 L750 210 L700 200 L660 180 L630 150 L610 120 L590 90 Z" />
                <path d="M760 300 L810 290 L850 300 L870 330 L860 360 L830 370 L790 360 L770 340 Z" />
              </g>

              {/* Coffee belt */}
              <rect x="0" y="200" width="1000" height="150" fill="#d4a06b" fillOpacity="0.04" />
              <line x1="0" y1="200" x2="1000" y2="200" stroke="#d4a06b" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="8 4" />
              <line x1="0" y1="350" x2="1000" y2="350" stroke="#d4a06b" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="8 4" />
              <text x="960" y="215" fill="#d4a06b" fillOpacity="0.25" fontSize="10" fontFamily="monospace" textAnchor="end">COFFEE BELT</text>

              {/* Connecting lines */}
              {ORIGINS.map((o, i) =>
                ORIGINS.slice(i + 1).map((other, j) => (
                  <motion.line
                    key={`${i}-${j}`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.2 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3 + i * 0.05 }}
                    x1={o.x * 10}
                    y1={o.y * 5}
                    x2={other.x * 10}
                    y2={other.y * 5}
                    stroke="#d4a06b"
                    strokeWidth="0.8"
                  />
                ))
              )}

              {/* Origin dots and labels */}
              {ORIGINS.map((o, i) => (
                <motion.g
                  key={o.country}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
                >
                  <circle cx={o.x * 10} cy={o.y * 5} r="12" fill="#d4a06b" fillOpacity="0.15">
                    <animate attributeName="r" values="8;16;8" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.2;0.05;0.2" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={o.x * 10} cy={o.y * 5} r="5" fill="#d4a06b" />
                  <text x={o.x * 10} y={o.y * 5 + 20} fill="#d4a06b" fontSize="11" fontFamily="monospace" letterSpacing="2" textAnchor="middle" fillOpacity="0.8">
                    {o.country.toUpperCase()}
                  </text>
                  <text x={o.x * 10} y={o.y * 5 + 33} fill="#f0e0c8" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fillOpacity="0.6">
                    {o.region}
                  </text>
                </motion.g>
              ))}

              <text x="30" y="30" fill="#d4a06b" fillOpacity="0.4" fontSize="12" fontFamily="monospace">N</text>
              <text x="960" y="485" fill="#d4a06b" fillOpacity="0.4" fontSize="12" fontFamily="monospace" textAnchor="end">S</text>
            </svg>
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
