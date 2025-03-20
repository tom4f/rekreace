import * as Sentry from '@sentry/react';
import axios, { AxiosError, AxiosResponse } from 'axios';

interface AxiosRequest {
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

interface ApiResponse {
  data: string;
  message: string;
}

interface ValidationError {
  code: string;
  message: string;
  field: string;
}

interface NotFoundError {
  code: string;
  message: string;
}

type ApiErrorResponse = ValidationError | NotFoundError;

export const apiPost = ({
  url,
  data = {},
}: AxiosRequest): Promise<AxiosResponse> =>
  new Promise((resolve, reject) => {
    axios
      .post<ApiResponse>(url, data)
      .then((response) => {
        resolve(response);
      })
      .catch((error: AxiosError<ApiErrorResponse>) => {
        if (error.response?.data) {
          const errorData = error.response.data;

          Sentry.withScope((scope) => {
            scope.setTag('http_method', 'POST');
            scope.setExtra('url', url);
            scope.setExtra('status', error.response?.status);
            scope.setExtra('response', errorData);
            Sentry.captureException(error);
          });

          if (typeof errorData !== 'string' && 'result' in errorData) {
            console.error(`error.response.data.result = ${errorData.result}`);
            reject(error);
          } else {
            console.error(`Not found error: ${errorData.message}`);
            reject(errorData.message);
          }
        } else if (error.request) {
          console.error('No response received:', error.request);
          Sentry.captureException(error);
          reject(error);
        } else {
          console.error('Error setting up request:', error.message);
          Sentry.captureException(error);
          reject(error);
        }
      });
  });
