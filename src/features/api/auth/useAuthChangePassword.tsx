import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { AuthData } from 'types/auth';
import { getEndpoint } from 'utils/api';

export const useAuthChangePassword = (): {
  authChangePassword: FetchResource<{ newPassword: string }, AuthData>;
} => {
  const fetch = useFetch<AuthData>();

  return {
    authChangePassword: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ newPassword }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({ path: '/auth/change-password' }),
            data: { newPassword },
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
