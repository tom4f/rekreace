import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Url } from 'api/paths';
import { api } from 'api/utils';
import { AxiosError } from 'axios';

import { GET_PHOTO_KEY } from './useGetPhoto';

export type UpdatePhotoRequest = {
  id: number;
  text: string;
  autor: string;
  email: string;
  typ: number;
  votes: number;
  header: string;
  insertDate: string;
  date: string;
  rotate: number;
  imgType: string;
  url?: string;
  fotoGalleryOwner: string;
};

type UpdateOnePhotoResponse = {
  result: string;
};

export type UpdatePhotoErrorResponse = AxiosError & {
  data: { result: string };
};

export const UPDATE_PHOTO_ENDPOINT = `${Url.NEW_API}/photo/update.php`;
export const UPDATE_PHOTO_KEY = 'updatePhoto';

const updatePhoto = async (
  request: UpdatePhotoRequest
): Promise<UpdateOnePhotoResponse> => {
  const { data } = await api
    .post({
      url: UPDATE_PHOTO_ENDPOINT,
      data: request,
    })
    .catch((error: UpdatePhotoErrorResponse) => {
      return Promise.reject(error);
    });

  return data;
};

export const useUpdatePhoto = () => {
  const queryClient = useQueryClient();
  return useMutation<
    UpdateOnePhotoResponse,
    UpdatePhotoErrorResponse,
    UpdatePhotoRequest
  >({
    mutationFn: updatePhoto,
    mutationKey: [UPDATE_PHOTO_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PHOTO_KEY] });
    },
  });
};
