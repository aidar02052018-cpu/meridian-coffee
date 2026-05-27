import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getBeanBySlug, getAllBeans } from '@/lib/beans';
import { BeanCard } from '@/components/beans/BeanCard';
import { Reveal } from '@/components/ui/Reveal';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const bean = await getBeanBySlug(slug);
  if (!bean) return { title: 'Зерно не найдено — МЕРИДИАН' };
  return {
    title: `${bean.name} — ${bean.country} | МЕРИДИАН`,
    description: bean.description ?? `Спешелти-кофе ${bean.name}, ${bean.country}.`,
  };
}

const FLAVOR_AXES: { key: 'sour' | 'sweet' | 'balanced' | 'bitter'; label: string }[] = [
  { key: 'sour', label: 'Кислотность' },
  { key: 'sweet', label: 'Сладость' },
  { key: 'balanced', label: 'Тело' },
  { key: 'bitter', label: 'Горечь' },
];

function flavorIntensity(profile: string, axis: string): number {
  const map: Record<string, Record<string, number>> = {
    sour: { sour: 90, sweet: 30, balanced: 40, bitter: 20 },
    sweet: { sour: 30, sweet: 85, balanced: 60, bitter: 40 },
    balanced: { sour: 55, sweet: 65, balanced: 80, bitter: 50 },
    bitter: { sour: 35, sweet: 45, balanced: 60, bitter: 85 },
  };
  return map[profile]?.[axis] ?? 50;
}

