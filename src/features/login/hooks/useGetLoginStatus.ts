import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { fotoGalleryOwner } from 'api/paths';

import { LOGIN_STATUS_KEY, LoginData } from './usePostLogin';

const useGetLoginStatus = (): UseQueryResult<LoginData, Error> => {
  return useQuery({
    queryKey: [LOGIN_STATUS_KEY],
    //queryFn:
    //enabled: false,
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

  let loginSessionData = {
    isLogged: false,
    webAccess: 'error',
    webToken: 'error',
    webUser: 'error',
  };

  const clientJSON = sessionStorage.getItem('client');
  if (clientJSON) {
    const clientObj = JSON.parse(clientJSON);

    if (fotoGalleryOwner === clientObj.webAccess) {
      loginSessionData = clientObj;
    }
  }

  const loginData = loginSessionData || loginRQData;

  return { data: loginData, error, isLoading, isSuccess };
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const removeSession = () => {
    sessionStorage.removeItem('client');
  };

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [LOGIN_STATUS_KEY],
    });
  };

  return { removeSession, invalidateQuery };
};
