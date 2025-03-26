import * as Sentry from '@sentry/react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useAuthStore } from 'src/store';

interface Props {
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiPut = <IResponse = any>({
  url,
  data = {},
}: Props): Promise<AxiosResponse<IResponse>> =>
  new Promise((resolve, reject) => {
    const token = useAuthStore.getState().token;

    axios
      .put(url, data, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error: AxiosError) => {
        Sentry.withScope((scope) => {
          scope.setTag('http_method', 'PUT');
          scope.setExtra('url', url);
          scope.setExtra('status', error.response?.status);
          scope.setExtra('response', error.response?.data);
          Sentry.captureException(error);
        });

        reject(error.response);
      });
  });
