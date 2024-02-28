import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'hooks/useRouter';

import { AnyRecord } from 'types/general';

export interface UseFiltersArgs<S> {
  onChange?: (state: S) => void;
  notPersisteInRoute?: boolean;
  notCallChangeWhenMount?: boolean;
  initialFilters?: S;
}

export interface UseFiltersReturn<S extends AnyRecord = AnyRecord> {
  onMergeFilters: (partialFilter: S) => void;
  onRefresh: () => void;
  value: S;
}

export const useFilters = <S extends AnyRecord = AnyRecord>(
  args: UseFiltersArgs<S>,
): UseFiltersReturn<S> => {
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
  }, [JSON.stringify(filterValue)]);

  return {
    onMergeFilters,
    onRefresh: () => onChange?.(filterValue),
    value: filterValue,
  };
};
