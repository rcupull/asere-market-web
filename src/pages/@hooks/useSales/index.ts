import { useGetSales } from 'features/api/sales/useGetSales';
import { useApiPersistent } from 'features/slices/useApiPersistent';

import { FetchResource, FetchStatus } from 'types/api';
import { Sale } from 'types/sales';

export const useSales = (): {
  data: Array<Sale>;
  //
  currentSale: Sale | undefined;
  currentSaleCount: number;
  //
  status: FetchStatus;
  onFetch: FetchResource<{ routeName: string }, Array<Sale>>['fetch'];
  onReset: () => void;
} => {
  const { getSales } = useGetSales();

  const { data, status, reset, fetch } = useApiPersistent('useSales', getSales);

  const currentSale = data?.find(({ state }) => state === 'CONSTRUCTION');

  const currentSaleCount = (currentSale?.posts || [])?.reduce((acc, { count }) => acc + count, 0);

  return {
    data: data || [],
    //
    currentSale,
    currentSaleCount,
    //
    status,
    onFetch: fetch,
    onReset: reset,
  };
};
