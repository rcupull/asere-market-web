import { useEffect } from 'react';

import { useGetSales } from 'features/api/sales/useGetSales';

import { useRouter } from 'hooks/useRouter';

import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { SaleDetails } from 'pages/@common/sale-details';
import { getSaleRoute } from 'utils/business';

export interface HomeProps {
  routeName: string;
}

export const Home = ({ routeName }: HomeProps) => {
  const { getSales } = useGetSales();
  const { pushRoute } = useRouter();

  useEffect(() => {
    getSales.fetch({ routeName });
  }, []);

  return (
    <LayoutPageSection title="Tus compras">
      <div className="flex flex-col items-center gap-4">
        {getSales.data?.map((sale, index) => {
          return (
            <SaleDetails
              key={index}
              sale={sale}
              onClick={() => pushRoute(getSaleRoute({ routeName, saleId: sale._id }))}
            />
          );
        })}
      </div>
    </LayoutPageSection>
  );
};
