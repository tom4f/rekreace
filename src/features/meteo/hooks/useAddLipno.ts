import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Url } from '../../../api/paths';
import { api } from '../../../api/utils';
import { MeteoGetKey } from './useLoadWeather';

export type AddLipnoRequest = {
  datum: string;
  hladina: number;
  pritok: number;
  odtok: number;
  voda: number;
  vzduch: number;
  pocasi: string;
  webToken: string;
  webUser: string;
  fotoGalleryOwner: string;
};

type AddLipnoResponse = {
  result: string;
};

export type AddLipnoErrorResponse = AxiosError & {
  data: { result: string };
};

export const ADD_LIPNO_ENDPOINT = `${Url.NEW_API}/meteo/add_lipno.php`;
export const ADD_LIPNO_KEY = 'addLipno';

const addLipno = async (
  request: AddLipnoRequest
): Promise<AddLipnoResponse> => {
  const { data } = await api
    .post({
      url: ADD_LIPNO_ENDPOINT,
      data: request,
    })
    .catch((error: AddLipnoErrorResponse) => {
      return Promise.reject(error);
    });

  return data;
};

export const useAddLipno = () => {
  const queryClient = useQueryClient();
  return useMutation<AddLipnoResponse, AddLipnoErrorResponse, AddLipnoRequest>({
    mutationFn: addLipno,
    mutationKey: [ADD_LIPNO_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MeteoGetKey.LIPNO] });
    },
  });
};
