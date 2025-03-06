import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';

import {
  ALARM_LOGIN_CONFIG_KEY,
  ALARM_LOGIN_SESSION_CONFIG,
  AlarmResponse,
} from './useAlarmLogin';

const useGetAlarmConfig = (): UseQueryResult<AlarmResponse, Error> => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: [ALARM_LOGIN_CONFIG_KEY],
    queryFn: async () =>
      queryClient.getQueryData([ALARM_LOGIN_CONFIG_KEY]) ?? null,
    enabled: false,
  });
};

export const useAlarmConfig = () => {
  const {
    data: loginRQData,
    error,
    isLoading,
    isSuccess,
  } = useGetAlarmConfig();

  const clientJSON = sessionStorage.getItem(ALARM_LOGIN_SESSION_CONFIG) || '{}';
  const sessionData: AlarmResponse = JSON.parse(clientJSON);

  const loginData = sessionData || loginRQData;

  return { data: loginData, error, isLoading, isSuccess };
};
