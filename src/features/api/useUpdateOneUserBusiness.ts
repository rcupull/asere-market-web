import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { FetchResource } from 'types/api';
import { Business } from 'types/business';
import { getEndpoint } from 'utils/api';

export const useUpdateOneUserBusiness = (): {
  updateOneUserBusiness: FetchResource<
    {
      routeName: string;
      update: Partial<
        Pick<
          Business,
          'hidden' | 'socialLinks' | 'bannerImages' | 'bannerImageStyle' | 'name' | 'routeName'
        >
      >;
    },
    void
  >;
} => {
  const fetch = useFetch();

  const { authData } = useAuthSignIn();

  const userId = authData?.user._id || '<unknow user>';

  return {
    updateOneUserBusiness: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName, update }, options = {}) => {
        fetch[2](
          {
            method: 'put',
            url: getEndpoint({
              path: '/user/:userId/business/:routeName',
              urlParams: { routeName, userId },
            }),
            data: update,
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
