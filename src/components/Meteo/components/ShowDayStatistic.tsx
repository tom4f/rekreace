import { useContext } from 'react';
import { ChangeDate } from './ChangeDate';
import { DateContext } from './DateContext';
import { Header } from '../../Atoms';
import { useGetNOAA } from '../../../features/meteo';

export const ShowDayStatistic = () => {
  const {
    date: { davisStat },
    reduceDate,
  } = useContext(DateContext);

  const year = davisStat.getFullYear();
  const month = `0${davisStat.getMonth() + 1}`.slice(-2);

  const queries = useGetNOAA(year.toString(), month);

  const setDate = (period: string, step: 1 | -1) => {
    reduceDate('davisStat', ChangeDate('davisStat', davisStat, period, step));
  };

  return (
    <>
      <Header>
        {
          <span style={{ color: queries[0].isFetching ? 'lime' : 'unset' }}>
            Rok
          </span>
        }{' '}
        /{' '}
        {
          <span style={{ color: queries[1].isFetching ? 'lime' : 'unset' }}>
            měsíc &nbsp;
          </span>
        }
        <button
          className='text-zinc-500 hover:text-orange-400'
          onClick={() => setDate('month', -1)}
        >
          {' '}
          {'<'}{' '}
        </button>
        &nbsp;{month}&nbsp;
        <button
          className='text-zinc-500 hover:text-orange-400'
          onClick={() => setDate('month', +1)}
        >
          {' '}
          {'>'}{' '}
        </button>
        &nbsp;/&nbsp;
        <button
          className='text-zinc-500 hover:text-orange-400'
          onClick={() => setDate('year', -1)}
        >
          {' '}
          {'<'}{' '}
        </button>
        &nbsp;{year}&nbsp;
        <button
          className='text-zinc-500 hover:text-orange-400'
          onClick={() => setDate('year', +1)}
        >
          {' '}
          {'>'}{' '}
        </button>
      </Header>

      <article className='w-fit'>
        <section className='text-sm font-mono whitespace-pre text-left text-white'>
          {queries[1].data}
          {queries[1].isError && <div>Error fetching the text files</div>}
        </section>
      </article>

      <Header>
        {
          <span style={{ color: queries[0].isFetching ? 'lime' : 'unset' }}>
            Rok
          </span>
        }
        &nbsp;
        <button
          className='text-zinc-500 hover:text-orange-400'
          onClick={() => setDate('year', -1)}
        >
          {' '}
          {'<'}{' '}
        </button>
        {year}
        <button
          className='text-zinc-500 hover:text-orange-400'
          onClick={() => setDate('year', +1)}
        >
          {' '}
          {'>'}{' '}
        </button>
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
