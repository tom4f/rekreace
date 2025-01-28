import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Url } from 'api/paths';
import { api } from 'api/utils';
import { AxiosError } from 'axios';

import { ALARM_LOGIN_CONFIG_KEY, AlarmResponse } from './useAlarmLogin';

export type UpdateAlarmRequest = AlarmResponse;

type UpdateAlarmResponse = { smsResult: 'value_changed' };

export type UpdateAlarmErrorResponse = AxiosError & {
  data: { result: string };
};

export const UPDATE_ALARM_ENDPOINT = `${Url.NEW_API}/meteoalarm/alarm_update.php`;
export const UPDATE_ALARM_KEY = 'updateAlarm';

const updateAlarm = async (
  request: UpdateAlarmRequest
): Promise<UpdateAlarmResponse> => {
  const { data } = await api
    .put({
      url: UPDATE_ALARM_ENDPOINT,
      data: request,
    })
    .catch((error: UpdateAlarmErrorResponse) => {
      return Promise.reject(error);
    });

  return data;
};

export const useUpdateAlarm = () => {
  const queryClient = useQueryClient();
  return useMutation<
    UpdateAlarmResponse,
    UpdateAlarmErrorResponse,
    UpdateAlarmRequest
  >({
    mutationFn: updateAlarm,
    mutationKey: [UPDATE_ALARM_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ALARM_LOGIN_CONFIG_KEY] });
    },
  });
};
