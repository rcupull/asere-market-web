import { useState } from 'react';

import { AnyRecord } from 'types/general';

interface UseFiltersArgs<S> {
  onChange?: (state: S) => void;
  initialFilters?: S;
}

export const useFilters = <S extends AnyRecord = AnyRecord>(
  args: UseFiltersArgs<S>,
): {
  onMergeFilters: (partialFilter: S) => void;
  state: S;
} => {
  const { onChange, initialFilters = {} } = args || {};

  const [state, setState] = useState<S>(initialFilters as S);

  const onMergeFilters = (partialState: S) => {
    const newState = { ...state, ...partialState };
    setState(newState);

    onChange?.(newState);
  };

  return {
    onMergeFilters,
    state,
  };
};
