import axios, { AxiosResponse } from 'axios';

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
}: Props): Promise<AxiosResponse<IResponse>> => {
  return axios.delete(url, {
    params: query,
    data: body,
  });
};
