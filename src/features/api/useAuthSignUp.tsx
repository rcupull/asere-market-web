import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useAuthSignUp = (): {
  authSignUp: FetchResource<{ email: string; password: string; name: string }>;
} => {
  const fetch = useFetch();

  return {
    authSignUp: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ email, name, password }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({ path: '/auth/sign-up' }),
            data: { email, password, name },
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
