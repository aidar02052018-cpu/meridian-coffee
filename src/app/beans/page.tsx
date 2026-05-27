import { getAllBeans } from '@/lib/beans';
import { BeanFilters } from '@/components/beans/BeanFilters';

export const metadata = {
  title: 'Каталог зёрен — МЕРИДИАН',
  description: 'Свежеобжаренные зёрна спешелти со всего мира.',
};

export default async function BeansPage() {
  const beans = await getAllBeans();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-3">
          КАТАЛОГ · {beans.length} НАИМЕНОВАНИЙ
        </p>
        <h1 className="font-serif text-5xl text-copper">Зёрна</h1>
        <p className="text-parchment/70 mt-4 max-w-2xl">
          Каждое зерно — точка на карте мира с конкретными координатами. Откройте карточку, чтобы узнать о ферме, обработке и вкусовом профиле.
        </p>
      </div>

      <BeanFilters beans={beans} />
    </div>
  );
}
