import { UserMenu } from 'components/user-menu';

import { NavBar } from '.';

export default {
  component: NavBar,
};

const useMenu = (
  <UserMenu
    imageSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    items={[
      { label: 'Your Profile', href: '/profile' },
      { label: 'Settings', href: '/settings' },
      { label: 'Sign out', href: '/signout' },
    ]}
  />
);

export const Default = (): JSX.Element => (
  <div style={{ height: '10rem' }}>
    <NavBar
      userMenu={useMenu}
      items={[
        { name: 'Dashboard', href: '#' },
        null && { name: 'Team', href: '#' },
        { name: 'Projects', href: '#' },
        { name: 'Calendar', href: '#' },
      ]}
    />
  </div>
);
