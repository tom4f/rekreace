import { Url } from 'api/paths';
import { Header } from 'components/Atoms';
import {
  changeDate,
  PeriodType,
  StepType,
  useDateContext,
} from 'components/Meteo/context';
import ShowDayGraphStyle from 'components/Meteo/css/ShowDayGraph.module.css';
import { NavLink, useLocation } from 'react-router-dom';

export const DavisGraph = () => {
  const { search } = useLocation();
  const isFullscreen =
    new URLSearchParams(search).get('fullscreen') === 'true' || false;

  const toggleFullscreen = isFullscreen
    ? '?fullscreen=false'
    : '?fullscreen=true';
  const {
    date: { davisDaily },
    dispatch,
  } = useDateContext();

  const year = davisDaily.getFullYear();
  const month = davisDaily.getMonth() + 1;
  const day = davisDaily.getDate();

  const monthString = month < 10 ? `0${month}` : `${month}`;
  const dayString = day < 10 ? `0${day}` : `${day}`;

  const imgUrl = (type: string) =>
    `${Url.DAVIS}/archive/${year}/${type}-${year}-${monthString}-${dayString}.gif`;

  const setDate = (period: PeriodType, step: StepType) => {
    dispatch({
      type: 'UPDATE_DATE',
      payload: {
        meteoDataSource: 'davisDaily',
        meteoDate: changeDate('davisDaily', davisDaily, period, step),
      },
    });
  };

  return (
    <>
      <Header id='detail_graphs'>
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
        <button
          className='text-zinc-500 hover:text-orange-400'
          onClick={() =>
            dispatch({
              type: 'RESET_DATE',
              payload: {
                meteoDataSource: 'davisDaily',
              },
            })
          }
        >
          Reset
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
