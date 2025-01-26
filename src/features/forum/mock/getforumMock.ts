import { http, HttpResponse } from 'msw';

import { HttpStatusCode } from 'enums';
import { resolveMock } from 'features/mocks';
import { GET_FORUM_ENDPOINT, ForumResponse } from '../hooks';

const handlers = [
  http.get(GET_FORUM_ENDPOINT, async () => {
    return HttpResponse.json<ForumResponse>([
      {
        id: 2056,
        datum: '2024-12-19 21:00:22',
        text: 'asas',
        jmeno: 'asas',
        email: 'tom4f@seznam.cz',
        typ: 1,
      },
      {
        id: 2055,
        datum: '2024-12-17 12:01:59',
        text: 'hlad',
        jmeno: 'Tom\u00e1\u0161',
        email: 'kucol@seznam.cz',
        typ: 1,
      },
      {
        id: 2054,
        datum: '2024-12-17 11:56:04',
        text: 'sey',
        jmeno: 'Tom',
        email: 'tom4f@seznam.cz',
        typ: 2,
      },
      {
        id: 2053,
        datum: '2024-12-16 21:55:26',
        text: 'i',
        jmeno: 'i',
        email: 'kucol@seznam.cz',
        typ: 1,
      },
      {
        id: 2052,
        datum: '2024-12-16 21:44:50',
        text: 'g',
        jmeno: 'g',
        email: 'kucol@seznam.cz',
        typ: 8,
      },
      {
        id: 2051,
        datum: '2024-12-16 21:41:14',
        text: 'f',
        jmeno: 'f',
        email: 'kucol@seznam.cz',
        typ: 3,
      },
    ]);
  }),
];

export const getForumScenarios = {
  error: [
    http.get(GET_FORUM_ENDPOINT, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      });
    }),
  ],
};

export const getForumMock = () =>
  resolveMock(handlers, getForumScenarios, GET_FORUM_ENDPOINT);
