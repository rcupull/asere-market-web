import { useFetch } from 'hooks/useFetch';

import { FetchResource, FetchResourceWithPagination, PaginatedData } from 'types/api';
import { Business } from 'types/business';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useBusinessApi = (): {
  getAll: FetchResourceWithPagination<{ routeName?: string }, Business>;
  getOne: FetchResource<{ id: string }, Business>;
  addOne: FetchResource<{ name: string; routeName: string; category: string }, Business>;
  removeOne: FetchResource<{ id: string }, void>;
} => {
  const [getAllData, getAllStatus, getAllFetch] = useFetch<PaginatedData<Business>>();
  const [getOneData, getOneStatus, getOneFetch] = useFetch<Business>();
  const [addOneData, addOneStatus, addOneFetch] = useFetch<Business>();
  const [removeOneData, removeOneStatus, removeOneFetch] = useFetch();

  return {
    getAll: {
      ...getPaginationResources(getAllData),
      status: getAllStatus,
      fetch: ({ routeName }, options = {}) => {
        getAllFetch(
          {
            method: 'get',
            url: getEndpoint({ path: '/business', params: { routeName } }),
          },
          options,
        );
      },
    },
    getOne: {
      data: getOneData,
      status: getOneStatus,
      fetch: ({ id }, options = {}) => {
        getOneFetch(
          {
            method: 'get',
            url: getEndpoint({
              path: '/business/:id',
              urlParams: {
                id,
              },
            }),
          },
          options,
        );
      },
    },
    addOne: {
      data: addOneData,
      status: addOneStatus,
      fetch: ({ name, category, routeName }, options = {}) => {
        addOneFetch(
          {
            method: 'post',
            url: getEndpoint({
              path: '/business',
            }),
            data: { name, category, routeName },
          },
          options,
        );
      },
    },
    removeOne: {
      data: removeOneData,
      status: removeOneStatus,
      fetch: ({ id }, options = {}) => {
        removeOneFetch(
          {
            method: 'delete',
            url: getEndpoint({
              path: '/business/:id',
              urlParams: { id },
            }),
          },
          options,
        );
      },
    },
  };
};
