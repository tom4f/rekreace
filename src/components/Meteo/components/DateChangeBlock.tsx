import { PeriodType, StepType } from '../context';

const DateButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button className='text-zinc-500 hover:text-orange-400' onClick={onClick}>
    &nbsp;{children}&nbsp;
  </button>
);

export const DateChangeBlock = ({
  setDate,
  period,
  day,
}: {
  setDate: (period: PeriodType, step: StepType) => void;
  period: PeriodType;
  day: string;
}) => (
  <span>
    <DateButton onClick={() => setDate(period, -1)}>{'<'}</DateButton>
    {day}
    <DateButton onClick={() => setDate(period, +1)}>{'>'}</DateButton>
  </span>
);
