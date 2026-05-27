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
