# МЕРИДИАН — план реализации (Balanced MVP)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Built and deployed Balanced-MVP сайт «МЕРИДИАН» — спешелти-кофейня с воронкой «квиз → карточка зерна → заявка на подписку», работает в проде на Vercel.

**Architecture:** Next.js App Router как фронт + Supabase как БД + Resend для писем + Vercel как хост. Зёрна хранятся в Supabase (можно править без деплоя). Квиз и фильтры — клиентские. Форма подписки сохраняется в Supabase и триггерит письма клиенту и админу. Без аутентификации и без онлайн-оплаты — отложены на v2.

**Tech Stack:** Next.js (последняя версия, App Router), TypeScript, Tailwind CSS, shadcn/ui, Supabase (Postgres + JS client), Resend (email), Vitest (unit-tests), Vercel (deploy).

**Связанные документы:**
- Дизайн-документ: `docs/superpowers/specs/2026-05-26-meridian-coffee-design.md`

---

## Структура файлов и ответственности

```
src/
├── app/
│   ├── layout.tsx              — корневой layout: шрифты, header, footer
│   ├── page.tsx                — главная (hero + 3 CTA)
│   ├── globals.css             — Tailwind базовый + кастомные токены
│   ├── about/
│   │   └── page.tsx            — о нас, контакты
│   ├── beans/
│   │   ├── page.tsx            — каталог зёрен + фильтры
│   │   └── [slug]/page.tsx     — карточка одного зерна
│   ├── quiz/
│   │   └── page.tsx            — вкус-помощник
│   └── subscription/
│       └── page.tsx            — тарифы + форма
├── components/
│   ├── layout/
│   │   ├── Header.tsx          — шапка с навигацией
│   │   ├── Footer.tsx          — подвал
│   │   └── Wordmark.tsx        — логотип «МЕРИДИАН»
│   ├── beans/
│   │   ├── BeanCard.tsx        — карточка зерна для списка
│   │   ├── BeanFilters.tsx     — фильтры каталога
│   │   └── BeanDetail.tsx      — полная страница зерна
│   ├── quiz/
│   │   ├── QuizFlow.tsx        — главный stateful-компонент квиза
│   │   └── QuizResult.tsx      — экран рекомендации
│   ├── subscription/
│   │   ├── TariffCard.tsx      — карточка тарифа
│   │   └── SubscriptionForm.tsx — форма заявки
│   └── ui/                     — shadcn-компоненты (button, input, ...)
├── lib/
│   ├── supabase.ts             — клиент Supabase (server + browser)
│   ├── resend.ts               — клиент Resend для писем
│   ├── quiz-algo.ts            — чистая функция рекомендации (тестируем TDD)
│   └── types.ts                — TypeScript-типы данных (Bean, Tariff, ...)
└── tests/
    ├── quiz-algo.test.ts       — тесты алгоритма квиза
    └── subscription-form.test.ts — тесты валидации формы
```

**Принципы:**
- Серверные компоненты по умолчанию, клиентские (`'use client'`) только где нужна интерактивность (квиз, форма, фильтры)
- Бизнес-логика (алгоритм квиза, валидация) — чистые функции в `lib/`, покрытые тестами
- Компоненты атомарные (BeanCard ≠ BeanDetail, хотя похожи)

---

## ⚠️ Что нужно от тебя (Гульназ) до старта

Перед Phase 0 нужно создать аккаунты и получить ключи. Это занимает 15–20 минут.

1. **Supabase**: зарегистрироваться на supabase.com, создать новый проект (имя: `meridian-coffee`, регион: ближайший). Получить из настроек проекта: `Project URL` и `anon public key`.
2. **Resend**: зарегистрироваться на resend.com, получить API key. Бесплатно 3000 писем/мес.
3. **Vercel**: аккаунт на vercel.com (можно войти через GitHub).
4. **GitHub**: создать пустой публичный репозиторий `meridian-coffee` (для деплоя).
5. **Git identity** (если ещё нет):
   ```powershell
   git config --global user.email "fling_rove_0q@icloud.com"
   git config --global user.name "Гульназ"
   ```

Эти ключи будут лежать в `.env.local` (НЕ коммитим — `.gitignore` уже их исключает).

---

## Phase 0 — Фундамент

**Цель:** есть Next.js-проект, локально запускается «Hello», задеплоен на Vercel как заглушка.

### Task 0.1: Создать Next.js-приложение

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `src/app/page.tsx`, `src/app/layout.tsx`, и т.д. (всё через CLI)

- [ ] **Step 1: Запустить create-next-app в текущей папке**

Из корня проекта `Сайты 2/`:

```powershell
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

На вопрос «directory not empty» — ответить **Yes** (продолжить). На вопрос про Turbopack — **Yes**.

- [ ] **Step 2: Запустить dev-сервер и проверить**

```powershell
npm run dev
```

Открыть http://localhost:3000 — должна быть стандартная заглушка Next.js. Остановить (`Ctrl+C`).

- [ ] **Step 3: Прочитать AGENTS-правила из node_modules**

Создать `AGENTS.md` со следующим содержанием (копия из АвтоДома):

```markdown
<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
```

Создать `CLAUDE.md` с одной строкой:
```
@AGENTS.md
```

- [ ] **Step 4: Коммит**

```powershell
git add .
git commit -m "Phase 0.1: scaffold Next.js with TypeScript and Tailwind"
```

---

### Task 0.2: Установить shadcn/ui

**Files:**
- Create: `components.json`, `src/components/ui/` (заполнится при добавлении компонентов)
- Modify: `src/app/globals.css`, `tailwind.config.ts` (через CLI)

- [ ] **Step 1: Инициализировать shadcn**

```powershell
npx shadcn@latest init
```

Ответы:
- Style: **Default**
- Base color: **Stone** (нейтральная база, мы переопределим в Phase 1)
- CSS variables: **Yes**

- [ ] **Step 2: Установить базовые компоненты, которые понадобятся**

```powershell
npx shadcn@latest add button input label textarea select card
```

- [ ] **Step 3: Проверить, что компоненты появились**

В `src/components/ui/` должны быть: `button.tsx`, `input.tsx`, `label.tsx`, `textarea.tsx`, `select.tsx`, `card.tsx`.

- [ ] **Step 4: Коммит**

```powershell
git add .
git commit -m "Phase 0.2: install shadcn/ui with base components"
```

---

### Task 0.3: Установить Vitest для тестов

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json` (добавить скрипт)

- [ ] **Step 1: Установить зависимости**

```powershell
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 2: Создать `vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

- [ ] **Step 3: Установить vite plugin react**

```powershell
npm install -D @vitejs/plugin-react
```

- [ ] **Step 4: Создать `src/tests/setup.ts`**

```typescript
import '@testing-library/jest-dom';
```

- [ ] **Step 5: Добавить скрипт в `package.json`**

В секцию `"scripts"` добавить:

```json
"test": "vitest",
"test:run": "vitest run"
```

- [ ] **Step 6: Создать smoke-test, чтобы проверить настройку**

`src/tests/smoke.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';

describe('Vitest setup', () => {
  it('runs tests', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 7: Запустить и убедиться, что проходит**

```powershell
npm run test:run
```

Expected: `1 passed`.

- [ ] **Step 8: Коммит**

```powershell
git add .
git commit -m "Phase 0.3: set up Vitest with smoke test"
```

---

### Task 0.4: Настроить Supabase-клиент

**Files:**
- Create: `src/lib/supabase.ts`, `.env.local`, `.env.example`

- [ ] **Step 1: Установить Supabase JS client**

```powershell
npm install @supabase/supabase-js
```

- [ ] **Step 2: Создать `.env.local` с ключами из Supabase**

Замени значения на свои из Supabase Dashboard (Settings → API):

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
RESEND_API_KEY=re_YOUR_KEY
RESEND_FROM_EMAIL=onboarding@resend.dev
ADMIN_EMAIL=fling_rove_0q@icloud.com
```

Примечание: `onboarding@resend.dev` работает без верификации домена, но письма приходят только на адрес владельца аккаунта. Для прод-запуска позже верифицируем свой домен.

