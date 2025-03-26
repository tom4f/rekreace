import { useQuery } from '@tanstack/react-query';
import { Url } from 'api/paths';
import { api } from 'api/utils';

export type PhotoRequest = {
  fotoGalleryOwner: string;
};

export interface PhotoType extends OnePhotoResponse {
  url?: string;
}

export type OnePhotoResponse = {
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
  fotoGalleryOwner: string;
};

export type PhotoResponse = OnePhotoResponse[];

export const GET_PHOTO_ENDPOINT = `${Url.NEW_API}/photo/read.php`;
export const GET_PHOTO_KEY = 'getPhoto';

const getPhoto = async (request: PhotoRequest): Promise<PhotoResponse> => {
  const params = new URLSearchParams();
  params.append('fotoGalleryOwner', request.fotoGalleryOwner.toString());
  const data = await api.get({
    url: `${GET_PHOTO_ENDPOINT}?${params.toString()}`,
  });
  return data;
};

export const useGetPhoto = (request: PhotoRequest) => {
  return useQuery({
    queryKey: [GET_PHOTO_KEY, request.fotoGalleryOwner],
    queryFn: () => getPhoto(request),
  });
};
