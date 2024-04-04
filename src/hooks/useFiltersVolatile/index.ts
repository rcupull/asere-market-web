import { useState } from 'react';

import { AnyRecord } from 'types/general';

export interface UseFiltersArgs<S> {
  onChange?: (state: S) => void;
}

export interface UseFiltersReturn<S extends AnyRecord = AnyRecord> {
  onMergeFilters: (partialFilter: S) => void;
  onRefresh: () => void;
  value: S;
}

export const useFiltersVolatile = <S extends AnyRecord = AnyRecord>(
  args: UseFiltersArgs<S>,
): UseFiltersReturn<S> => {
  const { onChange } = args || {};

  const [filterValue, setFilter] = useState<S>({} as S);

  const onMergeFilters = (partialValue: S) => {
    const newFilterValue: S = {
      ...filterValue,
      ...partialValue,
    };

    setFilter(newFilterValue);
    onChange?.(newFilterValue);
  };

  return {
    onMergeFilters,
    onRefresh: () => onChange?.(filterValue),
    value: filterValue,
  };
};
