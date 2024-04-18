import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import { IconButton } from 'components/icon-button';

import { useUpdateAddOneSale } from 'features/api/sales/useUpdateAddOneSale';

import { useDebouncer } from 'hooks/useDebouncer';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useSales } from 'pages/@hooks/useSales';
import { StyleProps } from 'types/general';
import { Post } from 'types/post';

export interface ButtonPostToCartProps extends StyleProps {
  post: Post;
}

export const ButtonPostToCart = ({ post, className }: ButtonPostToCartProps) => {
  const [count, setCount] = useState<number>(0);

  const { updateAddOneSale } = useUpdateAddOneSale();
  const sales = useSales();
  const { business } = useBusiness();

  const debouncer = useDebouncer();
  return (
    <IconButton
      title="Adicionar el carrito"
      svg={() => <ShoppingCartIcon className="size-8" />}
      isBusy={updateAddOneSale.status.isBusy}
      onClick={(e) => {
        e.preventDefault();

        const amountToAdd = count + 1;
        setCount(amountToAdd);

        debouncer(() => {
          setCount(0);
          if (!business) return;

          updateAddOneSale.fetch(
            { postId: post._id, amountToAdd, routeName: business.routeName },
            {
              onAfterSuccess: () => {
                sales.onFetch({ routeName: business.routeName });
              },
            },
          );
        }, 500);
      }}
      className={className}
    />
  );
};
