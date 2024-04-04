import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { defaultPageSize } from 'constants/api';
import { FetchResourceWithPagination, GetAllPostsQuery, PaginatedData } from 'types/api';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const useGetAllUserPosts = (): {
  getAllUserPosts: FetchResourceWithPagination<GetAllPostsQuery, Post>;
} => {
  const fetch = useFetch<PaginatedData<Post>>();

  const { authData } = useAuthSignIn();

  const userId = authData?.user._id || '<unknow user>';

  return {
    getAllUserPosts: {
      ...getPaginationResources(fetch[0]),
      status: fetch[1],
      fetch: (query, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/user/:userId/posts',
              urlParams: { userId },
              query: { pageSize: defaultPageSize, ...query },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
