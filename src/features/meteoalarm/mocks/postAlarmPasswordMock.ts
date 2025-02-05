import { HttpStatusCode } from 'enums';
import { resolveMock } from 'features/mocks';
import { http, HttpResponse } from 'msw';

import { ALARM_PASSWORD_ENDPOINT, PasswordResponse } from '../hooks';

const handlers = [
  http.post(ALARM_PASSWORD_ENDPOINT, async () => {
    return HttpResponse.json<PasswordResponse>({
      sms_pasw: 'password_sent',
      email: '603123456@SMS.t-mobile.cz',
    });
  }),
];

export const alarmPasswordMock = {
  error: [
    http.put(ALARM_PASSWORD_ENDPOINT, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      });
    }),
  ],
};

export const postAlarmPasswordMock = () =>
  resolveMock(handlers, alarmPasswordMock, ALARM_PASSWORD_ENDPOINT);
