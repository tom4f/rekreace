import { graphDataWithoutFunctionType } from './TypeDefinition';
import { OnePage } from './OnePage';
import graphsConfig from './../config/lipno-graphs.json';
import { loadPocasiAsync } from '../api/loadPocasiAsync';
import { useState, useCallback, useEffect } from 'react';
import { FullscreenHeader } from './FullscreenHeader';

const getTextDateFromNewDate = (updDate: Date) => {
  return `${updDate.getFullYear()}-${('0' + (updDate.getMonth() + 1)).slice(
    -2
  )}-${('0' + updDate.getDate()).slice(-2)}`;
};

const loadPocasiAsyncCustom = async (
  start = getTextDateFromNewDate(
    new Date(new Date().setFullYear(new Date().getFullYear() - 1))
  ),
  end = getTextDateFromNewDate(new Date()),
  index = 999
) => {
  return (await loadPocasiAsync(
    start,
    end,
    index,
    graphsConfig
  )) as graphDataWithoutFunctionType[];
};

export const LipnoGraphs = () => {
  const [graphsData, setGraphsData] = useState(graphsConfig);

  const load = useCallback(async () => {
    const data = (await loadPocasiAsyncCustom(
      undefined,
      undefined,
      999
    )) as graphDataWithoutFunctionType[];
    setGraphsData([{ ...graphsConfig[0], data: data[0].data }]);
  }, []);

  useEffect(() => {
    (async () => await load())();
  }, [load]);

  return (
    <>
      <FullscreenHeader />
      <OnePage
        graphsData={graphsData}
        loadPocasiAsyncCustom={loadPocasiAsyncCustom}
      />
    </>
  );
};
