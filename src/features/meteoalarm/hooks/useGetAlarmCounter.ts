import { useQuery } from '@tanstack/react-query';
import { Url } from 'api/paths';
import { api } from 'api/utils';

export type AlarmCounterResponse = {
  count: number;
};

export const GET_ALARM_COUNTER_ENDPOINT = `${Url.NEW_API}/meteoalarm/alarm_counter.php`;
export const GET_ALARM_COUNTER_KEY = 'alarmCounter';

const getAlarmCounter = async (): Promise<AlarmCounterResponse> => {
  const data = await api.get({
    url: GET_ALARM_COUNTER_ENDPOINT,
  });

  return data;
};

export const useGetAlarmCounter = () => {
  return useQuery({
    queryKey: [GET_ALARM_COUNTER_KEY],
    queryFn: () => getAlarmCounter(),
  });
};
