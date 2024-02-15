import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { FetchResource } from 'types/api';
import { Business } from 'types/business';
import { getEndpoint } from 'utils/api';

export const useAddOneUserBusiness = (): {
  addOneUserBusiness: FetchResource<
    { name: string; routeName: string; category: string },
    Business
  >;
} => {
  const fetch = useFetch<Business>();

  const { authData } = useAuthSignIn();

  const userId = authData?.user._id || '<unknow user>';

  return {
    addOneUserBusiness: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ name, category, routeName }, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/user/:userId/business',
              urlParams: { userId },
            }),
            data: { name, category, routeName },
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
