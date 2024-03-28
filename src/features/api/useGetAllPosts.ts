import { useFetch } from 'hooks/useFetch';

import { FetchResourceWithPagination, PaginatedData } from 'types/api';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export type GetAllPostsQuery = {
  routeNames?: Array<string>;
  postCategoriesMethod?: 'every' | 'some';
  postCategoriesTags?: Array<string>;
  search?: string;
};

export const useGetAllPosts = (): {
  getAllPosts: FetchResourceWithPagination<GetAllPostsQuery, Post>;
} => {
  const fetch = useFetch<PaginatedData<Post>>();

  return {
    getAllPosts: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: (query, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/posts',
              query,
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
