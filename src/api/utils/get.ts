import axios, { AxiosError, AxiosRequestConfig, isAxiosError } from 'axios';

type PostErrorType = {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await axios.get<any>(url, config);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const err: AxiosError<PostErrorType> = error;
      throw err;
    }
  }
}
