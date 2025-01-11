import axios, { AxiosError, isAxiosError, AxiosRequestConfig } from 'axios';

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
    const response = await axios.get<any>(url, config);
    console.log('ok');
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const err: AxiosError<PostErrorType> = error;
      console.log('error');
      throw err;
    }
  }
}
