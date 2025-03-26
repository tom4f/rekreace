import { useMutation } from '@tanstack/react-query';
import { api } from 'api/utils';
import { AxiosError } from 'axios';
import { useAuthStore } from 'store/useAuthStore';

export type JWTLoginRequest = {
  user: string;
  password: string;
};

export type JWTLoginResponse = {
  token: string;
  user: string;
};

export type JWTLoginErrorResponse = AxiosError & {
  data: { message: string };
};

export const JWT_LOGIN_ENDPOINT = '/api/login/jwt-login.php';

const postJWTLogin = async (
  request: JWTLoginRequest
): Promise<JWTLoginResponse> => {
  const { data } = await api
    .post({
      url: JWT_LOGIN_ENDPOINT,
      data: request,
    })
    .catch((error: JWTLoginErrorResponse) => {
      return Promise.reject(error);
    });

  return data;
};

export const useJWTLogin = () => {
  return useMutation<JWTLoginResponse, JWTLoginErrorResponse, JWTLoginRequest>({
    mutationFn: postJWTLogin,
    mutationKey: ['jwtLogin'],
    onSuccess: (data) => {
      useAuthStore.getState().login(data.token, data.user);
    },
  });
};
