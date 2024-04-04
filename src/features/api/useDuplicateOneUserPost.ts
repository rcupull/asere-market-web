import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { FetchResource } from 'types/api';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';

export const useDuplicateOneUserPost = (): {
  duplicateOneUserPost: FetchResource<{ postId: string }, Post>;
} => {
  const fetch = useFetch<Post>();

  const { authData } = useAuthSignIn();

  const userId = authData?.user._id || '<unknow user>';

  return {
    duplicateOneUserPost: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ postId }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/user/:userId/posts/:postId/duplicate',
              urlParams: { userId, postId },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
