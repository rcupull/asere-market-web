import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { FetchResource, GetAllPostsQuery } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useDeleteManyBusinessPosts = (): {
  deleteManyBusinessPosts: FetchResource<
    {
      routeName: string;
      ids?: Array<string>;
      query?: Pick<GetAllPostsQuery, 'postCategoriesMethod' | 'postCategoriesTags' | 'search'>;
    },
    void
  >;
} => {
  const fetch = useFetch();
  const { authData } = useAuthSignIn();

  const userId = authData?.user._id || '<unknow user>';

  return {
    deleteManyBusinessPosts: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName, query, ids }, options = {}) => {
        fetch[2](
          {
            method: 'delete',
            url: getEndpoint({
              path: '/user/:userId/business/:routeName/bulkActions/posts',
              urlParams: { userId, routeName },
            }),
            data: {
              ids,
              query,
            },
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
