import { useApiSlice } from 'features/slices/useApiSlice';

import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { FetchResourceWithPagination, GetAllBusinessQuery, PaginatedData } from 'types/api';
import { Business } from 'types/business';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useGetAllUserBusiness = (): {
  getAllUserBussiness: FetchResourceWithPagination<GetAllBusinessQuery, Business>;
} => {
  const fetchBase = useFetch<PaginatedData<Business>>();

  const fetch = useApiSlice(fetchBase, 'useGetAllUserBusiness');

  const { authData } = useAuthSignIn();

  const userId = authData?.user._id || '<unknow user>';

  return {
    getAllUserBussiness: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: (query, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/user/:userId/business',
              urlParams: { userId },
              //(pagination: false) fetch all business by default
              query: { pagination: false, ...query },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
