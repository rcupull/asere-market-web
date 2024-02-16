import { useEffect } from 'react';

import { useSimpleSlice } from 'features/slices/useSimpleSlice';

export const useCallFromAfar = (
  currentId?: string,
  callback?: (response?: any) => void,
): {
  pushId: (id?: string, response?: any) => void;
} => {
  const { data, setData } =
    useSimpleSlice<Array<{ id: string; response?: any }>>('useCallFromAfar');

  const removeCurrentId = () => setData(data.filter(({ id }) => id !== currentId));

  const currentData = currentId ? data.find(({ id }) => id === currentId) : undefined;

  useEffect(() => {
    if (currentData) {
      const { response } = currentData;
      callback?.(response);
      removeCurrentId();
    }
  }, [currentData, callback]);

  return { pushId: (id, response) => id && setData([...data, { id, response }]) };
};
