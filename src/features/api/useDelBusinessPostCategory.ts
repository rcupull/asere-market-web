import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useDelBusinessPostCategory = (): {
  delBusinessPostCategory: FetchResource<{ routeName: string; tag: string }, void>;
} => {
  const fetch = useFetch();
  const { authData } = useAuthSignIn();

  const userId = authData?.user._id || '<unknow user>';

  return {
    delBusinessPostCategory: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName, tag }, options = {}) => {
        fetch[2](
          {
            method: 'delete',
            url: getEndpoint({
              path: '/user/:userId/business/:routeName/postCategories/:tag',
              urlParams: { userId, routeName, tag },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
