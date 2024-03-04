import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { FetchResource } from 'types/api';
import { PostCategory } from 'types/business';
import { getEndpoint } from 'utils/api';

export const useGetBusinessPostCategories = (): {
  getBusinessPostCategories: FetchResource<{ routeName: string }, Array<PostCategory>>;
} => {
  const fetch = useFetch<Array<PostCategory>>();
  const { authData } = useAuthSignIn();

  const userId = authData?.user._id || '<unknow user>';

  return {
    getBusinessPostCategories: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ routeName }, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/user/:userId/business/:routeName/postCategories',
              urlParams: { userId, routeName },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
