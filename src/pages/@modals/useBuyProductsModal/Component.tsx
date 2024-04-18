import { TopInfo } from './TopInfo';

import { ShoppingCartPosts } from 'pages/@common/shopping-cart-posts';
import { ShoppingCartRemoveAllButton } from 'pages/@common/shopping-cart-remove-all-button';
import { useSales } from 'pages/@hooks/useSales';

export const Component = () => {
  const sales = useSales();

  if (!sales.currentSale) {
    return <div className="font-semibold">No tiene productos en la bolsa</div>;
  }

  return (
    <div>
      <TopInfo />
      <ShoppingCartPosts value={sales.currentSale} />

      <div className="flex justify-end mt-2">
        <ShoppingCartRemoveAllButton />
      </div>
    </div>
  );
};
