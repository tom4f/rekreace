import { HttpStatusCode } from 'enums';
import { resolveMock } from 'features/mocks';
import { http, HttpResponse } from 'msw';

import { ForumResponse, GET_FORUM_ENDPOINT } from '../hooks';
import { forumResponseMock } from './mockData/forumResponseMock';

const handlers = [
  http.get(GET_FORUM_ENDPOINT, async () => {
    return HttpResponse.json<ForumResponse>(forumResponseMock);
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
