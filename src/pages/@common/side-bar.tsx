import {
  BookmarkIcon,
  Cog8ToothIcon,
  EyeIcon,
  EyeSlashIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';

import { ProLink } from 'components/pro-link';
import { SideBar as SideBarBase } from 'components/side-bar';

import { useGetAllUserBusiness } from 'features/api/useGetAllUserBusiness';
import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';
import { useModal } from 'features/modal/useModal';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useRouter } from 'hooks/useRouter';

import { Business } from 'types/business';
import { StyleProps } from 'types/general';

export interface SideBarProps extends StyleProps {}

export const SideBar = ({ className }: SideBarProps) => {
  const { getAllUserBussiness } = useGetAllUserBusiness();
  const { pushModal } = useModal();
  const { pushRoute } = useRouter();
  const business = getAllUserBussiness.data || [];

  useCallFromAfar('dashboard_side_bar', (newBussiness: Business) => {
    const { routeName } = newBussiness;
    getAllUserBussiness.fetch({});

    pushRoute(`/dashboard/business/${routeName}`, { tab: 0 }, { timeout: 100 });
  });

  const { isNotValidBussinessCountByUser } = useGetUserPaymentPlan();

  const needPremium = isNotValidBussinessCountByUser(getAllUserBussiness.data?.length);

  const addNewBusinessButton = (
    <PlusCircleIcon
      title="Agragar nuevo negocio"
      className="ml-auto h-6 hover:text-gray-50 rounded-full"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        pushModal('BusinessNew', {
          updateId: 'dashboard_side_bar',
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
          endElement: needPremium ? <ProLink className="ml-auto h-6" /> : addNewBusinessButton,
        },
        ...business.map(({ name, routeName, hidden }, index) => {
          const Svg = hidden ? EyeSlashIcon : EyeIcon;

          return {
            label: name,
            href: `/dashboard/business/${routeName}`,
            svg: () => <Svg className="h-6" />,
            className: 'ml-8',
            divider: index === 0,
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
