import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import { IconButton } from 'components/icon-button';
import { Menu } from 'components/menu';

import { StyleProps } from 'types/general';

export interface ShoppingCartMenuProps extends StyleProps {}

export const ShoppingCartMenu = ({ className }: ShoppingCartMenuProps) => {
  return (
    <Menu
      buttonElement={
        <IconButton
          title="Carro de Compras"
          svg={() => <ShoppingCartIcon className="size-7" />}
          dark
        />
      }
      headerElement={
        <div className="w-64 m-2 rounded-md px-4 py-3 border flex items-center justify-center">
          <span className="text-center">
            Haz crecer tu negocio online en Cuba y usa{' '}
            <span className="font-bold">Asere Market</span> para enganchar a tus clientes
          </span>
        </div>
      }
      items={[]}
      className={className}
    />
  );
};
