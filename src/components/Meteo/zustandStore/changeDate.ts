import { MeteoDataSourceType } from '../zustandStore/useMeteoStore';

export type PeriodType = 'day' | 'month' | 'year';
export type StepType = -1 | 1;
export const changeDate = (
  meteoDataSource: MeteoDataSourceType,
  meteoDate: Date,
  period: PeriodType,
  step: StepType
) => {
  let start: Date;
  switch (meteoDataSource) {
    case 'davisDaily':
      start = new Date(2012, 7, 22);
      break;
    case 'lipnoDaily':
      start = new Date(2000, 10, 20);
      break;
    case 'davisTextSummary':
      start = new Date(2012, 9, 1);
      break;
    case 'oldStationDaily':
      start = new Date(2001, 7, 13);
      break;
    default:
      start = new Date();
  }

  const now = new Date();
  let newDate: Date;
  switch (period) {
    case 'day':
      newDate = new Date(meteoDate.setDate(meteoDate.getDate() + step));
      break;
    case 'month':
      newDate = new Date(meteoDate.setMonth(meteoDate.getMonth() + step));
      break;
    case 'year':
      newDate = new Date(meteoDate.setFullYear(meteoDate.getFullYear() + step));
      break;
    default:
      newDate = new Date();
  }

  if (step === -1) return start < newDate ? newDate : start;

  if (step === +1) return now > newDate ? newDate : now;

  return now;
};

export const getDaysFromNow = (
  dateString: Date,
  referenceDate = new Date()
): number => {
  const inputDate = new Date(dateString);

  const diffTime = inputDate.getTime() - referenceDate.getTime();

  return Math.abs(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
};
