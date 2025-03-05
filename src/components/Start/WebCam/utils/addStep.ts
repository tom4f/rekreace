import { IntervalType } from '../SlideShow';

export const addStep = (
  day: number,
  hour: number,
  minute: number,
  interval: IntervalType
) => {
  if (interval === 'days') {
    return { day: day < 31 ? day + 1 : 1, hour, minute };
  }

  if (minute < 45) {
    return { day, hour, minute: minute + 15 };
  }

  return {
    day,
    hour: hour < 22 ? hour + 1 : 7,
    minute: 12,
  };
};
