import Link from 'next/link';

const entries = [
  {
    label: 'ВПЕРВЫЕ',
    title: 'Подобрать своё',
    description: 'Ответьте на 4 вопроса — найдём зерно под ваш вкус.',
    href: '/quiz',
    cta: 'Пройти квиз',
  },
  {
    label: 'КАТАЛОГ',
    title: 'Изучить зёрна',
    description: 'Каждое зерно — точка на карте с историей.',
    href: '/beans',
    cta: 'Открыть каталог',
  },
  {
    label: 'ПОДПИСКА',
    title: 'Получать домой',
    description: 'Свежее зерно у двери каждые две недели.',
    href: '/subscription',
    cta: 'Выбрать тариф',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="max-w-5xl mx-auto px-6 pt-32 pb-24 text-center">
        <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-6">
          SPECIALTY COFFEE · EST. 2026
        </p>
        <h1 className="font-serif text-6xl md:text-7xl text-copper leading-[1.05]">
          Кофе с координатами
        </h1>
        <p className="text-parchment/80 text-lg max-w-2xl mx-auto mt-8 leading-relaxed">
          Каждое зерно у нас знает откуда оно — ферму, высоту, обработку. Мы рассказываем эту историю, чтобы каждая чашка была чуть осмысленнее.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {entries.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="block bg-night-muted rounded-2xl p-10 border border-copper/15 hover:border-copper/50 transition-colors"
            >
              <p className="font-mono text-[10px] tracking-[0.4em] text-copper/60">
                {e.label}
              </p>
              <h3 className="font-serif text-3xl text-copper mt-4">{e.title}</h3>
              <p className="text-parchment/70 mt-4 leading-relaxed">{e.description}</p>
              <p className="text-copper mt-8 text-sm font-medium">{e.cta} →</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
