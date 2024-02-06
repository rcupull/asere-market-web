import { BookmarkIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { SideBar as SideBarBase } from 'components/side-bar';

import { StyleProps } from 'types/general';

export interface SideBarProps extends StyleProps {}

export const SideBar = ({ className }: SideBarProps) => {
  return (
    <SideBarBase
      className={className}
      items={[
        {
          label: 'Negocios',
          href: '/dashboard/business',
          svg: BookmarkIcon,
        },
        {
          label: 'Settings',
          href: '/dashboard/settings',
          svg: XMarkIcon,
        },
      ]}
    />
  );
};
