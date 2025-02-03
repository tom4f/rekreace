import { HttpStatusCode } from 'enums';
import { resolveMock } from 'features/mocks';
import { http, HttpResponse } from 'msw';

import { UPDATE_ALARM_ENDPOINT, UpdateAlarmResponse } from '../hooks';

const handlers = [
  http.put(UPDATE_ALARM_ENDPOINT, async () => {
    return HttpResponse.json<UpdateAlarmResponse>({
      smsResult: 'value_changed',
    });
  }),
];

export const updateAlarmMock = {
  error: [
    http.put(UPDATE_ALARM_ENDPOINT, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      });
    }),
  ],
};

export const putUpdateAlarmMock = () =>
  resolveMock(handlers, updateAlarmMock, UPDATE_ALARM_ENDPOINT);
