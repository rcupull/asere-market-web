import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useGetAllUserBusinessRouteNames = (): {
  getAllUserBusinessRouteNames: FetchResource<undefined, Array<string>>;
} => {
  const fetch = useFetch<Array<string>>();

  const { authData } = useAuthSignIn();

  const userId = authData?.user._id || '<unknow user>';

  return {
    getAllUserBusinessRouteNames: {
      data: fetch[0],
      status: fetch[1],
      fetch: (_, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/user/:userId/business/allRouteNames',
              urlParams: { userId },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
