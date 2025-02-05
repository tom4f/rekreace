import { useQuery } from '@tanstack/react-query';
import { Url } from 'api/paths';
import { api } from 'api/utils';

import { PhotoRequest } from './useGetPhoto';

export type CategoryNames = { [key: string]: string };

export type CategoryResponse = {
  categoryNames: CategoryNames;
  fotoGalleryOwner: string;
};

export const GET_CATEGORY_ENDPOINT = `${Url.NEW_API}/photo/read_category.php?{fotoGalleryOwner}`;
export const GET_CATEGORY_KEY = 'getCategory';

const getCategory = async (
  request: PhotoRequest
): Promise<CategoryResponse> => {
  const data = await api.get({
    url: GET_CATEGORY_ENDPOINT.replace(
      '{fotoGalleryOwner}',
      `fotoGalleryOwner=${request.fotoGalleryOwner}`
    ),
  });

  return data;
};

export const useGetCategory = (request: PhotoRequest) => {
  return useQuery({
    queryKey: [GET_CATEGORY_KEY, request.fotoGalleryOwner],
    queryFn: () => getCategory(request),
    select: (data) => data.categoryNames,
  });
};
