import Image from 'next/image';
import { SubscriptionFlow } from '@/components/subscription/SubscriptionFlow';
import { HowItWorks } from '@/components/home/HowItWorks';
import { WhatsInTheBox } from '@/components/home/WhatsInTheBox';
import { Testimonials } from '@/components/home/Testimonials';
import { Reveal } from '@/components/ui/Reveal';

export const metadata = {
  title: 'Подписка на зерно — МЕРИДИАН',
  description:
    'Свежеобжаренное спешелти-зерно прямо к двери каждые две недели.',
};

export default function SubscriptionPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-copper/15">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=2000&q=80"
            alt=""
            fill
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-night/80 via-night/60 to-night" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.4em] text-copper/70 mb-4">
              ПОДПИСКА · СВЕЖЕЕ ЗЕРНО · К ДВЕРИ
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-serif text-5xl md:text-7xl text-copper leading-tight">
              Свежее зерно<br />у двери
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-parchment/80 text-lg mt-6 max-w-xl mx-auto leading-relaxed">
              Три тарифа на любой ритм. Без долгосрочных обязательств — пауза или смена в любой момент. Свежая обжарка под каждый заказ.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Tariffs + form */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <SubscriptionFlow />
      </section>

      {/* Reuse home sections */}
      <HowItWorks />
      <WhatsInTheBox />
      <Testimonials />
    </>
  );
}
