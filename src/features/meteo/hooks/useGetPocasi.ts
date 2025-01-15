import { useQuery } from '@tanstack/react-query';
import { Url } from '../../../api/paths';
import { api } from '../../../api/utils';

type BaseMeteoRequest = {
  orderBy: string;
  sort: string;
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

export type PocasiResponse = {
  id: number;
  datum: string;
  cas: string;
  hladina: number;
  pritok: number;
  odtok: number;
  voda: number;
  vzduch: number;
  pocasi: string;
}[];

export const GET_POCASI_ENDPOINT = `${Url.NEW_API}/meteo/read_pocasi.php`;
export const GET_POCASI_KEY = 'getPocasi';

const getPocasi = async (request: MeteoRequest): Promise<PocasiResponse> => {
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
    url: `${GET_POCASI_ENDPOINT}?${params.toString()}`,
  });

  return data;
};

export const useGetPocasi = (request: MeteoRequest) => {
  return useQuery({
    queryKey: [
      GET_POCASI_KEY,
      request.requestType === 'amount' ? request.start : request.startDate,
      request.requestType === 'amount' ? request.limit : request.endDate,
      request.orderBy,
      request.sort,
    ],
    queryFn: () => getPocasi(request),
    refetchInterval: 10000,
  });
};
