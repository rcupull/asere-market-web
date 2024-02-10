import { useFetch } from 'hooks/useFetch';

import { FetchResource, FetchResourceWithPagination, PaginatedData } from 'types/api';
import { Business } from 'types/business';
import { AnyRecord } from 'types/general';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useBusinessApi = (): {
  getAll: FetchResourceWithPagination<{ routeName?: string; filters?: AnyRecord }, Business>;
  getOne: FetchResource<{ routeName: string }, Business>;
} => {
  const [getAllData, getAllStatus, getAllFetch] = useFetch<PaginatedData<Business>>();
  const [getOneData, getOneStatus, getOneFetch] = useFetch<Business>();

  return {
    getAll: {
      ...getPaginationResources(getAllData),
      status: getAllStatus,
      fetch: ({ routeName, filters }, options = {}) => {
        getAllFetch(
          {
            method: 'get',
            url: getEndpoint({ path: '/business', params: { routeName, ...filters } }),
          },
          options,
        );
      },
    },
    getOne: {
      data: getOneData,
      status: getOneStatus,
      fetch: ({ routeName }, options = {}) => {
        getOneFetch(
          {
            method: 'get',
            url: getEndpoint({
              path: '/business/:routeName',
              urlParams: {
                routeName,
              },
            }),
          },
          options,
        );
      },
    },
  };
};
