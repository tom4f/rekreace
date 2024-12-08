import { useState, useEffect } from 'react';
import { loadPocasiAsyncFromFile } from '../api/loadPocasiAsyncFromFile';
import graphsConfig from './../config/davis-day-graphs.json';
import DavisGraphsDayStyle from './../css/DavisGraphsDay.module.css';
import { OnePage } from './OnePage';
import { FullscreenHeader } from './FullscreenHeader';

export const DavisGraphsDay = () => {
  const [isGraphLoading, setIsGraphLoading] = useState(true);
  const [graphsData, setGraphsData] = useState(graphsConfig);

  let loadPocasiAsyncCustomFromFile = undefined;
  loadPocasiAsyncCustomFromFile = async () => {
    const graphsData = await loadPocasiAsyncFromFile(graphsConfig);
    setIsGraphLoading(!!graphsData[0]?.data[0]?.dummy);

    return graphsData;
  };

  useEffect(() => {
    (async () => {
      const data1 = await loadPocasiAsyncCustomFromFile();
      setGraphsData([{ ...graphsConfig[0], data: data1[0]?.data }]);
    })();
  }, []);

  const ShowLoading = ({ isGraphLoading }: { isGraphLoading: boolean }) => {
    return isGraphLoading ? (
      <div className={DavisGraphsDayStyle.isLoading}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='100'
          height='100'
          overflow='visible'
          stroke='#FFF'
          strokeWidth='1'
        >
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
      <ShowLoading isGraphLoading={isGraphLoading} />
      <OnePage
        graphsData={graphsData}
        loadPocasiAsyncCustom={loadPocasiAsyncCustomFromFile}
      />
    </>
  );
};
