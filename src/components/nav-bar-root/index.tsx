import { NavBar } from 'components/nav-bar';
import { UserMenu } from 'components/user-menu';

import { useAuth } from 'features/auth';
import { useRouter } from 'features/router';

export const RootNavBar = () => {
  const { onSignOut, isAdmin, isUser } = useAuth();
  const { pathname } = useRouter();

  const isCurrent = (href: string) => pathname === href;

  return (
    <NavBar
      items={[
        { name: 'Home', href: '/', current: isCurrent('/') },
        isUser && { name: 'Panel', href: '/dashboard', current: isCurrent('/dashboard') },
        { name: 'Sobre Nosotros', href: '/about-us', current: isCurrent('/about-us') },
        isAdmin && { name: 'Admin', href: '/admin', current: isCurrent('/admin') },
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
