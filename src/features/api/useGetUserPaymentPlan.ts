import { useAuth } from 'features/auth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { PaymentPlan } from 'types/payment';
import { getEndpoint } from 'utils/api';

export const useGetUserPaymentPlan = (): {
  getUserPaymentPlan: FetchResource<undefined, PaymentPlan>;
} => {
  const fetch = useFetch<PaymentPlan>();

  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    getUserPaymentPlan: {
      data: fetch[0],
      status: fetch[1],
      fetch: (_, options = {}) => {
        fetch[2](
          {
            method: 'get',
            url: getEndpoint({
              path: '/user/:userId/payment/plan',
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
