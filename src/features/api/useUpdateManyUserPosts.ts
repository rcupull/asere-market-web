import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { FetchResource } from 'types/api';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';

export const useUpdateManyUserPosts = (): {
  updateManyUserPosts: FetchResource<
    Array<
      { id: string } & Partial<
        Pick<
          Post,
          | 'hidden'
          | 'clothingSizes'
          | 'colors'
          | 'currency'
          | 'description'
          | 'details'
          | 'highlights'
          | 'images'
          | 'price'
        >
      >
    >,
    void
  >;
} => {
  const fetch = useFetch();

  const { authData } = useAuthSignIn();

  const userId = authData?.user._id || '<unknow user>';

  return {
    updateManyUserPosts: {
      data: fetch[0],
      status: fetch[1],
      fetch: (args, options = {}) => {
        fetch[2](
          args.map(({ id, ...data }) => {
            return {
              method: 'put',
              url: getEndpoint({
                path: '/user/:userId/posts/:id',
                urlParams: { id, userId },
              }),
              data,
            };
          }),
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
