import { useAuth } from 'features/api-slices/useAuth';

import { useFetch } from 'hooks/useFetch';

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
          | 'hidden'
          | 'socialLinks'
          | 'bannerImages'
          | 'name'
          | 'routeName'
          | 'logo'
          | 'layouts'
          | 'aboutUsPage'
          | 'whatsAppPhoneNumber'
        >
      >;
    },
    void
  >;
} => {
  const fetch = useFetch();

  const { authData } = useAuth();

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
