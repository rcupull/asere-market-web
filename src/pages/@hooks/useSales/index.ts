import { useGetSales } from 'features/api/sales/useGetSales';
import { useApiPersistent } from 'features/slices/useApiPersistent';

import { FetchStatus } from 'types/api';
import { Sale } from 'types/sales';

export const useSales = (): {
  data: Array<Sale>;
  //
  currentSale: Sale | undefined;
  currentSaleCount: number;
  //
  status: FetchStatus;
  onFetch: (args: { routeName: string }) => void;
  onReset: () => void;
} => {
  const { getSales } = useGetSales();

  const { data, status, reset, fetch } = useApiPersistent('useSales', getSales);

  const currentSale = data?.find(({ state }) => state === 'construction');

  const currentSaleCount = (currentSale?.posts || [])?.reduce((acc, { count }) => acc + count, 0);

  return {
    data: data || [],
    //
    currentSale,
    currentSaleCount,
    //
    status,
    onFetch: ({ routeName }) => fetch({ routeName }),
    onReset: reset,
  };
};
