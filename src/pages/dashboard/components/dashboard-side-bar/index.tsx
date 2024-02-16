import { BookmarkIcon, BuildingStorefrontIcon,Cog8ToothIcon } from '@heroicons/react/24/outline';

import { SideBar as SideBarBase } from 'components/side-bar';

import { useGetAllUserBusiness } from 'features/api/useGetAllUserBusiness';

import { StyleProps } from 'types/general';

export interface DashboardSideBarProps extends StyleProps {}

export const DashboardSideBar = ({ className }: DashboardSideBarProps) => {

  const {  getAllUserBussiness } = useGetAllUserBusiness();

  const business  = getAllUserBussiness.data || [];


  return (
    <SideBarBase
      className={className}
      items={[
        {
          label: 'Negocios',
          href: '/dashboard/business',
          svg: BookmarkIcon,
        },
        ...(business.map(({name, routeName})=>{
          return ({
            label: name,
            href: `/dashboard/business/${routeName}`,
            svg: BuildingStorefrontIcon,
            className: 'ml-8'
          })
        })),
        {
          label: 'Settings',
          href: '/dashboard/settings',
          svg: Cog8ToothIcon,
        },
      ]}
    />
  );
};
