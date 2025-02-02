import { HttpStatusCode } from 'enums';
import { resolveMock } from 'features/mocks';
import { http, HttpResponse } from 'msw';

import { AlarmCounterResponse, GET_ALARM_COUNTER_ENDPOINT } from '../hooks';

const handlers = [
  http.get(GET_ALARM_COUNTER_ENDPOINT, async () => {
    return HttpResponse.json<AlarmCounterResponse>({
      count: 253,
    });
  }),
];

export const alarmCounterScenarios = {
  error: [
    http.get(GET_ALARM_COUNTER_ENDPOINT, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      });
    }),
  ],
};

export const getAlarmCounterMock = () =>
  resolveMock(handlers, alarmCounterScenarios, GET_ALARM_COUNTER_ENDPOINT);
