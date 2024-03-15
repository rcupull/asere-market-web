import { useEffect } from 'react';

import { useAuthSignIn } from 'features/api/useAuthSignIn';
import { useGetOneBusiness } from 'features/api/useGetOneBusiness';
import { useSimpleSlice } from 'features/slices/useSimpleSlice';

import { useRouter } from 'hooks/useRouter';

import { Business } from 'types/business';

let fetching = false;
/**
 *  this hook share the data in the business page
 */
export const useBusinessPageData = (): {
  business: Business | null;
  onRefresh: () => void;
  owner: boolean;
} => {
  const { params, isBusinessPage } = useRouter();
  const { routeName } = params;
  const { authData } = useAuthSignIn();

  const { getOneBusiness } = useGetOneBusiness();

  const { data, setData } = useSimpleSlice<Business>('useBusinessPageData');

  const onRefresh = () => {
    if (!routeName) return;
    getOneBusiness.fetch({ routeName }, { onAfterSuccess: setData });
  };

  useEffect(() => {
    if (isBusinessPage && routeName && !data && !fetching) {
      fetching = true;
      onRefresh();
    }
  }, [routeName]);

  useEffect(() => {
    if (getOneBusiness.status.isSuccess) {
      fetching = false;
    }
  }, [getOneBusiness.status.isSuccess]);

  return {
    owner: authData?.user._id === data?.createdBy,
    business: data,
    onRefresh,
  };
};
