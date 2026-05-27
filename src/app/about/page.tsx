export const metadata = {
  title: 'О нас — МЕРИДИАН',
  description: 'Кто такой МЕРИДИАН, где нас найти, как связаться.',
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-20">
      <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-3">О НАС</p>
      <h1 className="font-serif text-5xl text-copper">Кофе с координатами</h1>

      <div className="mt-10 space-y-6 text-parchment/85 leading-relaxed">
        <p>
          МЕРИДИАН — это спешелти-обжарочная и кофейня в одном месте. Мы работаем только с зерном, у которого есть конкретная ферма, конкретный фермер и конкретные координаты. Никакой «смеси неизвестного происхождения».
        </p>
        <p>
          Наша цель — сделать спешелти-кофе понятным. Через карточки зерна с историей фермы, через короткий квиз, который помогает выбрать первое зерно, через подписку, которая регулярно приносит вам свежеобжаренное.
        </p>

        <h2 className="font-serif text-2xl text-copper mt-12">Где нас найти</h2>
        <ul className="space-y-2">
          <li>
            Кофейня: <span className="text-copper">[адрес уточнится]</span>
          </li>
          <li>
            Email:{' '}
            <a
              href="mailto:contact@meridian-coffee.ru"
              className="text-copper underline"
            >
              contact@meridian-coffee.ru
            </a>
          </li>
          <li>
            Telegram: <span className="text-copper">@meridian_coffee</span>
          </li>
        </ul>
      </div>
    </article>
  );
}
