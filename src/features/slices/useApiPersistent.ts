import { useSimpleSlice } from './useSimpleSlice';

import type { FetchResource } from 'types/api';

export const useApiPersistent = <Args = any, D = any>(
  field: string,
  resources: FetchResource<Args, D>,
): FetchResource<Args, D> => {
  const { data, reset, setData } = useSimpleSlice(field);

  return {
    ...resources,
    data,
    fetch: (args, options = {}) => {
      resources.fetch(args, {
        ...options,
        onAfterSuccess: (response) => {
          setData(response);
          options?.onAfterSuccess?.(response);
        },
      });
    },
    reset: () => {
      reset();
      resources.reset();
    },
  };
};
