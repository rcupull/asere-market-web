import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'features/router';

import { AnyRecord } from 'types/general';

interface UseFiltersArgs<S> {
  onChange?: (state: S) => void;
  notPersisteInRoute?: boolean;
  notCallChangeWhenMount?: boolean;
  initialFilters?: S;
}

export const useFilters = <S extends AnyRecord = AnyRecord>(
  args: UseFiltersArgs<S>,
): {
  onMergeFilters: (partialFilter: S) => void;
  value: S;
} => {
  const { onChange, initialFilters = {}, notPersisteInRoute, notCallChangeWhenMount } = args || {};
  const [localState, setLocalState] = useState<S>(initialFilters as S);
  const { query: queryState, onChangeQuery: onChangeQueryState } = useRouter();

  const filterValue = (notPersisteInRoute ? localState : queryState) as S;
  const handleChangeFilterState = notPersisteInRoute ? setLocalState : onChangeQueryState;

  const onMergeFilters = (partialValue: S) => {
    const newValue = { ...filterValue, ...partialValue };
    handleChangeFilterState(newValue);
  };

  const refMounted = useRef<boolean>(false);

  useEffect(() => {
    if (notCallChangeWhenMount && !refMounted.current) {
      refMounted.current = true;
      return;
    }
    refMounted.current = true;
    onChange?.(filterValue);
  }, [filterValue]);

  return {
    onMergeFilters,
    value: filterValue,
  };
};
