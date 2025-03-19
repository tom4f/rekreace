import {
  type ForumRequest,
  type ForumResponse,
  GET_FORUM_QUERY,
} from 'features/forum/hooks/useGetForumGraphQL';
import { resolveMock } from 'features/mocks';
import { graphql, HttpResponse } from 'msw';
import { Url } from 'src/api/paths';
import { HttpStatusCode } from 'src/enums';

import { forumResponseMock } from './mockData/forumResponseMock';

type GraphQLResponse = {
  getForumMessages: ForumResponse;
};

const handlers = [
  graphql.query<GraphQLResponse, ForumRequest>(GET_FORUM_QUERY, async () =>
    //    { variables }
    {
      return HttpResponse.json({
        data: {
          getForumMessages: forumResponseMock,
        },
      });
    }
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
