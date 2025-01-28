import { useQuery, UseQueryResult } from '@tanstack/react-query';

import {
  ALARM_LOGIN_CONFIG_KEY,
  ALARM_LOGIN_SESSION_CONFIG,
  AlarmResponse,
} from './useAlarmLogin';

const useGetAlarmConfig = (): UseQueryResult<AlarmResponse, Error> => {
  return useQuery({
    queryKey: [ALARM_LOGIN_CONFIG_KEY],
    //queryFn:
    //enabled: false,
    select: (data: AlarmResponse) => {
      const clientJSON = sessionStorage.getItem(ALARM_LOGIN_SESSION_CONFIG);
      if (!clientJSON) {
        return {
          data,
        };
      }

      const clientObj = JSON.parse(clientJSON);

      return clientObj;
    },
  });
};

export const useAlarmConfig = () => {
  const {
    data: loginRQData,
    error,
    isLoading,
    isSuccess,
  } = useGetAlarmConfig();

  const clientJSON = sessionStorage.getItem(ALARM_LOGIN_SESSION_CONFIG);

  const loginData = clientJSON ? JSON.parse(clientJSON) : loginRQData;

  return { data: loginData, error, isLoading, isSuccess };
};
