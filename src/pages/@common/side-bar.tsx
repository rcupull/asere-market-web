import {
  BookmarkIcon,
  BuildingLibraryIcon,
  CodeBracketIcon,
  Cog8ToothIcon,
  CurrencyDollarIcon,
  EyeIcon,
  EyeSlashIcon,
  HomeIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

import { ProLink } from 'components/pro-link';
import { SideBar as SideBarBase } from 'components/side-bar';

import { useAuthSignIn } from 'features/api/useAuthSignIn';
import { useAuthSignOut } from 'features/api/useAuthSignOut';
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
  const { isAdmin } = useAuthSignIn();
  const { authSignOut } = useAuthSignOut();
  const business = getAllUserBussiness.data || [];

  useCallFromAfar('side_bar_redirect_to_last_created_business', (newBussiness: Business) => {
    const { routeName } = newBussiness;
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
          callAfarResources: ['side_bar_redirect_to_last_created_business', 'getAllUserBussiness'],
        });
      }}
    />
  );

  return (
    <SideBarBase
      className={className}
      items={[
        { label: 'Home', href: '/', svg: HomeIcon, className: 'sm:hidden' },
        {
          label: 'Todas las tiendas',
          href: '/business',
          svg: BuildingLibraryIcon,
          className: 'sm:hidden',
        },
        {
          label: 'Precios',
          href: '/payment-plans',
          svg: CurrencyDollarIcon,
          className: 'sm:hidden',
        },
        { label: 'Quienes somos', href: '/about-us', svg: UserCircleIcon, className: 'sm:hidden' },
        isAdmin && { label: 'Admin', href: '/admin', svg: CodeBracketIcon, className: 'sm:hidden' },
        {
          label: 'Mis negocios',
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
          href: '/settings',
          svg: Cog8ToothIcon,
          className: 'sm:hidden',
        },
        {
          label: 'Cerrar sesión',
          svg: Cog8ToothIcon,
          onClick: () => authSignOut.fetch(undefined),
          className: 'sm:hidden',
        },
      ]}
    />
  );
};
