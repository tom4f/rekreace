import { gql, useQuery } from '@apollo/client';

export type OneMessage = {
  id: number;
  datum: string;
  text: string;
  jmeno: string;
  email?: string;
  typ: number;
};

type FormRequest = {
  start?: number;
  limit?: number;
  searchCriteria?: string;
};

export type ForumResponse = OneMessage[];

const GET_FORUM_QUERY = gql`
  query GetForumMessages($start: Int, $limit: Int, $searchCriteria: String) {
    getForumMessages(
      start: $start
      limit: $limit
      searchCriteria: $searchCriteria
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

export const useGetForumGraphQl = (request: FormRequest) => {
  const { data, ...rest } = useQuery<{ getForumMessages: ForumResponse }>(
    GET_FORUM_QUERY,
    {
      variables: request,
    }
  );

  return { data: data?.getForumMessages ?? [], ...rest };
};
