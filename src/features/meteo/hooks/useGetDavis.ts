import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Url } from 'src/api/paths';
import { api } from 'src/api/utils';

import { MeteoGetKey } from './useLoadWeather';

type BaseMeteoRequest = {
  orderBy: string;
  sort: string;
  refetchInterval?: number;
};

type MeteoDateRequest = BaseMeteoRequest & {
  startDate?: Date;
  endDate?: Date;
  requestType: 'date';
};

type MeteoAmountRequest = BaseMeteoRequest & {
  start?: number;
  limit?: number;
  requestType: 'amount';
};

type MeteoRequest = MeteoDateRequest | MeteoAmountRequest;

export type DavisResponse = {
  date: string;
  temp_mean: number;
  temp_high: number;
  temp_high_time: string;
  temp_low: number;
  temp_low_time: string;
  heat_deg_days: number;
  cool_deg_days: number;
  rain: number;
  wind_speed_avg: number;
  wind_speed_high: number;
  wind_speed_high_time: string;
  dir: string;
  wind3: number;
  wind6: number;
  wind9: number;
  wind12: number;
  bar_min: number;
  bar_avg: number;
  bar_max: number;
  huminidy_min: number;
  huminidy_avg: number;
  huminidy_max: number;
  air_density_min: number;
  air_density_avg: number;
  air_density_max: number;
  rain_rate_max: number;
}[];

export const GET_DAVIS_ENDPOINT = `${Url.NEW_API}/meteo/read_davis.php`;
export const GET_DAVIS_KEY = MeteoGetKey.DAVIS;

const getDavis = async (request: MeteoRequest): Promise<DavisResponse> => {
  const params = new URLSearchParams();
  if (request?.orderBy !== undefined) {
    params.append('orderBy', request.orderBy);
  }
  if (request?.sort !== undefined) {
    params.append('sort', request.sort);
  }

  if (request.requestType === 'amount') {
    if (request?.start !== undefined) {
      params.append('start', request.start.toString());
    }
    if (request?.limit !== undefined) {
      params.append('limit', request.limit.toString());
    }
  }

  if (request.requestType === 'date') {
    if (request?.startDate !== undefined) {
      params.append('startDate', request.startDate.toString());
    }
    if (request?.endDate !== undefined) {
      params.append('endDate', request.endDate.toString());
    }
  }

  const data = await api.get({
    url: `${GET_DAVIS_ENDPOINT}?${params.toString()}`,
  });

  return data;
};

export const useGetDavis = (request: MeteoRequest) => {
  return useQuery({
    queryKey: [
      GET_DAVIS_KEY,
      request.requestType === 'amount' ? request.start : request.startDate,
      request.requestType === 'amount' ? request.limit : request.endDate,
      request.orderBy,
      request.sort,
    ],
    queryFn: () => getDavis(request),
    refetchInterval: request.refetchInterval ?? 0,
    placeholderData: keepPreviousData,
  });
};
