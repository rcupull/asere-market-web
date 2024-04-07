import { useEffect } from 'react';

import { useAuthSignIn } from 'features/api/useAuthSignIn';
import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';
import { useAllUserBusiness } from 'features/api-slices/useGetAllUserBusinessPersistent';

import { callAfarIds, useCallFromAfar } from 'hooks/useCallFromAfar';
import { useDebouncer } from 'hooks/useDebouncer';
import { useRouter } from 'hooks/useRouter';

export const useInit = () => {
  const { isAuthenticated } = useAuthSignIn();
  const { pushRoute } = useRouter();
  //
  const { getUserPaymentPlan } = useGetUserPaymentPlan();
  const { getAllUserBussiness } = useAllUserBusiness();
  const { onRefreshAuthUser } = useAuthSignIn();

  const debouncer = useDebouncer();

  const getUserPaymentPlanRefresh = () => getUserPaymentPlan.fetch(undefined);
  const getAllUserBussinessRefresh = () => getAllUserBussiness.fetch({});

  useCallFromAfar(callAfarIds.getUserPaymentPlan, getUserPaymentPlanRefresh);
  useCallFromAfar(callAfarIds.getAllUserBussiness, getAllUserBussinessRefresh);

  useCallFromAfar(callAfarIds.redirect_to_dashboard_business_routename, ({ routeName }) => {
    pushRoute(`/dashboard/business/${routeName}`, undefined, { timeout: 100 });
  });

  useCallFromAfar(callAfarIds.redirect_to_routename, ({ routeName }) => {
    pushRoute(`/${routeName}`, undefined, { timeout: 100 });
  });

  useCallFromAfar(callAfarIds.refresh_auth_user, onRefreshAuthUser);

  const init = () => {
    getUserPaymentPlanRefresh();
    getAllUserBussinessRefresh();
    onRefreshAuthUser();
  };

  const reset = () => {
    getUserPaymentPlan.reset();
    getAllUserBussiness.reset();
  };

  useEffect(() => {
    if (isAuthenticated) {
      debouncer(init, 500);

      return reset;
    }
  }, [isAuthenticated]);
};
