import { weekStartAt } from './weekStartAt';

type TestCases = [string, number | undefined, string, string, number, number];

describe('weekStartAt', () => {
  const testCases: TestCases[] = [
    ['2025-01-01', undefined, '28', '12', 2024, 1],
    ['2025-01-01', 1, '28', '12', 2024, 1],
    ['2025-01-09', 2, '04', '01', 2025, 2],
    ['2025-12-24', 52, '20', '12', 2025, 52],
    ['2026-01-01', 1, '27', '12', 2025, 1],
    ['2027-01-08', 1, '02', '01', 2027, 1],
  ];

  test.each(testCases)(
    'For date %i and weekStartAt(%i) should return {date: "%i", month: "%i",year: %i, actualWeek: %i}',
    (date, week, d, m, y, w) => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(date));
      expect(weekStartAt(week)).toStrictEqual({
        date: d,
        month: m,
        year: y,
        actualWeek: w,
      });
    }
  );
});
