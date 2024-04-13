import { useGetOneBusiness } from 'features/api/business/useGetOneBusiness';
import { useSimpleSlice } from 'features/slices/useSimpleSlice';

import { FetchStatus } from 'types/api';
import { Business } from 'types/business';

/**
 * Informacion relacionada con el negocio que se puede editar editando. Siempre estara debajo de un routename
 */
export const useBusinessOwnerData = (): {
  business: Business | null;
  status: FetchStatus;
  /**
   * Always fetch the new data
   */
  onFetch: (args: { routeName: string }) => void;
  onReset: () => void;
} => {
  const { getOneBusiness } = useGetOneBusiness();

  const { data, setData, reset } = useSimpleSlice<Business>('useBusinessOwnerData');

  return {
    onFetch: ({ routeName }) => {
      getOneBusiness.fetch({ routeName }, { onAfterSuccess: setData });
    },
    onReset: reset,
    status: getOneBusiness.status,
    business: data,
  };
};
