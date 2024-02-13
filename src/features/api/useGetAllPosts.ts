import { useFetch } from 'hooks/useFetch';

import { FetchResourceWithPagination, PaginatedData } from 'types/api';
import { AnyRecord } from 'types/general';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useGetAllPosts = (): {
  getAllPosts: FetchResourceWithPagination<
    { routeNames?: Array<string>; filters?: AnyRecord },
    Post
  >;
} => {
  const fetch = useFetch<PaginatedData<Post>>();

  return {
    getAllPosts: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: ({ routeNames = [], filters = {} }, options = {}) => {
        fetch[2](
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
  };
};
