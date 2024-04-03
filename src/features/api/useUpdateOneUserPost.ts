import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { FetchResource } from 'types/api';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';

export const useUpdateOneUserPost = (): {
  updateOneUserPost: FetchResource<
    { postId: string } & Partial<
      Pick<
        Post,
        | 'clothingSizes'
        | 'colors'
        | 'currency'
        | 'description'
        | 'details'
        | 'hidden'
        | 'highlights'
        | 'images'
        | 'price'
        | 'name'
        | 'reviews'
        | 'postCategoriesTags'
        | 'discount'
        | 'postsSectionsBelowIds'
        | 'postPageLayout'
      >
    >,
    void
  >;
} => {
  const fetch = useFetch();

  const { authData } = useAuthSignIn();

  const userId = authData?.user._id || '<unknow user>';

  return {
    updateOneUserPost: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ postId, ...data }, options = {}) => {
        fetch[2](
          {
            method: 'put',
            url: getEndpoint({
              path: '/user/:userId/posts/:postId',
              urlParams: { postId, userId },
            }),
            data,
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
