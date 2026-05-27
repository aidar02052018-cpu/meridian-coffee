import Image from 'next/image';
import { getAllBeans } from '@/lib/beans';
import { BeanFilters } from '@/components/beans/BeanFilters';
import { Reveal } from '@/components/ui/Reveal';

export const metadata = {
  title: 'Каталог зёрен — МЕРИДИАН',
  description: 'Свежеобжаренные зёрна спешелти со всего мира.',
};

export default async function BeansPage() {
  const beans = await getAllBeans();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-copper/15">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=2000&q=80"
            alt=""
            fill
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-night/80 via-night/60 to-night" />
        </div>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.4em] text-copper/70 mb-4">
              КАТАЛОГ · {beans.length} НАИМЕНОВАНИЙ
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-serif text-5xl md:text-7xl text-copper leading-tight">
              Зёрна с историей
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-parchment/80 text-lg mt-6 max-w-2xl leading-relaxed">
              Каждое зерно — точка на карте мира с конкретной фермой и фермером. Отфильтруйте по вкусовому профилю, обработке или стране — и откройте карточку, чтобы узнать о ферме, методе и рекомендации заваривания.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <BeanFilters beans={beans} />
      </section>
    </>
  );
}
