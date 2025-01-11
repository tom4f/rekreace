export const weekStartAt = (week = 1) => {
  const actualYear = new Date().getFullYear();
  const actualMiliseconds = new Date().getTime();
  const firstDayNrOfYear = new Date(actualYear, 0).getDay();

  const correctionDays = firstDayNrOfYear > 0 && firstDayNrOfYear < 5 ? 0 : 7;

  const firstSaturdayDayNumber =
    correctionDays - firstDayNrOfYear + 7 * (week - 1);

  const firstSaturday = new Date(actualYear, 0, firstSaturdayDayNumber);

  const actualWeek = Math.ceil(
    (actualMiliseconds -
      new Date(actualYear, 0, 1 + correctionDays).getTime()) /
      (1000 * 60 * 60 * 24 * 7)
  );

  return {
    date: `0${firstSaturday.getDate()}`.slice(-2),
    month: `0${firstSaturday.getMonth() + 1}`.slice(-2),
    year: firstSaturday.getFullYear(),
    actualWeek,
  };
};
