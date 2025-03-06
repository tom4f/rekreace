import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { fotoGalleryOwner } from 'api/paths';

import { LOGIN_STATUS_KEY, LoginData } from './usePostLogin';

const useGetLoginStatus = (): UseQueryResult<LoginData, Error> => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: [LOGIN_STATUS_KEY],
    queryFn: async (): Promise<LoginData> => {
      const data = queryClient.getQueryData<LoginData>([LOGIN_STATUS_KEY]);
      if (!data) {
        throw new Error('No login data found');
      }
      return data;
    },
    enabled: false,
    initialData: {
      isLogged: false,
      webAccess: 'error',
      webToken: 'error',
      webUser: 'error',
    },
    select: (data: LoginData) => {
      const clientJSON = sessionStorage.getItem('client');
      if (!clientJSON) {
        return data;
      }

      const clientObj = JSON.parse(clientJSON);

      if (fotoGalleryOwner === clientObj.webAccess) return clientObj;

      return { ...data, isLogged: false };
    },
  });
};

export const useLoginStatus = () => {
  const {
    data: loginRQData,
    error,
    isLoading,
    isSuccess,
  } = useGetLoginStatus();

  const clientJSON = sessionStorage.getItem('client') || '{}';
  const sessionData: LoginData = JSON.parse(clientJSON);

  const loginData = (fotoGalleryOwner === sessionData.webAccess &&
    sessionData) ||
    loginRQData || {
      isLogged: false,
      webAccess: 'error',
      webToken: 'error',
      webUser: 'error',
    };

  return { data: loginData, error, isLoading, isSuccess };
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const removeSession = () => {
    sessionStorage.removeItem('client');
  };

  const invalidateQuery = () => {
    queryClient.setQueryData([LOGIN_STATUS_KEY], {
      isLogged: false,
      webAccess: 'error',
      webToken: 'error',
      webUser: 'error',
    });
  };

  return { removeSession, invalidateQuery };
};
