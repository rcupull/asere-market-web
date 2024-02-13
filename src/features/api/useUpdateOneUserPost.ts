import { useAuth } from 'features/auth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';

export const useUpdateOneUserPost = (): {
  updateOneUserPost: FetchResource<{ id: string } & Partial<Post>, void>;
} => {
  const fetch = useFetch();

  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    updateOneUserPost: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ id, ...data }, options = {}) => {
        fetch[2](
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
  };
};
