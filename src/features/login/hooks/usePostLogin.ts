import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fotoGalleryOwner, Url } from 'api/paths';
import { api } from 'api/utils';
import { AxiosError } from 'axios';

export type LoginRequest = {
  user: string;
  password: string;
  fotoGalleryOwner: string;
};

export type LoginResponse = {
  webToken: string;
  webAccess: string;
  webUser: string;
  isLogged: boolean;
};

export type LoginData = LoginResponse;

export type LoginErrorResponse = AxiosError & {
  data: { result: string };
};

export const LOGIN_ENDPOINT = `${Url.NEW_API}/login/post.php`;
export const LOGIN_KEY = 'login';
export const LOGIN_STATUS_KEY = 'loginStatus';

const postLogin = async (request: LoginRequest): Promise<LoginResponse> => {
  const { data } = await api
    .post({
      url: LOGIN_ENDPOINT,
      data: request,
    })
    .catch((error: LoginErrorResponse) => {
      return Promise.reject(error);
    });

  return data;
};

export const usePostLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, LoginErrorResponse, LoginRequest>({
    mutationFn: postLogin,
    mutationKey: [LOGIN_KEY],
    onSuccess: (data) => {
      if (fotoGalleryOwner === data.webAccess) {
        queryClient.setQueryData([LOGIN_STATUS_KEY], data);
        sessionStorage.setItem('client', JSON.stringify(data));
      }
    },
  });
};
