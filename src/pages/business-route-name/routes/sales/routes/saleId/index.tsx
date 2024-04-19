import { useEffect } from 'react';

import { useGetOneSale } from 'features/api/sales/useGetOneSale';

import { useRouter } from 'hooks/useRouter';

import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { SaleDetails } from 'pages/@common/sale-details';

export const SaleId = () => {
  const { params } = useRouter();

  const { saleId } = params;

  const { getOneSale } = useGetOneSale();

  useEffect(() => {
    if (saleId) {
      getOneSale.fetch({ saleId });
    }
  }, [saleId]);

  const sale = getOneSale.data;

  if (!sale) {
    return <></>;
  }

  return (
    <LayoutPageSection title="Compra">
      <div className="w-full flex justify-center">
        <SaleDetails sale={sale} />
      </div>
    </LayoutPageSection>
  );
};
