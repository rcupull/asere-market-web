import { useAuth } from 'features/auth';
import { useApiSlice } from 'features/slices/useApiSlice';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { PaymentPlan } from 'types/payment';
import { getEndpoint } from 'utils/api';

export const useGetUserPaymentPlan = (): {
  getUserPaymentPlan: FetchResource<undefined, PaymentPlan>;
} => {
  let fetch = useFetch<PaymentPlan>();
  fetch = useApiSlice<PaymentPlan>(fetch, 'getUserPaymentPlan');

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
