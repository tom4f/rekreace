import axios, { AxiosError, AxiosResponse } from 'axios';

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
    axios
      .put(url, data, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error: AxiosError) => {
        reject(error.response);
      });
  });
