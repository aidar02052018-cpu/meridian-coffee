import { Wordmark } from './Wordmark';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-copper/15 mt-32">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-8">
        <Wordmark size="sm" withSubtitle />
        <div className="text-sm text-parchment/60 space-y-2">
          <div>contact@meridian-coffee.ru</div>
          <div>Telegram · Instagram · VK</div>
          <div className="text-xs text-parchment/40 mt-4">© {year} МЕРИДИАН</div>
        </div>
      </div>
    </footer>
  );
}
