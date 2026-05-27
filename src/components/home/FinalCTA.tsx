import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

export function FinalCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=2000&q=80"
          alt=""
          fill
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/80 to-night" />
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.4em] text-copper/70 mb-6">
            ОДНА ЧАШКА — ТЫСЯЧИ КИЛОМЕТРОВ
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif text-5xl md:text-6xl text-copper leading-tight">
            Начните с квиза.<br />Найдём ваше зерно.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-parchment/80 text-lg mt-8 max-w-xl mx-auto leading-relaxed">
            Четыре вопроса, минута времени — и у вас будет персональная рекомендация спешелти-зерна, которое подойдёт именно вам.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quiz"
              className="bg-copper text-night px-10 py-4 rounded-lg font-medium hover:bg-copper-muted transition-colors text-lg"
            >
              Пройти квиз →
            </Link>
            <Link
              href="/subscription"
              className="border border-copper/40 text-copper px-10 py-4 rounded-lg font-medium hover:bg-copper/5 transition-colors text-lg"
            >
              Тарифы подписки
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
