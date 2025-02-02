import axios, { AxiosError,AxiosResponse } from 'axios';

interface AxiosRequest {
  url: string;
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
          if (typeof errorData !== 'string' && 'result' in errorData) {
            // normal error
            console.error(`error.response.data.result = ${errorData.result}`);
            reject(error);
          } else {
            // It's a not found error
            console.error(`Not found error: ${errorData.message}`);
            reject(errorData.message);
          }
        } else if (error.request) {
          console.error('No response received:', error.request);
          reject(error);
        } else {
          console.error('Error setting up request:', error.message);
          reject(error);
        }
      });
  });
