'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wordmark } from './Wordmark';

const navItems = [
  { href: '/beans', label: 'Зёрна' },
  { href: '/subscription', label: 'Подписка' },
  { href: '/about', label: 'О нас' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-night/90 backdrop-blur-md border-b border-copper/15">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Wordmark size="sm" />

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${
                pathname === item.href ? 'text-copper' : 'text-parchment/80 hover:text-copper'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Меню"
        >
          <span className={`block w-6 h-0.5 bg-copper transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-copper transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-copper transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-copper/15 bg-night/95 backdrop-blur-md">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block px-6 py-4 text-lg border-b border-copper/10 transition-colors ${
                pathname === item.href ? 'text-copper' : 'text-parchment/80 hover:text-copper'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
