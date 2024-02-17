import { UserMenu } from 'components/user-menu';

import { NavBar } from '.';

export default {
  component: NavBar,
};
   
const useMenu = (
  <UserMenu
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
