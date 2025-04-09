import { Order, SendBookingRequest } from 'src/features/booking';

export const prices = {
  appartement1: { 1: 600, 2: 1000, 3: 1300, 4: null },
  appartement2: { 1: 600, 2: 1000, 3: 1200, 4: null },
  appartement3: { 1: 600, 2: 1100, 3: 1400, 4: 1700 },
} as const;

export type AppartementId = keyof typeof prices;
export type PersonCount = keyof (typeof prices)[AppartementId];

export const orderPrice = (data: SendBookingRequest | Order) => {
  const days = Math.max(
    0,
    Math.round(
      (new Date(data.check_out).getTime() - new Date(data.check_in).getTime()) /
        (24 * 60 * 60 * 1000)
    )
  );

  const apartmentId = `appartement${data.apartment}` as AppartementId;
  const persons = data.persons as PersonCount;

  const rawDayPrice = prices[apartmentId]?.[persons];
  const dayPrice = typeof rawDayPrice === 'number' ? rawDayPrice : 0;

  return {
    days,
    dayPrice,
    price: dayPrice * days,
  };
};
