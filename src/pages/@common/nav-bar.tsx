import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  Cog8ToothIcon,
  HomeIcon,
  UserGroupIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import { IconButton } from 'components/icon-button';
import { IconUpdate } from 'components/icon-update';
import { Menu } from 'components/menu';
import { NavBar as NavBarBase } from 'components/nav-bar';
import { UserAvatar } from 'components/user-avatar';

import { useAuthSignOut } from 'features/api/useAuthSignOut';
import { useAuth } from 'features/api-slices/useAuth';
import { useModal } from 'features/modal/useModal';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useRouter } from 'hooks/useRouter';

import { BusinessLogo } from './business-logo';
import { BusinessMarketLogo } from './business-market-logo';
import { BusinessName } from './business-name';
import { ShoppingCartMenu } from './shopping-cart-menu';

import { useBusinessPageData } from 'pages/@hooks/useBusinessPageData';
import { StyleProps } from 'types/general';
import { getDashboardBusinessRoute, getDashboardRoute } from 'utils/business';

export interface NavbarProps extends StyleProps {}
export const Navbar = ({ className }: NavbarProps) => {
  const { isAdmin, isUser, isAuthenticated, authData, onRefreshAuthUser } = useAuth();
  const { authSignOut } = useAuthSignOut();
  const { user } = authData || {};
  const { isBusinessPage, params } = useRouter();
  const { routeName } = params;
  const { business } = useBusinessPageData();
  const aboutUsPage = business?.aboutUsPage || {};
  const { pushModal } = useModal();
  const { pushRoute } = useRouter();

  const callAfarResourcesRefreshUser = 'callAfarResourcesRefreshUser';
  useCallFromAfar(callAfarResourcesRefreshUser, onRefreshAuthUser);

  return (
    <NavBarBase
      className={className}
      preContent={
        <>
          <BusinessLogo className="hidden sm:block flex-shrink-0" />
          <BusinessName className="ml-10 sm:ml-0 mr-auto flex-shrink-0" />
          <div className="w-px h-3/6 bg-gray-400 hidden sm:block flex-shrink-0" />
        </>
      }
      items={[
        isBusinessPage && { name: 'Publicaciones', href: `/${routeName}` },
        isBusinessPage &&
          aboutUsPage?.visible && {
            name: aboutUsPage.title || '<Sin titulo>',
            href: `/${routeName}/about-us`,
          },
        ////////////////////////////////////////////////////////////////////////////////////////////////
        !isBusinessPage && { name: 'Home', href: '/' },
        !isBusinessPage && { name: 'Precios', href: '/payment-plans' },
        !isBusinessPage && { name: '¿Que es Asere Market?', href: '/about-us' },
        ////////////////////////////////////////////////////////////////////////////////////////////////
        isAdmin && { name: 'Admin', href: '/admin', className: '!ml-auto' },
      ]}
      postContent={
        <>
          {isBusinessPage && (
            <IconButton
              title="Página inicial"
              svg={() => <HomeIcon className="size-7" />}
              dark
              onClick={() => pushRoute('/')}
            />
          )}

          {isAuthenticated && <ShoppingCartMenu />}

          {isUser && (
            <IconButton
              title="Panel de Control"
              svg={() => <Cog8ToothIcon className="size-7" />}
              dark
              onClick={() => {
                if (routeName) {
                  pushRoute(getDashboardBusinessRoute({ routeName }));
                } else {
                  pushRoute(getDashboardRoute());
                }
              }}
              className="hidden sm:block"
            />
          )}

          {!isAuthenticated && isBusinessPage && (
            <Menu
              buttonElement={<BusinessMarketLogo />}
              headerElement={
                <div className="w-64 m-2 rounded-md px-4 py-3 border flex items-center justify-center">
                  <span className="text-center">
                    Haz crecer tu negocio online en Cuba y usa{' '}
                    <span className="font-bold">Asere Market</span> para enganchar a tus clientes
                  </span>
                </div>
              }
              items={[
                { label: 'Inicio', href: '/', svg: HomeIcon },
                {
                  label: 'Iniciar sesión',
                  href: '/auth/sign-in',
                  svg: ArrowRightEndOnRectangleIcon,
                },
                { label: 'Créate una cuenta', href: '/auth/sign-up', svg: UserPlusIcon },
                { label: 'Saber más sobre nosotros', href: '/about-us', svg: UserGroupIcon },
              ]}
              className="flex-shrink-0"
            />
          )}

          {user ? (
            <Menu
              buttonElement={<UserAvatar />}
              headerElement={
                <div className="px-2 py-3 flex flex-col items-center border">
                  <span className="text-sm border px-2 py-1 rounded-2xl">{user.name}</span>
                  <span className="text-xs mt-2">{user.email}</span>
                </div>
              }
              items={[
                {
                  label: 'Editar perfil',
                  onClick: () => {
                    pushModal('ProfileUpdate', {
                      userId: user._id,
                      callAfarResources: callAfarResourcesRefreshUser,
                    });
                  },
                  svg: IconUpdate,
                },
                {
                  label: 'Cerrar sesión',
                  onClick: () =>
                    authSignOut.fetch(undefined, {
                      onAfterSuccess: () => {
                        pushRoute('/auth/sign-in');
                      },
                    }),
                  svg: ArrowRightStartOnRectangleIcon,
                },
              ]}
              className="ml-3 hidden sm:block flex-shrink-0"
            />
          ) : (
            <Link to="/auth/sign-in" className="text-gray-200 text-nowrap">
              Iniciar sesión
            </Link>
          )}
        </>
      }
    />
  );
};
