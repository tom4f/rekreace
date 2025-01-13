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
  start?: number;
  limit?: number;
  searchCriteria?: string;
};

export type ForumResponse = OneMessage[];

export const GET_FORUM_ENDPOINT = `${Url.NEW_API}/forum/read.php?{start}{limit}{searchCriteria}`;
export const GET_FORUM_KEY = 'getForum';

const getForum = async (request: FormRequest): Promise<ForumResponse> => {
  const params = new URLSearchParams();
  if (request?.start !== undefined)
    params.append('start', request.start.toString());
  if (request?.limit !== undefined)
    params.append('limit', request.limit.toString());
  if (request?.searchCriteria)
    params.append('searchCriteria', request.searchCriteria);

  const data = await api.get({
    url: `${Url.NEW_API}/forum/read.php?${params.toString()}`,
  });

  return data;
};

export const useGetForum = (request: FormRequest) => {
  return useQuery({
    queryKey: [GET_FORUM_KEY, request.searchCriteria],
    queryFn: () => getForum(request),
  });
};
