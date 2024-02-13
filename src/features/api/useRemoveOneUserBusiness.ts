import { useAuth } from 'features/auth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useRemoveOneUserBusiness = (): {
  removeOneUserBusiness: FetchResource<{ routeName: string }, void>;
} => {
  const removeOneUserBusinessFetch = useFetch();

  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    removeOneUserBusiness: {
      data: removeOneUserBusinessFetch[0],
      status: removeOneUserBusinessFetch[1],
      fetch: ({ routeName }, options = {}) => {
        removeOneUserBusinessFetch[2](
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
    },
  };
};
