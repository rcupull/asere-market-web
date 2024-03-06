import { useEffect } from 'react';

import { useGetOneBusiness } from 'features/api/useGetOneBusiness';
import { useSimpleSlice } from 'features/slices/useSimpleSlice';

import { useRouter } from 'hooks/useRouter';

import { Business } from 'types/business';

/**
 *  this hook share the data in the business page
 */
export const useBusinessPageData = (): {
  business: Business | null;
  onRefresh: () => void;
} => {
  const { params, isBusinessPage } = useRouter();
  const { routeName } = params;

  const { getOneBusiness } = useGetOneBusiness();

  const { data, setData, reset } = useSimpleSlice<Business>('useBusinessPageData');

  const onRefresh = () => {
    if (!routeName) return;
    getOneBusiness.fetch({ routeName }, { onAfterSuccess: setData });
  };

  useEffect(() => {
    if (isBusinessPage && routeName && !data) {
      onRefresh();

      return () => reset();
    }
  }, [routeName]);

  return {
    business: data,
    onRefresh,
  };
};
