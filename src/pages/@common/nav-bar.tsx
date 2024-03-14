import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  HomeIcon,
  UserGroupIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import { Menu } from 'components/menu';
import { NavBar as NavBarBase } from 'components/nav-bar';
import { UserAvatar } from 'components/user-avatar';

import { useAuthSignIn } from 'features/api/useAuthSignIn';
import { useAuthSignOut } from 'features/api/useAuthSignOut';

import { useRouter } from 'hooks/useRouter';

import { BusinessLogo } from './business-logo';
import { BusinessMarketLogo } from './business-market-logo';
import { BusinessName } from './business-name';

import { StyleProps } from 'types/general';

export interface NavbarProps extends StyleProps {}
export const Navbar = ({ className }: NavbarProps) => {
  const { isAdmin, isUser, isAuthenticated, authData } = useAuthSignIn();
  const { authSignOut } = useAuthSignOut();
  const { user } = authData || {};
  const { isBusinessPage, params } = useRouter();
  const { routeName } = params;

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
        !isBusinessPage && { name: 'Home', href: '/' },
        !isBusinessPage && { name: 'Tiendas', href: '/business' },
        !isBusinessPage && { name: 'Precios', href: '/payment-plans' },
        isUser && { name: 'Panel', href: '/dashboard' },
        !isBusinessPage && { name: '¿Que es Asere Market?', href: '/about-us' },
        isAdmin && { name: 'Admin', href: '/admin' },
      ]}
      postContent={
        <>
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
                { label: 'Iniciar sesión', href: '/sign-in', svg: ArrowRightEndOnRectangleIcon },
                { label: 'Créate una cuenta', href: '/sign-up', svg: UserPlusIcon },
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
                  label: 'Cerrar sesión',
                  onClick: () => authSignOut.fetch(undefined),
                  svg: ArrowRightStartOnRectangleIcon,
                },
              ]}
              className="ml-3 hidden sm:block flex-shrink-0"
            />
          ) : (
            <Link to="/sign-in" className="text-gray-200 text-nowrap">
              Iniciar sesión
            </Link>
          )}
        </>
      }
    />
  );
};
