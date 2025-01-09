export const weekStartAt = (week = 1) => {
  const year = new Date().getFullYear();
  const today = new Date().getTime();
  const firstDay = new Date(year, 0).getDay(); // 1 = Monday
  // Get the first day of year + get day of week : 0 (Sunday) to 6 (Saturday)
  const isCorrectionDays = !(firstDay > 0 && firstDay < 5);
  const correctionDays = isCorrectionDays ? -7 : 0;
  const mondyDayNumber = 7 * (week - 1) + 1 - firstDay + 1 + correctionDays;
  const firstSaturday = new Date(year, 0, mondyDayNumber - 2);

  const actualWeek = Math.ceil(
    (today - new Date(year, 0, 1 + correctionDays).getTime()) /
      (1000 * 60 * 60 * 24 * 7)
  );

  return {
    date: `0${firstSaturday.getDate()}`.slice(-2),
    month: `0${firstSaturday.getMonth() + 1}`.slice(-2),
    year: firstSaturday.getFullYear(),
    actualWeek,
  };
};
