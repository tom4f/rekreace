import * as Sentry from '@sentry/react';
import axios, { AxiosError, AxiosRequestConfig, isAxiosError } from 'axios';

type GetErrorType = {
  status: string;
  message: string;
  type: string;
  errors: string[];
};

interface GetRequestConfig extends AxiosRequestConfig {
  url: string;
}

export async function apiGet({ url, ...config }: GetRequestConfig) {
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const err: AxiosError<GetErrorType> = error;

      Sentry.withScope((scope) => {
        scope.setTag('http_method', 'GET');
        scope.setExtra('url', url);
        scope.setExtra('status', err.response?.status);
        scope.setExtra('response', err.response?.data);
        Sentry.captureException(err);
      });

      throw err;
    }
  }
}
