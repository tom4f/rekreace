import { useLoadWeatherFromFile } from '../api/useLoadWeatherFromFile';
import graphsConfig from './../config/davis-day-graphs.json';
import DavisGraphsDayStyle from './../css/DavisGraphsDay.module.css';
import { OnePage } from './OnePage';
import { FullscreenHeader } from './FullscreenHeader';

export const DavisGraphsDay = () => {
  const { graphsData, isFetching, isSuccess, isSuccessPercentages } =
    useLoadWeatherFromFile(graphsConfig);
  const ShowLoading = ({
    isFetching,
    isSuccessPercentages,
  }: {
    isFetching: boolean;
    isSuccessPercentages: number;
  }) => {
    return isFetching ? (
      <div className={DavisGraphsDayStyle.isLoading}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='100'
          height='100'
          overflow='visible'
          stroke='#FFF'
          strokeWidth='1'
        >
          <text
            x='50%'
            y='50%'
            dominantBaseline='middle'
            textAnchor='middle'
            fontSize='20'
            fill='#000'
          >
            {isSuccessPercentages}%
          </text>
          <circle
            pathLength='1'
            cx='50'
            cy='50'
            r='40'
            stroke='#ff0'
            strokeWidth='20'
            fill='#ff0'
          />
        </svg>
      </div>
    ) : null;
  };

  return (
    <>
      <FullscreenHeader />
      <ShowLoading
        isFetching={isFetching}
        isSuccessPercentages={isSuccessPercentages}
      />

      {isSuccess && (
        <OnePage
          graphsData={graphsData}
          loadPocasiAsyncCustom={async () => await []}
        />
      )}
    </>
  );
};
