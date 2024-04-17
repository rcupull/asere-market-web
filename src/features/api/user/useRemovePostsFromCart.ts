import { useAuth } from 'features/api-slices/useAuth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useRemovePostsFromCart = (): {
  removePostsFromCart: FetchResource<{ routeName?: string; postId?: string }>;
} => {
  const fetch = useFetch();

  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    removePostsFromCart: {
      data: fetch[0],
      status: fetch[1],
      fetch: (data, options = {}) => {
        fetch[2](
          {
            method: 'delete',
            url: getEndpoint({
              path: '/user/shoppingCart',
              urlParams: { userId },
            }),
            data,
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
