import { useQuery } from '@tanstack/react-query';
import { Url } from '../../../api/paths';
import { api } from '../../../api/utils';

export type OneMessage = {
  id: number;
  datum: string;
  text: string;
  jmeno: string;
  email?: string;
  typ: number;
};

type FormRequest = {
  start: number;
  limit: number;
  searchCriteria: string;
};

export type ForumResponse = OneMessage[];

export const GET_FORUM_ENDPOINT = `${Url.NEW_API}/forum/read.php?{searchCriteria}{start}{limit}`;
export const GET_FORUM_KEY = 'getForum';

const getForum = async (request: FormRequest): Promise<ForumResponse> => {
  const data = await api.get({
    url: GET_FORUM_ENDPOINT.replace(
      '{searchCriteria}',
      `&searchCriteria=${request.searchCriteria}`
    )
      .replace('{start}', `&start=${request.start.toString()}`)
      .replace('{limit}', `&limit=${request.limit.toString()}`),
  });

  return data;
};

export const useGetForum = (request: FormRequest) => {
  return useQuery({
    queryKey: [GET_FORUM_KEY, request.searchCriteria],
    queryFn: () => getForum(request),
  });
};
