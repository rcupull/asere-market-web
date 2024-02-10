import { BookmarkIcon, Cog8ToothIcon } from '@heroicons/react/24/outline';

import { SideBar as SideBarBase } from 'components/side-bar';

import { StyleProps } from 'types/general';

export interface DashboardSideBarProps extends StyleProps {}

export const DashboardSideBar = ({ className }: DashboardSideBarProps) => {
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
          svg: Cog8ToothIcon,
        },
      ]}
    />
  );
};
