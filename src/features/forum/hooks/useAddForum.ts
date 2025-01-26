import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Url } from 'api/paths';
import { api } from 'api/utils';
import { GET_FORUM_KEY } from './useGetForum';

type AddForumRequest = {
  jmeno: string;
  email: string;
  typ: string;
  text: string;
  antispam: number;
  antispamForm: string;
};

type AddForumResponse = {
  result: string;
};

export type AddForumErrorResponse = AxiosError & {
  data: { result: string };
};

export const ADD_FORUM_ENDPOINT = `${Url.NEW_API}/forum/create.php`;
export const ADD_FORUM_KEY = 'addForum';

const addForum = async (
  request: AddForumRequest
): Promise<AddForumResponse> => {
  const { data } = await api
    .post({
      url: ADD_FORUM_ENDPOINT,
      data: request,
    })
    .catch((error: AddForumErrorResponse) => {
      return Promise.reject(error);
    });

  return data;
};

export const useAddForum = () => {
  const queryClient = useQueryClient();
  return useMutation<AddForumResponse, AddForumErrorResponse, AddForumRequest>({
    mutationFn: addForum,
    mutationKey: [ADD_FORUM_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_FORUM_KEY] });
    },
  });
};
