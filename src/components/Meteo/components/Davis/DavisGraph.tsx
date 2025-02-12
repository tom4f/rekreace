import { Header } from 'components/Atoms';
import { DateChangeBlock, DavisGraphTypes } from 'components/Meteo';
import {
  changeDate,
  PeriodType,
  StepType,
  useDateContext,
} from 'components/Meteo/context';
import { NavLink, useLocation } from 'react-router-dom';
import { getDateParts } from 'utils';

import { DavisGifGraph } from './DavisGifGraph';

export const DavisGraph = () => {
  const { search } = useLocation();
  const isFullscreen = new URLSearchParams(search).get('fullscreen') === 'true';

  const toggleFullscreen = `?fullscreen=${!isFullscreen}`;
  const {
    date: { davisDaily },
    dispatch,
  } = useDateContext();

  const { year, month, day } = getDateParts(davisDaily);

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
        <DateChangeBlock setDate={setDate} period='day' day={day} />.
        <DateChangeBlock setDate={setDate} period='month' day={month} />.
        <DateChangeBlock setDate={setDate} period='year' day={year} />.
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
          &nbsp;Reset
        </button>
      </Header>
      <NavLink to={toggleFullscreen}>
        <DavisGifGraph
          davisDaily={davisDaily}
          graphType={DavisGraphTypes.WIND}
        />
        <DavisGifGraph
          davisDaily={davisDaily}
          graphType={DavisGraphTypes.TEMP}
        />
        <DavisGifGraph
          davisDaily={davisDaily}
          graphType={DavisGraphTypes.BAR}
        />
      </NavLink>
    </>
  );
};
