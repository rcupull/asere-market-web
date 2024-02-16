import { useEffect } from 'react';

import { useAuthSignIn } from 'features/api/useAuthSignIn';
import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';

import { useDebouncer } from 'hooks/useDebouncer';

export const useAuthenticatedInit = () => {
  const { isAuthenticated } = useAuthSignIn();
  const { getUserPaymentPlan } = useGetUserPaymentPlan();
  const debouncer = useDebouncer();

  const init = () => {
    getUserPaymentPlan.fetch(undefined);
  };

  useEffect(() => {
    if (isAuthenticated) {
      debouncer(init, 500);
    }
  }, [isAuthenticated]);
};
