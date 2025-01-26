import { http, HttpResponse } from 'msw';

import { HttpStatusCode } from 'enums';
import { resolveMock } from 'features/mocks';
import { GET_OLD_STATION_ENDPOINT, OldStationResponse } from '../hooks';

const handlers = [
  http.get(GET_OLD_STATION_ENDPOINT, async () => {
    return HttpResponse.json<OldStationResponse>([
      {
        date: '2011-08-22',
        wind3: 54,
        wind6: 3,
        wind9: 0,
        wind12: 0,
        direct: 8.2,
        windmax: 7.3,
        tempmin: 14.4,
        tempavg: 25.1,
        tempmax: 30.3,
        rain: 0,
      },
      {
        date: '2011-08-23',
        wind3: 85,
        wind6: 3,
        wind9: 0,
        wind12: 0,
        direct: 8.8,
        windmax: 7.8,
        tempmin: 14.6,
        tempavg: 25.3,
        tempmax: 31.1,
        rain: 0,
      },
      {
        date: '2011-08-24',
        wind3: 21,
        wind6: 0,
        wind9: 0,
        wind12: 0,
        direct: 7.6,
        windmax: 6.2,
        tempmin: 14.3,
        tempavg: 25.4,
        tempmax: 31.3,
        rain: 0,
      },
    ]);
  }),
];

export const getOldStationScenarios = {
  error: [
    http.get(GET_OLD_STATION_ENDPOINT, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      });
    }),
  ],
};

export const getOldStationMock = () =>
  resolveMock(handlers, getOldStationScenarios, GET_OLD_STATION_ENDPOINT);
