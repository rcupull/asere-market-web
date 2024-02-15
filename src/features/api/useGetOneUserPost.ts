import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { FetchResource } from 'types/api';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';

export const useGetOneUserPost = (): {
  getOneUserPost: FetchResource<{ id: string }, Post>;
} => {
  const fetch = useFetch<Post>();

  const { authData } = useAuthSignIn();

  const userId = authData?.user._id || '<unknow user>';

  return {
    getOneUserPost: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ id }, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/user/:userId/posts/:id',
              urlParams: {
                id,
                userId,
              },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
