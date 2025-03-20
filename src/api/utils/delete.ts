import * as Sentry from '@sentry/react';
import axios, { AxiosError, AxiosResponse } from 'axios';

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
    axios
      .delete(url, {
        params: query,
        data: body,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error: AxiosError) => {
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
