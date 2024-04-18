import { Badge } from 'components/badge';
import { Button } from 'components/button';

import { useRemovePostsFromCart } from 'features/api/user/useRemovePostsFromCart';
import { useAuth } from 'features/api-slices/useAuth';
import { useModal } from 'features/modal/useModal';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { StyleProps } from 'types/general';

export interface ShoppingCartRemoveAllButton extends StyleProps {}

export const ShoppingCartRemoveAllButton = ({ className }: ShoppingCartRemoveAllButton) => {
  const { onRefreshAuthUser } = useAuth();
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
              const { removePostsFromCart } = useRemovePostsFromCart();

              return {
                className: '!w-96',
                content: '¿Seguro que desea eliminar todos los artículos de su carro de compras?',
                badge: <Badge variant="error" />,
                primaryBtn: (
                  <Button
                    label="Eliminar"
                    isBusy={removePostsFromCart.status.isBusy}
                    onClick={() => {
                      removePostsFromCart.fetch(
                        { routeName: business?.routeName },
                        {
                          onAfterSuccess: () => {
                            onClose();
                            onRefreshAuthUser();
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
