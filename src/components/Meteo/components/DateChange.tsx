import { PeriodType, StepType } from 'components/Meteo/zustandStore';

export const DateButton = ({
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
  text,
}: {
  setDate: (period: PeriodType, step: StepType) => void;
  period: PeriodType;
  text: string;
}) => (
  <span>
    <DateButton onClick={() => setDate(period, -1)}>{'<'}</DateButton>
    {text}
    <DateButton onClick={() => setDate(period, +1)}>{'>'}</DateButton>
  </span>
);
