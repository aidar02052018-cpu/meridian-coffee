import { Reveal } from '@/components/ui/Reveal';

const TESTIMONIALS = [
  {
    text: 'Перешла со Старбакса на МЕРИДИАН — и поняла, что раньше пила вообще не кофе. Эфиопия Гедео — это просто как чёрный чай с ягодами. До сих пор удивляюсь как такой вкус у обычной арабики.',
    name: 'Анна К.',
    role: 'продуктовый дизайнер, Москва',
    initials: 'АК',
  },
  {
    text: 'Подписался ради эксперимента. Уже четвёртая посылка — каждый раз новое зерно, каждый раз с открыткой и историей. Я начал разбираться в кофе не потому что хотел, а потому что они так круто рассказывают.',
    name: 'Дмитрий В.',
    role: 'разработчик, Санкт-Петербург',
    initials: 'ДВ',
  },
  {
    text: 'Заказывала «Открыватель» на пробу, ребята перезвонили, расспросили про мой опыт, посоветовали начать со «Знакомства». Это какой-то новый уровень сервиса в кофейной нише, честно.',
    name: 'Мария Т.',
    role: 'архитектор интерьеров, Казань',
    initials: 'МТ',
  },
];

export function Testimonials() {
  return (
    <section className="py-32 border-b border-copper/15">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-4">
              ГОЛОСА ПОДПИСЧИКОВ
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-copper">
              Им уже зашло
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="bg-night-muted rounded-2xl p-8 border border-copper/15 h-full flex flex-col">
                <div className="text-copper text-4xl font-serif leading-none mb-4">“</div>
                <blockquote className="text-parchment/85 leading-relaxed flex-1">
                  {t.text}
                </blockquote>
                <figcaption className="mt-6 pt-6 border-t border-copper/15 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-copper/20 flex items-center justify-center font-mono text-xs text-copper">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-copper text-sm font-medium">{t.name}</div>
                    <div className="font-mono text-[10px] tracking-[0.2em] text-parchment/60 mt-0.5">
                      {t.role.toUpperCase()}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
