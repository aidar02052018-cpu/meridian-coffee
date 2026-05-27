import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-3">
        КООРДИНАТА НЕ НАЙДЕНА
      </p>
      <h1 className="font-serif text-6xl text-copper">404</h1>
      <p className="text-parchment/70 mt-6">
        Эта страница не существует или ещё не родилась.
      </p>
      <Link
        href="/"
        className="inline-block mt-8 text-copper border border-copper/30 px-6 py-3 rounded-lg hover:border-copper transition-colors"
      >
        ← На главную
      </Link>
    </div>
  );
}
