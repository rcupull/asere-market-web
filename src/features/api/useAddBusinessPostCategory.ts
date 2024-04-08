import { useAuth } from 'features/api-slices/useAuth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useAddBusinessPostCategory = (): {
  addBusinessPostCategory: FetchResource<{ routeName: string; label: string; tag: string }, void>;
} => {
  const fetch = useFetch();
  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    addBusinessPostCategory: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName, label, tag }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/user/:userId/business/:routeName/postCategories',
              urlParams: { userId, routeName },
            }),
            data: {
              label,
              tag,
            },
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
