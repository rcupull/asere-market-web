import { useApiSlice } from 'features/slices/useApiSlice';

import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

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
  const fetchBase = useFetch<PaginatedData<Business>>();

  const fetch = useApiSlice(fetchBase, 'useGetAllUserBusiness');

  const { authData } = useAuthSignIn();

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
              //(pagination: false) fetch all business by default
              query: { pagination: false, routeName, ...filters },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
