import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';

export const useUpdateAddOneSale = (): {
  updateAddOneSale: FetchResource<
    { routeName: string; postId: string; amountToAdd?: number },
    Post
  >;
} => {
  const fetch = useFetch<Post>();

  return {
    updateAddOneSale: {
      data: fetch[0],
      status: fetch[1],
      fetch: (data, options = {}) => {
        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/sale',
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
