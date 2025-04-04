import * as Sentry from '@sentry/react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useAuthStore } from 'src/store';

interface Props {
  url: string;
  query?: Record<string, string | number>;
  body?: Record<string, string | number>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiDelete = <IResponse = any>({
  url,
  query = {},
  body = {},
}: Props): Promise<AxiosResponse<IResponse>> =>
  new Promise((resolve, reject) => {
    const token = useAuthStore.getState().token;

    axios
      .delete(url, {
        params: query,
        data: body,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error: AxiosError) => {
        const status = error.response?.status;

        if (status === 401) {
          useAuthStore.getState().logout();
        }
        Sentry.withScope((scope) => {
          scope.setTag('http_method', 'DELETE');
          scope.setExtra('url', url);
          scope.setExtra('status', error.response?.status);
          scope.setExtra('response', error.response?.data);
          Sentry.captureException(error);
        });

        reject(error.response);
      });
  });
