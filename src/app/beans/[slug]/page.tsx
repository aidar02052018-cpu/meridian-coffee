import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBeanBySlug } from '@/lib/beans';

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

export default async function BeanPage({ params }: PageProps) {
  const { slug } = await params;
  const bean = await getBeanBySlug(slug);
  if (!bean) notFound();

  const coords =
    bean.latitude !== null && bean.longitude !== null
      ? `${bean.latitude.toFixed(2)}° N · ${bean.longitude.toFixed(2)}° E`
      : null;

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/beans"
        className="text-xs font-mono tracking-[0.3em] text-copper/60 hover:text-copper"
      >
        ← НАЗАД К КАТАЛОГУ
      </Link>

      <header className="mt-8 pb-8 border-b border-copper/15">
        <div className="flex justify-between font-mono text-[10px] tracking-[0.3em] text-copper/60 mb-6">
          <span>
            {bean.country.toUpperCase()} · {bean.region.toUpperCase()}
          </span>
          {coords && <span>{coords}</span>}
        </div>
        <h1 className="font-serif text-5xl text-copper">{bean.name}</h1>
        <div className="italic text-parchment/70 mt-3">
          {bean.process}
          {bean.altitude_m ? ` · ${bean.altitude_m} м над у.м.` : ''}
          {bean.variety ? ` · ${bean.variety}` : ''}
        </div>
      </header>

      <section className="mt-10">
        <h2 className="font-mono text-[10px] tracking-[0.3em] text-copper/60 mb-3">
          ВКУСОВОЙ ПРОФИЛЬ
        </h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {bean.tasting_notes.map((note) => (
            <span
              key={note}
              className="text-sm border border-copper/30 px-3 py-1 rounded-full text-parchment"
            >
              {note}
            </span>
          ))}
        </div>
        {bean.description && (
          <p className="text-parchment/90 leading-relaxed">{bean.description}</p>
        )}
      </section>

      {bean.story && (
        <section className="mt-10">
          <h2 className="font-mono text-[10px] tracking-[0.3em] text-copper/60 mb-3">
            ИСТОРИЯ
          </h2>
          <p className="text-parchment/90 leading-relaxed">{bean.story}</p>
        </section>
      )}

      <section className="mt-12 pt-8 border-t border-copper/15">
        <h2 className="font-mono text-[10px] tracking-[0.3em] text-copper/60 mb-4">
          ЗАКАЗАТЬ
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 p-4 border border-copper/30 rounded-lg">
            <div className="text-xs text-parchment/60">250 г</div>
            <div className="font-serif text-2xl text-copper">{bean.price_250g} ₽</div>
          </div>
          <div className="flex-1 p-4 border border-copper/30 rounded-lg">
            <div className="text-xs text-parchment/60">1 кг</div>
            <div className="font-serif text-2xl text-copper">{bean.price_1kg} ₽</div>
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/subscription"
            className="flex-1 text-center bg-copper text-night px-6 py-3 rounded-lg font-medium hover:bg-copper-muted transition-colors"
          >
            В подписку — свежее каждые 2 недели
          </Link>
        </div>
      </section>
    </article>
  );
}
