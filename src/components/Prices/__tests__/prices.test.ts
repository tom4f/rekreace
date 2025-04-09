import { updateOrderDefaultData } from 'src/components/Booking';
import { Order } from 'src/features/booking';

import { orderPrice } from '../prices';
describe('orderPrice', () => {
  it('calculates price correctly for 2 days, 2 persons, appartement1', () => {
    const data: Order = {
      ...updateOrderDefaultData,
      check_in: '2025-04-10',
      check_out: '2025-04-12',
      apartment: 2,
      persons: 2,
    };

    expect(orderPrice(data)).toEqual({
      days: 2,
      dayPrice: 1000,
      price: 2000,
    });
  });

  it('returns 0 for invalid dates (check_in > check_out)', () => {
    const data: Order = {
      ...updateOrderDefaultData,
      check_in: '2025-04-12',
      check_out: '2025-04-10',
      apartment: 3,
      persons: 3,
    };

    expect(orderPrice(data)).toEqual({
      days: 0,
      dayPrice: 1400,
      price: 0,
    });
  });

  it('returns 0 price if combination is not supported (null in price table)', () => {
    const data: Order = {
      ...updateOrderDefaultData,
      check_in: '2025-04-10',
      check_out: '2025-04-12',
      apartment: 1,
      persons: 4,
    };

    expect(orderPrice(data)).toEqual({
      days: 2,
      dayPrice: 0,
      price: 0,
    });
  });
});
