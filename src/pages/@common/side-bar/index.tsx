import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  BookmarkIcon,
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

import { useAuthSignOut } from 'features/api/useAuthSignOut';
import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';
import { useAuth } from 'features/api-slices/useAuth';
import { useAllUserBusiness } from 'features/api-slices/useGetAllUserBusinessPersistent';

import { useRouter } from 'hooks/useRouter';

import { AddNewBusinessButton } from './AddNewBusinessButton';
import { SideBarUserHeader } from './SideBarUserHeader';

import { StyleProps } from 'types/general';

export interface SideBarProps extends StyleProps {}

export const SideBar = ({ className }: SideBarProps) => {
  const allUserBusiness = useAllUserBusiness();
  const { isBusinessPage, isDashboardPage, params } = useRouter();
  const { routeName } = params;
  const { isAdmin, isAuthenticated, isUser } = useAuth();

  const isDashboardOrAdminPage = isDashboardPage || isAdmin;

  const { authSignOut } = useAuthSignOut();

  const business = allUserBusiness.data || [];

  const { isNotValidBussinessCountByUser } = useGetUserPaymentPlan();

  const needPremium = isNotValidBussinessCountByUser(allUserBusiness.data?.length);

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
          isUser && {
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
            isUser && {
              label: name,
              href: `/dashboard/business/${routeName}`,
              endElement: <IconShowHide className="h-4 ml-auto" hidden={hidden} />,
              className: 'pl-10',
            }
          );
        }),
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        isAuthenticated &&
          isUser && {
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
          className: 'sm:hidden',
        },
        !isAuthenticated && {
          // AUTH
          label: 'Créate una cuenta',
          svg: UserPlusIcon,
          href: '/auth/sign-up',
          className: 'sm:hidden',
        },
        !isAuthenticated && {
          // AUTH
          label: 'Iniciar sesión',
          svg: ArrowRightEndOnRectangleIcon,
          href: '/auth/sign-in',
          className: 'sm:hidden',
        },
      ]}
    />
  );
};
