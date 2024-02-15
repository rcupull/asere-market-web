import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { FetchResource } from 'types/api';
import { Business } from 'types/business';
import { getEndpoint } from 'utils/api';

export const useUpdateManyUserBusiness = (): {
  updateManyUserBussiness: FetchResource<
    Array<{ routeName: string } & Partial<Pick<Business, 'hidden'>>>,
    void
  >;
} => {
  const fetch = useFetch();

  const { authData } = useAuthSignIn();

  const userId = authData?.user._id || '<unknow user>';

  return {
    updateManyUserBussiness: {
      data: fetch[0],
      status: fetch[1],
      fetch: (args, options = {}) => {
        fetch[2](
          args.map(({ routeName, ...data }) => {
            return {
              method: 'put',
              url: getEndpoint({
                path: '/user/:userId/business/:routeName',
                urlParams: { routeName, userId },
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
