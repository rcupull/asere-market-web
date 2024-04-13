import { useGetOneUserBusiness } from 'features/api/useGetOneUserBusiness';
import { useSimpleSlice } from 'features/slices/useSimpleSlice';

import { FetchStatus } from 'types/api';
import { Business } from 'types/business';

/**
 * Informacion relacionada con el negocio que se puede editar editando. Siempre estara debajo de un routename
 */
export const useBusinessOwnerData = (): {
  data: Business | null;
  business: Business | null;
  status: FetchStatus;
  /**
   * Always fetch the new data
   */
  onFetch: (args: { routeName: string }) => void;
  onReset: () => void;
} => {
  const { getOneUserBusiness } = useGetOneUserBusiness();

  const { data, setData, reset } = useSimpleSlice<Business>('useBusinessOwnerData');

  return {
    onFetch: ({ routeName }) => {
      getOneUserBusiness.fetch({ routeName }, { onAfterSuccess: setData });
    },
    onReset: reset,
    status: getOneUserBusiness.status,
    data, //deprecated
    business: data,
  };
};
