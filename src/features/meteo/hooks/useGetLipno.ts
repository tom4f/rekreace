import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { Url } from '../../../api/paths';
import { api } from '../../../api/utils';
import { MeteoGetKey } from './useLoadWeather';

type BaseMeteoRequest = {
  orderBy: string;
  sort: 'DESC' | 'ASC';
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

export type LipnoResponse = {
  id: number;
  datum: string;
  cas: string | null;
  hladina: number;
  pritok: number;
  odtok: number;
  voda: number;
  vzduch: number;
  pocasi: string;
}[];

export const GET_LIPNO_ENDPOINT = `${Url.NEW_API}/meteo/read_pocasi.php`;
export const GET_LIPNO_KEY = MeteoGetKey.LIPNO;

const getLipno = async (request: MeteoRequest): Promise<LipnoResponse> => {
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
    url: `${GET_LIPNO_ENDPOINT}?${params.toString()}`,
  });

  return data;
};

export const useGetLipno = (request: MeteoRequest) => {
  return useQuery({
    queryKey: [
      GET_LIPNO_KEY,
      request.requestType === 'amount' ? request.start : request.startDate,
      request.requestType === 'amount' ? request.limit : request.endDate,
      request.orderBy,
      request.sort,
    ],
    queryFn: () => getLipno(request),
    refetchInterval: request.refetchInterval ?? 0,
    placeholderData: keepPreviousData,
  });
};
