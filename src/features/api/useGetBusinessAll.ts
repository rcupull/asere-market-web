import { useFetch } from 'hooks/useFetch';

import { FetchResourceWithPagination, PaginatedData } from 'types/api';
import { Business } from 'types/business';
import { AnyRecord } from 'types/general';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useGetBusinessAll = (): {
  getBusinessAll: FetchResourceWithPagination<
    { routeName?: string; filters?: AnyRecord },
    Business
  >;
} => {
  const fetch = useFetch<PaginatedData<Business>>('useGetBusinessAll');

  return {
    getBusinessAll: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: ({ routeName, filters }, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({ path: '/business', query: { routeName, ...filters } }),
          },
          options,
        );
      },
    },
  };
};
