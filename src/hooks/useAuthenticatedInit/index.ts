import { useEffect } from 'react';

import { useAuthSignIn } from 'features/api/useAuthSignIn';
import { useGetAllUserBusiness } from 'features/api/useGetAllUserBusiness';
import { useGetAllUserBusinessRouteNames } from 'features/api/useGetAllUserBusinessRouteNames';
import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';

import { useDebouncer } from 'hooks/useDebouncer';

export const useAuthenticatedInit = () => {
  const { isAuthenticated } = useAuthSignIn();
  //
  const { getUserPaymentPlan } = useGetUserPaymentPlan();
  const { getAllUserBusinessRouteNames } = useGetAllUserBusinessRouteNames();
  const { getAllUserBussiness } = useGetAllUserBusiness();
  //
  const debouncer = useDebouncer();

  const init = () => {
    getUserPaymentPlan.fetch(undefined);
    getAllUserBusinessRouteNames.fetch(undefined);
    getAllUserBussiness.fetch({});
  };

  const reset = () => {
    getUserPaymentPlan.reset();
    getAllUserBusinessRouteNames.reset();
    getAllUserBussiness.reset();
  };

  useEffect(() => {
    if (isAuthenticated) {
      debouncer(init, 500);

      return reset;
    }
  }, [isAuthenticated]);
};
