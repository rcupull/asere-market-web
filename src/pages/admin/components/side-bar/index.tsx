import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { SideBar as SideBarBase } from 'components/side-bar';

export const SideBar = () => {
  return (
    <SideBarBase
      items={[
        {
          label: 'Home',
          href: '/',
          svg: BellIcon,
          divider: true,
        },
        {
          label: 'Sign In',
          href: '/sign-in',
          svg: XMarkIcon,
        },
        {
          label: 'Sign Up',
          href: '/sign-up',
          svg: Bars3Icon,
        },
        {
          label: 'Home',
          href: '/',
          svg: BellIcon,
          divider: true,
        },
        {
          label: 'Sign In',
          href: '/sign-in',
          svg: XMarkIcon,
        },
        {
          label: 'Sign Up',
          href: '/sign-up',
          svg: Bars3Icon,
        },
      ]}
    />
  );
};
