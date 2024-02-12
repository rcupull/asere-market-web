import { useAuth } from 'features/auth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource, FetchResourceWithPagination, PaginatedData } from 'types/api';
import { AnyRecord } from 'types/general';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useUserPostsApi = (): {
  getAllPosts: FetchResourceWithPagination<
    { routeNames?: Array<string>; filters?: AnyRecord },
    Post
  >;
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
  const getAllPostsFetch = useFetch<PaginatedData<Post>>();
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
