import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useAddBusinessPostCategory = (): {
  addBusinessPostCategory: FetchResource<{ routeName: string; label: string }, void>;
} => {
  const fetch = useFetch();
  const { authData } = useAuthSignIn();

  const userId = authData?.user._id || '<unknow user>';

  return {
    addBusinessPostCategory: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName, label }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/user/:userId/business/:routeName/postCategories',
              urlParams: { userId, routeName },
            }),
            data: {
              label,
            },
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
