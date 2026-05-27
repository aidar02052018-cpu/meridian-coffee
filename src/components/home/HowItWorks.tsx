import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

const STEPS = [
  {
    n: '01',
    title: 'Пройдите квиз',
    description: '4 коротких вопроса о вашем вкусе. Любите ли кислое? С молоком или без? Опытны или впервые?',
  },
  {
    n: '02',
    title: 'Получите рекомендацию',
    description: 'Наш алгоритм подбирает зерно под ваш вкусовой профиль. Если не подойдёт — мы поменяем без вопросов.',
  },
  {
    n: '03',
    title: 'Свежая обжарка',
    description: 'Обжариваем под ваш заказ. От обжарки до отправки — не больше 48 часов. Это и есть «свежесть».',
  },
  {
    n: '04',
    title: 'Доставка к двери',
    description: 'Каждые 2 или 4 недели — посылка с зерном, открыткой с историей фермы и рецептом заваривания.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-32 border-b border-copper/15">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-20">
            <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-4">
              КАК ЭТО РАБОТАЕТ
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-copper">
              Четыре шага<br />до первой чашки
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="relative">
                <div className="font-serif text-7xl text-copper/15 leading-none mb-4">
                  {s.n}
                </div>
                <h3 className="font-serif text-2xl text-copper">{s.title}</h3>
                <p className="text-parchment/70 mt-3 leading-relaxed text-sm">
                  {s.description}
                </p>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 text-copper/30 text-2xl">
                    →
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="text-center">
            <Link
              href="/subscription"
              className="inline-block bg-copper text-night px-8 py-4 rounded-lg font-medium hover:bg-copper-muted transition-colors"
            >
              Выбрать тариф подписки
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
