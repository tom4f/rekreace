import { useQuery } from '@tanstack/react-query';
import { Url } from '../../../api/paths';
import { api } from '../../../api/utils';

export type OneMessage = {
  id: number;
  datum: string;
  text: string;
  jmeno: string;
  email?: string;
  typ: number;
};

type MeteoRequest = {
  start: Date;
  end: Date;
  orderBy: string;
  sort: string;
};

export type DavisResponse = {
  date: string;
  temp_mean: string;
  temp_high: string;
  temp_high_time: string;
  temp_low: string;
  temp_low_time: string;
  heat_deg_days: string;
  cool_deg_days: string;
  rain: string;
  wind_speed_avg: string;
  wind_speed_high: string;
  wind_speed_high_time: string;
  dir: string;
  wind3: number;
  wind6: number;
  wind9: number;
  wind12: number;
  bar_min: string;
  bar_avg: string;
  bar_max: string;
  huminidy_min: string;
  huminidy_avg: string;
  huminidy_max: string;
  air_density_min: string;
  air_density_avg: string;
  air_density_max: string;
  rain_rate_max: string;
};

export const GET_DAVIS_ENDPOINT = `${Url.NEW_API}/meteo/read.php?{start}{end}{orderBy}{sort}`;
export const GET_DAVIS_KEY = 'getDavis';

const getDavis = async (request: MeteoRequest): Promise<DavisResponse> => {
  const data = await api.get({
    url: GET_DAVIS_ENDPOINT.replace('{start}', `&start=${request.start}`)
      .replace('{end}', `&end=${request.end.toString()}`)
      .replace('{orderBy}', `&orderBy=${request.orderBy.toString()}`)
      .replace('{sort}', `&sort=${request.sort.toString()}`),
  });

  return data;
};

export const useGetDavis = (request: MeteoRequest) => {
  return useQuery({
    queryKey: [
      GET_DAVIS_KEY,
      request.start,
      request.end,
      request.orderBy,
      request.sort,
    ],
    queryFn: () => getDavis(request),
  });
};
