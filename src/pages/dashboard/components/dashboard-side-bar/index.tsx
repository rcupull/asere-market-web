import {
  BookmarkIcon,
  BuildingStorefrontIcon,
  Cog8ToothIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';

import { SideBar as SideBarBase } from 'components/side-bar';

import { useGetAllUserBusiness } from 'features/api/useGetAllUserBusiness';
import { useModal } from 'features/modal/useModal';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useRouter } from 'hooks/useRouter';

import { updateIds } from 'constants/updateids';
import { StyleProps } from 'types/general';

export interface DashboardSideBarProps extends StyleProps {}

export const DashboardSideBar = ({ className }: DashboardSideBarProps) => {
  const { getAllUserBussiness } = useGetAllUserBusiness();
  const { pushModal } = useModal();
  const {  pushRoute} = useRouter()
  const business = getAllUserBussiness.data || [];

  useCallFromAfar(updateIds.dashboard_side_bar, () => {
    getAllUserBussiness.fetch({});
    pushRoute('/dashboard/business')
  });

  const addNewBusinessButton = (
    <PlusCircleIcon
      title="Agragar nuevo negocio"
      className="ml-auto h-6 hover:text-gray-50 rounded-full"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        pushModal('BusinessNew', {
          updateIds: [updateIds.dashboard_side_bar],
        });
      }}
    />
  );

  return (
    <SideBarBase
      className={className}
      items={[
        {
          label: 'Negocios',
          href: '/dashboard/business',
          svg: BookmarkIcon,
          endElement: addNewBusinessButton,
        },
        ...business.map(({ name, routeName }) => {
          return {
            label: name,
            href: `/dashboard/business/${routeName}`,
            svg: BuildingStorefrontIcon,
            className: 'ml-8',
          };
        }),
        {
          label: 'Settings',
          href: '/dashboard/settings',
          svg: Cog8ToothIcon,
        },
      ]}
    />
  );
};
