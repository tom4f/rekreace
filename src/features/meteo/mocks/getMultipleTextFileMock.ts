import { HttpStatusCode } from 'enums';
import { resolveMock } from 'features/mocks';
import { http, HttpHandler, HttpResponse } from 'msw';

import { MeteoFiles } from '../hooks';
import downld02_0 from './mockFiles/archive/downld02-0.txt?raw';
import downld02_1 from './mockFiles/archive/downld02-1.txt?raw';
import downld02_2 from './mockFiles/archive/downld02-2.txt?raw';
import downld02_3 from './mockFiles/archive/downld02-3.txt?raw';
import downld02_4 from './mockFiles/archive/downld02-4.txt?raw';
import downld02_5 from './mockFiles/archive/downld02-5.txt?raw';
import downld02_6 from './mockFiles/archive/downld02-6.txt?raw';

export const meteoFiles: { [key: string]: string } = {
  downld02_0,
  downld02_1,
  downld02_2,
  downld02_3,
  downld02_4,
  downld02_5,
  downld02_6,
};

// multiple files

const getmMteoFileUrl = (fileNr: number) =>
  MeteoFiles.DOWNLD02_NR.replace(/{{meteoFileId}}/g, `${fileNr}`);

const getMultipleHandlers = (fileNr: number) => [
  http.get(getmMteoFileUrl(fileNr), async () => {
    return new HttpResponse(meteoFiles[`downld02_${fileNr}`], {
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
    console.log(fileNr);
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
