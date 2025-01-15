import { http, HttpResponse } from 'msw';

import { HttpStatusCode } from '../../../enums';
import { resolveMock } from '../../mocks/mockResolver';
import { LOGIN_ENDPOINT, LoginResponse } from '../hooks';

const handlers = [
  http.post(LOGIN_ENDPOINT, async () => {
    return HttpResponse.json<LoginResponse>({
      webToken: '97f9f2b55e0d946196482cfcf046eaaa',
      webAccess: '_ubytovani',
      webUser: 'User Mock',
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
