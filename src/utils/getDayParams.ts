export const getDateParts = (date: Date) => {
  const year = date.getFullYear().toString();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const ms = String(date.getMilliseconds());

  return { year, month, day, ms };
};

export const formatedDate = (dateInput: string | Date, keepSpaces = false) => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return '';
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const result = new Intl.DateTimeFormat('cs-CZ', options).format(date);

  return keepSpaces ? result : result.replace(/\s/g, '');
};
