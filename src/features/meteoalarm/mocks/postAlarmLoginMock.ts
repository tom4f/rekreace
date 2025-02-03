import { HttpStatusCode } from 'enums';
import { resolveMock } from 'features/mocks';
import { http, HttpResponse } from 'msw';

import { ALARM_LOGIN_ENDPOINT, AlarmResponse } from '../hooks';

const handlers = [
  http.post(ALARM_LOGIN_ENDPOINT, async () => {
    return HttpResponse.json<AlarmResponse>({
      id: 14,
      name: 'Ing. Tom\u00e1\u0161 Ku\u010dera1',
      email: '603200316@SMS.t-mobile.cz',
      sms: 4,
      username: 'Tom4F MOCK',
      password: '1w1w1w1w',
      days: 1023,
      date: '2021-02-25 22:07:08',
      todayRainLimit: 2,
      todayRainSent: 0,
      lastUpdate: '2025-02-01 16:49:10',
      isLogged: true,
      webAccess: 'error',
      webToken: 'error',
      webUser: 'error',
    });
  }),
];

export const alarmLoginScenarios = {
  error: [
    http.post(ALARM_LOGIN_ENDPOINT, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      });
    }),
  ],
};

export const postAlarmLoginMock = () =>
  resolveMock(handlers, alarmLoginScenarios, ALARM_LOGIN_ENDPOINT);
