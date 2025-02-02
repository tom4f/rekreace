import { Url } from 'api/paths';
import { Header } from 'components/Atoms';
import { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import ShowDayGraphStyle from './../css/ShowDayGraph.module.css';
import { changeDate } from './changeDate';
import { DateContext } from './DateContext';

export const ShowDayGraph = () => {
  const { search } = useLocation();
  const isFullscreen =
    new URLSearchParams(search).get('fullscreen') === 'true' || false;

  const toggleFullscreen = isFullscreen
    ? '?fullscreen=false'
    : '?fullscreen=true';
  const {
    date: { daily },
    reduceDate,
  } = useContext(DateContext);

  const year = daily.getFullYear();
  const month = daily.getMonth() + 1;
  const day = daily.getDate();

  const monthString = month < 10 ? `0${month}` : `${month}`;
  const dayString = day < 10 ? `0${day}` : `${day}`;

  const imgUrl = (type: string) =>
    `${Url.DAVIS}/archive/${year}/${type}-${year}-${monthString}-${dayString}.gif`;

  const setDate = (period: string, step: 1 | -1) => {
    reduceDate('daily', changeDate('daily', daily, period, step));
  };

  return (
    <>
      <Header id='detail_graphs'>
        Den.měsíc.rok:&nbsp;&nbsp;
        <button
          className='text-zinc-500 hover:text-orange-400'
          onClick={() => setDate('day', -1)}
        >
          &nbsp;
          {'<'}&nbsp;
        </button>
        {dayString}
        <button
          className='text-zinc-500 hover:text-orange-400'
          onClick={() => setDate('day', +1)}
        >
          &nbsp;
          {'>'}&nbsp;
        </button>
        .
        <button
          className='text-zinc-500 hover:text-orange-400'
          onClick={() => setDate('month', -1)}
        >
          &nbsp;
          {'<'}&nbsp;
        </button>
        {monthString}
        <button
          className='text-zinc-500 hover:text-orange-400'
          onClick={() => setDate('month', +1)}
        >
          &nbsp;
          {'>'}&nbsp;
        </button>
        .
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
      </Header>
      <article className={ShowDayGraphStyle.dayGraph}>
        <NavLink className='menu' to={toggleFullscreen}>
          <img alt='wind' src={imgUrl('wind')} />
          <img alt='temp' src={imgUrl('temp')} />
          <img alt='bar' src={imgUrl('bar')} />
        </NavLink>
      </article>
    </>
  );
};
