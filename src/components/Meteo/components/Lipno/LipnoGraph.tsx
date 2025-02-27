import { Url } from 'api/paths';
import { Header } from 'components/Atoms';
import { DateButton, DateChangeBlock } from 'components/Meteo';
import {
  changeDate,
  MeteoDates,
  PeriodType,
  StepType,
  useDateStore,
} from 'components/Meteo/zustandStore';
import { getDateParts } from 'utils';

export const LipnoGraph = () => {
  const { updateDate, resetDate } = useDateStore();
  const lipnoDaily = useDateStore((state) => state.dates.lipnoDaily);

  const { year, ms } = getDateParts(lipnoDaily);

  const setDate = (period: PeriodType, step: StepType) => {
    updateDate(
      MeteoDates.LIPNO_DAILY,
      changeDate(MeteoDates.LIPNO_DAILY, lipnoDaily, period, step)
    );
  };

  return (
    <>
      <Header>
        <DateChangeBlock setDate={setDate} period='year' text={year} />.
        <DateButton onClick={() => resetDate(MeteoDates.LIPNO_DAILY)}>
          Reset
        </DateButton>
      </Header>
      <article className='flex flex-wrap justify-center pt-4'>
        <img alt='voda' src={`${Url.GRAPHS}/graph_voda_${year}.gif?${ms}`} />
        <img
          alt='hladina'
          src={`${Url.GRAPHS}/graph_hladina_${year}.gif?${ms}`}
        />
        <img alt='odtok' src={`${Url.GRAPHS}/graph_odtok_${year}.gif?${ms}`} />
        <img
          alt='pritok'
          src={`${Url.GRAPHS}/graph_pritok_${year}.gif?${ms}`}
        />
        <img
          alt='vzduch'
          src={`${Url.GRAPHS}/graph_vzduch_${year}.gif?${ms}`}
        />
      </article>
    </>
  );
};
