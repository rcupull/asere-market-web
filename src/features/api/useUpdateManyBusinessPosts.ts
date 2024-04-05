import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { FetchResource } from 'types/api';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';

export const useUpdateManyBusinessPosts = (): {
  updateManyBusinessPosts: FetchResource<
    { routeName: string; ids?: Array<string>; all?: boolean; update: Pick<Post, 'hidden'> },
    void
  >;
} => {
  const fetch = useFetch();
  const { authData } = useAuthSignIn();

  const userId = authData?.user._id || '<unknow user>';

  return {
    updateManyBusinessPosts: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName, all, ids, update }, options = {}) => {
        fetch[2](
          {
            method: 'put',
            url: getEndpoint({
              path: '/user/:userId/business/:routeName/bulkActions/posts',
              urlParams: { userId, routeName },
            }),
            data: {
              ids,
              all,
              update,
            },
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
