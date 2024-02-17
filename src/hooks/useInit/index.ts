import { useEffect } from 'react';

import { useAuthSignIn } from 'features/api/useAuthSignIn';
import { useGetAllUserBusiness } from 'features/api/useGetAllUserBusiness';
import { useGetAllUserBusinessRouteNames } from 'features/api/useGetAllUserBusinessRouteNames';
import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useDebouncer } from 'hooks/useDebouncer';

export const useInit = () => {
  const { isAuthenticated } = useAuthSignIn();
  //
  const { getUserPaymentPlan } = useGetUserPaymentPlan();
  const { getAllUserBusinessRouteNames } = useGetAllUserBusinessRouteNames();
  const { getAllUserBussiness } = useGetAllUserBusiness();
  //
  const debouncer = useDebouncer();

  const getUserPaymentPlanRefresh = () => getUserPaymentPlan.fetch(undefined);
  const getAllUserBusinessRouteNamesRefresh = () => getAllUserBusinessRouteNames.fetch(undefined);
  const getAllUserBussinessRefresh = () => getAllUserBussiness.fetch({});

  useCallFromAfar('getUserPaymentPlan', getUserPaymentPlanRefresh);
  useCallFromAfar('getAllUserBusinessRouteNames', getAllUserBusinessRouteNamesRefresh);
  useCallFromAfar('getAllUserBussiness', getAllUserBussinessRefresh);

  const init = () => {
    getUserPaymentPlanRefresh();
    getAllUserBusinessRouteNamesRefresh();
    getAllUserBussinessRefresh();
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
