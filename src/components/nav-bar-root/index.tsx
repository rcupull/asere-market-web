import { NavBar } from 'components/nav-bar';
import { UserMenu } from 'components/user-menu';

import { useAuth } from 'features/auth';

export const RootNavBar = () => {
  const { onSignOut, isAdmin, isUser } = useAuth();

  return (
    <NavBar
      items={[
        { name: 'Home', href: '/' },
        { name: 'Todas las tiendas', href: '/business' },
        { name: 'Precios', href: '/price' },
        isUser && { name: 'Panel', href: '/dashboard' },
        { name: 'Sobre Nosotros', href: '/about-us' },
        isAdmin && { name: 'Admin', href: '/admin' },
      ]}
      userMenu={
        <UserMenu
          imageSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          items={[
            { label: 'Your Profile', href: '/profile' },
            { label: 'Settings', href: '/settings' },
            { label: 'Sign out', onClick: () => onSignOut.fetch(undefined) },
          ]}
        />
      }
    />
  );
};
