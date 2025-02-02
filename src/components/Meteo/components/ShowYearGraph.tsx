import { Url } from 'api/paths';
import { Header } from 'components/Atoms';
import { useContext } from 'react';

import { changeDate } from './changeDate';
import { DateContext } from './DateContext';

export const ShowYearGraph = () => {
  const {
    date: { yearSum },
    reduceDate,
  } = useContext(DateContext);

  const year = yearSum.getFullYear();
  const ms = yearSum.getMilliseconds();

  return (
    <>
      <Header>
        Roční graf - vyberte rok :&nbsp;
        <button
          className='text-zinc-500 hover:text-orange-400'
          onClick={() =>
            reduceDate('yearSum', changeDate('yearSum', yearSum, 'year', -1))
          }
        >
          {' '}
          &nbsp; {'<'} &nbsp;{' '}
        </button>
        &nbsp;
        {year}&nbsp;
        <button
          className='text-zinc-500 hover:text-orange-400'
          onClick={() =>
            reduceDate('yearSum', changeDate('yearSum', yearSum, 'year', +1))
          }
        >
          {' '}
          &nbsp; {'>'} &nbsp;{' '}
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
