import { Header } from 'components/Atoms';
import {
  DateButton,
  DateChangeBlock,
  DavisGifGraph,
  DavisGraphTypes,
} from 'components/Meteo';
import {
  changeDate,
  PeriodType,
  StepType,
  useDateStore,
} from 'components/Meteo/zustandStore';
import { NavLink, useLocation } from 'react-router-dom';
import { getDateParts } from 'utils';

export const DavisGraph = () => {
  const { search } = useLocation();
  const isFullscreen = new URLSearchParams(search).get('fullscreen') === 'true';

  const toggleFullscreen = `?fullscreen=${!isFullscreen}`;

  const { updateDate, resetDate } = useDateStore();
  const davisDaily = useDateStore((state) => state.dates.davisDaily);

  const { year, month, day } = getDateParts(davisDaily);

  const setDate = (period: PeriodType, step: StepType) => {
    updateDate(
      'davisDaily',
      changeDate('davisDaily', davisDaily, period, step)
    );
  };

  return (
    <>
      <Header id='detail_graphs'>
        <DateChangeBlock setDate={setDate} period='day' text={day} />.
        <DateChangeBlock setDate={setDate} period='month' text={month} />.
        <DateChangeBlock setDate={setDate} period='year' text={year} />.
        <DateButton onClick={() => resetDate('davisDaily')}>Reset</DateButton>
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
