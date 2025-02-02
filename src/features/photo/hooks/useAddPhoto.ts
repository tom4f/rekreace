import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Url } from 'api/paths';
import { api } from 'api/utils';
import { AxiosError } from 'axios';

import { GET_PHOTO_KEY } from './useGetPhoto';

type AddPhotoRequestToDo = {
  text: string;
  autor: string;
  email: string;
  typ: string;
  header: string;
  insertDate: string;
  date: string;
  rotate: string;
  imgType: string;
  upfile: string;
  webToken: string;
  webAccess: string;
  webUser: string;
};

type AddPhotoRequest = FormData;

type AddPhotoResponse = {
  result: string;
};

export type AddPhotoErrorResponse = AxiosError & {
  data: { result: string };
};

export const ADD_PHOTO_ENDPOINT = `${Url.NEW_API}/photo/add.php`;
export const ADD_PHOTO_KEY = 'addPhoto';

const addPhoto = async (
  request: AddPhotoRequest
): Promise<AddPhotoResponse> => {
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
  return useMutation<AddPhotoResponse, AddPhotoErrorResponse, AddPhotoRequest>({
    mutationFn: addPhoto,
    mutationKey: [ADD_PHOTO_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PHOTO_KEY] });
    },
  });
};
