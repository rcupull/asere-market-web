import { useEffect } from 'react';

import { useSimpleSlice } from 'features/slices/useSimpleSlice';

type CallAfarId =
  | 'home_refresh_posts'
  | 'dashboard_business_route_name_table_posts'
  | 'dashboard_business_table_business'
  | 'business_route_name_refresh_posts'
  | 'side_bar_redirect_to_last_created_business'
  | 'getUserPaymentPlan'
  | 'getAllUserBusinessRouteNames'
  | 'getAllUserBussiness'
  | 'getAllUserBussiness'
  | 'getAllUserBussiness'
  | 'redirect_to_dashboard_business_routename'
  | 'redirect_to_routename';

export type CallAfarResources = CallAfarId | Array<CallAfarId>;

export const useCallFromAfar = (
  currentId?: CallAfarResources,
  callback?: (response?: any) => void,
): {
  onCallAfar: (callAfarResources?: CallAfarResources, response?: any) => void;
} => {
  const { data, setData } =
    useSimpleSlice<Array<{ id: CallAfarResources; response?: any }>>('useCallFromAfar');

  const removeCurrentId = () => setData(data.filter(({ id }) => id !== currentId));

  const currentData = currentId ? data.find(({ id }) => id === currentId) : undefined;

  useEffect(() => {
    if (currentData) {
      const { response } = currentData;
      callback?.(response);
      removeCurrentId();
    }
  }, [currentData, callback]);

  return {
    onCallAfar: (callAfarResources, response) => {
      if (!callAfarResources) return;

      if (callAfarResources instanceof Array) {
        return setData([...data, ...callAfarResources.map((id) => ({ id, response }))]);
      }

      return setData([...data, { id: callAfarResources, response }]);
    },
  };
};
