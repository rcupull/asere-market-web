import { Badge } from 'components/badge';
import { Button } from 'components/button';

import { useRemoveSale } from 'features/api/sales/useRemoveSale';
import { useModal } from 'features/modal/useModal';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useSales } from 'pages/@hooks/useSales';
import { StyleProps } from 'types/general';

export interface ShoppingCartRemoveAllButton extends StyleProps {}

export const ShoppingCartRemoveAllButton = ({ className }: ShoppingCartRemoveAllButton) => {
  const sales = useSales();
  const { business } = useBusiness();
  const { pushModal } = useModal();

  return (
    <Button
      label="Eliminar todos"
      variant="link"
      onClick={() => {
        pushModal(
          'Confirmation',
          {
            useProps: () => {
              const { onClose } = useModal();
              const { removeSale } = useRemoveSale();

              return {
                className: '!w-96',
                content: '¿Seguro que desea eliminar todos los artículos de su carro de compras?',
                badge: <Badge variant="error" />,
                primaryBtn: (
                  <Button
                    label="Eliminar"
                    isBusy={removeSale.status.isBusy}
                    onClick={() => {
                      if (!business) return;

                      removeSale.fetch(
                        { routeName: business?.routeName },
                        {
                          onAfterSuccess: () => {
                            onClose();
                            sales.onFetch({ routeName: business?.routeName });
                          },
                        },
                      );
                    }}
                  />
                ),
              };
            },
          },
          { emergent: true },
        );
      }}
      className={className}
    />
  );
};
