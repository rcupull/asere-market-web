import { useGetOneUserBusiness } from 'features/api/useGetOneUserBusiness';
import { useSimpleSlice } from 'features/slices/useSimpleSlice';

import { Business } from 'types/business';

/**
 * Informacion relacionada con el negocio que se puede editar editando. Siempre estara debajo de un routename
 */
export const useBusinessOwnerData = (): {
  data: Business | null;
  onRefresh: (args: { routeName: string }) => void;
  onReset: () => void;
} => {
  const { getOneUserBusiness } = useGetOneUserBusiness();

  const { data, setData, reset } = useSimpleSlice<Business>('useBusinessOwnerData');

  return {
    onRefresh: ({ routeName }) => {
      getOneUserBusiness.fetch({ routeName }, { onAfterSuccess: setData });
    },
    onReset: reset,
    data,
  };
};
