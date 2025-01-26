import { http, HttpResponse } from 'msw';

import { HttpStatusCode } from 'enums';
import { resolveMock } from 'features/mocks';
import { GET_DAVIS_ENDPOINT, DavisResponse } from '../hooks';

const handlers = [
  http.get(GET_DAVIS_ENDPOINT, async () => {
    return HttpResponse.json<DavisResponse>([
      {
        date: '2025-01-22',
        temp_high_time: '10:32:00',
        temp_low_time: '08:23:00',
        wind_speed_high_time: '02:18:00',
        wind3: 0,
        wind6: 0,
        wind9: 0,
        wind12: 0,
        dir: 'NNE',
        temp_mean: -8,
        temp_high: -3,
        temp_low: -10.7,
        heat_deg_days: 11.6,
        cool_deg_days: 0,
        rain: 0,
        wind_speed_avg: 0.3,
        wind_speed_high: 1.3,
        bar_min: 1016.9,
        bar_avg: 1018.1,
        bar_max: 1019.2,
        huminidy_min: 79,
        huminidy_avg: 88.4,
        huminidy_max: 92,
        air_density_min: 1.1881,
        air_density_avg: 1.1917,
        air_density_max: 1.1938,
        rain_rate_max: 0,
      },
      {
        date: '2025-01-21',
        temp_high_time: '15:11:00',
        temp_low_time: '05:58:00',
        wind_speed_high_time: '15:08:00',
        wind3: 1,
        wind6: 0,
        wind9: 0,
        wind12: 0,
        dir: 'NNE',
        temp_mean: -2.9,
        temp_high: 3.1,
        temp_low: -7.2,
        heat_deg_days: 21.1,
        cool_deg_days: 0,
        rain: 0,
        wind_speed_avg: 0.4,
        wind_speed_high: 4,
        bar_min: 1018.7,
        bar_avg: 1020.1,
        bar_max: 1021.8,
        huminidy_min: 74,
        huminidy_avg: 86.8,
        huminidy_max: 92,
        air_density_min: 1.1909,
        air_density_avg: 1.1935,
        air_density_max: 1.2022,
        rain_rate_max: 0,
      },
    ]);
  }),
];

export const getDavisScenarios = {
  error: [
    http.get(GET_DAVIS_ENDPOINT, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      });
    }),
  ],
};

export const getDavisMock = () =>
  resolveMock(handlers, getDavisScenarios, GET_DAVIS_ENDPOINT);
