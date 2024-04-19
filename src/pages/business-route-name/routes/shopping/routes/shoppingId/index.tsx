import { useEffect } from 'react';

import { useGetOneShopping } from 'features/api/shopping/useGetOneShopping';

import { useRouter } from 'hooks/useRouter';

import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { ShoppingDetails } from 'pages/@common/shopping-details';

export const ShoppingId = () => {
  const { params } = useRouter();

  const { shoppingId } = params;

  const { getOneShopping } = useGetOneShopping();

  useEffect(() => {
    if (shoppingId) {
      getOneShopping.fetch({ shoppingId });
    }
  }, [shoppingId]);

  const shopping = getOneShopping.data;

  if (!shopping) {
    return <></>;
  }

  return (
    <LayoutPageSection title="Compra">
      <div className="w-full flex justify-center">
        <ShoppingDetails shopping={shopping} />
      </div>
    </LayoutPageSection>
  );
};
