import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Url } from 'api/paths';
import { api } from 'api/utils';
import { AxiosError } from 'axios';

import { MeteoGetKey } from './useLoadWeather';

type DeleteLipnoRequest = {
  datum: string;
};

type DeleteLipnoResponse = {
  result: string;
};

export type DeleteLipnoErrorResponse = AxiosError & {
  data: { result: string };
};

export const DELETE_LIPNO_ENDPOINT = `${Url.NEW_API}/meteo/delete_lipno.php`;
export const DELETE_LIPNO_KEY = 'deleteLipno';

const deleteLipno = async (
  request: DeleteLipnoRequest
): Promise<DeleteLipnoResponse> => {
  const { data } = await api
    .delete({
      url: DELETE_LIPNO_ENDPOINT,
      body: request,
    })
    .catch((error: DeleteLipnoErrorResponse) => {
      return Promise.reject(error);
    });

  return data;
};

export const useDeleteLipno = () => {
  const queryClient = useQueryClient();
  return useMutation<
    DeleteLipnoResponse,
    DeleteLipnoErrorResponse,
    DeleteLipnoRequest
  >({
    mutationFn: deleteLipno,
    mutationKey: [DELETE_LIPNO_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MeteoGetKey.LIPNO] });
    },
  });
};
