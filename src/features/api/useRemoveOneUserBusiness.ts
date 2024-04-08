import { useAuth } from 'features/api-slices/useAuth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useRemoveOneUserBusiness = (): {
  removeOneUserBusiness: FetchResource<{ routeName: string }, void>;
} => {
  const fetch = useFetch();

  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    removeOneUserBusiness: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName }, options = {}) => {
        fetch[2](
          {
            method: 'delete',
            url: getEndpoint({
              path: '/user/:userId/business/:routeName',
              urlParams: { routeName, userId },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
