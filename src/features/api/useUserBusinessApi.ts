import { useAuth } from 'features/auth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource, FetchResourceWithPagination, PaginatedData } from 'types/api';
import { Business } from 'types/business';
import { AnyRecord } from 'types/general';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useUserBusinessApi = (): {
  getAllUserBussiness: FetchResourceWithPagination<
    { routeName?: string; filters?: AnyRecord },
    Business
  >;
  getOneUserBusiness: FetchResource<{ routeName: string }, Business>;
  addOneUserBusiness: FetchResource<
    { name: string; routeName: string; category: string },
    Business
  >;
  removeOneUserBusiness: FetchResource<{ routeName: string }, void>;
} => {
  const getAllUserBussinessFetch = useFetch<PaginatedData<Business>>();

  const getOneUserBusinessFetch = useFetch<Business>();
  const addOneUserBusinessFetch = useFetch<Business>();
  const removeOneUserBusinessFetch = useFetch();

  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    getAllUserBussiness: {
      ...getPaginationResources(getAllUserBussinessFetch[0]),
      status: getAllUserBussinessFetch[1],
      fetch: ({ routeName, filters }, options = {}) => {
        getAllUserBussinessFetch[2](
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
    getOneUserBusiness: {
      data: getOneUserBusinessFetch[0],
      status: getOneUserBusinessFetch[1],
      fetch: ({ routeName }, options = {}) => {
        getOneUserBusinessFetch[2](
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
    addOneUserBusiness: {
      data: addOneUserBusinessFetch[0],
      status: addOneUserBusinessFetch[1],
      fetch: ({ name, category, routeName }, options = {}) => {
        addOneUserBusinessFetch[2](
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
    removeOneUserBusiness: {
      data: removeOneUserBusinessFetch[0],
      status: removeOneUserBusinessFetch[1],
      fetch: ({ routeName }, options = {}) => {
        removeOneUserBusinessFetch[2](
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
