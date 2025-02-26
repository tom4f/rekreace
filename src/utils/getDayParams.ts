export const getDateParts = (date: Date) => {
  const year = date.getFullYear().toString();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const ms = String(date.getMilliseconds());

  return { year, month, day, ms };
};
