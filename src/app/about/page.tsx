import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

export const metadata = {
  title: 'О нас — МЕРИДИАН',
  description: 'Кто такой МЕРИДИАН, где нас найти, как связаться.',
};

const VALUES = [
  { title: 'Прозрачность', text: 'Каждое зерно — с именем фермера, координатами и историей. Мы не прячем происхождение.' },
  { title: 'Свежесть', text: 'Обжарка под заказ. От ростера до вашей двери — не больше 48 часов.' },
  { title: 'Образование', text: 'Мы верим, что кофе вкуснее, когда ты понимаешь что пьёшь.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-copper/15">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=2000&q=80"
            alt=""
            fill
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/60 to-night" />
        </div>
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.4em] text-copper/70 mb-4">О НАС</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-serif text-5xl md:text-7xl text-copper leading-tight">
              Кофе с координатами
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-parchment/80 text-lg mt-6 leading-relaxed max-w-2xl">
              МЕРИДИАН — это спешелти-обжарочная и кофейня, где каждое зерно знает свою историю. Мы верим, что хороший кофе начинается не с обжарки, а с фермера.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 border-b border-copper/15">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal direction="left">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1200&q=80"
                alt="Обжарка кофе"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/60 to-transparent" />
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.1}>
            <div>
              <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-4">НАША ИСТОРИЯ</p>
              <h2 className="font-serif text-4xl text-copper leading-tight">
                Всё началось с одной чашки
              </h2>
              <div className="mt-8 space-y-5 text-parchment/85 leading-relaxed">
                <p>
                  Когда мы впервые попробовали спешелти, мир разделился на «до» и «после». Оказалось, что кофе — это не горькая жидкость для бодрости, а один из самых сложных вкусовых продуктов на планете.
                </p>
                <p>
                  Мы стали ездить на фермы, учиться у обжарщиков, изучать обработку. И поняли: проблема не в том, что хороший кофе сложный — а в том, что о нём никто нормально не рассказывает.
                </p>
                <p>
                  Так появился МЕРИДИАН — кофейня, где каждое зерно приходит с координатами, историей фермера и вкусовым профилем. Мы не просто продаём — мы объясняем.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 border-b border-copper/15 bg-night-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-4">НАШИ ПРИНЦИПЫ</p>
              <h2 className="font-serif text-4xl md:text-5xl text-copper">Три правила</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="p-8 rounded-2xl border border-copper/15 bg-night/60 h-full">
                  <div className="font-serif text-6xl text-copper/15 leading-none mb-4">
                    0{i + 1}
                  </div>
                  <h3 className="font-serif text-2xl text-copper">{v.title}</h3>
                  <p className="text-parchment/70 mt-4 leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roastery photo */}
      <section className="py-24 border-b border-copper/15">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=2000&q=80"
                alt="Обжарочная МЕРИДИАН"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-night/70 via-transparent to-night/70" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-mono text-xs tracking-[0.4em] text-parchment/90 mb-3">НАША ОБЖАРОЧНАЯ</p>
                  <p className="font-serif text-3xl md:text-4xl text-copper">
                    Свежесть — не маркетинг, а дата на пачке
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contacts */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-4">КОНТАКТЫ</p>
            <h2 className="font-serif text-4xl text-copper">Где нас найти</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-copper/15 bg-night-muted/50">
                <div className="font-mono text-[10px] tracking-[0.3em] text-copper/60 mb-2">КОФЕЙНЯ</div>
                <p className="text-parchment/85">Москва, ул. Большая Дмитровка, 32</p>
                <p className="text-parchment/60 text-sm mt-1">Пн–Вс 08:00–22:00</p>
              </div>
              <div className="p-6 rounded-xl border border-copper/15 bg-night-muted/50">
                <div className="font-mono text-[10px] tracking-[0.3em] text-copper/60 mb-2">ОБЖАРОЧНАЯ</div>
                <p className="text-parchment/85">Москва, Бережковская наб., 20с5</p>
                <p className="text-parchment/60 text-sm mt-1">По записи на дегустации</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 space-y-3 text-parchment/85">
              <div>Email: <a href="mailto:contact@meridian-coffee.ru" className="text-copper underline">contact@meridian-coffee.ru</a></div>
              <div>Telegram: <span className="text-copper">@meridian_coffee</span></div>
              <div>Instagram: <span className="text-copper">@meridian.coffee</span></div>
              <div>VK: <span className="text-copper">vk.com/meridian_coffee</span></div>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-12">
              <Link
                href="/quiz"
                className="inline-block bg-copper text-night px-8 py-4 rounded-lg font-medium hover:bg-copper-muted transition-colors"
              >
                Подобрать своё зерно →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
