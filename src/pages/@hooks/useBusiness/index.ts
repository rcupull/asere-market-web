import { useGetOneBusiness } from 'features/api/business/useGetOneBusiness';
import { useAuth } from 'features/api-slices/useAuth';
import { useSimpleSlice } from 'features/slices/useSimpleSlice';

import { FetchStatus } from 'types/api';
import { Business } from 'types/business';

/**
 * Informacion relacionada con el negocio que se puede editar editando. Siempre estara debajo de un routename
 */
export const useBusiness = (): {
  business: Business | null;
  status: FetchStatus;
  /**
   * Always fetch the new data
   */
  onFetch: (args: { routeName: string }) => void;
  onReset: () => void;
  owner: boolean;
  hasSomeShoppingCartStrategy: boolean;
} => {
  const { getOneBusiness } = useGetOneBusiness();
  const { authData } = useAuth();

  const { data, setData, reset } = useSimpleSlice<Business>('useBusiness');

  const getHasSomeShoppingCartStrategy = () => {
    switch (data?.salesStrategy) {
      case 'addToCart_whatsAppWithOwner_pickUpProduct':
        return true;
      default:
        return false;
    }
  };

  return {
    owner: authData?.user._id === data?.createdBy,
    hasSomeShoppingCartStrategy: getHasSomeShoppingCartStrategy(),
    onFetch: ({ routeName }) => {
      getOneBusiness.fetch({ routeName }, { onAfterSuccess: setData });
    },
    onReset: reset,
    status: getOneBusiness.status,
    business: data,
  };
};
