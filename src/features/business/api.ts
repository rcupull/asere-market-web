import { useFetch } from 'hooks/useFetch';

import { FetchResource, FetchResourceWithPagination, PaginatedData } from 'types/api';
import { Business } from 'types/business';
import { AnyRecord } from 'types/general';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useBusinessApi = (): {
  getAll: FetchResourceWithPagination<{ routeName?: string; filters?: AnyRecord }, Business>;
  getAllPublic: FetchResourceWithPagination<{ routeName?: string; filters?: AnyRecord }, Business>;
  getOne: FetchResource<{ id: string }, Business>;
  getOnePublic: FetchResource<{ id: string }, Business>;
  addOne: FetchResource<{ name: string; routeName: string; category: string }, Business>;
  removeOne: FetchResource<{ id: string }, void>;
} => {
  const [getAllData, getAllStatus, getAllFetch] = useFetch<PaginatedData<Business>>();
  const [getAllPublicData, getAllPublicStatus, getAllPublicFetch] =
    useFetch<PaginatedData<Business>>();

  const [getOneData, getOneStatus, getOneFetch] = useFetch<Business>();
  const [getOnePublicData, getOnePublicStatus, getOnePublicFetch] = useFetch<Business>();

  const [addOneData, addOneStatus, addOneFetch] = useFetch<Business>();
  const [removeOneData, removeOneStatus, removeOneFetch] = useFetch();

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
    getAllPublic: {
      ...getPaginationResources(getAllPublicData),
      status: getAllPublicStatus,
      fetch: ({ routeName, filters }, options = {}) => {
        getAllPublicFetch(
          {
            method: 'get',
            url: getEndpoint({ path: '/public/business', params: { routeName, ...filters } }),
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
    getOnePublic: {
      data: getOnePublicData,
      status: getOnePublicStatus,
      fetch: ({ id }, options = {}) => {
        getOnePublicFetch(
          {
            method: 'get',
            url: getEndpoint({
              path: '/public/business/:id',
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
