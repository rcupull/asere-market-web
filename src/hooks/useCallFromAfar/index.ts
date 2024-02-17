import { useEffect } from 'react';

import { useSimpleSlice } from 'features/slices/useSimpleSlice';

export type UpdateId =
  | 'home'
  | 'dashboard_business_route_name_table_posts'
  | 'dashboard_business_table_business'
  | 'business_route_name'
  | 'dashboard_side_bar'
  | 'dashboard_business';

export const useCallFromAfar = (
  currentId?: UpdateId,
  callback?: (response?: any) => void,
): {
  onCallAfar: (id?: UpdateId, response?: any) => void;
} => {
  const { data, setData } =
    useSimpleSlice<Array<{ id: UpdateId; response?: any }>>('useCallFromAfar');

  const removeCurrentId = () => setData(data.filter(({ id }) => id !== currentId));

  const currentData = currentId ? data.find(({ id }) => id === currentId) : undefined;

  useEffect(() => {
    if (currentData) {
      const { response } = currentData;
      callback?.(response);
      removeCurrentId();
    }
  }, [currentData, callback]);

  return { onCallAfar: (id, response) => id && setData([...data, { id, response }]) };
};
