import Image from 'next/image';
import { getAllBeans } from '@/lib/beans';
import { QuizFlow } from '@/components/quiz/QuizFlow';
import { Reveal } from '@/components/ui/Reveal';

export const metadata = {
  title: 'Вкус-помощник — МЕРИДИАН',
  description: 'Ответьте на 4 вопроса и узнайте какое зерно вам подойдёт.',
};

export default async function QuizPage() {
  const beans = await getAllBeans();

  return (
    <>
      <section className="relative min-h-screen flex flex-col">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1447933601403-56dc2df9e4e7?w=2000&q=80"
            alt=""
            fill
            priority
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/90 to-night" />
        </div>

        <div className="max-w-5xl mx-auto px-6 pt-32 pb-20 text-center">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.4em] text-copper/70 mb-4">
              ВКУС-ПОМОЩНИК
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-serif text-5xl md:text-6xl text-copper">
              Найдём ваше зерно
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-parchment/70 mt-4 max-w-xl mx-auto text-lg">
              4 коротких вопроса — и мы предложим зёрна, которые вам должны понравиться.
            </p>
          </Reveal>
        </div>

        <div className="flex-1 flex items-start justify-center pb-20 px-6">
          <div className="w-full max-w-2xl bg-night-muted/60 backdrop-blur-sm rounded-2xl border border-copper/15 p-8 md:p-12">
            <QuizFlow beans={beans} />
          </div>
        </div>
      </section>
    </>
  );
}
