import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useSaleMakeOrder = (): {
  saleMakeOrder: FetchResource<{ saleId: string }, void>;
} => {
  const fetch = useFetch();

  return {
    saleMakeOrder: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ saleId }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/sale/:saleId/makeOrder',
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
