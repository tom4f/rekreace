import { useQuery } from '@tanstack/react-query';
import { Url } from 'api/paths';
import { api } from 'api/utils';

type BaseMeteoRequest = {
  orderBy: string;
  sort: string;
  refetchInterval?: 10000;
};

type MeteoDateRequest = BaseMeteoRequest & {
  startDate?: string;
  endDate?: string;
  requestType: 'date';
};

type MeteoAmountRequest = BaseMeteoRequest & {
  start?: number;
  limit?: number;
  requestType: 'amount';
};

type MeteoRequest = MeteoDateRequest | MeteoAmountRequest;

export type OldStationResponse = {
  wind3: number;
  wind6: number;
  wind9: number;
  wind12: number;
  windmax: number;
  direct: number;
  tempmin: number;
  tempavg: number;
  tempmax: number;
  rain: number;
  //rain_rate_max: number;
  date: string;
}[];

export const GET_OLD_STATION_ENDPOINT = `${Url.NEW_API}/meteo/read_old_station.php`;
export const GET_OLD_STATION_KEY = 'getOldStation';

const getOldStation = async (
  request: MeteoRequest
): Promise<OldStationResponse> => {
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
    url: `${GET_OLD_STATION_ENDPOINT}?${params.toString()}`,
  });

  return data;
};

export const useGetOldStation = (request: MeteoRequest) => {
  return useQuery({
    queryKey: [
      GET_OLD_STATION_KEY,
      request.requestType === 'amount' ? request.start : request.startDate,
      request.requestType === 'amount' ? request.limit : request.endDate,
      request.orderBy,
      request.sort,
    ],
    queryFn: () => getOldStation(request),
    refetchInterval: request.refetchInterval ?? 0,
  });
};
