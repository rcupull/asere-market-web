import { useGetOneBusiness } from 'features/api/business/useGetOneBusiness';
import { useAuth } from 'features/api-slices/useAuth';
import { useSimpleSlice } from 'features/slices/useSimpleSlice';

import { FetchOptions } from 'hooks/useFetch';

import { Business } from 'types/business';

/**
 * This hooks has the bussines data in the business page
 */
export const useBusinessPageData = (): {
  business: Business | null;
  onRefresh: (args: { routeName: string }, options?: FetchOptions) => void;
  onReset: () => void;
  owner: boolean;
  hasSomeShoppingCartStrategy: boolean;
} => {
  const { authData } = useAuth();

  const { getOneBusiness } = useGetOneBusiness();

  const { data, setData, reset } = useSimpleSlice<Business | null>('useBusinessPageData');

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
    business: data,
    onRefresh: ({ routeName }, options) => {
      getOneBusiness.fetch(
        { routeName },
        {
          ...options,
          onAfterSuccess: (response) => {
            setData(response);
            options?.onAfterSuccess?.(response);
          },
        },
      );
    },
    onReset: reset,
  };
};
