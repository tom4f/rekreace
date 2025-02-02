import { useMutation } from '@tanstack/react-query';
import { Url } from 'api/paths';
import { api } from 'api/utils';
import { AxiosError } from 'axios';

export type PasswordRequest = {
  identification: string;
};

export type PasswordResponse = {
  sms_pasw: 'password_sent' | 'error';
  email: string;
};

export type PasswordErrorResponse = AxiosError & {
  data: { result: string };
};

export const ALARM_PASSWORD_ENDPOINT = `${Url.NEW_API}/meteoalarm/alarm_pasw.php`;
export const ALARM_PASSWORD_KEY = 'alarmPassword';

const alarmPassword = async (
  request: PasswordRequest
): Promise<PasswordResponse> => {
  const { data } = await api
    .post({
      url: ALARM_PASSWORD_ENDPOINT,
      data: request,
    })
    .catch((error: PasswordErrorResponse) => {
      return Promise.reject(error);
    });

  return data;
};

export const useAlarmPassword = () => {
  return useMutation<PasswordResponse, PasswordErrorResponse, PasswordRequest>({
    mutationFn: alarmPassword,
    mutationKey: [ALARM_PASSWORD_KEY],
  });
};
