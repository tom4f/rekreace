import { HttpStatusCode } from 'enums';
import { MeteoFilesEnum } from 'features/meteo/hooks';
import { resolveMock } from 'features/mocks';
import { http, HttpResponse } from 'msw';

import data_davis_json from './mockFiles/data_davis_json.txt?raw';

const handlers = [
  http.get(MeteoFilesEnum.DATA_DAVIS_JSON, async () => {
    return new HttpResponse(data_davis_json, {
      status: HttpStatusCode.OK_200,
    });
  }),
];

export const getDavisDataJsonScenarios = {
  e500: [
    http.get(MeteoFilesEnum.DATA_DAVIS_JSON, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      });
    }),
  ],
};

export const getDavisDataJsonMock = () =>
  resolveMock(
    handlers,
    getDavisDataJsonScenarios,
    MeteoFilesEnum.DATA_DAVIS_JSON
  );