- [ ] **Step 3: Создать `.env.example` (для других разработчиков, коммитится)**

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
ADMIN_EMAIL=
```

- [ ] **Step 4: Создать `src/lib/supabase.ts`**

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

- [ ] **Step 5: Убедиться, что `.env.local` в `.gitignore`**

Проверить, что строка `.env*.local` уже есть. Если нет — добавить.

- [ ] **Step 6: Коммит**

```powershell
git add .env.example src/lib/supabase.ts package.json package-lock.json
git commit -m "Phase 0.4: configure Supabase client and env template"
```

---

### Task 0.5: Деплой-заглушка на Vercel

**Files:** нет файловых изменений, только настройки

- [ ] **Step 1: Запушить в GitHub**

```powershell
git remote add origin https://github.com/YOUR-USERNAME/meridian-coffee.git
git branch -M main
git push -u origin main
```

- [ ] **Step 2: Импортировать в Vercel**

На vercel.com → New Project → выбрать репозиторий `meridian-coffee`. Framework Next.js определится автоматически.

- [ ] **Step 3: Добавить env-переменные в Vercel**

В разделе Environment Variables скопировать все из `.env.local` (все 5 переменных). Применить ко всем средам (Production, Preview, Development).

- [ ] **Step 4: Задеплоить**

Нажать **Deploy**. Подождать ~1 минуту.

- [ ] **Step 5: Проверить URL**

Открыть выданный URL (типа `meridian-coffee-xxx.vercel.app`) — должна быть стандартная заглушка Next.js.

- [ ] **Step 6: Коммит-маркер фазы**

```powershell
git commit --allow-empty -m "Phase 0 complete: foundation ready"
git push
```

---

## Phase 1 — Бренд-система

**Цель:** Tailwind знает цвета и шрифты МЕРИДИАНА, есть header + footer + wordmark, главная пустая но в брендовом стиле.

### Task 1.1: Настроить токены палитры в Tailwind

**Files:**
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.ts` (если есть — для Tailwind v3) или через CSS variables в `globals.css` (для v4)

- [ ] **Step 1: Прочитать актуальную доку Tailwind для текущей версии**

```powershell
ls node_modules/tailwindcss/
```

Найти README или docs. В Tailwind v4 кастомизация через `@theme` в CSS. В v3 — через `tailwind.config.ts`.

- [ ] **Step 2: Открыть `src/app/globals.css` и заменить его содержимое**

Для **Tailwind v4** (если установлен):

```css
@import "tailwindcss";

@theme {
  --color-night: #0d1f1c;
  --color-copper: #d4a06b;
  --color-parchment: #f0e0c8;
  --color-night-muted: #1a2e2a;
  --color-copper-muted: #b8895a;

  --font-serif: Georgia, 'Times New Roman', serif;
  --font-mono: 'Courier New', monospace;
  --font-sans: Inter, system-ui, sans-serif;
}

body {
  background-color: var(--color-night);
  color: var(--color-parchment);
  font-family: var(--font-sans);
}
```

Для **Tailwind v3** — добавить в `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#0d1f1c',
        copper: '#d4a06b',
        parchment: '#f0e0c8',
        'night-muted': '#1a2e2a',
        'copper-muted': '#b8895a',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        mono: ['"Courier New"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
```

И в `globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-night text-parchment font-sans;
}
```

- [ ] **Step 3: Запустить dev-сервер и проверить**

```powershell
npm run dev
```

Открыть localhost:3000 — фон должен стать тёмно-зелёным (хвоя), текст — светло-бежевым.

- [ ] **Step 4: Коммит**

```powershell
git add .
git commit -m "Phase 1.1: configure brand palette in Tailwind"
```

---

### Task 1.2: Подключить шрифт Inter

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Импортировать Inter из next/font**

Полностью заменить `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'МЕРИДИАН — спешелти-кофе с координатами',
  description: 'Каждое зерно знает откуда оно. Подписка на свежее зерно от обжарочной МЕРИДИАН.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Обновить globals.css, чтобы использовать Inter переменную**

В `globals.css` в селектор `body` (или `@theme`) подставить `var(--font-inter)` вместо просто `Inter`:

```css
/* Tailwind v4 */
@theme {
  --font-sans: var(--font-inter), system-ui, sans-serif;
  /* ...остальное без изменений */
}
```

Для v3 — в `tailwind.config.ts` заменить `'Inter'` на `'var(--font-inter)'`.

- [ ] **Step 3: Проверить в браузере**

Текст должен отображаться шрифтом Inter (без серифов), для кириллицы тоже.

- [ ] **Step 4: Коммит**

```powershell
git add src/app/layout.tsx src/app/globals.css
git commit -m "Phase 1.2: load Inter font with Cyrillic subset"
```

---

### Task 1.3: Wordmark-компонент

**Files:**
- Create: `src/components/layout/Wordmark.tsx`

- [ ] **Step 1: Создать `src/components/layout/Wordmark.tsx`**

```tsx
import Link from 'next/link';

interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg';
  withSubtitle?: boolean;
}

export function Wordmark({ size = 'md', withSubtitle = false }: WordmarkProps) {
  const sizeClasses = {
    sm: 'text-2xl tracking-[0.3em]',
    md: 'text-3xl tracking-[0.4em]',
    lg: 'text-5xl tracking-[0.5em]',
  };

  return (
    <Link href="/" className="inline-block group">
      <div className={`font-serif font-normal text-copper ${sizeClasses[size]}`}>
        МЕРИДИАН
      </div>
      {withSubtitle && (
        <div className="font-mono text-[10px] tracking-[0.3em] text-copper/60 mt-1">
          SPECIALTY COFFEE · EST. 2026
        </div>
      )}
    </Link>
  );
}
```

- [ ] **Step 2: Коммит**

```powershell
git add src/components/layout/Wordmark.tsx
git commit -m "Phase 1.3: add Wordmark component"
```

---

### Task 1.4: Header с навигацией

**Files:**
- Create: `src/components/layout/Header.tsx`

- [ ] **Step 1: Создать `src/components/layout/Header.tsx`**

```tsx
import Link from 'next/link';
import { Wordmark } from './Wordmark';

const navItems = [
  { href: '/beans', label: 'Зёрна' },
  { href: '/subscription', label: 'Подписка' },
  { href: '/about', label: 'О нас' },
];

