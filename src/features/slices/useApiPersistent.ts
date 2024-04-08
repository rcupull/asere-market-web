import { useSimpleSlice } from './useSimpleSlice';

import type { FetchResource } from 'types/api';

export const useApiPersistent = <Args = any, D = any>(
  field: string,
  resources: FetchResource<Args, D>,
): {
  resources: FetchResource<Args, D>;
  setDataRedux: (d: any) => void;
  resetDataRedux: () => void;
} => {
  const { data, reset, setData } = useSimpleSlice(field);

  return {
    resources: {
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
    },
    setDataRedux: setData,
    resetDataRedux: reset,
  };
};
