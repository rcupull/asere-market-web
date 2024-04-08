import { useAuth } from 'features/api-slices/useAuth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { PostCategory } from 'types/business';
import { getEndpoint } from 'utils/api';

export const useUpdateBusinessPostCategory = (): {
  updateBusinessPostCategory: FetchResource<
    { routeName: string; tag: string; update: Partial<Pick<PostCategory, 'hidden'>> },
    void
  >;
} => {
  const fetch = useFetch();
  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    updateBusinessPostCategory: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName, update, tag }, options = {}) => {
        fetch[2](
          {
            method: 'put',
            url: getEndpoint({
              path: '/user/:userId/business/:routeName/postCategories/:tag',
              urlParams: { userId, routeName, tag },
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
