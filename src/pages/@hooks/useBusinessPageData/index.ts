import { useGetOneBusiness } from 'features/api/useGetOneBusiness';
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
} => {
  const { authData } = useAuth();

  const { getOneBusiness } = useGetOneBusiness();

  const { data, setData, reset } = useSimpleSlice<Business>('useBusinessPageData');

  return {
    owner: authData?.user._id === data?.createdBy,
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
