import { describe, it, expect } from 'vitest';
import { recommendBeans, type QuizAnswers } from '@/lib/quiz-algo';
import type { Bean } from '@/lib/types';

const fixture: Bean[] = [
  {
    id: '1', slug: 'sour-light', name: 'Sour Light', country: 'Эфиопия', region: 'X',
    latitude: 0, longitude: 0, altitude_m: 1900, process: 'washed', variety: null,
    tasting_notes: ['ягоды'], flavor_profile: 'sour', roast_level: 'light',
    price_250g: 800, price_1kg: 3000, description: null, story: null, image_url: null,
    is_active: true, created_at: '',
  },
  {
    id: '2', slug: 'sweet-medium', name: 'Sweet Medium', country: 'Бразилия', region: 'Y',
    latitude: 0, longitude: 0, altitude_m: 1100, process: 'natural', variety: null,
    tasting_notes: ['шоколад'], flavor_profile: 'sweet', roast_level: 'medium',
    price_250g: 650, price_1kg: 2400, description: null, story: null, image_url: null,
    is_active: true, created_at: '',
  },
  {
    id: '3', slug: 'balanced-medium', name: 'Balanced Medium', country: 'Колумбия', region: 'Z',
    latitude: 0, longitude: 0, altitude_m: 1750, process: 'washed', variety: null,
    tasting_notes: ['карамель'], flavor_profile: 'balanced', roast_level: 'medium',
    price_250g: 720, price_1kg: 2800, description: null, story: null, image_url: null,
    is_active: true, created_at: '',
  },
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
