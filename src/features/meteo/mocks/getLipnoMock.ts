import { HttpStatusCode } from 'enums';
import { resolveMock } from 'features/mocks';
import { http, HttpResponse } from 'msw';

import { GET_LIPNO_ENDPOINT, LipnoResponse } from '../hooks';

const handlers = [
  http.get(GET_LIPNO_ENDPOINT, async () => {
    return HttpResponse.json<LipnoResponse>([
      {
        id: 0,
        datum: '2024-01-22',
        cas: null,
        pocasi: 'zata\u017eeno',
        hladina: 723.44,
        pritok: 20.3,
        odtok: 56,
        voda: 2.7,
        vzduch: -0.4,
      },
      {
        id: 0,
        datum: '2024-01-23',
        cas: null,
        pocasi: 'zata\u017eeno',
        hladina: 723.43,
        pritok: 48.1,
        odtok: 45,
        voda: 2.7,
        vzduch: 2.5,
      },
      {
        id: 0,
        datum: '2024-01-24',
        cas: null,
        pocasi: 'zata\u017eeno',
        hladina: 723.41,
        pritok: 45.6,
        odtok: 54,
        voda: 2.7,
        vzduch: 4.7,
      },
    ]);
  }),
];

export const getLipnoScenarios = {
  error: [
    http.get(GET_LIPNO_ENDPOINT, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      });
    }),
  ],
};

export const getLipnoMock = () =>
  resolveMock(handlers, getLipnoScenarios, GET_LIPNO_ENDPOINT);
