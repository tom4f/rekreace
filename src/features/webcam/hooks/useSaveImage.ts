import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Url } from 'api/paths';
import { api } from 'api/utils';

export type WebCamResponse = {
  timestamp: string;
};

export const GET_WEBCAM_ENDPOINT = `${Url.NEW_API}/webcam/get_ip_kamera.php`;
export const GET_WEBCAM_KEY = 'getWebCam';

const saveImage = async (): Promise<WebCamResponse> => {
  const response = await api.post({
    url: GET_WEBCAM_ENDPOINT,
  });

  return response.data;
};

export const useSaveImage = () => {
  return useQuery({
    queryKey: [GET_WEBCAM_KEY],
    queryFn: () => saveImage(),
    refetchInterval: 10000,
    placeholderData: keepPreviousData,
  });
};
