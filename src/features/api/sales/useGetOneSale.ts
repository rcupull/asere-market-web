import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { Sale } from 'types/sales';
import { getEndpoint } from 'utils/api';

export const useGetOneSale = (): {
  getOneSale: FetchResource<{ saleId: string }, Sale>;
} => {
  const fetch = useFetch<Sale>();

  return {
    getOneSale: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ saleId }, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/sale/:saleId',
              urlParams: { saleId },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
