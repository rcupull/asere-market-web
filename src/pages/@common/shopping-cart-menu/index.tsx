import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import { Button } from 'components/button';
import { IconButton } from 'components/icon-button';
import { Menu } from 'components/menu';

import { useAuth } from 'features/api-slices/useAuth';

import { useAuthSignInModal } from 'pages/@hooks/useAuthSignInModal';
import { StyleProps } from 'types/general';

export interface ShoppingCartMenuProps extends StyleProps {}

export const ShoppingCartMenu = ({ className }: ShoppingCartMenuProps) => {
  const { authData, isAuthenticated } = useAuth();

  const { user } = authData || {};

  const addedInTheCart = user?.shoppingCart?.added || [];
  const count = addedInTheCart.reduce((acc, postCount) => acc + postCount.count, 0);

  const authSignInModal = useAuthSignInModal();

  const getHeaderElement = () => {
    if (!isAuthenticated) {
      return (
        <>
          <div>
            Si tienes artículos en tu bolsa de compras, los guardamos para ti.
           <div className='inline-block mx-1'>
           <Button
              onClick={() => authSignInModal.open()}
              label="INICIA SESSIÓN"
              variant="link"
              className='!text-md'
            />
           </div>
            ahora para verlos, o revísalos en cualquier momento.
          </div>
        </>
      );
    }

    if (count === 0) {
      return (
        <>
          <span className="text-center font-semibold">Tu bolsa de compra esta vacía</span>

          <span className="text-center">
            Si tienes artículos en tu bolsa de compras, los guardamos para ti.{' '}
            <Button
              onClick={() => authSignInModal.open()}
              label="INICIAR SESIÓN"
              variant="link"
              className="inline"
            />{' '}
            ahora a verlos, o revísalos en cualquier momento.
          </span>
        </>
      );
    }

    return (
      <span className="text-center">
        Haz crecer tu negocio online en Cuba y usa <span className="font-bold">Asere Market</span>{' '}
        para enganchar a tus clientes
      </span>
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
          <span className="absolute text-gray-100 font-bold top-0 right-0">{count}</span>
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
