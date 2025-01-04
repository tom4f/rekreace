import { useQuery } from '@tanstack/react-query';
import { Url } from '../../../api/paths';
import { api } from '../../../api/utils';

export type PhotoRequest = {
  fotoGalleryOwner: string;
};

export type PhotoResponse = {
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
};

export const GET_PHOTO_ENDPOINT = `${Url.NEW_API}/photo/read.php?{fotoGalleryOwner}`;
export const GET_PHOTO_KEY = 'getPhoto';

const getPhoto = async (request: PhotoRequest): Promise<PhotoResponse[]> => {
  const data = await api.get({
    url: GET_PHOTO_ENDPOINT.replace(
      '{fotoGalleryOwner}',
      `fotoGalleryOwner=${request.fotoGalleryOwner}`
    ),
  });

  return data;
};

export const useGetPhoto = (request: PhotoRequest) => {
  return useQuery({
    queryKey: [GET_PHOTO_KEY, request.fotoGalleryOwner],
    queryFn: () => getPhoto(request),
  });
};
