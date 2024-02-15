import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useAuthValidate = (): {
  authValidate: FetchResource<{ email: string; code: string }>;
} => {
  const fetch = useFetch();

  return {
    authValidate: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ code, email }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({ path: '/auth/validate' }),
            data: { code, email },
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
