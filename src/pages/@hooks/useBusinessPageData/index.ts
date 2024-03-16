import { useAuthSignIn } from 'features/api/useAuthSignIn';
import { useGetOneBusiness } from 'features/api/useGetOneBusiness';
import { useSimpleSlice } from 'features/slices/useSimpleSlice';

import { Business } from 'types/business';

/**
 * This hooks has the bussines data in the business page
 */
export const useBusinessPageData = (): {
  business: Business | null;
  onRefresh: (args: { routeName: string }) => void;
  onReset: () => void;
  owner: boolean;
} => {
  const { authData } = useAuthSignIn();

  const { getOneBusiness } = useGetOneBusiness();

  const { data, setData, reset } = useSimpleSlice<Business>('useBusinessPageData');

  return {
    owner: authData?.user._id === data?.createdBy,
    business: data,
    onRefresh: ({ routeName }) => {
      getOneBusiness.fetch({ routeName }, { onAfterSuccess: setData });
    },
    onReset: reset,
  };
};