export function Header() {
  return (
    <header className="border-b border-copper/15">
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
```

- [ ] **Step 2: Коммит**

```powershell
git add src/components/layout/Header.tsx
git commit -m "Phase 1.4: add Header with navigation"
```

---

### Task 1.5: Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Создать `src/components/layout/Footer.tsx`**

```tsx
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
```

- [ ] **Step 2: Коммит**

```powershell
git add src/components/layout/Footer.tsx
git commit -m "Phase 1.5: add Footer"
```

---

### Task 1.6: Подключить Header + Footer в layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Обновить layout.tsx, чтобы оборачивать children в Header/Footer**

Полностью заменить `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'МЕРИДИАН — спешелти-кофе с координатами',
  description: 'Каждое зерно знает откуда оно. Подписка на свежее зерно от обжарочной МЕРИДИАН.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Заменить главную на временную заглушку**

`src/app/page.tsx`:

```tsx
export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-32 text-center">
      <p className="text-copper/60 text-xs tracking-[0.4em] mb-4">PHASE 1 SHELL</p>
      <h1 className="font-serif text-5xl">Скоро здесь будет главная</h1>
    </div>
  );
}
```

- [ ] **Step 3: Проверить визуально**

`npm run dev` → localhost:3000. Должен быть тёмный фон, в шапке слева вордмарк, справа три ссылки, в подвале вордмарк и контакты.

- [ ] **Step 4: Коммит-маркер фазы**

```powershell
git add .
git commit -m "Phase 1 complete: brand system + layout shell"
git push
```

---

## Phase 2 — Каталог зёрен

**Цель:** в Supabase есть таблица `beans` с 6 зёрнами, `/beans` показывает список с фильтрами, `/beans/[slug]` показывает карточку.

### Task 2.1: Создать таблицу beans в Supabase

**Files:** SQL-миграция (через UI Supabase)

- [ ] **Step 1: В Supabase Dashboard → SQL Editor → New query**

Вставить и выполнить:

```sql
create table beans (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  country text not null,
  region text not null,
  latitude numeric,
  longitude numeric,
  altitude_m int,
  process text check (process in ('washed', 'natural', 'honey')),
  variety text,
  tasting_notes text[],
  flavor_profile text check (flavor_profile in ('sour', 'sweet', 'bitter', 'balanced')),
  roast_level text check (roast_level in ('light', 'medium', 'dark')),
  price_250g int not null,
  price_1kg int not null,
  description text,
  story text,
  image_url text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Разрешить публичный read (для каталога)
alter table beans enable row level security;
create policy "Public read active beans" on beans for select using (is_active = true);
```

- [ ] **Step 2: Проверить, что таблица создалась**

В Supabase Dashboard → Table Editor → должна появиться таблица `beans`.

- [ ] **Step 3: Зафиксировать SQL в репо для истории**

Создать `supabase/migrations/0001_beans.sql` с тем же SQL.

- [ ] **Step 4: Коммит**

```powershell
git add supabase/
git commit -m "Phase 2.1: create beans table in Supabase"
```

---

### Task 2.2: Засеять 6 тестовых зёрен

**Files:** SQL-сид (через UI Supabase)

- [ ] **Step 1: В Supabase SQL Editor выполнить**

```sql
insert into beans (slug, name, country, region, latitude, longitude, altitude_m, process, variety, tasting_notes, flavor_profile, roast_level, price_250g, price_1kg, description, story, image_url) values

('gedeo-konga-ethiopia', 'Гедео Конга', 'Эфиопия', 'Йиргачеффе', 6.25, 38.70, 1900, 'washed', 'heirloom',
 array['ягоды', 'чёрный чай', 'светлый цитрус'], 'sour', 'light', 850, 3200,
 'Лёгкий, прозрачный, цветочный финиш. Чистая ягодная кислотность.',
 'Кооператив Конга в зоне Гедео объединяет 1 200 мелких фермеров. Промывная обработка и высота 1900 м дают этому зерну характерный чайный профиль.',
 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800'),

('san-rafael-colombia', 'Финка Сан-Рафаэль', 'Колумбия', 'Уила', 2.07, -75.58, 1750, 'washed', 'caturra',
 array['карамель', 'красное яблоко', 'миндаль'], 'balanced', 'medium', 720, 2800,
 'Классическая колумбийская сладость с яблочной кислотностью и ореховым телом.',
 'Семейная ферма Хосе Морено в третьем поколении. Старая каморка, ручной сбор, традиционная промывка.',
 'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=800'),

('santa-elena-brazil', 'Санта-Елена', 'Бразилия', 'Минас-Жерайс', -21.83, -45.51, 1100, 'natural', 'mundo novo',
 array['тёмный шоколад', 'фундук', 'патока'], 'sweet', 'medium', 650, 2400,
 'Плотное тело, ореховая сладость, очень комфортный «вечерний» профиль.',
 'Натуральная обработка под солнцем — ягоды сушатся прямо с мякотью, давая зерну густой сладкий характер.',
 'https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=800'),

('finca-monteverde-guatemala', 'Финка Монтеверде', 'Гватемала', 'Антигуа', 14.55, -90.73, 1650, 'washed', 'bourbon',
 array['какао', 'апельсиновая цедра', 'специи'], 'balanced', 'medium', 780, 3000,
 'Сложный профиль с какао-горчинкой и яркой цитрусовой нотой в финише.',
 'Вулканическая почва вокруг Антигуа даёт зерну минеральность и сложность. Ферма работает с 1932 года.',
 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800'),

('peaberry-kenya', 'Кения Пиберри AA', 'Кения', 'Ньери', -0.42, 37.00, 1800, 'washed', 'SL28',
 array['чёрная смородина', 'грейпфрут', 'мёд'], 'sour', 'light', 920, 3600,
 'Знаменитый кенийский «винный» профиль с интенсивной ягодной кислотностью.',
 'Пиберри — округлые зёрна, которые формируются по одному в плоде вместо обычной пары. Такие зёрна сортируют отдельно за насыщенность.',
 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=800'),

('honey-rica', 'Хани Тарразу', 'Коста-Рика', 'Тарразу', 9.65, -84.05, 1700, 'honey', 'caturra',
 array['тростниковый сахар', 'абрикос', 'мёд'], 'sweet', 'medium', 850, 3300,
 'Хани-обработка даёт это удивительное сочетание медовой сладости и фруктовой яркости.',
 'При хани-обработке ягоды частично очищают, оставляя слой сладкой мякоти. Зёрна сушатся в этом «коконе» — отсюда мёд во вкусе.',
 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800');
```

- [ ] **Step 2: Проверить, что 6 строк появились**

В Table Editor → beans → должно быть 6 записей.

- [ ] **Step 3: Зафиксировать сид в репо**

Создать `supabase/seed/beans.sql` с тем же SQL.

- [ ] **Step 4: Коммит**

```powershell
git add supabase/seed/
git commit -m "Phase 2.2: seed 6 starter beans"
```

---

### Task 2.3: Создать типы и серверный загрузчик зёрен

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/lib/beans.ts`

- [ ] **Step 1: Создать `src/lib/types.ts`**

```typescript
export type FlavorProfile = 'sour' | 'sweet' | 'bitter' | 'balanced';
export type RoastLevel = 'light' | 'medium' | 'dark';
export type Process = 'washed' | 'natural' | 'honey';

export interface Bean {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: string;
  latitude: number | null;
  longitude: number | null;
  altitude_m: number | null;
  process: Process;
  variety: string | null;
  tasting_notes: string[];
  flavor_profile: FlavorProfile;
  roast_level: RoastLevel;
  price_250g: number;
  price_1kg: number;
  description: string | null;
  story: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
}
```

- [ ] **Step 2: Создать `src/lib/beans.ts`**

```typescript
import { supabase } from './supabase';
import type { Bean } from './types';

export async function getAllBeans(): Promise<Bean[]> {
  const { data, error } = await supabase
    .from('beans')
    .select('*')
    .eq('is_active', true)
    .order('name');
  if (error) throw error;
  return data ?? [];
}

export async function getBeanBySlug(slug: string): Promise<Bean | null> {
  const { data, error } = await supabase
    .from('beans')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data;
}
```

- [ ] **Step 3: Коммит**

```powershell
git add src/lib/types.ts src/lib/beans.ts
git commit -m "Phase 2.3: bean types and Supabase loaders"
```

---

### Task 2.4: BeanCard-компонент

**Files:**
- Create: `src/components/beans/BeanCard.tsx`

- [ ] **Step 1: Создать `src/components/beans/BeanCard.tsx`**

```tsx
import Link from 'next/link';
import type { Bean } from '@/lib/types';

interface BeanCardProps {
  bean: Bean;
}

export function BeanCard({ bean }: BeanCardProps) {
  const coords = bean.latitude && bean.longitude
    ? `${bean.latitude.toFixed(2)}° · ${bean.longitude.toFixed(2)}°`
    : null;

  return (
    <Link
      href={`/beans/${bean.slug}`}
      className="block bg-night-muted rounded-xl p-6 border border-copper/10 hover:border-copper/40 transition-colors group"
    >
      <div className="flex justify-between font-mono text-[10px] tracking-[0.2em] text-copper/60">
        <span>{bean.country.toUpperCase()}</span>
        {coords && <span>{coords}</span>}
      </div>
      <h3 className="font-serif text-2xl text-copper mt-4">{bean.name}</h3>
      <div className="text-sm italic text-parchment/60 mt-1">
        {bean.process} · {bean.altitude_m ? `${bean.altitude_m} м` : ''} · {bean.variety ?? ''}
      </div>
      <div className="h-px bg-copper/20 my-4" />
      <div className="text-sm text-parchment/80">
        {bean.tasting_notes.join(' · ')}
      </div>
      <div className="mt-4 text-copper font-medium text-sm">
        от {bean.price_250g} ₽ / 250 г →
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Коммит**

```powershell
git add src/components/beans/BeanCard.tsx
git commit -m "Phase 2.4: BeanCard component"
```

---

### Task 2.5: Страница каталога /beans

**Files:**
- Create: `src/app/beans/page.tsx`

- [ ] **Step 1: Создать `src/app/beans/page.tsx`**

```tsx
import { getAllBeans } from '@/lib/beans';
import { BeanCard } from '@/components/beans/BeanCard';

export const metadata = {
  title: 'Каталог зёрен — МЕРИДИАН',
  description: 'Свежеобжаренные зёрна спешелти со всего мира.',
};

export default async function BeansPage() {
  const beans = await getAllBeans();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-3">
          КАТАЛОГ · {beans.length} НАИМЕНОВАНИЙ
        </p>
        <h1 className="font-serif text-5xl text-copper">Зёрна</h1>
        <p className="text-parchment/70 mt-4 max-w-2xl">
          Каждое зерно — точка на карте мира с конкретными координатами. Откройте карточку, чтобы узнать о ферме, обработке и вкусовом профиле.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beans.map((bean) => (
          <BeanCard key={bean.id} bean={bean} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Запустить dev и проверить**

`npm run dev` → http://localhost:3000/beans → должны быть 6 карточек.

Если ошибка про переменные среды — проверить, что `.env.local` создан и сервер перезапущен.

- [ ] **Step 3: Коммит**

```powershell
git add src/app/beans/page.tsx
git commit -m "Phase 2.5: catalog page rendering all beans"
```

---

### Task 2.6: Фильтры каталога (клиентские)

**Files:**
- Create: `src/components/beans/BeanFilters.tsx`
- Modify: `src/app/beans/page.tsx`

- [ ] **Step 1: Создать `src/components/beans/BeanFilters.tsx`**

```tsx
'use client';

import { useState, useMemo } from 'react';
import type { Bean, FlavorProfile, Process } from '@/lib/types';
import { BeanCard } from './BeanCard';

interface Props {
  beans: Bean[];
}

const FLAVOR_LABELS: Record<FlavorProfile | 'all', string> = {
  all: 'Все',
  sour: 'Кислые',
  sweet: 'Сладкие',
  bitter: 'Горькие',
  balanced: 'Сбалансированные',
};

const PROCESS_LABELS: Record<Process | 'all', string> = {
  all: 'Любая',
  washed: 'Washed',
  natural: 'Natural',
  honey: 'Honey',
};

export function BeanFilters({ beans }: Props) {
  const [flavor, setFlavor] = useState<FlavorProfile | 'all'>('all');
  const [process, setProcess] = useState<Process | 'all'>('all');

  const countries = useMemo(
    () => Array.from(new Set(beans.map((b) => b.country))).sort(),
    [beans]
  );
  const [country, setCountry] = useState<string>('all');

  const filtered = useMemo(() => {
    return beans.filter((b) => {
      if (flavor !== 'all' && b.flavor_profile !== flavor) return false;
      if (process !== 'all' && b.process !== process) return false;
      if (country !== 'all' && b.country !== country) return false;
      return true;
    });
  }, [beans, flavor, process, country]);

  return (
    <div>
      <div className="flex flex-wrap gap-6 mb-10 pb-6 border-b border-copper/15">
        <FilterGroup label="Вкус">
          {(Object.keys(FLAVOR_LABELS) as Array<keyof typeof FLAVOR_LABELS>).map((k) => (
            <Chip key={k} active={flavor === k} onClick={() => setFlavor(k as FlavorProfile | 'all')}>
              {FLAVOR_LABELS[k]}
            </Chip>
          ))}
        </FilterGroup>
        <FilterGroup label="Обработка">
          {(Object.keys(PROCESS_LABELS) as Array<keyof typeof PROCESS_LABELS>).map((k) => (
            <Chip key={k} active={process === k} onClick={() => setProcess(k as Process | 'all')}>
              {PROCESS_LABELS[k]}
            </Chip>
          ))}
        </FilterGroup>
        <FilterGroup label="Страна">
          <Chip active={country === 'all'} onClick={() => setCountry('all')}>Все</Chip>
          {countries.map((c) => (
            <Chip key={c} active={country === c} onClick={() => setCountry(c)}>{c}</Chip>
          ))}
        </FilterGroup>
      </div>

      <div className="text-xs font-mono tracking-[0.2em] text-copper/60 mb-6">
        НАЙДЕНО · {filtered.length}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((bean) => (
          <BeanCard key={bean.id} bean={bean} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-parchment/60 py-16">
          Под эти фильтры ничего не подошло. Попробуйте сбросить часть критериев.
        </div>
      )}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-[0.3em] text-copper/60 mb-2">{label.toUpperCase()}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
        active
          ? 'bg-copper text-night border-copper'
          : 'border-copper/30 text-parchment/70 hover:border-copper/60'
      }`}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Заменить `src/app/beans/page.tsx`, чтобы рендерить через фильтры**

```tsx
import { getAllBeans } from '@/lib/beans';
import { BeanFilters } from '@/components/beans/BeanFilters';

export const metadata = {
  title: 'Каталог зёрен — МЕРИДИАН',
  description: 'Свежеобжаренные зёрна спешелти со всего мира.',
};

export default async function BeansPage() {
  const beans = await getAllBeans();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-3">
          КАТАЛОГ · {beans.length} НАИМЕНОВАНИЙ
        </p>
        <h1 className="font-serif text-5xl text-copper">Зёрна</h1>
        <p className="text-parchment/70 mt-4 max-w-2xl">
          Каждое зерно — точка на карте мира с конкретными координатами. Откройте карточку, чтобы узнать о ферме, обработке и вкусовом профиле.
        </p>
      </div>

      <BeanFilters beans={beans} />
    </div>
  );
}
```

- [ ] **Step 3: Проверить в браузере**

Фильтры должны переключаться, список — фильтроваться, счётчик обновляться. Сочетание фильтров, не дающее результатов, должно показывать «ничего не подошло».

- [ ] **Step 4: Коммит**

```powershell
git add src/components/beans/BeanFilters.tsx src/app/beans/page.tsx
git commit -m "Phase 2.6: catalog filters by flavor, process, country"
```

---

### Task 2.7: Страница карточки зерна /beans/[slug]

**Files:**
- Create: `src/app/beans/[slug]/page.tsx`

- [ ] **Step 1: Создать `src/app/beans/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation';
import { getBeanBySlug } from '@/lib/beans';
import Link from 'next/link';

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

  const coords = bean.latitude && bean.longitude
    ? `${bean.latitude.toFixed(2)}° N · ${bean.longitude.toFixed(2)}° E`
    : null;

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/beans" className="text-xs font-mono tracking-[0.3em] text-copper/60 hover:text-copper">
        ← НАЗАД К КАТАЛОГУ
      </Link>

      <header className="mt-8 pb-8 border-b border-copper/15">
        <div className="flex justify-between font-mono text-[10px] tracking-[0.3em] text-copper/60 mb-6">
          <span>{bean.country.toUpperCase()} · {bean.region.toUpperCase()}</span>
          {coords && <span>{coords}</span>}
        </div>
        <h1 className="font-serif text-5xl text-copper">{bean.name}</h1>
        <div className="italic text-parchment/70 mt-3">
          {bean.process} · {bean.altitude_m ? `${bean.altitude_m} м над у.м.` : ''} · {bean.variety ?? ''}
        </div>
      </header>

      <section className="mt-10">
        <h2 className="font-mono text-[10px] tracking-[0.3em] text-copper/60 mb-3">ВКУСОВОЙ ПРОФИЛЬ</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {bean.tasting_notes.map((note) => (
            <span key={note} className="text-sm border border-copper/30 px-3 py-1 rounded-full text-parchment">
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
          <h2 className="font-mono text-[10px] tracking-[0.3em] text-copper/60 mb-3">ИСТОРИЯ</h2>
          <p className="text-parchment/90 leading-relaxed">{bean.story}</p>
        </section>
      )}

      <section className="mt-12 pt-8 border-t border-copper/15">
        <h2 className="font-mono text-[10px] tracking-[0.3em] text-copper/60 mb-4">ЗАКАЗАТЬ</h2>
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
          <Link href="/subscription"
            className="flex-1 text-center bg-copper text-night px-6 py-3 rounded-lg font-medium hover:bg-copper-muted transition-colors">
            В подписку — свежее каждые 2 недели
          </Link>
        </div>
      </section>
    </article>
  );
}
```

- [ ] **Step 2: Проверить в браузере**

Открыть `localhost:3000/beans` → кликнуть любое зерно → должна открыться полная карточка.
Открыть несуществующий slug → должна показаться 404.

- [ ] **Step 3: Коммит-маркер фазы**

```powershell
git add .
git commit -m "Phase 2 complete: bean catalog with filters and detail pages"
git push
```

---

## Phase 3 — Квиз (вкус-помощник)

**Цель:** на `/quiz` пользователь отвечает на 4 вопроса и получает рекомендацию зерна с переходом на его карточку.

### Task 3.1: TDD — алгоритм рекомендации

**Files:**
- Create: `src/lib/quiz-algo.ts`
- Create: `src/tests/quiz-algo.test.ts`

- [ ] **Step 1: Написать тест-фикстуру и failing test**

`src/tests/quiz-algo.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { recommendBeans, type QuizAnswers } from '@/lib/quiz-algo';
import type { Bean } from '@/lib/types';

const fixture: Bean[] = [
  { id: '1', slug: 'sour-light', name: 'Sour Light', country: 'Эфиопия', region: 'X',
    latitude: 0, longitude: 0, altitude_m: 1900, process: 'washed', variety: null,
    tasting_notes: ['ягоды'], flavor_profile: 'sour', roast_level: 'light',
    price_250g: 800, price_1kg: 3000, description: null, story: null, image_url: null,
    is_active: true, created_at: '' },
  { id: '2', slug: 'sweet-medium', name: 'Sweet Medium', country: 'Бразилия', region: 'Y',
    latitude: 0, longitude: 0, altitude_m: 1100, process: 'natural', variety: null,
    tasting_notes: ['шоколад'], flavor_profile: 'sweet', roast_level: 'medium',
    price_250g: 650, price_1kg: 2400, description: null, story: null, image_url: null,
    is_active: true, created_at: '' },
  { id: '3', slug: 'balanced-medium', name: 'Balanced Medium', country: 'Колумбия', region: 'Z',
    latitude: 0, longitude: 0, altitude_m: 1750, process: 'washed', variety: null,
    tasting_notes: ['карамель'], flavor_profile: 'balanced', roast_level: 'medium',
    price_250g: 720, price_1kg: 2800, description: null, story: null, image_url: null,
    is_active: true, created_at: '' },
];

describe('recommendBeans', () => {
  it('recommends sour beans when user picks sour taste', () => {
    const answers: QuizAnswers = { taste: 'sour', withMilk: false, context: 'home', isFirstTime: false };
    const result = recommendBeans(answers, fixture);
    expect(result[0].flavor_profile).toBe('sour');
  });

  it('recommends sweet medium for "with milk" answer', () => {
    const answers: QuizAnswers = { taste: 'sweet', withMilk: true, context: 'cafe', isFirstTime: false };
    const result = recommendBeans(answers, fixture);
    expect(result[0].flavor_profile).toBe('sweet');
    expect(result[0].roast_level).not.toBe('light');
  });

  it('prefers balanced beans for first-time users', () => {
    const answers: QuizAnswers = { taste: 'balanced', withMilk: false, context: 'home', isFirstTime: true };
    const result = recommendBeans(answers, fixture);
    expect(result[0].flavor_profile).toBe('balanced');
  });

  it('returns up to 2 recommendations', () => {
    const answers: QuizAnswers = { taste: 'sour', withMilk: false, context: 'home', isFirstTime: false };
    const result = recommendBeans(answers, fixture);
    expect(result.length).toBeLessThanOrEqual(2);
  });

  it('falls back to any bean when no perfect match', () => {
    const answers: QuizAnswers = { taste: 'bitter', withMilk: false, context: 'home', isFirstTime: false };
    const result = recommendBeans(answers, fixture);
    expect(result.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Запустить — должен упасть**

```powershell
npm run test:run
```

Expected: failure with "Cannot find module '@/lib/quiz-algo'".

- [ ] **Step 3: Реализовать алгоритм минимально**

`src/lib/quiz-algo.ts`:

```typescript
import type { Bean, FlavorProfile } from './types';

export interface QuizAnswers {
  taste: FlavorProfile;
  withMilk: boolean;
  context: 'home' | 'cafe';
  isFirstTime: boolean;
}

export function recommendBeans(answers: QuizAnswers, beans: Bean[]): Bean[] {
  const scored = beans.map((bean) => ({ bean, score: scoreBean(bean, answers) }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 2).map((s) => s.bean);
}

function scoreBean(bean: Bean, answers: QuizAnswers): number {
  let score = 0;

  // Match on taste
  if (bean.flavor_profile === answers.taste) score += 10;
  if (answers.isFirstTime && bean.flavor_profile === 'balanced') score += 5;

  // With milk → prefer medium/dark roast (cuts through milk)
  if (answers.withMilk && bean.roast_level !== 'light') score += 3;
  if (!answers.withMilk && bean.roast_level === 'light') score += 2;

  // First-time → avoid extreme profiles
  if (answers.isFirstTime && bean.flavor_profile === 'sour') score -= 2;

  return score;
}
```

- [ ] **Step 4: Запустить тесты — должны пройти**

```powershell
npm run test:run
```

Expected: 5 passed.

- [ ] **Step 5: Коммит**

```powershell
git add src/lib/quiz-algo.ts src/tests/quiz-algo.test.ts
git commit -m "Phase 3.1: TDD quiz recommendation algorithm"
```

---

### Task 3.2: UI квиза — QuizFlow-компонент

**Files:**
- Create: `src/components/quiz/QuizFlow.tsx`

- [ ] **Step 1: Создать `src/components/quiz/QuizFlow.tsx`**

```tsx
'use client';

import { useState } from 'react';
import type { Bean } from '@/lib/types';
import { recommendBeans, type QuizAnswers } from '@/lib/quiz-algo';
import { QuizResult } from './QuizResult';

interface Props {
  beans: Bean[];
}

type Step = 'taste' | 'milk' | 'context' | 'first' | 'result';

export function QuizFlow({ beans }: Props) {
  const [step, setStep] = useState<Step>('taste');
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});

  const update = <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K], next: Step) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep(next);
  };

  if (step === 'result' && answers.taste !== undefined) {
    const result = recommendBeans(answers as QuizAnswers, beans);
    return <QuizResult beans={result} onRestart={() => { setAnswers({}); setStep('taste'); }} />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <StepIndicator current={step} />

      {step === 'taste' && (
        <Question title="Какой вкус вы любите больше всего?">
          <Option onClick={() => update('taste', 'sour', 'milk')}>Кислый — фруктовый, цитрусовый, яркий</Option>
          <Option onClick={() => update('taste', 'sweet', 'milk')}>Сладкий — карамель, шоколад, орехи</Option>
          <Option onClick={() => update('taste', 'balanced', 'milk')}>Сбалансированный — всё понемногу</Option>
          <Option onClick={() => update('taste', 'bitter', 'milk')}>Горький — крепкий, плотный, тёмный</Option>
        </Question>
      )}

      {step === 'milk' && (
        <Question title="Будете пить с молоком?">
          <Option onClick={() => update('withMilk', true, 'context')}>Да, обычно с молоком</Option>
          <Option onClick={() => update('withMilk', false, 'context')}>Нет, чёрный кофе</Option>
        </Question>
      )}

      {step === 'context' && (
        <Question title="Где будете пить чаще?">
          <Option onClick={() => update('context', 'home', 'first')}>Дома — буду варить сам</Option>
          <Option onClick={() => update('context', 'cafe', 'first')}>В кофейне — пью у вас</Option>
        </Question>
      )}

      {step === 'first' && (
        <Question title="Это ваш первый опыт со спешелти-кофе?">
          <Option onClick={() => update('isFirstTime', true, 'result')}>Да, только начинаю разбираться</Option>
          <Option onClick={() => update('isFirstTime', false, 'result')}>Нет, я в теме</Option>
        </Question>
      )}
    </div>
  );
}

function StepIndicator({ current }: { current: Step }) {
  const steps: Step[] = ['taste', 'milk', 'context', 'first'];
  const idx = steps.indexOf(current);
  return (
    <div className="font-mono text-[10px] tracking-[0.3em] text-copper/60 mb-8 text-center">
      ШАГ {Math.min(idx + 1, 4)} / 4
    </div>
  );
}

function Question({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-serif text-3xl text-copper text-center mb-10">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Option({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="block w-full text-left p-5 border border-copper/25 rounded-lg hover:border-copper hover:bg-copper/5 transition-colors"
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Коммит**

```powershell
git add src/components/quiz/QuizFlow.tsx
git commit -m "Phase 3.2: QuizFlow stateful component"
```

---

### Task 3.3: QuizResult-компонент

**Files:**
- Create: `src/components/quiz/QuizResult.tsx`

- [ ] **Step 1: Создать `src/components/quiz/QuizResult.tsx`**

```tsx
'use client';

import Link from 'next/link';
import type { Bean } from '@/lib/types';

interface Props {
  beans: Bean[];
  onRestart: () => void;
}

export function QuizResult({ beans, onRestart }: Props) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-3">ВАША РЕКОМЕНДАЦИЯ</p>
        <h2 className="font-serif text-4xl text-copper">
          {beans.length > 1 ? 'Эти зёрна вам подойдут' : 'Это зерно вам подойдёт'}
        </h2>
      </div>

      <div className="space-y-6">
        {beans.map((bean) => (
          <Link
            key={bean.id}
            href={`/beans/${bean.slug}`}
            className="block bg-night-muted rounded-xl p-8 border border-copper/20 hover:border-copper transition-colors"
          >
            <div className="flex justify-between items-baseline mb-4">
              <p className="font-mono text-[10px] tracking-[0.3em] text-copper/60">
                {bean.country.toUpperCase()}
              </p>
              <p className="text-copper font-medium">{bean.price_250g} ₽ / 250 г</p>
            </div>
            <h3 className="font-serif text-3xl text-copper">{bean.name}</h3>
            <p className="text-parchment/80 mt-3">{bean.tasting_notes.join(' · ')}</p>
            {bean.description && (
              <p className="text-parchment/60 text-sm mt-3 italic">{bean.description}</p>
            )}
            <p className="text-copper text-sm mt-4">Открыть карточку →</p>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={onRestart}
          className="text-sm font-mono tracking-[0.2em] text-copper/60 hover:text-copper"
        >
          ↻ ПРОЙТИ ЕЩЁ РАЗ
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Коммит**

```powershell
git add src/components/quiz/QuizResult.tsx
git commit -m "Phase 3.3: QuizResult component"
```

---

### Task 3.4: Страница /quiz

**Files:**
- Create: `src/app/quiz/page.tsx`

- [ ] **Step 1: Создать `src/app/quiz/page.tsx`**

```tsx
import { getAllBeans } from '@/lib/beans';
import { QuizFlow } from '@/components/quiz/QuizFlow';

export const metadata = {
  title: 'Вкус-помощник — МЕРИДИАН',
  description: 'Ответьте на 4 вопроса и узнайте какое зерно вам подойдёт.',
};

export default async function QuizPage() {
  const beans = await getAllBeans();

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-3">
          ВКУС-ПОМОЩНИК
        </p>
        <h1 className="font-serif text-5xl text-copper">Найдём ваше зерно</h1>
        <p className="text-parchment/70 mt-4 max-w-xl mx-auto">
          4 коротких вопроса — и мы предложим зёрна, которые вам должны понравиться.
        </p>
      </div>

      <QuizFlow beans={beans} />
    </div>
  );
}
```

- [ ] **Step 2: Проверить в браузере**

`localhost:3000/quiz` → пройти квиз → должны показаться 1–2 рекомендации с переходом на карточку.

- [ ] **Step 3: Коммит-маркер фазы**

```powershell
git add .
git commit -m "Phase 3 complete: quiz with algorithm and UI"
git push
```

---

## Phase 4 — Подписка

**Цель:** на `/subscription` 3 тарифа + форма заявки → данные в Supabase + письма клиенту и админу через Resend.

### Task 4.1: Таблица subscription_requests

**Files:**
- Create: `supabase/migrations/0002_subscription_requests.sql`

- [ ] **Step 1: В Supabase SQL Editor выполнить**

```sql
create table subscription_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  tier text not null check (tier in ('znakomstvo', 'postoyanstvo', 'otkryvatel')),
  bean_id uuid references beans(id),
  name text not null,
  phone text not null,
  email text not null,
  address text not null,
  notes text,
  status text default 'new' check (status in ('new', 'contacted', 'active', 'cancelled'))
);

alter table subscription_requests enable row level security;

-- Только insert разрешён публично (никто не может читать чужие заявки)
create policy "Public insert" on subscription_requests for insert with check (true);
```

- [ ] **Step 2: Сохранить миграцию в репо**

Создать `supabase/migrations/0002_subscription_requests.sql` с тем же SQL.

- [ ] **Step 3: Коммит**

```powershell
git add supabase/migrations/0002_subscription_requests.sql
git commit -m "Phase 4.1: subscription_requests table"
```

---

### Task 4.2: TDD — валидация формы подписки

**Files:**
- Create: `src/lib/subscription-validation.ts`
- Create: `src/tests/subscription-validation.test.ts`

- [ ] **Step 1: Написать тесты**

`src/tests/subscription-validation.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { validateSubscriptionForm, type SubscriptionFormData } from '@/lib/subscription-validation';

const valid: SubscriptionFormData = {
  tier: 'znakomstvo',
  name: 'Иван Петров',
  phone: '+7 999 123 45 67',
  email: 'ivan@example.com',
  address: 'Москва, улица Ленина, 1',
  notes: '',
};

describe('validateSubscriptionForm', () => {
  it('passes valid input', () => {
    const result = validateSubscriptionForm(valid);
    expect(result.ok).toBe(true);
  });

  it('rejects empty name', () => {
    const result = validateSubscriptionForm({ ...valid, name: '' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.name).toBeDefined();
  });

  it('rejects malformed email', () => {
    const result = validateSubscriptionForm({ ...valid, email: 'not-an-email' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.email).toBeDefined();
  });

  it('rejects short phone', () => {
    const result = validateSubscriptionForm({ ...valid, phone: '123' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.phone).toBeDefined();
  });

  it('rejects empty address', () => {
    const result = validateSubscriptionForm({ ...valid, address: '   ' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.address).toBeDefined();
  });
});
```

- [ ] **Step 2: Запустить — должно упасть**

```powershell
npm run test:run
```

Expected: failure про отсутствующий модуль.

- [ ] **Step 3: Реализовать**

`src/lib/subscription-validation.ts`:

```typescript
export interface SubscriptionFormData {
  tier: 'znakomstvo' | 'postoyanstvo' | 'otkryvatel';
  bean_id?: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

export type ValidationResult =
  | { ok: true }
  | { ok: false; errors: Partial<Record<keyof SubscriptionFormData, string>> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSubscriptionForm(data: SubscriptionFormData): ValidationResult {
  const errors: Partial<Record<keyof SubscriptionFormData, string>> = {};

  if (!data.name.trim()) errors.name = 'Имя обязательно';
  if (!EMAIL_RE.test(data.email)) errors.email = 'Неверный формат email';
  if (data.phone.replace(/\D/g, '').length < 10) errors.phone = 'Телефон слишком короткий';
  if (!data.address.trim()) errors.address = 'Адрес обязателен';

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true };
}
```

- [ ] **Step 4: Запустить тесты — должны пройти**

```powershell
npm run test:run
```

Expected: всё проходит (включая 5 предыдущих).

- [ ] **Step 5: Коммит**

```powershell
git add src/lib/subscription-validation.ts src/tests/subscription-validation.test.ts
git commit -m "Phase 4.2: TDD subscription form validation"
```

---

### Task 4.3: TariffCard-компонент

**Files:**
- Create: `src/components/subscription/TariffCard.tsx`
- Create: `src/lib/tariffs.ts`

- [ ] **Step 1: Создать `src/lib/tariffs.ts`**

```typescript
export interface Tariff {
  id: 'znakomstvo' | 'postoyanstvo' | 'otkryvatel';
  name: string;
  tagline: string;
  weight: string;
  frequency: string;
  pricePerMonth: number;
  description: string;
  features: string[];
}

export const TARIFFS: Tariff[] = [
  {
    id: 'znakomstvo',
    name: 'Знакомство',
    tagline: 'для тех, кто только начинает',
    weight: '250 г',
    frequency: 'каждые 4 недели',
    pricePerMonth: 850,
    description: 'Разнообразие зёрен по нашему выбору — каждый месяц новое.',
    features: ['Зерно выбираем мы', 'Можно поставить на паузу', 'Письмо с историей зерна в каждой посылке'],
  },
  {
    id: 'postoyanstvo',
    name: 'Постоянство',
    tagline: 'для верных одному зерну',
    weight: '250 г',
    frequency: 'каждые 2 недели',
    pricePerMonth: 1700,
    description: 'Вы выбираете зерно — мы регулярно его пополняем. Меняйте когда хотите.',
    features: ['Вы выбираете зерно', 'Свежая обжарка раз в 2 недели', 'Смена зерна в любой момент'],
  },
  {
    id: 'otkryvatel',
    name: 'Открыватель',
    tagline: 'для тех, кто хочет всего',
    weight: '500 г',
    frequency: 'каждые 2 недели',
    pricePerMonth: 3300,
    description: 'Ротация по вкусовому профилю — каждая посылка раскрывает новый стиль.',
    features: ['500 г каждые 2 недели', 'Ротация по профилям', 'Доступ к новинкам обжарки первыми'],
  },
];
```

- [ ] **Step 2: Создать `src/components/subscription/TariffCard.tsx`**

```tsx
'use client';

import type { Tariff } from '@/lib/tariffs';

interface Props {
  tariff: Tariff;
  selected: boolean;
  onSelect: () => void;
}

export function TariffCard({ tariff, selected, onSelect }: Props) {
  return (
    <button
      onClick={onSelect}
      className={`text-left p-8 rounded-xl border-2 transition-colors w-full ${
        selected
          ? 'border-copper bg-copper/5'
          : 'border-copper/20 hover:border-copper/50'
      }`}
    >
      <p className="font-mono text-[10px] tracking-[0.3em] text-copper/60">{tariff.tagline.toUpperCase()}</p>
      <h3 className="font-serif text-3xl text-copper mt-2">{tariff.name}</h3>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-serif text-3xl text-parchment">{tariff.pricePerMonth} ₽</span>
        <span className="text-parchment/60 text-sm">/ мес</span>
      </div>
      <div className="text-sm text-parchment/70 mt-1">
        {tariff.weight} · {tariff.frequency}
      </div>
      <p className="text-parchment/80 mt-6 leading-relaxed">{tariff.description}</p>
      <ul className="mt-6 space-y-2">
        {tariff.features.map((f) => (
          <li key={f} className="text-sm text-parchment/70 flex gap-2">
            <span className="text-copper">·</span> {f}
          </li>
        ))}
      </ul>
    </button>
  );
}
```

- [ ] **Step 3: Коммит**

```powershell
git add src/lib/tariffs.ts src/components/subscription/TariffCard.tsx
git commit -m "Phase 4.3: tariffs data and TariffCard component"
```

---

### Task 4.4: API route для приёма заявки

**Files:**
- Create: `src/app/api/subscription/route.ts`
- Create: `src/lib/resend.ts`

- [ ] **Step 1: Установить Resend SDK**

```powershell
npm install resend
```

- [ ] **Step 2: Создать `src/lib/resend.ts`**

```typescript
import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY!);
```

- [ ] **Step 3: Создать `src/app/api/subscription/route.ts`**

```typescript
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';
import { validateSubscriptionForm, type SubscriptionFormData } from '@/lib/subscription-validation';
import { TARIFFS } from '@/lib/tariffs';

export async function POST(request: Request) {
  const body = (await request.json()) as SubscriptionFormData;
  const validation = validateSubscriptionForm(body);
  if (!validation.ok) {
    return NextResponse.json({ ok: false, errors: validation.errors }, { status: 400 });
  }

  const { error } = await supabase.from('subscription_requests').insert({
    tier: body.tier,
    bean_id: body.bean_id ?? null,
    name: body.name,
    phone: body.phone,
    email: body.email,
    address: body.address,
    notes: body.notes,
  });

  if (error) {
    console.error('Supabase insert failed:', error);
    return NextResponse.json({ ok: false, error: 'database' }, { status: 500 });
  }

  const tariff = TARIFFS.find((t) => t.id === body.tier);
  const fromEmail = process.env.RESEND_FROM_EMAIL!;
  const adminEmail = process.env.ADMIN_EMAIL!;

  // Письмо клиенту
  await resend.emails.send({
    from: `МЕРИДИАН <${fromEmail}>`,
    to: body.email,
    subject: 'Заявка на подписку получена',
    html: `
      <p>Здравствуйте, ${body.name}!</p>
      <p>Мы получили вашу заявку на тариф <strong>«${tariff?.name}»</strong>. В течение рабочего дня свяжемся с вами по телефону <strong>${body.phone}</strong> для подтверждения и оплаты.</p>
      <p>Спасибо, что выбрали МЕРИДИАН.</p>
    `,
  }).catch((e) => console.error('Client email failed:', e));

  // Письмо админу
  await resend.emails.send({
    from: `МЕРИДИАН <${fromEmail}>`,
    to: adminEmail,
    subject: `Новая заявка: ${body.name}, тариф «${tariff?.name}»`,
    html: `
      <h2>Новая заявка на подписку</h2>
      <ul>
        <li><strong>Имя:</strong> ${body.name}</li>
        <li><strong>Тел:</strong> ${body.phone}</li>
        <li><strong>Email:</strong> ${body.email}</li>
        <li><strong>Адрес:</strong> ${body.address}</li>
        <li><strong>Тариф:</strong> ${tariff?.name} (${tariff?.pricePerMonth} ₽/мес)</li>
        <li><strong>Заметки:</strong> ${body.notes || '—'}</li>
      </ul>
    `,
  }).catch((e) => console.error('Admin email failed:', e));

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 4: Коммит**

```powershell
git add src/lib/resend.ts src/app/api/subscription/route.ts package.json package-lock.json
git commit -m "Phase 4.4: subscription API route with email"
```

---

### Task 4.5: Форма SubscriptionForm

**Files:**
- Create: `src/components/subscription/SubscriptionForm.tsx`

- [ ] **Step 1: Создать `src/components/subscription/SubscriptionForm.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { validateSubscriptionForm, type SubscriptionFormData } from '@/lib/subscription-validation';

interface Props {
  selectedTier: SubscriptionFormData['tier'];
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function SubscriptionForm({ selectedTier }: Props) {
  const [form, setForm] = useState<SubscriptionFormData>({
    tier: selectedTier,
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SubscriptionFormData, string>>>({});
  const [status, setStatus] = useState<Status>('idle');

  const update = <K extends keyof SubscriptionFormData>(key: K, value: SubscriptionFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, tier: selectedTier };
    const validation = validateSubscriptionForm(payload);
    if (!validation.ok) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setStatus('submitting');

    const res = await fetch('/api/subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus('success');
    } else {
      const data = await res.json().catch(() => ({}));
      if (data.errors) setErrors(data.errors);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-night-muted rounded-xl p-10 text-center border border-copper/30">
        <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-3">ЗАЯВКА ПРИНЯТА</p>
        <h3 className="font-serif text-3xl text-copper">Спасибо!</h3>
        <p className="text-parchment/80 mt-4 max-w-md mx-auto">
          Мы получили вашу заявку и свяжемся с вами в течение рабочего дня. Письмо с подтверждением уже на пути.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5 bg-night-muted rounded-xl p-8 border border-copper/15">
      <Field label="Как к вам обращаться" error={errors.name}>
        <input
          type="text"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          className="input"
          placeholder="Иван Петров"
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Телефон" error={errors.phone}>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            className="input"
            placeholder="+7 999 123 45 67"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className="input"
            placeholder="ivan@example.com"
          />
        </Field>
      </div>

      <Field label="Адрес доставки" error={errors.address}>
        <input
          type="text"
          value={form.address}
          onChange={(e) => update('address', e.target.value)}
          className="input"
          placeholder="Москва, улица, дом, квартира"
        />
      </Field>

      <Field label="Заметки (опционально)">
        <textarea
          value={form.notes}
          onChange={(e) => update('notes', e.target.value)}
          className="input min-h-[80px]"
          placeholder="Время доставки, пожелания, аллергии..."
        />
      </Field>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-copper text-night py-3 rounded-lg font-medium hover:bg-copper-muted transition-colors disabled:opacity-50"
      >
        {status === 'submitting' ? 'Отправляем…' : 'Оформить подписку'}
      </button>

      {status === 'error' && Object.keys(errors).length === 0 && (
        <p className="text-sm text-red-400 text-center">
          Что-то пошло не так. Попробуйте ещё раз или свяжитесь с нами напрямую.
        </p>
      )}

      <style jsx>{`
        .input {
          width: 100%;
          background: rgba(13, 31, 28, 0.6);
          border: 1px solid rgba(212, 160, 107, 0.25);
          border-radius: 8px;
          padding: 12px 14px;
          color: #f0e0c8;
          font-family: inherit;
          font-size: 14px;
        }
        .input:focus {
          outline: none;
          border-color: #d4a06b;
        }
      `}</style>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="font-mono text-[10px] tracking-[0.3em] text-copper/60 mb-2">{label.toUpperCase()}</div>
      {children}
      {error && <div className="text-xs text-red-400 mt-1">{error}</div>}
    </label>
  );
}
```

- [ ] **Step 2: Коммит**

```powershell
git add src/components/subscription/SubscriptionForm.tsx
git commit -m "Phase 4.5: SubscriptionForm component"
```

---

### Task 4.6: Страница /subscription

**Files:**
- Create: `src/app/subscription/page.tsx`
- Create: `src/components/subscription/SubscriptionFlow.tsx`

- [ ] **Step 1: Создать клиентский флоу `src/components/subscription/SubscriptionFlow.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { TARIFFS } from '@/lib/tariffs';
import { TariffCard } from './TariffCard';
import { SubscriptionForm } from './SubscriptionForm';
import type { SubscriptionFormData } from '@/lib/subscription-validation';

export function SubscriptionFlow() {
  const [selectedTier, setSelectedTier] = useState<SubscriptionFormData['tier']>('postoyanstvo');

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {TARIFFS.map((tariff) => (
          <TariffCard
            key={tariff.id}
            tariff={tariff}
            selected={selectedTier === tariff.id}
            onSelect={() => setSelectedTier(tariff.id)}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-2">ОФОРМЛЕНИЕ ЗАЯВКИ</p>
          <h2 className="font-serif text-3xl text-copper">Свяжемся, оплата по ссылке</h2>
        </div>
        <SubscriptionForm selectedTier={selectedTier} />
      </div>
    </>
  );
}
```

- [ ] **Step 2: Создать `src/app/subscription/page.tsx`**

```tsx
import { SubscriptionFlow } from '@/components/subscription/SubscriptionFlow';

export const metadata = {
  title: 'Подписка на зерно — МЕРИДИАН',
  description: 'Свежеобжаренное спешелти-зерно прямо к двери каждые две недели.',
};

export default function SubscriptionPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-3">ПОДПИСКА</p>
        <h1 className="font-serif text-5xl text-copper">Свежее зерно у двери</h1>
        <p className="text-parchment/70 mt-4 max-w-xl mx-auto">
          Три тарифа на любой ритм. Без долгосрочных обязательств — можно паузить и менять.
        </p>
      </div>

      <SubscriptionFlow />
    </div>
  );
}
```

- [ ] **Step 3: Проверить флоу**

`localhost:3000/subscription` → выбрать тариф → заполнить форму → отправить.
Проверить, что в Supabase Table Editor → subscription_requests появилась запись.
Проверить, что письма пришли (в Resend dashboard → Logs).

- [ ] **Step 4: Коммит-маркер фазы**

```powershell
git add .
git commit -m "Phase 4 complete: subscription tiers, form, API, emails"
git push
```

---

## Phase 5 — Главная и о нас

**Цель:** на `/` — hero и 3 явных CTA-входа в воронку. На `/about` — короткая страница о бренде.

### Task 5.1: Главная страница

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Полностью заменить `src/app/page.tsx`**

```tsx
import Link from 'next/link';

const entries = [
  {
    label: 'ВПЕРВЫЕ',
    title: 'Подобрать своё',
    description: 'Ответьте на 4 вопроса — найдём зерно под ваш вкус.',
    href: '/quiz',
    cta: 'Пройти квиз',
  },
  {
    label: 'КАТАЛОГ',
    title: 'Изучить зёрна',
    description: 'Каждое зерно — точка на карте с историей.',
    href: '/beans',
    cta: 'Открыть каталог',
  },
  {
    label: 'ПОДПИСКА',
    title: 'Получать домой',
    description: 'Свежее зерно у двери каждые две недели.',
    href: '/subscription',
    cta: 'Выбрать тариф',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="max-w-5xl mx-auto px-6 pt-32 pb-24 text-center">
        <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-6">
          SPECIALTY COFFEE · EST. 2026
        </p>
        <h1 className="font-serif text-6xl md:text-7xl text-copper leading-[1.05]">
          Кофе с координатами
        </h1>
        <p className="text-parchment/80 text-lg max-w-2xl mx-auto mt-8 leading-relaxed">
          Каждое зерно у нас знает откуда оно — ферму, высоту, обработку. Мы рассказываем эту историю, чтобы каждая чашка была чуть осмысленнее.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {entries.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="block bg-night-muted rounded-2xl p-10 border border-copper/15 hover:border-copper/50 transition-colors group"
            >
              <p className="font-mono text-[10px] tracking-[0.4em] text-copper/60">{e.label}</p>
              <h3 className="font-serif text-3xl text-copper mt-4">{e.title}</h3>
              <p className="text-parchment/70 mt-4 leading-relaxed">{e.description}</p>
              <p className="text-copper mt-8 text-sm font-medium group-hover:translate-x-1 transition-transform">
                {e.cta} →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Проверить визуально**

`localhost:3000` → должен быть hero и три карточки-входа в воронку.

- [ ] **Step 3: Коммит**

```powershell
git add src/app/page.tsx
git commit -m "Phase 5.1: homepage with hero and 3 funnel entry points"
```

---

### Task 5.2: Страница /about

**Files:**
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Создать `src/app/about/page.tsx`**

```tsx
export const metadata = {
  title: 'О нас — МЕРИДИАН',
  description: 'Кто такой МЕРИДИАН, где нас найти, как связаться.',
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-20">
      <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-3">О НАС</p>
      <h1 className="font-serif text-5xl text-copper">Кофе с координатами</h1>

      <div className="prose prose-invert mt-10 space-y-6 text-parchment/85 leading-relaxed">
        <p>
          МЕРИДИАН — это спешелти-обжарочная и кофейня в одном месте. Мы работаем только с зерном, у которого есть конкретная ферма, конкретный фермер и конкретные координаты. Никакой «смеси неизвестного происхождения».
        </p>
        <p>
          Наша цель — сделать спешелти-кофе понятным. Через карточки зерна с историей фермы, через короткий квиз, который помогает выбрать первое зерно, через подписку, которая регулярно приносит вам свежеобжаренное.
        </p>
        <h2 className="font-serif text-2xl text-copper mt-12">Где нас найти</h2>
        <ul className="space-y-2">
          <li>Кофейня: <span className="text-copper">[адрес уточнится]</span></li>
          <li>Email: <a href="mailto:contact@meridian-coffee.ru" className="text-copper underline">contact@meridian-coffee.ru</a></li>
          <li>Telegram: <span className="text-copper">@meridian_coffee</span></li>
        </ul>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Коммит-маркер фазы**

```powershell
git add .
git commit -m "Phase 5 complete: homepage and about page"
git push
```

---

## Phase 6 — Полировка и прод-деплой

**Цель:** OpenGraph-теги, Vercel Analytics, страница 404, финальный деплой и QA-чеклист.

### Task 6.1: OpenGraph и Twitter-карточки

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Расширить metadata в `src/app/layout.tsx`**

Заменить блок `export const metadata`:

```tsx
export const metadata: Metadata = {
  title: {
    default: 'МЕРИДИАН — спешелти-кофе с координатами',
    template: '%s | МЕРИДИАН',
  },
  description: 'Каждое зерно знает откуда оно. Подписка на свежее зерно от обжарочной МЕРИДИАН.',
  openGraph: {
    title: 'МЕРИДИАН — спешелти-кофе с координатами',
    description: 'Каждое зерно знает откуда оно. Подписка на свежее зерно.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'МЕРИДИАН',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'МЕРИДИАН — спешелти-кофе с координатами',
    description: 'Каждое зерно знает откуда оно.',
  },
};
```

- [ ] **Step 2: Коммит**

```powershell
git add src/app/layout.tsx
git commit -m "Phase 6.1: enhanced metadata with OG and Twitter cards"
```

---

### Task 6.2: Vercel Analytics

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Установить пакет**

```powershell
npm install @vercel/analytics
```

- [ ] **Step 2: Подключить в `src/app/layout.tsx`**

Добавить импорт и в body:

```tsx
import { Analytics } from '@vercel/analytics/next';

// ...в body:
<body className="min-h-screen flex flex-col">
  <Header />
  <main className="flex-1">{children}</main>
  <Footer />
  <Analytics />
</body>
```

- [ ] **Step 3: Коммит**

```powershell
git add src/app/layout.tsx package.json package-lock.json
git commit -m "Phase 6.2: add Vercel Analytics"
```

---

### Task 6.3: Кастомная страница not-found

**Files:**
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Создать `src/app/not-found.tsx`**

```tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-3">КООРДИНАТА НЕ НАЙДЕНА</p>
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
```

- [ ] **Step 2: Коммит**

```powershell
git add src/app/not-found.tsx
git commit -m "Phase 6.3: custom 404 page"
```

---

### Task 6.4: Финальный билд-тест и деплой

- [ ] **Step 1: Запустить полный билд локально**

```powershell
npm run build
```

Expected: чистый билд без ошибок. Если что-то ругается на типы или импорты — починить до деплоя.

- [ ] **Step 2: Запустить prod-сборку локально**

```powershell
npm run start
```

Открыть http://localhost:3000, пройтись по всем страницам, отправить тестовую заявку. Остановить.

- [ ] **Step 3: Запустить все тесты**

```powershell
npm run test:run
```

Expected: все тесты зелёные.

- [ ] **Step 4: Запушить в main**

```powershell
git push
```

Vercel задеплоит автоматически. Подождать сообщения о готовности (1–2 минуты).

- [ ] **Step 5: QA на проде**

На проде (`meridian-coffee.vercel.app` или твоё имя):
- [ ] Главная грузится, hero виден, 3 карточки кликаются
- [ ] Каталог показывает 6 зёрен, фильтры работают
- [ ] Карточка зерна открывается, контент полный
- [ ] Квиз проходится за 4 шага, выдаёт рекомендацию
- [ ] Подписка: выбор тарифа работает, форма отправляется, успех показывается
- [ ] В Supabase появилась тестовая заявка
- [ ] В Resend в логах видны два письма
- [ ] 404 показывается на несуществующем URL
- [ ] Header и Footer одинаковые на всех страницах
- [ ] Мобильная версия не разваливается

- [ ] **Step 6: Финальный коммит-маркер**

```powershell
git commit --allow-empty -m "Phase 6 complete: МЕРИДИАН MVP shipped"
git push
```

---

## Definition of Done для всего MVP

- [ ] Все 6 страниц существуют и работают (`/`, `/beans`, `/beans/[slug]`, `/quiz`, `/subscription`, `/about`)
- [ ] В Supabase 6 активных зёрен с полной информацией
- [ ] Квиз корректно рекомендует под разные вкусовые предпочтения (тесты зелёные)
- [ ] Форма подписки валидируется (тесты зелёные)
- [ ] Заявка сохраняется в БД, оба письма уходят
- [ ] Сайт развёрнут на Vercel с подключённым доменом (или vercel.app временно)
- [ ] Vercel Analytics включён
- [ ] Этот план обновлён, если по ходу работы поменялись решения
