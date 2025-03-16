import { HttpStatusCode } from 'enums';
import { resolveMock } from 'features/mocks';
import { http, HttpHandler, HttpResponse } from 'msw';

import { MeteoFilesEnum } from '../hooks';
import { meteoTextFiles } from './mockFiles/archive';

const getmMteoFileUrl = (fileNr: number) =>
  MeteoFilesEnum.DOWNLD02_NR.replace(/{{meteoFileId}}/g, `${fileNr}`);

const getMultipleHandlers = (fileNr: number) => [
  http.get(getmMteoFileUrl(fileNr), async () => {
    return new HttpResponse(meteoTextFiles[`downld02_${fileNr}`], {
      status: HttpStatusCode.OK_200,
    });
  }),
];

export const getOneTextFileScenarios = (fileNr: number) => ({
  e500: [
    http.get(getmMteoFileUrl(fileNr), async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      });
    }),
  ],
  empty: [
    http.get(getmMteoFileUrl(fileNr), async () => {
      return new HttpResponse('', {
        status: HttpStatusCode.OK_200,
      });
    }),
  ],
});

const getOneTextFileMock = (fileNr: number) => () =>
  resolveMock(
    getMultipleHandlers(fileNr),
    getOneTextFileScenarios(fileNr),
    getmMteoFileUrl(fileNr)
  );

export const getMultipleTextFileScenarios = [0, 1, 2, 3, 4, 5, 6].map(
  (fileNr) => {
    const data: [string, { [key: string]: HttpHandler[] }] = [
      getmMteoFileUrl(fileNr),
      getOneTextFileScenarios(fileNr),
    ];

    return data;
  }
);

export const getMultipleTextFileMock = [0, 1, 2, 3, 4, 5, 6].map((fileNr) =>
  getOneTextFileMock(fileNr)
);
