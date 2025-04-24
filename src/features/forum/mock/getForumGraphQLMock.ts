import {
  type ForumRequest,
  type ForumResponse,
  GET_FORUM_QUERY,
} from 'features/forum/hooks/useGetForumGraphQL';
import { resolveMock } from 'features/mocks';
import { graphql, HttpResponse } from 'msw';
import { Url } from 'src/api/paths';
import { HttpStatusCode } from 'src/enums';

import { forumResponseFirstPageMock } from './mockData/forumResponseFirstPageMock';
import { forumResponseSecondPageMock } from './mockData/forumResponseSecondPageMock';
import { forumResponseThirddPageMock } from './mockData/forumResponseThirdPageMock';

type GraphQLResponse = {
  getForumMessages: ForumResponse;
};

const mockFileMap = {
  0: forumResponseFirstPageMock,
  10: forumResponseSecondPageMock,
  20: forumResponseThirddPageMock,
};

const handlers = [
  graphql.query<GraphQLResponse, ForumRequest>(
    GET_FORUM_QUERY,
    async ({ variables }) =>
      HttpResponse.json({
        data: {
          getForumMessages:
            mockFileMap[variables.start as keyof typeof mockFileMap] ??
            forumResponseFirstPageMock,
        },
      })
  ),
];

export const getForumGraphQLScenarios = {
  e500: [
    graphql.query<GraphQLResponse, ForumRequest>(GET_FORUM_QUERY, async () => {
      return new HttpResponse(null, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR_500,
      });
    }),
  ],
};

export const getForumGraphQLMock = () =>
  resolveMock(handlers, getForumGraphQLScenarios, Url.GRAPH_QL_API);
