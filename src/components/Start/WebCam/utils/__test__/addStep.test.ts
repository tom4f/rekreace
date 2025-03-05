import { describe, expect, it } from 'vitest';

import { addStep } from '../addStep';

describe('addStep', () => {
  it('increments day correctly for "days" interval', () => {
    expect(addStep(1, 12, 30, 'days')).toEqual({
      day: 2,
      hour: 12,
      minute: 30,
    });
  });

  it('resets day to 1 when day exceeds 31 for "days" interval', () => {
    expect(addStep(31, 12, 30, 'days')).toEqual({
      day: 1,
      hour: 12,
      minute: 30,
    });
  });

  it('increments minute by 15 for "minutes" interval when under 45', () => {
    expect(addStep(10, 14, 30, 'minutes')).toEqual({
      day: 10,
      hour: 14,
      minute: 45,
    });
  });

  it('increments hour and resets minute when minute exceeds 45', () => {
    expect(addStep(10, 14, 45, 'minutes')).toEqual({
      day: 10,
      hour: 15,
      minute: 12,
    });
  });

  it('resets hour to 7 when hour exceeds 22', () => {
    expect(addStep(10, 22, 45, 'minutes')).toEqual({
      day: 10,
      hour: 7,
      minute: 12,
    });
  });
});
