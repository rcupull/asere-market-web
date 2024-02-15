import { cookiesUtils } from 'features/cookies';
import { useApiSlice } from 'features/slices/useApiSlice';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { AuthData } from 'types/auth';
import { getEndpoint } from 'utils/api';

export const useAuthSignIn = (): {
  authData: AuthData | null;
  onSignIn: FetchResource<{ email: string; password: string }, AuthData>;
  isAdmin: boolean;
  isUser: boolean;
  isAuthenticated: boolean;
  init: () => void;
} => {
  const fetchBase = useFetch<AuthData>();
  const fetch = useApiSlice(fetchBase, 'authSignIn');

  const [authData, , , , {  setDataRedux }] = fetch;

  return {
    init: () => {
      const cookiesData = cookiesUtils.getCookie('authData');
      if (cookiesData) {
        setDataRedux(cookiesData as AuthData)
      }
    },
    isAuthenticated: !!authData,
    isAdmin: authData?.user?.role === 'admin',
    isUser: authData?.user?.role === 'user',
    authData,
    onSignIn: {
      data: authData,
      status: fetch[1],
      fetch: ({ email, password }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({ path: '/auth/sign-in' }),
            data: { email, password },
          },
          {
            ...options,
            onAfterSuccess: (response) => {
              cookiesUtils.setCookie('authData', response);
              options?.onAfterSuccess?.(response);
            },
          },
        );
      },
      reset: fetch[3],
    },
  };
};
