import { gql, useQuery } from '@apollo/client';

export type OneMessage = {
  id: number;
  datum: string;
  text: string;
  jmeno: string;
  email?: string;
  typ: number;
};

export type ForumRequest = {
  start?: number;
  limit?: number;
  searchText?: string;
  typ?: number[];
};

export type ForumResponse = OneMessage[];

export const GET_FORUM_QUERY = gql`
  query GetForumMessages(
    $start: Int
    $limit: Int
    $searchText: String
    $typ: [Int]
  ) {
    getForumMessages(
      start: $start
      limit: $limit
      searchText: $searchText
      typ: $typ
    ) {
      id
      datum
      text
      jmeno
      email
      typ
    }
  }
`;

export const useGetForumGraphQL = (request?: ForumRequest) => {
  const { data, ...rest } = useQuery<{ getForumMessages: ForumResponse }>(
    GET_FORUM_QUERY,
    {
      variables: request,
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    }
  );

  return { data: data?.getForumMessages ?? [], ...rest };
};
