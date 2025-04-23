import { gql, useMutation } from '@apollo/client';

import { GET_FORUM_QUERY } from './useGetForumGraphQL';

type AddForumRequest = {
  jmeno: string;
  email?: string;
  typ: string;
  text: string;
};

type AddForumResponse = {
  createForum: {
    result: string;
  };
};

const ADD_FORUM_MUTATION = gql`
  mutation CreateForum(
    $jmeno: String!
    $email: String
    $typ: String!
    $text: String!
  ) {
    createForum(jmeno: $jmeno, email: $email, typ: $typ, text: $text) {
      result
      message {
        id
        datum
        text
        jmeno
        email
        typ
      }
    }
  }
`;

export const useAddForumGraphQl = () => {
  const [mutate, { data, loading, error }] = useMutation<
    AddForumResponse,
    AddForumRequest
  >(ADD_FORUM_MUTATION, {
    refetchQueries: [
      {
        query: GET_FORUM_QUERY,
        variables: {
          typ: [0, 1, 2, 3, 4],
          searchText: '',
          start: 0,
          limit: 10,
        },
      },
    ],
  });

  const addForum = async (request: AddForumRequest) => {
    await mutate({ variables: request });
  };

  return {
    addForum,
    data,
    loading,
    error,
  };
};
