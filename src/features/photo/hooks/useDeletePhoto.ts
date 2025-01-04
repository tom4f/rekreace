import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Url } from '../../../api/paths';
import { api } from '../../../api/utils';
import { GET_PHOTO_KEY } from './useGetPhoto';

type DeletePhotoRequestToDo = {
  id: string;
  webAccess: string;
  webUser: string;
};

type DeletePhotoRequest = FormData;

type DeletePhotoPhotoResponse = {
  result: string;
};

export type DeletePhotoErrorResponse = AxiosError & {
  data: { result: string };
};

export const DELETE_PHOTO_ENDPOINT = `${Url.NEW_API}/photo/delete.php`;
export const DELETE_PHOTO_KEY = 'updatePhoto';

const deletePhoto = async (
  request: DeletePhotoRequest
): Promise<DeletePhotoPhotoResponse> => {
  const { data } = await api
    .post({
      url: DELETE_PHOTO_ENDPOINT,
      data: request,
    })
    .catch((error: DeletePhotoErrorResponse) => {
      return Promise.reject(error);
    });

  return data;
};

export const useDeletePhoto = () => {
  const queryClient = useQueryClient();
  return useMutation<
    DeletePhotoPhotoResponse,
    DeletePhotoErrorResponse,
    DeletePhotoRequest
  >({
    mutationFn: deletePhoto,
    mutationKey: [DELETE_PHOTO_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PHOTO_KEY] });
    },
  });
};
