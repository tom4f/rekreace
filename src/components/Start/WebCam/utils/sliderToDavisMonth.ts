export const sliderToDavisMonth = (
  sliderDay: number,
  sliderHour: number,
  sliderMinutes: number
) => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;

  const sliderDate = new Date();
  sliderDate.setDate(sliderDay);
  sliderDate.setHours(sliderHour, sliderMinutes);

  return now > sliderDate
    ? currentMonth
    : currentMonth !== 1
    ? currentMonth - 1
    : 12;
};
