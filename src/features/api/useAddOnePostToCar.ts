import { useAuth } from 'features/api-slices/useAuth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useAddOnePostToCar = (): {
  addOnePostToCar: FetchResource<{ postId: string }>;
} => {
  const fetch = useFetch();

  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    addOnePostToCar: {
      data: fetch[0],
      status: fetch[1],
      fetch: (data, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/user/:userId/shopping/car',
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
