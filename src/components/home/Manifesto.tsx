import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

export function Manifesto() {
  return (
    <section className="py-32 border-b border-copper/15">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <Reveal direction="left">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=1200&q=80"
              alt="Плантация кофе"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 font-mono text-[10px] tracking-[0.3em] text-parchment/80">
              ЭФИОПИЯ · ЙИРГАЧЕФФЕ · 1900 М
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.1}>
          <div>
            <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-4">
              ПОЧЕМУ МЕРИДИАН
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-copper leading-tight">
              Кофе — это место, время<br />и человек
            </h2>
            <div className="mt-8 space-y-5 text-parchment/85 leading-relaxed">
              <p>
                Когда вы покупаете «арабику» в супермаркете, вы не знаете о ней ничего: ни ферму, ни сезон сбора, ни обжарщика. Это анонимный товар.
              </p>
              <p>
                Спешелти-кофе — наоборот. У каждого зерна есть конкретная история: какая ферма, какой фермер, на какой высоте росло, как обрабатывалось. Эта история и есть то, что вы пьёте.
              </p>
              <p>
                Мы работаем только с зерном, у которого есть координаты. И рассказываем о нём всё, что знаем сами.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-copper/15">
              <Stat number="6" label="стран" />
              <Stat number="1 200+" label="м над у. м." />
              <Stat number="100%" label="арабика" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="font-serif text-3xl text-copper">{number}</div>
      <div className="font-mono text-[10px] tracking-[0.2em] text-parchment/60 mt-1">
        {label.toUpperCase()}
      </div>
    </div>
  );
}
