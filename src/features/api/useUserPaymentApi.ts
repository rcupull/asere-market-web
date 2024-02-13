import { useAuth } from 'features/auth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { PaymentPlan } from 'types/payment';
import { getEndpoint } from 'utils/api';

export const useUserPaymentApi = (): {
  getCurrentPaymentPlan: FetchResource<undefined, PaymentPlan>;
} => {
  const getCurrentPaymentPlanFetch = useFetch<PaymentPlan>();

  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    getCurrentPaymentPlan: {
      data: getCurrentPaymentPlanFetch[0],
      status: getCurrentPaymentPlanFetch[1],
      fetch: (_, options = {}) => {
        getCurrentPaymentPlanFetch[2](
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
    },
  };
};
