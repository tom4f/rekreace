import { Url } from 'api/paths';
import { Header } from 'components/Atoms';
import {
  changeDate,
  PeriodType,
  StepType,
  useDateContext,
} from 'components/Meteo/context';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { DateButton, GraphObject } from '../MeteoComponents';

export const DavisGraph = () => {
  const { search } = useLocation();
  const isFullscreen = new URLSearchParams(search).get('fullscreen') === 'true';

  const toggleFullscreen = `?fullscreen=${!isFullscreen}`;
  const {
    date: { davisDaily },
    dispatch,
  } = useDateContext();

  const [renderCounter, setRenderCounter] = useState(0);

  useEffect(() => {
    setRenderCounter((orig) => orig + 1);
  }, [davisDaily]);

  const year = davisDaily.getFullYear();
  const monthString = String(davisDaily.getMonth() + 1).padStart(2, '0');
  const dayString = String(davisDaily.getDate()).padStart(2, '0');

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
        <DateButton onClick={() => setDate('day', -1)}>{'<'}</DateButton>
        {dayString}
        <DateButton onClick={() => setDate('day', +1)}>{'>'}</DateButton>.
        <DateButton onClick={() => setDate('month', -1)}>{'<'}</DateButton>
        {monthString}
        <DateButton onClick={() => setDate('month', +1)}>{'>'}</DateButton>.
        <DateButton onClick={() => setDate('year', -1)}>{'<'}</DateButton>
        {year}
        <DateButton onClick={() => setDate('year', +1)}>{'>'};</DateButton>
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
      <NavLink
        key={renderCounter}
        to={toggleFullscreen}
        className='text-zinc-500 hover:text-orange-400'
      >
        <GraphObject src={imgUrl('wind')} altText='Wind graph not exists' />
        <GraphObject
          src={imgUrl('temp')}
          altText='Temperature graph not exists'
        />
        <GraphObject src={imgUrl('bar')} altText='Bar graph not exists' />
      </NavLink>
    </>
  );
};
