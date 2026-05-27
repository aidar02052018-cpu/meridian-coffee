import Link from 'next/link';
import { Wordmark } from './Wordmark';

const navItems = [
  { href: '/beans', label: 'Зёрна' },
  { href: '/subscription', label: 'Подписка' },
  { href: '/about', label: 'О нас' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-night/90 backdrop-blur-md border-b border-copper/15">
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Wordmark size="sm" />
        <nav className="flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-parchment/80 hover:text-copper transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
