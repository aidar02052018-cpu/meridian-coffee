import { SubscriptionFlow } from '@/components/subscription/SubscriptionFlow';

export const metadata = {
  title: 'Подписка на зерно — МЕРИДИАН',
  description: 'Свежеобжаренное спешелти-зерно прямо к двери каждые две недели.',
};

export default function SubscriptionPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-3">
          ПОДПИСКА
        </p>
        <h1 className="font-serif text-5xl text-copper">Свежее зерно у двери</h1>
        <p className="text-parchment/70 mt-4 max-w-xl mx-auto">
          Три тарифа на любой ритм. Без долгосрочных обязательств — можно паузить и менять.
        </p>
      </div>

      <SubscriptionFlow />
    </div>
  );
}
