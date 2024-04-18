import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { EmptyImage } from 'components/empty-image';
import { IconButtonRemove } from 'components/icon-button-remove';

import { useRemoveSale } from 'features/api/sales/useRemoveSale';
import { useUpdateAddOneSale } from 'features/api/sales/useUpdateAddOneSale';
import { useModal } from 'features/modal/useModal';

import { ChangeCount } from './ChangeCount';

import { useSales } from 'pages/@hooks/useSales';
import { Post } from 'types/post';

export interface PostAddedProps {
  count: number;
  post: Post;
}

export const PostAdded = ({ count, post }: PostAddedProps) => {
  const { updateAddOneSale } = useUpdateAddOneSale();
  const sales = useSales();

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
          updateAddOneSale.fetch(
            { postId: _id, routeName, amountToAdd: amount - count },
            {
              onAfterSuccess: () => {
                sales.onFetch({ routeName });
              },
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
                const { removeSale } = useRemoveSale();

                return {
                  content: '¿Seguro que desea quitar este producto del carro de compras?',
                  badge: <Badge variant="error" />,
                  primaryBtn: (
                    <Button
                      label="Eliminar artículo"
                      isBusy={removeSale.status.isBusy}
                      onClick={() => {
                        removeSale.fetch(
                          { postId: _id, routeName },
                          {
                            onAfterSuccess: () => {
                              onClose();
                              sales.onFetch({ routeName });
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
