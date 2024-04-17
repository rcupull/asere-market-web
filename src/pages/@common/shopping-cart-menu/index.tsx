import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

import { Button } from 'components/button';
import { IconButton } from 'components/icon-button';
import { Menu } from 'components/menu';

import { useGetAllPosts } from 'features/api/posts/useGetAllPosts';
import { useAuth } from 'features/api-slices/useAuth';

import { ShoppingCartMenuPosts } from '../shopping-cart-menu-posts';

import { useAuthSignInModal } from 'pages/@hooks/useAuthSignInModal';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { StyleProps } from 'types/general';

export interface ShoppingCartMenuProps extends StyleProps {}

export const ShoppingCartMenu = ({ className }: ShoppingCartMenuProps) => {
  const { authData, isAuthenticated } = useAuth();
  const { business } = useBusiness();

  const { user } = authData || {};

  const postsAdded = user?.shoppingCart?.added?.filter((e) => e.routeName === business?.routeName);

  //////////////////////////////////////////////
  const { getAllPosts } = useGetAllPosts();

  useEffect(() => {
    if (postsAdded?.length) {
      getAllPosts.fetch({ postsIds: postsAdded.map(({ postId }) => postId) });
    }
  }, [postsAdded?.length]);
  //////////////////////////////////////////////

  const addedInTheCartInThisBusiness = postsAdded?.reduce((acc, meta) => {
    const { count, routeName } = meta;

    return business?.routeName === routeName ? acc + count : acc;
  }, 0);

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

    if (!postsAdded?.length) {
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

    const allPosts = getAllPosts.data;

    return (
      <>
        {allPosts && (
          <ShoppingCartMenuPosts
            value={postsAdded.map((meta, index) => ({
              meta,
              post: allPosts[index],
            }))}
          />
        )}
      </>
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
          <span className="absolute text-gray-100 font-bold top-0 right-0">
            {addedInTheCartInThisBusiness}
          </span>
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
