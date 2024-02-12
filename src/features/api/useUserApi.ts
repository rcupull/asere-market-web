import { useAuth } from 'features/auth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource, FetchResourceWithPagination, PaginatedData } from 'types/api';
import { Business } from 'types/business';
import { AnyRecord } from 'types/general';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useUserApi = (): {
  getAllPosts: FetchResourceWithPagination<
    { routeNames?: Array<string>; filters?: AnyRecord },
    Post
  >;
  getAllBussiness: FetchResourceWithPagination<
    { routeName?: string; filters?: AnyRecord },
    Business
  >;
  getOneBusiness: FetchResource<{ routeName: string }, Business>;
  addOneBusiness: FetchResource<{ name: string; routeName: string; category: string }, Business>;
  removeOneBusiness: FetchResource<{ routeName: string }, void>;
  //
  addOnePost: FetchResource<
    Pick<
      Post,
      | 'routeName'
      | 'clothingSizes'
      | 'colors'
      | 'currency'
      | 'description'
      | 'details'
      | 'highlights'
      | 'name'
      | 'price'
      | 'reviews'
      | 'images'
    >,
    Post
  >;
  removeOnePost: FetchResource<{ id: string }, void>;
  updateOnePost: FetchResource<{ id: string } & Partial<Post>, void>;
  updateManyPosts: FetchResource<
    Array<
      { id: string } & Partial<
        Pick<
          Post,
          | 'hidden'
          | 'clothingSizes'
          | 'colors'
          | 'currency'
          | 'description'
          | 'details'
          | 'highlights'
          | 'images'
          | 'price'
        >
      >
    >,
    void
  >;
} => {
  const getAllBussinessFetch = useFetch<PaginatedData<Business>>();
  const getAllPostsFetch = useFetch<PaginatedData<Post>>();

  const getOneBusinessFetch = useFetch<Business>();
  const addOneBusinessFetch = useFetch<Business>();
  const removeOneBusinessFetch = useFetch();

  const addOnePostFetch = useFetch<Post>();
  const removeOnePostFetch = useFetch();
  const updateOnePostFetch = useFetch();
  const updateManyPostsFetch = useFetch();

  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    getAllPosts: {
      ...getPaginationResources(getAllPostsFetch[0]),
      status: getAllPostsFetch[1],
      fetch: ({ routeNames = [], filters = {} }, options = {}) => {
        getAllPostsFetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/user/:userId/posts',
              urlParams: { userId },
              query: { routeNames, ...filters },
            }),
          },
          options,
        );
      },
    },
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
    addOnePost: {
      data: addOnePostFetch[0],
      status: addOnePostFetch[1],
      fetch: (data, options = {}) => {
        addOnePostFetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/user/:userId/posts',
              urlParams: { userId },
            }),
            data,
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
    updateOnePost: {
      data: updateOnePostFetch[0],
      status: updateOnePostFetch[1],
      fetch: ({ id, ...data }, options = {}) => {
        updateOnePostFetch[2](
          {
            method: 'put',
            url: getEndpoint({
              path: '/user/:userId/posts/:id',
              urlParams: { id, userId },
            }),
            data,
          },
          options,
        );
      },
    },
    updateManyPosts: {
      data: updateManyPostsFetch[0],
      status: updateManyPostsFetch[1],
      fetch: (args, options = {}) => {
        updateManyPostsFetch[2](
          args.map(({ id, ...data }) => {
            return {
              method: 'put',
              url: getEndpoint({
                path: '/user/:userId/posts/:id',
                urlParams: { id, userId },
              }),
              data,
            };
          }),
          options,
        );
      },
    },
  };
};
