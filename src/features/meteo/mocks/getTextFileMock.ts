import { http, HttpResponse } from 'msw';
import { HttpStatusCode } from '../../../enums';
import { resolveMock } from '../../mocks/mockResolver';
import { MeteoFiles } from '../hooks';
import downld02 from './mockFiles/downld02.txt?raw';

const handlers = [
  http.get(MeteoFiles.DOWNLD02, async () => {
    return new HttpResponse(downld02, {
      status: HttpStatusCode.OK_200,
    });
  }),
];

export const getTextFileScenarios = {
  e500: [
    http.get(MeteoFiles.DOWNLD02, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      });
    }),
  ],
};

export const getTextFileMock = () =>
  resolveMock(handlers, getTextFileScenarios, MeteoFiles.DOWNLD02);
