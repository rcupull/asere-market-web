import {
  BookmarkIcon,
  Cog8ToothIcon,
  EyeIcon, EyeSlashIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';

import { SideBar as SideBarBase } from 'components/side-bar';

import { useGetAllUserBusiness } from 'features/api/useGetAllUserBusiness';
import { useModal } from 'features/modal/useModal';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useRouter } from 'hooks/useRouter';

import { updateIds } from 'constants/updateids';
import { Business } from 'types/business';
import { StyleProps } from 'types/general';

export interface DashboardSideBarProps extends StyleProps {}

export const DashboardSideBar = ({ className }: DashboardSideBarProps) => {
  const { getAllUserBussiness } = useGetAllUserBusiness();
  const { pushModal } = useModal();
  const { pushRoute } = useRouter();
  const business = getAllUserBussiness.data || [];

  useCallFromAfar(updateIds.dashboard_side_bar, (newBussiness: Business) => {
    const { routeName } = newBussiness;
    getAllUserBussiness.fetch({});

    pushRoute(`/dashboard/business/${routeName}`, { tab: 0 }, { timeout: 100 });
  });

  const addNewBusinessButton = (
    <PlusCircleIcon
      title="Agragar nuevo negocio"
      className="ml-auto h-6 hover:text-gray-50 rounded-full"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        pushModal('BusinessNew', {
          updateId: updateIds.dashboard_side_bar,
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
        ...business.map(({ name, routeName, hidden }, index) => {
          const Svg = hidden ? EyeSlashIcon : EyeIcon

          return {
            label: name,
            href: `/dashboard/business/${routeName}`,
            svg: ()=><Svg className='h-6'/>,
            className: 'ml-8',
            divider: index === 0
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
