import { useQueries } from '@tanstack/react-query';

import { universalGet, MeteoRequest } from './useUniversalGet';
import {
  GraphsDataWithGetDataFn,
  PureData,
} from 'src/components/Meteo/components/OnePage';

export const useLoadWeather = (requests: MeteoRequest[]) => {
  const loadWeather = (request: MeteoRequest) =>
    universalGet({
      startDate: request.startDate,
      endDate: request.endDate,
      orderBy: request.orderBy,
      sort: request.sort,
      url: request.url,
      requestType: request.requestType,
    });

  const queries = requests.map((request) => ({
    queryKey: [request.url],
    queryFn: () => loadWeather(request),
  }));

  return useQueries({ queries });
};

const getTextDateFromNewDate = (updDate: Date) => {
  return `${updDate.getFullYear()}-${('0' + (updDate.getMonth() + 1)).slice(
    -2
  )}-${('0' + updDate.getDate()).slice(-2)}`;
};

export const useGetWeatherConfigWithData = (
  graphsConfig: GraphsDataWithGetDataFn[]
) => {
  const queries = graphsConfig.map((graphConfig) => {
    const request: MeteoRequest = {
      startDate: getTextDateFromNewDate(
        new Date(new Date().setFullYear(new Date().getFullYear() - 1))
      ),
      endDate: getTextDateFromNewDate(new Date()),
      orderBy: graphConfig.common.dateField,
      sort: 'ASC',
      url: graphConfig.common.url,
      requestType: 'date',
    };

    return {
      queryKey: [graphConfig.common.url],
      queryFn: () => universalGet(request),
      select: (response: PureData[]) => {
        return response;
      },
    };
  });

  return useQueries({ queries });
};
