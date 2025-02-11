import { Url } from 'api/paths';
import { Header } from 'components/Atoms';
import {
  changeDate,
  PeriodType,
  StepType,
  useDateContext,
} from 'components/Meteo/context/';

export const LipnoGraph = () => {
  const {
    date: { lipnoDaily },
    dispatch,
  } = useDateContext();

  const year = lipnoDaily.getFullYear();
  const ms = lipnoDaily.getMilliseconds();

  const setDate = (period: PeriodType, step: StepType) => {
    dispatch({
      type: 'UPDATE_DATE',
      payload: {
        meteoDataSource: 'lipnoDaily',
        meteoDate: changeDate('lipnoDaily', lipnoDaily, period, step),
      },
    });
  };

  return (
    <>
      <Header>
        <button
          className='text-zinc-500 hover:text-orange-400'
          onClick={() => setDate('year', -1)}
        >
          &nbsp;
          {'<'}&nbsp;
        </button>
        {year}
        <button
          className='text-zinc-500 hover:text-orange-400'
          onClick={() => setDate('year', +1)}
        >
          &nbsp;
          {'>'}&nbsp;
        </button>
        <button
          className='text-zinc-500 hover:text-orange-400'
          onClick={() =>
            dispatch({
              type: 'RESET_DATE',
              payload: {
                meteoDataSource: 'lipnoDaily',
              },
            })
          }
        >
          Reset
        </button>
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
