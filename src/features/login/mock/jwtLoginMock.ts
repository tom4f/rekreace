import { HttpStatusCode } from 'enums';
import { resolveMock } from 'features/mocks';
import { http, HttpResponse } from 'msw';

import { JWT_LOGIN_ENDPOINT, JWTLoginResponse } from '../hooks';

const handlers = [
  http.post(JWT_LOGIN_ENDPOINT, async () => {
    return HttpResponse.json<JWTLoginResponse>({
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiQmVkcmljaCIsImV4cCI6MTc0Mzc5NTU5Nn0.blQm49FFw7aNvuAVidkfKIpg9GUweA88vLu4if28Ibk',
      user: 'MockUser',
    });
  }),
];

export const jwtLoginScenarios = {
  error: [
    http.post(JWT_LOGIN_ENDPOINT, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      });
    }),
  ],
  UNAUTHENTICATED: [
    http.post(JWT_LOGIN_ENDPOINT, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      });
    }),
  ],
};

export const jwtLoginMock = () =>
  resolveMock(handlers, jwtLoginScenarios, JWT_LOGIN_ENDPOINT);
