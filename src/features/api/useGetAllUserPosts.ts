import { useAuth } from 'features/auth';

import { useFetch } from 'hooks/useFetch';

import { FetchResourceWithPagination, PaginatedData } from 'types/api';
import { AnyRecord } from 'types/general';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useGetAllUserPosts = (): {
  getAllUserPosts: FetchResourceWithPagination<
    { routeNames?: Array<string>; filters?: AnyRecord },
    Post
  >;
} => {
  const fetch = useFetch<PaginatedData<Post>>();

  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    getAllUserPosts: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: ({ routeNames = [], filters = {} }, options = {}) => {
        fetch[2](
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
  };
};
