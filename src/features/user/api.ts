import { useAuth } from 'features/auth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource, FetchResourceWithPagination, PaginatedData } from 'types/api';
import { Business } from 'types/business';
import { AnyRecord } from 'types/general';
import { Post, PostCurrency } from 'types/post';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useUserApi = (): {
  getAllBussiness: FetchResourceWithPagination<
    { routeName?: string; filters?: AnyRecord },
    Business
  >;
  getOneBusiness: FetchResource<{ id: string }, Business>;
  addOneBusiness: FetchResource<{ name: string; routeName: string; category: string }, Business>;
  removeOneBusiness: FetchResource<{ id: string }, void>;
  //
  addOnePost: FetchResource<
    {
      routeName: string;
      name: string;
      description: string;
      amountAvailable?: number;
      currency: PostCurrency;
      price: number;
    },
    Post
  >;
  removeOnePost: FetchResource<{ id: string }, void>;
} => {
  const getAllBussinessFetch = useFetch<PaginatedData<Business>>();
  const getOneBusinessFetch = useFetch<Business>();
  const addOneBusinessFetch = useFetch<Business>();
  const removeOneBusinessFetch = useFetch();

  const addOnePostFetch = useFetch<Post>();
  const removeOnePostFetch = useFetch();

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
      fetch: ({ id }, options = {}) => {
        getOneBusinessFetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/user/:userId/business/:id',
              urlParams: {
                id,
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
      fetch: ({ id }, options = {}) => {
        removeOneBusinessFetch[2](
          {
            method: 'delete',
            url: getEndpoint({
              path: '/user/:userId/business/:id',
              urlParams: { id, userId },
            }),
          },
          options,
        );
      },
    },
    addOnePost: {
      data: addOnePostFetch[0],
      status: addOnePostFetch[1],
      fetch: ({ name, routeName, currency, description, price, amountAvailable }, options = {}) => {
        addOnePostFetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/user/:userId/posts',
              urlParams: { userId },
            }),
            data: { routeName, name, currency, description, price, amountAvailable },
          },
          options,
        );
      },
    },
    removeOnePost: {
      data: removeOnePostFetch[0],
      status: removeOnePostFetch[1],
      fetch: ({ id }, options = {}) => {
        removeOnePostFetch[2](
          {
            method: 'delete',
            url: getEndpoint({
              path: '/user/:userId/posts/:id',
              urlParams: { id, userId },
            }),
          },
          options,
        );
      },
    },
  };
};
