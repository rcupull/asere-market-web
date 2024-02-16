import { useEffect } from 'react';

import { useSimpleSlice } from 'features/slices/useSimpleSlice';

export type PushIds = (ids?: Array<string>) => void;

export const useCallFromAfar = (
  id?: string,
  callback?: () => void,
): {
  pushIds: PushIds;
} => {
  const { data, setData } = useSimpleSlice<Array<string>>('useCallFromAfar');

  const pushIds: PushIds = (newIds) => newIds && setData([...data, ...newIds]);
  const removeId = (currentId: string) => setData(data.filter((id) => id !== currentId));

  const hasToBeUpdated = id && data.includes(id);

  useEffect(() => {
    if (hasToBeUpdated) {
      callback?.();
      removeId(id);
    }
  }, [hasToBeUpdated, callback]);

  return { pushIds };
};
