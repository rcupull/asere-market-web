import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  BookmarkIcon,
  BuildingLibraryIcon,
  Cog8ToothIcon,
  CurrencyDollarIcon,
  HomeIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';

import { IconShowHide } from 'components/icon-show-hide';
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
  const { isBusinessPage, isDashboardPage, params } = useRouter();
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
          label: 'Tiendas',
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
        isAuthenticated &&
          isAdmin && {
            // ADMIN
            label: 'Admin',
            href: '/admin',
            svg: Cog8ToothIcon,
          },
        isAuthenticated &&
          isAdmin && {
            // ADMIN
            label: 'Usuarios',
            href: '/admin/users',
            svg: UserGroupIcon,
            className: 'pl-10',
          },
        isAuthenticated &&
          !isAdmin && {
            // BUSINESS
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
          // BUSINESS

          return (
            isAuthenticated &&
            !isAdmin && {
              label: name,
              href: `/dashboard/business/${routeName}`,
              endElement: <IconShowHide className="h-4 ml-auto" hidden={hidden} />,
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
          // AUTH
          label: 'Cerrar sesión',
          svg: ArrowRightStartOnRectangleIcon,
          onClick: () => authSignOut.fetch(undefined),
        },
        !isAuthenticated && {
          // AUTH
          label: 'Créate una cuenta',
          svg: UserPlusIcon,
          href: '/sign-up',
          className: 'sm:hidden',
        },
        !isAuthenticated && {
          // AUTH
          label: 'Iniciar sesión',
          svg: ArrowRightEndOnRectangleIcon,
          href: '/sign-in',
          className: 'sm:hidden',
        },
      ]}
    />
  );
};
