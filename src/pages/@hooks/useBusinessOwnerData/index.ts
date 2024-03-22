import { useGetOneUserBusiness } from 'features/api/useGetOneUserBusiness';
import { useSimpleSlice } from 'features/slices/useSimpleSlice';

import { FetchStatus } from 'types/api';
import { Business } from 'types/business';

/**
 * Informacion relacionada con el negocio que se puede editar editando. Siempre estara debajo de un routename
 */
export const useBusinessOwnerData = (): {
  data: Business | null;
  status: FetchStatus;
  /**
   * Fetch the new data if the routename is diferent
   */
  onRefresh: (args: { routeName: string }) => void;
  /**
   * Always fetch the new data
   */
  onFetch: (args: { routeName: string }) => void;
  onReset: () => void;
} => {
  const { getOneUserBusiness } = useGetOneUserBusiness();

  const { data, setData, reset } = useSimpleSlice<Business>('useBusinessOwnerData');

  return {
    onRefresh: ({ routeName }) => {
      if (data?.routeName === routeName) {
        return;
      }
      getOneUserBusiness.fetch({ routeName }, { onAfterSuccess: setData });
    },
    onFetch: ({ routeName }) => {
      getOneUserBusiness.fetch({ routeName }, { onAfterSuccess: setData });
    },
    onReset: reset,
    status: getOneUserBusiness.status,
    data,
  };
};
