import { useAuth } from 'features/auth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource, FetchResourceWithPagination, PaginatedData } from 'types/api';
import { AnyRecord } from 'types/general';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useUserPostsApi = (): {
  getAllUserPosts: FetchResourceWithPagination<
    { routeNames?: Array<string>; filters?: AnyRecord },
    Post
  >;
  addOneUserPost: FetchResource<
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
  removeOneUserPost: FetchResource<{ id: string }, void>;
  updateOneUserPost: FetchResource<{ id: string } & Partial<Post>, void>;
  updateManyUserPosts: FetchResource<
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
  const getAllUserPostsFetch = useFetch<PaginatedData<Post>>();
  const addOneUserPostFetch = useFetch<Post>();
  const removeOneUserPostFetch = useFetch();
  const updateOneUserPostFetch = useFetch();
  const updateManyUserPostsFetch = useFetch();

  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    getAllUserPosts: {
      ...getPaginationResources(getAllUserPostsFetch[0]),
      status: getAllUserPostsFetch[1],
      fetch: ({ routeNames = [], filters = {} }, options = {}) => {
        getAllUserPostsFetch[2](
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
    addOneUserPost: {
      data: addOneUserPostFetch[0],
      status: addOneUserPostFetch[1],
      fetch: (data, options = {}) => {
        addOneUserPostFetch[2](
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
    removeOneUserPost: {
      data: removeOneUserPostFetch[0],
      status: removeOneUserPostFetch[1],
      fetch: ({ id }, options = {}) => {
        removeOneUserPostFetch[2](
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
    updateOneUserPost: {
      data: updateOneUserPostFetch[0],
      status: updateOneUserPostFetch[1],
      fetch: ({ id, ...data }, options = {}) => {
        updateOneUserPostFetch[2](
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
    updateManyUserPosts: {
      data: updateManyUserPostsFetch[0],
      status: updateManyUserPostsFetch[1],
      fetch: (args, options = {}) => {
        updateManyUserPostsFetch[2](
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
