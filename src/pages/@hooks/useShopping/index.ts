import { useGetShopping } from 'features/api/shopping/useGetShopping';
import { useApiPersistent } from 'features/slices/useApiPersistent';

import { FetchResource, FetchStatus } from 'types/api';
import { Shopping } from 'types/shopping';

export const useShopping = (): {
  data: Array<Shopping>;
  //
  currentShopping: Shopping | undefined;
  currentShoppingCount: number;
  //
  status: FetchStatus;
  onFetch: FetchResource<{ routeName: string }, Array<Shopping>>['fetch'];
  onReset: () => void;
} => {
  const { getShopping } = useGetShopping();

  const { data, status, reset, fetch } = useApiPersistent('useShopping', getShopping);

  const currentShopping = data?.find(({ state }) => state === 'CONSTRUCTION');

  const currentShoppingCount = (currentShopping?.posts || [])?.reduce(
    (acc, { count }) => acc + count,
    0,
  );

  return {
    data: data || [],
    //
    currentShopping,
    currentShoppingCount,
    //
    status,
    onFetch: fetch,
    onReset: reset,
  };
};
