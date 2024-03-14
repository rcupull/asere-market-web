import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  BookmarkIcon,
  BuildingLibraryIcon,
  CodeBracketIcon,
  Cog8ToothIcon,
  CurrencyDollarIcon,
  EyeIcon,
  EyeSlashIcon,
  HomeIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';

import { ProLink } from 'components/pro-link';
import { SideBar as SideBarBase } from 'components/side-bar';

import { useAuthSignIn } from 'features/api/useAuthSignIn';
import { useAuthSignOut } from 'features/api/useAuthSignOut';
import { useGetAllUserBusiness } from 'features/api/useGetAllUserBusiness';
import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';

import { useRouter } from 'hooks/useRouter';

import { AddNewBusinessButton } from './AddNewBusinessButton';
import { SideBarUserHeader } from './SideBarUserHeader';

import { StyleProps } from 'types/general';

export interface SideBarProps extends StyleProps {}

export const SideBar = ({ className }: SideBarProps) => {
  const { getAllUserBussiness } = useGetAllUserBusiness();
  const { isBusinessPage, isDashboardPage, isAdminPage, params } = useRouter();
  const { routeName } = params;
  const { isAdmin, isAuthenticated } = useAuthSignIn();

  const isDashboardOrAdminPage = isDashboardPage || isAdmin;

  const { authSignOut } = useAuthSignOut();
  const business = getAllUserBussiness.data || [];

  const { isNotValidBussinessCountByUser } = useGetUserPaymentPlan();

  const needPremium = isNotValidBussinessCountByUser(getAllUserBussiness.data?.length);

  return (
    <SideBarBase
      className={className}
      items={[
        isAuthenticated && {
          content: <SideBarUserHeader />,
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        isDashboardOrAdminPage && {
          divider: true,
        },
        isBusinessPage && { label: 'Publicaciones', href: `/${routeName}`, svg: HomeIcon },
        !isBusinessPage && { label: 'Inicio', href: '/', svg: HomeIcon, className: 'sm:hidden' },
        !isBusinessPage && {
          label: 'Todas las tiendas',
          href: '/business',
          svg: BuildingLibraryIcon,
          className: 'sm:hidden',
        },
        !isBusinessPage && {
          label: 'Precios',
          href: '/payment-plans',
          svg: CurrencyDollarIcon,
          className: 'sm:hidden',
        },
        !isBusinessPage && {
          label: '¿Que es Asere Market?',
          href: '/about-us',
          svg: UserCircleIcon,
          className: 'sm:hidden',
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        {
          divider: true,
          className: 'sm:hidden',
        },
        isAuthenticated && isAdmin && {
          label: 'Usuarios',
          href: '/admin/users',
          svg: UserGroupIcon,
        },
        isAuthenticated && !isAdmin && {
          label: 'Mis negocios',
          href: '/dashboard/business',
          svg: BookmarkIcon,
          endElement: needPremium ? (
            <ProLink className="ml-auto h-6" />
          ) : (
            <AddNewBusinessButton className="ml-auto" />
          ),
        },
        ...business.map(({ name, routeName, hidden }) => {
          const Svg = hidden ? EyeSlashIcon : EyeIcon;

          return (
            isAuthenticated && !isAdmin && {
              label: name,
              href: `/dashboard/business/${routeName}`,
              endElement: <Svg className="h-4 ml-auto" />,
              className: 'pl-10',
            }
          );
        }),
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        isAuthenticated && {
          divider: true,
        },
        isDashboardPage && {
          label: 'Configuración',
          href: '/dashboard/settings',
          svg: Cog8ToothIcon,
        },
        isAuthenticated && {
          label: 'Cerrar sesión',
          svg: ArrowRightStartOnRectangleIcon,
          onClick: () => authSignOut.fetch(undefined),
        },
        !isAuthenticated && {
          label: 'Créate una cuenta',
          svg: UserPlusIcon,
          href: '/sign-up',
          className: 'sm:hidden',
        },
        !isAuthenticated && {
          label: 'Iniciar sesión',
          svg: ArrowRightEndOnRectangleIcon,
          href: '/sign-in',
          className: 'sm:hidden',
        },
      ]}
    />
  );
};
