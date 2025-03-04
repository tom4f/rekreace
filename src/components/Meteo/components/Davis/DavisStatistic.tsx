import { Header } from 'components/Atoms';
import { DateButton, DateChangeBlock } from 'components/Meteo/';
import { useGetNOAA } from 'features/meteo';
import {
  changeDate,
  MeteoDates,
  PeriodType,
  StepType,
  useDateStore,
} from 'store';
import { getDateParts } from 'utils';

export const DavisStatistic = () => {
  const { updateDate, resetDate } = useDateStore();
  const davisTextSummary = useDateStore(
    (state) => state.dates.davisTextSummary
  );

  const { year, month } = getDateParts(davisTextSummary);

  const queries = useGetNOAA(year.toString(), month);

  const setDate = (period: PeriodType, step: StepType) => {
    updateDate(
      MeteoDates.DAVIS_TEXT_SUMMARY,
      changeDate(MeteoDates.DAVIS_TEXT_SUMMARY, davisTextSummary, period, step)
    );
  };

  return (
    <>
      <Header>
        <DateChangeBlock setDate={setDate} period='month' text={month} />.
        <DateChangeBlock setDate={setDate} period='year' text={year} />.
        <DateButton onClick={() => resetDate(MeteoDates.DAVIS_TEXT_SUMMARY)}>
          Reset
        </DateButton>
      </Header>

      <article className='w-fit'>
        <section className='text-sm font-mono whitespace-pre text-left text-white'>
          {queries[1].data}
          {queries[1].isError && <div>Error fetching the text files</div>}
        </section>
      </article>

      <Header>
        <DateChangeBlock setDate={setDate} period='year' text={year} />.
        <DateButton onClick={() => resetDate(MeteoDates.DAVIS_TEXT_SUMMARY)}>
          Reset
        </DateButton>
      </Header>

      <article className='w-fit'>
        <section className='text-sm font-mono whitespace-pre text-left text-white'>
          {queries[0].isError && <div>Error fetching the text files</div>}
          {queries[0].data}
        </section>
      </article>
    </>
  );
};
