import { useFetch } from 'hooks/useFetch';

import { FetchResource, FetchResourceWithPagination, PaginatedData } from 'types/api';
import { AnyRecord } from 'types/general';
import { Post, PostCurrency } from 'types/post';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const usePostsApi = (): {
  getAll: FetchResourceWithPagination<{ businessIds?: Array<string>; filters?: AnyRecord }, Post>;
  getOne: FetchResource<{ id: string }, Post>;
  addOne: FetchResource<
    {
      businessId: string;
      name: string;
      description: string;
      amountAvailable?: number;
      currency: PostCurrency;
      price: number;
    },
    Post
  >;
  removeOne: FetchResource<{ id: string }, void>;
} => {
  const [getAllData, getAllStatus, getAllFetch] = useFetch<PaginatedData<Post>>();
  const [getOneData, getOneStatus, getOneFetch] = useFetch<Post>();
  const [addOneData, addOneStatus, addOneFetch] = useFetch<Post>();
  const [removeOneData, removeOneStatus, removeOneFetch] = useFetch();

  return {
    getAll: {
      ...getPaginationResources(getAllData),
      status: getAllStatus,
      fetch: ({ businessIds = [], filters = {} }, options = {}) => {
        getAllFetch(
          {
            method: 'get',
            url: getEndpoint({
              path: '/posts',
              params: { businessIds, ...filters },
            }),
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
              path: '/posts/:id',
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
      fetch: (
        { name, businessId, currency, description, price, amountAvailable },
        options = {},
      ) => {
        addOneFetch(
          {
            method: 'post',
            url: getEndpoint({
              path: '/posts',
            }),
            data: { businessId, name, currency, description, price, amountAvailable },
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
              path: '/posts/:id',
              urlParams: { id },
            }),
          },
          options,
        );
      },
    },
  };
};
