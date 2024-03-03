import { ArrowRightStartOnRectangleIcon, Cog8ToothIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import { Menu } from 'components/menu';
import { NavBar as NavBarBase } from 'components/nav-bar';
import { UserAvatar } from 'components/user-avatar';

import { useAuthSignIn } from 'features/api/useAuthSignIn';
import { useAuthSignOut } from 'features/api/useAuthSignOut';

import { useRouter } from 'hooks/useRouter';

import { BusinessHookLogo } from './business-hook-logo-';
import { BusinessLogo } from './business-logo';
import { BusinessName } from './business-name';

import { StyleProps } from 'types/general';

export interface NavbarProps extends StyleProps {}
export const Navbar = ({ className }: NavbarProps) => {
  const { isAdmin, isUser, isAuthenticated, authData } = useAuthSignIn();
  const { authSignOut } = useAuthSignOut();
  const { user } = authData || {};
  const { whichPage } = useRouter();

  return (
    <NavBarBase
      className={className}
      preContent={
        <>
          <BusinessLogo className="hidden sm:block flex-shrink-0" />
          <BusinessName className="ml-10 sm:ml-0 mr-auto" />
          <div className="w-px h-3/6 bg-gray-400 hidden sm:block flex-shrink-0" />
        </>
      }
      items={[
        { name: 'Home', href: '/' },
        { name: 'Tiendas', href: '/business' },
        { name: 'Precios', href: '/payment-plans' },
        isUser && { name: 'Panel', href: '/dashboard' },
        { name: 'Quienes somos', href: '/about-us' },
        isAdmin && { name: 'Admin', href: '/admin' },
      ]}
      postContent={
        <>
          {whichPage.business && (
            <Link className="text-slate-100 text-nowrap shrink-0" to="/">
              <BusinessHookLogo />
            </Link>
          )}
          {!isAuthenticated && (
            <Link className="text-slate-100 text-nowrap" to="/sign-in">
              Iniciar Sesión
            </Link>
          )}

          {user && (
            <Menu
              buttonElement={<UserAvatar />}
              headerElement={
                <div className="px-2 py-3 flex flex-col items-center border">
                  <span className="text-sm border px-2 py-1 rounded-2xl">{user.name}</span>
                  <span className="text-xs mt-2">{user.email}</span>
                </div>
              }
              items={[
                { label: 'Configuración', href: '/settings', svg: Cog8ToothIcon },
                {
                  label: 'Cerrar sesiónn',
                  onClick: () => authSignOut.fetch(undefined),
                  svg: ArrowRightStartOnRectangleIcon,
                },
              ]}
              className="ml-3 hidden sm:block flex-shrink-0"
            />
          )}
        </>
      }
    />
  );
};
