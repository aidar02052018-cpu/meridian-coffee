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
      <StepIndicator current={step} />

      {step === 'taste' && (
        <Question title="Какой вкус вы любите больше всего?">
          <Option onClick={() => update('taste', 'sour', 'milk')}>
            Кислый — фруктовый, цитрусовый, яркий
          </Option>
          <Option onClick={() => update('taste', 'sweet', 'milk')}>
            Сладкий — карамель, шоколад, орехи
          </Option>
          <Option onClick={() => update('taste', 'balanced', 'milk')}>
            Сбалансированный — всё понемногу
          </Option>
          <Option onClick={() => update('taste', 'bitter', 'milk')}>
            Горький — крепкий, плотный, тёмный
          </Option>
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
          <Option onClick={() => update('isFirstTime', true, 'result')}>
            Да, только начинаю разбираться
          </Option>
          <Option onClick={() => update('isFirstTime', false, 'result')}>
            Нет, я в теме
          </Option>
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
