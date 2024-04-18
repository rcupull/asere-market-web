import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import { Button } from 'components/button';
import { IconButton } from 'components/icon-button';
import { Menu } from 'components/menu';

import { useAuth } from 'features/api-slices/useAuth';

import { ShoppingCartPosts } from '../shopping-cart-posts';
import { ShoppingCartRemoveAllButton } from '../shopping-cart-remove-all-button';

import { useSales } from 'pages/@hooks/useSales';
import { useAuthSignInModal } from 'pages/@modals/useAuthSignInModal';
import { useBuyProductsModal } from 'pages/@modals/useBuyProductsModal';
import { StyleProps } from 'types/general';

export interface ShoppingCartMenuProps extends StyleProps {}

export const ShoppingCartMenu = ({ className }: ShoppingCartMenuProps) => {
  const buyProductsModal = useBuyProductsModal();

  const sales = useSales();

  const { isAuthenticated } = useAuth();

  const authSignInModal = useAuthSignInModal();

  const getHeaderElement = () => {
    if (!isAuthenticated) {
      return (
        <div>
          Si tienes artículos en tu bolsa de compras, los guardamos para ti.{' '}
          <Button
            onClick={() => authSignInModal.open()}
            label="INICIA SESSIÓN"
            variant="link"
            className="!inline-block"
          />{' '}
          ahora para verlos, o revísalos en cualquier momento.
        </div>
      );
    }

    if (!sales.currentSale) {
      return (
        <div>
          <div className="text-center font-semibold text-lg my-2">
            Tu bolsa de compra esta vacía
          </div>

          <div className="text-center">
            Agrega productos a tu bolsa y te facilitaremos la compra.
          </div>
        </div>
      );
    }

    return (
      <div>
        <span>
          Haz crecer tu negocio online en Cuba y usa <span className="font-bold">Asere Market</span>{' '}
          para enganchar a tus clientes
        </span>

        <ShoppingCartPosts value={sales.currentSale} />

        <div className="flex justify-between mt-2">
          <Button variant="link" label="Comprar ahora" onClick={() => buyProductsModal.open()} />

          <ShoppingCartRemoveAllButton />
        </div>
      </div>
    );
  };

  return (
    <Menu
      buttonElement={
        <div className="relative">
          <IconButton
            title="Carro de Compras"
            svg={() => <ShoppingCartIcon className="size-7" />}
            dark
          />
          {isAuthenticated && (
            <span className="absolute text-gray-100 font-bold top-0 right-0">
              {sales.currentSaleCount}
            </span>
          )}
        </div>
      }
      headerElement={
        <div className="w-96 m-2 rounded-md px-4 py-3 border flex flex-col items-center">
          {getHeaderElement()}
        </div>
      }
      items={[]}
      className={className}
    />
  );
};
