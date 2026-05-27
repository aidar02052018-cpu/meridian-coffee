import { Reveal } from '@/components/ui/Reveal';

const ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <path d="M16 12h16l-2 28H18L16 12Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 12h20" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 18v18" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      </svg>
    ),
    title: '250 г зерна',
    description: 'Свежеобжаренное, в герметичной упаковке с клапаном дегазации',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect x="8" y="14" width="32" height="22" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 22h12M14 26h20M14 30h16" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
      </svg>
    ),
    title: 'Открытка с историей',
    description: 'Кто фермер, как обрабатывали, чем особенно это зерно',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <path d="M16 14h16l-2 22a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4l-2-22Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M32 18a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 12h20" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Рецепт заваривания',
    description: 'Карточка с настройками под V60, аэропресс или эспрессо',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 16v8l5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Дегустационная карта',
    description: 'Для записей: что почувствовали, что понравилось, что заказать ещё',
  },
];

export function WhatsInTheBox() {
  return (
    <section className="py-32 border-b border-copper/15 bg-night-muted/40">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-4">
              ЧТО В ПОСЫЛКЕ
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-copper">
              Не просто пачка кофе
            </h2>
            <p className="text-parchment/70 mt-4 max-w-xl mx-auto">
              Каждая посылка — это маленький ритуал. Мы кладём всё, что превращает напиток в опыт.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="text-center p-8 rounded-2xl border border-copper/15 bg-night/60 h-full hover:border-copper/40 transition-colors">
                <div className="inline-flex items-center justify-center text-copper mb-6">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl text-copper mb-3">{item.title}</h3>
                <p className="text-sm text-parchment/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
