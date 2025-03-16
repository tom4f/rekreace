import { HttpStatusCode } from 'enums';
import { MeteoFilesEnum } from 'features/meteo/hooks';
import { resolveMock } from 'features/mocks';
import { http, HttpResponse } from 'msw';

import data_davis from './mockFiles/data_davis.txt?raw';

const handlers = [
  http.get(MeteoFilesEnum.DATA_DAVIS, async () => {
    return new HttpResponse(data_davis, {
      status: HttpStatusCode.OK_200,
    });
  }),
];

export const getDavisDataScenarios = {
  e500: [
    http.get(MeteoFilesEnum.DATA_DAVIS, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      });
    }),
  ],
};

export const getDavisDataMock = () =>
  resolveMock(handlers, getDavisDataScenarios, MeteoFilesEnum.DATA_DAVIS);
