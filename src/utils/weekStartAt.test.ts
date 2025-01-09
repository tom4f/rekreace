import { describe, it, expect } from 'vitest';
import { weekStartAt } from './weekStartAt';

describe('weekStartAt', () => {
  it('should return when started 1st week of the year 2025 / week not present', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-01'));
    expect(weekStartAt()).toStrictEqual({
      date: '28',
      month: '12',
      year: 2024,
      actualWeek: 1,
    });
  });

  it('should return when started first week of the year', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-01'));
    expect(weekStartAt(1)).toStrictEqual({
      date: '28',
      month: '12',
      year: 2024,
      actualWeek: 1,
    });
  });

  it('should return when started second week of the year', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-09'));
    expect(weekStartAt(2)).toStrictEqual({
      date: '04',
      month: '01',
      year: 2025,
      actualWeek: 2,
    });
  });

  it('should return when started 52th week of the year', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-12-24'));
    expect(weekStartAt(52)).toStrictEqual({
      date: '20',
      month: '12',
      year: 2025,
      actualWeek: 52,
    });
  });

  it('should return when started 1st week of the year 2026', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01'));
    expect(weekStartAt(1)).toStrictEqual({
      date: '27',
      month: '12',
      year: 2025,
      actualWeek: 1,
    });
  });
});
