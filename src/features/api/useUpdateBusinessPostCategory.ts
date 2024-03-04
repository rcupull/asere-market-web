import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { FetchResource } from 'types/api';
import { PostCategory } from 'types/business';
import { getEndpoint } from 'utils/api';

export const useUpdateBusinessPostCategory = (): {
  updateBusinessPostCategory: FetchResource<
    { routeName: string; postCategoryId: string; update: Partial<Pick<PostCategory, 'hidden'>> },
    void
  >;
} => {
  const fetch = useFetch();
  const { authData } = useAuthSignIn();

  const userId = authData?.user._id || '<unknow user>';

  return {
    updateBusinessPostCategory: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName, update, postCategoryId }, options = {}) => {
        fetch[2](
          {
            method: 'put',
            url: getEndpoint({
              path: '/user/:userId/business/:routeName/postCategories',
              urlParams: { userId, routeName },
            }),
            data: {
              postCategoryId,
              ...update,
            },
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
