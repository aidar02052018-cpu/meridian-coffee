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

  const restart = () => {
    setAnswers({});
    setStep('taste');
  };

  if (step === 'result' && answers.taste !== undefined) {
    const result = recommendBeans(answers as QuizAnswers, beans);
    return <QuizResult beans={result} onRestart={restart} />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {['taste', 'milk', 'context', 'first'].map((s, i) => {
            const steps: Step[] = ['taste', 'milk', 'context', 'first'];
            const currentIdx = steps.indexOf(step);
            return (
              <div key={s} className={`h-1 flex-1 rounded-full mx-0.5 transition-colors ${i <= currentIdx ? 'bg-copper' : 'bg-copper/20'}`} />
            );
          })}
        </div>
        <StepIndicator current={step} />
      </div>

      {step === 'taste' && (
        <Question title="Какой вкус вы любите больше всего?" subtitle="Это поможет подобрать зерно под ваш профиль">
          <Option emoji="🍋" onClick={() => update('taste', 'sour', 'milk')}>Кислый — фруктовый, цитрусовый, яркий</Option>
          <Option emoji="🍫" onClick={() => update('taste', 'sweet', 'milk')}>Сладкий — карамель, шоколад, орехи</Option>
          <Option emoji="☕" onClick={() => update('taste', 'balanced', 'milk')}>Сбалансированный — всё понемногу</Option>
          <Option emoji="🔥" onClick={() => update('taste', 'bitter', 'milk')}>Горький — крепкий, плотный, тёмный</Option>
        </Question>
      )}

      {step === 'milk' && (
        <Question title="Будете пить с молоком?" subtitle="От этого зависит рекомендуемая обжарка">
          <Option emoji="🥛" onClick={() => update('withMilk', true, 'context')}>Да, обычно с молоком или альтернативой</Option>
          <Option emoji="☕" onClick={() => update('withMilk', false, 'context')}>Нет, чёрный кофе — без ничего</Option>
        </Question>
      )}

      {step === 'context' && (
        <Question title="Где будете пить чаще?" subtitle="Для дома подберём зерно под вашу кофеварку">
          <Option emoji="🏠" onClick={() => update('context', 'home', 'first')}>Дома — буду варить сам</Option>
          <Option emoji="🏪" onClick={() => update('context', 'cafe', 'first')}>В кофейне — пью у вас</Option>
        </Question>
      )}

      {step === 'first' && (
        <Question title="Первый опыт со спешелти?" subtitle="Мы учтём это при рекомендации">
          <Option emoji="🌱" onClick={() => update('isFirstTime', true, 'result')}>Да, только начинаю разбираться</Option>
          <Option emoji="🎯" onClick={() => update('isFirstTime', false, 'result')}>Нет, я уже в теме</Option>
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

function Question({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-serif text-2xl md:text-3xl text-copper text-center mb-2">{title}</h2>
      {subtitle && <p className="text-parchment/50 text-sm text-center mb-8">{subtitle}</p>}
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Option({ emoji, onClick, children }: { emoji: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 w-full text-left p-5 border border-copper/25 rounded-xl hover:border-copper hover:bg-copper/5 transition-all hover:translate-x-1"
    >
      <span className="text-2xl flex-shrink-0">{emoji}</span>
      <span className="text-parchment/90">{children}</span>
    </button>
  );
}
