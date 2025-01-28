import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Url } from 'api/paths';
import { api } from 'api/utils';
import { AxiosError } from 'axios';

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  webToken: string;
  webAccess: string;
  webUser: string;
  isLogged: boolean;
};

type DataResponse = {
  date: string;
  days: number;
  email: string;
  id: number;
  name: string;
  password: string;
  sms: number;
  username: string;
  todayRainLimit: number;
  todayRainSent: number;
};

export type AlarmResponse = LoginResponse & DataResponse;

export type LoginErrorResponse = AxiosError & {
  data: { result: string };
};

export const ALARM_LOGIN_ENDPOINT = `${Url.NEW_API}/meteoalarm/alarm_login.php`;
export const ALARM_LOGIN_KEY = 'alarmLogin';
export const ALARM_LOGIN_CONFIG_KEY = 'alarmConfig';

const alarmLogin = async (request: LoginRequest): Promise<AlarmResponse> => {
  const { data } = await api
    .post({
      url: ALARM_LOGIN_ENDPOINT,
      data: request,
    })
    .catch((error: LoginErrorResponse) => {
      return Promise.reject(error);
    });

  return data;
};

export const useAlarmLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<AlarmResponse, LoginErrorResponse, LoginRequest>({
    mutationFn: alarmLogin,
    mutationKey: [ALARM_LOGIN_KEY],
    onSuccess: (data) => {
      queryClient.setQueryData([ALARM_LOGIN_CONFIG_KEY], data);
      sessionStorage.setItem('clientAlarm', JSON.stringify(data));
    },
  });
};
