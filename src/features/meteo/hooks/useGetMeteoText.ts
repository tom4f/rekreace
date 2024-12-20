import { useQuery } from '@tanstack/react-query';
import { Url } from '../../../api/paths';
import { apiGet } from '../../../api/utils/get';

export const GET_METEO_TEXT_ENDPOINT = `${Url.DAVIS}/lipnonet_meteo.txt`;
export const GET_METEO_TEXT_KEY = 'getMeteoText';

const getMeteoText = async (): Promise<string> => {
  const response = await apiGet({
    url: GET_METEO_TEXT_ENDPOINT,
    responseType: 'text',
  });
  return response;
};

export const useGetMeteoText = () => {
  return useQuery({
    queryKey: [GET_METEO_TEXT_KEY],
    queryFn: () => getMeteoText(),
    refetchInterval: 10000, // Refetch every 10 seconds
  });
};
