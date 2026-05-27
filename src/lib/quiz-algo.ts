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
