import { cookiesUtils } from 'features/cookies';
import { useApiSlice } from 'features/slices/useApiSlice';

import { useFetch } from 'hooks/useFetch';

import { useGetOneUser } from './useGetOneUser';

import { FetchResource } from 'types/api';
import { AuthData } from 'types/auth';
import { getEndpoint } from 'utils/api';

export const useAuthSignIn = (): {
  authData: AuthData | null;
  authSignIn: FetchResource<{ email: string; password: string }, AuthData>;
  isAdmin: boolean;
  isUser: boolean;
  isAuthenticated: boolean;
  onRefreshAuthUser: () => void;
} => {
  const fetchBase = useFetch<AuthData>();
  const fetch = useApiSlice(fetchBase, 'useAuthSignIn');

  const { getOneUser } = useGetOneUser();

  const [authData, , , , { setDataRedux }] = fetch;

  return {
    onRefreshAuthUser: () => {
      if (!authData) return;

      const userId = authData.user._id;

      getOneUser.fetch(
        {
          userId,
        },
        {
          onAfterSuccess: (user) => {
            const { token } = authData || {};

            cookiesUtils.setCookie('user', user);

            setDataRedux({
              token,
              user,
            });
          },
        },
      );
    },
    isAuthenticated: !!authData,
    isAdmin: authData?.user?.role === 'admin',
    isUser: authData?.user?.role === 'user',
    authData,
    authSignIn: {
      data: authData,
      status: fetch[1],
      fetch: ({ email: username, password }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({ path: '/auth/sign-in' }),
            data: { username, password },
          },
          {
            ...options,
            onAfterSuccess: (response) => {
              const { token, user } = response;
              cookiesUtils.setCookie('token', token);
              cookiesUtils.setCookie('user', user);
              options?.onAfterSuccess?.(response);
            },
          },
        );
      },
      reset: () => {
        cookiesUtils.removeCookie('token');
        cookiesUtils.removeCookie('user');
        fetch[3]();
      },
    },
  };
};
