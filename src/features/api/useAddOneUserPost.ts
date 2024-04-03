import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { FetchResource } from 'types/api';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';

export const useAddOneUserPost = (): {
  addOneUserPost: FetchResource<
    Pick<
      Post,
      | 'routeName'
      | 'clothingSizes'
      | 'colors'
      | 'currency'
      | 'description'
      | 'details'
      | 'highlights'
      | 'name'
      | 'price'
      | 'reviews'
      | 'images'
      | 'postCategoriesTags'
      | 'discount'
      | 'postsSectionsBelowIds'
      | 'postPageLayout'
    >,
    Post
  >;
} => {
  const fetch = useFetch<Post>();

  const { authData } = useAuthSignIn();

  const userId = authData?.user._id || '<unknow user>';

  return {
    addOneUserPost: {
      data: fetch[0],
      status: fetch[1],
      fetch: (data, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/user/:userId/posts',
              urlParams: { userId },
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
