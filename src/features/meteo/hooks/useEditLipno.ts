import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Url } from 'api/paths';
import { api } from 'api/utils';

import { MeteoGetKey } from './useLoadWeather';

export const lipnoKeys = <const>[
  'hladina',
  'pritok',
  'odtok',
  'voda',
  'vzduch',
  'pocasi',
];

export type LipnoKeyType = (typeof lipnoKeys)[number];

export type EditLipnoRequest = {
  datum: string;
  key: LipnoKeyType;
  value: string | number;
  webToken: string;
  webUser: string;
  fotoGalleryOwner: string;
};

type EditLipnoResponse = {
  result: string;
};

export type EditLipnoErrorResponse = AxiosError & {
  data: { result: string };
};

export const EDIT_LIPNO_ENDPOINT = `${Url.NEW_API}/meteo/update_lipno.php`;
export const EDIT_LIPNO_KEY = 'editLipno';

const editLipno = async (
  request: EditLipnoRequest
): Promise<EditLipnoResponse> => {
  const { data } = await api
    .put({
      url: EDIT_LIPNO_ENDPOINT,
      data: request,
    })
    .catch((error: EditLipnoErrorResponse) => {
      return Promise.reject(error);
    });

  return data;
};

export const useEditLipno = () => {
  const queryClient = useQueryClient();
  return useMutation<
    EditLipnoResponse,
    EditLipnoErrorResponse,
    EditLipnoRequest
  >({
    mutationFn: editLipno,
    mutationKey: [EDIT_LIPNO_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MeteoGetKey.LIPNO] });
    },
  });
};
