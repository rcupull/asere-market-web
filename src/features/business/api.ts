import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { Business } from 'types/business';
import { getEndpoint } from 'utils/api';

export const useBusinessApi = (): {
  getAll: FetchResource<undefined, Array<Business>>;
  getOne: FetchResource<{ id: string }, Business>;
  addOne: FetchResource<{ name: string; category: string }, Business>;
  removeOne: FetchResource<{ id: string }, void>;
} => {
  const [getAllData, getAllStatus, getAllFetch] = useFetch<Array<Business>>();
  const [getOneData, getOneStatus, getOneFetch] = useFetch<Business>();
  const [addOneData, addOneStatus, addOneFetch] = useFetch<Business>();
  const [removeOneData, removeOneStatus, removeOneFetch] = useFetch();

  return {
    getAll: {
      data: getAllData,
      status: getAllStatus,
      fetch: (_, options = {}) => {
        getAllFetch(
          {
            method: 'get',
            url: getEndpoint({ path: '/business' }),
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
      fetch: ({ name, category }, options = {}) => {
        addOneFetch(
          {
            method: 'post',
            url: getEndpoint({
              path: '/business',
            }),
            data: { name, category },
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
