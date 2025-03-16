import { HttpStatusCode } from 'enums';
import { resolveMock } from 'features/mocks';
import { http, HttpResponse } from 'msw';

import { MeteoFilesEnum } from '../hooks';
import downld02 from './mockFiles/downld02.txt?raw';

const handlers = [
  http.get(MeteoFilesEnum.DOWNLD02, async () => {
    return new HttpResponse(downld02, {
      status: HttpStatusCode.OK_200,
    });
  }),
];

export const getTextFileScenarios = {
  e500: [
    http.get(MeteoFilesEnum.DOWNLD02, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      });
    }),
  ],
};

export const getTextFileMock = () =>
  resolveMock(handlers, getTextFileScenarios, MeteoFilesEnum.DOWNLD02);
