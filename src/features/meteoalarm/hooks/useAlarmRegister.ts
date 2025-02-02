import { useMutation } from '@tanstack/react-query';
import { Url } from 'api/paths';
import { api } from 'api/utils';
import { AxiosError } from 'axios';

export type RegisterRequest = {
  email: string;
  username: string;
};

export type RegisterResponse = {
  sms_new: 'user_exists' | 'email_exists' | 'user_added' | 'error';
  email: string;
  username?: string;
  // password?: string;
};

export type RegisterErrorResponse = AxiosError & {
  data: { result: string };
};

export const ALARM_REGISTER_ENDPOINT = `${Url.NEW_API}/meteoalarm/alarm_register.php`;
export const ALARM_REGISTER_KEY = 'alarmRegister';

const alarmRegister = async (
  request: RegisterRequest
): Promise<RegisterResponse> => {
  const { data } = await api
    .post({
      url: ALARM_REGISTER_ENDPOINT,
      data: request,
    })
    .catch((error: RegisterErrorResponse) => {
      return Promise.reject(error);
    });

  return data;
};

export const useAlarmRegister = () => {
  return useMutation<RegisterResponse, RegisterErrorResponse, RegisterRequest>({
    mutationFn: alarmRegister,
    mutationKey: [ALARM_REGISTER_KEY],
  });
};
