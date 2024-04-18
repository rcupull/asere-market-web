import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { Sale } from 'types/sales';
import { getEndpoint } from 'utils/api';

export const useGetSales = (): {
  getSales: FetchResource<{ routeName: string }, Array<Sale>>;
} => {
  const fetch = useFetch<Array<Sale>>();

  return {
    getSales: {
      data: fetch[0],
      status: fetch[1],
      fetch: (query, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/sale',
              query,
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
