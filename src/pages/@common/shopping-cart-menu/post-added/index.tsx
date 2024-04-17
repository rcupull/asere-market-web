import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { EmptyImage } from 'components/empty-image';
import { IconButtonRemove } from 'components/icon-button-remove';

import { useAddOnePostToCart } from 'features/api/user/useAddOnePostToCart';
import { useRemovePostsFromCart } from 'features/api/user/useRemovePostsFromCart';
import { useAuth } from 'features/api-slices/useAuth';
import { useModal } from 'features/modal/useModal';

import { ChangeCount } from './ChangeCount';

import { UserShoppingCartAddedMeta } from 'types/auth';
import { Post } from 'types/post';

export interface PostAddedProps {
  meta: UserShoppingCartAddedMeta;
  post: Post;
}

export const PostAdded = ({ meta, post }: PostAddedProps) => {
  const { onRefreshAuthUser } = useAuth();
  const { addOnePostToCart } = useAddOnePostToCart();

  const { count } = meta;
  const { name, images, _id, routeName } = post;
  const mainImage = images?.[0];
  const { pushModal } = useModal();

  return (
    <div className="flex items-center border border-gray-300 rounded-md p-1 gap-1">
      <div className="flex-shrink-0">
        {mainImage ? <img src={mainImage.src} className="w-8" /> : <EmptyImage className="w-8" />}
      </div>

      {name}

      <ChangeCount
        value={count}
        onChange={(amount) => {
          addOnePostToCart.fetch(
            { postId: _id, routeName, amountToAdd: amount - count },
            {
              onAfterSuccess: () => onRefreshAuthUser(),
            },
          );
        }}
        className="ml-auto"
      />

      <img />
      <IconButtonRemove
        stopPropagation
        title="Eliminar articulo"
        onClick={() => {
          pushModal(
            'Confirmation',
            {
              useProps: () => {
                const { onClose } = useModal();
                const { removePostsFromCart } = useRemovePostsFromCart();

                return {
                  content: '¿Seguro que desea quitar este producto del carro de compras?',
                  badge: <Badge variant="error" />,
                  primaryBtn: (
                    <Button
                      label="Eliminar artículo"
                      isBusy={removePostsFromCart.status.isBusy}
                      onClick={() => {
                        removePostsFromCart.fetch(
                          { postId: _id },
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
  );
};
