import { describe, it, expect } from 'vitest';
import { formatCoords } from '@/lib/coords';

describe('formatCoords', () => {
  it('южная широта и западная долгота пишутся буквами S и W, без минуса', () => {
    expect(formatCoords(-11.05, -75.32)).toBe('11.05° S · 75.32° W');
  });

  it('северная широта и восточная долгота — N и E', () => {
    expect(formatCoords(6.25, 38.7)).toBe('6.25° N · 38.70° E');
  });

  it('без координат возвращает null', () => {
    expect(formatCoords(null, 10)).toBeNull();
    expect(formatCoords(10, null)).toBeNull();
  });
});
