import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Url } from 'api/paths';
import { api } from 'api/utils';
import { AxiosError } from 'axios';

import { CategoryNames, GET_CATEGORY_KEY } from './useGetCategory';

type UpdateCategoryRequest = {
  categoryNames: CategoryNames;
  fotoGalleryOwner: string;
};

type UpdateCategoryResponse = {
  result: string;
};

export type UpdateCategotyErrorResponse = AxiosError & {
  data: { result: string };
};

export const UPDATE_CATEGORY_ENDPOINT = `${Url.NEW_API}/photo/update_category.php`;
export const UPDATE_CATEGORY_KEY = 'updateCategory';

const updateCategoty = async (
  request: UpdateCategoryRequest
): Promise<UpdateCategoryResponse> => {
  const { data } = await api
    .post({
      url: UPDATE_CATEGORY_ENDPOINT,
      data: request,
    })
    .catch((error: UpdateCategotyErrorResponse) => {
      return Promise.reject(error);
    });

  return data;
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<
    UpdateCategoryResponse,
    UpdateCategotyErrorResponse,
    UpdateCategoryRequest
  >({
    mutationFn: updateCategoty,
    mutationKey: [UPDATE_CATEGORY_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_CATEGORY_KEY] });
    },
  });
};
