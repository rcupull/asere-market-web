import { Badge } from 'components/badge';
import { Button } from 'components/button';

import { useRemovePostsFromCart } from 'features/api/user/useRemovePostsFromCart';
import { useAuth } from 'features/api-slices/useAuth';
import { useModal } from 'features/modal/useModal';

import { PostAdded } from './post-added';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBuyProductsModal } from 'pages/@hooks/useBuyProductsModal';
import { UserShoppingCartAddedMeta } from 'types/auth';
import { Post } from 'types/post';

export interface ShoppingCartMenuPostsProps {
  value: Array<{
    post: Post;
    meta: UserShoppingCartAddedMeta;
  }>;
}

export const ShoppingCartMenuPosts = ({ value }: ShoppingCartMenuPostsProps) => {
  const { onRefreshAuthUser } = useAuth();
  const buyProductsModal = useBuyProductsModal();
  const { business } = useBusiness();
  const { pushModal } = useModal();

  return (
    <div className="text-center">
      Haz crecer tu negocio online en Cuba y usa <span className="font-bold">Asere Market</span>{' '}
      para enganchar a tus clientes
      <div className="font-semibold my-2">Productos en tu carro</div>
      <div className="flex flex-col gap-1 mt-3">
        {value.map(({ meta, post }, index) => {
          return <PostAdded key={index} meta={meta} post={post} />;
        })}
      </div>
      <div className="flex justify-between mt-2">
        <Button variant="link" label="Comprar ahora" onClick={() => buyProductsModal.open()} />
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
                    content:
                      '¿Seguro que desea eliminar todos los artículos de su carro de compras?',
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
        />
      </div>
    </div>
  );
};
