import { useQuery } from '@tanstack/react-query';
import { Url } from '../../../api/paths';
import { api } from '../../../api/utils';
import { PureData } from 'src/components/Meteo/components/OnePage';

export type MeteoRequest = {
  startDate?: string;
  endDate?: string;
  orderBy: string;
  sort: string;
  refetchInterval?: 10000;
  url: string;
  requestType: 'amounth' | 'date';
};

export const GET_UNIVERSAL_ENDPOINT = `${Url.NEW_API}{{meteoUrl}}`;
export const GET_UNIVERSAL_KEY = 'universalGet';

export const universalGet = async (
  request: MeteoRequest
): Promise<PureData[]> => {
  const params = new URLSearchParams();
  if (request?.orderBy !== undefined) {
    params.append('orderBy', request.orderBy);
  }
  if (request?.sort !== undefined) {
    params.append('sort', request.sort);
  }
  if (request?.startDate !== undefined) {
    params.append('startDate', request.startDate.toString());
  }
  if (request?.endDate !== undefined) {
    params.append('endDate', request.endDate.toString());
  }
  if (request?.requestType !== undefined) {
    params.append('requestType', request.requestType.toString());
  }
  const data = await api.get({
    url: `${request.url}?${params.toString()}`,
  });

  return data;
};

export const useUniversalGet = (request: MeteoRequest) => {
  return useQuery({
    queryKey: [
      GET_UNIVERSAL_KEY,
      request.url,
      request.startDate,
      request.endDate,
      request.orderBy,
      request.sort,
    ],
    queryFn: () => universalGet(request),
    refetchInterval: request.refetchInterval ?? 0,
  });
};
