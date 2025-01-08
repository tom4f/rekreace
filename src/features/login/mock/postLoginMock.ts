import { http, HttpResponse } from 'msw';

import { HttpStatusCode } from '../../../enums';
import { resolveMock } from '../../mocks/mockResolver';
import { LOGIN_ENDPOINT, LoginResponse } from '../hooks';

const handlers = [
  http.post(LOGIN_ENDPOINT, async () => {
    return HttpResponse.json<LoginResponse>({
      webToken: '82cfcf046eaaa97f9f2b55e0d9461964',
      webAccess: '_ubytovani',
      webUser: 'Bedrich Mock',
      isLogged: true,
    });
  }),
];

export const postLoginScenarios = {
  error: [
    http.post(LOGIN_ENDPOINT, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      });
    }),
  ],
};

export const postLoginMock = () =>
  resolveMock(handlers, postLoginScenarios, LOGIN_ENDPOINT);
