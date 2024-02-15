import { useDispatch, useSelector } from 'react-redux';

import type { UseFetchReturn } from 'hooks/useFetch';

import type { FetchData } from 'types/api';

export const useApiSlice = <D = any, N extends string = string>(
  fetch: UseFetchReturn<D>,
  name: N,
): [
  ...UseFetchReturn<D>,
  {
    setDataRedux: (data: D) => void;
    resetDataRedux: () => void;
  },
] => {
  const [, status, handleCall, handleReset] = fetch;

  const dispatch = useDispatch();
  const dataFromRedux = useSelector<{ [k in N]: FetchData<D> }, FetchData<D>>(
    (state) => state[name],
  );

  const setDataRedux = (data: D) => {
    dispatch({ type: `${name}/setState`, payload: data });
  };

  const resetDataRedux = () => {
    dispatch({ type: `${name}/reset` });
  };

  return [
    dataFromRedux,
    status,
    (args, options = {}) => {
      handleCall(args, {
        ...options,
        onAfterSuccess: (res) => {
          setDataRedux(res);
          options?.onAfterSuccess?.(res);
        },
      });
    },
    () => {
      resetDataRedux();
      handleReset();
    },
    {
      setDataRedux,
      resetDataRedux,
    },
  ];
};
