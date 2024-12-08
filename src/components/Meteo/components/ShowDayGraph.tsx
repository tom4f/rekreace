import { useContext } from 'react';
import ShowDayGraphStyle from './../css/ShowDayGraph.module.css';
import { ChangeDate } from './ChangeDate';
import { DateContext } from './DateContext';
import { Url } from '../../../api/paths';
import { useLocation, NavLink } from 'react-router-dom';

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
  const imgBig = `${Url.BIG_GRAPH}?width_graph=1480&year=${year}&id=${year}-${monthString}-${dayString}`;

  const setDate = (period: string, step: 1 | -1) => {
    reduceDate('daily', ChangeDate('daily', daily, period, step));
  };

  return (
    <>
      <header id='detail_graphs' className='header'>
        Den.měsíc.rok:&nbsp;&nbsp;
        <button onClick={() => setDate('day', -1)}> {'<'} </button>
        {dayString}
        <button onClick={() => setDate('day', +1)}> {'>'} </button>.
        <button onClick={() => setDate('month', -1)}> {'<'} </button>
        {monthString}
        <button onClick={() => setDate('month', +1)}> {'>'} </button>.
        <button onClick={() => setDate('year', -1)}> {'<'} </button>
        {year}
        <button onClick={() => setDate('year', +1)}> {'>'} </button>
      </header>
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
