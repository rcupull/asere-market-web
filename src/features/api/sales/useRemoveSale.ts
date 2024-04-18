import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useRemoveSale = (): {
  removeSale: FetchResource<{ routeName: string; postId?: string }, void>;
} => {
  const fetch = useFetch();

  return {
    removeSale: {
      data: fetch[0],
      status: fetch[1],
      fetch: (data, options = {}) => {
        fetch[2](
          {
            method: 'delete',
            url: getEndpoint({
              path: '/sale',
            }),
            data,
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
