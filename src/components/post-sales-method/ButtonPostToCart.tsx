import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import { IconButton } from 'components/icon-button';

import { useAddOnePostToCart } from 'features/api/user/useAddOnePostToCart';
import { useAuth } from 'features/api-slices/useAuth';

import { useDebouncer } from 'hooks/useDebouncer';

import { StyleProps } from 'types/general';
import { Post } from 'types/post';

export interface ButtonPostToCartProps extends StyleProps {
  post: Post;
}

export const ButtonPostToCart = ({ post, className }: ButtonPostToCartProps) => {
  const [count, setCount] = useState<number>(0);

  const { addOnePostToCart } = useAddOnePostToCart();
  const { onRefreshAuthUser } = useAuth();

  const debouncer = useDebouncer();
  return (
    <IconButton
      title="Adicionar el carrito"
      svg={() => <ShoppingCartIcon className="size-8" />}
      isBusy={addOnePostToCart.status.isBusy}
      onClick={(e) => {
        e.preventDefault();

        const amountToAdd = count + 1;
        setCount(amountToAdd);

        debouncer(() => {
          setCount(0);
          addOnePostToCart.fetch(
            { postId: post._id, routeName: post.routeName, amountToAdd },
            {
              onAfterSuccess: () => {
                onRefreshAuthUser();
              },
            },
          );
        }, 500);
      }}
      className={className}
    />
  );
};
