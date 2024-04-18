import { useBusiness } from '../../@hooks/useBusiness';
import { useBusinessShoppingCart } from '../../@hooks/useBusinessShoppingCart';
import { TopInfo } from './TopInfo';

import { ShoppingCartPosts } from 'pages/@common/shopping-cart-posts';
import { ShoppingCartRemoveAllButton } from 'pages/@common/shopping-cart-remove-all-button';

export const Component = () => {
  const { business } = useBusiness();
  const businessShoppingCart = useBusinessShoppingCart({ routeName: business?.routeName });

  return (
    <div>

      <TopInfo/>
      <ShoppingCartPosts value={businessShoppingCart.data} />

      <div className="flex justify-end mt-2">
        <ShoppingCartRemoveAllButton />
      </div>
    </div>
  );
};
