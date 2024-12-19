import { useContext, useEffect, useState } from 'react';
import { ChangeDate } from './ChangeDate';
import { DateContext } from './DateContext';
import { Url } from '../../../api/paths';
import { Header } from '../../Atoms';

export const ShowDayStatistic = () => {
  const {
    date: { davisStat },
    reduceDate,
  } = useContext(DateContext);

  const [davisText, setDavisText] = useState({
    month: '',
    year: '',
  });

  const year = davisStat.getFullYear();
  const month = `0${davisStat.getMonth() + 1}`.slice(-2);

  useEffect(() => {
    const setDavis: () => void = async () => {
      const urlList = [
        `${Url.DAVIS}/archive/${year}/NOAAMO-${year}-${month}.TXT`,
        `${Url.DAVIS}/archive/${year}/NOAAYR-${year}.TXT`,
      ];
      const fetchList = urlList.map((url) =>
        fetch(url).then((resp) => resp.text())
      );
      const settled = await Promise.allSettled(fetchList);
      const respFulfilled = settled.map((onePromise) =>
        onePromise.status === 'fulfilled' ? onePromise.value : ''
      );
      setDavisText({
        month: respFulfilled[0],
        year: respFulfilled[1],
      });
    };
    setDavis();
  }, [year, month]);

  const setDate = (period: string, step: 1 | -1) => {
    reduceDate('davisStat', ChangeDate('davisStat', davisStat, period, step));
  };

  return (
    <>
      <Header>
        Rok / měsíc:&nbsp;
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
        <section className='text-sm font-mono whitespace-pre text-left'>
          {davisText.month}
        </section>
      </article>

      <Header>
        Rok :
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
        <section className='text-sm font-mono whitespace-pre text-left'>
          {davisText.year}
        </section>
      </article>
    </>
  );
};
