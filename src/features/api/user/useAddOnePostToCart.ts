import { useAuth } from 'features/api-slices/useAuth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useAddOnePostToCart = (): {
  addOnePostToCart: FetchResource<{ postId: string; routeName: string; amountToAdd?: number }>;
} => {
  const fetch = useFetch();

  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    addOnePostToCart: {
      data: fetch[0],
      status: fetch[1],
      fetch: (data, options = {}) => {
        fetch[2](
          {
            method: 'post',
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