export default async function BeanPage({ params }: PageProps) {
  const { slug } = await params;
  const bean = await getBeanBySlug(slug);
  if (!bean) notFound();

  const allBeans = await getAllBeans();
  const related = allBeans.filter((b) => b.slug !== bean.slug).slice(0, 3);

  const coords =
    bean.latitude !== null && bean.longitude !== null
      ? `${bean.latitude.toFixed(2)}° N · ${bean.longitude.toFixed(2)}° E`
      : null;

  return (
    <article>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end pt-32 pb-16 overflow-hidden border-b border-copper/15">
        {bean.image_url && (
          <>
            <Image
              src={bean.image_url}
              alt={bean.name}
              fill
              priority
              className="object-cover -z-10 opacity-50"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/60 via-night/40 to-night" />
          </>
        )}
        <div className="max-w-5xl mx-auto px-6 relative">
          <Link
            href="/beans"
            className="font-mono text-xs tracking-[0.3em] text-copper/70 hover:text-copper transition-colors"
          >
            ← НАЗАД В КАТАЛОГ
          </Link>
          <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] text-copper/70 mb-3">
                {bean.country.toUpperCase()} · {bean.region.toUpperCase()}
              </p>
              <h1 className="font-serif text-5xl md:text-7xl text-copper leading-tight">
                {bean.name}
              </h1>
              <p className="italic text-parchment/80 mt-4 text-lg">
                {bean.process}
                {bean.altitude_m ? ` · ${bean.altitude_m} м над уровнем моря` : ''}
                {bean.variety ? ` · ${bean.variety}` : ''}
              </p>
            </div>
            {coords && (
              <div className="font-mono text-xs tracking-[0.3em] text-copper/80">
                {coords}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-16">
          {/* Tasting profile */}
          <Reveal>
            <div>
              <h2 className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-6">
                ВКУСОВОЙ ПРОФИЛЬ
              </h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {bean.tasting_notes.map((note) => (
                  <span
                    key={note}
                    className="text-sm border border-copper/30 px-4 py-2 rounded-full text-parchment bg-copper/5"
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* Flavor bars */}
              <div className="space-y-4 mt-8 p-6 bg-night-muted rounded-xl border border-copper/15">
                {FLAVOR_AXES.map((axis) => {
                  const value = flavorIntensity(bean.flavor_profile, axis.key);
                  return (
                    <div key={axis.key}>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="font-mono tracking-[0.2em] text-parchment/70">
                          {axis.label.toUpperCase()}
                        </span>
                        <span className="font-mono text-copper/80">{value}</span>
                      </div>
                      <div className="h-1.5 bg-night rounded-full overflow-hidden">
                        <div
                          className="h-full bg-copper rounded-full"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {bean.description && (
                <p className="text-parchment/90 leading-relaxed mt-8 text-lg">
                  {bean.description}
                </p>
              )}
            </div>
          </Reveal>

          {/* Story */}
          {bean.story && (
            <Reveal>
              <div>
                <h2 className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-6">
                  ИСТОРИЯ ФЕРМЫ
                </h2>
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6">
                  <Image
                    src="https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=1600&q=80"
                    alt={`Плантация в ${bean.country}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.3em] text-parchment">
                    {bean.region.toUpperCase()} · {bean.altitude_m} М
                  </div>
                </div>
                <p className="text-parchment/85 leading-relaxed">{bean.story}</p>
              </div>
            </Reveal>
          )}

          {/* Brewing recommendation */}
          <Reveal>
            <div className="bg-night-muted rounded-xl border border-copper/15 p-8">
              <h2 className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-4">
                КАК ЗАВАРИВАТЬ
              </h2>
              <h3 className="font-serif text-2xl text-copper mb-6">
                Рекомендуемые методы
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {bean.roast_level === 'light' && (
                  <>
                    <BrewMethod method="V60" details="14 г / 230 мл · 92°C · 2:30" />
                    <BrewMethod method="Аэропресс" details="15 г / 220 мл · 88°C · инвертированный" />
                    <BrewMethod method="Кемекс" details="30 г / 500 мл · 94°C · 4:00" />
                  </>
                )}
                {bean.roast_level === 'medium' && (
                  <>
                    <BrewMethod method="Эспрессо" details="18 г / 36 г · 9 bar · 28 с" />
                    <BrewMethod method="V60" details="15 г / 230 мл · 90°C · 3:00" />
                    <BrewMethod method="Капучино" details="18 г + 150 мл молока" />
                  </>
                )}
                {bean.roast_level === 'dark' && (
                  <>
                    <BrewMethod method="Эспрессо" details="18 г / 36 г · 9 bar · 30 с" />
                    <BrewMethod method="Французский пресс" details="30 г / 500 мл · 92°C · 4:00" />
                    <BrewMethod method="Турка" details="7 г / 80 мл · до подъёма пены" />
                  </>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Sidebar: buy */}
        <aside className="lg:sticky lg:top-8 self-start">
          <div className="bg-night-muted rounded-2xl border border-copper/20 p-6">
            <h3 className="font-mono text-xs tracking-[0.3em] text-copper/60 mb-4">
              ЗАКАЗАТЬ
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 border border-copper/20 rounded-lg">
                <div>
                  <div className="text-xs text-parchment/60">250 г</div>
                  <div className="font-serif text-xl text-copper">
                    {bean.price_250g} ₽
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 border border-copper/20 rounded-lg">
                <div>
                  <div className="text-xs text-parchment/60">1 кг</div>
                  <div className="font-serif text-xl text-copper">
                    {bean.price_1kg} ₽
                  </div>
                  <div className="text-[10px] text-copper/60 mt-0.5">экономия 18%</div>
                </div>
              </div>
            </div>

            <Link
              href="/subscription"
              className="block mt-5 text-center bg-copper text-night px-6 py-3 rounded-lg font-medium hover:bg-copper-muted transition-colors"
            >
              В подписку — −20%
            </Link>
            <p className="text-xs text-parchment/60 text-center mt-3 leading-relaxed">
              Свежая обжарка каждые 2 недели. Меняйте зерно когда хотите.
            </p>
          </div>
        </aside>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-copper/15 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <h2 className="font-serif text-3xl text-copper mb-10">Может понравиться</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((b) => (
                <BeanCard key={b.id} bean={b} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

function BrewMethod({ method, details }: { method: string; details: string }) {
  return (
    <div className="p-4 border border-copper/20 rounded-lg bg-night/40">
      <div className="font-serif text-lg text-copper">{method}</div>
      <div className="font-mono text-[10px] tracking-[0.1em] text-parchment/60 mt-1">
        {details}
      </div>
    </div>
  );
}
