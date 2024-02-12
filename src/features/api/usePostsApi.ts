import { useFetch } from 'hooks/useFetch';

import { FetchResource, FetchResourceWithPagination, PaginatedData } from 'types/api';
import { AnyRecord } from 'types/general';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const usePostsApi = (): {
  getAllPosts: FetchResourceWithPagination<
    { routeNames?: Array<string>; filters?: AnyRecord },
    Post
  >;
  getOnePost: FetchResource<{ id: string }, Post>;
} => {
  const getAllPostsFetch = useFetch<PaginatedData<Post>>();
  const getOnePostFetch = useFetch<Post>();

  return {
    getAllPosts: {
      ...getPaginationResources(getAllPostsFetch[0]),
      status: getAllPostsFetch[1],
      fetch: ({ routeNames = [], filters = {} }, options = {}) => {
        getAllPostsFetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/posts',
              query: { routeNames, ...filters },
            }),
          },
          options,
        );
      },
    },
    getOnePost: {
      data: getOnePostFetch[0],
      status: getOnePostFetch[1],
      fetch: ({ id }, options = {}) => {
        getOnePostFetch[2](
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
  };
};
