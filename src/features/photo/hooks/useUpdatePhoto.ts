import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Url } from '../../../api/paths';
import { api } from '../../../api/utils';
import { GET_PHOTO_KEY } from './useGetPhoto';

type UpdatePhotoRequestToDo = {
  id: string;
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

type UpdatePhotoRequest = FormData;

type UpdatePhotoResponse = {
  result: string;
};

export type UpdatePhotoErrorResponse = AxiosError & {
  data: { result: string };
};

export const UPDATE_PHOTO_ENDPOINT = `${Url.NEW_API}/photo/update.php`;
export const UPDATE_PHOTO_KEY = 'updatePhoto';

const updatePhoto = async (
  request: UpdatePhotoRequest
): Promise<UpdatePhotoResponse> => {
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
    UpdatePhotoResponse,
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
