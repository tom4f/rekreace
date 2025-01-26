import { useQueries } from '@tanstack/react-query';
import { GraphsDataWithGetDataFn, PureData } from 'components/Meteo';

import { MeteoRequest, universalGet } from './useUniversalGet';

export enum MeteoGetKey {
  DAVIS = 'getDavis',
  OLD_STATION = 'getOldStation',
  LIPNO = 'getLipno',
  TEXT = 'getText',
  NOAA = 'getTextNoaa',
  DOWNLD02 = 'getTextDownld02',
}

const urlToMeteoGetKey: { [key: string]: MeteoGetKey } = {
  '/api/meteo/read_davis.php': MeteoGetKey.DAVIS,
  '/api/meteo/read_old_station.php': MeteoGetKey.OLD_STATION,
  '/api/meteo/read_pocasi.php': MeteoGetKey.LIPNO,
};

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
  graphsConfig: GraphsDataWithGetDataFn[],
  start?: string,
  end?: string
) => {
  const startDate =
    start ||
    getTextDateFromNewDate(
      new Date(new Date().setFullYear(new Date().getFullYear() - 1))
    );
  const endDate = end || getTextDateFromNewDate(new Date());

  const queries = graphsConfig.map((graphConfig) => {
    const request: MeteoRequest = {
      startDate,
      endDate,
      orderBy: graphConfig.common.dateField,
      sort: 'ASC',
      url: graphConfig.common.url,
      requestType: 'date',
    };

    return {
      queryKey: [
        urlToMeteoGetKey[graphConfig.common.url],
        startDate,
        endDate,
        request.orderBy,
        request.sort,
      ],
      queryFn: () => universalGet(request),
      select: (response: PureData[]) => {
        return response;
      },
    };
  });

  return useQueries({ queries });
};
