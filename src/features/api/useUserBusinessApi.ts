import { useAuth } from 'features/auth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource, FetchResourceWithPagination, PaginatedData } from 'types/api';
import { Business } from 'types/business';
import { AnyRecord } from 'types/general';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useUserBusinessApi = (): {
  getAllBussiness: FetchResourceWithPagination<
    { routeName?: string; filters?: AnyRecord },
    Business
  >;
  getOneBusiness: FetchResource<{ routeName: string }, Business>;
  addOneBusiness: FetchResource<{ name: string; routeName: string; category: string }, Business>;
  removeOneBusiness: FetchResource<{ routeName: string }, void>;
} => {
  const getAllBussinessFetch = useFetch<PaginatedData<Business>>();

  const getOneBusinessFetch = useFetch<Business>();
  const addOneBusinessFetch = useFetch<Business>();
  const removeOneBusinessFetch = useFetch();

  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    getAllBussiness: {
      ...getPaginationResources(getAllBussinessFetch[0]),
      status: getAllBussinessFetch[1],
      fetch: ({ routeName, filters }, options = {}) => {
        getAllBussinessFetch[2](
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
    },
    getOneBusiness: {
      data: getOneBusinessFetch[0],
      status: getOneBusinessFetch[1],
      fetch: ({ routeName }, options = {}) => {
        getOneBusinessFetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/user/:userId/business/:routeName',
              urlParams: {
                routeName,
                userId,
              },
            }),
          },
          options,
        );
      },
    },
    addOneBusiness: {
      data: addOneBusinessFetch[0],
      status: addOneBusinessFetch[1],
      fetch: ({ name, category, routeName }, options = {}) => {
        addOneBusinessFetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/user/:userId/business',
              urlParams: { userId },
            }),
            data: { name, category, routeName },
          },
          options,
        );
      },
    },
    removeOneBusiness: {
      data: removeOneBusinessFetch[0],
      status: removeOneBusinessFetch[1],
      fetch: ({ routeName }, options = {}) => {
        removeOneBusinessFetch[2](
          {
            method: 'delete',
            url: getEndpoint({
              path: '/user/:userId/business/:routeName',
              urlParams: { routeName, userId },
            }),
          },
          options,
        );
      },
    },
  };
};
