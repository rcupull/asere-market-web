import { NavBar } from 'components/nav-bar';
import { UserMenu } from 'components/user-menu';

import { useAuthSignIn } from 'features/api/useAuthSignIn';
import { useAuthSignOut } from 'features/api/useAuthSignOut';

export const RootNavBar = () => {
  const { isAdmin, isUser } = useAuthSignIn();
  const { authSignOut } = useAuthSignOut();

  return (
    <NavBar
      items={[
        { name: 'Home', href: '/' },
        { name: 'Tiendas', href: '/business' },
        { name: 'Precios', href: '/payment-plans' },
        isUser && { name: 'Panel', href: '/dashboard' },
        { name: 'Quienes somos', href: '/about-us' },
        isAdmin && { name: 'Admin', href: '/admin' },
      ]}
      userMenu={
        <UserMenu
          items={[
            { label: 'Configuración', href: '/settings' },
            { label: 'Cerrar sesiónn', onClick: () => authSignOut.fetch(undefined) },
          ]}
        />
      }
    />
  );
};
