import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { Post, PostCurrency } from 'types/post';
import { getEndpoint } from 'utils/api';

export const usePostsApi = (): {
  getAll: FetchResource<{ businessId?: string }, Array<Post>>;
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
  const [getAllData, getAllStatus, getAllFetch] = useFetch<Array<Post>>();
  const [getOneData, getOneStatus, getOneFetch] = useFetch<Post>();
  const [addOneData, addOneStatus, addOneFetch] = useFetch<Post>();
  const [removeOneData, removeOneStatus, removeOneFetch] = useFetch();

  return {
    getAll: {
      data: getAllData,
      status: getAllStatus,
      fetch: ({ businessId }, options = {}) => {
        getAllFetch(
          {
            method: 'get',
            url: businessId
              ? getEndpoint({
                  path: '/business/:businessId/posts',
                  urlParams: { businessId },
                })
              : getEndpoint({ path: '/posts' }),
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
              path: '/business/:businessId/posts',
              urlParams: { businessId },
            }),
            data: { name, currency, description, price, amountAvailable },
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
