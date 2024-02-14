import { useAuth } from 'features/auth';

import { useFetch } from 'hooks/useFetch';

import { FetchResourceWithPagination, PaginatedData } from 'types/api';
import { Business } from 'types/business';
import { AnyRecord } from 'types/general';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useGetAllUserBusiness = (): {
  getAllUserBussiness: FetchResourceWithPagination<
    { routeName?: string; filters?: AnyRecord },
    Business
  >;
} => {
  const fetch = useFetch<PaginatedData<Business>>();

  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    getAllUserBussiness: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: ({ routeName, filters }, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/user/:userId/business',
              urlParams: { userId },
              query: { routeName, ...filters },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
