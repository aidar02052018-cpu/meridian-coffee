'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';

const QUESTIONS = [
  {
    q: 'Чем спешелти-кофе отличается от обычного?',
    a: 'Спешелти — это кофе с протокольной оценкой не ниже 80 баллов из 100 по системе SCA, прозрачной историей происхождения (конкретная ферма, конкретный фермер) и контролируемой обжаркой под профиль. Обычный коммерческий кофе — анонимный «бленд» из разных партий, обжаренный для усреднённого вкуса.',
  },
  {
    q: 'Как долго хранится зерно после обжарки?',
    a: 'Свежеобжаренное зерно раскрывается с 5-го по 30-й день. Мы обжариваем под ваш заказ и отправляем в течение 48 часов — это значит, что зерно прибывает к вам в пиковой форме. Лучше всего пить в течение месяца с даты обжарки, указанной на упаковке.',
  },
  {
    q: 'Можно ли поставить подписку на паузу или отменить?',
    a: 'Да, в любой момент. Просто напишите нам — без объяснения причин, без удержаний. Если нужно пропустить одну посылку (уехали в отпуск, скопилось зерно) — тоже без проблем.',
  },
  {
    q: 'Как доставка работает в регионах?',
    a: 'Доставляем по всей России через СДЭК и Почту России. По Москве и СПб обычно 1–2 дня, в регионы — 3–7 дней. Стоимость доставки рассчитывается при оформлении и зависит от региона.',
  },
  {
    q: 'А если мне не понравится зерно?',
    a: 'Заменим следующее без вопросов. На «Знакомстве» это нормальная часть процесса — мы учимся ваш вкусу. Если что-то совсем мимо — возвращаем деньги за конкретную посылку.',
  },
  {
    q: 'Помольное или зерно? Что выбрать?',
    a: 'Зерно. Всегда зерно. Молотый кофе теряет 60% аромата за первые 15 минут после помола. Если у вас нет кофемолки — лучше потратить деньги на простую ручную (1 500 ₽), чем терять качество дорогого зерна.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-32 border-b border-copper/15">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <p className="font-mono text-xs tracking-[0.4em] text-copper/60 mb-4">
              ВОПРОСЫ
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-copper">
              Что обычно спрашивают
            </h2>
          </div>
        </Reveal>

        <div className="space-y-3">
          {QUESTIONS.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border border-copper/15 rounded-xl overflow-hidden bg-night-muted/50">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left p-6 flex justify-between items-center gap-6 hover:bg-copper/5 transition-colors"
                >
                  <span className="font-serif text-lg text-copper">{item.q}</span>
                  <span
                    className={`text-copper text-2xl transition-transform ${
                      open === i ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-parchment/85 leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
