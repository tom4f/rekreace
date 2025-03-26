import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Url } from 'api/paths';
import { api } from 'api/utils';
import { AxiosError } from 'axios';

import { GET_PHOTO_KEY } from './useGetPhoto';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DeletePhotoRequestToDo = {
  id: string;
  fotoGalleryOwner: string;
};

type DeletePhotoRequest = FormData;

type DeletePhotoOnePhotoResponse = {
  result: string;
};

export type DeletePhotoErrorResponse = AxiosError & {
  data: { result: string };
};

export const DELETE_PHOTO_ENDPOINT = `${Url.NEW_API}/photo/delete.php`;
export const DELETE_PHOTO_KEY = 'updatePhoto';

const deletePhoto = async (
  request: DeletePhotoRequest
): Promise<DeletePhotoOnePhotoResponse> => {
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
    DeletePhotoOnePhotoResponse,
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
