import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useSimpleSlice } from 'features/slices/useSimpleSlice';

export type PushIds = (ids: Array<string>) => void;

export const useCallFromAfar = (
  id?: string,
  callback?: () => void,
): {
  pushIds: PushIds;
} => {
  const {} = useSimpleSlice('useCallFromAfar');
  const dispatch = useDispatch();
  const hasToBeUpdated = useSelector(updateContent.selectors.getHasToBeUpdated)(id || '');

  const pushIds: PushIds = (newIds) => dispatch(updateContent.actions.pushIds(newIds));

  const removeId = () => id && dispatch(updateContent.actions.removeId(id));

  useEffect(() => {
    if (hasToBeUpdated) {
      callback?.();
      removeId();
    }
  }, [hasToBeUpdated]);

  return { pushIds };
};
