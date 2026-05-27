'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const COORDS = [
  '6°15′ N',
  '38°42′ E',
  '·',
  '2°04′ N',
  '75°35′ W',
  '·',
  '-21°50′ S',
  '45°31′ W',
  '·',
  '14°33′ N',
  '90°43′ W',
  '·',
  '-0°25′ S',
  '37°00′ E',
  '·',
  '9°39′ N',
  '84°03′ W',
];

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-copper/15">
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=2000&q=80"
          alt=""
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/60 via-night/85 to-night" />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-[0.4em] text-copper/70 mb-6"
        >
          SPECIALTY COFFEE · EST. 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-serif text-6xl md:text-8xl text-copper leading-[1.02]"
        >
          Кофе<br />с координатами
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-parchment/80 text-lg md:text-xl max-w-2xl mx-auto mt-10 leading-relaxed"
        >
          Каждое зерно у нас знает откуда оно — ферму, высоту, обработку. Мы рассказываем эту историю, чтобы каждая чашка была чуть осмысленнее.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/quiz"
            className="bg-copper text-night px-8 py-4 rounded-lg font-medium hover:bg-copper-muted transition-colors"
          >
            Подобрать своё зерно
          </Link>
          <Link
            href="/beans"
            className="border border-copper/40 text-copper px-8 py-4 rounded-lg font-medium hover:bg-copper/5 transition-colors"
          >
            Изучить каталог
          </Link>
        </motion.div>
      </div>

      {/* Animated coordinate strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="absolute bottom-8 left-0 right-0 overflow-hidden"
      >
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex gap-8 font-mono text-[10px] tracking-[0.3em] text-copper/40 whitespace-nowrap"
        >
          {[...COORDS, ...COORDS, ...COORDS].map((coord, i) => (
            <span key={i}>{coord}</span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
