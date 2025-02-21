import { universalGet, useGetWeatherConfigWithData } from 'features/meteo';

import { FullscreenHeader } from '../FullscreenHeader';
import { GraphsDataWithGetDataFn, OnePage } from './OnePage';

const getTextDateFromNewDate = (updDate: Date) => {
  return `${updDate.getFullYear()}-${('0' + (updDate.getMonth() + 1)).slice(
    -2
  )}-${('0' + updDate.getDate()).slice(-2)}`;
};

type UniversalGraphsType = {
  graphsConfig: GraphsDataWithGetDataFn[];
  startDate?: string;
  endDate?: string;
};

export const UniversalGraphs = ({
  graphsConfig,
  startDate,
  endDate,
}: UniversalGraphsType) => {
  const queries = useGetWeatherConfigWithData(graphsConfig, startDate, endDate);

  const queriesData = queries.map((query) => query.data);

  if (queriesData.some((queryData) => queryData === undefined)) {
    return null;
  }

  const loadDataFunction = async (
    start = getTextDateFromNewDate(
      new Date(new Date().setFullYear(new Date().getFullYear() - 1))
    ),
    end = getTextDateFromNewDate(new Date()),
    index = 999
  ) => {
    const graphsConfigFiltered =
      index === 999 ? graphsConfig : [graphsConfig[index]];

    return await universalGet({
      sort: 'ASC',
      requestType: 'date',
      startDate: start,
      endDate: end,
      orderBy: graphsConfigFiltered[0].common.dateField,
      url: graphsConfigFiltered[0].common.url,
    });
  };

  const graphsDataWithGetDataFn = graphsConfig.map((graphConfig, index) => ({
    ...graphConfig,
    common: {
      ...graphConfig.common,
      data: queriesData[index],
      loadDataFunction,
    },
  }));

  return (
    <>
      <FullscreenHeader />
      <OnePage graphsDataWithGetDataFn={graphsDataWithGetDataFn} />
    </>
  );
};
