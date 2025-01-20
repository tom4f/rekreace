import axios, { AxiosResponse } from 'axios';

interface Props {
  url: string;
  query?: Record<string, string | number>;
  body?: Record<string, string | number>;
}

export const apiDelete = <IResponse = any>({
  url,
  query = {},
  body = {},
}: Props): Promise<AxiosResponse<IResponse>> => {
  return axios.delete(url, {
    params: query,
    data: body,
  });
};
