import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Url } from 'api/paths';
import { api } from 'api/utils';
import { AxiosError } from 'axios';

import { GET_PHOTO_KEY } from './useGetPhoto';

type AddPhotoRequest = {
  text: string;
  autor: string;
  email: string;
  typ: number;
  header: string;
  insertDate: string;
  date: string;
  rotate: number;
  imgType: string;
  url?: string;
  fotoGalleryOwner: string;
};

type AddOnePhotoResponse = {
  result: string;
};

export type AddPhotoErrorResponse = AxiosError & {
  data: { result: string };
};

export const ADD_PHOTO_ENDPOINT = `${Url.NEW_API}/photo/add.php`;
export const ADD_PHOTO_KEY = 'addPhoto';

const addPhoto = async (
  request: AddPhotoRequest
): Promise<AddOnePhotoResponse> => {
  const { data } = await api
    .post({
      url: ADD_PHOTO_ENDPOINT,
      data: request,
    })
    .catch((error: AddPhotoErrorResponse) => {
      return Promise.reject(error);
    });

  return data;
};

export const useAddPhoto = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AddOnePhotoResponse,
    AddPhotoErrorResponse,
    AddPhotoRequest
  >({
    mutationFn: addPhoto,
    mutationKey: [ADD_PHOTO_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PHOTO_KEY] });
    },
  });
};
